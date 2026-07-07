---
sidebar_position: 5
---

# 5.1.5 Using ROS2 Packages

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

Prerequisite: TogetheROS.Bot has been successfully installed.

tros.b is fully compatible with ROS2 Foxy/Humble/Jazzy interfaces and can reuse rich ROS2 tool packages. Here we use installing and using ROS2 image-transport as an example to introduce how to use ROS packages in tros.b.

## Installing ROS2 Packages

### 1 Add ROS apt Source

When installing tros.b, the ROS apt source is automatically added. No manual addition is required.

Update apt repository

```shell
sudo apt update
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
<DocScope products="RDK-S100">

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_s_doc/en/FAQ/hardware_and_system?v=4.0.5&p=RDK+S100#q6-how-do-i-handle-apt-update-failures-or-errors) section `Q6: How to handle apt update command failure or error?` for resolution.**
:::

</DocScope>
<DocScope products="RDK-S600">

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_s_doc/en/FAQ/hardware_and_system?v=5.1.0&p=RDK+S600#q6-how-do-i-handle-apt-update-failures-or-errors) section `Q6: How to handle apt update command failure or error?` for resolution.**
:::

</DocScope>

### 2 Install Packages

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
sudo apt install ros-foxy-image-transport
sudo apt install ros-foxy-image-transport-plugins
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
sudo apt install ros-humble-image-transport
sudo apt install ros-humble-image-transport-plugins
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
sudo apt install ros-jazzy-image-transport
sudo apt install ros-jazzy-image-transport-plugins
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
sudo apt install ros-humble-image-transport
sudo apt install ros-humble-image-transport-plugins
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
sudo apt install ros-jazzy-image-transport
sudo apt install ros-jazzy-image-transport-plugins
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
sudo apt install ros-jazzy-image-transport
sudo apt install ros-jazzy-image-transport-plugins
```

</TabItem>

</Tabs>
</DocScope>

## Using ROS2 Packages

Same as using ROS

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
source /opt/tros/setup.bash
ros2 run image_transport list_transports
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
source /opt/tros/humble/setup.bash
ros2 run image_transport list_transports
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
source /opt/tros/jazzy/setup.bash
ros2 run image_transport list_transports
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
source /opt/tros/humble/setup.bash
ros2 run image_transport list_transports
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
source /opt/tros/jazzy/setup.bash
ros2 run image_transport list_transports
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
source /opt/tros/jazzy/setup.bash
ros2 run image_transport list_transports
```

</TabItem>

</Tabs>
</DocScope>

The running result is as follows, showing the image formats supported by the image_transport package

```shell
root@ubuntu:/opt/tros# ros2 run image_transport list_transports
Declared transports:
image_transport/compressed
image_transport/compressedDepth
image_transport/raw
image_transport/theora

Details:
----------
"image_transport/compressed"
 - Provided by package: compressed_image_transport
 - Publisher:
      This plugin publishes a CompressedImage using either JPEG or PNG compression.

 - Subscriber:
      This plugin decompresses a CompressedImage topic.

----------
"image_transport/compressedDepth"
 - Provided by package: compressed_depth_image_transport
 - Publisher:
      This plugin publishes a compressed depth images using PNG compression.

 - Subscriber:
      This plugin decodes a compressed depth images.

----------
"image_transport/raw"
 - Provided by package: image_transport
 - Publisher:
      This is the default publisher. It publishes the Image as-is on the base topic.

 - Subscriber:
      This is the default pass-through subscriber for topics of type sensor_msgs/Image.

----------
"image_transport/theora"
 - Provided by package: theora_image_transport
 - Publisher:
      This plugin publishes a video packet stream encoded using Theora.

 - Subscriber:
      This plugin decodes a video packet stream encoded using Theora.
```
