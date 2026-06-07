---
sidebar_position: 1
---

# 5.4.1 SLAM Mapping

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Overview

SLAM stands for Simultaneous Localization and Mapping.
This section uses ROS2 SLAM-Toolbox as the mapping algorithm. Control the robot in Gazebo to build a map and observe the mapping result in Rviz2.
SLAM-Toolbox runs on the RDK, while Gazebo and Rviz2 run on a PC on the same network as the RDK.

## Supported Platforms

| Platform    | Runtime Environment     |
| ------- | ------------ |
| RDK X3, RDK X3 Module, | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) |
| RDK S600 | Ubuntu 24.04 (Jazzy) |
## Preparation

### RDK Platform

1. The RDK has been flashed with the Ubuntu system image.

2. TogetheROS.Bot has been successfully installed on the RDK.

3. After tros.b is installed, install SLAM-Toolbox

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
 If installation fails with the following error:

 ```bash
   The following packages have unmet dependencies:
    ros-foxy-slam-toolbox : Depends: ros-foxy-nav2-map-server but it is not going to be installed
   E: Unable to correct problems, you have held broken packages.
 ```

 Run the following commands before installing again:
 
   apt update

   sudo apt install libwebp6=0.6.1-2ubuntu0.20.04.3
:::

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
<DocScope products="RDK-S100">

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_s_doc/FAQ/hardware_and_system#q6-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86) section `Q6: How to handle apt update command failure or error?` for resolution.**
:::

</DocScope>
<DocScope products="RDK-S600">

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_s_doc/en/FAQ/hardware_and_system?v=5.1.0&p=RDK+S600#q6-how-do-i-handle-apt-update-failures-or-errors) section `Q6: How to handle apt update command failure or error?` for resolution.**
:::

</DocScope>
:::

4. A PC on the same network as the RDK with Ubuntu, ROS2 desktop edition, Gazebo simulation environment, and Rviz2 visualization tool installed.

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
source /opt/ros/foxy/setup.bash
```

Ubuntu 20.04 and [ROS2 Foxy desktop edition](https://docs.ros.org/en/foxy/Installation/Ubuntu-Install-Debians.html)

</TabItem>

<TabItem value="humble" label="Humble">

```bash
source /opt/ros/humble/setup.bash
```
Ubuntu 22.04 and [ROS2 Humble desktop edition](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html)

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
source /opt/ros/jazzy/setup.bash
```
Ubuntu 24.04 and [ROS2 Jazzy desktop edition](https://docs.ros.org/en/jazzy/Installation/Ubuntu-Install-Debians.html)

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
source /opt/ros/humble/setup.bash
```
Ubuntu 22.04 and [ROS2 Humble desktop edition](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html)

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
source /opt/ros/jazzy/setup.bash
```
Ubuntu 24.04 and [ROS2 Jazzy desktop edition](https://docs.ros.org/en/jazzy/Installation/Ubuntu-Install-Debians.html)

</TabItem>

</Tabs>
</DocScope>


After ROS2 is installed on the PC, install Gazebo and Turtlebot3 related packages as follows:

```bash
sudo apt-get install ros-${ROS_DISTRO}-gazebo-*
sudo apt install ros-${ROS_DISTRO}-turtlebot3
sudo apt install ros-${ROS_DISTRO}-turtlebot3-bringup
sudo apt install ros-${ROS_DISTRO}-turtlebot3-simulations
sudo apt install ros-${ROS_DISTRO}-teleop-twist-keyboard
```

## Usage

### RDK Platform

This section describes how to run the SLAM algorithm on the RDK and observe the mapping result on the PC.

Start the simulation environment on the PC:

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
 If startup fails with the error `[ERROR] [gzclient-2]: process has died`, run `source /usr/share/gazebo/setup.sh` and start again.
:::

The simulation environment is shown below:
![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/slam/gazebo.jpg)

Open another console on the PC and start Rviz2 to observe the mapping result:

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

After opening Rviz2, add the "map" visualization option to display the built map as shown below:
![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/slam/rvizsetting.jpg)

Run SLAM-Toolbox on the RDK:

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

Open another console on the PC and start the control tool. Use the keyboard to control robot movement. Refer to the log printed in the console for control instructions, which are not repeated here:

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

Drive the robot around. As the lidar detects more environmental information, the SLAM algorithm builds the environment map, which can be observed in Rviz2.
![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/06_Application_case/amr/map.jpg)

## Result Analysis

The RDK terminal outputs the following information:

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
