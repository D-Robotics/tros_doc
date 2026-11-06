---
sidebar_position: 3
sidebar_products: RDK-X5,RDK-S100
---
# OCR Text Recognition

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Function Introduction

The OCR text recognition algorithm example consists of two packages: [mono_ocr_detection](https://github.com/D-Robotics/mono_ocr_detection) (text detection) and [mono_ocr_recognition](https://github.com/D-Robotics/mono_ocr_recognition) (text recognition). It is based on the dnn_node inference framework and is a quantized deployment of the [PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) ppocrv6 models.

The text detection package takes images as input, performs algorithm inference using the BPU, and publishes algorithm messages containing text box coordinates. The text recognition package subscribes to the detection results, crops text regions from the NV12 raw images, feeds them into the recognition model, and publishes algorithm messages containing the recognized text content. Together with the websocket package, the two packages render the image and the OCR results in real time on a PC browser.

The models are the official PaddleOCR ppocrv6 Chinese-English models, supporting detection and recognition of Chinese and English text, digits, and common symbols.

Application scenarios: OCR text recognition locates and reads text content from images. It can be used for tasks such as meter reading, signboard text recognition, and logistics number entry, primarily in fields like intelligent inspection, smart retail, and industrial inspection.

## Supported Platforms

| Platform | Operating Mode | Example Features |
| -------- | -------------- | ---------------- |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | Start MIPI/USB camera/local image injection and display inference rendering results on the Web |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) | Start MIPI/USB camera/local image injection and display inference rendering results on the Web |

## Algorithm Information

<DocScope products="RDK-X5">

| Model | Platform | Input Size | Inference Frame Rate (fps) |
| ---- | ---- | ---- | ---- |
| ppocrv6_medium_det_int8_640_m | X5 | 640×640 | 32.53 |

</DocScope>
<DocScope products="RDK-S100">

| Model | Platform | Input Size | Inference Frame Rate (fps) |
| ---- | ---- | ---- | ---- |
| ppocrv6_medium_det_int8_640_m | S100 | 640×640 | 186.25 |

</DocScope>

## Preparation

### RDK Platform

1. The RDK has been flashed with the RDK OS system.

2. The RDK has successfully installed TogetheROS.Bot.

3. The RDK has the mono_ocr_detection and mono_ocr_recognition packages installed (shipped with TROS, located under `/opt/tros/${TROS_DISTRO}/lib/`).

4. The RDK has a MIPI or USB camera installed. Without a camera, you can experience the algorithm by injecting local JPEG/PNG images.

5. Ensure that the PC can access the RDK over the network.

## Usage Guide

OCR text recognition consists of a two-stage pipeline: the image source (camera/injection) publishes NV12 shared-memory images on the `/hbmem_img` topic, mono_ocr_detection subscribes to the images and publishes text detection results on the `/hobot_ocr_detection` topic, mono_ocr_recognition subscribes to the detection results together with the raw images and publishes text recognition results on the `/hobot_ocr_recognition` topic, and the websocket package renders the image and recognition results in the PC browser.

The `mono_ocr_recognition` launch starts both the detection and recognition nodes at once, running the complete OCR pipeline with a single command.

### RDK Platform

**Using a MIPI Camera to Publish Images**

<DocScope products="RDK-X5,RDK-S100">
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
# Copy the configuration files needed for running the example from the tros.b installation path.
cp -r /opt/tros/${TROS_DISTRO}/lib/mono_ocr_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/mono_ocr_recognition/config/ .

# Configure the MIPI camera
export CAM_TYPE=mipi

# Launch the launch file
ros2 launch mono_ocr_recognition mono_ocr_recognition.launch.py
```

**Using a USB Camera to Publish Images**

<DocScope products="RDK-X5,RDK-S100">
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
# Copy the configuration files needed for running the example from the tros.b installation path.
cp -r /opt/tros/${TROS_DISTRO}/lib/mono_ocr_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/mono_ocr_recognition/config/ .

# Configure the USB camera
export CAM_TYPE=usb

# Launch the launch file
ros2 launch mono_ocr_recognition mono_ocr_recognition.launch.py
```

**Using Local Image Injection**

<DocScope products="RDK-X5,RDK-S100">
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
# Copy the configuration files needed for running the example from the tros.b installation path.
cp -r /opt/tros/${TROS_DISTRO}/lib/mono_ocr_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/mono_ocr_recognition/config/ .

# Configure local image injection; injects config/component.jpg by default
export CAM_TYPE=fb

# Launch the launch file; configure the input resolution to 1920x1080 for image inference
ros2 launch mono_ocr_recognition mono_ocr_recognition.launch.py mono_ocr_detection_image_width:=1920 mono_ocr_detection_image_height:=1080
```

**Configurable Parameters**

- `mono_ocr_detection_config_file`: detection model configuration file path, default `config/mono_ocr_detection_workconfig.json`.
- `mono_ocr_detection_image_width` / `mono_ocr_detection_image_height`: input image resolution, default 960×544.
- `device`: camera device, `/dev/video0` by default for USB cameras and `F37` by default for MIPI cameras.
- `dump_render_img`: whether to save rendered result images, default `0`; when set to `1`, rendered images are saved in the running directory.

<DocScope products="RDK-S100">

**Optional: 4K Resolution Pipeline**

The `_4k.launch.py` is provided as an option and is not part of the main run methods above. The 4K pipeline feeds the full 3840×2160 image directly into the detection model (`ppocrv6_medium_det_int8_4k_m`, detection uses `config/mono_ocr_detection_4k_workconfig.json`), which suits scenarios with small, distant text.

<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# Configure the tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

</Tabs>

```shell
# Same steps as the main pipeline (copy configs, set CAM_TYPE); only the launch file changes
export CAM_TYPE=fb

# Start the 4K detection + recognition pipeline
ros2 launch mono_ocr_recognition mono_ocr_recognition_4k.launch.py
```

The 4K pipeline transfers images through the 2160P shared-memory message (HbmMsg2160P) and depends on a newer `hbm_img_msgs` and `hobot_image_publisher`; upgrade older TROS images before using it.

</DocScope>

## Result Analysis

Taking local image injection on the RDK S100 as an example, the running terminal outputs the following information:

```text
[mono_ocr_detection-3] [WARN] [1793870935.340955332] [mono_ocr_detection]: Sub img fps: 5.00, Smart fps: 5.00, recved img time delay ms: 9, pre process time ms: 0, infer time ms: 5, post process time ms: 1, pipeline time ms: 9
[mono_ocr_recognition-4] [WARN] [1793870935.495176460] [mono_ocr_recognition]: Rec rois: 12, Sub fps: 5.00, Smart fps: 5.01, det msg delay ms: 164, infer time ms: 136, post process time ms: 14
[mono_ocr_detection-3] [WARN] [1793870934.141184705] [mono_ocr_detection]: Sub img fps: 5.84, Smart fps: 5.85, recved img time delay ms: 10, pre process time ms: 0, infer time ms: 5, post process time ms: 1, pipeline time ms: 10
[mono_ocr_recognition-4] [WARN] [1793870934.296509605] [mono_ocr_recognition]: Rec rois: 12, Sub fps: 5.86, Smart fps: 5.88, det msg delay ms: 165, infer time ms: 138, post process time ms: 13
```

The output log shows that the topics publishing the algorithm inference results are `/hobot_ocr_detection` (detection) and `/hobot_ocr_recognition` (recognition), and the topic subscribing to images is `/hbmem_img`. The detection node takes 5 ms per inference; the recognition node processes 12 text regions per pass (Rec rois: 12) with an inference time of about 136 ms. The image subscription frame rate matches the algorithm output frame rate (with a 5 fps injection source, Smart fps is about 5).

Enter `http://IP:8000` in the PC browser to view the image and algorithm rendering results (IP is the RDK's IP address).

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/ocr_render.png" alt="OCR text recognition rendering result on the Web" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

## Notes

1. The `mono_ocr_recognition` launch does not copy configuration files automatically. Before the first launch, manually copy the config directories of both `mono_ocr_detection` and `mono_ocr_recognition` into the running directory (see the commands above).
2. The recognition node outputs results only when the detection result topic `/hobot_ocr_detection` has input. The full-pipeline launch starts both nodes at once; when running the recognition node alone, provide the detection results yourself.
3. During the first seconds after starting injection or a camera, codec and websocket may print several "no image/AI data received" warnings. This is a normal startup timing behavior and recovers automatically once the pipeline is established.
