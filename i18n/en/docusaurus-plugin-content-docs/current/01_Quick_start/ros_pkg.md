---
sidebar_position: 5
---

# 5.1.5 Using ROS2 Packages

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
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

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86) section `Q10: How to handle apt update command failure or error?` for resolution.**
:::

### 2 Install Packages

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

## Using ROS2 Packages

Same as using ROS

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
