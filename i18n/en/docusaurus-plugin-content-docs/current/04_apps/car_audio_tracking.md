---
sidebar_position: 7
sidebar_products: RDK-X3,RDK-X5
---

# 5.4.7 Voice Tracking Control for Robot Movement

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Overview

The voice tracking control for robot movement feature uses DOA (Direction of Arrival) angle information from sound source localization to control the robot to turn toward the sound source and move forward. This feature must be used together with the intelligent voice module of the D-Robotics RDK robot operating system. After the user speaks the wake word configured in the intelligent voice recognition module to wake the device, the voice tracking control feature is activated. Subsequently, when the user speaks the wake word or configured command words, the intelligent voice recognition module outputs the DOA angle of the sound source. After receiving the DOA angle information, this module controls the robot to turn toward the sound source and move forward a certain distance.

The workflow is shown below:

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/car_audio_tracking/audio_control.jpg)

The App uses a virtual robot in the PC-side Gazebo simulation environment as an example. The published control commands can also be used directly to control a physical robot.

The DOA angle information for sound source localization output by the intelligent voice feature is in degrees. Both linear and circular microphone arrays are supported. For linear microphone arrays, the angle range is 0 to 180 degrees; for circular microphone arrays, the angle range is 0 to 360 degrees. The relative position of microphone angles is strongly related to the microphone installation position. The actual angle diagram is shown below:

Linear microphone:

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/car_audio_tracking/doa_line.jpg)

Circular microphone:

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/car_audio_tracking/doa_circle.jpg)

Code repository: (https://github.com/D-Robotics/audio_tracking.git)

## Supported Platforms

| Platform    | Runtime Environment      | Example Functionality                       |
| ------- | ------------ | ------------------------------ |
| RDK X3 | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | Start the intelligent voice module to parse voice information and perform voice tracking, displaying tracking results via Gazebo |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | Start the intelligent voice module to parse voice information and perform voice tracking, displaying tracking results via Gazebo |

**Note: Only RDK X3 is supported. RDK X3 Module is not supported yet.**

## Preparation

### RDK Platform

1. The RDK has been flashed with the Ubuntu system image.

2. TogetheROS.Bot has been successfully installed on the RDK.

3. The intelligent voice algorithm package has been successfully installed on the RDK. Installation commands:

   <DocScope products="RDK-X3,RDK-X5">
   <Tabs groupId="tros-distro">
      <TabItem value="foxy" label="Foxy">

      ```bash
      sudo apt update
      sudo apt install tros-hobot-audio
      ```

      </TabItem>

      <TabItem value="humble" label="Humble">

      ```bash
      sudo apt update
      sudo apt install tros-humble-hobot-audio
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   

<DocScope products="RDK-X3">

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_x_doc/en/FAQ/hardware_and_system?v=3.0.0&p=RDK+X3#q10-what-to-do-if-apt-update-fails-eg-key-error-update-failure-lock-file-in-use) section `Q10: How to handle apt update command failure or error?` for resolution.**
:::

</DocScope>
<DocScope products="RDK-X5">

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_x_doc/en/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-what-to-do-if-apt-update-fails-eg-key-error-update-failure-lock-file-in-use) section `Q10: How to handle apt update command failure or error?` for resolution.**
:::

</DocScope>

5. A compatible audio board has been connected to the RDK (refer to the [Intelligent Voice section](../03_boxs/audio/hobot_audio.md)).

6. A PC on the same network as the RDK (wired or on the same Wi-Fi, with the first three octets of the IP address matching). The PC requires the following environment:

 <DocScope products="RDK-X3,RDK-X5">
 <Tabs groupId="tros-distro">
  <TabItem value="foxy" label="Foxy">

    - Ubuntu 20.04 and [ROS2 Foxy desktop edition](https://docs.ros.org/en/foxy/Installation/Ubuntu-Install-Debians.html)
    - Gazebo and Turtlebot3 related packages. Installation:

     ```shell
     sudo apt-get install ros-foxy-gazebo-*
     sudo apt install ros-foxy-turtlebot3
     sudo apt install ros-foxy-turtlebot3-simulations
     ```

  </TabItem>

  <TabItem value="humble" label="Humble">

    - Ubuntu 22.04 and [ROS2 Humble desktop edition](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html)
    - Gazebo and Turtlebot3 related packages. Installation:

     ```shell
     sudo apt-get install ros-humble-gazebo-*
     sudo apt install ros-humble-turtlebot3
     sudo apt install ros-humble-turtlebot3-simulations
     ```

  </TabItem>

 </Tabs>
 </DocScope>

 

## Usage

### RDK Platform

After running the voice tracking feature, the voice tracking control module receives intelligent voice message results published by the intelligent voice feature module, parses the messages, and publishes control commands to turn the robot a specific angle based on the wake event and DOA angle information in the messages. After the robot turns to the specific angle, it continues to move forward a certain distance (this module defaults to controlling the robot to move forward 0.2 meters).

Start the simulation environment on the PC:

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

After successful startup, the robot in the simulation environment appears as follows:

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/car_tracking/gazebo.jpeg)

Start the program on the RDK platform:

1. Copy the audio configuration file and load the audio driver

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
    cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_audio/config/ .
    ```

2. Confirm the microphone device

    The microphone device number is set via the `micphone_name` field in the configuration file *config/audio_config.json*. The default is "hw:0,0", which represents audio device Card0 Device0. The device number can be checked with the command `ls /dev/snd`, for example "pcmC0D1c"; the last letter c indicates a capture device, C0 indicates Card0, D1 indicates Device1. Change the parameter to "hw:0,1".

3. Start the program

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
    # 启动launch文件，并指定小车正前方对应的语音DOA角度，以90为例
    ros2 launch audio_tracking audio_tracking.launch.py car_front_audio_angle:=90
    ```

## Result Analysis

The RDK terminal outputs the following information:

```text

        This is audio tracking package.

============================================
        audio tracking usage

Wake up device is "D-Robotics 你好".
Audio control commnad word definitions are:
        "向前走"
        "向后退"
        "向右转"
        "向左转" 
When you say the wake word, the car turns toward you 
Let's start the experience
============================================

[INFO] [1663149803.248119421] [audio_tracking]: AudioTrackingEngine construct
[INFO] [1663149803.313949108] [rclcpp]: ParametersClass node construct
[WARN] [1663149803.337782049] [AudioTrackingNode]: Parameter:
 ai_msg_sub_topic_name: /audio_smart
 twist_pub_topic_name: /cmd_vel
[WARN] [1663149804.316577383] [audio_control_parameter_node]: Robot Move param are
move_step: 0.3
rotate_step: 0.348

[INFO] [1663149814.967019845] [audio_tracking]: process audio frame type:2
[INFO] [1663149814.967377380] [audio_tracking]: process audio event type:1
[INFO] [1663149815.012831677] [audio_tracking]: process audio frame type:5
[WARN] [1663149815.013112088] [audio_tracking]: process audio doa theta:80.000000
[INFO] [1663149815.168426039] [audio_tracking]: process audio doa move to front distance:0.200000, speed:0.300000, duration:0.666667, ticks:6
[WARN] [1663149815.769833806] [audio_tracking]: cancel move
[INFO] [1663149822.128098383] [audio_tracking]: process audio frame type:2
[INFO] [1663149822.128389794] [audio_tracking]: process audio event type:1
[INFO] [1663149822.145186562] [audio_tracking]: process audio frame type:5
[WARN] [1663149822.145491473] [audio_tracking]: process audio doa theta:55.000000
[INFO] [1663149822.174037772] [audio_tracking]: process audio doa move theta:35.000000, angle:0.610865, direction:1, ticks:6
[WARN] [1663149822.775398926] [audio_tracking]: cancel move
[INFO] [1663149822.775698796] [audio_tracking]: process audio doa move to front distance:0.200000, speed:0.300000, duration:0.666667, ticks:6
[WARN] [1663149823.377099758] [audio_tracking]: cancel move
```

The log above shows a segment of output after the audio control package starts. The log shows that the wake word configured in the intelligent voice recognition module is "D-Robotics 你好". After the voice tracking control module receives a wake event, it receives DOA angle information. As shown in the log, the DOA is 80 degrees. At this point, the voice tracking control module publishes a command to turn the robot left 20 degrees, then controls the robot to move forward, and finally stops the robot.

Use the `ros2 topic list` command on the PC terminal to query RDK topic information:

```shell
$ ros2 topic list
/audio_smart
/cmd_vel
```

`/audio_smart` is the algorithm perception message published by X3 containing intelligent voice results. `/cmd_vel` is the motion control command published by the RDK.

Use the `ros2 topic echo /cmd_vel` command on the PC terminal to view motion control commands published by the RDK:

```text
linear:
  x: 0.0
  y: 0.30000001192092896
  z: 0.0
angular:
  x: 0.0
  y: 0.0
  z: 1.1136000156402588
---
linear:
  x: 0.0
  y: 0.30000001192092896
  z: 0.0
angular:
  x: 0.0
  y: 0.0
  z: 1.1136000156402588
---
linear:
  x: 0.0
  y: 0.30000001192092896
  z: 0.0
angular:
  x: 0.0
  y: 0.0
  z: 1.1136000156402588
---
linear:
  x: 0.0
  y: 0.30000001192092896
  z: 0.0
angular:
  x: 0.0
  y: 0.0
  z: 1.1136000156402588
---
linear:
  x: 0.0
  y: 0.30000001192092896
  z: 0.0
angular:
  x: 0.0
  y: 0.0
  z: 1.1136000156402588
---
```

Voice tracking control for robot movement in the PC simulation environment is shown below:

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/car_audio_tracking/audio_tracking.gif)

The left side of the image above shows the simulation robot turning according to the sound source localization angle. The right side shows the program output log, which includes DOA angle information.
