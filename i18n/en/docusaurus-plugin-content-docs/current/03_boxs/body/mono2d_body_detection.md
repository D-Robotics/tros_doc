---
sidebar_position: 1
sidebar_products: RDK-X3,RDK-X5
---
# Body Detection and Tracking

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Introduction

The body detection and tracking example subscribes to images, performs inference on the BPU, and publishes messages containing body, head, face, hand bounding boxes and body keypoint detection results. Multi-target tracking (MOT) is used to track detection boxes. The X86 version does not support multi-target tracking or Web display.

Supported detection categories and their corresponding data types in the algorithm message are as follows:

| Category     | Description       | Data Type |
| -------- | ---------- | -------- |
| body     | Body bounding box     | Roi      |
| head     | Head bounding box     | Roi      |
| face     | Face bounding box     | Roi      |
| hand     | Hand bounding box     | Roi      |
| body_kps | Body keypoints | Point    |

Body keypoint algorithm result indices are shown in the figure below:

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/kps_index.jpeg)


Code repository: (https://github.com/D-Robotics/mono2d_body_detection)

Application scenarios: Body detection and tracking is an important part of human motion visual analysis, enabling body pose analysis and people counting. It is mainly used in human-computer interaction, gaming, and entertainment.

Pose detection example: [Pose Detection](../../04_apps/fall_detection.md)    
Car body following example: [Car Body Following](../../04_apps/car_tracking.md)  
Game character control example based on body pose analysis and gesture recognition: [Master the X3 Board: Fitness and Gaming Combined](https://developer.d-robotics.cc/forumDetail/112555512834430487)

## Supported Platforms

| Platform                             | Runtime Environment     | Example Functionality                                                 |
| -------------------------------- | ------------ | -------------------------------------------------------- |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | Start MIPI/USB camera and display inference rendering results via Web |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | Start MIPI/USB camera and display inference rendering results via Web |
| X86                              | Ubuntu 20.04 (Foxy) | Start local feedback and display inference rendering results via Web                |

## Algorithm Info

| Model | Platform | Input Size | Inference FPS |
| ---- | ---- | ------------ | ---- |
| fastrcnn | X3 | 1x3x544x960 | 74.96 |
| fastrcnn | X5 | 1x3x544x960 | 125.21 |

## Preparation

### RDK Platform

1. The RDK has been flashed with the Ubuntu system image.

2. TogetheROS.Bot has been successfully installed on the RDK.

3. A MIPI or USB camera has been installed on the RDK.

4. Confirm that the PC can access the RDK over the network.

### X86 Platform

1. The X86 environment has Ubuntu 20.04 system image configured.

2. tros.b has been successfully installed on the X86 environment.

## Usage

The body detection and tracking (mono2d_body_detection) package subscribes to images published by the sensor package. After inference, it publishes algorithm messages, and uses the websocket package to render and display images published by the sensor and corresponding algorithm results in a PC browser.

### RDK Platform

**Publish Images Using MIPI Camera**

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
# Configure tros.b environment
source /opt/tros/setup.bash
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
# Configure tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# Configure tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

</Tabs>
</DocScope>


```shell
# Copy the configuration files required to run the example from the tros.b installation path.
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .

# Configure MIPI camera
export CAM_TYPE=mipi

# Launch launch file
ros2 launch mono2d_body_detection mono2d_body_detection.launch.py
```

**Publish Images Using USB Camera**

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
# Configure tros.b environment
source /opt/tros/setup.bash
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
# Configure tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# Configure tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

```shell

# Copy the configuration files required to run the example from the tros.b installation path.
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .

# Configure USB camera
export CAM_TYPE=usb

# Launch launch file
ros2 launch mono2d_body_detection mono2d_body_detection.launch.py
```

**Using Local Feedback Images**

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
# Configure tros.b environment
source /opt/tros/setup.bash
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
# Configure tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# Configure tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

```shell
# Copy the configuration files required to run the example from the tros.b installation path.
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/dnn_node_example/config/ .

# Configure local feedback image
export CAM_TYPE=fb

# Launch launch file
ros2 launch mono2d_body_detection mono2d_body_detection.launch.py publish_image_source:=config/person_body.jpg publish_image_format:=jpg publish_output_image_w:=960 publish_output_image_h:=544

```

### X86 Platform

**Using Local Feedback Images**

```bash
# Configure tros.b environment
source /opt/tros/setup.bash

# Copy the configuration files required to run the example from the tros.b installation path.
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/dnn_node_example/config/ .

# Configure local feedback image
export CAM_TYPE=fb

# Launch launch file
ros2 launch mono2d_body_detection mono2d_body_detection.launch.py
```

## Result Analysis

The terminal output during execution is as follows:

```shell
[mono2d_body_detection-3] [WARN] [1660219823.214730286] [example]: This is mono2d body det example!
[mono2d_body_detection-3] [WARN] [1660219823.417856952] [mono2d_body_det]: Parameter:
[mono2d_body_detection-3]  is_sync_mode_: 0
[mono2d_body_detection-3]  model_file_name_: config/multitask_body_head_face_hand_kps_960x544.hbm
[mono2d_body_detection-3]  is_shared_mem_sub: 1
[mono2d_body_detection-3]  ai_msg_pub_topic_name: /hobot_mono2d_body_detection
[mono2d_body_detection-3] [C][31082][08-11][20:10:23:425][configuration.cpp:49][EasyDNN]EasyDNN version: 0.4.11
[mono2d_body_detection-3] [BPU_PLAT]BPU Platform Version(1.3.1)!
[mono2d_body_detection-3] [HBRT] set log level as 0. version = 3.14.5
[mono2d_body_detection-3] [DNN] Runtime version = 1.9.7_(3.14.5 HBRT)
[mono2d_body_detection-3] [WARN] [1660219823.545293244] [mono2d_body_det]: Create hbmem_subscription with topic_name: /hbmem_img
[mono2d_body_detection-3] (MOTMethod.cpp:39): MOTMethod::Init config/iou2_euclid_method_param.json
[mono2d_body_detection-3] 
[mono2d_body_detection-3] (IOU2.cpp:34): IOU2 Mot::Init config/iou2_euclid_method_param.json
[mono2d_body_detection-3] 
[mono2d_body_detection-3] (MOTMethod.cpp:39): MOTMethod::Init config/iou2_method_param.json
[mono2d_body_detection-3] 
[mono2d_body_detection-3] (IOU2.cpp:34): IOU2 Mot::Init config/iou2_method_param.json
[mono2d_body_detection-3] 
[mono2d_body_detection-3] (MOTMethod.cpp:39): MOTMethod::Init config/iou2_method_param.json
[mono2d_body_detection-3] 
[mono2d_body_detection-3] (IOU2.cpp:34): IOU2 Mot::Init config/iou2_method_param.json
[mono2d_body_detection-3] 
[mono2d_body_detection-3] (MOTMethod.cpp:39): MOTMethod::Init config/iou2_method_param.json
[mono2d_body_detection-3] 
[mono2d_body_detection-3] (IOU2.cpp:34): IOU2 Mot::Init config/iou2_method_param.json
[mono2d_body_detection-3] 
[mono2d_body_detection-3] [WARN] [1660219824.895102286] [mono2d_body_det]: input fps: 31.34, out fps: 31.22
[mono2d_body_detection-3] [WARN] [1660219825.921873870] [mono2d_body_det]: input fps: 30.16, out fps: 30.21
[mono2d_body_detection-3] [WARN] [1660219826.922075496] [mono2d_body_det]: input fps: 30.16, out fps: 30.00
[mono2d_body_detection-3] [WARN] [1660219827.955463330] [mono2d_body_det]: input fps: 30.01, out fps: 30.01
[mono2d_body_detection-3] [WARN] [1660219828.955764872] [mono2d_body_det]: input fps: 30.01, out fps: 30.00
```

The output log shows that the program ran successfully. During inference, the algorithm input and output frame rate is 30 fps, with statistics refreshed once per second.

Enter `http://IP:8000` in a PC browser to view the image and algorithm rendering results (body, head, face, hand detection boxes, detection box types and target tracking IDs, body keypoints) (IP is the RDK/X86 device IP address):

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/body_render.jpeg)
