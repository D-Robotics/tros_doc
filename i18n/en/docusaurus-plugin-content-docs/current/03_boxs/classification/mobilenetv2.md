---
sidebar_position: 1
---
# mobilenetv2

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Overview

The mobilenetv2 image classification example uses images as input, performs inference on the BPU, and publishes algorithm messages containing object categories.

mobilenetv2 is a Caffe model trained on the [ImageNet data](http://www.image-net.org/) dataset. Model source: https://github.com/shicai/MobileNet-Caffe .
It supports 1000 object categories including people, animals, fruits, and vehicles. For the full list of supported categories, see the RDK board file at /opt/tros/`${TROS_DISTRO}`/lib/dnn_node_example/config/imagenet.list (requires TogetheROS.Bot to be installed).

Code repository: https://github.com/D-Robotics/hobot_dnn

Application scenarios: mobilenetv2 can predict the category of a given image and can be used for digit recognition, object recognition, and other tasks, mainly in text recognition, image retrieval, and related fields.

Food type recognition case study: https://github.com/frotms/Chinese-and-Western-Food-Classification

## Supported Platforms

| Platform    | Runtime Environment      | Example Features                       |
| ------- | ------------ | ------------------------------ |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | · Start MIPI/USB camera and display inference rendering results via web<br/>· Use local feedback; rendered results are saved locally |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | · Start MIPI/USB camera and display inference rendering results via web<br/>· Use local feedback; rendered results are saved locally |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) | · Start MIPI/USB camera and display inference rendering results via web<br/>· Use local feedback; rendered results are saved locally |
| RDK S600 | Ubuntu 24.04 (Jazzy) | · Start MIPI/USB camera and display inference rendering results via web<br/>· Use local feedback; rendered results are saved locally |
| X86     | Ubuntu 20.04 (Foxy) | · Use local feedback; rendered results are saved locally |

## Algorithm Information

| Model | Platform | Input Size | Inference Frame Rate (fps) |
| ---- | ---- | ------------ | ---- |
| mobilenetv2 | X3 | 1x3x224x224 | 414.17 |
| mobilenetv2 | X5 | 1x3x224x224 | 683.46 |
| mobilenetv2 | S100 | 1x3x224x224 | 1722.25 |
| mobilenetv2 | S600 | 1x3x224x224 | 2721.90 |

## Prerequisites

### RDK Platform

1. The RDK has been flashed with the Ubuntu system image.

2. tros.b has been successfully installed on the RDK.

3. A MIPI or USB camera is installed on the RDK. If no camera is available, you can experience the algorithm by feeding local JPEG/PNG images or MP4, H.264, and H.265 videos.

4. Confirm that the PC can access the RDK over the network.

### X86 Platform

1. The X86 environment is configured with Ubuntu 20.04 system image.

2. tros.b has been successfully installed on the X86 environment.

## Usage

### RDK Platform

The mobilenetv2 image classification example subscribes to images published by the sensor package, performs inference, and publishes algorithm messages. The websocket package renders and displays the published images and corresponding algorithm results in a PC browser.

#### Publish Images Using a MIPI Camera

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


```shell
# 配置MIPI摄像头
export CAM_TYPE=mipi

# 启动launch文件
ros2 launch dnn_node_example dnn_node_example.launch.py dnn_example_config_file:=config/mobilenetv2workconfig.json dnn_example_image_width:=480 dnn_example_image_height:=272
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
<TabItem value="jazzy" label="Jazzy">

```bash
# 配置tros.b环境
source /opt/tros/jazzy/setup.bash
```

</TabItem>
</Tabs>

```shell
# 配置USB摄像头
export CAM_TYPE=usb

# 启动launch文件
ros2 launch dnn_node_example dnn_node_example.launch.py dnn_example_config_file:=config/mobilenetv2workconfig.json dnn_example_image_width:=480 dnn_example_image_height:=272
```

#### Use Local Image Feedback

The mobilenetv2 image classification example uses local JPEG/PNG images for feedback. After inference, images with rendered algorithm results are saved in the local working directory.

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

```shell
# 启动launch文件
ros2 launch dnn_node_example dnn_node_example_feedback.launch.py dnn_example_config_file:=config/mobilenetv2workconfig.json dnn_example_image:=config/target_class.jpg
```

### X86 Platform

#### Use Local Image Feedback

The mobilenetv2 image classification example uses local JPEG/PNG images for feedback. After inference, images with rendered algorithm results are saved in the local working directory.

```bash
# 配置tros.b环境
source /opt/tros/setup.bash

# 启动launch文件
ros2 launch dnn_node_example dnn_node_example_feedback.launch.py dnn_example_config_file:=config/mobilenetv2workconfig.json dnn_example_image:=config/target_class.jpg
```

## Result Analysis

### Publish Images Using a Camera

The terminal outputs the following information during execution:

```shell
[example-3] [WARN] [1655095481.707875587] [example]: Create ai msg publisher with topic_name: hobot_dnn_detection
[example-3] [WARN] [1655095481.707983957] [example]: Create img hbmem_subscription with topic_name: /hbmem_img
[example-3] [WARN] [1655095482.985732162] [img_sub]: Sub img fps 31.07
[example-3] [WARN] [1655095482.992031931] [example]: Smart fps 31.31
[example-3] [WARN] [1655095484.018818843] [img_sub]: Sub img fps 30.04
[example-3] [WARN] [1655095484.025123362] [example]: Smart fps 30.04
[example-3] [WARN] [1655095485.051988567] [img_sub]: Sub img fps 30.01
[example-3] [WARN] [1655095486.057854228] [example]: Smart fps 30.07
```

The log shows that the topic for publishing algorithm inference results is `hobot_dnn_detection`, and the topic for subscribing to images is `/hbmem_img`. The subscribed image and algorithm inference output frame rate is approximately 30 fps.

Enter http://IP:8000 in a PC browser to view the image and algorithm rendering results (IP is the RDK's IP address):

![render_web](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/classification/image/mobilenetv2/mobilenetv2_render_web.jpeg)

### Use Local Image Feedback

The terminal outputs the following information during execution:

```shell
[example-1] [INFO] [1654767648.897132079] [example]: The model input width is 224 and height is 224
[example-1] [INFO] [1654767648.897180241] [example]: Dnn node feed with local image: config/target_class.jpg
[example-1] [INFO] [1654767648.935638968] [example]: task_num: 2
[example-1] [INFO] [1654767648.946566665] [example]: Output from image_name: config/target_class.jpg, frame_id: feedback, stamp: 0.0
[example-1] [INFO] [1654767648.946671029] [ClassificationPostProcess]: outputs size: 1
[example-1] [INFO] [1654767648.946718774] [ClassificationPostProcess]: out cls size: 1
[example-1] [INFO] [1654767648.946773602] [ClassificationPostProcess]: class type:window-shade, score:0.776356
[example-1] [INFO] [1654767648.947251721] [ImageUtils]: target size: 1
[example-1] [INFO] [1654767648.947342212] [ImageUtils]: target type: window-shade, rois.size: 1
[example-1] [INFO] [1654767648.947381666] [ImageUtils]: roi.type: , x_offset: 112 y_offset: 112 width: 0 height: 0
[example-1] [WARN] [1654767648.947563731] [ImageUtils]: Draw result to file: render_feedback_0_0.jpeg
```

The log shows that the algorithm classified the input image config/target_class.jpg as window-shade with a confidence of 0.776356 (the algorithm only outputs the classification result with the highest confidence). The saved rendered image file is named render_feedback_0_0.jpeg. Rendered image result:

![render_feedback](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/classification/image/mobilenetv2/mobilenetv2_render_feedback.jpeg)
