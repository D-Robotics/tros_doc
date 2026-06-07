---
sidebar_position: 7
sidebar_products: RDK-S100,RDK-S600
---
# Body Detection and Tracking (Ultralytics YOLO Pose)

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Introduction

This example uses [yolo-pose](https://docs.ultralytics.com/zh/tasks/pose/) for body detection and tracking. It subscribes to images, performs inference on the BPU, and publishes messages containing body bounding boxes and body keypoint detection results. Multi-target tracking (MOT) is used to track detection boxes.

Supported detection categories and their corresponding data types in the algorithm message are as follows:

| Category     | Description       | Data Type |
| -------- | ---------- | -------- |
| body     | Body bounding box     | Roi      |
| body_kps | Body keypoints | Point    |

Body keypoint algorithm result indices are shown in the figure below:

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/kps_yolo_index.jpeg)


Code repository: (https://github.com/D-Robotics/mono2d_body_detection)

Application scenarios: Body detection and tracking is an important part of human motion visual analysis, enabling body pose analysis and people counting. It is mainly used in human-computer interaction, gaming, and entertainment.

Pose detection example: [Pose Detection](../../04_apps/fall_detection.md)    
Car body following example: [Car Body Following](../../04_apps/car_tracking.md)  
Game character control example based on body pose analysis and gesture recognition: [Master the X3 Board: Fitness and Gaming Combined](https://developer.d-robotics.cc/forumDetail/112555512834430487)

## Supported Platforms

| Platform                             | Runtime Environment     | Example Functionality                                                 |
| -------------------------------- | ------------ | -------------------------------------------------------- |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) | Start MIPI/USB camera/local feedback and display inference rendering results via Web |
| RDK S600 | Ubuntu 24.04 (Humble) | Start MIPI/USB camera/local feedback and display inference rendering results via Web |

## Algorithm Info

<DocScope products="RDK-S100">

| Model | Platform | Input Size | Inference FPS |
| ---- | ---- | ---- | ---- |
| yolov11x-pose | S100 | 1x3x640x640 | 68.70 |

</DocScope>
<DocScope products="RDK-S600">

| Model | Platform | Input Size | Inference FPS |
| ---- | ---- | ---- | ---- |
| yolov11n-pose | S600 | 1x3x640x640 | 1104.91 |

</DocScope>
## Preparation

### RDK Platform

1. The RDK has been flashed with the RDK OS system.

2. TogetheROS.Bot has been successfully installed on the RDK.

3. A MIPI or USB camera has been installed on the RDK.

4. Confirm that the PC can access the RDK over the network.

## Usage

The body detection and tracking (mono2d_body_detection) package subscribes to images published by the sensor package. After inference, it publishes algorithm messages, and uses the websocket package to render and display images published by the sensor and corresponding algorithm results in a PC browser.

### RDK Platform

**Publish Images Using MIPI Camera**



<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# Configure tros.b environment
source /opt/tros/humble/setup.bash

# Copy the configuration files required to run the example from the tros.b installation path.
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .

# Configure MIPI camera
export CAM_TYPE=mipi

# Launch launch file
ros2 launch mono2d_body_detection mono2d_body_detection.launch.py kps_model_type:=1 kps_image_width:=1920 kps_image_height:=1080 kps_model_file_name:=config/yolo11x_pose_nashe_640x640_nv12.hbm
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
# Configure tros.b environment
source /opt/tros/jazzy/setup.bash

# Copy the configuration files required to run the example from the tros.b installation path.
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .

# Configure MIPI camera
export CAM_TYPE=mipi

# Launch launch file
ros2 launch mono2d_body_detection mono2d_body_detection.launch.py kps_model_type:=1 kps_image_width:=1920 kps_image_height:=1080 kps_model_file_name:=config/yolo11n_pose_nashp_640x640_nv12.hbm
```

</TabItem>

</Tabs>
</DocScope>

**Publish Images Using USB Camera**



<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# Configure tros.b environment
source /opt/tros/humble/setup.bash

# Configure USB camera
export CAM_TYPE=usb

# Copy the configuration files required to run the example from the tros.b installation path.
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .

# Launch launch file
ros2 launch mono2d_body_detection mono2d_body_detection.launch.py kps_model_type:=1 kps_image_width:=1920 kps_image_height:=1080 kps_model_file_name:=config/yolo11x_pose_nashe_640x640_nv12.hbm
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
# Configure tros.b environment
source /opt/tros/jazzy/setup.bash

# Configure USB camera
export CAM_TYPE=usb

# Copy the configuration files required to run the example from the tros.b installation path.
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .

# Launch launch file
ros2 launch mono2d_body_detection mono2d_body_detection.launch.py kps_model_type:=1 kps_image_width:=1920 kps_image_height:=1080 kps_model_file_name:=config/yolo11n_pose_nashp_640x640_nv12.hbm
```

</TabItem>

</Tabs>
</DocScope>

**Using Local Feedback Images**



<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# Configure tros.b environment
source /opt/tros/humble/setup.bash

# Copy the configuration files required to run the example from the tros.b installation path.
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/dnn_node_example/config/ .

# Configure local feedback image
export CAM_TYPE=fb

# Launch launch file
ros2 launch mono2d_body_detection mono2d_body_detection.launch.py publish_image_source:=config/person_body.jpg publish_image_format:=jpg kps_model_type:=1 kps_image_width:=640 kps_image_height:=640 kps_model_file_name:=config/yolo11x_pose_nashe_640x640_nv12.hbm
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
# Configure tros.b environment
source /opt/tros/jazzy/setup.bash

# Copy the configuration files required to run the example from the tros.b installation path.
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/dnn_node_example/config/ .

# Configure local feedback image
export CAM_TYPE=fb

# Launch launch file
ros2 launch mono2d_body_detection mono2d_body_detection.launch.py publish_image_source:=config/person_body.jpg publish_image_format:=jpg kps_model_type:=1 kps_image_width:=640 kps_image_height:=640 kps_model_file_name:=config/yolo11n_pose_nashp_640x640_nv12.hbm
```

</TabItem>

</Tabs>
</DocScope>

## Result Analysis

The terminal output during execution is as follows:

```shell
[mono2d_body_detection-3] [WARN] [1660219823.214730286] [example]: This is mono2d body det example!
[mono2d_body_detection-3] [WARN] [1747724998.166714029] [mono2d_body_det]: Parameter:
[mono2d_body_detection-3]  is_sync_mode_: 0
[mono2d_body_detection-3]  model_file_name_: config/yolo11x_pose_nashe_640x640_nv12.hbm
[mono2d_body_detection-3]  is_shared_mem_sub: 1
[mono2d_body_detection-3]  ai_msg_pub_topic_name: /hobot_mono2d_body_detection
[mono2d_body_detection-3]  ros_img_topic_name: /image_raw
[mono2d_body_detection-3]  image_gap: 1
[mono2d_body_detection-3]  dump_render_img: 0
[mono2d_body_detection-3]  model_type: 1
[mono2d_body_detection-3] [BPU][[BPU_MONITOR]][281473010090784][INFO]BPULib verison(2, 1, 2)[0d3f195]!
[mono2d_body_detection-3] [DNN] HBTL_EXT_DNN log level:6
[mono2d_body_detection-3] [DNN]: 3.3.3_(4.1.17 HBRT)
[mono2d_body_detection-3] [WARN] [1747724998.912552895] [mono2d_body_det]: Get model name: yolo11x_pose_nashe_640x640_nv12 from load model.
[mono2d_body_detection-3] [WARN] [1747724998.916663825] [mono2d_body_det]: Enabling zero-copy
[mono2d_body_detection-3] [WARN] [1747724998.916748774] [mono2d_body_det]: Create hbmem_subscription with topic_name: /hbmem_img
[mono2d_body_detection-3] [WARN] [1660219824.895102286] [mono2d_body_det]: input fps: 31.34, out fps: 31.22
[mono2d_body_detection-3] [WARN] [1660219825.921873870] [mono2d_body_det]: input fps: 30.16, out fps: 30.21
[mono2d_body_detection-3] [WARN] [1660219826.922075496] [mono2d_body_det]: input fps: 30.16, out fps: 30.00
[mono2d_body_detection-3] [WARN] [1660219827.955463330] [mono2d_body_det]: input fps: 30.01, out fps: 30.01
[mono2d_body_detection-3] [WARN] [1660219828.955764872] [mono2d_body_det]: input fps: 30.01, out fps: 30.00
```

The output log shows that the program ran successfully. During inference, the algorithm input and output frame rate is 30 fps, with statistics refreshed once per second.

Enter `http://IP:8000` in a PC browser to view the image and algorithm rendering results (body, head, face, hand detection boxes, detection box types and target tracking IDs, body keypoints) (IP is the RDK/X86 device IP address):

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/yolo_pose_render.png)
