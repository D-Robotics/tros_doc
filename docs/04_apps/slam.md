---
sidebar_position: 1
---

# 5.4.1 SLAM 建图

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 功能介绍

SLAM 指即时定位与地图构建（Simultaneous Localization and Mapping，简称 SLAM）。
本章节使用 ROS2 的 SLAM-Toolbox 作为建图算法，在 Gazebo 中控制小车行驶建立地图，并通过 Rviz2 观察建图效果。
其中 SLAM-Toolbox 运行在 RDK 上，Gazebo 和 Rviz2 运行在与 RDK 同一网段的 PC 上。

## 支持平台

| 平台    | 运行方式     |
| ------- | ------------ |
| RDK X3, RDK X3 Module, | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) |
| RDK S600 | Ubuntu 24.04 (Jazzy) |
## 准备工作

### RDK 平台

1. RDK 已烧录好 Ubuntu 系统镜像。

2. RDK 已成功安装 TogetheROS.Bot。

3. tros.b 成功安装后，安装 SLAM-Toolbox

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

<TabItem value="jazzy" label="Jazzy">

```bash
# 配置tros.b环境
source /opt/tros/jazzy/setup.bash
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

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
# 配置tros.b环境
source /opt/tros/jazzy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>


    ```bash
    sudo apt-get install ros-${ROS_DISTRO}-slam-toolbox
    ```


:::info
 如果安装失败，并且报错如下：

 ```bash
   The following packages have unmet dependencies:
    ros-foxy-slam-toolbox : Depends: ros-foxy-nav2-map-server but it is not going to be installed
   E: Unable to correct problems, you have held broken packages.
 ```

 请执行以下命令后再安装：
 
   apt update

   sudo apt install libwebp6=0.6.1-2ubuntu0.20.04.3
:::

<DocScope products="RDK-X3,RDK-X5">
:::caution **注意**
<DocScope products="RDK-X3">
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system?v=3.0.0&p=RDK+X3#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q10: apt update 命令执行失败或报错如何处理？`解决。**
</DocScope>
<DocScope products="RDK-X5">
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q10: apt update 命令执行失败或报错如何处理？`解决。**
</DocScope>
:::
</DocScope>
<DocScope products="RDK-S100,RDK-S600">
:::caution **注意**
<DocScope products="RDK-S100">
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_s_doc/FAQ/hardware_and_system#q6-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q6: apt update 命令执行失败或报错如何处理？`解决。**
</DocScope>
<DocScope products="RDK-S600">
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_s_doc/FAQ/hardware_and_system?v=5.1.0&p=RDK+S600#q6-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q6: apt update 命令执行失败或报错如何处理？`解决。**
</DocScope>
:::
</DocScope>
:::

4. 和 RDK 在同一网段的 PC，PC 已安装 Ubuntu 系统、ROS2 桌面版和仿真环境 Gazebo，数据可视化工具 Rviz2。

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
source /opt/ros/foxy/setup.bash
```

Ubuntu 20.04 系统和[ROS2 Foxy 桌面版](https://docs.ros.org/en/foxy/Installation/Ubuntu-Install-Debians.html)

</TabItem>

<TabItem value="humble" label="Humble">

```bash
source /opt/ros/humble/setup.bash
```
Ubuntu 22.04 系统和[ROS2 Humble 桌面版](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html)

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
source /opt/ros/jazzy/setup.bash
```
Ubuntu 24.04 系统和[ROS2 Jazzy 桌面版](https://docs.ros.org/en/jazzy/Installation/Ubuntu-Install-Debians.html)

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
source /opt/ros/humble/setup.bash
```
Ubuntu 22.04 系统和[ROS2 Humble 桌面版](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html)

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
source /opt/ros/jazzy/setup.bash
```
Ubuntu 24.04 系统和[ROS2 Jazzy 桌面版](https://docs.ros.org/en/jazzy/Installation/Ubuntu-Install-Debians.html)

</TabItem>
</Tabs>
</DocScope>


PC 的 ROS2 安装成功后安装 Gazebo 和 Turtlebot3 相关的功能包，安装方法为：

```bash
sudo apt-get install ros-${ROS_DISTRO}-gazebo-*
sudo apt install ros-${ROS_DISTRO}-turtlebot3
sudo apt install ros-${ROS_DISTRO}-turtlebot3-bringup
sudo apt install ros-${ROS_DISTRO}-turtlebot3-simulations
sudo apt install ros-${ROS_DISTRO}-teleop-twist-keyboard
```

## 使用介绍

### RDK 平台

本小节介绍如何使用 RDK 运行 SLAM 算法，并使用 PC 观察建图效果。

PC 端启动仿真环境：

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

<TabItem value="jazzy" label="Jazzy">

```bash
source /opt/ros/jazzy/setup.bash
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

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
source /opt/ros/jazzy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>


```bash
export TURTLEBOT3_MODEL=burger
ros2 launch turtlebot3_gazebo turtlebot3_world.launch.py
```

:::info
 如果启动失败，并且报错`[ERROR] [gzclient-2]: process has died`，请执行命令`source /usr/share/gazebo/setup.sh`后再启动。
:::

仿真环境如下图所示：
<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/slam/gazebo.jpg" alt="SLAM 示例中 Gazebo 仿真环境启动后的场景" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

PC 端开启另外一个控制台，启动 Rviz2 用于观察建图效果：

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

<TabItem value="jazzy" label="Jazzy">

```bash
source /opt/ros/jazzy/setup.bash
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

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
source /opt/ros/jazzy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>


```bash
ros2 launch turtlebot3_bringup rviz2.launch.py
```

打开 Rviz2 后，需要添加 “map” 可视化选项，用于展示建立的地图，步骤如下所示：
<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/slam/rvizsetting.jpg" alt="在 RViz2 中添加 map 可视化选项以展示建图结果的配置步骤" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

RDK 板端运行 SLAM-Toolbox：

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

<TabItem value="jazzy" label="Jazzy">

```bash
# 配置tros.b环境
source /opt/tros/jazzy/setup.bash
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

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
# 配置tros.b环境
source /opt/tros/jazzy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>


```bash
#启动SLAM launch文件
ros2 launch slam_toolbox online_sync_launch.py
```

PC 端开启另外一个控制台，PC 端启动控制工具，通过键盘控制小车运动，控制方法见控制台打印的 log，在此不再赘述：

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
source /opt/ros/foxy/setup.bash
ros2 run teleop_twist_keyboard teleop_twist_keyboard
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
source /opt/ros/humble/setup.bash
ros2 run teleop_twist_keyboard teleop_twist_keyboard
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
source /opt/ros/jazzy/setup.bash
ros2 run teleop_twist_keyboard teleop_twist_keyboard --ros-args -p stamped:=True
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
source /opt/ros/humble/setup.bash
ros2 run teleop_twist_keyboard teleop_twist_keyboard
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
source /opt/ros/jazzy/setup.bash
ros2 run teleop_twist_keyboard teleop_twist_keyboard --ros-args -p stamped:=True
```

</TabItem>
</Tabs>
</DocScope>

控制小车行驶，随着小车雷达探测到更多的环境信息，SLAM 算法也建立起环境地图，可以在 Rviz2 上观察到建图效果。
<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/06_Application_case/amr/map.jpg" alt="小车行驶过程中 RViz2 上逐步建立的环境地图效果" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

## 结果分析

在 RDK 板端运行终端输出如下信息：

```text
[INFO] [launch]: All log files can be found below /root/.ros/log/2022-06-10-06-40-34-204213-ubuntu-5390
[INFO] [launch]: Default logging verbosity is set to INFO
[INFO] [sync_slam_toolbox_node-1]: process started with pid [5392]
[sync_slam_toolbox_node-1] [INFO] [1654843239.403931058] [slam_toolbox]: Node using stack size 40000000
[sync_slam_toolbox_node-1] [INFO] [1654843240.092340814] [slam_toolbox]: Using solver plugin solver_plugins::CeresSolver
[sync_slam_toolbox_node-1] [INFO] [1654843240.096554433] [slam_toolbox]: CeresSolver: Using SCHUR_JACOBI preconditioner.
[sync_slam_toolbox_node-1] Info: clipped range threshold to be within minimum and maximum range!
[sync_slam_toolbox_node-1] [WARN] [1654843589.431524393] [slam_toolbox]: maximum laser range setting (20.0 m) exceeds the capabilities of the used Lidar (3.5 m)
[sync_slam_toolbox_node-1] Registering sensor: [Custom Described Lidar]
```
