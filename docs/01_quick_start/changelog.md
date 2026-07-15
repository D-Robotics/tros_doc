---
sidebar_position: 6
---

# 5.1.6 版本发布记录

## tros-jazzy

### 版本号：2.5.4 (2026-05-19)

功能变更（`RDK S600`平台）：

- 适配`RKD S600 v5.1.0`版本的系统 SDK。

### 版本号：2.5.3 (2026-05-08)

新增功能（`RDK S100`平台）：
- 新增 mono_edgetam_prompt：通过 prompt_mode 支持两种提示样式：点提示或框提示。导出提示初始化结果（内存特征文件）以供下游跟踪，并提供可选的本地渲染输出。
- 新增 mono_edgetam_track 加载特征，并将其用作跟踪初始化。支持在本地图像和订阅流模式下进行连续跟踪。逐帧更新跟踪记忆，并发布分割/跟踪结果。

功能变更（`RDK S100`平台）：
- 适配系统版本：RDKS100_V4.0.6。


### 版本号：2.5.1 (2026-03-10)

功能变更：

- 适配`RKD S600 v5.0.1`版本的系统 SDK。
- `mipi_cam`重构从获取码流到消息发布的 videobuff 管理，以及拼接线程；修改拼接图片的标定信息的 topic 为"image_combine_raw/left/camera_info"和"image_combine_raw/right/camera_info"。

新增功能：

- 新增检测算法 yolov2, yolov3, yolov5；分割算法 unet；分类算法 mobilenet。
- 新增开放词汇目标检测算法 DOSOD。
- 新增人体检测和跟踪算法(Ultralytics YOLO Pose)。
- 新增人体实例跟踪算法 reid。
- 新增分割一切算法 MobileSAM。


### 版本号：2.5.0 (2025-12-02)

新增功能：

- 支持`RDK S600`平台。

## tros-humble

### 版本号：2.5.3 (2026-05-08)

新增功能（`RDK S100`平台）：
- 新增 mono_edgetam_prompt：通过 prompt_mode 支持两种提示样式：点提示或框提示。导出提示初始化结果（内存特征文件）以供下游跟踪，并提供可选的本地渲染输出。
- 新增 mono_edgetam_track 加载特征，并将其用作跟踪初始化。支持在本地图像和订阅流模式下进行连续跟踪。逐帧更新跟踪记忆，并发布分割/跟踪结果。

功能变更（`RDK S100`平台）：
- 适配系统版本：RDKS100_V4.0.6。


### 版本号：2.5.2 (2026-03-17)

新增功能（`RDK X5`平台）：
- 双目深度估计算法新增极线对齐检测功能；根据 hobot_mipi_cam 调整订阅的消息为"image_combine_raw/left/camera_info"和"image_combine_raw/right/camera_info"
- 双目 OCC 算法支持使用 mipi 相机。
- 目标检测算法支持`yolo26`。
- `sensevoice_ros2`算法新增配置选项，支持中英文模式配置。
- 新增基于`palm_detection_mediapipe`和`hand_landmarks_mediapipe`的人手关键点及手势识别算法。

功能变更（`RDK X5`平台）：
- 适配系统版本：RDK 3.5.0 (Linux SDK V1.1.2)
- 'mipi_cam'重构从获取码流到消息发布的 videobuff 管理和拼接线程。修改拼接图片的标定信息的 topic，"image_combine_raw/left/camera_info"和"image_combine_raw/right/camera_info"。重构 X5 的 eeprom 的读处理。X5 增加子目录的发布。增加联合 132gs 的 imu 数据发布。


### 版本号：2.4.6 (2026-02-02)

功能变更（`RDK S100`平台）：
- 适配`V4.0.5`版本系统和`V3.7.0`版本`OE`。


### 版本号：2.4.5 (2025-10-28)

问题修复（`RDK X5`平台）：

- 修复图像处理加速模块[`hobot_cv`](../02_quick_demo/demo_cv.md)使用 vse 加速图像 resize 的 bug。
- 修复板端模型推理框架[`dnn_node`](https://github.com/D-Robotics/hobot_dnn.git)统计推理延迟错误的问题。
- 修复由于 MIPI 图像采集和算法等模块的`ros component so`安装路径错误，导致运行时加载失败的问题。
- 优化[图像编解码](../02_quick_demo/hobot_codec.md)的配置，删除无效的配置参数，增加用于 debug 的配置参数。


### 版本号：2.4.4 (2025-10-24)

新增功能（`RDK S100`平台）：

- 板端算法推理框架 [`dnn_node`](https://github.com/D-Robotics/hobot_dnn.git) 新增 `ROI` 推理模式，输出的 `output tensor` 数量为 `output_size x roi_size`。
- 新增[人体检测和跟踪(Ultralytics YOLO Pose)](../03_boxs/body/mono2d_yolo_pose.md)算法示例。
- 新增[人体实例跟踪](../03_boxs/body/reid.md)算法示例，基于`reid`模型提取人体特征，通过`SQlite`数据库存储、管理、查询特征。 launch 文件中关闭了人体检测和跟踪节点 `mono2d_body_detection` 基于 `ROI` 的人体跟踪方式；限制输入的 `ROI` 尺寸小于 3.5 倍实际模型输入尺寸。
- 新增[人手关键点及手势识别(mediapipe)](../03_boxs/body/hand_lmk_gesture_mediapipe.md)算法示例。实现手掌检测基本功能，前后处理以及发送 `ai msg` ；支持 mipi 相机、usb 相机、本地回灌图片的方式；支持零拷贝和非零拷贝方式获取图片。
- 新增[DeepSeek 大语言模型](../03_boxs/generate/hobot_xlm.md)算法示例。支持人机对话；`RDK S100`, `RDK S100P` 新增支持 `DeepSeek_R1_Distill_Qwen_1.5B` 模型, `DeepSeek_R1_Distill_Qwen_7B` 模型。

### 版本号：2.4.3 (2025-9-15)

新增功能（`RDK X5`平台）：

- [MIPI 图像采集](../02_quick_demo/demo_sensor.md)支持启动多路图像采集。
- [双目 MIPI 图像采集](../02_quick_demo/demo_sensor.md)支持`sc132gs`双目相机。

### 版本号：2.4.2 (2025-8-29)

新增功能（`RDK S100`平台）：

- [MIPI 图像采集](../02_quick_demo/demo_sensor.md)支持`230ai`双目模组。
- [目标检测 YOLO](../03_boxs/detection/yolo.md)支持`yolo11`和`yolov12`算法；增加使用`component`方式启动的脚本，支持使用`mipi cam`采集 4K 图像进行推理。
- [EdgeSAM 分割一切](../03_boxs/segmentation/mono_edgesam.md)算法新增`edgesam`作为模型推理；新增`nv12`格式数据输入；新增对分割结果 padding, 用于在双目深度案例一同可视化。
- 新增[文本图片特征检索算法](../03_boxs/function/hobot_clip.md)，用于文本图片特征提取检索。
- 新增[DOSOD 算法](../03_boxs/detection/hobot_dosod.md)，新增地瓜自研开放性词汇检测 DOSOD 端侧部署功能包；新增 DOSOD 模型自定义修改检测类别的重参数量化方法。
- 新增[双目 OCC](../03_boxs/spatial/dstereo_occupancy.md)，集成地瓜双目`OCC`网络。
- [视觉语言模型](../04_apps/hobot_llamacpp.md)算法新增`smolvlm2`模型适配, 支持图片回灌、订阅模式；新增`llm`模型推理结束后输出完整话题的能力。
- 新增[双目深度估计算法](../03_boxs/spatial/hobot_stereonet.md)。


### 版本号：2.4.1 (2025-7-30)

新增功能（`RDK X5`平台）：

- [MIPI 图像采集](../02_quick_demo/demo_sensor.md)支持`imx415`模组。
- [EdgeSAM 分割一切](../03_boxs/segmentation/mono_edgesam.md)算法新增`edgesam`作为模型推理；新增`nv12`格式数据输入；新增对分割结果 padding, 用于在双目深度案例一同可视化。
- 新增[人体实例跟踪](../03_boxs/body/reid.md)算法，基于`reid`模型提取人体特征，通过`SQlite`数据库存储、管理、查询特征。
- 新增[双目 OCC](../03_boxs/spatial/dstereo_occupancy.md)算法，集成地瓜双目`OCC`网络。
- [视觉语言模型](../04_apps/hobot_llamacpp.md)新增`smolvlm2`模型适配, 支持图片回灌、订阅模式；新增`llm`模型推理结束后输出完整话题的能力。


### 版本号：2.4.0 (2025-5-12)

新增功能：

- 支持`RDK S100`平台。

### 版本号：2.3.3 (2025-4-30)

新增功能：

- 支持`RDK X5 Module`平台。
- 新增基于`sensevoice_cpp`的[ASR 开源方案](../03_boxs/audio/sensevoice_ros2.md)，支持命令词和 ASR 数据的推送。
- [双目深度估计算法](../03_boxs/spatial/hobot_stereonet.md)优化后处理耗时，新增 V2.3 版本模型。
- 新增基于`llama.cpp`的端侧[视觉语言模型](../04_apps/hobot_llamacpp.md)算法示例。


### 版本号：2.3.2 (2025-1-15)

功能变更：

- [双目深度估计算法](../03_boxs/spatial/hobot_stereonet.md)更新双目模型，优化深度估计效果。
- [多路视频分析](../04_apps/video_boxs.md)算法应用示例，优化示例处理流程以及 WEB 端可视化效果。
- [双目辅助功能包](https://github.com/D-Robotics/hobot_stereonet_utils)删除部分不能启动的 launch 文件。

新增功能：

- 新增[ZED 相机图像采集](../02_quick_demo/demo_sensor.md)，用于启动 zed 相机获取双目图像，用于双目深度估计算法输入。
- 新增[DOSOD 算法](../03_boxs/detection/hobot_dosod.md)，新增地瓜自研开放性词汇检测 DOSOD 端侧部署功能包。

问题修复：
- 修复[yolov8-seg 图像分割](../03_boxs/segmentation/yolov8_seg.md)算法后处理中由于 box 越界导致的 crash 问题。
- [图像编解码](../02_quick_demo/hobot_codec.md)修复帧率统计错误的问题。
- [双目 MIPI 图像采集](../02_quick_demo/demo_sensor.md)修复 i2c detection 的问题，增加 lpwm 开关的配置。

### 版本号：2.3.1 (2024-11-20)

功能变更：

- 依赖的`opencv`版本从 3.4.5 升级到 4.5.4（Ubuntu 22.04 使用的最新 release 版本）。

新增功能：

- [工具](../02_quick_demo/demo_tool.md)支持发布`bgr/rgb`格式消息数据；支持配置发布消息的 frame_id。
- [人体检测和跟踪算法](../03_boxs/body/mono2d_body_detection.md)支持配置订阅的消息 topic；支持 component 模式运行；算法前处理支持对输入图片进行缩放后推理；launch 启动脚本支持使用压缩图片回灌，并支持配置图片的路径。
- [板端算法模型推理与部署框架](https://github.com/D-Robotics/hobot_dnn.git)修复多线程推理中推理耗时计算错误的问题；支持在配置文件中配置任务数功能。
- [图像编解码](../02_quick_demo/hobot_codec.md)使用订阅到图像消息的 frame_id 作为输出图像消息的 frame_id；支持发布丢帧控制。
- [手势识别算法](../03_boxs/body/hand_gesture_detection.md)支持启动时配置后处理阈值；支持动态手势识别。
- 新增[人脸年龄检测算法](../03_boxs/body/mono_face_age_detection.md)，用于检测人的年龄。
- 新增[人脸 106 关键点检测算法](../03_boxs/body/mono_face_landmarks_detection.md)，用于检测人脸 106 个关键点信息。
- 新增[感知消息融合 Node](https://github.com/D-Robotics/tros_perception_fusion)，用于订阅多个[PerceptionTargets](https://github.com/D-Robotics/hobot_msgs/blob/develop/ai_msgs/msg/PerceptionTargets.msg)类型的 topic，经过时间对齐、数据去重后，再融合成一个 topic 后发布。应用参考[多算法推理](../02_quick_demo/ai_predict.md)。
- 新增[感知消息滤波 Node](https://github.com/D-Robotics/tros_lowpass_filter)，采用 OneEuroFilter 滤波策略对点和框做平滑操作，用于对感知结果中的人体、人脸、人手等检测框和关键点数据进行位置纠正，修复框和点的抖动问题。应用参考[多算法推理](../02_quick_demo/ai_predict.md)。
- 新增[双目辅助功能包](https://github.com/D-Robotics/hobot_stereonet_utils)，用于对双目图像、深度图像进行采集。
- 新增[多路视频分析](../04_apps/video_boxs.md)算法应用示例，通过 rtsp 协议拉取多路 h264 和 h265 码流并推理，在 WEB 端可视化感知结果。

问题修复：

- [MIPI 图像采集](../02_quick_demo/demo_sensor.md)修复`imx219`模组启动失败的问题.
- [人手关键点检测算法](../03_boxs/body/hand_lmk_detection.md)前处理增加人手框外扩功能，解决算法输出的关键点错误的问题。


### 版本号：2.3.0 (2024-09-19)

新增功能：

- 支持`RDK X5`平台。
- 数据采集增加[双目 MIPI 图像采集](../02_quick_demo/demo_sensor.md)功能。
- 算法仓库新增`yolov8`和`yolov10`[目标检测](../03_boxs/detection/yolo.md)，`yolov8-seg`[图像分割](../03_boxs/segmentation/yolov8_seg.md)参考算法。
- 算法仓库新增[YOLO-World 算法](../03_boxs/detection/hobot_yolo_world.md)，用于开放性词汇输入检测。
- 算法仓库新增[光流估计算法](../03_boxs/function/mono_pwcnet.md)，用于光流检测。
- 算法仓库新增[分割一切算法](../03_boxs/segmentation/mono_mobilesam.md)，用于无差别分割一切。
- 算法仓库新增[文本图片特征检索算法](../03_boxs/function/hobot_clip.md)，用于文本图片特征提取检索。
- 算法仓库新增[双目深度估计算法](../03_boxs/spatial/hobot_stereonet.md)，实现基于视觉的深度估计。


### 版本号：2.2.0 (2024-04-11)

功能变更：

- 基于 TROS Foxy 2.1.3 版本，适配 Ubuntu 22.04 系统和 ROS2 Humble。
- TROS 的安装路径由`/opt/tros`变更为`/opt/tros/humble`，和 ROS2 的安装路径层级和命名保持一致。
- 不再提供`tros-ros-base`安装包（包含 rclcpp、rclpy、ros2cli 等 ROS2 基础功能包），使用标准的 ROS2 发行包，安装 TROS Humble 时自动安装依赖的 ROS2 Humble。
- 使用 ROS2 fastdds 的零拷贝通信功能，涉及到数据采集、图像编解码、算法示例等使用到图像数据的模块。
- 零拷贝通信使用的 QoS 的 Reliability 由`RMW_QOS_POLICY_RELIABILITY_RELIABLE`（rclcpp::QoS()）变更为`RMW_QOS_POLICY_RELIABILITY_BEST_EFFORT`（rclcpp::SensorDataQoS()），避免使用零拷贝时潜在的稳定性风险。
- 重构`hobot_dnn`，使用更底层的板端推理框架`libdnn`，不再使用`easydnn`。
- `hobot_audio`升级语音算法 SDK，使用更底层的板端推理框架`libdnn`，不再使用`easydnn`。
- `hobot_trigger`适配 ROS2 Humble 版本 rosbag2。

新增功能：
- `robot_dev_config`新增 bloom 编译和打包的脚本，用于 ARM 平台编译和打包 TROS。
- `hobot_mipi_cam` node 新增 frame_ts_type 配置项，支持 realtime（用于计算通信延迟）和 sensor（默认，用于传感器的时间戳同步）配置参数。
- 新增`hobot_shm` node，用于配置 ROS2 零拷贝环境。

问题修复：
- 修复编译器升级引入的兼容性问题。
- 修复板端编译部分 ROS2 pkg 存在的路径依赖问题。

## tros-foxy

### 版本号：2.1.3 (2024-03-11)

功能变更：

- jpeg 压缩格式图片使用的数据类型由`sensor_msgs::msg::Image`变更为标准的`sensor_msgs::msg::CompressedImage`，支持使用 foxglove 和 ros2 rqt 等工具查看 TROS 发布的 jpeg 格式图片。涉及到 hobot_websocket, hobot_codec, hobot_image_publisher, hobot_usb_cam 模块。
- 统一使用 jpeg/mjpeg 配置项指定发布/订阅 jpeg 压缩格式图片，删除 jpeg-compressed/mjpeg-compressed 配置项，涉及到 hobot_codec 和 hobot_usb_cam 模块。
- 引入表示 TROS 发行版的环境变量 TROS_DISTRO，执行`source /opt/tros/setup.bash`/`source /opt/tros/local_setup.bash`命令后，环境变量`TROS_DISTRO`的值为空。hobot_codec, hobot_audio, hobot_mipi_cam, hobot_usb_cam 等模块使用的配置文件路径由`/opt/tros/lib`变更为`/opt/tros/${TROS_DISTRO}/lib`。


### 版本号：2.1.2 (2024-01-19)

新增功能：

- 重构`hobot_usb_cam`，支持更多 format 配置和转码。
- `hobot_audio`更新语音 SDK，同时支持 2mic 和 4mic 麦克风板;增加 micphone_name 配置设备 ID 号。

问题修复：

- `hobot_rgbd_cam` node 修复发送数据消息 step 字段设置错误问题。
- `hobot_tts`更新音频播放函数调用，解决新版本系统播放失败问题。
- `hobot_llm`删除 config 设备树文件，以及更新 README，新版本系统可通过命令工具设置 ION 内存大小。

### 版本号：2.1.1 (2023-11-03)

新增功能：

- 新增`hobot_chatbot` node，调用智能语音、大语言模型、文本转语音模块，实现板端语音聊天功能。

问题修复：

- 文本转语音`hobot_tts` node，修复某些字符导致应用退出问题。

### 版本号：2.1.0 (2023-09-14)

功能变更：

- `tros-ros-base`更新到最新 ROS2 foxy 源码，兼容最新 ROS2 foxy 软件包。
- 使用 ROS2 foxy 软件包只`source /opt/tros/setup.bash`即可，不再需要使用脚本建立软链接。

新增功能：

- 文本转语音`hobot_tts` node 新增参数指定播放音频设备。
- 新增大语言模型`hobot_llm` node，可在端侧体验 LLM。
- 图像编解码`hobot_codec` node 配置参数`in_format`新增`jpeg-compressed`配置项，同时根据配置项选择订阅的话题数据类型。

问题修复：

- MIPI 图像采集`hobot_mipi_cam` node 修复发送 RGB 格式数据消息 step 字段设置错误问题。


### 版本号：2.0.2 (2023-08-28)

功能变更：

- tros.b 安装时配置的 ROS2 源（`/etc/apt/sources.list.d/ros2.list`）变更为清华镜像源，解决安装 ROS2 package 速度慢和失败的问题。

新增功能：

- 启动 tros.b 脚本配置环境时（`source /opt/tros/setup.bash`和`source /opt/tros/local_setup.bash`）新增权限检查的功能。如果当前账户不具有 root 权限将会自动进入切换到 root 账户的流程，解决因为权限不够导致的使用 tros.b 失败的问题。
- 智能语音算法`hobot_audio` node 新增音频设备号参数配置功能，方便二次开发​。
- 事件触发`hobot_trigger` node 新增通过 std_msg 话题给 Trigger 模块发放任务功能，规范 Trigger 配置方法。

问题修复：

- 修复图像加速处理`hobot_cv` node 同时进行 crop&resize 处理图像时，处理失败的问题。
- 修复 MIPI 图像采集`hobot_mipi_cam` node 启动时输出 error log 的问题。
- 修复数据可视化消息转换`hobot_visualization` node 的 launch 启动文件配置无效的问题。


### 版本号：2.0-Release（2.0.1） (2023-06-10)

功能变更：

- 升级语音算法，优化 ASR（语音识别）效果。
- 优化算法示例的`model_name`配置项，从模型文件中自动解析`model_name`配置，解决参数配置错误导致的加载模型失败问题，提升算法二次开发的易用性。
- tros.b 安装包中不再包含 nav2 功能包，用户直接在 RDK 上使用 apt 命令安装 ROS2 最新版本的 nav2 功能包，解决老版本 nav2 存在的稳定性问题。

新增功能：

- 新增 Trigger 事件触发并获取和可视化 rosbag 数据的`hobot_trigger`和`hobot_visalization`等 node，帮助用户定位、复现和可视化机器人场景中的感知、规控等问题。同时用户可以二次开发实现数据触发、录制和实时回传的功能。
- USB 图像采集 node 自适应 USB 摄像头的设备号，降低用户使用 USB 摄像头的门槛。
- 新增视觉惯性里程计（Visual Inertial Odometry，VIO）算法 node，基于视觉实现低成本、鲁棒性高的机器人高精度定位算法。
- 新增文本转语音的`hobot_tts` node，实现将文本转化为语音进行播报的功能。
- 新增激光雷达目标检测算法`hobot_centerpoint` node。
- 新增 BEV 感知算法`hobot_bev` node。
- 新增双目深度估计算法`hobot_stereonet` node。

问题修复：

- 升级`RDK X3`的 easydnn（版本号 1.6.1）和 dnn（版本号 1.18.4），修复算子 crash 问题以及支持更多算子。
- 修复 RGBD 图像采集 node 发布的深度数据错误的问题。

其他更新：

- 优化人体检测和跟踪算法 node，支持根据输入图像分辨率自适应输出的算法感知结果坐标。
- 修复 orb_slam3 算法编译脚本路径错误导致的编译失败问题。


### 版本号：2.0-Beta（2.0.0） (2023-05-29)

2.0-Beta（2.0.0）是第一个 2.x 版本 tros.b，建议[1.x 版本 tros.b](https://developer.d-robotics.cc/api/v1/fileData/TogetherROS/index.html)的用户升级到 2.x 版本。

功能变更：

- 代码托管平台从 Gitlab 更换为 GitHub，方便更多开发者进行二次开发。
- 集成更高效的包管理机制，加快版本升级效率，让机器人应用安装更加便捷。

新增功能：

- 支持全新的核心板开发套件 RDK X3 Module。
- hobot_audio 增加语音 ASR 识别结果输出，方便用于开发语音应用。

问题修复：

- 修复 dnn_node 内置的 MobileNet_SSD 模型后处理在多线程情况下崩溃问题。
- 修复 X86 平台下 dnn_node 使用 DDR 输入模型推理失败问题
- 修复 X86 平台下 hobot_codec 和 hobot_image_publisher 编译失败问题。

其他更新：

- 更新示例的 launch 启动脚本，应用引用依赖模块的 launch 脚本并配置参数。
- webscoket 更新展示端的 D-Robotics logo。
