---
sidebar_position: 3
sidebar_products: RDK-X3,RDK-X5
---
# MobileNet_SSD

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Overview

The MobileNet_SSD object detection example uses images as input, performs inference on the BPU, and publishes algorithm messages containing object categories and bounding boxes.

Mobilenet_SSD is a Caffe model obtained from (https://github.com/chuanqi305/MobileNet-SSD), trained on the [VOC dataset](http://host.robots.ox.ac.uk/pascal/VOC/voc2012/). It supports 20 object detection categories including people, animals, fruits, and vehicles.

Code repository: (https://github.com/D-Robotics/hobot_dnn)

Application scenarios: MobileNet_SSD is an object detection algorithm based on MobileNet, offering fast speed and easy deployment. It can be used for object detection, garbage recognition, and other tasks, mainly in autonomous driving, smart home, and related fields.

Face detection case study: (https://github.com/bruceyang2012/Face-detection-with-mobilenet-ssd)    
License plate detection case study: (https://github.com/soonhahwang/Mobilenet-SSD-to-detect-Licence-Plate)

## Supported Platforms

| Platform              | Runtime Environment | Example Features |
| --------------------- | ------------------- | ---------------- |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | · Start MIPI/USB camera and display inference rendering results via web<br/>· Use local feedback; rendered results are saved locally |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | · Start MIPI/USB camera and display inference rendering results via web<br/>· Use local feedback; rendered results are saved locally |
| X86                   | Ubuntu 20.04 (Foxy) | · Use local feedback; rendered results are saved locally |

## Algorithm Information

| Model | Platform | Input Size | Inference Frame Rate (fps) |
| ---- | ---- | ------------ | ---- |
| ssd_mobilenet | X3 | 1x3x300x300 | 141.60 |
| ssd_mobilenet | X5 | 1x3x300x300 | 453.98 |

## Prerequisites

### RDK Platform

1. The RDK has been flashed with the Ubuntu system image.

2. TogetheROS.Bot has been successfully installed on the RDK.

3. A MIPI or USB camera is installed on the RDK. If no camera is available, you can experience the algorithm by feeding local JPEG/PNG images or MP4, H.264, and H.265 videos.

4. Confirm that the PC can access the RDK over the network.

### X86 Platform

1. The X86 environment is configured with Ubuntu 20.04 system image.

2. tros.b has been successfully installed on the X86 environment.

## Usage

### RDK Platform

#### Publish Images Using a MIPI Camera

The MobileNet_SSD object detection example subscribes to images published by the sensor package, performs inference, and publishes algorithm messages. The websocket package renders and displays the published images and corresponding algorithm results in a PC browser.

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


```shell
# 配置MIPI摄像头
export CAM_TYPE=mipi

# 启动launch文件
ros2 launch dnn_node_example dnn_node_example.launch.py dnn_example_config_file:=config/mobilenet_ssd_workconfig.json dnn_example_image_width:=480 dnn_example_image_height:=272
```

#### Publish Images Using a USB Camera

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


```shell
# 配置USB摄像头
export CAM_TYPE=usb

# 启动launch文件
ros2 launch dnn_node_example dnn_node_example.launch.py dnn_example_config_file:=config/mobilenet_ssd_workconfig.json dnn_example_image_width:=480 dnn_example_image_height:=272
```

#### Use Local Image Feedback

The MobileNet_SSD object detection example uses local JPEG/PNG images for feedback. After inference, images with rendered algorithm results are saved in the local working directory.

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


```shell
# 启动launch文件
ros2 launch dnn_node_example dnn_node_example_feedback.launch.py dnn_example_config_file:=config/mobilenet_ssd_workconfig.json dnn_example_image:=config/target.jpg
```

### X86 Platform

#### Use Local Image Feedback

The MobileNet_SSD object detection example uses local JPEG/PNG images for feedback. After inference, images with rendered algorithm results are saved in the local working directory.

```bash
# 配置tros.b环境
source /opt/tros/setup.bash

# 启动launch文件
ros2 launch dnn_node_example dnn_node_example_feedback.launch.py dnn_example_config_file:=config/mobilenet_ssd_workconfig.json dnn_example_image:=config/target.jpg
```

## Result Analysis

### Publish Images Using a Camera

The terminal outputs the following information during execution:

```shell
[example-3] [WARN] [1655095279.473675326] [example]: Create ai msg publisher with topic_name: hobot_dnn_detection
[example-3] [WARN] [1655095279.473789113] [example]: Create img hbmem_subscription with topic_name: /hbmem_img
[example-3] [WARN] [1655095280.697388819] [img_sub]: Sub img fps 31.16
[example-3] [WARN] [1655095280.710505278] [example]: Smart fps 31.50
[example-3] [WARN] [1655095281.697831409] [img_sub]: Sub img fps 30.00
[example-3] [WARN] [1655095281.743811574] [example]: Smart fps 30.01
[example-3] [WARN] [1655095282.730768103] [img_sub]: Sub img fps 30.04
[example-3] [WARN] [1655095282.744084511] [example]: Smart fps 30.00
```

The log shows that the topic for publishing algorithm inference results is `hobot_dnn_detection`, and the topic for subscribing to images is `/hbmem_img`. The subscribed image and algorithm inference output frame rate is approximately 30 fps.

Enter http://IP:8000 in a PC browser to view the image and algorithm rendering results (IP is the RDK's IP address):

![render_web](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/detection/image/box_basic/mobilenet_ssd_render_web.jpeg)

### Use Local Image Feedback

The terminal outputs the following information during execution:

```shell
[example-1] [INFO] [1654930510.201326806] [example]: Output from image_name: config/target.jpg, frame_id: feedback, stamp: 0.0
[example-1] [INFO] [1654930510.201485092] [PostProcessBase]: outputs size: 12
[example-1] [INFO] [1654930510.201581047] [PostProcessBase]: out box size: 2
[example-1] [INFO] [1654930510.201672794] [PostProcessBase]: det rect: 227.27 101.873 299.219 223.667, det type: pottedplant, score:0.995207
[example-1] [INFO] [1654930510.201778415] [PostProcessBase]: det rect: 62.3792 155.731 221.676 223.179, det type: sofa, score:0.982129
```

The log shows that the algorithm detected 2 objects from the input image and output the bounding box coordinates (in the order of top-left x and y, then bottom-right x and y) and categories. The saved rendered image file is named render_feedback_0_0.jpeg. Rendered image result:

![render_feedback](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/detection/image/box_basic/mobilenet_ssd_render_feedback.jpeg)
