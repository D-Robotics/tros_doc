---
sidebar_position: 6
sidebar_products: RDK-X5,RDK-S100,RDK-S600
---
# DOSOD

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Function Introduction

DOSOD (Decoupled Open-Set Object Detector) [https://github.com/D-Robotics-AI-Lab/DOSOD] is an open-vocabulary object detection method developed by D-Robotics. It leverages input text features for re-parameterization, enabling zero-shot changes to the object detection categories. This is the main difference from conventional detectors.

Code repository: (https://github.com/D-Robotics/hobot_dosod)

Application scenarios: The powerful zero-shot detection capability of DOSOD gives it strong generalization ability, making it applicable in fields such as autonomous driving, smart homes, and geological detection.

## Supported Platforms

| Platform                             | Operating Mode     | Example Function                                                 |
| -------------------------------- | ------------ | -------------------------------------------------------- |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | Start MIPI/USB camera/local loopback and display inference rendering results via Web |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) | Start MIPI/USB camera/local loopback and display inference rendering results via Web |
| RDK S600 | Ubuntu 24.04 (Jazzy) | Start MIPI/USB camera/local loopback and display inference rendering results via Web |

## Algorithm Information

<DocScope products="RDK-X5">

| Model | Platform | Input Size | Inference Frame Rate (fps) |
| ---- | ---- | ---- | ---- |
| DOSOD-l | X5 | 1×640×640×3 | 12 |

</DocScope>
<DocScope products="RDK-S100">

| Model | Platform | Input Size | Inference Frame Rate (fps) |
| ---- | ---- | ---- | ---- |
| DOSOD-l | S100 | 1×640×640×3 | 44.89 |

</DocScope>
<DocScope products="RDK-S600">

| Model | Platform | Input Size | Inference Frame Rate (fps) |
| ---- | ---- | ---- | ---- |
| DOSOD-l | S600 | 1×640×640×3 | 100.96 |

</DocScope>

## Preparation

### RDK Platform

1. The RDK has been flashed with the RDK OS system.

2. The RDK has successfully installed TogetheROS.Bot.

3. The RDK has a MIPI or USB camera installed.

4. Ensure that the PC can access the RDK over the network.

## Usage Guide

The DOSOD (hobot_dosod) package subscribes to the images published by the sensor package, performs model inference, and publishes the algorithm messages after inference. Through the websocket package, it renders and displays the images published by the sensor and the corresponding algorithm results on a PC browser.

### RDK Platform

**Using a MIPI Camera to Publish Images**

<DocScope products="RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# Configure the tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
# Configure the tros.b environment
source /opt/tros/jazzy/setup.bash
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
source /opt/tros/jazzy/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

```shell
# Copy the configuration files needed for running the example from the tros.b installation path.
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_dosod/config/ .

# Configure the MIPI camera
export CAM_TYPE=mipi

# Launch the launch file
ros2 launch hobot_dosod dosod.launch.py
```

**Using a USB Camera to Publish Images**

<DocScope products="RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# Configure the tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
# Configure the tros.b environment
source /opt/tros/jazzy/setup.bash
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
source /opt/tros/jazzy/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

```shell
# Copy the configuration files needed for running the example from the tros.b installation path.
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_dosod/config/ .

# Configure the USB camera
export CAM_TYPE=usb

# Launch the launch file
ros2 launch hobot_dosod dosod.launch.py
```

**Using Local Loopback Images**

<DocScope products="RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# Configure the tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
# Configure the tros.b environment
source /opt/tros/jazzy/setup.bash
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
source /opt/tros/jazzy/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

```shell
# Copy the configuration files needed for running the example from the tros.b installation path.
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_dosod/config/ .

# Configure local loopback images
export CAM_TYPE=fb

# Launch the launch file
ros2 launch hobot_dosod dosod.launch.py
```

In addition to setting the model, you can also change the model and configuration.

- X5: Change the model file configuration to `dosod_model_file_name:="config/dosod_mlp3x_l_rep-int8.bin"` , and change the model category configuration to `dosod_vocabulary_file_name:=config/offline_vocabulary.json"` .

- S100: Change the model file configuration to `dosod_model_file_name:="config/dosod_mlp3x_l_rep-int16.hbm"` , and change the model category configuration to `dosod_vocabulary_file_name:=config/offline_vocabulary.json"` .

## Result Analysis

The following information is output on the terminal:

```shell
[INFO] [launch]: All log files can be found below /root/.ros/log/2025-01-08-11-03-34-125542-ubuntu-9125
[INFO] [launch]: Default logging verbosity is set to INFO
camera_type is  fb
using feedback
Hobot shm pkg enables zero-copy with fastrtps profiles file: /userdata/install/lib/hobot_shm/config/shm_fastdds.xml
Hobot shm pkg sets RMW_FASTRTPS_USE_QOS_FROM_XML: 1
env of RMW_FASTRTPS_USE_QOS_FROM_XML is  1 , ignore env setting
env of RMW_FASTRTPS_USE_QOS_FROM_XML is  1 , ignore env setting
webserver has launch
env of RMW_FASTRTPS_USE_QOS_FROM_XML is  1 , ignore env setting
env of RMW_FASTRTPS_USE_QOS_FROM_XML is  1 , ignore env setting
env of RMW_FASTRTPS_USE_QOS_FROM_XML is  1 , ignore env setting
env of RMW_FASTRTPS_USE_QOS_FROM_XML is  1 , ignore env setting
env of RMW_FASTRTPS_USE_QOS_FROM_XML is  1 , ignore env setting
webserver has launch
[INFO] [hobot_image_pub-1]: process started with pid [9128]
[INFO] [hobot_codec_republish-2]: process started with pid [9130]
[INFO] [hobot_dosod-3]: process started with pid [9132]
[INFO] [websocket-4]: process started with pid [9134]
[hobot_codec_republish-2] [WARN] [1736305415.448727260] [hobot_codec_encoder]: Parameters:
[hobot_codec_republish-2] sub_topic: /hbmem_img
[hobot_codec_republish-2] pub_topic: /image
[hobot_codec_republish-2] channel: 1
[hobot_codec_republish-2] in_mode: shared_mem
[hobot_codec_republish-2] out_mode: ros
[hobot_codec_republish-2] in_format: nv12
[hobot_codec_republish-2] out_format: jpeg
[hobot_codec_republish-2] enc_qp: 10
[hobot_codec_republish-2] jpg_quality: 60
[hobot_codec_republish-2] input_framerate: 30
[hobot_codec_republish-2] output_framerate: -1
[hobot_codec_republish-2] dump_output: 0
[hobot_codec_republish-2] [WARN] [1736305415.455977260] [HobotCodecImpl]: platform x5
[hobot_codec_republish-2] [WARN] [1736305415.456186677] [hobot_codec_encoder]: Enabling zero-copy
[hobot_dosod-3] [WARN] [1736305415.687929557] [hobot_dosod]: This is hobot dosod!
[websocket-4] [WARN] [1736305415.794630560] [websocket]:
[websocket-4] Parameter:
[websocket-4]  image_topic: /image
[websocket-4]  image_type: mjpeg
[websocket-4]  only_show_image: 0
[websocket-4]  smart_topic: hobot_dosod
[websocket-4]  output_fps: 0
[hobot_dosod-3] [WARN] [1736305415.835729185] [hobot_dosod]: Parameter:
[hobot_dosod-3]  model_file_name: config/dosod_mlp3x_l_rep-int8.bin
[hobot_dosod-3]  vocabulary_file_name: config/offline_vocabulary.json
[hobot_dosod-3]  feed_type(0:local, 1:sub): 1
[hobot_dosod-3]  image: config/000000160864.jpg
[hobot_dosod-3]  dump_ai_result: 0
[hobot_dosod-3]  dump_raw_img: 0
[hobot_dosod-3]  dump_render_img: 0
[hobot_dosod-3]  dump_ai_path: .
[hobot_dosod-3]  dump_raw_path: .
[hobot_dosod-3]  dump_render_path: .
[hobot_dosod-3]  is_shared_mem_sub: 1
[hobot_dosod-3]  score_threshold: 0.2
[hobot_dosod-3]  iou_threshold: 0.5
[hobot_dosod-3]  nms_top_k: 50
[hobot_dosod-3]  is_homography: 0
[hobot_dosod-3]  trigger_mode: 0
[hobot_dosod-3]  class_mode: 0
[hobot_dosod-3]  task_num: 2
[hobot_dosod-3]  roi: 0
[hobot_dosod-3]  y_offset: 950
[hobot_dosod-3]  ai_msg_pub_topic_name: /hobot_dosod
[hobot_dosod-3]  ros_img_sub_topic_name: /image
[hobot_dosod-3] [WARN] [1736305415.836617477] [hobot_dosod]: model_file_name_: config/dosod_mlp3x_l_rep-int8.bin, task_num: 2
[hobot_dosod-3] [BPU_PLAT]BPU Platform Version(1.3.6)!
[hobot_dosod-3] [HBRT] set log level as 0. version = 3.15.54.0
[hobot_dosod-3] [DNN] Runtime version = 1.23.10_(3.15.54 HBRT)
[hobot_image_pub-1] [WARN] [1736305416.129590859] [image_pub_node]: parameter:
[hobot_image_pub-1] image_source: ./config/000000160864.jpg
[hobot_image_pub-1] source_image_w: 960
[hobot_image_pub-1] source_image_h: 544
[hobot_image_pub-1] output_image_w: 1920
[hobot_image_pub-1] output_image_h: 1080
[hobot_image_pub-1] fps: 10
[hobot_image_pub-1] is_shared_mem: 1
[hobot_image_pub-1] is_loop: 1
[hobot_image_pub-1] is_compressed_img_pub: 0
[hobot_image_pub-1] image_format: jpg
[hobot_image_pub-1] pub_encoding: nv12pub_name_mode: 0
[hobot_image_pub-1] msg_pub_topic_name: /hbmem_img
[hobot_image_pub-1] [WARN] [1736305416.130613275] [hobot_image_pub]: Enabling zero-copy
[hobot_codec_republish-2] [WARN] [1736305416.348757530] [hobot_codec_encoder]: Loaned messages are only safe with const ref subscription callbacks. If you are using any other kind of subscriptions, set the ROS_DISABLE_LOANED_MESSAGES environment variable to 1 (the default).
[hobot_codec_republish-2] [WARN] [1736305416.349073988] [HobotVenc]: init_pic_w_: 1920, init_pic_h_: 1080, alined_pic_w_: 1920, alined_pic_h_: 1088, aline_w_: 16, aline_h_: 16
[hobot_dosod-3] [A][DNN][packed_model.cpp:247][Model](2025-01-08,11:03:36.664.601) [HorizonRT] The model builder version = 1.24.3
[hobot_dosod-3] [WARN] [1736305417.323044552] [hobot_dosod]: Get model name: 3x-l_epoch_100_rep-coco80-without-nms from load model.
[hobot_dosod-3] [WARN] [1736305417.323560635] [hobot_dosod]: Create ai msg publisher with topic_name: /hobot_dosod
[hobot_dosod-3] [WARN] [1736305417.350238969] [hobot_dosod]: Create img hbmem_subscription with topic_name: /hbmem_img
[hobot_dosod-3] [WARN] [1736305417.445453471] [dosod]: Loaned messages are only safe with const ref subscription callbacks. If you are using any other kind of subscriptions, set the ROS_DISABLE_LOANED_MESSAGES environment variable to 1 (the default).
[hobot_codec_republish-2] [WARN] [1736305417.453916388] [hobot_codec_encoder]: sub nv12 1920x1088, fps: 11.4504, pub jpeg, fps: 11.4504, comm delay [0.0833]ms, codec delay [13.5833]ms
[hobot_dosod-3] [W][DNN]bpu_model_info.cpp:491][Version](2025-01-08,11:03:37.311.128) Model: 3x-l_epoch_100_rep-coco80-without-nms. Inconsistency between the hbrt library version 3.15.54.0 and the model build version 3.15.55.0 detected, in order to ensure correct model results, it is recommended to use compilation tools and the BPU SDK from the same OpenExplorer package.
[hobot_dosod-3] [WARN] [1736305418.846408168] [hobot_dosod]: Sub img fps: 12.95, Smart fps: 12.67, pre process time ms: 12, infer time ms: 78, post process time ms: 8
[hobot_dosod-3] [WARN] [1736305419.857350566] [hobot_dosod]: Sub img fps: 9.97, Smart fps: 10.88, pre process time ms: 11, infer time ms: 91, post process time ms: 8
[hobot_dosod-3] [WARN] [1736305420.858769504] [hobot_dosod]: Sub img fps: 10.04, Smart fps: 9.99, pre process time ms: 13, infer time ms: 100, post process time ms: 7
[hobot_dosod-3] [WARN] [1736305421.860964318] [hobot_dosod]: Sub img fps: 9.99, Smart fps: 9.99, pre process time ms: 14, infer time ms: 100, post process time ms: 7
```

Enter `http://IP:8000` in the browser on the PC to view the image and algorithm rendering effects (IP is the IP address of the RDK):

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/render_dosod.jpeg" alt="Web UI render of DOSOD open-vocabulary object detection" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

## Advanced Usage

If you wish to modify custom categories, please refer to the [Model Reparameterization Method](https://horizonrobotics.feishu.cn/docx/G5z3dOzWKozBtCxBZK9ceWEknTh)