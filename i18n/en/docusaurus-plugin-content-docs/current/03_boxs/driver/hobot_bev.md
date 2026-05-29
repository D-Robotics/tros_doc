---
sidebar_position: 1
sidebar_products: RDK-S100
---
# BEV Perception Algorithm

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Overview

The BEV perception algorithm uses a `BEV` multi-task model trained on the [nuscenes](https://www.nuscenes.org/nuscenes) dataset with [OpenExplorer](https://developer.d-robotics.cc/api/v1/fileData/horizon_j5_open_explorer_cn_doc/hat/source/examples/bev.html).

The algorithm takes 6 groups of image data as input: front view, front-left, front-right, rear view, rear-left, and rear-right. The model outputs objects in 10 categories along with corresponding 3D bounding boxes, including obstacles, various vehicle types, traffic signs, and more, as well as semantic segmentation of lane lines, sidewalks, and road edges.

This example uses local image data as input, performs algorithm inference on the BPU, publishes image messages with rendered perception results, and displays the algorithm results in a PC browser.

Code repository: (https://github.com/D-Robotics/hobot_bev.git)

## Supported Platforms

| Platform      | Runtime Environment     | Example Functionality                                |
| --------- | ------------ | --------------------------------------- |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) | Use local feedback playback and display inference rendering results via web |

## Preparation

1. RDK has been flashed with the Ubuntu system image.

2. TogetheROS.Bot has been successfully installed on the RDK.

3. Confirm that the PC can access the RDK over the network.

## Usage

### Local Dataset Feedback Playback

Use local dataset feedback playback. After inference, the algorithm publishes rendered image messages. The websocket package displays the published images and corresponding algorithm results in a PC browser.

***Prepare Feedback Dataset***

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```shell
# 板端下载数据集
wget http://archive.d-robotics.cc/TogetheROS/data/hobot_bev_data.tar.gz

# 解压缩
mkdir -p hobot_bev_data
tar -zxvf hobot_bev_data.tar.gz -C hobot_bev_data

# 解压完成后数据集在hobot_bev_data/data路径下
```

</TabItem>

<TabItem value="humble" label="Humble">

```shell
# 板端下载数据集
cd ~
wget http://archive.d-robotics.cc/TogetheROS/data/nuscenes_bev_val/nuscenes_bev_val.tar.gz

# 解压缩
mkdir -p ~/hobot_bev_data
tar -zxvf ~/nuscenes_bev_val.tar.gz -C ~/hobot_bev_data
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```shell
# 板端下载数据集
cd ~
wget http://archive.d-robotics.cc/TogetheROS/data/nuscenes_bev_val/nuscenes_bev_val.tar.gz

# 解压缩
mkdir -p ~/hobot_bev_data
tar -zxvf ~/nuscenes_bev_val.tar.gz -C ~/hobot_bev_data
```

</TabItem>

</Tabs>
</DocScope>

***Run Dataset Feedback Playback***

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```shell
# 配置tros.b环境
source /opt/tros/setup.bash

# 启动websocket服务
ros2 launch websocket websocket_service.launch.py

# 启动运行脚本，并指定数据集路径
ros2 launch hobot_bev hobot_bev.launch.py image_pre_path:=hobot_bev_data/data
```

</TabItem>

<TabItem value="humble" label="Humble">

```shell
# 配置tros.b humble环境
source /opt/tros/humble/setup.bash

if [ -L qat ]; then rm qat; fi
ln -s `ros2 pkg prefix hobot_bev`/lib/hobot_bev/qat/ qat
ln -s ~/hobot_bev_data/nuscenes_bev_val nuscenes_bev_val

# 启动运行脚本
ros2 launch hobot_bev hobot_bev.launch.py
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```shell
# 配置tros.b humble环境
source /opt/tros/humble/setup.bash

if [ -L qat ]; then rm qat; fi
ln -s `ros2 pkg prefix hobot_bev`/lib/hobot_bev/qat/ qat
ln -s ~/hobot_bev_data/nuscenes_bev_val nuscenes_bev_val

# 启动运行脚本
ros2 launch hobot_bev hobot_bev.launch.py
```

</TabItem>

</Tabs>
</DocScope>

## Result Analysis

The running terminal outputs the following information:

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```text
[INFO] [launch]: All log files can be found below /root/.ros/log/2023-07-05-17-47-07-232907-hobot-2627970
[INFO] [launch]: Default logging verbosity is set to INFO
[INFO] [hobot_bev-1]: process started with pid [2627972]
[INFO] [websocket-2]: process started with pid [2627974]
[hobot_bev-1] [WARN] [1688579227.907268364] [bev_node]:
[hobot_bev-1]  image_pre_path: hobot_bev_data/data
[hobot_bev-1] [BPU_PLAT]BPU Platform Version(1.3.3)!
[hobot_bev-1] [HBRT] set log level as 0. version = 3.14.25.0
[hobot_bev-1] [DNN] Runtime version = 1.12.3_(3.14.25 HBRT)
[hobot_bev-1] [WARN] [1688579228.714778531] [dnn]: Run default SetOutputParser.
[hobot_bev-1] [WARN] [1688579228.714925489] [dnn]: Set output parser with default dnn node parser, you will get all output tensors and should parse output_tensors in PostProcess.
[hobot_bev-1] [WARN] [1688579228.886846489] [bev_node]: loop 0/1002
[hobot_bev-1] [WARN] [1688579229.474568573] [bev_node]: loop 1/1002
[hobot_bev-1] [WARN] [1688579230.058551781] [bev_node]: loop 2/1002
[hobot_bev-1] [WARN] [1688579230.691667198] [bev_node]: loop 3/1002
[hobot_bev-1] [WARN] [1688579231.324658782] [bev_node]: loop 4/1002
[hobot_bev-1] [WARN] [1688579231.365145532] [bev_node]: input fps: 2.47, out fps: 2.52, infer time ms: 12, post process time ms: 659
[hobot_bev-1] [WARN] [1688579231.915645741] [bev_node]: loop 5/1002
[hobot_bev-1] [WARN] [1688579231.996993824] [bev_node]: input fps: 2.47, out fps: 2.52, infer time ms: 12, post process time ms: 658
```

</TabItem>

<TabItem value="humble" label="Humble">

```text
[INFO] [launch]: All log files can be found below /root/.ros/log/2025-05-08-09-44-40-838952-ubuntu-20037
[INFO] [launch]: Default logging verbosity is set to INFO
[INFO] [hobot_bev-1]: process started with pid [20040]
[INFO] [websocket-2]: process started with pid [20042]
[hobot_bev-1] [UCP]: log level = 3
[hobot_bev-1] [UCP]: UCP version = 3.3.3
[hobot_bev-1] [VP]: log level = 3
[hobot_bev-1] [DNN]: log level = 3
[hobot_bev-1] [HPL]: log level = 3
[websocket-2] [WARN] [1746668681.078783258] [websocket]:
[websocket-2] Parameter:
[websocket-2]  image_topic: /image_jpeg
[websocket-2]  image_type: mjpeg
[websocket-2]  only_show_image: 1
[websocket-2]  output_fps: 0
[websocket-2] [INFO] [1746668681.079077507] [websocket]: Websocket using image mjpeg
[hobot_bev-1] [UCPT]: log level = 6
[hobot_bev-1] [DSP]: log level = 3
[hobot_bev-1] [INFO] [1746668681.182092730] [bev_node]: BevNode init
[hobot_bev-1] [WARN] [1746668681.182327429] [bev_node]:
[hobot_bev-1]  topic_name: image_jpeg
[hobot_bev-1]  save_image: false
[hobot_bev-1]  glog_level: 1
[hobot_bev-1] [WARN] [1746668681.186660916] [ai_wrapper]:
[hobot_bev-1]  Set glog level in cmd line with '--glog_level=$num'
[hobot_bev-1]    EXAMPLE_SYSTEM = 0,  EXAMPLE_REPORT = 1,  EXAMPLE_DETAIL = 2,  EXAMPLE_DEBUG = 3
[hobot_bev-1] [BPU][[BPU_MONITOR]][281473498852256][INFO]BPULib verison(2, 1, 2)[0d3f195]!
[hobot_bev-1] [DNN] HBTL_EXT_DNN log level:6
[hobot_bev-1] [DNN]: 3.3.3_(4.1.17 HBRT)
[hobot_bev-1] [INFO] [1746668681.944706857] [bev_node]: Get render imgs size: 8, frame_id: 0, duration ms infer: 12.52, postp: 3.37, prep: 0.00
[hobot_bev-1] [INFO] [1746668681.997575564] [bev_node]: Publish ros compressed image msg, format: jpeg, topic: image_jpeg
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```text
[INFO] [launch]: All log files can be found below /root/.ros/log/2025-05-08-09-44-40-838952-ubuntu-20037
[INFO] [launch]: Default logging verbosity is set to INFO
[INFO] [hobot_bev-1]: process started with pid [20040]
[INFO] [websocket-2]: process started with pid [20042]
[hobot_bev-1] [UCP]: log level = 3
[hobot_bev-1] [UCP]: UCP version = 3.3.3
[hobot_bev-1] [VP]: log level = 3
[hobot_bev-1] [DNN]: log level = 3
[hobot_bev-1] [HPL]: log level = 3
[websocket-2] [WARN] [1746668681.078783258] [websocket]:
[websocket-2] Parameter:
[websocket-2]  image_topic: /image_jpeg
[websocket-2]  image_type: mjpeg
[websocket-2]  only_show_image: 1
[websocket-2]  output_fps: 0
[websocket-2] [INFO] [1746668681.079077507] [websocket]: Websocket using image mjpeg
[hobot_bev-1] [UCPT]: log level = 6
[hobot_bev-1] [DSP]: log level = 3
[hobot_bev-1] [INFO] [1746668681.182092730] [bev_node]: BevNode init
[hobot_bev-1] [WARN] [1746668681.182327429] [bev_node]:
[hobot_bev-1]  topic_name: image_jpeg
[hobot_bev-1]  save_image: false
[hobot_bev-1]  glog_level: 1
[hobot_bev-1] [WARN] [1746668681.186660916] [ai_wrapper]:
[hobot_bev-1]  Set glog level in cmd line with '--glog_level=$num'
[hobot_bev-1]    EXAMPLE_SYSTEM = 0,  EXAMPLE_REPORT = 1,  EXAMPLE_DETAIL = 2,  EXAMPLE_DEBUG = 3
[hobot_bev-1] [BPU][[BPU_MONITOR]][281473498852256][INFO]BPULib verison(2, 1, 2)[0d3f195]!
[hobot_bev-1] [DNN] HBTL_EXT_DNN log level:6
[hobot_bev-1] [DNN]: 3.3.3_(4.1.17 HBRT)
[hobot_bev-1] [INFO] [1746668681.944706857] [bev_node]: Get render imgs size: 8, frame_id: 0, duration ms infer: 12.52, postp: 3.37, prep: 0.00
[hobot_bev-1] [INFO] [1746668681.997575564] [bev_node]: Publish ros compressed image msg, format: jpeg, topic: image_jpeg
```

</TabItem>

</Tabs>
</DocScope>

Enter `http://IP:8000` in a PC browser to view the images and algorithm rendering results (IP is the RDK's IP address):

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/render_bev.jpeg)

</TabItem>

<TabItem value="humble" label="Humble">

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/render_bev_s100.jpeg)

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/render_bev_s100.jpeg)

</TabItem>

</Tabs>
</DocScope>
