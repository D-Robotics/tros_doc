---
sidebar_position: 2
sidebar_products: RDK-S100
---
# 激光雷达目标检测算法

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 功能介绍

激光雷达目标检测算法是使用[OpenExplorer](https://developer.d-robotics.cc/api/v1/fileData/horizon_j5_open_explorer_cn_doc/hat/source/examples/centerpoint.html)在[nuscenes](https://www.nuscenes.org/nuscenes)数据集上训练出来的 `CenterPoint` 算法模型。

算法输入为 32 线激光雷达点云数据，输出信息包括目标的 3D 检测框、置信度、类别。支持的目标检测类型包括 car、truck、bus、barrier、motorcycle、pedestrian 共六大类别。

此示例使用本地激光雷达点云文件作为输入，利用 BPU 进行算法推理，发布包含点云数据、目标检测框和朝向的渲染图片消息，在 PC 端浏览器上渲染显示算法结果。

代码仓库： (https://github.com/D-Robotics/hobot_centerpoint)

## 支持平台

| 平台      | 运行方式     | 示例功能                                |
| --------- | ------------ | --------------------------------------- |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) | 使用本地回灌，并通过 web 展示推理渲染结果 |

## 准备工作

### RDK 平台

1. RDK 已烧录好 Ubuntu 系统镜像。

2. RDK 已成功安装 TogetheROS.Bot。

3. 确认 PC 机能够通过网络访问 RDK。

## 使用介绍

### RDK 平台

### 使用本地点云文件回灌

激光雷达物体检测算法示例使用激光雷达点云文件回灌，经过推理后将算法结果渲染后的图片 msg，通过 websocket package 实现在 PC 端浏览器上渲染显示发布的图片和对应的算法结果。

准备激光雷达点云文件：



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

</Tabs>
</DocScope>

启动算法示例：



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

</Tabs>
</DocScope>

## 结果分析

启动算法示例后在运行终端输出如下信息：



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

</Tabs>
</DocScope>

输出 log 显示，发布算法推理结果的 topic 为 `/hobot_centerpoint` , 获取的回灌点云文件为 81 个。算法经过推理，后处理(包含推理结果的渲染和发布)，帧率约为 2.4fps。

在 PC 端的浏览器输入 `http://IP:8000` 即可查看图像和算法渲染效果（IP 为 RDK 的 IP 地址）：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/render_centerpoint_det.jpg" alt="Web 端 CenterPoint 点云目标检测渲染效果" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />
