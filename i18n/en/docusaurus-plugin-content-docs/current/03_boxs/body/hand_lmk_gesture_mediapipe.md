---
sidebar_position: 8
sidebar_products: RDK-X5,RDK-S100
---
# Hand Keypoint and Gesture Recognition (MediaPipe)

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Introduction

The hand keypoint detection example subscribes to images and smart messages containing hand bounding box information, performs inference on the BPU, and publishes algorithm messages containing hand keypoints and gesture information.

Hand keypoint indices are shown in the figure below:

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/hand_lmk_index.jpeg)

Code repository:

 (https://github.com/D-Robotics/palm_detection_mediapipe)

 (https://github.com/D-Robotics/hand_landmarks_mediapipe)

Supported gesture recognition categories and their corresponding values in the algorithm message (Attribute member, type is "gesture") are as follows:

| Gesture       | Description       | Value |
| ---------- | ---------- | ---- |
| ThumbUp    | Thumbs up | 2    |
| Victory    | "V" gesture    | 3    |
| Mute       | "Shush" gesture   | 4    |
| Palm       | Palm       | 5    |
| Okay       | OK gesture     | 11   |
| ThumbLeft  | Thumb pointing left | 12   |
| ThumbRight | Thumb pointing right | 13   |
| Awesome    | 666 gesture    | 14   |

Application scenarios: Gesture recognition integrates hand keypoint detection, gesture analysis, and other technologies, enabling computers to interpret human gestures as corresponding commands. It supports gesture control and sign language translation, and is mainly used in smart home, smart cockpit, smart wearables, and other fields.

Car gesture control example: [Car Gesture Control](../../04_apps/car_gesture_control.md)

## Supported Platforms

| Platform                             | Runtime Environment     | Example Functionality                                        |
| -------------------------------- | ------------ | ----------------------------------------------- |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | Start MIPI/USB camera and display inference rendering results via Web |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble), Ubuntu 24.04 (Jazzy) | Start MIPI/USB camera and display inference rendering results via Web |

## Algorithm Info

<DocScope products="RDK-X5">

| Model | Platform | Input Size | Inference FPS |
| ---- | ---- | ---- | ---- |
| mediapipe | X5 | 224x224 | 911.98 |

</DocScope>
<DocScope products="RDK-S100">

| Model | Platform | Input Size | Inference FPS |
| ---- | ---- | ---- | ---- |
| mediapipe | S100 | 224x224 | 1114 |

</DocScope>
## Preparation

### RDK Platform

1. The RDK has been flashed with the RDK OS system.

2. TogetheROS.Bot has been successfully installed on the RDK.

3. A MIPI or USB camera has been installed on the RDK.

4. Confirm that the PC can access the RDK over the network.

5. Install packages

<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```shell
apt install tros-humble-palm-detection-mediapipe
apt install tros-humble-hand-landmarks-mediapipe
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```shell
apt install tros-jazzy-palm-detection-mediapipe
apt install tros-jazzy-hand-landmarks-mediapipe
```

</TabItem>
</Tabs>

## Usage

The hand keypoint detection (hand_landmarks_mediapipe) package subscribes to images published by the sensor package and hand bounding box detection results published by the body detection and tracking package. After inference, it publishes algorithm messages, and uses the websocket package to render and display the published images and corresponding algorithm results in a PC browser.


**Publish Images Using MIPI Camera**

<DocScope products="RDK-X5">
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
<TabItem value="jazzy" label="Jazzy">

```bash
# Configure tros.b environment
source /opt/tros/jazzy/setup.bash
```


</TabItem>

</Tabs>
</DocScope>

```shell
# Copy the configuration files required to run the example from the tros.b installation path.
cp -r /opt/tros/${TROS_DISTRO}/lib/palm_detection_mediapipe/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/hand_landmarks_mediapipe/config/ .

# Configure MIPI camera
export CAM_TYPE=mipi

# Launch launch file
ros2 launch hand_landmarks_mediapipe hand_landmarks.launch.py
```

**Publish Images Using USB Camera**

<DocScope products="RDK-X5">
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
<TabItem value="jazzy" label="Jazzy">

```bash
# Configure tros.b environment
source /opt/tros/jazzy/setup.bash
```


</TabItem>

</Tabs>
</DocScope>

```shell
# Copy the configuration files required to run the example from the tros.b installation path.
cp -r /opt/tros/${TROS_DISTRO}/lib/palm_detection_mediapipe/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/hand_landmarks_mediapipe/config/ .

# Configure USB camera
export CAM_TYPE=usb

# Launch launch file
ros2 launch hand_landmarks_mediapipe hand_landmarks.launch.py
```

**Using Local Image Feedback**

<DocScope products="RDK-X5">
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
<TabItem value="jazzy" label="Jazzy">

```bash
# Configure tros.b environment
source /opt/tros/jazzy/setup.bash
```


</TabItem>

</Tabs>
</DocScope>

```bash
# Copy the configuration files required to run the example from the tros.b installation path.
cp -r /opt/tros/${TROS_DISTRO}/lib/palm_detection_mediapipe/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/hand_landmarks_mediapipe/config/ .

# Configure local feedback image
export CAM_TYPE=fb

# Launch launch file
ros2 launch hand_landmarks_mediapipe hand_landmarks.launch.py publish_image_source:=config/example.jpg publish_image_format:=jpg publish_output_image_w:=640 publish_output_image_h:=480
```

## Result Analysis

The terminal output during execution is as follows:

```shell
[palm_detection_mediapipe-4] [DNN]: 3.7.3_(4.2.11 HBRT)
[hand_landmarks_mediapipe-3] [WARN] [1757389272.651945922] [mono2d_hand_lmk]: Get model name: hand_224_224 from load model.
[palm_detection_mediapipe-4] [WARN] [1757389272.653466536] [mono2d_palm_det]: Get model name: palm_det_192_192 from load model.
[palm_detection_mediapipe-4] [WARN] [1757389272.657688231] [mono2d_palm_det]: Enabling zero-copy
[palm_detection_mediapipe-4] [WARN] [1757389272.657755005] [mono2d_palm_det]: Create hbmem_subscription with topic_name: /hbmem_img
[hand_landmarks_mediapipe-3] [WARN] [1757389272.658734823] [mono2d_hand_lmk]: Enabling zero-copy
[hand_landmarks_mediapipe-3] [WARN] [1757389272.658829973] [mono2d_hand_lmk]: Create hbmem_subscription with topic_name: /hbmem_img
[hand_landmarks_mediapipe-3] [WARN] [1757389272.679073504] [mono2d_hand_lmk]: Loaned messages are only safe with const ref subscription callbacks. If you are using any other kind of subscriptions, set the ROS_DISABLE_LOANED_MESSAGES environment variable to 1 (the default).
[palm_detection_mediapipe-4] [WARN] [1757389272.679083479] [mono2d_palm_det]: Loaned messages are only safe with const ref subscription callbacks. If you are using any other kind of subscriptions, set the ROS_DISABLE_LOANED_MESSAGES environment variable to 1 (the default).
[hand_landmarks_mediapipe-3] [WARN] [1757389272.679384552] [mono2d_hand_lmk]: SharedMemImgProcess Recved img encoding: nv12, h: 480, w: 640, step: 640, index: 0, stamp: 1757389272_411007134, data size: 460800, comm delay [268.3575]ms
[palm_detection_mediapipe-4] [WARN] [1757389272.679384452] [mono2d_palm_det]: SharedMemImgProcess Recved img encoding: nv12, h: 480, w: 640, step: 640, index: 0, stamp: 1757389272_411007134, data size: 460800, comm delay [268.3576]ms
[hand_landmarks_mediapipe-3] [WARN] [1757389273.715343396] [mono2d_hand_lmk]: input fps: 13.58, out fps: 13.94, infer time ms: 71, post process time ms: 1
[palm_detection_mediapipe-4] [WARN] [1757389273.723452363] [mono2d_palm_det]: input fps: 13.59, out fps: 13.94, infer time ms: 71, post process time ms: 0
[palm_detection_mediapipe-4] [WARN] [1757389275.711869066] [mono2d_palm_det]: SharedMemImgProcess Recved img encoding: nv12, h: 480, w: 640, step: 640, index: 33, stamp: 1757389275_710984298, data size: 460800, comm delay [0.8785]ms
[hand_landmarks_mediapipe-3] [WARN] [1757389275.711873416] [mono2d_hand_lmk]: SharedMemImgProcess Recved img encoding: nv12, h: 480, w: 640, step: 640, index: 33, stamp: 1757389275_710984298, data size: 460800, comm delay [0.8835]ms
[hobot_codec_republish-2] [WARN] [1757389277.211724002] [hobot_codec_decoder]: Pub img fps [9.66]
[hand_landmarks_mediapipe-3] [WARN] [1757389278.811834846] [mono2d_hand_lmk]: SharedMemImgProcess Recved img encoding: nv12, h: 480, w: 640, step: 640, index: 64, stamp: 1757389278_810957877, data size: 460800, comm delay [0.8710]ms
```

The output log shows that the program ran successfully. After initialization, a single inference takes 0.87 ms.

Enter `http://IP:8000` in a PC browser to view the image and algorithm rendering results (IP is the RDK IP address):

![](http://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/hand_lmk_web.jpg)
