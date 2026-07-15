---
sidebar_position: 1
---
# mobilenet_unet

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Feature Description

The mobilenet_unet segmentation algorithm example uses images as input, performs algorithm inference using the BPU, and publishes messages containing segmentation results.

mobilenet_unet is an Onnx model trained on the [Cityscapes](https://www.cityscapes-dataset.com/) dataset, supporting segmentation of categories such as people, vehicles, roads, and traffic signs.

Code repository: https://github.com/D-Robotics/hobot_dnn

Application scenarios: mobilenet_unet consists of MobileNet and UNet, capable of segmenting image content at the pixel level. It can be used for road recognition, remote sensing map analysis, medical image diagnosis, and more. It is mainly applied in fields such as autonomous driving, geological detection, and medical image analysis.

Background blur case: https://github.com/rusito-23/mobile_unet_segmentation

## Supported Platforms

| Platform    | Operating Method      | Example Features                       |
| ------- | ------------ | ------------------------------ |
| RDK X3, RDK X3 Module| Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | · Start MIPI/USB camera/local image injection, rendered results saved locally |
| RDK X5, RDK X5 Module| Ubuntu 22.04 (Humble) | · Start MIPI/USB camera/local image injection, rendered results saved locally |
| RDK S100, RDK S100P| Ubuntu 22.04 (Humble) | · Start MIPI/USB camera/local image injection, rendered results saved locally |
| RDK S600| Ubuntu 24.04 (Jazzy) | · Start MIPI/USB camera/local image injection, rendered results saved locally |
| X86     | Ubuntu 20.04 (Foxy) | · Use local image injection, rendered results saved locally |

## Algorithm Information

<DocScope products="RDK-X3">

| Model | Platform | Input Size | Inference FPS |
| ---- | ---- | ---- | ---- |
| mobilenet_unet | X3 | 1x3x1024x2048 | 24.34 |

</DocScope>
<DocScope products="RDK-X5">

| Model | Platform | Input Size | Inference FPS |
| ---- | ---- | ---- | ---- |
| mobilenet_unet | X5 | 1x3x224x224 | 50.33 |

</DocScope>
<DocScope products="RDK-S100">

| Model | Platform | Input Size | Inference FPS |
| ---- | ---- | ---- | ---- |
| deeplabv3 | S100 | 1x3x224x224 | 14.70 |

</DocScope>
<DocScope products="RDK-S600">

| Model | Platform | Input Size | Inference FPS |
| ---- | ---- | ---- | ---- |
| deeplabv3 | S600 | 1x3x224x224 | 337.15 |

</DocScope>
## Preparation

### RDK Platform

1. The RDK has been flashed with the Ubuntu system image.

2. TogetheROS.Bot has been successfully installed on the RDK.

3. A MIPI or USB camera has been installed on the RDK. If no camera is available, the algorithm effect can be experienced by injecting local JPEG/PNG format images.

### X86 Platform

1. The Ubuntu 20.04 system image has been configured on the X86 environment.

2. tros.b has been successfully installed on the X86 environment.

## Usage Guide

### RDK Platform

#### Publishing Images Using a Camera

##### Publishing Images Using a MIPI Camera

The mobilenet_unet segmentation example subscribes to images published by the sensor package, performs inference, publishes algorithm messages, and automatically saves rendered images in the runtime directory. The naming convention is render_frameid_timestamp_seconds_timestamp_nanoseconds.jpg.

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
# Configure the tros.b environment
source /opt/tros/setup.bash
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
# Configure the tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
# Configure the tros.b environment
source /opt/tros/jazzy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# Configure the tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
# Configure the tros.b environment
source /opt/tros/jazzy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>


```shell
# Configure the MIPI camera
export CAM_TYPE=mipi

# Launch the launch file
ros2 launch dnn_node_example dnn_node_example.launch.py dnn_example_dump_render_img:=1 dnn_example_config_file:=config/mobilenet_unet_workconfig.json dnn_example_image_width:=1920 dnn_example_image_height:=1080
```

##### Publishing Images Using a USB Camera

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
# Configure the tros.b environment
source /opt/tros/setup.bash
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
# Configure the tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
# Configure the tros.b environment
source /opt/tros/jazzy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# Configure the tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
# Configure the tros.b environment
source /opt/tros/jazzy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

```shell
# Configure the USB camera
export CAM_TYPE=usb

# Launch the launch file
ros2 launch dnn_node_example dnn_node_example.launch.py dnn_example_dump_render_img:=1 dnn_example_config_file:=config/mobilenet_unet_workconfig.json dnn_example_image_width:=1920 dnn_example_image_height:=1080
```

#### Using Local Image Injection

The mobilenet_unet segmentation example uses local JPEG/PNG format images for injection, performs inference, and saves the rendered images with algorithm results in the local runtime directory.

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
# Configure the tros.b environment
source /opt/tros/setup.bash
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
# Configure the tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
# Configure the tros.b environment
source /opt/tros/jazzy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# Configure the tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
# Configure the tros.b environment
source /opt/tros/jazzy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

```shell
# Launch the launch file
ros2 launch dnn_node_example dnn_node_example_feedback.launch.py dnn_example_config_file:=config/mobilenet_unet_workconfig.json dnn_example_image:=config/raw_unet.jpg
```

### X86 Platform

#### Using Local Image Injection

The mobilenet_unet segmentation example uses local JPEG/PNG format images for injection, performs inference, and saves the rendered images with algorithm results in the local runtime directory.

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
# Configure the tros.b environment
source /opt/tros/setup.bash
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
# Configure the tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# Configure the tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

```shell
# Launch the launch file
ros2 launch dnn_node_example dnn_node_example_feedback.launch.py dnn_example_config_file:=config/mobilenet_unet_workconfig.json dnn_example_image:=config/raw_unet.jpg
```

## Result Analysis

### Publishing Images Using a Camera

The following information is output in the running terminal:

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

The output log shows that the topic for publishing algorithm inference results is `hobot_dnn_detection` , and the topic for subscribing to images is `/hbmem_img` . The frame rate of image publishing adapts based on the algorithm inference output frame rate. Additionally, rendering semantic segmentation results and saving images in the runtime directory on the RDK may reduce the frame rate.

Original image:
<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/segmentation/image/mobilenet_unet/mobilenet_unet_raw.jpeg" alt="Original input image used in the MobileNet-UNet semantic segmentation example" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

Rendered image:
<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/segmentation/image/mobilenet_unet/mobilenet_unet_render_web.jpeg" alt="Web UI render of MobileNet-UNet semantic segmentation" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

### Using Local Image Injection

The following information is output in the running terminal:

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

The output log shows that the algorithm uses the input image `config/raw_unet.jpeg` for inference, and the saved rendered image file is named `render_unet_feedback_0_0.jpeg` . The rendered image effect is as follows:

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/segmentation/image/mobilenet_unet/mobilenet_unet_render_feedback.jpeg" alt="Saved segmentation render from MobileNet-UNet local feedback inference" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>