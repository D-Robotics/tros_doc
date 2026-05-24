---
sidebar_position: 2
sidebar_products: RDK-X3,RDK-X5,RDK-S100
---

# 5.4.2 Navigation2

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Overview

Nav2 (Navigation2) is the built-in navigation framework in ROS2, designed to find a safe way for mobile robots to move from point A to point B. Nav2 can also be applied to other robot navigation scenarios, such as dynamic point tracking, which requires dynamic path planning, motor speed calculation, obstacle avoidance, and more.

[SLAM Mapping](./slam) describes how to run SLAM algorithms for mapping. This section describes how to use Nav2 for navigation based on the built map. Similarly, Gazebo is used on the PC to create a virtual environment and robot, Rviz2 is used to set navigation destinations, and the RDK runs the Nav2 program for navigation.


## Supported Platforms

| Platform    | Runtime Environment     | Example Functionality                       |
| ------- | ------------ | ------------------------------ |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | Start the simulation environment on the PC, start navigation on the RDK, and display navigation results via Rviz2 |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | Start the simulation environment on the PC, start navigation on the RDK, and display navigation results via Rviz2 |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) | Start the simulation environment on the PC, start navigation on the RDK, and display navigation results via Rviz2 |

## Preparation

### RDK Platform

1. The RDK has been flashed with the Ubuntu system image.

2. tros.b has been successfully installed on the RDK.

3. After tros.b is installed, install Nav2.

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

```shell
sudo apt update 
sudo apt install ros-${ROS_DISTRO}-navigation2
sudo apt install ros-${ROS_DISTRO}-nav2-bringup
```

<DocScope products="RDK-X3,RDK-X5">

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://liqinglian01.github.io/rdk_x_doc1/FAQ/hardware_and_system#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86) section `Q10: How to handle apt update command failure or error?` for resolution.**
:::
</DocScope>
<DocScope products="RDK-S100">
:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://liqinglian01.github.io/rdk_s_doc/FAQ/hardware_and_system#q6-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86) section `Q6: How to handle apt update command failure or error?` for resolution.**
:::
</DocScope>

4. A PC on the same network as the RDK with Ubuntu, ROS2 desktop edition, Gazebo simulation environment, and Rviz2 visualization tool installed.

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
</Tabs>

After ROS2 is installed on the PC, install Gazebo and Turtlebot3 related packages as follows:

```bash
sudo apt-get install ros-${ROS_DISTRO}-gazebo-*
sudo apt install ros-${ROS_DISTRO}-turtlebot3*
sudo apt install ros-${ROS_DISTRO}-navigation2
sudo apt install ros-${ROS_DISTRO}-nav2-bringup
```

## Usage

### RDK Platform

This section describes how to set up the simulation environment on the PC, configure navigation destinations, run navigation on the RDK, and view navigation results.

1. **PC**: Start the Gazebo simulation environment

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

   ```shell
   export TURTLEBOT3_MODEL=waffle
   ros2 launch turtlebot3_gazebo turtlebot3_world.launch.py
   ```

   :::info
   If startup fails with the error `[ERROR] [gzclient-2]: process has died`, run `source /usr/share/gazebo/setup.sh` and start again.
   :::

   The simulation environment is shown below:

   ![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/nav2/gazebo.png)

2. **RDK**: Start navigation

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

3. **PC**: Start Rviz2

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


   ```shell
   ros2 launch nav2_bringup rviz_launch.py
   ```

   Rviz2 display is shown below:

   ![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/nav2/rviz.png)

(1) Set the robot's initial position and orientation in Rviz2

   After Rviz2 starts, the robot initially does not know its location. By default, Nav2 waits for the user to provide an approximate starting position. Check the robot's position in Gazebo and locate it on the map. Click the "2D Pose Estimate" button in Rviz2, then click on the map at the robot's estimated position. Drag forward from the clicked position to set the robot's initial movement direction. As shown below:

   ![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/nav2/rviz_init.png)

   Once the robot's initial position is set, the transform tree is completed and Nav2 becomes fully active and ready. You can then see the robot and point cloud.

   ![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/nav2/rviz_start.png)

(2) Set the destination in Rviz2

   Click the "Navigaton2 Goal" button and select a destination.

   ![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/nav2/rviz_goal.png)

   You can now see the robot moving.

## Result Analysis

The navigation result is shown below:

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/nav2/rviz_nav2.gif)
