---
sidebar_position: 1
---
# mobilenetv2

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 功能介绍

mobilenetv2 图片分类算法示例使用图片作为输入，利用 BPU 进行算法推理，发布包含物体类别的算法 msg。

mobilenetv2 是使用[ImageNet data](http://www.image-net.org/)数据集训练出来的 caffe 模型，模型来源： https://github.com/shicai/MobileNet-Caffe 。
支持的目标类型包括人、动物、水果、交通工具等共 1000 种类型。具体支持的类别详见 RDK 板端文件 /opt/tros/ `${TROS_DISTRO}` /lib/dnn_node_example/config/imagenet.list（已安装 TogetheROS.Bot）。

代码仓库： https://github.com/D-Robotics/hobot_dnn

应用场景：mobilenetv2 能够预测给定图片的类别，可实现数字识别、物体识别等功能，主要应用于文字识别、图像检索等领域。

食品类型识别案例： https://github.com/frotms/Chinese-and-Western-Food-Classification

## 支持平台

| 平台    | 运行方式      | 示例功能                       |
| ------- | ------------ | ------------------------------ |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | · 启动 MIPI/USB 摄像头，并通过 web 展示推理渲染结果<br/>· 使用本地回灌，渲染结果保存在本地 |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | · 启动 MIPI/USB 摄像头，并通过 web 展示推理渲染结果<br/>· 使用本地回灌，渲染结果保存在本地 |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) | · 启动 MIPI/USB 摄像头，并通过 web 展示推理渲染结果<br/>· 使用本地回灌，渲染结果保存在本地 |
| RDK S600 | Ubuntu 24.04 (Jazzy) | · 启动 MIPI/USB 摄像头，并通过 web 展示推理渲染结果<br/>· 使用本地回灌，渲染结果保存在本地 |
| X86     | Ubuntu 20.04 (Foxy) | · 使用本地回灌，渲染结果保存在本地 |

## 算法信息

<DocScope products="RDK-X3">

| 模型 | 平台 | 输入尺寸 | 推理帧率(fps) |
| ---- | ---- | ---- | ---- |
| mobilenetv2 | X3 | 1x3x224x224 | 414.17 |

</DocScope>
<DocScope products="RDK-X5">

| 模型 | 平台 | 输入尺寸 | 推理帧率(fps) |
| ---- | ---- | ---- | ---- |
| mobilenetv2 | X5 | 1x3x224x224 | 683.46 |

</DocScope>
<DocScope products="RDK-S100">

| 模型 | 平台 | 输入尺寸 | 推理帧率(fps) |
| ---- | ---- | ---- | ---- |
| mobilenetv2 | S100 | 1x3x224x224 | 1722.25 |

</DocScope>
<DocScope products="RDK-S600">

| 模型 | 平台 | 输入尺寸 | 推理帧率(fps) |
| ---- | ---- | ---- | ---- |
| mobilenetv2 | S600 | 1x3x224x224 | 2721.90 |

</DocScope>

## 准备工作

### RDK 平台

1. RDK 已烧录好 Ubuntu 系统镜像。

2. RDK 已成功安装 tros.b。

3. RDK 已安装 MIPI 或者 USB 摄像头，无摄像头的情况下通过回灌本地 JPEG/PNG 格式图片或者 MP4、H.264 和 H.265 的视频方式体验算法效果。

4. 确认 PC 机能够通过网络访问 RDK。

### X86 平台

1. X86 环境已配置好 Ubuntu 20.04 系统镜像。

2. X86 环境系统已成功安装 tros.b。

## 使用介绍

### RDK 平台

mobilenetv2 图片分类订阅 sensor package 发布的图片，经过推理后发布算法 msg，通过 websocket package 实现在 PC 端浏览器上渲染显示发布的图片和对应的算法结果。

#### 使用 MIPI 摄像头发布图片

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
# 配置MIPI摄像头
export CAM_TYPE=mipi

# 启动launch文件
ros2 launch dnn_node_example dnn_node_example.launch.py dnn_example_config_file:=config/mobilenetv2workconfig.json dnn_example_image_width:=480 dnn_example_image_height:=272
```

#### 使用 USB 摄像头发布图片

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
# 配置USB摄像头
export CAM_TYPE=usb

# 启动launch文件
ros2 launch dnn_node_example dnn_node_example.launch.py dnn_example_config_file:=config/mobilenetv2workconfig.json dnn_example_image_width:=480 dnn_example_image_height:=272
```

#### 使用本地图片回灌

mobilenetv2 图片分类算法示例使用本地 JPEG/PNG 格式图片回灌，经过推理后将算法结果渲染后的图片存储在本地的运行路径下。

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
# 启动launch文件
ros2 launch dnn_node_example dnn_node_example_feedback.launch.py dnn_example_config_file:=config/mobilenetv2workconfig.json dnn_example_image:=config/target_class.jpg
```

### X86 平台

#### 使用本地图片回灌

mobilenetv2 图片分类算法示例使用本地 JPEG/PNG 格式图片回灌，经过推理后将算法结果渲染后的图片存储在本地的运行路径下。

```bash
# 配置tros.b环境
source /opt/tros/setup.bash

# 启动launch文件
ros2 launch dnn_node_example dnn_node_example_feedback.launch.py dnn_example_config_file:=config/mobilenetv2workconfig.json dnn_example_image:=config/target_class.jpg
```

## 结果分析

### 使用摄像头发布图片

在运行终端输出如下信息：

```shell
[example-3] [WARN] [1655095481.707875587] [example]: Create ai msg publisher with topic_name: hobot_dnn_detection
[example-3] [WARN] [1655095481.707983957] [example]: Create img hbmem_subscription with topic_name: /hbmem_img
[example-3] [WARN] [1655095482.985732162] [img_sub]: Sub img fps 31.07
[example-3] [WARN] [1655095482.992031931] [example]: Smart fps 31.31
[example-3] [WARN] [1655095484.018818843] [img_sub]: Sub img fps 30.04
[example-3] [WARN] [1655095484.025123362] [example]: Smart fps 30.04
[example-3] [WARN] [1655095485.051988567] [img_sub]: Sub img fps 30.01
[example-3] [WARN] [1655095486.057854228] [example]: Smart fps 30.07
```

输出 log 显示，发布算法推理结果的 topic 为 `hobot_dnn_detection` ，订阅图片的 topic 为 `/hbmem_img` ，订阅到的图片和算法推理输出帧率约为 30fps。

在 PC 端的浏览器输入 `http://IP:8000` 即可查看图像和算法渲染效果（IP 为 RDK 的 IP 地址）：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/classification/image/mobilenetv2/mobilenetv2_render_web.jpeg" alt="Web 端 MobileNetV2 图像分类算法渲染效果" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

### 使用本地图片回灌

在运行终端输出如下信息：

```shell
[example-1] [INFO] [1654767648.897132079] [example]: The model input width is 224 and height is 224
[example-1] [INFO] [1654767648.897180241] [example]: Dnn node feed with local image: config/target_class.jpg
[example-1] [INFO] [1654767648.935638968] [example]: task_num: 2
[example-1] [INFO] [1654767648.946566665] [example]: Output from image_name: config/target_class.jpg, frame_id: feedback, stamp: 0.0
[example-1] [INFO] [1654767648.946671029] [ClassificationPostProcess]: outputs size: 1
[example-1] [INFO] [1654767648.946718774] [ClassificationPostProcess]: out cls size: 1
[example-1] [INFO] [1654767648.946773602] [ClassificationPostProcess]: class type:window-shade, score:0.776356
[example-1] [INFO] [1654767648.947251721] [ImageUtils]: target size: 1
[example-1] [INFO] [1654767648.947342212] [ImageUtils]: target type: window-shade, rois.size: 1
[example-1] [INFO] [1654767648.947381666] [ImageUtils]: roi.type: , x_offset: 112 y_offset: 112 width: 0 height: 0
[example-1] [WARN] [1654767648.947563731] [ImageUtils]: Draw result to file: render_feedback_0_0.jpeg
```

输出 log 显示，算法使用输入的图片 config/target_class.jpg 推理出的图片分类结果是 window-shade，置信度为 0.776356（算法只输出置信度最高的分类结果）。存储的渲染图片文件名为 render_feedback_0_0.jpeg，渲染图片效果：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/classification/image/mobilenetv2/mobilenetv2_render_feedback.jpeg" alt="MobileNetV2 本地回灌推理后保存的分类结果渲染图" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />
