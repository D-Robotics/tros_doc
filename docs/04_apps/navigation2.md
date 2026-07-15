---
sidebar_position: 2
sidebar_products: RDK-X3,RDK-X5,RDK-S100
---

# 5.4.2 Navigation2

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 功能介绍

Nav2（Navigation2）是ROS2中自带的导航框架，旨在寻找一种安全的方式让移动机器人从A点移动到B点。Nav2也可以应用于其他机器人导航应用，例如动态点跟踪，在这个过程中需要完成动态路径规划、计算电机速度、避免障碍等。

[SLAM建图](./slam)介绍了如何运行SLAM算法进行建图，本章节介绍如何基于建立的地图使用Nav2进行导航。同样使用Gazebo在PC端创建虚拟环境和小车，使用Rviz2设置导航目的地，RDK运行Nav2程序导航。


## 支持平台

| 平台    | 运行方式     | 示例功能                       |
| ------- | ------------ | ------------------------------ |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | PC端启动仿真环境，并在RDK启动导航功能，最后通过Rviz2展示导航效果 |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | PC端启动仿真环境，并在RDK启动导航功能，最后通过Rviz2展示导航效果 |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) | PC端启动仿真环境，并在RDK启动导航功能，最后通过Rviz2展示导航效果 |

## 准备工作

### RDK平台

1. RDK已烧录好Ubuntu系统镜像。

2. RDK已成功安装tros.b。

3. tros.b成功安装后，安装Nav2。

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
# 配置tros.b环境
source /opt/tros/setup.bash
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
# 配置tros.b环境
source /opt/tros/humble/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# 配置tros.b环境
source /opt/tros/humble/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

```shell
sudo apt update 
sudo apt install ros-${ROS_DISTRO}-navigation2
sudo apt install ros-${ROS_DISTRO}-nav2-bringup
```

<DocScope products="RDK-X3">


:::caution **注意**
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system?v=3.0.0&p=RDK+X3#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q10: apt update 命令执行失败或报错如何处理？`解决。**
:::

</DocScope>
<DocScope products="RDK-X5">


:::caution **注意**
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q10: apt update 命令执行失败或报错如何处理？`解决。**
:::

</DocScope>

<DocScope products="RDK-S100">
:::caution **注意**
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_s_doc/FAQ/hardware_and_system#q6-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q6: apt update 命令执行失败或报错如何处理？`解决。**
:::
</DocScope>

4. 和RDK在同一网段的PC，PC已安装Ubuntu系统、ROS2桌面版和仿真环境Gazebo，数据可视化工具Rviz2。

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
source /opt/ros/foxy/setup.bash
```

Ubuntu 20.04系统和[ROS2 Foxy桌面版](https://docs.ros.org/en/foxy/Installation/Ubuntu-Install-Debians.html)

</TabItem>

<TabItem value="humble" label="Humble">

```bash
source /opt/ros/humble/setup.bash
```
Ubuntu 22.04系统和[ROS2 Humble桌面版](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html)

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
source /opt/ros/humble/setup.bash
```
Ubuntu 22.04系统和[ROS2 Humble桌面版](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html)

</TabItem>

</Tabs>
</DocScope>

PC的ROS2安装成功后安装Gazebo和Turtlebot3相关的功能包，安装方法为：

```bash
sudo apt-get install ros-${ROS_DISTRO}-gazebo-*
sudo apt install ros-${ROS_DISTRO}-turtlebot3*
sudo apt install ros-${ROS_DISTRO}-navigation2
sudo apt install ros-${ROS_DISTRO}-nav2-bringup
```

## 使用介绍

### RDK平台

本章节介绍如何在PC端搭建仿真环境，以及进行导航目的地设置，RDK运行导航功能，并查看导航效果。

1. **PC端**启动gazebo仿真环境

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
source /opt/ros/foxy/setup.bash
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
source /opt/ros/humble/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
source /opt/ros/humble/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

   ```shell
   export TURTLEBOT3_MODEL=waffle
   ros2 launch turtlebot3_gazebo turtlebot3_world.launch.py
   ```

   :::info
   如果启动失败，并且报错`[ERROR] [gzclient-2]: process has died`，请执行命令`source /usr/share/gazebo/setup.sh`后再启动。
   :::

   仿真环境如下图所示：

   <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/nav2/gazebo.png" alt="Navigation2 示例中 Gazebo 仿真环境启动后的场景" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

2. **RDK**启动导航功能

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
# 配置tros.b环境
source /opt/tros/setup.bash
ros2 launch nav2_bringup bringup_launch.py use_sim_time:=True map:=/opt/ros/foxy/share/nav2_bringup/maps/turtlebot3_world.yaml
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
# 配置tros.b环境
source /opt/tros/humble/setup.bash
ros2 launch nav2_bringup bringup_launch.py use_sim_time:=True map:=/opt/ros/humble/share/nav2_bringup/maps/turtlebot3_world.yaml
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# 配置tros.b环境
source /opt/tros/humble/setup.bash
ros2 launch nav2_bringup bringup_launch.py use_sim_time:=True map:=/opt/ros/humble/share/nav2_bringup/maps/turtlebot3_world.yaml
```

</TabItem>

</Tabs>
</DocScope>

3. **PC端**启动Rviz2工具

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
# 配置tros.b环境
source /opt/tros/setup.bash
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
# 配置tros.b环境
source /opt/ros/humble/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# 配置tros.b环境
source /opt/ros/humble/setup.bash
```

</TabItem>

</Tabs>
</DocScope>


   ```shell
   ros2 launch nav2_bringup rviz_launch.py
   ```

   Rviz2效果如下图：

   <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/nav2/rviz.png" alt="Navigation2 在 RViz2 中的整体可视化界面" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

（1） 在Rviz2上设置机器人起始位置和方向

   Rviz2启动后，机器人最初不知道它在哪里。默认情况下，Nav2会等待用户给机器人一个大致的起始位置。查看机器人在Gazebo中的位置，并在地图上找到该位置。通过点击Rviz2中的"2D Pose Estimate" 按钮，然后通过在地图上机器人预估的位置处点击来设置机器人初始位置 。可以通过向前拖动刚才单击的位置来设置机器人起始的移动方向。如下图所示：

   <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/nav2/rviz_init.png" alt="在 RViz2 中使用 2D Pose Estimate 设置机器人初始位姿" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

   一旦设置好了机器人的初始位置，就会完成坐标变换树，同时Nav2将会完全激活并准备就绪。这时就可以看到机器人和点云了。

   <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/nav2/rviz_start.png" alt="设置初始位姿后 RViz2 显示机器人与点云的就绪状态" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

（2） Rviz2设置目的地

   点击 "Navigaton2 Goal" 按钮并选择一个目的地。

   <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/nav2/rviz_goal.png" alt="在 RViz2 中点击 Navigation2 Goal 选择导航目标点" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

   现在就可以看到机器人在移动了。

## 结果分析

导航效果如下图所示：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/nav2/rviz_nav2.gif" alt="Navigation2 导航过程中机器人运动到目标点的效果动图" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>
