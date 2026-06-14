---
sidebar_position: 0
---

# Introduction to TogetheROS.Bot

```mdx-code-block
import DocScope from '@site/src/components/DocScope';
```

TogetheROS.Bot is a robot operating system launched by D-Robotics for robot manufacturers and ecosystem developers. It aims to unlock the intelligent potential of robot scenarios, helping ecosystem developers and business customers develop robots efficiently and conveniently, and build competitive intelligent robot products.

TogetheROS.Bot supports running on RDK platforms, and also provides a simulator version for X86 platforms. RDK platforms cover all the features shown in the diagram below. X86 platforms support experiencing some features through image playback, improving algorithm development and verification efficiency, and enabling quick migration to RDK platforms.

![TROS-Diagram](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/image/TogetheROS.png)

TogetheROS.Bot source code is hosted on GitHub under the [D-Robotics organization](https://github.com/D-Robotics).

## Communication Components

Communication is a functional optimization and extension based on the core communication components of ROS2 Foxy/Humble/Jazzy.

Main features are as follows:

The blue parts in the diagram are optimized or newly added modules. The main features of TogetheROS.Bot are as follows:

- Provides "hobot_sensor" to adapt to commonly used robot sensors, saving development time and focusing on core competitiveness
- Provides "hobot_dnn" to simplify on-board algorithm model inference and deployment, unleashing BPU computing power and lowering the barrier to using intelligent algorithms
- Provides "hobot_codec" for hardware-software accelerated video encoding and decoding, saving CPU resources and improving parallel processing capability
- Provides "hobot_cv" for hardware-software accelerated common CV operators, saving CPU resources and improving runtime efficiency
- Provides "hobot Render" for Web and HDMI dynamic visualization, rendering algorithm results in real time (Web only), facilitating demonstration and debugging
- Adds "zero-copy" inter-process zero-copy communication mechanism, reducing data transmission latency and system resource consumption
- Rich middleware software debugging and performance tuning tools, improving problem localization efficiency and facilitating system performance optimization
- Fully compatible with ROS2 Foxy/Humble/Jazzy interfaces, facilitating reuse of rich ROS tool packages and accelerating prototype verification
- Supports minimal and modular trimming, facilitating deployment on resource-constrained embedded products as needed

## Boxs Algorithm Repository

Boxs is an intelligent algorithm package based on TogetheROS.Bot launched by D-Robotics for robot manufacturers and ecosystem developers, aiming to improve the efficiency of integrating and deploying intelligent robot algorithms based on the D-Robotics RDK robot operating system.

- Image detection algorithms such as FCOS, YOLO, FasterRCNN, Efficientdet, Mobilenet_ssd;
- Image classification models such as Mobilenet
- Semantic segmentation models such as Unet
- Application algorithm models such as human body detection and tracking, gesture recognition, hand keypoint detection, monocular elevation network, monocular 3D detection, speech processing, etc.

## Apps Application Examples

Apps are algorithm application examples developed based on D-Robotics RDK robot operating system Communication and Boxs, aiming to connect the complete pipeline of image input, perception, and strategy, demonstrate application effects, and accelerate customer demo development efficiency.

## Glossary

| Term                              | Description                                                    |
| ----------------------------------| --------------------------------------------------------|
| zero-copy                         | Inter-process zero-copy communication method                                     |
| hobot dnn                         | Model inference function encapsulation based on BPU                                |
| SLAM                              | Simultaneous Localization and Mapping                                          |
| DOA                               | Direction of Arrival                                                |
| ASR                               | Automatic Speech Recognition                                            |
| TogetheROS.Bot                    | TogetheROS.Bot Robot Operating System                            |
| tros.b                            | Abbreviation for TogetheROS.Bot                                      |


## Feature Support List

<DocScope products="RDK-X3">

| Feature | RDK X3 |
|----------------|----------------|
| Data Collection [hobot_sensor](./02_quick_demo/demo_sensor.md) | &#10004; |
| Data Display [hobot_render](./02_quick_demo/demo_render.md) | &#10004; |
| Image Encoding/Decoding [hobot_codec](./02_quick_demo/hobot_codec.md) | &#10004; |
| Image Processing Acceleration [hobot_cv](./02_quick_demo/demo_cv.md) | &#10004; |
| Data Communication [zero-copy](./02_quick_demo/demo_communication.md) | &#10004; |
| Model Inference [hobot_dnn](./02_quick_demo/ai_predict.md) | &#10004; |
| Image Publishing Tool [hobot_image_publisher](./02_quick_demo/demo_tool.md) | &#10004; |
| Text-to-Speech [hobot_tts](./02_quick_demo/hobot_tts.md) | &#10004; |
| Object Detection | [YOLO](./03_boxs/detection/yolo.md): v2 v3 v5 v8 v10 <br /> [FCOS](./03_boxs/detection/fcos.md) <br /> [MobileNet_SSD](./03_boxs/detection/mobilenet.md) <br /> [EfficientNet_Det](./03_boxs/detection/efficientnet.md) |
| Image Classification [mobilenetv2](./03_boxs/classification/mobilenetv2.md) | &#10004; |
| Image Segmentation [mobilenet_unet](./03_boxs/segmentation/mobilenet_unet.md) [YOLOv8-Seg](./03_boxs/segmentation/yolov8_seg.md) | &#10004; |
| Human Body Detection | [mono2d_body_detection](./03_boxs/body/mono2d_body_detection.md) |
| Hand Keypoints | [hand_lmk_detection](./03_boxs/body/hand_lmk_detection.md) |
| Gesture Recognition | [hand_gesture_detection](./03_boxs/body/hand_gesture_detection.md) |
| [Face Age Detection](./03_boxs/body/mono_face_age_detection.md) and Corresponding APP Examples | &#10004; |
| [Face 106 Keypoint Detection](./03_boxs/body/mono_face_landmarks_detection.md) and Corresponding APP Examples | &#10004; |
| Visual Inertial Odometry [hobot_vio](./03_boxs/spatial/hobot_vio.md) | &#10004; |
| Intelligent Speech [hobot_audio](./03_boxs/audio/hobot_audio.md) and Speech-Related Examples | &#10004; |
| [SLAM Mapping](./04_apps/slam.md) | &#10004; |
| [Navigation2](./04_apps/navigation2.md) | &#10004; |
| [Intelligent Box](./04_apps/video_boxs.md) | &#10004; |

</DocScope>

<DocScope products="RDK-X5">

| Feature | RDK X5 |
|----------------|----------------|
| Data Collection [hobot_sensor](./02_quick_demo/demo_sensor.md) | &#10004; |
| Data Display [hobot_render](./02_quick_demo/demo_render.md) | &#10004; |
| Image Encoding/Decoding [hobot_codec](./02_quick_demo/hobot_codec.md) | &#10004; |
| Image Processing Acceleration [hobot_cv](./02_quick_demo/demo_cv.md) | &#10004; |
| Data Communication [zero-copy](./02_quick_demo/demo_communication.md) | &#10004; |
| Model Inference [hobot_dnn](./02_quick_demo/ai_predict.md) | &#10004; |
| Image Publishing Tool [hobot_image_publisher](./02_quick_demo/demo_tool.md) | &#10004; |
| Text-to-Speech [hobot_tts](./02_quick_demo/hobot_tts.md) | &#10004; |
| Object Detection | [YOLO](./03_boxs/detection/yolo.md): v2 v3 v5 v8 v10 <br /> [FCOS](./03_boxs/detection/fcos.md) <br /> [MobileNet_SSD](./03_boxs/detection/mobilenet.md) <br /> [EfficientNet_Det](./03_boxs/detection/efficientnet.md) |
| Open-Vocabulary Object Detection [YOLO-World](./03_boxs/detection/hobot_yolo_world.md) | &#10004; |
| Open-Vocabulary Object Detection [DOSOD](./03_boxs/detection/hobot_dosod.md) | &#10004; |
| Image Classification [mobilenetv2](./03_boxs/classification/mobilenetv2.md) | &#10004; |
| Image Segmentation [mobilenet_unet](./03_boxs/segmentation/mobilenet_unet.md) [YOLOv8-Seg](./03_boxs/segmentation/yolov8_seg.md) | &#10004; |
| Segment Anything [mono_edgesam](./03_boxs/segmentation/mono_edgesam.md) | &#10004; |
| Segment Anything [mono_mobilesam](./03_boxs/segmentation/mono_mobilesam.md) | &#10004; |
| Human Body Detection | [mono2d_body_detection](./03_boxs/body/mono2d_body_detection.md) |
| Hand Keypoints | [hand_lmk_detection](./03_boxs/body/hand_lmk_detection.md) |
| Gesture Recognition | [hand_gesture_detection](./03_boxs/body/hand_gesture_detection.md) |
| [Face Age Detection](./03_boxs/body/mono_face_age_detection.md) and Corresponding APP Examples | &#10004; |
| [Face 106 Keypoint Detection](./03_boxs/body/mono_face_landmarks_detection.md) and Corresponding APP Examples | &#10004; |
| [Human Body Following](./03_boxs/body/reid.md) | &#10004; |
| [Stereo Depth Algorithm](./03_boxs/spatial/hobot_stereonet.md) | &#10004; |
| [Stereo OCC Algorithm](./03_boxs/spatial/dstereo_occupancy.md) | &#10004; |
| Visual Inertial Odometry [hobot_vio](./03_boxs/spatial/hobot_vio.md) | &#10004; |
| Intelligent Speech [hobot_audio](./03_boxs/audio/hobot_audio.md) and Speech-Related Examples | &#10004; |
| Intelligent Speech [Sensevoice](./03_boxs/audio/sensevoice_ros2.md) | &#10004; |
| Vision-Language Model [hobot_llamacpp](./03_boxs/generate/hobot_llamacpp.md) | &#10004; |
| Text-Image Feature Retrieval [hobot_clip](./03_boxs/function/hobot_clip.md) | &#10004; |
| Optical Flow Estimation [mono_pwcnet](./03_boxs/function/mono_pwcnet.md) | &#10004; |
| [SLAM Mapping](./04_apps/slam.md) | &#10004; |
| [Navigation2](./04_apps/navigation2.md) | &#10004; |
| [Intelligent Box](./04_apps/video_boxs.md) | &#10004; |
| [Vision-Speech Box](./04_apps/hobot_llamacpp.md) | &#10004; |

</DocScope>

<DocScope products="RDK-S100">

| Feature | RDK S100 |
|----------------|----------------|
| Data Collection [hobot_sensor](./02_quick_demo/demo_sensor.md) | &#10004; |
| Data Display [hobot_render](./02_quick_demo/demo_render.md) | &#10004; |
| Image Encoding/Decoding [hobot_codec](./02_quick_demo/hobot_codec.md) | &#10004; |
| Image Processing Acceleration [hobot_cv](./02_quick_demo/demo_cv.md) | &#10004; |
| Data Communication [zero-copy](./02_quick_demo/demo_communication.md) | &#10004; |
| Model Inference [hobot_dnn](./02_quick_demo/ai_predict.md) | &#10004; |
| Image Publishing Tool [hobot_image_publisher](./02_quick_demo/demo_tool.md) | &#10004; |
| Text-to-Speech [hobot_tts](./02_quick_demo/hobot_tts.md) | &#10004; |
| Object Detection | [YOLO](./03_boxs/detection/yolo.md): v2 v3 v5 v8 v10 |
| Open-Vocabulary Object Detection [DOSOD](./03_boxs/detection/hobot_dosod.md) | &#10004; |
| Image Classification [mobilenetv2](./03_boxs/classification/mobilenetv2.md) | &#10004; |
| Image Segmentation [mobilenet_unet](./03_boxs/segmentation/mobilenet_unet.md) [YOLOv8-Seg](./03_boxs/segmentation/yolov8_seg.md) | &#10004; |
| Segment Anything [mono_edgesam](./03_boxs/segmentation/mono_edgesam.md) | &#10004; |
| Human Body Detection | [mono2d_yolo_pose](./03_boxs/body/mono2d_yolo_pose.md) |
| Hand Keypoints | [hand_lmk_gesture_mediapipe](./03_boxs/body/hand_lmk_gesture_mediapipe.md) |
| Gesture Recognition | [hand_lmk_gesture_mediapipe](./03_boxs/body/hand_lmk_gesture_mediapipe.md) |
| [Human Body Following](./03_boxs/body/reid.md) | &#10004; |
| [BEV](./03_boxs/driver/hobot_bev.md) | &#10004; |
| LiDAR Object Detection Algorithm [CenterPoint](./03_boxs/driver/hobot_centerpoint.md) | &#10004; |
| [Stereo Depth Algorithm](./03_boxs/spatial/hobot_stereonet.md) | &#10004; |
| [Stereo OCC Algorithm](./03_boxs/spatial/dstereo_occupancy.md) | &#10004; |
| Intelligent Speech [Sensevoice](./03_boxs/audio/sensevoice_ros2.md) | &#10004; |
| Vision-Language Model [hobot_llamacpp](./03_boxs/generate/hobot_llamacpp.md) | &#10004; |
| DeepSeek Large Language Model [hobot_xlm](./03_boxs/generate/hobot_xlm.md) | &#10004; |
| Text-Image Feature Retrieval [hobot_clip](./03_boxs/function/hobot_clip.md) | &#10004; |
| [SLAM Mapping](./04_apps/slam.md) | &#10004; |
| [Navigation2](./04_apps/navigation2.md) | &#10004; |
| [Intelligent Box](./04_apps/video_boxs.md) | &#10004; |
| [Vision-Speech Box](./04_apps/hobot_llamacpp.md) | &#10004; |

</DocScope>

<DocScope products="RDK-S600">

| Feature | RDK S600 |
|----------------|----------------|
| Data Collection [hobot_sensor](./02_quick_demo/demo_sensor.md) | &#10004; |
| Data Display [hobot_render](./02_quick_demo/demo_render.md) | &#10004; |
| Image Encoding/Decoding [hobot_codec](./02_quick_demo/hobot_codec.md) | &#10004; |
| Image Processing Acceleration [hobot_cv](./02_quick_demo/demo_cv.md) | &#10004; |
| Data Communication [zero-copy](./02_quick_demo/demo_communication.md) | &#10004; |
| Image Publishing Tool [hobot_image_publisher](./02_quick_demo/demo_tool.md) | &#10004; |
| Text-to-Speech [hobot_tts](./02_quick_demo/hobot_tts.md) | &#10004; |
| Object Detection | [YOLO](./03_boxs/detection/yolo.md): v2 v3 v5 |
| Open-Vocabulary Object Detection [DOSOD](./03_boxs/detection/hobot_dosod.md) | &#10004; |
| Image Classification [mobilenetv2](./03_boxs/classification/mobilenetv2.md) | &#10004; |
| Image Segmentation [mobilenet_unet](./03_boxs/segmentation/mobilenet_unet.md) [YOLOv8-Seg](./03_boxs/segmentation/yolov8_seg.md) | [mobilenet_unet](./03_boxs/segmentation/mobilenet_unet.md) |
| Segment Anything [mono_edgesam](./03_boxs/segmentation/mono_edgesam.md) | &#10004; |
| Human Body Detection | [mono2d_yolo_pose](./03_boxs/body/mono2d_yolo_pose.md) |
| [Human Body Following](./03_boxs/body/reid.md) | &#10004; |
| Intelligent Speech [Sensevoice](./03_boxs/audio/sensevoice_ros2.md) | &#10004; |
| [SLAM Mapping](./04_apps/slam.md) | &#10004; |
| [Intelligent Box](./04_apps/video_boxs.md) | &#10004; |

</DocScope>