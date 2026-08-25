---
sidebar_position: 7
sidebar_products: RDK-S100,RDK-S600
---
# 人体检测和跟踪(Ultralytics YOLO Pose)

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 功能介绍

本示例采用 [yolo-pose](https://docs.ultralytics.com/zh/tasks/pose/) 进行人体检测和跟踪算法示例订阅图片，利用 BPU 进行算法推理，发布包含人体框和人体关键点检测结果 msg，并通过多目标跟踪（multi-target tracking，即 MOT）功能，实现检测框的跟踪。

算法支持的检测类别，以及不同类别在算法 msg 中对应的数据类型如下：

| 类别     | 说明       | 数据类型 |
| -------- | ---------- | -------- |
| body     | 人体框     | Roi      |
| body_kps | 人体关键点 | Point    |

人体关键点算法结果索引如下图：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/kps_yolo_index.jpeg" alt="YOLO Pose 人体关键点算法结果索引示意图" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>


代码仓库： (https://github.com/D-Robotics/mono2d_body_detection)

应用场景：人体检测和跟踪算法是人体运动视觉分析的重要组成部分，可实现人体姿态分析以及人流量统计等功能，主要应用于人机交互、游戏娱乐等领域。

<DocScope products="RDK-X3,RDK-X5">

姿态检测案例：[姿态检测](../../04_apps/fall_detection.md)    
小车人体跟随案例：[小车人体跟随](../../04_apps/car_tracking.md)  
基于人体姿态分析以及手势识别实现游戏人物控制案例：[玩转 X3 派，健身游戏两不误](https://developer.d-robotics.cc/forumDetail/112555512834430487)

</DocScope>

## 支持平台

| 平台                             | 运行方式     | 示例功能                                                 |
| -------------------------------- | ------------ | -------------------------------------------------------- |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) | 启动 MIPI/USB 摄像头/本地回灌，并通过 Web 展示推理渲染结果 |
| RDK S600 | Ubuntu 24.04 (Humble) | 启动 MIPI/USB 摄像头/本地回灌，并通过 Web 展示推理渲染结果 |

## 算法信息

<DocScope products="RDK-S100">

| 模型 | 平台 | 输入尺寸 | 推理帧率(fps) |
| ---- | ---- | ---- | ---- |
| yolov11x-pose | S100 | 1x3x640x640 | 68.70 |

</DocScope>
<DocScope products="RDK-S600">

| 模型 | 平台 | 输入尺寸 | 推理帧率(fps) |
| ---- | ---- | ---- | ---- |
| yolov11n-pose | S600 | 1x3x640x640 | 1104.91 |

</DocScope>

## 准备工作

### RDK 平台

1. RDK 已烧录好 RDK OS 系统。

2. RDK 已成功安装 TogetheROS.Bot。

3. RDK 已安装 MIPI 或者 USB 摄像头。

4. 确认 PC 机能够通过网络访问 RDK。

## 使用介绍

人体检测和跟踪(mono2d_body_detection)package 订阅 sensor package 发布的图片，经过推理后发布算法 msg，通过 websocket package 实现在 PC 端浏览器上渲染显示 sensor 发布的图片和对应的算法结果。

### RDK 平台

**使用 MIPI 摄像头发布图片**



<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# 配置tros.b环境
source /opt/tros/humble/setup.bash

# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .

# 配置MIPI摄像头
export CAM_TYPE=mipi

# 启动launch文件
ros2 launch mono2d_body_detection mono2d_body_detection.launch.py kps_model_type:=1 kps_image_width:=1920 kps_image_height:=1080 kps_model_file_name:=config/yolo11x_pose_nashe_640x640_nv12.hbm
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

# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .

# 配置MIPI摄像头
export CAM_TYPE=mipi

# 启动launch文件
ros2 launch mono2d_body_detection mono2d_body_detection.launch.py kps_model_type:=1 kps_image_width:=1920 kps_image_height:=1080 kps_model_file_name:=config/yolo11n_pose_nashp_640x640_nv12.hbm
```

</TabItem>

</Tabs>
</DocScope>

**使用 USB 摄像头发布图片**



<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# 配置tros.b环境
source /opt/tros/humble/setup.bash

# 配置USB摄像头
export CAM_TYPE=usb

# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .

# 启动launch文件
ros2 launch mono2d_body_detection mono2d_body_detection.launch.py kps_model_type:=1 kps_image_width:=1920 kps_image_height:=1080 kps_model_file_name:=config/yolo11x_pose_nashe_640x640_nv12.hbm
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

# 配置USB摄像头
export CAM_TYPE=usb

# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .

# 启动launch文件
ros2 launch mono2d_body_detection mono2d_body_detection.launch.py kps_model_type:=1 kps_image_width:=1920 kps_image_height:=1080 kps_model_file_name:=config/yolo11n_pose_nashp_640x640_nv12.hbm
```

</TabItem>

</Tabs>
</DocScope>

**使用本地回灌图片**



<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# 配置tros.b环境
source /opt/tros/humble/setup.bash

# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/dnn_node_example/config/ .

# 配置本地回灌图片
export CAM_TYPE=fb

# 启动launch文件
ros2 launch mono2d_body_detection mono2d_body_detection.launch.py publish_image_source:=config/person_body.jpg publish_image_format:=jpg kps_model_type:=1 kps_image_width:=640 kps_image_height:=640 kps_model_file_name:=config/yolo11x_pose_nashe_640x640_nv12.hbm
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

# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/dnn_node_example/config/ .

# 配置本地回灌图片
export CAM_TYPE=fb

# 启动launch文件
ros2 launch mono2d_body_detection mono2d_body_detection.launch.py publish_image_source:=config/person_body.jpg publish_image_format:=jpg kps_model_type:=1 kps_image_width:=640 kps_image_height:=640 kps_model_file_name:=config/yolo11n_pose_nashp_640x640_nv12.hbm
```

</TabItem>

</Tabs>
</DocScope>

## 结果分析

在运行终端输出如下信息：

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

输出 log 显示，程序运行成功，推理时算法输入和输出帧率为 30fps，每秒钟刷新一次统计帧率。

在 PC 端的浏览器输入 `http://IP:8000` 即可查看图像和算法（人体、人头、人脸、人手检测框，检测框类型和目标跟踪 ID，人体关键点）渲染效果（IP 为 RDK 设备的 IP 地址）：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/yolo_pose_render.png" alt="Web 端 YOLO Pose 人体检测框与关键点渲染效果" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />
