---
sidebar_position: 6
sidebar_products: RDK-X3,RDK-X5
---

# 5.2.6 模型推理

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 功能介绍

本章节介绍模型推理功能的使用，输入一张本地图片进行推理，得到渲染后的图片并保存在本地。

最后展示 TROS 应用算法中的[人体检测](../03_boxs/body/mono2d_body_detection.md)、[年龄识别](../03_boxs/body/mono_face_age_detection.md)、[人脸关键点检测](../03_boxs/body/mono_face_landmarks_detection.md)、[人手关键点检测](../03_boxs/body/hand_lmk_detection.md)、[手势识别](../03_boxs/body/hand_gesture_detection.md)的算法同时推理和融合后的效果。示例使用 MIPI/USB 摄像头/本地回灌输入，通过 WEB 展示推理渲染结果。

代码仓库：[https://github.com/D-Robotics/hobot_dnn](https://github.com/D-Robotics/hobot_dnn)

## 支持平台

| 平台    | 运行方式     |
| ------- | ------------ |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) |
| X86     | Ubuntu 20.04 (Foxy) |

:::caution
RDK S100/S600 平台的模型推理功能体验参考[Boxs 算法仓库](../03_boxs/detection/yolo.md)。
:::


## 准备工作

### RDK 平台

1. RDK 已烧录好 Ubuntu 系统镜像。

2. RDK 已成功安装 TogetheROS.Bot。

### X86 平台

1. 确认 X86 平台系统为 Ubuntu 20.04，且已成功安装 tros.b。

## 使用介绍

使用 hobot_dnn 配置文件中的本地 JPEG 格式图片和模型（FCOS 目标检测模型，支持的目标检测类型包括人、动物、水果、交通工具等共 80 种类型），通过回灌进行推理，并存储渲染后的图片。

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



```shell
# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。config中为example使用的模型，回灌使用的本地图片
cp -r /opt/tros/${TROS_DISTRO}/lib/dnn_node_example/config/ .

# 使用本地jpg格式图片进行回灌预测，并存储渲染后的图片
ros2 launch dnn_node_example dnn_node_example_feedback.launch.py dnn_example_config_file:=config/fcosworkconfig.json dnn_example_image:=config/target.jpg
```

运行成功后，在运行路径下自动保存渲染后的图片，命名方式为 render_feedback_0_0.jpeg，使用 ctrl+c 退出程序。

运行命令中的参数说明，以及如何订阅并使用从 camera 发布的图片进行算法推理的运行方法参考 dnn_node_example package 源码中的 README.md。

## 结果分析

在运行终端输出如下信息：

```text
[example-1] [INFO] [1679901151.612290039] [ImageUtils]: target size: 6
[example-1] [INFO] [1679901151.612314489] [ImageUtils]: target type: couch, rois.size: 1
[example-1] [INFO] [1679901151.612326734] [ImageUtils]: roi.type: couch, x_offset: 83 y_offset: 265 width: 357 height: 139
[example-1] [INFO] [1679901151.612412454] [ImageUtils]: target type: potted plant, rois.size: 1
[example-1] [INFO] [1679901151.612426522] [ImageUtils]: roi.type: potted plant, x_offset: 379 y_offset: 173 width: 131 height: 202
[example-1] [INFO] [1679901151.612472961] [ImageUtils]: target type: book, rois.size: 1
[example-1] [INFO] [1679901151.612497709] [ImageUtils]: roi.type: book, x_offset: 167 y_offset: 333 width: 67 height: 22
[example-1] [INFO] [1679901151.612522859] [ImageUtils]: target type: vase, rois.size: 1
[example-1] [INFO] [1679901151.612533487] [ImageUtils]: roi.type: vase, x_offset: 44 y_offset: 273 width: 26 height: 45
[example-1] [INFO] [1679901151.612557172] [ImageUtils]: target type: couch, rois.size: 1
[example-1] [INFO] [1679901151.612567740] [ImageUtils]: roi.type: couch, x_offset: 81 y_offset: 265 width: 221 height: 106
[example-1] [INFO] [1679901151.612606444] [ImageUtils]: target type: potted plant, rois.size: 1
[example-1] [INFO] [1679901151.612617518] [ImageUtils]: roi.type: potted plant, x_offset: 138 y_offset: 314 width: 45 height: 38
[example-1] [WARN] [1679901151.612652352] [ImageUtils]: Draw result to file: render_feedback_0_0.jpeg
```

输出 log 显示，算法使用输入的图片推理出 6 个目标，并输出了每个目标的类别（target type）和检测框坐标（检测框左上位置的 x 坐标 x_offset 和 y 坐标 y_offset，检测框的宽 width 和高 height）。存储的渲染图片文件名为 render_feedback_0_0.jpeg。

渲染后的图片 render_feedback_0_0.jpeg：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/ai_predict/render1.jpg" alt="AI 推理示例本地回灌后保存的算法渲染结果图片" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />


## 多算法推理

本节介绍多个算法同时推理，融合推理结果后在 WEB 端展示算法效果。

:::warning
仅 `TROS Humble 2.3.1` 以及后续版本支持此功能。

`TROS` 版本发布记录：[版本发布记录](../01_quick_start/changelog.md)，版本查看方法：[apt 安装与升级](../01_quick_start/install_tros.md)。
:::

**使用 MIPI/USB 摄像头发布图片**

```bash
# 配置tros.b环境
source /opt/tros/humble/setup.bash

# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/hand_lmk_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/hand_gesture_detection/config/ .

# 配置MIPI摄像头
export CAM_TYPE=mipi
# 使用USB摄像头的配置命令: export CAM_TYPE=usb

# 启动launch文件
ros2 launch hand_gesture_detection hand_gesture_fusion.launch.py
```

**使用本地图片回灌**

```bash
# 配置tros.b环境
source /opt/tros/humble/setup.bash
# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/hand_lmk_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/hand_gesture_detection/config/ .

# 配置本地回灌图片
export CAM_TYPE=fb

# 启动launch文件
ros2 launch hand_gesture_detection hand_gesture_fusion.launch.py publish_image_source:=config/person_face_hand.jpg publish_image_format:=jpg publish_output_image_w:=960 publish_output_image_h:=544 publish_fps:=30
```

在 PC 端的浏览器输入 `http://IP:8000` 即可查看图像和算法渲染效果（IP 为 RDK 的 IP 地址）：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/ai_predict/ai_predict_all_perc_render.jpg" alt="浏览器 Web 端查看图像与算法渲染效果的界面截图" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />
