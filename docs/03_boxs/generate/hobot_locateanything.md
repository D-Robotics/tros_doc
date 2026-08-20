# LocateAnything：全场景开放语义视觉模型

`hobot_locateanything` 在 RDK S600 上运行 LocateAnything-3B，支持开放词汇目标检测及多类视觉定位任务。

## 算法简介

[LocateAnything](https://github.com/NVlabs/Eagle/tree/main/Embodied) 是开放语义视觉定位模型，通过文本指令完成目标检测、指代定位、GUI 与文本定位、文档版面定位和点定位。PBD（Parallel Box Decoding）以并行方式生成边界框坐标，其场景任务类型如下。

### 任务类型

| 类型 | 任务说明 | 输出 |
| --- | --- | --- |
| 开放词汇目标检测 | 根据用户给出的类别名称检测目标，不受预设类别表限制 | 目标类别及边界框 |
| 指代定位 | 根据目标的外观、属性、位置或关系等自然语言描述定位目标 | 目标边界框 |
| GUI 定位 | 根据文字描述定位软件界面中的按钮、图标、输入框等控件 | 控件点坐标或边界框 |
| OCR | 识别图像中的文字内容及其所在位置 | 识别文字及文字边界框 |
| 文本定位 | 根据用户给出的文字内容定位其在图像中的位置 | 指定文字及边界框 |
| 文档版面定位 | 定位文档中的标题、正文、表格、图片等结构区域 | 版面元素类别及边界框 |
| 点定位 | 根据自然语言描述定位普通视觉场景中的目标位置 | 目标点坐标 |

LocateAnything 主要面向视觉检测与定位任务，Prompt 格式相对固定。我们按照训练数据采用的提示词格式内置了各类任务模板，使用时只需通过对应命令输入查询目标（Query）。`<query>` 表示查询目标，多个 Query 使用英文逗号分隔；`<type>` 表示版面元素类型。

| 命令 | 使用示例 | 说明 |
| --- | --- | --- |
| `/detect <query>[,<query>...]` | `/detect person,bus,bicycle` | 检测 person、bus 和 bicycle 类别的全部目标 |
| `/ground <query>[,<query>...]` | `/ground person wearing a graduation cap,woman in a black dress,clock tower` | 分别定位符合三个自然语言描述的全部目标 |
| `/ground_single <query>[,<query>...]` | `/ground_single person wearing a graduation cap` | 定位一个符合自然语言描述的目标 |
| `/gui <query>[,<query>...]` | `/gui Go to file/function` | 定位指定界面控件并返回操作点 |
| `/gui_box <query>[,<query>...]` | `/gui_box Go to file/function,Environment tab,Files tab` | 分别定位三个界面控件并返回边界框 |
| `/text` | `/text` | 识别图像中的全部文字及其位置 |
| `/ground_text <query>[,<query>...]` | `/ground_text LIVE love LAUGH,laugh giggle be silly,Yes Virginia` | 分别定位三段指定文字 |
| `/layout <type>[,<type>...]` | `/layout plot,text` | 定位文档中的图表和文本区域 |
| `/point <query>[,<query>...]` | `/point succulent,the succulent in the center` | 分别返回两处目标的点坐标 |

代码仓库：[D-Robotics/hobot_locateanything](https://github.com/D-Robotics/hobot_locateanything)

模型仓库：[D-Robotics/LocateAnything-3B-BPU](https://huggingface.co/D-Robotics/LocateAnything-3B-BPU)

### 推理性能

| Platform | 任务 | 输出 Token | Vision (ms) | Prefill (ms) | Decode (ms) | 总耗时 (ms) | Decode (Token/s) |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| RDK S600 | 目标检测 | 47 | 254.7 | 151.6 | 526.3 | 978.5 | 89.3 |
| RDK S600 | GUI 定位 | 14 | 253.2 | 149.7 | 266.0 | 720.7 | 52.6 |
| RDK S600 | 指代定位 | 14 | 246.0 | 152.3 | 164.5 | 603.6 | 85.1 |
| RDK S600 | OCR | 66 | 245.5 | 152.4 | 665.3 | 1148.3 | 99.2 |
| RDK S600 | 指定文本定位 | 15 | 253.0 | 150.2 | 166.6 | 653.5 | 90.0 |
| RDK S600 | 版面定位 | 43 | 245.4 | 151.8 | 448.1 | 904.7 | 96.0 |
| RDK S600 | 点定位 | 37 | 246.0 | 152.2 | 480.5 | 923.5 | 77.0 |

## 准备工作

RDK S600 需安装 Ubuntu 24.04 和 TogetheROS.Bot Jazzy。

### 安装功能包

```bash
source /opt/tros/jazzy/setup.bash
sudo apt update
sudo apt install tros-jazzy-hobot-locateanything
```

### 下载模型

```bash
sudo wget -c -P /opt/tros/jazzy/lib/hobot_locateanything/models \
  https://hf-mirror.com/D-Robotics/LocateAnything-3B-BPU/resolve/main/LocateAnything-3B_vision.hbm
sudo wget -c -P /opt/tros/jazzy/lib/hobot_locateanything/models \
  https://hf-mirror.com/D-Robotics/LocateAnything-3B-BPU/resolve/main/LocateAnything-3B_language.hbm
sudo wget -c -P /opt/tros/jazzy/lib/hobot_locateanything/models \
  https://hf-mirror.com/D-Robotics/LocateAnything-3B-BPU/resolve/main/LocateAnything-3B_embed_tokens.bin
```

### 准备运行目录

```bash
cp -r /opt/tros/jazzy/lib/hobot_locateanything/config .
cp -r /opt/tros/jazzy/lib/hobot_locateanything/image .
```

## 基础功能：目标检测

### Console 推理

```bash
source /opt/tros/jazzy/setup.bash
ros2 run hobot_locateanything console --config config/config.yaml
```

输入图片和检测指令：

```text
/image image/07_detection_multiclass.jpg
```

```text
/detect person,bus,bicycle
```

终端输出：

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

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/hobot_locateanything/open-vocabulary-object-detection-result.jpg" alt="开放词汇目标检测" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

### ROS 2 推理

结果通过 `/perception/locateanything` 发布，Prompt 通过 `/locateanything/prompt` 更新。

#### 本地图片回灌

默认以 2 FPS 回灌 `image/07_detection_multiclass.jpg`。使用其他图片时修改 `publish_image_source`。

##### 启动命令

终端 1，启动图片回灌和推理节点：

```bash
source /opt/tros/jazzy/setup.bash

export CAM_TYPE=fb
ros2 launch hobot_locateanything hobot_locateanything.launch.py \
  publish_image_source:=image/07_detection_multiclass.jpg
```

终端 2，订阅检测结果：

```bash
source /opt/tros/jazzy/setup.bash
ros2 topic echo /perception/locateanything ai_msgs/msg/PerceptionTargets
```

终端 3，发布检测 Prompt：

```bash
source /opt/tros/jazzy/setup.bash
ros2 topic pub --once /locateanything/prompt std_msgs/msg/String \
  "{data: '/detect person,bus,bicycle'}"
```

##### 运行结果

终端 1，图片发布和推理节点输出：

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

终端 2，检测结果输出：

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

图片发布节点以 2 FPS 输入，结果话题中的 `fps: 1` 是本次实际推理结果帧率。

终端 3，Prompt 发布输出：

```text
publisher: beginning loop
publishing #1: std_msgs.msg.String(data='/detect person,bus,bicycle')
```

#### USB 摄像头

##### 启动命令

终端 1，启动 USB 摄像头和推理节点：

```bash
source /opt/tros/jazzy/setup.bash

export CAM_TYPE=usb
ros2 launch hobot_locateanything hobot_locateanything.launch.py \
  device:=/dev/video0 \
  locateanything_image_width:=1280 \
  locateanything_image_height:=720
```

终端 2，订阅检测结果：

```bash
source /opt/tros/jazzy/setup.bash
ros2 topic echo /perception/locateanything ai_msgs/msg/PerceptionTargets
```

终端 3，发布检测 Prompt：

```bash
source /opt/tros/jazzy/setup.bash
ros2 topic pub --once /locateanything/prompt std_msgs/msg/String \
  "{data: '/detect cardboard box,person'}"
```

##### 运行结果

终端 1，USB 摄像头和推理节点输出：

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

终端 2，检测结果输出：

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

终端 3，Prompt 发布输出：

```text
Waiting for at least 1 matching subscription(s)...
publisher: beginning loop
publishing #1: std_msgs.msg.String(data='/detect cardboard box,person')
```

## 进阶功能

进阶功能通过 Console 运行推理。

```bash
source /opt/tros/jazzy/setup.bash
ros2 run hobot_locateanything console --config config/config.yaml
```

终端输出：

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

多个查询使用逗号分隔。Console 与 ROS Prompt 共用多查询路径：同一图像或视频帧只执行一次 Vision，各项 Language 推理完成后合并结果。

### GUI 定位

输入图片和定位指令：

```text
/image image/02_gui_rstudio.jpg
```

```text
/gui_box Go to file/function,Environment tab,Files tab
```

终端输出：

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

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/hobot_locateanything/gui-element-grounding-result.jpg" alt="GUI 定位" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

### 指代定位

输入图片和定位指令：

```text
/image image/03_referring_graduation.jpg
```

```text
/ground person wearing a graduation cap,woman in a black dress,clock tower
```

终端输出：

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

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/hobot_locateanything/referring-expression-grounding-result.jpg" alt="指代定位" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

### OCR

输入图片和 OCR 指令：

```text
/image image/04_ocr_scrapbook.jpg
```

```text
/text
```

终端输出：

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

### 指定文本定位

输入图片和定位指令：

```text
/image image/04_ocr_scrapbook.jpg
```

```text
/ground_text LIVE love LAUGH,laugh giggle be silly,Yes Virginia
```

终端输出：

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

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/hobot_locateanything/text-grounding-result.jpg" alt="指定文本定位" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

### 版面定位

输入图片和定位指令：

```text
/image image/05_layout_plot.jpg
```

```text
/layout plot,text
```

终端输出：

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

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/hobot_locateanything/document-layout-grounding-result.jpg" alt="版面定位" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

### 点定位

输入图片和定位指令：

```text
/image image/06_pointing_succulent.jpg
```

```text
/point succulent,the succulent in the center
```

终端输出：

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

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/hobot_locateanything/point-localization-result.jpg" alt="点定位" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />
