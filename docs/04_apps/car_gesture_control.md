---
sidebar_position: 5
sidebar_products: RDK-X3,RDK-X5
---

# 5.4.5 小车手势控制

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 功能介绍

小车手势控制 App 功能为通过手势控制机器人小车运动，包括左右旋转和前后平移运动。App 由 MIPI 图像采集、人体检测和跟踪、人手关键点检测、手势识别、手势控制策略、图像编解码、Web 展示端组成，流程如下图：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/car_gesture_control/gesture_ctrl_workflow.jpg" alt="小车手势控制 App 从图像采集到控制策略的流程图" style={{ width: '50%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

支持的控制手势，对应的手势功能定义和手势动作举例如下：

| 控制手势              | 手势功能 | 手势动作举例                                                           |
| --------------------- | -------- | ---------------------------------------------------------------------- |
| 666 手势/Awesome       | 前进     | <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/car_gesture_control/image-awesome.jpeg" alt="666/Awesome 手势动作示例（控制小车前进）" style={{ width: 'auto', maxWidth: '120px', height: 'auto', display: 'block', margin: '0 auto' }} />       |
| yeah/Victory          | 后退     | <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/car_gesture_control/image-victory.jpeg" alt="Yeah/Victory 手势动作示例（控制小车后退）" style={{ width: 'auto', maxWidth: '120px', height: 'auto', display: 'block', margin: '0 auto' }} />       |
| 大拇指向右/ThumbRight | 右转     | <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/car_gesture_control/image-thumbright.jpeg" alt="大拇指向右/ThumbRight 手势动作示例（控制小车右转）" style={{ width: 'auto', maxWidth: '120px', height: 'auto', display: 'block', margin: '0 auto' }} /> |
| 大拇指向左/ThumbLeft  | 左转     | <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/car_gesture_control/image-thumbleft.jpeg" alt="大拇指向左/ThumbLeft 手势动作示例（控制小车左转）" style={{ width: 'auto', maxWidth: '120px', height: 'auto', display: 'block', margin: '0 auto' }} />   |

App 以 PC 端 Gazebo 仿真环境下的虚拟小车举例，发布的控制指令也可以直接用于控制实物小车。

代码仓库： (https://github.com/D-Robotics/gesture_control)

## 支持平台

| 平台                             | 运行方式     | 示例功能                                                                           |
| -------------------------------- | ------------ | ---------------------------------------------------------------------------------- |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | 启动 MIPI/USB 摄像头获取图像，并进行手势识别以及手势控制，最后通过 Gazebo 展示控制效果 |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | 启动 MIPI/USB 摄像头获取图像，并进行手势识别以及手势控制，最后通过 Gazebo 展示控制效果 |
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

运行小车手势控制 App 后，通过 “666 手势/Awesome” 手势控制小车前进，“yeah/Victory” 手势控制小车后退，“大拇指向右/ThumbRight” 手势控制小车右转，“大拇指向左/ThumbLeft” 手势控制小车左转。其中左转/右转分别是向人的左/右方向（大拇指的指向）转动。

App 启动后可以在 PC 端浏览器上渲染显示 sensor 发布的图片和对应的算法结果（浏览器输入 `http://IP:8000`，IP 为 RDK 的 IP 地址）。

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
# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/hand_lmk_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/hand_gesture_detection/config/ .

# 配置MIPI摄像头
export CAM_TYPE=mipi

# 启动launch文件
ros2 launch gesture_control gesture_control.launch.py
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
cp -r /opt/tros/${TROS_DISTRO}/lib/hand_lmk_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/hand_gesture_detection/config/ .

# 配置USB摄像头
export CAM_TYPE=usb

# 启动launch文件
ros2 launch gesture_control gesture_control.launch.py
```

## 结果分析

在 RDK 运行终端输出如下信息：

```shell
[gesture_control-7] [WARN] [1652965757.159500951] [GestureControlEngine]: frame_ts_ms: 3698315358, track_id: 2, tracking_sta: 1, gesture: 14
[gesture_control-7] [WARN] [1652965757.159660358] [GestureControlEngine]: do move, direction: 0, step: 0.500000
[gesture_control-7] [WARN] [1652965757.211420964] [GestureControlEngine]: frame_ts_ms: 3698315425, track_id: 2, tracking_sta: 1, gesture: 14
[gesture_control-7] [WARN] [1652965757.211624899] [GestureControlEngine]: do move, direction: 0, step: 0.500000
[gesture_control-7] [WARN] [1652965757.232051230] [GestureControlEngine]: frame_ts_ms: 3698315457, track_id: 2, tracking_sta: 1, gesture: 14
[gesture_control-7] [WARN] [1652965757.232207513] [GestureControlEngine]: do move, direction: 0, step: 0.500000
```

以上 log 截取了一段通过手势控制小车运动的处理结果。其中 tracking_sta 值为 1，表示处于手势控制状态，tracking_sta 值为 0 表示识别到手势。

从时间戳 frame_ts_ms: 3698315358 开始通过 666 手势（gesture: 14）控制小车以 0.5m/s 的速度前进运动（do move, direction: 0, step: 0.500000）。

PC 端在终端使用`ros2 topic list`命令可以查询到 RDK 的 topic 信息：

```shell
$ ros2 topic list
/camera_info
/cmd_vel
/hbmem_img04054242060426080500012020112713
/hobot_hand_gesture_detection
/hobot_hand_lmk_detection
/hobot_mono2d_body_detection
/image
/parameter_events
/rosout
```

其中`/image`是 RDK 发布的从 MIPI sensor 采集图像后经过 JPEG 格式编码的图片，`/hobot_hand_gesture_detection`是 RDK 发布的包含手势识别信息的算法 msg，`/cmd_vel`是 RDK 发布的运动控制指令。

PC 端在终端使用`ros2 topic echo /cmd_vel`命令可以查看到 RDK 发布的运动控制指令：

```shell
linear:
  x: -0.5
  y: 0.0
  z: 0.0
angular:
  x: 0.0
  y: 0.0
  z: 0.0
---
linear:
  x: 0.0
  y: 0.0
  z: 0.0
angular:
  x: 0.0
  y: 0.0
  z: -0.5
---
```

PC 端仿真环境中小车按照手势动作运动，仿真小车运动效果如下：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/car_gesture_control/gesture_ctrl.gif" alt="仿真小车按手势动作运动的效果动图" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />
