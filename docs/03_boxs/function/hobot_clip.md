---
sidebar_position: 1
sidebar_products: RDK-X5,RDK-S100
---
# 文本图片特征检索

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 功能介绍

[CLIP](https://github.com/openai/CLIP/) 是由 OpenAI 提出的一种多模态机器学习模型。该模型通过对大规模图像和文本对进行对比学习, 能够同时处理图像和文本, 并将它们映射到一个共享的向量空间中。本示例展示在 RDK 平台上利用 CLIP 进行图片管理与文本搜图的功能。

代码仓库： (https://github.com/D-Robotics/hobot_clip.git)

应用场景：利用 CLIP 图像特征提取器, 对图片进行管理, 进行图文搜图, 以图搜图等。

## 项目组成

项目包含几个节点：

- [clip_encode_image](https://github.com/D-Robotics/hobot_clip/tree/develop/clip_encode_image): 图像编码器边缘端推理节点, 支持两种模式：
  - 本地模式：支持回灌输入, 输出图像编码特征。
  - 服务模式：基于 Ros Action Server, 支持 Clinet 节点发送推理请求, 计算返回的图像编码特征。
- [clip_encode_text](https://github.com/D-Robotics/hobot_clip/tree/develop/clip_encode_text): 图像编码器边缘端推理节点, 支持两种模式：
  - 本地模式：支持回灌输入, 输出文本编码特征。
  - 服务模式：基于 Ros Action Server, 支持 Clinet 节点发送推理请求, 计算返回的文本编码特征。
- [clip_manage](https://github.com/D-Robotics/hobot_clip/tree/develop/clip_manage): CLIP 中继节点, 负责收发, 支持两种模式：
  - 入库模式：向图像编码节点 clip_encode_image 发送编码请求, 获取目标文件夹中图像编码特征, 将图像编码特征存储到本地 SQLite 数据库中。
  - 检索模式：向文本编码节点 clip_encode_text 发送编码请求, 获取目标文本编码特征。进一步将文本特征与数据库图像特征进行匹配, 获得匹配结果。
- [clip_msgs](https://github.com/D-Robotics/hobot_clip/tree/develop/clip_msgs): CLIP 系统的话题消息, action server 的控制消息。

## 支持平台

| 平台                  | 运行方式     | 示例功能                                                     |
| --------------------- | ------------ | ------------------------------------------------------------ |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | · 启动 CLIP 入库/检索, 入库结果保存在本地/检索结果显示在 Web |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) | · 启动 CLIP 入库/检索, 入库结果保存在本地/检索结果显示在 Web |

## 算法信息

<DocScope products="RDK-X5">

| 模型 | 平台 | 输入尺寸 | 推理帧率(fps) |
| ---- | ---- | ---- | ---- |
| clip image encoder | X5 | 1x3x224x224 | 4.6 |

</DocScope>
<DocScope products="RDK-S100">

| 模型 | 平台 | 输入尺寸 | 推理帧率(fps) |
| ---- | ---- | ---- | ---- |
| clip image encoder | S100 | 1x3x224x224 | 166.92 |

</DocScope>

## 准备工作

### RDK 平台

1. RDK 已烧录好 RDK OS 系统。

2. RDK 已成功安装 TogetheROS.Bot。

### 依赖安装

```shell
pip3 install onnxruntime
pip3 install ftfy
pip3 install wcwidth
pip3 install regex
```

### 模型下载
```shell
# 从Web端下载运行示例需要的模型文件。
wget http://archive.d-robotics.cc/models/clip_encode_text/text_encoder.tar.gz
sudo tar -xf text_encoder.tar.gz -C config
```

## 使用介绍

### RDK 平台

**模式 1 入库**

设置 clip_mode 为 “0”, 将"/root/config"目录下的图片文件入库, 存在"clip.db"数据库中。

（用户可根据需要, 更换需要入库的图片文件夹路径 clip_storage_folder、存放的数据库名 clip_db_file, 建议使用绝对路径。）

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



**模式 2 检索**

设置 clip_mode 为 “1”, 文本检索图片库 clip.db, 输入文本为"a diagram", 检索结果存放在 result 目录下。

（用户可根据需要, 更换需要待检索的数据库名 clip_db_file、待检索的文本名 clip_text、检索结果路径 clip_result_folder）

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

**检索结果可视化**

打开另一个终端：启动 Web 服务查看检索结果, 确保 index.html 和检索结果 result 为同一级目录。

```shell
cp -r /opt/tros/${TROS_DISTRO}/lib/clip_manage/config/index.html .
python -m http.server 8080
```

## 结果分析

**模式 1 入库**

入库成功终端日志：

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

**模式 2 检索**

检索成功终端日志：
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

**检索结果可视化**

在 PC 端的浏览器输入http://IP:8080 即可查看图像检索结果（IP 为设备 IP 地址）。

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/query_display.png" alt="CLIP 图像检索结果在浏览器端的展示界面" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

结果分析：按顺序依次可以看到检索文本与图片相似度依次检索结果。其中只有 CLIP.png 图片为本示例提供, 其他图片为用户实际 config 中图片, 因此预期可视化结果中只有首张图与示例中相同。
