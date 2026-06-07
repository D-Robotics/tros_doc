---
sidebar_position: 4
---

# 5.1.4 Run "Hello World"

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

Prerequisite: TogetheROS.Bot has been successfully installed via DEB package or source code installation.

Start two terminals, both ssh logged into the RDK or X86 platform device.

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

Run in the first terminal

```shell
source /opt/tros/setup.bash
ros2 run examples_rclcpp_minimal_subscriber subscriber_member_function
```

Run in the second terminal

```shell
source /opt/tros/setup.bash
ros2 run examples_rclcpp_minimal_publisher publisher_member_function
```

</TabItem>

<TabItem value="humble" label="Humble">

Install the package corresponding to the `Hello World` example:

```shell
sudo apt update
sudo apt install ros-humble-examples-rclcpp-minimal-publisher ros-humble-examples-rclcpp-minimal-subscriber
```

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

Run in the first terminal

```shell
source /opt/tros/humble/setup.bash
ros2 run examples_rclcpp_minimal_subscriber subscriber_member_function
```

Run in the second terminal

```shell
source /opt/tros/humble/setup.bash
ros2 run examples_rclcpp_minimal_publisher publisher_member_function
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

Install the package corresponding to the `Hello World` example:

```shell
sudo apt update
sudo apt install ros-jazzy-examples-rclcpp-minimal-publisher ros-jazzy-examples-rclcpp-minimal-subscriber
```

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

Run in the first terminal

```shell
source /opt/tros/jazzy/setup.bash
ros2 run examples_rclcpp_minimal_subscriber subscriber_member_function
```

Run in the second terminal

```shell
source /opt/tros/jazzy/setup.bash
ros2 run examples_rclcpp_minimal_publisher publisher_member_function
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

Install the package corresponding to the `Hello World` example:

```shell
sudo apt update
sudo apt install ros-humble-examples-rclcpp-minimal-publisher ros-humble-examples-rclcpp-minimal-subscriber
```

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_s_doc/en/FAQ/hardware_and_system?v=4.0.5&p=RDK+S100#q6-how-do-i-handle-apt-update-failures-or-errors) section `Q6: How to handle apt update command failure or error?` for resolution.**
:::

Run in the first terminal

```shell
source /opt/tros/humble/setup.bash
ros2 run examples_rclcpp_minimal_subscriber subscriber_member_function
```

Run in the second terminal

```shell
source /opt/tros/humble/setup.bash
ros2 run examples_rclcpp_minimal_publisher publisher_member_function
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

Install the package corresponding to the `Hello World` example:

```shell
sudo apt update
sudo apt install ros-jazzy-examples-rclcpp-minimal-publisher ros-jazzy-examples-rclcpp-minimal-subscriber
```

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_s_doc/en/FAQ/hardware_and_system?v=5.1.0&p=RDK+S600#q6-how-do-i-handle-apt-update-failures-or-errors) section `Q6: How to handle apt update command failure or error?` for resolution.**
:::

Run in the first terminal

```shell
source /opt/tros/jazzy/setup.bash
ros2 run examples_rclcpp_minimal_subscriber subscriber_member_function
```

Run in the second terminal

```shell
source /opt/tros/jazzy/setup.bash
ros2 run examples_rclcpp_minimal_publisher publisher_member_function
```

</TabItem>

</Tabs>
</DocScope>


The running effect is shown below

![hello world](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/01_quick_start/image/hello_world/hello_world.png)
You can see the left terminal acts as pub, continuously sending "'Hello, world! N", and the right terminal acts as sub, continuously receiving "'Hello, world! N"

OK, tros.b has been successfully installed and verified!
