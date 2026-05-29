---
sidebar_position: 1
---
# mobilenet_unet

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Overview

The mobilenet_unet segmentation example uses images as input, runs inference on the BPU, and publishes messages containing segmentation results.

mobilenet_unet is an ONNX model trained on the [Cityscapes](https://www.cityscapes-dataset.com/) dataset. It supports segmentation of categories such as people, vehicles, road surfaces, and road markings.

Code repository: https://github.com/D-Robotics/hobot_dnn

Application scenarios: mobilenet_unet combines MobileNet and UNet to segment image content at the pixel level. It supports road recognition, remote sensing map analysis, medical image diagnosis, and other functions, and is mainly used in autonomous driving, geological detection, medical image analysis, and related fields.

Background blur example: https://github.com/rusito-23/mobile_unet_segmentation

## Supported Platforms

| Platform    | Runtime      | Example Features                       |
| ------- | ------------ | ------------------------------ |
| RDK X3, RDK X3 Module| Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | · Start MIPI/USB camera/local image playback; save rendered results locally |
| RDK X5, RDK X5 Module| Ubuntu 22.04 (Humble) | · Start MIPI/USB camera/local image playback; save rendered results locally |
| RDK S100, RDK S100P| Ubuntu 22.04 (Humble) | · Start MIPI/USB camera/local image playback; save rendered results locally |
| RDK S600| Ubuntu 24.04 (Jazzy) | · Start MIPI/USB camera/local image playback; save rendered results locally |
| X86     | Ubuntu 20.04 (Foxy) | · Use local image playback; save rendered results locally |

## Algorithm Information

| Model | Platform | Input Size | Inference FPS |
| ---- | ---- | ------------ | ---- |
| mobilenet_unet | X3 | 1x3x1024x2048 | 24.34 |
| mobilenet_unet | X5 | 1x3x224x224 | 50.33 |
| deeplabv3 | S100 | 1x3x224x224 | 14.70 |
| deeplabv3 | S600 | 1x3x224x224 | 337.15 |

## Preparation

### RDK Platform

1. RDK has been flashed with the Ubuntu system image.

2. TogetheROS.Bot has been successfully installed on RDK.

3. A MIPI or USB camera has been installed on RDK. If no camera is available, you can experience the algorithm by playing back local JPEG/PNG images.

### X86 Platform

1. Ubuntu 20.04 system image has been configured on the X86 environment.

2. tros.b has been successfully installed on the X86 environment.

## Usage

### RDK Platform

#### Publish Images Using a Camera

##### Publish Images Using a MIPI Camera

The mobilenet_unet segmentation example subscribes to images published by the sensor package, runs inference, publishes algorithm messages, and automatically saves rendered images in the runtime directory. Files are named in the format `render_frameid_timestamp_seconds_timestamp_nanoseconds.jpg`.

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
ros2 launch dnn_node_example dnn_node_example.launch.py dnn_example_dump_render_img:=1 dnn_example_config_file:=config/mobilenet_unet_workconfig.json dnn_example_image_width:=1920 dnn_example_image_height:=1080
```

##### Publish Images Using a USB Camera

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
ros2 launch dnn_node_example dnn_node_example.launch.py dnn_example_dump_render_img:=1 dnn_example_config_file:=config/mobilenet_unet_workconfig.json dnn_example_image_width:=1920 dnn_example_image_height:=1080
```

#### Local Image Playback

The mobilenet_unet segmentation example uses local JPEG/PNG images for playback. After inference, rendered images with algorithm results are saved in the local runtime directory.

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
ros2 launch dnn_node_example dnn_node_example_feedback.launch.py dnn_example_config_file:=config/mobilenet_unet_workconfig.json dnn_example_image:=config/raw_unet.jpg
```

### X86 Platform

#### Local Image Playback

The mobilenet_unet segmentation example uses local JPEG/PNG images for playback. After inference, rendered images with algorithm results are saved in the local runtime directory.

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
# 启动launch文件
ros2 launch dnn_node_example dnn_node_example_feedback.launch.py dnn_example_config_file:=config/mobilenet_unet_workconfig.json dnn_example_image:=config/raw_unet.jpg
```

## Result Analysis

### Publish Images Using a Camera

The terminal outputs the following information during runtime:

```shell
[example-3] [WARN] [1655095719.035374293] [example]: Create ai msg publisher with topic_name: hobot_dnn_detection
[example-3] [WARN] [1655095719.035493746] [example]: Create img hbmem_subscription with topic_name: /hbmem_img
[example-3] [WARN] [1655095720.693716453] [img_sub]: Sub img fps 6.85
[example-3] [WARN] [1655095721.072909861] [example]: Smart fps 5.85
[example-3] [WARN] [1655095721.702680885] [img_sub]: Sub img fps 3.97
[example-3] [WARN] [1655095722.486407545] [example]: Smart fps 3.54
[example-3] [WARN] [1655095722.733431396] [img_sub]: Sub img fps 4.85
[example-3] [WARN] [1655095723.888407681] [example]: Smart fps 4.28
[example-3] [WARN] [1655095724.069835983] [img_sub]: Sub img fps 3.74
[example-3] [WARN] [1655095724.900725522] [example]: Smart fps 3.95
[example-3] [WARN] [1655095725.093525634] [img_sub]: Sub img fps 3.91
```

The log shows that the topic publishing algorithm inference results is `hobot_dnn_detection`, and the topic subscribing to images is `/hbmem_img`. The image publishing frame rate adapts according to the algorithm inference output frame rate. In addition, semantic segmentation results are rendered and saved as images on RDK, which reduces the frame rate.

Original image:
![raw](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/segmentation/image/mobilenet_unet/mobilenet_unet_raw.jpeg)

Rendered image:
![render_web](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/segmentation/image/mobilenet_unet/mobilenet_unet_render_web.jpeg)

### Local Image Playback

The terminal outputs the following information during runtime:

```shell
[example-1] [INFO] [1654769881.171005839] [dnn]: The model input 0 width is 2048 and height is 1024
[example-1] [INFO] [1654769881.171129709] [example]: Set output parser.
[example-1] [INFO] [1654769881.171206707] [UnetPostProcess]: Set out parser
[example-1] [INFO] [1654769881.171272663] [dnn]: Task init.
[example-1] [INFO] [1654769881.173427170] [dnn]: Set task_num [2]
[example-1] [INFO] [1654769881.173587414] [example]: The model input width is 2048 and height is 1024
[example-1] [INFO] [1654769881.173646870] [example]: Dnn node feed with local image: config/raw_unet.jpeg
[example-1] [INFO] [1654769881.750748126] [example]: task_num: 2
[example-1] [INFO] [1654769881.933418736] [example]: Output from image_name: config/raw_unet.jpeg, frame_id: feedback, stamp: 0.0
[example-1] [INFO] [1654769881.933542440] [UnetPostProcess]: outputs size: 1
[example-1] [INFO] [1654769881.995920396] [UnetPostProcess]: Draw result to file: render_unet_feedback_0_0.jpeg
```

The log shows that the algorithm uses the input image `config/raw_unet.jpeg` for inference, and the saved rendered image file is named `render_unet_feedback_0_0.jpeg`. The rendered image effect is shown below:

![render_feedback](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/segmentation/image/mobilenet_unet/mobilenet_unet_render_feedback.jpeg)
