---
sidebar_position: 5
sidebar_products: RDK-X5
---
# YOLO-World

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Overview

YOLO-World is an advanced open-vocabulary object detection method that can efficiently detect entirely new object categories in a zero-shot manner based on changes in input text.

Code repository: (https://github.com/D-Robotics/hobot_yolo_world)

Application scenarios: YOLO-World's powerful zero-shot detection capability provides stronger generalization and can be applied in intelligent driving, smart home, geological detection, and related fields.


## Supported Platforms

| Platform                             | Runtime Environment | Example Features |
| -------------------------------- | ------------ | -------------------------------------------------------- |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | Start MIPI/USB camera/local feedback and display inference rendering results via Web |

## Algorithm Information

| Model | Platform | Input Size | Inference Frame Rate (fps) |
| ---- | ---- | ------------ | ---- |
| yoloworldv2 | X5 | 1×640x640x3 | 7.0 |

## Prerequisites

### RDK Platform

1. The RDK has been flashed with the RDK OS system.

2. TogetheROS.Bot has been successfully installed on the RDK.

3. A MIPI or USB camera is installed on the RDK.

4. Confirm that the PC can access the RDK over the network.

## Usage

The YOLO-World (hobot_yolo_world) package subscribes to images published by the sensor package. YOLO-World also supports changing detection categories based on input text, where text features come from a local feature library. Input text is used to query corresponding features and feed them into model inference. After inference, algorithm messages are published, and the websocket package renders and displays sensor images and corresponding algorithm results in a PC browser.


### RDK Platform

**Publish Images Using a MIPI Camera**

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


```shell
# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_yolo_world/config/ .

# 配置MIPI摄像头
export CAM_TYPE=mipi

# 启动launch文件
ros2 launch hobot_yolo_world yolo_world.launch.py yolo_world_texts:="red bottle,trash bin"
```


**Publish Images Using a USB Camera**

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# 配置tros.b环境
source /opt/tros/humble/setup.bash
```

```shell

# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_yolo_world/config/ .

# 配置USB摄像头
export CAM_TYPE=usb

# 启动launch文件
ros2 launch hobot_yolo_world yolo_world.launch.py yolo_world_texts:="red bottle,trash bin"
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

```shell

# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_yolo_world/config/ .

# 配置USB摄像头
export CAM_TYPE=usb

# 启动launch文件
ros2 launch hobot_yolo_world yolo_world.launch.py yolo_world_texts:="red bottle,trash bin"
```

</TabItem>

</Tabs>
</DocScope>

**Use Local Image Feedback**

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


```shell
# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_yolo_world/config/ .

# 配置本地回灌图片
export CAM_TYPE=fb

# 启动launch文件
ros2 launch hobot_yolo_world yolo_world.launch.py yolo_world_texts:="red bottle,trash bin"
```

## Result Analysis

The terminal outputs the following information during execution:

```shell
[hobot_yolo_world-3] [WARN] [0000003710.693524477] [hobot_yolo_world]: This is hobot yolo world!
[hobot_yolo_world-3] [WARN] [0000003710.792557185] [hobot_yolo_world]: Parameter:
[hobot_yolo_world-3]  feed_type(0:local, 1:sub): 1
[hobot_yolo_world-3]  image: config/yolo_world_test.jpg
[hobot_yolo_world-3]  dump_render_img: 0
[hobot_yolo_world-3]  is_shared_mem_sub: 1
[hobot_yolo_world-3]  score_threshold: 0.05
[hobot_yolo_world-3]  iou_threshold: 0.45
[hobot_yolo_world-3]  nms_top_k: 50
[hobot_yolo_world-3]  texts: red bottle,trash bin
[hobot_yolo_world-3]  ai_msg_pub_topic_name: /hobot_yolo_world
[hobot_yolo_world-3]  ros_img_sub_topic_name: /image
[hobot_yolo_world-3]  ros_string_sub_topic_name: /target_words
[hobot_yolo_world-3] [WARN] [0000003710.848418019] [hobot_yolo_world]: Parameter:
[hobot_yolo_world-3]  model_file_name: config/yolo_world.bin
[hobot_yolo_world-3]  model_name:
[hobot_yolo_world-3] [WARN] [0000003710.848540935] [hobot_yolo_world]: model_file_name_: config/yolo_world.bin, task_num: 4
[hobot_yolo_world-3] [BPU_PLAT]BPU Platform Version(1.3.6)!
[hobot_yolo_world-3] [HBRT] set log level as 0. version = 3.15.49.0
[hobot_yolo_world-3] [DNN] Runtime version = 1.23.8_(3.15.49 HBRT)
[hobot_yolo_world-3] [A][DNN][packed_model.cpp:247][Model](1970-01-01,01:01:51.482.877) [HorizonRT] The model builder version = 1.23.5
[hobot_yolo_world-3] [WARN] [0000003711.739402019] [hobot_yolo_world]: Get model name: yolo_world_pad_pretrain_norm_new from load model.
[hobot_yolo_world-3] [WARN] [0000003711.739551686] [hobot_yolo_world]: Create ai msg publisher with topic_name: /hobot_yolo_world
[hobot_yolo_world-3] [WARN] [0000003711.794810269] [hobot_yolo_world]: Create string subscription with topic_name: /target_words
[hobot_yolo_world-3] [WARN] [0000003711.808682144] [hobot_yolo_world]: Create img hbmem_subscription with topic_name: /hbmem_img
[hobot_yolo_world-3] [WARN] [0000003712.541236020] [yolo_world]: Loaned messages are only safe with const ref subscription callbacks. If you are using any other kind of subscriptions, set the ROS_DISABLE_LOANED_MESSAGES environment variable to 1 (the default).
[hobot_yolo_world-3] [W][DNN]bpu_model_info.cpp:491][Version](1970-01-01,01:01:51.727.259) Model: yolo_world_pad_pretrain_norm_new. Inconsistency between the hbrt library version 3.15.49.0 and the model build version 3.15.47.0 detected, in order to ensure correct model results, it is recommended to use compilation tools and the BPU SDK from the same OpenExplorer package.
[hobot_yolo_world-3] [WARN] [0000003714.698775687] [hobot_yolo_world]: Sub img fps: 1.00, Smart fps: 1.51, pre process time ms: 30, infer time ms: 121, post process time ms: 5
[hobot_yolo_world-3] [WARN] [0000003716.714586355] [hobot_yolo_world]: Sub img fps: 1.00, Smart fps: 0.99, pre process time ms: 40, infer time ms: 127, post process time ms: 6
[hobot_yolo_world-3] [WARN] [0000003718.707619939] [hobot_yolo_world]: Sub img fps: 1.00, Smart fps: 1.00, pre process time ms: 39, infer time ms: 121, post process time ms: 6
```

Enter `http://IP:8000` in a PC browser to view the image and algorithm rendering results (IP is the RDK's IP address):

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/render_yolo_world.jpeg)


## Advanced Usage
If you want to change the local text features, you can use the corresponding tools to generate them locally. [Usage instructions](https://github.com/D-Robotics/hobot_yolo_world/blob/develop/tool/README_cn.md).

```bash
# 从tros.b的安装路径中拷贝出运行示例需要的工具文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_yolo_world/tool/ .

# 下载模型并解压
wget http://archive.d-robotics.cc/models/yoloworld_encode_text/huggingclip_text_encode.tar.gz
sudo tar -xf huggingclip_text_encode.tar.gz -C tool

cd tool/

# 安装依赖
pip install -r requirements.txt
```

```bash
# 修改class.list里的词汇

# 生成本地词汇
python main.py

#拷贝新的词汇特征
mv offline_vocabulary_embeddings.json ../config/
```
