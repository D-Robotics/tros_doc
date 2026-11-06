---
sidebar_position: 3
sidebar_products: RDK-X5,RDK-S100
---
# OCR 文本识别

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 功能介绍

OCR 文本识别算法示例由 [mono_ocr_detection](https://github.com/D-Robotics/mono_ocr_detection)（文本检测）和 [mono_ocr_recognition](https://github.com/D-Robotics/mono_ocr_recognition)（文本识别）两个功能包组成，基于 dnn_node 推理框架，是对 [PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) ppocrv6 模型的量化部署。

文本检测包使用图片作为输入，利用 BPU 进行算法推理，发布包含文本框坐标的算法 msg；文本识别包订阅检测结果，并结合 NV12 原图裁剪文本区域送入识别模型，发布包含文本内容的算法 msg。两个包配合 websocket package，可在 PC 端浏览器上实时查看图片和对应的 OCR 识别结果。

模型使用 PaddleOCR 官方 ppocrv6 中英文模型，支持中英文文字、数字与常用符号的检测与识别。

应用场景：OCR 文本识别能够从图像中定位并读出文字内容，可实现仪表读数、招牌文字识别、物流单号录入等功能，主要应用于智能巡检、智慧零售、工业检测等领域。

## 支持平台

| 平台 | 运行方式 | 示例功能 |
| ---- | -------- | -------- |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | 启动 MIPI/USB 摄像头/本地回灌，并通过 Web 展示推理渲染结果 |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) | 启动 MIPI/USB 摄像头/本地回灌，并通过 Web 展示推理渲染结果 |

## 算法信息

<DocScope products="RDK-X5">

| 模型 | 平台 | 输入尺寸 | 推理帧率(fps) |
| ---- | ---- | ---- | ---- |
| ppocrv6_medium_det_int8_640_m | X5 | 640×640 | 32.53 |

</DocScope>
<DocScope products="RDK-S100">

| 模型 | 平台 | 输入尺寸 | 推理帧率(fps) |
| ---- | ---- | ---- | ---- |
| ppocrv6_medium_det_int8_640_m | S100 | 640×640 | 186.25 |

</DocScope>

## 准备工作

### RDK 平台

1. RDK 已烧录好 RDK OS 系统。

2. RDK 已成功安装 TogetheROS.Bot。

3. RDK 已安装 mono_ocr_detection 和 mono_ocr_recognition 功能包（随 TROS 安装，位于 `/opt/tros/${TROS_DISTRO}/lib/` 路径下）。

4. RDK 已安装 MIPI 或者 USB 摄像头，无摄像头的情况下通过回灌本地 JPEG/PNG 格式图片的方式体验算法效果。

5. 确认 PC 机能够通过网络访问 RDK。

## 使用介绍

OCR 文本识别由检测和识别两级模型组成：图片源（摄像头/回灌）发布 NV12 共享内存图片话题 `/hbmem_img`，mono_ocr_detection 订阅图片并发布文本检测结果话题 `/hobot_ocr_detection`，mono_ocr_recognition 订阅检测结果与原始图片，发布文本识别结果话题 `/hobot_ocr_recognition`，websocket package 将图片与识别结果渲染到 PC 端浏览器。

`mono_ocr_recognition` 的 launch 会同时拉起检测和识别两个节点，一条命令即可运行完整 OCR 链路。

### RDK 平台

**使用 MIPI 摄像头发布图片**

<DocScope products="RDK-X5,RDK-S100">
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
cp -r /opt/tros/${TROS_DISTRO}/lib/mono_ocr_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/mono_ocr_recognition/config/ .

# 配置MIPI摄像头
export CAM_TYPE=mipi

# 启动launch文件
ros2 launch mono_ocr_recognition mono_ocr_recognition.launch.py
```

**使用 USB 摄像头发布图片**

<DocScope products="RDK-X5,RDK-S100">
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
cp -r /opt/tros/${TROS_DISTRO}/lib/mono_ocr_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/mono_ocr_recognition/config/ .

# 配置USB摄像头
export CAM_TYPE=usb

# 启动launch文件
ros2 launch mono_ocr_recognition mono_ocr_recognition.launch.py
```

**使用本地回灌图片**

<DocScope products="RDK-X5,RDK-S100">
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
cp -r /opt/tros/${TROS_DISTRO}/lib/mono_ocr_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/mono_ocr_recognition/config/ .

# 配置本地回灌图片，默认回灌 config/component.jpg
export CAM_TYPE=fb

# 启动launch文件，图片回灌推理配置输入分辨率为 1920x1080
ros2 launch mono_ocr_recognition mono_ocr_recognition.launch.py mono_ocr_detection_image_width:=1920 mono_ocr_detection_image_height:=1080
```

**可配参数**

- `mono_ocr_detection_config_file`：检测模型配置文件路径，默认 `config/mono_ocr_detection_workconfig.json`。
- `mono_ocr_detection_image_width` / `mono_ocr_detection_image_height`：输入图片分辨率，默认 960×544。
- `device`：摄像头设备，USB 摄像头默认 `/dev/video0`，MIPI 摄像头默认 `F37`。
- `dump_render_img`：是否保存渲染结果图，默认 `0`；设为 `1` 时在运行路径下保存渲染图片。

<DocScope products="RDK-S100">

**可选：4K 分辨率链路**

`_4k.launch.py` 作为可选项，不在上述主运行方法之内。4K 链路将 3840×2160 全分辨率图片直接送入检测模型（`ppocrv6_medium_det_int8_4k_m`，检测配置使用 `config/mono_ocr_detection_4k_workconfig.json`），适合远距离小字号文本场景。

<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# 配置tros.b环境
source /opt/tros/humble/setup.bash
```

</TabItem>

</Tabs>

```shell
# 运行方式与主链路一致（拷贝 config、设置 CAM_TYPE），仅替换为 4K launch 文件
export CAM_TYPE=fb

# 启动 4K 检测+识别全链路
ros2 launch mono_ocr_recognition mono_ocr_recognition_4k.launch.py
```

4K 链路通过 2160P 档共享内存消息（HbmMsg2160P）传输图片，依赖较新的 `hbm_img_msgs` 与 `hobot_image_publisher`，旧版本 TROS 镜像需升级后使用。

</DocScope>

## 结果分析

在运行终端输出如下信息：

以 RDK S100 本地回灌运行为例，在运行终端输出如下信息：

```text
[mono_ocr_detection-3] [WARN] [1793870935.340955332] [mono_ocr_detection]: Sub img fps: 5.00, Smart fps: 5.00, recved img time delay ms: 9, pre process time ms: 0, infer time ms: 5, post process time ms: 1, pipeline time ms: 9
[mono_ocr_recognition-4] [WARN] [1793870935.495176460] [mono_ocr_recognition]: Rec rois: 12, Sub fps: 5.00, Smart fps: 5.01, det msg delay ms: 164, infer time ms: 136, post process time ms: 14
[mono_ocr_detection-3] [WARN] [1793870934.141184705] [mono_ocr_detection]: Sub img fps: 5.84, Smart fps: 5.85, recved img time delay ms: 10, pre process time ms: 0, infer time ms: 5, post process time ms: 1, pipeline time ms: 10
[mono_ocr_recognition-4] [WARN] [1793870934.296509605] [mono_ocr_recognition]: Rec rois: 12, Sub fps: 5.86, Smart fps: 5.88, det msg delay ms: 165, infer time ms: 138, post process time ms: 13
```

输出 log 显示：发布算法推理结果的 topic 为 `/hobot_ocr_detection`（检测）与 `/hobot_ocr_recognition`（识别），订阅图片的 topic 为 `/hbmem_img`。检测节点推理耗时 5 ms；识别节点每次处理 12 个文本区域（Rec rois: 12），识别推理耗时约 136 ms；图片订阅帧率与算法输出帧率一致（回灌源为 5 fps 时 Smart fps 约为 5）。

在 PC 端的浏览器输入 `http://IP:8000` 即可查看图像和算法渲染效果（IP 为 RDK 的 IP 地址）。

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/ocr_render.png" alt="Web 端 OCR 文本识别渲染效果" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

## 注意事项

1. `mono_ocr_recognition` 的 launch 不会自动拷贝配置文件，首次运行前需要手动拷贝 `mono_ocr_detection` 和 `mono_ocr_recognition` 两个包的 config 到运行目录（见上文命令）。
2. 识别节点必须在检测结果话题 `/hobot_ocr_detection` 有输入时才会输出识别结果；全链路 launch 已同时拉起两个节点，单独运行识别节点时需自行提供检测结果。
3. 回灌或摄像头启动初期，codec 与 websocket 可能输出数条 "未收到图片/AI 数据" 告警，属于启动时序的正常现象，链路建立后自动恢复。
