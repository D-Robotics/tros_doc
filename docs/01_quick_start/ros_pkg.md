---
sidebar_position: 5
---

# 5.1.5 使用 ROS2 package

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

前提：已成功安装 TogetheROS.Bot

tros.b 和 ROS2 Foxy/Humble/Jazzy 版本接口完全兼容，能够复用 ROS2 丰富工具包，这里以安装和使用 ROS2 image-transport 为例介绍如何在 tros.b 中使用 ROS package。

## 安装 ROS2 package

### 1 添加 ROS apt 源

安装 tros.b 时，已自动添加 ROS apt 源，无需手动添加。

更新 apt 仓库

```shell
sudo apt update
```

<DocScope products="RDK-X3,RDK-X5">
:::caution **注意**
<DocScope products="RDK-X3">
**如果 `sudo apt update` 命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system?v=3.0.0&p=RDK+X3#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的 `Q10: apt update 命令执行失败或报错如何处理？` 解决。**
</DocScope>
<DocScope products="RDK-X5">
**如果 `sudo apt update` 命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的 `Q10: apt update 命令执行失败或报错如何处理？` 解决。**
</DocScope>
:::
</DocScope>
<DocScope products="RDK-S100,RDK-S600">
:::caution **注意**
<DocScope products="RDK-S100">
**如果 `sudo apt update` 命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_s_doc/FAQ/hardware_and_system#q6-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的 `Q6: apt update 命令执行失败或报错如何处理？` 解决。**
</DocScope>
<DocScope products="RDK-S600">
**如果 `sudo apt update` 命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_s_doc/FAQ/hardware_and_system?v=5.1.0&p=RDK+S600#q6-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的 `Q6: apt update 命令执行失败或报错如何处理？` 解决。**
</DocScope>
:::
</DocScope>

### 2 安装 packages

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

## 使用 ROS2 package

与 ROS 使用一样

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

运行结果如下，展示了 image_transport package 支持的图像格式

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
