---
sidebar_position: 4
sidebar_products: RDK-X3
---
# EfficientNet_Det

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Overview

The EfficientNet_Det object detection example uses images as input, performs inference on the BPU, and publishes algorithm messages containing object categories and bounding boxes.

EfficientNet_Det is an ONNX model obtained from (https://github.com/HorizonRobotics-Platform/ModelZoo/tree/master/EfficientDet), trained on the [COCO dataset](http://cocodataset.org/). It supports 80 object detection categories including people, animals, fruits, and vehicles.

Code repository: (https://github.com/D-Robotics/hobot_dnn)

Application scenarios: EfficientNet_Det can be used for vehicle detection and other tasks, mainly in autonomous driving, smart home, and related fields.

Smoke detection case study: (https://github.com/abg3/Smoke-Detection-using-Tensorflow-2.2)

## Supported Platforms

| Platform              | Runtime Environment | Example Features |
| --------------------- | ------------------- | ---------------- |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | · Start MIPI/USB camera and display inference rendering results via web<br/>· Use local feedback; rendered results are saved locally |

## Algorithm Information

| Model | Platform | Input Size | Inference Frame Rate (fps) |
| ---- | ---- | ------------ | ---- |
| EfficientNet | X3 | 1x3x512x512 | 54.58 |

## Prerequisites

### RDK Platform

1. The RDK has been flashed with the Ubuntu system image.

2. TogetheROS.Bot has been successfully installed on the RDK.

3. A MIPI or USB camera is installed on the RDK. If no camera is available, you can experience the algorithm by feeding local JPEG/PNG images or MP4, H.264, and H.265 videos.

4. Confirm that the PC can access the RDK over the network.

## Usage

### RDK Platform

#### Publish Images Using a MIPI Camera

The EfficientNet_Det object detection example subscribes to images published by the sensor package, performs inference, and publishes algorithm messages. The websocket package renders and displays the published images and corresponding algorithm results in a PC browser.

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
# 配置MIPI摄像头
export CAM_TYPE=mipi

# 启动launch文件
ros2 launch dnn_node_example dnn_node_example.launch.py dnn_example_config_file:=config/efficient_det_workconfig.json dnn_example_image_width:=480 dnn_example_image_height:=272
```

#### Publish Images Using a USB Camera

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
# 配置USB摄像头
export CAM_TYPE=usb

# 启动launch文件
ros2 launch dnn_node_example dnn_node_example.launch.py dnn_example_config_file:=config/efficient_det_workconfig.json dnn_example_image_width:=480 dnn_example_image_height:=272
```

#### Use Local Image Feedback

The EfficientNet_Det object detection example uses local JPEG/PNG images for feedback. After inference, images with rendered algorithm results are saved in the local working directory.

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
# 启动launch文件
ros2 launch dnn_node_example dnn_node_example_feedback.launch.py dnn_example_config_file:=config/efficient_det_workconfig.json dnn_example_image:=config/target.jpg
```

## Result Analysis

### Publish Images Using a Camera

The terminal outputs the following information during execution:

```shell
[example-3] [WARN] [1655093196.041759782] [example]: Create ai msg publisher with topic_name: hobot_dnn_detection
[example-3] [WARN] [1655093196.041878985] [example]: Create img hbmem_subscription with topic_name: /hbmem_img
[example-3] [WARN] [1655093197.405840936] [img_sub]: Sub img fps 8.57
[example-3] [WARN] [1655093197.687361687] [example]: Smart fps 8.04
[example-3] [WARN] [1655093198.559784569] [img_sub]: Sub img fps 6.94
[example-3] [WARN] [1655093198.891958094] [example]: Smart fps 6.64
[example-3] [WARN] [1655093199.735312707] [img_sub]: Sub img fps 6.81
[example-3] [WARN] [1655093200.013067298] [example]: Smart fps 7.14
[example-3] [WARN] [1655093200.890569474] [img_sub]: Sub img fps 6.93
[example-3] [WARN] [1655093201.175239677] [example]: Smart fps 6.88
[example-3] [WARN] [1655093202.011887441] [img_sub]: Sub img fps 7.14
[example-3] [WARN] [1655093202.302124315] [example]: Smart fps 7.10
```

The log shows that the topic for publishing algorithm inference results is `hobot_dnn_detection`, and the topic for subscribing to images is `/hbmem_img`.

Enter http://IP:8000 in a PC browser to view the image and algorithm rendering results (IP is the RDK's IP address):

![render_web](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/detection/image/box_basic/efficient_det_render_web.jpeg)

### Use Local Image Feedback

The terminal outputs the following information during execution:

```shell
[example-1] [INFO] [1654931461.278066695] [example]: Output from image_name: config/target.jpg, frame_id: feedback, stamp: 0.0
[example-1] [INFO] [1654931461.278186816] [PostProcessBase]: outputs size: 10
[example-1] [INFO] [1654931461.278231981] [PostProcessBase]: out box size: 2
[example-1] [INFO] [1654931461.278303520] [PostProcessBase]: det rect: 380.107 170.888 511.048 372.511, det type: potted plant, score:1.16971
[example-1] [INFO] [1654931461.278396934] [PostProcessBase]: det rect: 79.3884 263.497 373.645 372.554, det type: couch, score:1.0287
```

The log shows that the algorithm detected 2 objects from the input image and output the bounding box coordinates (in the order of top-left x and y, then bottom-right x and y) and categories. The saved rendered image file is named render_feedback_0_0.jpeg. Rendered image result:

![render_feedback](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/detection/image/box_basic/efficient_det_render_feedback.jpeg)
