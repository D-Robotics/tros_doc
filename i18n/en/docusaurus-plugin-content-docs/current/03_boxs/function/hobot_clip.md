---
sidebar_position: 1
sidebar_products: RDK-X5,RDK-S100
---
# Text-Image Feature Retrieval

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Overview

[CLIP](https://github.com/openai/CLIP/) is a multimodal machine learning model proposed by OpenAI. Through contrastive learning on large-scale image-text pairs, the model can process both images and text simultaneously and map them into a shared vector space. This example demonstrates using CLIP on the RDK platform for image management and text-to-image search.

Code repository: (https://github.com/D-Robotics/hobot_clip.git)

Application scenario: Use the CLIP image feature extractor to manage images and perform text-to-image search, image-to-image search, and more.

## Project Components

The project contains several nodes:

- [clip_encode_image](https://github.com/D-Robotics/hobot_clip/tree/develop/clip_encode_image): Edge-side image encoder inference node, supporting two modes:
  - Local mode: Supports feedback input and outputs image encoding features.
  - Service mode: Based on ROS Action Server, supports client nodes sending inference requests and returns computed image encoding features.
- [clip_encode_text](https://github.com/D-Robotics/hobot_clip/tree/develop/clip_encode_text): Edge-side text encoder inference node, supporting two modes:
  - Local mode: Supports feedback input and outputs text encoding features.
  - Service mode: Based on ROS Action Server, supports client nodes sending inference requests and returns computed text encoding features.
- [clip_manage](https://github.com/D-Robotics/hobot_clip/tree/develop/clip_manage): CLIP relay node responsible for sending and receiving, supporting two modes:
  - Indexing mode: Sends encoding requests to the image encoding node clip_encode_image, obtains image encoding features from the target folder, and stores image encoding features in a local SQLite database.
  - Retrieval mode: Sends encoding requests to the text encoding node clip_encode_text to obtain target text encoding features. Then matches text features with database image features to obtain matching results.
- [clip_msgs](https://github.com/D-Robotics/hobot_clip/tree/develop/clip_msgs): Topic messages for the CLIP system and action server control messages.

## Supported Platforms

| Platform                  | Runtime Environment     | Example Functionality                                                     |
| --------------------- | ------------ | ------------------------------------------------------------ |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | · Start CLIP indexing/retrieval, save indexing results locally/display retrieval results on web |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) | · Start CLIP indexing/retrieval, save indexing results locally/display retrieval results on web |

## Algorithm Information

<DocScope products="RDK-X5">

| Model | Platform | Input Size | Inference Frame Rate (fps) |
| ---- | ---- | ---- | ---- |
| clip image encoder | X5 | 1x3x224x224 | 4.6 |

</DocScope>
<DocScope products="RDK-S100">

| Model | Platform | Input Size | Inference Frame Rate (fps) |
| ---- | ---- | ---- | ---- |
| clip image encoder | S100 | 1x3x224x224 | 166.92 |

</DocScope>
## Preparation

### RDK Platform

1. RDK has been flashed with RDK OS.

2. TogetheROS.Bot has been successfully installed on the RDK.

### Dependency Installation

```shell
pip3 install onnxruntime
pip3 install ftfy
pip3 install wcwidth
pip3 install regex
```

### Model Download
```shell
# 从Web端下载运行示例需要的模型文件。
wget http://archive.d-robotics.cc/models/clip_encode_text/text_encoder.tar.gz
sudo tar -xf text_encoder.tar.gz -C config
```

## Usage

### RDK Platform

**Mode 1 Indexing**

Set clip_mode to "0" to index image files in the "/root/config" directory and store them in the "clip.db" database.

(Users can change the image folder path clip_storage_folder and database name clip_db_file as needed. Absolute paths are recommended.)

<DocScope products="RDK-X5">


```shell
# 配置ROS2环境
source /opt/tros/humble/setup.bash

# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/clip_encode_image/config/ .

# 启动launch文件
ros2 launch clip_manage hobot_clip_manage.launch.py clip_mode:=0 clip_db_file:=clip.db clip_storage_folder:=/root/config
```

</DocScope>

<DocScope products="RDK-S100">

```shell
# 配置ROS2环境
source /opt/tros/humble/setup.bash

# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/clip_encode_image/config/ .

# 启动launch文件
ros2 launch clip_manage hobot_clip_manage.launch.py clip_mode:=0 clip_image_model_file_name:=config/full_model_11.hbm clip_db_file:=clip.db clip_storage_folder:=/root/config
```

</DocScope>



**Mode 2 Retrieval**

Set clip_mode to "1" to search the image database clip.db with the text "a diagram". Retrieval results are saved in the result directory.

(Users can change the database name clip_db_file, search text clip_text, and retrieval result path clip_result_folder as needed.)

<DocScope products="RDK-X5">


```shell
# 配置ROS2环境
source /opt/tros/humble/setup.bash

# 启动launch文件
ros2 launch clip_manage hobot_clip_manage.launch.py clip_mode:=1 clip_db_file:=clip.db clip_result_folder:=result clip_text:="a diagram"
```
</DocScope>

<DocScope products="RDK-S100">

```shell
# 配置ROS2环境
source /opt/tros/humble/setup.bash

# 启动launch文件
ros2 launch clip_manage hobot_clip_manage.launch.py clip_mode:=1 clip_image_model_file_name:=config/full_model_11.hbm clip_db_file:=clip.db clip_result_folder:=result clip_text:="a diagram"
```

</DocScope>

**Retrieval Result Visualization**

Open another terminal: start the web service to view retrieval results. Ensure index.html and the retrieval result folder result are at the same level.

```shell
cp -r /opt/tros/${TROS_DISTRO}/lib/clip_manage/config/index.html .
python -m http.server 8080
```

## Result Analysis

**Mode 1 Indexing**

Terminal log on successful indexing:

```shell
[clip_manage-3] [WARN] [0000434374.492834334] [image_action_client]: Action client recved goal
[clip_manage-3] [WARN] [0000434374.493161250] [image_action_client]: Action client got lock
[clip_manage-3] [WARN] [0000434374.493402834] [image_action_client]: Sending goal, type: 1, urls size: 0
[clip_encode_image-1] [WARN] [0000434374.494557250] [encode_image_server]: Received goal request with type: 1
[clip_encode_image-1] [WARN] [0000434374.495408375] [encode_image_server]: Executing goal
[clip_encode_image-1] [WARN] [0000434379.674204836] [ClipImageNode]: Sub img fps: 1.58, Smart fps: 1.58, preprocess time ms: 1422, infer time ms: 218, post process time ms: 0
[clip_encode_image-1] [WARN] [0000434380.881684628] [ClipImageNode]: Sub img fps: 3.31, Smart fps: 3.31, preprocess time ms: 44, infer time ms: 216, post process time ms: 0
[clip_encode_image-1] [WARN] [0000434380.882277045] [encode_image_server]: Goal complete, task_result: 1
[clip_manage-3] [WARN] [0000434381.704573129] [image_action_client]: Get Result errorcode: 0
[clip_manage-3] [WARN] [0000434381.704934504] [ClipNode]: Storage finish, current num of database: 7.
```

**Mode 2 Retrieval**

Terminal log on successful retrieval:
```shell
[clip_manage-3] [WARN] [0000435148.509009119] [ClipNode]: Query start, num of database: 7.
[clip_manage-3] [WARN] [0000435148.509820786] [ClipNode]: Query finished! Cost 1 ms.
[clip_encode_text_node-2] [WARN] [0000435148.514026703] [clip_encode_text_node]: Clip Encode Text Node work success.
[clip_manage-3] [WARN] [0000435148.532558536] [ClipNode]: Query Result config/CLIP.png, similarity: 0.289350
[clip_manage-3] [WARN] [0000435148.540040328] [ClipNode]: Query Result config/dog.jpg, similarity: 0.228837
[clip_manage-3] [WARN] [0000435148.547667078] [ClipNode]: Query Result config/target_class.jpg, similarity: 0.224744
[clip_manage-3] [WARN] [0000435148.555092286] [ClipNode]: Query Result config/target.jpg, similarity: 0.207572
[clip_manage-3] [WARN] [0000435148.562450494] [ClipNode]: Query Result config/raw_unet.jpg, similarity: 0.198459
[clip_manage-3] [WARN] [0000435148.569500536] [ClipNode]: Query Result config/people.jpg, similarity: 0.174074
[clip_manage-3] [WARN] [0000435148.576885453] [ClipNode]: Query Result config/test.jpg, similarity: 0.174074
[clip_manage-3] [WARN] [0000435148.584450703] [text_action_client]: Get Result errorcode: 0
```

**Retrieval Result Visualization**

Enter http://IP:8080 in a PC browser to view image retrieval results (IP is the device IP address).

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/query_display.png" alt="Browser UI showing CLIP image retrieval results" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

Result analysis: You can see retrieval results ordered by similarity between the search text and images. Only the CLIP.png image is provided in this example; other images are from the user's actual config directory. Therefore, only the first image in the expected visualization result should match the example.
