---
sidebar_position: 2
sidebar_products: RDK-S100
---
# LiDAR Object Detection Algorithm

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Overview

The LiDAR object detection algorithm uses a `CenterPoint` model trained on the [nuscenes](https://www.nuscenes.org/nuscenes) dataset with [OpenExplorer](https://developer.d-robotics.cc/api/v1/fileData/horizon_j5_open_explorer_cn_doc/hat/source/examples/centerpoint.html).

The algorithm takes 32-line LiDAR point cloud data as input. The output includes 3D bounding boxes, confidence scores, and categories of detected objects. Supported detection categories include car, truck, bus, barrier, motorcycle, and pedestrian.

This example uses local LiDAR point cloud files as input, performs algorithm inference on the BPU, publishes rendered image messages containing point cloud data, object detection boxes, and orientations, and displays the algorithm results in a PC browser.

Code repository: (https://github.com/D-Robotics/hobot_centerpoint)

## Supported Platforms

| Platform      | Runtime Environment     | Example Functionality                                |
| --------- | ------------ | --------------------------------------- |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble), Ubuntu 24.04 (Jazzy) | Use local feedback playback and display inference rendering results via web |

## Preparation

### RDK Platform

1. RDK has been flashed with the Ubuntu system image.

2. TogetheROS.Bot has been successfully installed on the RDK.

3. Confirm that the PC can access the RDK over the network.

## Usage

### RDK Platform

### Local Point Cloud File Feedback Playback

The LiDAR object detection algorithm example uses LiDAR point cloud file feedback playback. After inference, rendered image messages with algorithm results are published. The websocket package displays the published images and corresponding algorithm results in a PC browser.

Prepare LiDAR point cloud files:



<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```shell
# 板端下载回灌的点云文件
cd ~
wget http://archive.d-robotics.cc/TogetheROS/data/hobot_centerpoint_data.tar.gz

# 解压缩
mkdir -p ~/centerpoint_data
tar -zxvf ~/hobot_centerpoint_data.tar.gz -C ~/centerpoint_data
```

</TabItem>
<TabItem value="jazzy" label="Jazzy">

```shell
# 板端下载回灌的点云文件
cd ~
wget http://archive.d-robotics.cc/TogetheROS/data/hobot_centerpoint_data.tar.gz

# 解压缩
mkdir -p ~/centerpoint_data
tar -zxvf ~/hobot_centerpoint_data.tar.gz -C ~/centerpoint_data
```

</TabItem>

</Tabs>
</DocScope>

Start the algorithm example:



<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```shell
# 配置tros.b humble环境
source /opt/tros/humble/setup.bash

if [ -L qat ]; then rm qat; fi
ln -s `ros2 pkg prefix hobot_centerpoint`/lib/hobot_centerpoint/qat/ qat
ln -s ~/centerpoint_data centerpoint_data

# 启动launch文件
ros2 launch hobot_centerpoint hobot_centerpoint.launch.py
```

</TabItem>
<TabItem value="jazzy" label="Jazzy">

```shell
# 配置tros.b jazzy环境
source /opt/tros/jazzy/setup.bash

if [ -L qat ]; then rm qat; fi
ln -s `ros2 pkg prefix hobot_centerpoint`/lib/hobot_centerpoint/qat/ qat
ln -s ~/centerpoint_data centerpoint_data

# 启动launch文件
ros2 launch hobot_centerpoint hobot_centerpoint.launch.py
```

</TabItem>

</Tabs>
</DocScope>

## Result Analysis

After starting the algorithm example, the running terminal outputs the following information:



<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```text
[INFO] [launch]: All log files can be found below /root/.ros/log/2025-05-08-10-05-16-060526-ubuntu-20968
[INFO] [launch]: Default logging verbosity is set to INFO
webserver has launch
[INFO] [hobot_centerpoint-1]: process started with pid [20971]
[INFO] [websocket-2]: process started with pid [20973]
[hobot_centerpoint-1] [UCP]: log level = 3
[hobot_centerpoint-1] [UCP]: UCP version = 3.3.3
[hobot_centerpoint-1] [VP]: log level = 3
[hobot_centerpoint-1] [DNN]: log level = 3
[hobot_centerpoint-1] [HPL]: log level = 3
[websocket-2] [WARN] [1746669916.389039854] [websocket]:
[websocket-2] Parameter:
[websocket-2]  image_topic: /image_jpeg
[websocket-2]  image_type: mjpeg
[websocket-2]  only_show_image: 1
[websocket-2]  output_fps: 0
[websocket-2] [INFO] [1746669916.389302684] [websocket]: Websocket using image mjpeg
[hobot_centerpoint-1] [UCPT]: log level = 6
[hobot_centerpoint-1] [DSP]: log level = 3
[hobot_centerpoint-1] [INFO] [1746669916.477961938] [centerpoint_node]: CenterPointNode init
[hobot_centerpoint-1] [WARN] [1746669916.478312520] [centerpoint_node]:
[hobot_centerpoint-1]  topic_name: image_jpeg
[hobot_centerpoint-1]  save_image: false
[hobot_centerpoint-1]  glog_level: 1
[hobot_centerpoint-1] [WARN] [1746669916.482928131] [ai_wrapper]:
[hobot_centerpoint-1]  Set glog level in cmd line with '--glog_level=$num'
[hobot_centerpoint-1]    EXAMPLE_SYSTEM = 0,  EXAMPLE_REPORT = 1,  EXAMPLE_DETAIL = 2,  EXAMPLE_DEBUG = 3
[hobot_centerpoint-1] [BPU][[BPU_MONITOR]][281473110813600][INFO]BPULib verison(2, 1, 2)[0d3f195]!
[hobot_centerpoint-1] [DNN] HBTL_EXT_DNN log level:6
[hobot_centerpoint-1] [DNN]: 3.3.3_(4.1.17 HBRT)
[hobot_centerpoint-1] [INFO] [1746669917.244757440] [centerpoint_node]: Get render imgs size: 1, frame_id: 0, duration ms infer: 46.38, postp: 9.55, prep: 16.01
[hobot_centerpoint-1] [INFO] [1746669917.264258828] [centerpoint_node]: Publish ros compressed image msg, format: jpeg, topic: image_jpeg
```

</TabItem>
<TabItem value="jazzy" label="Jazzy">

```text
[INFO] [launch]: All log files can be found below /root/.ros/log/2025-05-08-10-05-16-060526-ubuntu-20968
[INFO] [launch]: Default logging verbosity is set to INFO
webserver has launch
[INFO] [hobot_centerpoint-1]: process started with pid [20971]
[INFO] [websocket-2]: process started with pid [20973]
[hobot_centerpoint-1] [UCP]: log level = 3
[hobot_centerpoint-1] [UCP]: UCP version = 3.3.3
[hobot_centerpoint-1] [VP]: log level = 3
[hobot_centerpoint-1] [DNN]: log level = 3
[hobot_centerpoint-1] [HPL]: log level = 3
[websocket-2] [WARN] [1746669916.389039854] [websocket]:
[websocket-2] Parameter:
[websocket-2]  image_topic: /image_jpeg
[websocket-2]  image_type: mjpeg
[websocket-2]  only_show_image: 1
[websocket-2]  output_fps: 0
[websocket-2] [INFO] [1746669916.389302684] [websocket]: Websocket using image mjpeg
[hobot_centerpoint-1] [UCPT]: log level = 6
[hobot_centerpoint-1] [DSP]: log level = 3
[hobot_centerpoint-1] [INFO] [1746669916.477961938] [centerpoint_node]: CenterPointNode init
[hobot_centerpoint-1] [WARN] [1746669916.478312520] [centerpoint_node]:
[hobot_centerpoint-1]  topic_name: image_jpeg
[hobot_centerpoint-1]  save_image: false
[hobot_centerpoint-1]  glog_level: 1
[hobot_centerpoint-1] [WARN] [1746669916.482928131] [ai_wrapper]:
[hobot_centerpoint-1]  Set glog level in cmd line with '--glog_level=$num'
[hobot_centerpoint-1]    EXAMPLE_SYSTEM = 0,  EXAMPLE_REPORT = 1,  EXAMPLE_DETAIL = 2,  EXAMPLE_DEBUG = 3
[hobot_centerpoint-1] [BPU][[BPU_MONITOR]][281473110813600][INFO]BPULib verison(2, 1, 2)[0d3f195]!
[hobot_centerpoint-1] [DNN] HBTL_EXT_DNN log level:6
[hobot_centerpoint-1] [DNN]: 3.3.3_(4.1.17 HBRT)
[hobot_centerpoint-1] [INFO] [1746669917.244757440] [centerpoint_node]: Get render imgs size: 1, frame_id: 0, duration ms infer: 46.38, postp: 9.55, prep: 16.01
[hobot_centerpoint-1] [INFO] [1746669917.264258828] [centerpoint_node]: Publish ros compressed image msg, format: jpeg, topic: image_jpeg
```

</TabItem>

</Tabs>
</DocScope>

The output log shows that the topic publishing algorithm inference results is `/hobot_centerpoint`, and 81 feedback point cloud files were loaded. After inference and post-processing (including rendering and publishing inference results), the frame rate is approximately 2.4 fps.

Enter `http://IP:8000` in a PC browser to view the images and algorithm rendering results (IP is the RDK's IP address):

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/render_centerpoint_det.jpg)
