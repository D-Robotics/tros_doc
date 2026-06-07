---
sidebar_position: 2
---
# YOLO

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Function Introduction

The YOLO object detection algorithm example uses images as input, performs algorithm inference using the BPU, and publishes algorithm messages containing object categories and detection boxes. Currently supported versions include YOLOv2, YOLOv3, Ultralytics YOLOv5, YOLOv5x, Ultralytics YOLOv8, YOLOv10, YOLOv11, YOLOv12, and others.

The model is trained using the [COCO dataset](http://cocodataset.org/) and supports object detection for 80 types, including people, animals, fruits, vehicles, etc.

You can also use the Ultralytics package to train custom datasets. (https://docs.ultralytics.com/modes/train)

Code repository: (https://github.com/D-Robotics/hobot_dnn)

Application scenarios: As a representative algorithm in single-stage object detection, the YOLO series offers fast speed and good generalization. It can be used for tasks such as garbage recognition and vehicle detection, primarily in fields like autonomous driving and smart homes.

Vehicle detection case: (https://github.com/JunshengFu/vehicle-detection)  
Fall detection case: (https://github.com/xiaobin1231/Fall-Detection-By-YOLOV3-and-LiteFlowNet)

## Supported Platforms

| Platform              | Operating Mode          | Supported Algorithms                    | Example Features                                                                                                                                 |
| --------------------- | ----------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | yolov2/yolov3/yolov5                    | · Start MIPI/USB camera and display inference results on a web page<br/>· Use local image injection and save rendered results locally           |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble)   | yolov2/yolov3/yolov5/yolov8/yolov10/yolov11/yolov12/yolo26 | · Start MIPI/USB camera and display inference results on a web page<br/>· Use local image injection and save rendered results locally           |
| RDK S100, RDK S100P   | Ubuntu 22.04 (Humble)   | yolov2/yolov3/yolov5/yolov8/yolov10/yolov11/yolov12 | · Start MIPI/USB camera and display inference results on a web page<br/>· Use local image injection and save rendered results locally           |
| RDK S600              | Ubuntu 24.04 (Jazzy)    | yolov2/yolov3/yolov5                    | · Start MIPI/USB camera and display inference results on a web page<br/>· Use local image injection and save rendered results locally           |
| X86                   | Ubuntu 20.04 (Foxy)     | yolov2/yolov3                           | · Use local image injection and save rendered results locally                                                                                   |

## Algorithm Information

<DocScope products="RDK-X3">

| Model  | Platform | Input Size       | Inference Frame Rate (fps) |
| ------ | -------- | ---------------- | -------------------------- |
| yolov2 | X3       | 1x608x608x3      | 12.60                      |
| yolov3 | X3       | 1x416x416x3      | 11.71                      |
| yolov5 | X3       | 1x512x512x3      | 32.62                      |

</DocScope>
<DocScope products="RDK-X5">

| Model    | Platform | Input Size       | Inference Frame Rate (fps) |
| -------- | -------- | ---------------- | -------------------------- |
| yolov2   | X5       | 1x608x608x3      | 38.33                      |
| yolov3   | X5       | 1x416x416x3      | 31.28                      |
| yolov5   | X5       | 1x512x512x3      | 10.37                      |
| yolov8n  | X5       | 1x3x640x640      | 140.46                     |
| yolov10n | X5       | 1x3x640x640      | 36.47                      |
| yolov11m | X5       | 1x3x640x640      | 28.95                      |
| yolov12m | X5       | 1x3x640x640      | 74                         |
| yolo26n  | X5       | 1x3x640x640      | 67.48                      |

</DocScope>
<DocScope products="RDK-S100">

| Model    | Platform | Input Size       | Inference Frame Rate (fps) |
| -------- | -------- | ---------------- | -------------------------- |
| yolov2   | S100     | 1x3x608x608      | 226.19                     |
| yolov3   | S100     | 1x3x416x416      | 212.55                     |
| yolov5   | S100     | 1x3x672x672      | 62.24                      |
| yolov8n  | S100     | 1x3x640x640      | 506.57                     |
| yolov10n | S100     | 1x3x640x640      | 494.10                     |
| yolov11m | S100     | 1x3x640x640      | 162.46                     |
| yolo12n  | S100     | 1x3x640x640      | 42.66                      |

</DocScope>
<DocScope products="RDK-S600">

| Model  | Platform | Input Size       | Inference Frame Rate (fps) |
| ------ | -------- | ---------------- | -------------------------- |
| yolov2 | S600     | 1x3x608x608      | 204.70                     |
| yolov3 | S600     | 1x3x416x416      | 411.17                     |
| yolov5 | S600     | 1x3x672x672      | 121.78                     |

</DocScope>

## Preparation

### RDK Platform

1. The RDK is flashed with the Ubuntu system image.
2. TogetheROS.Bot is successfully installed on the RDK.
3. A MIPI or USB camera is installed on the RDK. If no camera is available, you can experience the algorithm by injecting local JPEG/PNG images or MP4, H.264, and H.265 videos.
4. Ensure that the PC can access the RDK over the network.

### X86 Platform

1. The X86 environment is configured with the Ubuntu 20.04 system image.
2. Tros.b is successfully installed on the X86 environment.

## Usage Guide

### RDK Platform

#### Publishing Images Using a MIPI Camera

The YOLOv2 object detection algorithm example subscribes to images published by the MIPI camera, performs algorithm inference, publishes the algorithm message, and uses the websocket package to render and display the published images and corresponding algorithm results in a PC browser.

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
# Configure the tros.b environment
source /opt/tros/setup.bash
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
# Configure the tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
# Configure the tros.b environment
source /opt/tros/jazyy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# Configure the tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
# Configure the tros.b environment
source /opt/tros/jazyy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

```shell
# Configure the MIPI camera
export CAM_TYPE=mipi

# Launch the launch file
ros2 launch dnn_node_example dnn_node_example.launch.py dnn_example_config_file:=config/yolov2workconfig.json dnn_example_image_width:=1920 dnn_example_image_height:=1080
```

#### Publishing Images Using a USB Camera

The YOLOv2 object detection algorithm example subscribes to images published by the USB camera, performs algorithm inference, publishes the algorithm message, and uses the websocket package to render and display the published images and corresponding algorithm results in a PC browser.

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
# Configure the tros.b environment
source /opt/tros/setup.bash
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
# Configure the tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
# Configure the tros.b environment
source /opt/tros/jazyy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# Configure the tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
# Configure the tros.b environment
source /opt/tros/jazyy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

```shell
# Configure the USB camera
export CAM_TYPE=usb

# Launch the launch file
ros2 launch dnn_node_example dnn_node_example.launch.py dnn_example_config_file:=config/yolov2workconfig.json dnn_example_image_width:=1920 dnn_example_image_height:=1080
```

#### Using Local Image Injection

The YOLOv2 object detection algorithm example uses local JPEG/PNG images for injection, performs inference, and saves the rendered images with algorithm results in the local runtime directory.

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
# Configure the tros.b environment
source /opt/tros/setup.bash
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
# Configure the tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
# Configure the tros.b environment
source /opt/tros/jazyy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# Configure the tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
# Configure the tros.b environment
source /opt/tros/jazyy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

```shell
# Launch the launch file
ros2 launch dnn_node_example dnn_node_example_feedback.launch.py dnn_example_config_file:=config/yolov2workconfig.json dnn_example_image:=config/target.jpg
```

In addition to the YOLOv2 algorithm, other algorithms in the YOLO series are also supported. Use the `config_file` parameter in the launch command to switch algorithms. For example, to use YOLOv3, set `dnn_example_config_file:="config/yolov3workconfig.json"`; for YOLOv5, set `dnn_example_config_file:="config/yolov5workconfig.json"`; for YOLOv8, set `dnn_example_config_file:="config/yolov8workconfig.json"`; for YOLOv10, set `dnn_example_config_file:="config/yolov10workconfig.json"`; for YOLOv11, set `dnn_example_config_file:="config/yolov11workconfig.json"`; for YOLOv12, set `dnn_example_config_file:="config/yolov12workconfig.json"`; for YOLO26, set `dnn_example_config_file:="config/yolo26workconfig.json"`.

### X86 Platform

#### Using Local Image Injection

The YOLOv2 object detection algorithm example uses local JPEG/PNG images for injection, performs inference, and saves the rendered images with algorithm results in the local runtime directory.

```bash
# Configure the tros.b environment
source /opt/tros/setup.bash

# Launch the launch file
ros2 launch dnn_node_example dnn_node_example_feedback.launch.py dnn_example_config_file:=config/yolov2workconfig.json dnn_example_image:=config/target.jpg
```

In addition to the YOLOv2 algorithm, YOLOv3 is also supported. YOLOv5 is currently not supported. Use the `config_file` parameter in the launch command to switch algorithms. For example, to use YOLOv3, set `dnn_example_config_file:="config/yolov3workconfig.json"`.

## Result Analysis

### Publishing Images Using a Camera

The terminal output will display information like this:

```text
[example-3] [WARN] [1655095347.608475236] [example]: Create ai msg publisher with topic_name: hobot_dnn_detection
[example-3] [WARN] [1655095347.608640353] [example]: Create img hbmem_subscription with topic_name: /hbmem_img
[example-3] [WARN] [1655095348.709411619] [img_sub]: Sub img fps 12.95
[example-3] [WARN] [1655095348.887570945] [example]: Smart fps 12.10
[example-3] [WARN] [1655095349.772225728] [img_sub]: Sub img fps 11.30
[example-3] [WARN] [1655095349.948913662] [example]: Smart fps 11.31
[example-3] [WARN] [1655095350.834951431] [img_sub]: Sub img fps 11.30
[example-3] [WARN] [1655095351.011915729] [example]: Smart fps 11.30
```

The log shows that the topic for publishing algorithm inference results is `hobot_dnn_detection`, and the topic for subscribing to images is `/hbmem_img`.

Enter `http://IP:8000` in a PC browser to view the images and algorithm rendering effects (where IP is the RDK's IP address):

![render_web](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/detection/image/box_basic/yolov2_render_web.jpeg)

### Using Local Image Injection

The terminal output will display information like this:

```text
[example-1] [INFO] [1654925067.952159234] [PostProcessBase]: out box size: 8
[example-1] [INFO] [1654925067.952227232] [PostProcessBase]: det rect: 464.03 196.145 605.525 434.865, det type: potted plant, score:0.813219
[example-1] [INFO] [1654925067.952319229] [PostProcessBase]: det rect: 86.5421 310.158 512.542 468.201, det type: couch, score:0.669208
[example-1] [INFO] [1654925067.952392268] [PostProcessBase]: det rect: 198.968 399.91 273.841 421.767, det type: book, score:0.539755
[example-1] [INFO] [1654925067.952465182] [PostProcessBase]: det rect: 159.861 370.656 217.685 417.746, det type: potted plant, score:0.480698
[example-1] [INFO] [1654925067.952533221] [PostProcessBase]: det rect: 51.2147 321.047 84.0969 375.842, det type: vase, score:0.433644
[example-1] [INFO] [1654925067.952607802] [PostProcessBase]: det rect: 70.0548 197.381 96.1826 221.062, det type: vase, score:0.399885
[example-1] [INFO] [1654925067.952675924] [PostProcessBase]: det rect: 197.706 405.271 278.929 435.743, det type: book, score:0.384268
[example-1] [INFO] [1654925067.952743463] [PostProcessBase]: det rect: 54.0955 256.68 88.6269 266.159, det type: book, score:0.307426
```

The log indicates that the algorithm inferred 8 objects from the input image and output the coordinates of the object detection boxes (the output coordinates are the top-left x and y, and the bottom-right x and y of the object bounding box) along with their categories. The rendered image is saved as `render_feedback_0_0.jpeg`, and its effect is as follows:

![render_feedback](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/detection/image/box_basic/yolov2_render_feedback.jpeg)