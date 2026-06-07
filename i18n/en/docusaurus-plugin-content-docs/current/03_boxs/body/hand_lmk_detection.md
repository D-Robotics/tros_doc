---
sidebar_position: 2
sidebar_products: RDK-X3,RDK-X5
---
# Hand Keypoint Detection

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Introduction

The hand keypoint detection example subscribes to images and smart messages containing hand bounding boxes, performs inference on the BPU, and publishes algorithm messages containing hand keypoint information.

Hand keypoint indices are shown in the figure below:

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/hand_lmk_index.jpeg)

Code repository:

 (https://github.com/D-Robotics/hand_lmk_detection)

 (https://github.com/D-Robotics/mono2d_body_detection)

Application scenarios: Hand keypoint detection is mainly used to capture skeletal keypoints of the human hand, enabling custom gesture recognition and other features. It is widely used in smart home, virtual reality, gaming, and entertainment.

## Supported Platforms

| Platform                             | Runtime Environment     | Example Functionality                                        |
| -------------------------------- | ------------ | ----------------------------------------------- |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | Start MIPI/USB camera and display inference rendering results via Web |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | Start MIPI/USB camera and display inference rendering results via Web |
## Algorithm Info

<DocScope products="RDK-X3">

| Model | Platform | Input Size | Inference FPS |
| ---- | ---- | ---- | ---- |
| handLMKs | X3 | 8x21 | 806 |

</DocScope>
<DocScope products="RDK-X5">

| Model | Platform | Input Size | Inference FPS |
| ---- | ---- | ---- | ---- |
| handLMKs | X5 | 8x21 | 948 |

</DocScope>
## Preparation

### RDK Platform

1. The RDK has been flashed with the Ubuntu system image.

2. TogetheROS.Bot has been successfully installed on the RDK.

3. A MIPI or USB camera has been installed on the RDK.

4. Confirm that the PC can access the RDK over the network.

## Usage

The hand keypoint detection (hand_lmk_detection) package subscribes to images published by the sensor package and hand bounding box detection results published by the body detection and tracking package. After inference, it publishes algorithm messages, and uses the websocket package to render and display the published images and corresponding algorithm results in a PC browser.

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



```shell
# Copy the configuration files required to run the example from the tros.b installation path.
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/hand_lmk_detection/config/ .

# Configure MIPI camera
export CAM_TYPE=mipi

# Launch launch file
ros2 launch hand_lmk_detection hand_lmk_detection.launch.py
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



```shell
# Copy the configuration files required to run the example from the tros.b installation path.
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/hand_lmk_detection/config/ .

# Configure USB camera
export CAM_TYPE=usb

# Launch launch file
ros2 launch hand_lmk_detection hand_lmk_detection.launch.py
```

## Result Analysis

The terminal output during execution is as follows:

```shell
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
[hand_lmk_detection-4] [WARN] [1660269063.553205182] [hand_lmk_det]: input fps: 31.43, out fps: 31.47
[hand_lmk_detection-4] [WARN] [1660269064.579457516] [hand_lmk_det]: input fps: 30.21, out fps: 30.21
[hand_lmk_detection-4] [WARN] [1660269065.612579058] [hand_lmk_det]: input fps: 30.01, out fps: 30.01
[hand_lmk_detection-4] [WARN] [1660269066.612778892] [hand_lmk_det]: input fps: 30.00, out fps: 30.00
[hand_lmk_detection-4] [WARN] [1660269067.646101309] [hand_lmk_det]: input fps: 30.01, out fps: 30.01
[hand_lmk_detection-4] [WARN] [1660269068.679036184] [hand_lmk_det]: input fps: 30.04, out fps: 30.04
```

The output log shows that the program ran successfully. During inference, the algorithm input and output frame rate is 30 fps, with statistics refreshed once per second.

Enter `http://IP:8000` in a PC browser to view the image and algorithm rendering results (IP is the RDK IP address):

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/hand_render.jpeg)
