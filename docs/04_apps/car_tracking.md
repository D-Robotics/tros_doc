---
sidebar_position: 4
sidebar_products: RDK-X3,RDK-X5
---

# 5.4.4 小车人体跟随

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 功能介绍

小车人体跟随 App 功能为控制机器人跟随人体移动，App 由 MIPI 图像采集、人体检测和跟踪、人体跟随策略、图像编解码、Web 展示端组成，流程如下图：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/car_tracking/body_tracking_workflow.jpg" alt="小车人体跟随 App 从检测跟踪到控制策略的流程图" style={{ width: '50%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

App 以 PC 端 Gazebo 仿真环境下的虚拟小车举例，发布的控制指令也可以直接用于控制实物小车。

代码仓库： (https://github.com/D-Robotics/body_tracking)

## 支持平台

| 平台    | 运行方式      |
| ------- | ------------ |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble)|
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble)|
## 准备工作

### RDK 平台

1. RDK 已烧录好 Ubuntu 系统镜像。

2. RDK 已成功安装 TogetheROS.Bot。

3. RDK 已安装 MIPI 或者 USB 摄像头。

4. 和 RDK 在同一网段（有线或者连接同一无线网，IP 地址前三段需保持一致）的 PC，PC 端需要安装的环境包括：

 <DocScope products="RDK-X3,RDK-X5">
 <Tabs groupId="tros-distro">
  <TabItem value="foxy" label="Foxy">

    - Ubuntu 20.04 系统和[ROS2 Foxy 桌面版](https://docs.ros.org/en/foxy/Installation/Ubuntu-Install-Debians.html)
    - Gazebo 和 Turtlebot3 相关的功能包，安装方法：

     ```shell
     sudo apt-get install ros-foxy-gazebo-*
     sudo apt install ros-foxy-turtlebot3
     sudo apt install ros-foxy-turtlebot3-simulations
     ```

  </TabItem>

  <TabItem value="humble" label="Humble">

    - Ubuntu 22.04 系统和[ROS2 Humble 桌面版](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html)
    - Gazebo 和 Turtlebot3 相关的功能包，安装方法：

     ```shell
     sudo apt-get install ros-humble-gazebo-*
     sudo apt install ros-humble-turtlebot3
     sudo apt install ros-humble-turtlebot3-simulations
     ```

  </TabItem>

 </Tabs>
 </DocScope>

 

## 使用介绍

### RDK 平台

运行小车人体跟随 App 后，小车运动控制 package 选择距离小车前方最近的人体（人体检测框宽度最大）作为跟随对象。当人体距离小车较远时，小车开始前进运动靠近人体，并保持人体在小车正前方。

APP 启动后可以在 PC 端浏览器上渲染显示 sensor 发布的图片和对应的算法结果（浏览器输入 `http://IP:8000`，IP 为 RDK 的 IP 地址）。

PC 端启动仿真环境：

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```shell
source /opt/ros/foxy/setup.bash
```

</TabItem>

<TabItem value="humble" label="Humble">

```shell
source /opt/ros/humble/setup.bash
```

</TabItem>

</Tabs>
</DocScope>



```shell
export TURTLEBOT3_MODEL=burger
ros2 launch turtlebot3_gazebo empty_world.launch.py
```

启动成功后，仿真环境中小车效果如下：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/car_tracking/gazebo.jpeg" alt="Gazebo 仿真环境中小车启动后的场景效果" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>


**使用 mipi 摄像头发布图片**

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



```shell
# 从TogetheROS的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .

# 配置MIPI摄像头
export CAM_TYPE=mipi

# 启动launch文件
ros2 launch body_tracking body_tracking_without_gesture.launch.py
```


**使用 USB 摄像头发布图片**

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




```shell
# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .

# 配置USB摄像头
export CAM_TYPE=usb

# 启动launch文件
ros2 launch body_tracking body_tracking_without_gesture.launch.py
```

## 结果分析

在 RDK 板端运行终端输出如下信息：

```shell
[body_tracking-7] [WARN] [1653430533.523069034] [ParametersClass]: TrackCfg param are
[body_tracking-7] activate_wakeup_gesture: 0
[body_tracking-7] track_serial_lost_num_thr: 100
[body_tracking-7] activate_robot_rotate_thr: 45
[body_tracking-7] activate_robot_move_thr: 5
[body_tracking-7] move_step: 0.3
[body_tracking-7] rotate_step: 0.5
[body_tracking-7] img_width: 960
[body_tracking-7] img_height: 544
[body_tracking-7] 
[body_tracking-7] [WARN] [1653430533.712812076] [TrackingManager]: update frame_ts 395787, 873
[body_tracking-7] [WARN] [1653430533.713105576] [TrackingManager]: Tracking body start!, track_id: 1, frame_ts: 395787, tracking_sta(0:INITING, 1:TRACKING, 2:LOST): 1, gesture: 0
[body_tracking-7] [WARN] [1653430535.018442618] [TrackingManager]: Do move! body_rect_width: 353, thr: 864, move_step_ratio: 1, body_rect_to_top: 20, img_height: 544, move_step: 0.3
[body_tracking-7] [WARN] [1653430535.220268535] [TrackingManager]: Do rotate move, ts sec: 3397, nanosec: 387800000
[body_tracking-7] [WARN] [1653430535.220408576] [RobotCmdVelNode]: RobotCtl, angular: 0 0 0, linear: 0.3 0 0, pub twist ts: 1653430535220394

```

以上 log 截取了一段 App 启动后的输出。启动后先打印相关配置（TrackCfg param）。检测到人体后小车就开始进入跟随状态（tracking_sta 值为 1），并以 0.3m/s 的速度前进运动（RobotCtl, angular: 0 0 0, linear: 0.3 0 0）靠近人体。

PC 端在终端使用`ros2 topic list`命令可以查询到 RDK 的 topic 信息：

```shell
$ ros2 topic list
/camera_info
/cmd_vel
/hbmem_img04054242060426080500012020112713
/hobot_mono2d_body_detection
/image
/parameter_events
/rosout
```

其中`/image`是 RDK 发布的从 MIPI sensor 采集图像后经过 JPEG 格式编码的图片，`/hobot_mono2d_body_detection`是 RDK 发布的包含人体检测结果的算法 msg，`/cmd_vel`是 RDK 发布的运动控制指令。

PC 端在终端使用`ros2 topic echo /cmd_vel`命令可以查看到 RDK 发布的运动控制指令：

```shell
linear:
  x: 0.5
  y: 0.0
  z: 0.0
angular:
  x: 0.0
  y: 0.0
  z: -0.5
---
linear:
  x: 0.5
  y: 0.0
  z: 0.0
angular:
  x: 0.0
  y: 0.0
  z: -0.5
---
```

PC 端仿真环境中小车跟随人体运动，仿真小车运动效果如下：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/car_tracking/tracking.gif" alt="仿真小车跟随人体移动的运动效果动图" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />
