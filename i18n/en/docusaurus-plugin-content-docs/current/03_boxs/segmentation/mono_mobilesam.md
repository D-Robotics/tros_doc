---
sidebar_position: 4
sidebar_products: RDK-X5
---
# MobileSAM Segment Anything

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Overview

The mono_mobilesam package is a usage example based on quantized deployment of Mobile SAM. Image data comes from local image playback and subscribed image messages. SAM relies on detection box input for segmentation and segments targets within the detection boxes. No target category information is required—only the bounding box. Finally, algorithm information is published via topics and visualized on the Web page.

This example provides two deployment modes:
- Fixed box segmentation: Uses a fixed detection box (center of the image) for segmentation.
- Subscribed box segmentation: Subscribes to detection box information output by upstream detection networks and segments the content within the boxes.

Code repository: (https://github.com/D-Robotics/mono_mobilesam.git)

Application scenarios: Obstacle segmentation combined with detection boxes, water stain area segmentation, etc.

## Supported Platforms

| Platform                  | Runtime     | Example Features                                                     |
| --------------------- | ------------ | ------------------------------------------------------------ |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | · Start MIPI/USB camera/local playback; display inference rendering results on Web/save locally |

## Algorithm Information

<DocScope products="RDK-X5">

| Model | Platform | Input Size | Inference FPS |
| ---- | ---- | ---- | ---- |
| mobilesam | X5 | 1×3×384×384 | 6.6 |

</DocScope>
## Preparation

### RDK Platform

1. RDK has been flashed with RDK OS.

2. TogetheROS.Bot has been successfully installed on RDK.

## Usage

The package publishes algorithm messages containing semantic segmentation and object detection information. Users can subscribe to the published messages for application development.

### RDK Platform

**Publish images using a MIPI camera**

<DocScope products="RDK-X5">
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




```shell
# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/mono_mobilesam/config/ .

# 配置MIPI摄像头
export CAM_TYPE=mipi

# 启动launch文件
ros2 launch mono_mobilesam sam.launch.py 
```

**Publish images using a USB camera**

<DocScope products="RDK-X5">
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




```shell
# 从tros的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/mono_mobilesam/config/ .

# 配置USB摄像头
export CAM_TYPE=usb

# 启动launch文件
ros2 launch mono_mobilesam sam.launch.py 
```

**Use a single playback image**

<DocScope products="RDK-X5">
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




```shell
# 从tros的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/mono_mobilesam/config/ .

# 配置回灌图片
export CAM_TYPE=fb

# 启动launch文件
ros2 launch mono_mobilesam sam.launch.py 
```

## Result Analysis

**Publish images using a MIPI camera**

After the package initializes, the runtime terminal outputs the following information:

```
[INFO] [launch]: All log files can be found below .ros/log/1970-01-02-22-39-09-001251-buildroot-22955
[INFO] [hobot_codec_republish-2]: process started with pid [22973]
[INFO] [mono_mobilesam-3]: process started with pid [22975]
[INFO] [websocket-4]: process started with pid [22977]
[hobot_codec_republish-2] [WARN] [0000167949.975123376] [HobotCodec]: This is HobotCodecNode: hobot_codec_22973.
[hobot_codec_republish-2] [WARN] [0000167950.040208542] [HobotCodecNode]: Parameters:
[hobot_codec_republish-2] sub_topic: /image
[hobot_codec_republish-2] pub_topic: /hbmem_img
[hobot_codec_republish-2] channel: 1
[hobot_codec_republish-2] in_mode: ros
[hobot_codec_republish-2] out_mode: shared_mem
[hobot_codec_republish-2] in_format: jpeg
[hobot_codec_republish-2] out_format: nv12
[hobot_codec_republish-2] enc_qp: 10
[hobot_codec_republish-2] jpg_quality: 60
[hobot_codec_republish-2] input_framerate: 30
[hobot_codec_republish-2] output_framerate: -1
[hobot_codec_republish-2] dump_output: 0
[hobot_codec_republish-2] [WARN] [0000167950.050887417] [HobotCodecImpl]: platform x5
[websocket-4] [WARN] [0000167950.068235417] [websocket]:
[websocket-4] Parameter:
[websocket-4]  image_topic: /image
[websocket-4]  image_type: mjpeg
[websocket-4]  only_show_image: 0
[websocket-4]  smart_topic: hobot_sam
[websocket-4]  output_fps: 0
[mono_mobilesam-3] [WARN] [0000167950.510756918] [mono_mobilesam]: Parameter:
[mono_mobilesam-3]  cache_len_limit: 8
[mono_mobilesam-3]  dump_render_img: 0
[mono_mobilesam-3]  feed_type(0:local, 1:sub): 1
[mono_mobilesam-3]  image: config/00131.jpg
[mono_mobilesam-3]  is_regular_box: 1
[mono_mobilesam-3]  is_shared_mem_sub: 1
[mono_mobilesam-3]  is_sync_mode: 0
[mono_mobilesam-3]  ai_msg_pub_topic_name: /hobot_sam
[mono_mobilesam-3]  ai_msg_sub_topic_name: /hobot_dnn_detection
[mono_mobilesam-3]  ros_img_sub_topic_name: /image
[mono_mobilesam-3] [BPU_PLAT]BPU Platform Version(1.3.6)!
[mono_mobilesam-3] [HBRT] set log level as 0. version = 3.15.52.0
[mono_mobilesam-3] [DNN] Runtime version = 1.23.9_(3.15.52 HBRT)
[mono_mobilesam-3] [A][DNN][packed_model.cpp:247][Model](1970-01-02,22:39:10.889.592) [HorizonRT] The model builder version = 1.23.5
[mono_mobilesam-3] [W][DNN]bpu_model_info.cpp:491][Version](1970-01-02,22:39:11.25.90) Model: mobilesam_encoder_384_all_BPU. Inconsistency between the hbrt library version 3.15.52.0 and the model build version 3.15.47.0 detected, in order to ensure correct model results, it is recommended to use compilation tools and the BPU SDK from the same OpenExplorer package.
[mono_mobilesam-3] [A][DNN][packed_model.cpp:247][Model](1970-01-02,22:39:11.239.603) [HorizonRT] The model builder version = 1.23.5
[mono_mobilesam-3] [WARN] [0000167951.353811293] [mono_mobilesam]: Create hbmem_subscription with topic_name: /hbmem_img
[mono_mobilesam-3] [W][DNN]bpu_model_info.cpp:491][Version](1970-01-02,22:39:11.318.569) Model: mobilesam_decoder_384. Inconsistency between the hbrt library version 3.15.52.0 and the model build version 3.15.47.0 detected, in order to ensure correct model results, it is recommended to use compilation tools and the BPU SDK from the same OpenExplorer package.
[mono_mobilesam-3] [WARN] [0000167951.606431085] [mono_mobilesam]: Smart fps: 5.00, pre process time ms: 43, infer time ms: 152, post process time ms: 24
[mono_mobilesam-3] [WARN] [0000167951.779821293] [mono_mobilesam]: Smart fps: 5.00, pre process time ms: 36, infer time ms: 149, post process time ms: 21
[mono_mobilesam-3] [WARN] [0000167951.952713293] [mono_mobilesam]: Smart fps: 5.00, pre process time ms: 36, infer time ms: 150, post process time ms: 22
[mono_mobilesam-3] [WARN] [0000167952.123928377] [mono_mobilesam]: Smart fps: 5.00, pre process time ms: 37, infer time ms: 149, post process time ms: 21
[mono_mobilesam-3] [WARN] [0000167952.295540585] [mono_mobilesam]: Smart fps: 5.00, pre process time ms: 35, infer time ms: 150, post process time ms: 21
```

In this example, inference results are rendered on the Web. Enter `http://IP:8000` in a PC browser to view the image and algorithm rendering effects (IP is the RDK IP address). Open the settings in the upper-right corner of the interface and select the "Full Image Segmentation" option to display the rendering effect.

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/render_sam.png" alt="Web UI MobileSAM segmentation render with full-image segmentation enabled" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

## Advanced Usage

To adjust the detection box size, refer to the method below for verification. More importantly, you can use detection results from upstream detection nodes as SAM input.

Run SAM with fixed box mode disabled: `sam_is_regular_box:=0`
```shell
ros2 launch mono_mobilesam sam.launch.py sam_is_regular_box:=0
```

Publish an AI topic in another terminal.
```shell
ros2 topic pub /hobot_dnn_detection ai_msgs/msg/PerceptionTargets '{"targets": [{"rois": [{"rect": {"x_offset": 96, "y_offset": 96, "width": 192, "height": 96}, "type": "anything"}]}] }'
```

Note: The published topic name here is "/hobot_dnn_detection". The detection box origin is (96, 96) with width 192 and height 96. The detection box start and end points should not exceed the input image size—please keep this in mind during actual use.
