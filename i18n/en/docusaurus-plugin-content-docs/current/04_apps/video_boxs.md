---
sidebar_position: 9
---

# 5.4.9 Smart Box

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Overview

The Smart Box App performs intelligent analysis after receiving IPC video stream input. The App consists of RTSP video stream, video decoding, human and face detection, image encoding, and a Web display client. The workflow is shown below:

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/video_boxs/video_boxs_workflow.jpg)

In actual customer applications, the display portion is completed by the customer's business system. The main functions of the Smart Box — RTSP video stream, video decoding, and human/face detection — publish intelligent results and images to the customer's business system. The workflow is shown below:
![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/video_boxs/video_boxs_workflow2.jpg)

Code repository: (https://github.com/D-Robotics/hobot_rtsp_client.git)

## Supported Platforms

| Platform                    | Runtime Environment                  |
|-----------------------|-----------------------|
| RDK X3, RDK X3 Module | Ubuntu 22.04 (Humble) |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) |
| RDK S600 | Ubuntu 24.04 (Jazzy) |

## Preparation


1. The RDK has been flashed with the RDK OS system image.

2. Install TogetheROS.Bot following [apt installation and upgrade](../01_quick_start/install_tros.md).

3. Prepare an IPC device that supports RTSP protocol for H264/H265 stream transmission, and configure an IP address on the same network segment.

4. A PC on the same network as the RDK (wired or on the same Wi-Fi, with the first three octets of the IP address [192.168.1.x] matching).

5. Configure the system to performance mode

```bash
sudo bash -c "echo performance > /sys/devices/system/cpu/cpufreq/policy0/scaling_governor"
```

<DocScope products="RDK-X3">

6. When starting multiple channels, configure ion_size to 1G. Refer to [srpi-config configuration](https://developer.d-robotics.cc/rdk_x_doc/en/System_configuration/srpi-config?v=3.0.0&p=RDK+X3)

</DocScope>

<DocScope products="RDK-X5">

6. When starting multiple channels, configure ion_size to 1G. Refer to [srpi-config configuration](https://developer.d-robotics.cc/rdk_x_doc/en/System_configuration/srpi-config?v=3.5.0&p=RDK+X5)

</DocScope>

<DocScope products="RDK-S100">

6. When starting multiple channels, configure ion_size to 1G. Refer to [srpi-config configuration](https://developer.d-robotics.cc/rdk_s_doc/en/System_configuration/srpi-config?v=4.0.5&p=RDK+S100)

</DocScope>

<DocScope products="RDK-S600">

6. When starting multiple channels, configure ion_size to 1G. Refer to [srpi-config configuration](https://developer.d-robotics.cc/rdk_s_doc/en/System_configuration/srpi-config?v=5.1.0&p=RDK+S600)

</DocScope>


## Usage

### Multi-Channel Startup Method

channel 1 (Terminal 1):

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

<TabItem value="jazzy" label="Jazzy">

```bash
# 配置tros.b环境
source /opt/tros/jazzy/setup.bash
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

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
# 配置tros.b环境
source /opt/tros/jazzy/setup.bash
```

</TabItem>

</Tabs>
</DocScope>


```shell
# 设置不同的域
export ROS_DOMAIN_ID=101

# 从TogetheROS的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/dnn_node_example/config/ .

# 启动launch文件
ros2 launch hobot_rtsp_client hobot_rtsp_client_ai_websocket_plugin.launch.py hobot_rtsp_url_num:=1 hobot_rtsp_url_0:='rtsp://admin:admin123@10.112.148.57:554/0' hobot_transport_0:='udp'  websocket_channel:=0
```

channel 2 (Terminal 2):

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

<TabItem value="jazzy" label="Jazzy">

```bash
# 配置tros.b环境
source /opt/tros/jazzy/setup.bash
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

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
# 配置tros.b环境
source /opt/tros/jazzy/setup.bash
```

</TabItem>

</Tabs>
</DocScope>


```shell
# 设置不同的域
export ROS_DOMAIN_ID=102

# 从TogetheROS的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/dnn_node_example/config/ .

# 启动launch文件
ros2 launch hobot_rtsp_client hobot_rtsp_client_ai_websocket_plugin.launch.py hobot_rtsp_url_num:=1 hobot_rtsp_url_0:='rtsp://admin:admin123@10.112.148.58:554/0' hobot_transport_0:='udp'  websocket_channel:=1
```

...

**Note**
1. Set different ROS_DOMAIN_ID and websocket_channel for each channel.
2. The above demonstrates the method for 2 channels. Start other channels 3~8 using the same approach.
3. Launch scripts with "_plugin" start in component mode; e.g., hobot_rtsp_client_ai_websocket_plugin.launch.py and hobot_rtsp_client_ai_plugin.launch.py
4. Launch scripts with "_websocket" enable web browsing; e.g., hobot_rtsp_client_ai_websocket_plugin.launch.py and hobot_rtsp_client_ai_websocket.launch.py
5. To increase connection channel capacity, frame rate reduction for multiple video streams is required. Configure the frame rate from the IPC.

### Algorithm Model Switching
The default algorithm in the launch script uses yolov8;

Refer to hobot_rtsp_client_ai_websocket_plugin.launch.py
```shell
    ComposableNode(
        package='dnn_node_example',
        plugin='DnnExampleNode',
        name='dnn_example',
        parameters=[
            {"config_file": 'config/yolov8workconfig.json'},
            {"dump_render_img": 0},
            {"feed_type": 1},
            {"is_shared_mem_sub": 0},
            {"msg_pub_topic_name": "/hobot_dnn_detection"}

        ],
        extra_arguments=[{'use_intra_process_comms': True}],
    ) 
```
To use the yolov5 algorithm, change config_file to "config/yolov5xworkconfig.json". Refer to [YOLO](../03_boxs/detection/yolo.md),

## Result Analysis

The RDK terminal outputs the following information:

```text
[hobot_codec_republish-2] [WARN] [1732169402.355433988] [hobot_codec_decoder]: Sub imgRaw fps = -1774563328
[hobot_codec_republish-2] [WARN] [1732169402.906547961] [hobot_codec_decoder]: sub h264 1920x1080, fps: 24.7706, pub nv12, fps: 9.17431, comm delay [-8.8148]ms, codec delay [171.2000]ms
[dnn_node_example-4] [WARN] [1732169402.906916796] [mono2d_body_det]: SharedMemImgProcess Recved img encoding: nv12, h: 1080, w: 1920, step: 1920, index: 2508, stamp: 1732169402_735947000, data size: 3133440, comm delay [170.9541]ms
[hobot_codec_republish-3] [WARN] [1732169403.274412126] [hobot_codec_encoder]: sub nv12 1920x1088, fps: 10.8055, pub jpeg, fps: 10.8055, comm delay [164.9091]ms, codec delay [7.6364]ms
[dnn_node_example-4] [WARN] [1732169403.321086039] [mono2d_body_det]: input fps: 10.81, out fps: 10.81, infer time ms: 92, post process time ms: 10
[hobot_codec_republish-2] [WARN] [1732169403.946849482] [hobot_codec_decoder]: sub h264 1920x1080, fps: 25, pub nv12, fps: 10.5769, comm delay [-7.0000]ms, codec delay [168.2727]ms

```

Open another terminal and use the `ros2 topic list` command to query RDK topic information:

```shell
$ export ROS_DOMAIN_ID=101
$ ros2 topic list
/hobot_dnn_detection
/image_decode
/image_mjpeg
/parameter_events
/rosout
/rtsp_image_ch_0

```

`/rtsp_image_ch_0` is the video published by the RDK after obtaining IPC video via RTSP. `/hobot_dnn_detection`
is the algorithm message published by the RDK containing human detection results. `/image_decode` is the NV12 image decoded by the RDK after receiving H264. `/image_mjpeg` is the JPEG image encoded by the RDK.

Enter `http://IP:8000` in a PC browser for split-screen configuration

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/video_boxs/video_boxs_websocket.jpg)

Human and face detection boxes, keypoints, and pose detection results are rendered on the web (IP is the RDK's IP address):

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/video_boxs/video_box_detection.jpg)
