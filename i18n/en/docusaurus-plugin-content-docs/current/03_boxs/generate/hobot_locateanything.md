---
sidebar_position: 4
sidebar_products: RDK-S600
---

# LocateAnything: Open-Semantic Vision Model for All Scenarios

`hobot_locateanything` runs LocateAnything-3B on the RDK S600 and supports open-vocabulary object detection and multiple visual grounding tasks.

## Algorithm Overview

[LocateAnything](https://github.com/NVlabs/Eagle/tree/main/Embodied) is an open-semantic visual grounding model. It performs object detection, referring expression grounding, GUI and text grounding, document layout grounding, and point localization from text instructions. PBD (Parallel Box Decoding) generates bounding-box coordinates in parallel. The supported task categories are listed below.

### Task Categories

| Type | Description | Output |
| --- | --- | --- |
| Open-vocabulary object detection | Detects objects by user-provided category names without a fixed category list | Object categories and bounding boxes |
| Referring expression grounding | Locates objects from natural-language descriptions of appearance, attributes, position, or relationships | Object bounding boxes |
| GUI grounding | Locates buttons, icons, input fields, and other controls from text descriptions | Control points or bounding boxes |
| OCR | Recognizes text content and its position in an image | Recognized text and text bounding boxes |
| Text grounding | Locates user-specified text in an image | Specified text and bounding boxes |
| Document layout grounding | Locates titles, body text, tables, figures, and other document regions | Layout categories and bounding boxes |
| Point localization | Locates objects in general visual scenes from natural-language descriptions | Object point coordinates |

LocateAnything is designed primarily for visual detection and grounding tasks, whose Prompt formats are relatively fixed. We provide built-in task templates based on the Prompt formats used in the training data. Users only need to enter the query target through the corresponding command. `<query>` denotes a query target; separate multiple queries with commas. `<type>` denotes a document layout element type.

| Command | Example | Description |
| --- | --- | --- |
| `/detect <query>[,<query>...]` | `/detect person,bus,bicycle` | Detects all instances of the person, bus, and bicycle categories |
| `/ground <query>[,<query>...]` | `/ground person wearing a graduation cap,woman in a black dress,clock tower` | Locates all objects matching the three natural-language descriptions |
| `/ground_single <query>[,<query>...]` | `/ground_single person wearing a graduation cap` | Locates one object matching the natural-language description |
| `/gui <query>[,<query>...]` | `/gui Go to file/function` | Locates the specified GUI control and returns an interaction point |
| `/gui_box <query>[,<query>...]` | `/gui_box Go to file/function,Environment tab,Files tab` | Locates the three GUI controls and returns their bounding boxes |
| `/text` | `/text` | Recognizes all text in the image and its position |
| `/ground_text <query>[,<query>...]` | `/ground_text LIVE love LAUGH,laugh giggle be silly,Yes Virginia` | Locates the three specified text strings |
| `/layout <type>[,<type>...]` | `/layout plot,text` | Locates plot and text regions in a document |
| `/point <query>[,<query>...]` | `/point succulent,the succulent in the center` | Returns point coordinates for the two queries |

Code repository: [D-Robotics/hobot_locateanything](https://github.com/D-Robotics/hobot_locateanything)

Model repository: [D-Robotics/LocateAnything-3B-BPU](https://huggingface.co/D-Robotics/LocateAnything-3B-BPU)

### Inference Performance

| Platform | Task | Output Tokens | Vision (ms) | Prefill (ms) | Decode (ms) | Total (ms) | Decode (Tokens/s) |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| RDK S600 | Object detection | 47 | 254.7 | 151.6 | 526.3 | 978.5 | 89.3 |
| RDK S600 | GUI grounding | 14 | 253.2 | 149.7 | 266.0 | 720.7 | 52.6 |
| RDK S600 | Referring expression grounding | 14 | 246.0 | 152.3 | 164.5 | 603.6 | 85.1 |
| RDK S600 | OCR | 66 | 245.5 | 152.4 | 665.3 | 1148.3 | 99.2 |
| RDK S600 | Text grounding | 15 | 253.0 | 150.2 | 166.6 | 653.5 | 90.0 |
| RDK S600 | Layout grounding | 43 | 245.4 | 151.8 | 448.1 | 904.7 | 96.0 |
| RDK S600 | Point localization | 37 | 246.0 | 152.2 | 480.5 | 923.5 | 77.0 |

## Preparation

The RDK S600 requires Ubuntu 24.04 and TogetheROS.Bot Jazzy.

### Install the Package

```bash
source /opt/tros/jazzy/setup.bash
sudo apt update
sudo apt install tros-jazzy-hobot-locateanything
```

### Download the Model

```bash
sudo wget -c -P /opt/tros/jazzy/lib/hobot_locateanything/models \
  https://hf-mirror.com/D-Robotics/LocateAnything-3B-BPU/resolve/main/LocateAnything-3B_vision.hbm
sudo wget -c -P /opt/tros/jazzy/lib/hobot_locateanything/models \
  https://hf-mirror.com/D-Robotics/LocateAnything-3B-BPU/resolve/main/LocateAnything-3B_language.hbm
sudo wget -c -P /opt/tros/jazzy/lib/hobot_locateanything/models \
  https://hf-mirror.com/D-Robotics/LocateAnything-3B-BPU/resolve/main/LocateAnything-3B_embed_tokens.bin
```

### Prepare the Runtime Directory

```bash
cp -r /opt/tros/jazzy/lib/hobot_locateanything/config .
cp -r /opt/tros/jazzy/lib/hobot_locateanything/image .
```

## Basic Feature: Object Detection

### Console Inference

```bash
source /opt/tros/jazzy/setup.bash
ros2 run hobot_locateanything console --config config/config.yaml
```

Enter an image and a detection command:

```text
/image image/07_detection_multiclass.jpg
```

```text
/detect person,bus,bicycle
```

Console output:

```text
[UCP]: UCP version = 3.12.3
[DNN]: 3.12.3_(4.5.4 HBRT)
Loading Vision HBM...
Loading Language HBM...
HBM loaded  [============================] 16.7 s
Ready  S600/Nash-P  |  hybrid  |  max tokens 4096
Tasks
  /detect cat,dog               Object detection
  /ground <query>[,<query>...]  Referring expression grounding (multi-query)
  /ground_single <query>[,...]  Referring expression grounding (single target)
  /gui <query>[,<query>...]     GUI point grounding
  /gui_box <query>[,<query>...] GUI box grounding
  /text                         Text OCR
  /ground_text <query>[,...]    Text grounding
  /layout title,table,figure    Document layout analysis
  /point <query>[,<query>...]   Point grounding
Session
  /image <image_path>           Load an image
  /video <video_path>           Process all video frames
  regen                         Re-run the previous request
  reset                         Clear the current media
  exit                          Exit the application
[User] <<< /image image/07_detection_multiclass.jpg
Image loaded  image/07_detection_multiclass.jpg
[User] <<< /detect person,bus,bicycle
[Assistant] >>> /detect person,bus,bicycle
Performance
  Vision   254.7 ms
  Prefill  151.6 ms  620 tokens
  Decode   526.3 ms  47 tokens  89.3 tokens/s
  Host     41.4 ms
  Total    978.5 ms
Result
  Labels bicycle, bus, person  |  Boxes 6  |  Points 0  |  Stop im_end
Saved
  Image  /root/outputs/07_detection_multiclass/annotated.jpg
  JSON   /root/outputs/07_detection_multiclass/prediction.json
```

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/hobot_locateanything/open-vocabulary-object-detection-result.jpg" alt="Open-vocabulary object detection" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

### ROS 2 Inference

Results are published on `/perception/locateanything`. Prompts are updated through `/locateanything/prompt`.

#### Local Image Replay

The default launch replays `image/07_detection_multiclass.jpg` at 2 FPS. Change `publish_image_source` to use another image.

##### Commands

Terminal 1, start image replay and the inference node:

```bash
source /opt/tros/jazzy/setup.bash

export CAM_TYPE=fb
ros2 launch hobot_locateanything hobot_locateanything.launch.py \
  publish_image_source:=image/07_detection_multiclass.jpg
```

Terminal 2, subscribe to detection results:

```bash
source /opt/tros/jazzy/setup.bash
ros2 topic echo /perception/locateanything ai_msgs/msg/PerceptionTargets
```

Terminal 3, publish a detection Prompt:

```bash
source /opt/tros/jazzy/setup.bash
ros2 topic pub --once /locateanything/prompt std_msgs/msg/String \
  "{data: '/detect person,bus,bicycle'}"
```

##### Outputs

Terminal 1, image publisher and inference node output:

```text
[UCP]: UCP version = 3.12.3
[DNN]: 3.12.3_(4.5.4 HBRT)
[INFO] [hobot_locateanything]: loading Vision HBM
[INFO] [hobot_locateanything]: loading Language HBM
[INFO] [hobot_locateanything]: inference core ready in 16.5 s
[INFO] [hobot_locateanything]: ready: input=/hbmem_img transport=hbmem prompt_topic=/locateanything/prompt result=/perception/locateanything
[WARN] [hobot_locateanything]: waiting for prompt on /locateanything/prompt; image frames are ignored until a valid prompt arrives
[INFO] [hobot_image_pub-1]: process started
[image_pub_node]: parameter:
 image_source: image/07_detection_multiclass.jpg
 fps: 2
 is_shared_mem: 1
 is_loop: 1
 image_format: jpg
 pub_encoding: nv12
 msg_pub_topic_name: /hbmem_img
[hobot_image_pub]: Enabling zero-copy
[INFO] [hobot_locateanything]: prompt updated: /detect person,bus,bicycle
[INFO] [hobot_locateanything]: frame_id=38 prompt="/detect person,bus,bicycle" output="<ref>person</ref><box><220><392><312><690></box><box><666><424><758><701></box><ref>bus</ref><box><124><265><595><653></box><ref>bicycle</ref><box><514><465><646><618></box><box><735><575><878><782></box><|im_end|>" labels="person | person | bus | bicycle | bicycle" boxes=5 points=0 fps=1 stop_reason=im_end prompt_tokens=620 generated_tokens=41 pbd_calls=9 pbd_accepted_tokens=41 mode=hybrid preprocess_ms=43.935 vision_ms=250.393 language_ms=557.831 postprocess_ms=0.023 total_ms=852.182
```

Terminal 2, detection result output:

```yaml
header:
  frame_id: '38'
fps: 1
perfs:
  - type: preprocess
    time_ms_duration: 43.935122
  - type: vision
    time_ms_duration: 250.392581
  - type: language
    time_ms_duration: 557.831141
  - type: postprocess
    time_ms_duration: 0.022575
targets:
  - type: person
    rois:
      - type: person
        rect: {x_offset: 422, y_offset: 333, height: 572, width: 177}
        confidence: -1.0
  - type: person
    rois:
      - type: person
        rect: {x_offset: 1279, y_offset: 394, height: 532, width: 176}
        confidence: -1.0
  - type: bus
    rois:
      - type: bus
        rect: {x_offset: 238, y_offset: 89, height: 745, width: 904}
        confidence: -1.0
  - type: bicycle
    rois:
      - type: bicycle
        rect: {x_offset: 987, y_offset: 473, height: 294, width: 253}
        confidence: -1.0
  - type: bicycle
    rois:
      - type: bicycle
        rect: {x_offset: 1411, y_offset: 684, height: 396, width: 275}
        confidence: -1.0
```

The image publisher supplies input at 2 FPS. The result topic's `fps: 1` is the measured inference result rate for this run.

Terminal 3, Prompt publisher output:

```text
publisher: beginning loop
publishing #1: std_msgs.msg.String(data='/detect person,bus,bicycle')
```

#### USB Camera

##### Commands

Terminal 1, start the USB camera and inference node:

```bash
source /opt/tros/jazzy/setup.bash

export CAM_TYPE=usb
ros2 launch hobot_locateanything hobot_locateanything.launch.py \
  device:=/dev/video0 \
  locateanything_image_width:=1280 \
  locateanything_image_height:=720
```

Terminal 2, subscribe to detection results:

```bash
source /opt/tros/jazzy/setup.bash
ros2 topic echo /perception/locateanything ai_msgs/msg/PerceptionTargets
```

Terminal 3, publish a detection Prompt:

```bash
source /opt/tros/jazzy/setup.bash
ros2 topic pub --once /locateanything/prompt std_msgs/msg/String \
  "{data: '/detect cardboard box,person'}"
```

##### Outputs

Terminal 1, USB camera and inference node output:

```text
[UCP]: UCP version = 3.12.3
[DNN]: 3.12.3_(4.5.4 HBRT)
[INFO] [hobot_locateanything]: loading Vision HBM
[INFO] [hobot_locateanything]: loading Language HBM
[INFO] [hobot_locateanything]: inference core ready in 16.5 s
[INFO] [hobot_locateanything]: ready: input=/hbmem_img transport=hbmem prompt_topic=/locateanything/prompt result=/perception/locateanything
[WARN] [hobot_locateanything]: waiting for prompt on /locateanything/prompt; image frames are ignored until a valid prompt arrives
[INFO] [hobot_usb_cam-1]: process started
[hobot_usb_cam]: framerate: 30
[hobot_usb_cam]: pixel_format_name: mjpeg
[INFO] [hobot_locateanything]: prompt updated: /detect cardboard box,person
[INFO] [hobot_locateanything]: frame_id=532 prompt="/detect cardboard box,person" output="<ref>cardboard box</ref><box><461><615><516><656></box><ref>person</ref><box><381><638><420><780></box><|im_end|>" labels="cardboard box | person" boxes=2 points=0 fps=1 stop_reason=im_end prompt_tokens=618 generated_tokens=21 pbd_calls=5 pbd_accepted_tokens=16 mode=hybrid preprocess_ms=26.183 vision_ms=261.752 language_ms=552.914 postprocess_ms=0.017 total_ms=840.866
```

Terminal 2, detection result output:

```yaml
header:
  frame_id: '532'
fps: 1
perfs:
  - type: preprocess
    time_ms_duration: 26.182972
  - type: vision
    time_ms_duration: 261.751575
  - type: language
    time_ms_duration: 552.913972
  - type: postprocess
    time_ms_duration: 0.017050
targets:
  - type: cardboard box
    rois:
      - type: cardboard box
        rect: {x_offset: 590, y_offset: 507, height: 53, width: 70}
        confidence: -1.0
  - type: person
    rois:
      - type: person
        rect: {x_offset: 488, y_offset: 537, height: 181, width: 50}
        confidence: -1.0
```

Terminal 3, Prompt publisher output:

```text
Waiting for at least 1 matching subscription(s)...
publisher: beginning loop
publishing #1: std_msgs.msg.String(data='/detect cardboard box,person')
```

## Advanced Features

Advanced features are run through the Console.

```bash
source /opt/tros/jazzy/setup.bash
ros2 run hobot_locateanything console --config config/config.yaml
```

Console output:

```text
[UCP]: UCP version = 3.12.3
[DNN]: 3.12.3_(4.5.4 HBRT)
Loading Vision HBM...
Loading Language HBM...
HBM loaded  [============================] 16.7 s
Ready  S600/Nash-P  |  hybrid  |  max tokens 4096
Tasks
  /detect cat,dog               Object detection
  /ground <query>[,<query>...]  Referring expression grounding (multi-query)
  /ground_single <query>[,...]  Referring expression grounding (single target)
  /gui <query>[,<query>...]     GUI point grounding
  /gui_box <query>[,<query>...] GUI box grounding
  /text                         Text OCR
  /ground_text <query>[,...]    Text grounding
  /layout title,table,figure    Document layout analysis
  /point <query>[,<query>...]   Point grounding
Session
  /image <image_path>           Load an image
  /video <video_path>           Process all video frames
  regen                         Re-run the previous request
  reset                         Clear the current media
  exit                          Exit the application
```

Separate multiple queries with commas. The Console and ROS Prompt interfaces share the same multi-query path: Vision runs once per image or video frame, then the Language queries run and their results are merged.

### GUI Grounding

Enter an image and a grounding command:

```text
/image image/02_gui_rstudio.jpg
```

```text
/gui_box Go to file/function,Environment tab,Files tab
```

Console output:

```text
[User] <<< /image image/02_gui_rstudio.jpg
Image loaded  image/02_gui_rstudio.jpg
[User] <<< /gui_box Go to file/function,Environment tab,Files tab
[Assistant] >>> /gui_box Go to file/function,Environment tab,Files tab
Performance
  Vision   252.9 ms
  Prefill  463.7 ms  1848 tokens
  Decode   519.8 ms  36 tokens  69.3 tokens/s
  Host     29.4 ms
  Total    1342.8 ms
Result
  Labels Environment tab, Files tab, Go to file/function  |  Boxes 3  |  Points 0  |  Stop im_end
Saved
  Image  /root/outputs/02_gui_rstudio/annotated.jpg
  JSON   /root/outputs/02_gui_rstudio/prediction.json
```

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/hobot_locateanything/gui-element-grounding-result.jpg" alt="GUI grounding" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

### Referring Expression Grounding

Enter an image and a grounding command:

```text
/image image/03_referring_graduation.jpg
```

```text
/ground person wearing a graduation cap,woman in a black dress,clock tower
```

Console output:

```text
[User] <<< /image image/03_referring_graduation.jpg
Image loaded  image/03_referring_graduation.jpg
[User] <<< /ground person wearing a graduation cap,woman in a black dress,clock tower
[Assistant] >>> /ground person wearing a graduation cap,woman in a black dress,clock tower
Performance
  Vision   250.4 ms
  Prefill  462.5 ms  1854 tokens
  Decode   461.2 ms  39 tokens  84.6 tokens/s
  Host     29.9 ms
  Total    1268.8 ms
Result
  Labels clock tower, person wearing a graduation cap, woman in a black dress  |  Boxes 3  |  Points 0  |  Stop im_end
Saved
  Image  /root/outputs/03_referring_graduation/annotated.jpg
  JSON   /root/outputs/03_referring_graduation/prediction.json
```

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/hobot_locateanything/referring-expression-grounding-result.jpg" alt="Referring expression grounding" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

### OCR

Enter an image and the OCR command:

```text
/image image/04_ocr_scrapbook.jpg
```

```text
/text
```

Console output:

```text
[User] <<< /image image/04_ocr_scrapbook.jpg
Image loaded  image/04_ocr_scrapbook.jpg
[User] <<< /text
[Assistant] >>> /text
Performance
  Vision   246.2 ms
  Prefill  155.7 ms  610 tokens
  Decode   666.4 ms  66 tokens  99.0 tokens/s
  Host     63.0 ms
  Total    1153.9 ms
Result
  Labels LIVE love LAUGH, Yes, Virginiaina, [to-day]], laugh giggle be silly
  Boxes 5  |  Points 0  |  Stop im_end
Saved
  Image  /root/outputs/04_ocr_scrapbook/annotated.jpg
  JSON   /root/outputs/04_ocr_scrapbook/prediction.json
```

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/hobot_locateanything/optical-character-recognition-result.jpg" alt="OCR" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

### Text Grounding

Enter an image and a grounding command:

```text
/image image/04_ocr_scrapbook.jpg
```

```text
/ground_text LIVE love LAUGH,laugh giggle be silly,Yes Virginia
```

Console output:

```text
[User] <<< /image image/04_ocr_scrapbook.jpg
Image loaded  image/04_ocr_scrapbook.jpg
[User] <<< /ground_text LIVE love LAUGH,laugh giggle be silly,Yes Virginia
[Assistant] >>> /ground_text LIVE love LAUGH,laugh giggle be silly,Yes Virginia
Performance
  Vision   246.0 ms
  Prefill  471.6 ms  1838 tokens
  Decode   459.4 ms  43 tokens  93.6 tokens/s
  Host     30.4 ms
  Total    1311.1 ms
Result
  Labels LIVE love LAUGH., Yes Virginia., laugh giggle be silly.  |  Boxes 3  |  Points 0  |  Stop im_end
Saved
  Image  /root/outputs/04_ocr_scrapbook/annotated.jpg
  JSON   /root/outputs/04_ocr_scrapbook/prediction.json
```

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/hobot_locateanything/text-grounding-result.jpg" alt="Text grounding" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

### Layout Grounding

Enter an image and a layout command:

```text
/image image/05_layout_plot.jpg
```

```text
/layout plot,text
```

Console output:

```text
[User] <<< /image image/05_layout_plot.jpg
Image loaded  image/05_layout_plot.jpg
[User] <<< /layout plot,text
[Assistant] >>> /layout plot,text
Performance
  Vision   245.6 ms
  Prefill  155.0 ms  620 tokens
  Decode   448.1 ms  43 tokens  96.0 tokens/s
  Host     37.2 ms
  Total    908.8 ms
Result
  Labels plot, text  |  Boxes 6  |  Points 0  |  Stop im_end
Saved
  Image  /root/outputs/05_layout_plot/annotated.jpg
  JSON   /root/outputs/05_layout_plot/prediction.json
```

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/hobot_locateanything/document-layout-grounding-result.jpg" alt="Document layout grounding" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

### Point Localization

Enter an image and a point-localization command:

```text
/image image/06_pointing_succulent.jpg
```

```text
/point succulent,the succulent in the center
```

Console output:

```text
[User] <<< /image image/06_pointing_succulent.jpg
Image loaded  image/06_pointing_succulent.jpg
[User] <<< /point succulent,the succulent in the center
[Assistant] >>> /point succulent,the succulent in the center
Performance
  Vision   245.9 ms
  Prefill  310.5 ms  1220 tokens
  Decode   645.4 ms  50 tokens  77.5 tokens/s
  Host     47.4 ms
  Total    1272.7 ms
Result
  Labels succulent, the succulent in the center  |  Boxes 0  |  Points 9  |  Stop im_end
Saved
  Image  /root/outputs/06_pointing_succulent/annotated.jpg
  JSON   /root/outputs/06_pointing_succulent/prediction.json
```

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/hobot_locateanything/point-localization-result.jpg" alt="Point localization" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />
