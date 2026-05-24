---
sidebar_position: 6
---

# 5.1.6 Release Notes

## tros-jazzy

### Version: 2.5.4 (2026-05-19)

Changes (`RDK S600` platform):

- Adapted to system SDK `RKD S600 v5.1.0`.


### Version: 2.5.1 (2026-03-10)

Changes:

- Adapted to system SDK `RKD S600 v5.0.1`.
- Refactored `mipi_cam` videobuff management from stream capture to message publishing, as well as the stitching thread; changed calibration info topics for stitched images to "image_combine_raw/left/camera_info" and "image_combine_raw/right/camera_info".

New Features:

- Added detection algorithms yolov2, yolov3, yolov5; segmentation algorithm unet; classification algorithm mobilenet.
- Added open-vocabulary object detection algorithm DOSOD.
- Added human detection and tracking algorithm (Ultralytics YOLO Pose).
- Added human instance tracking algorithm reid.
- Added segment-anything algorithm MobileSAM.


### Version: 2.5.0 (2025-12-02)

New Features:

- Support for `RDK S600` platform.

## tros-humble

### Version: 2.5.3 (2026-05-08)

New Features (`RDK S100` platform):
- Added mono_edgetam_prompt: supports two prompt styles via prompt_mode—point prompts or box prompts. Exports prompt initialization results (in-memory feature files) for downstream tracking, with optional local rendering output.
- Added mono_edgetam_track to load features and use them for tracking initialization. Supports continuous tracking in local image and subscribed stream modes. Updates tracking memory frame by frame and publishes segmentation/tracking results.

Changes (`RDK S100` platform):
- Adapted to system version: RDKS100_V4.0.6.


### Version: 2.5.2 (2026-03-17)

New Features (`RDK X5` platform):
- Added epipolar alignment detection to the stereo depth estimation algorithm; adjusted subscribed messages per hobot_mipi_cam to "image_combine_raw/left/camera_info" and "image_combine_raw/right/camera_info"
- Stereo OCC algorithm supports mipi cameras.
- Object detection algorithm supports `yolo26`.
- `sensevoice_ros2` algorithm adds configuration options for Chinese/English mode.
- Added hand keypoint and gesture recognition algorithm based on `palm_detection_mediapipe` and `hand_landmarks_mediapipe`.

Changes (`RDK X5` platform):
- Adapted to system version: RDK 3.5.0 (Linux SDK V1.1.2)
- Refactored `mipi_cam` videobuff management from stream capture to message publishing and the stitching thread. Changed calibration info topics for stitched images to "image_combine_raw/left/camera_info" and "image_combine_raw/right/camera_info". Refactored X5 eeprom read handling. Added subdirectory publishing on X5. Added combined 132gs imu data publishing.


### Version: 2.4.6 (2026-02-02)

Changes (`RDK S100` platform):
- Adapted to system version `V4.0.5` and `OE` version `V3.7.0`.


### Version: 2.4.5 (2025-10-28)

Bug Fixes (`RDK X5` platform):

- Fixed a bug in the image processing acceleration module [`hobot_cv`](../02_quick_demo/demo_cv.md) when using vse to accelerate image resize.
- Fixed incorrect inference latency statistics in the on-board model inference framework [`dnn_node`](https://github.com/D-Robotics/hobot_dnn.git).
- Fixed runtime loading failures caused by incorrect installation paths for `ros component so` in MIPI image capture and algorithm modules.
- Optimized [image codec](../02_quick_demo/hobot_codec.md) configuration: removed invalid configuration parameters and added debug configuration parameters.


### Version: 2.4.4 (2025-10-24)

New Features (`RDK S100` platform):

- On-board algorithm inference framework [`dnn_node`](https://github.com/D-Robotics/hobot_dnn.git) adds `ROI` inference mode; the number of output `output tensor`s is `output_size x roi_size`.
- Added [human detection and tracking (Ultralytics YOLO Pose)](../03_boxs/body/mono2d_yolo_pose.md) algorithm example.
- Added [human instance tracking](../03_boxs/body/reid.md) algorithm example, which extracts human features using the `reid` model and stores, manages, and queries features via an `SQlite` database. The launch file disables ROI-based human tracking in the human detection and tracking node `mono2d_body_detection`; input `ROI` size is limited to less than 3.5x the actual model input size.
- Added [hand keypoint and gesture recognition (mediapipe)](../03_boxs/body/hand_lmk_gesture_mediapipe.md) algorithm example. Implements basic palm detection, pre/post-processing, and `ai msg` publishing; supports mipi camera, usb camera, and local image replay; supports zero-copy and non-zero-copy image acquisition.
- Added [DeepSeek large language model](../03_boxs/generate/hobot_xlm.md) algorithm example. Supports human-machine dialogue; `RDK S100` and `RDK S100P` newly support `DeepSeek_R1_Distill_Qwen_1.5B` and `DeepSeek_R1_Distill_Qwen_7B` models.

### Version: 2.4.3 (2025-9-15)

New Features (`RDK X5` platform):

- [MIPI image capture](../02_quick_demo/demo_sensor.md) supports launching multi-channel image capture.
- [Stereo MIPI image capture](../02_quick_demo/demo_sensor.md) supports `sc132gs` stereo camera.

### Version: 2.4.2 (2025-8-29)

New Features (`RDK S100` platform):

- [MIPI image capture](../02_quick_demo/demo_sensor.md) supports `230ai` stereo module.
- [YOLO object detection](../03_boxs/detection/yolo.md) supports `yolo11` and `yolov12` algorithms; added component-based launch scripts supporting 4K image inference with `mipi cam`.
- [EdgeSAM segment anything](../03_boxs/segmentation/mono_edgesam.md) algorithm adds `edgesam` for model inference; adds `nv12` format data input; adds padding for segmentation results for joint visualization in stereo depth use cases.
- Added [text-image feature retrieval algorithm](../03_boxs/function/hobot_clip.md) for text-image feature extraction and retrieval.
- Added [DOSOD algorithm](../03_boxs/detection/hobot_dosod.md), D-Robotics open-vocabulary detection DOSOD on-device deployment package; added re-parameterization quantization method for customizing detection categories in DOSOD models.
- Added [stereo OCC](../03_boxs/spatial/dstereo_occupancy.md), integrating D-Robotics stereo `OCC` network.
- [Vision-language model](../04_apps/hobot_llamacpp.md) algorithm adds `smolvlm2` model support, with image replay and subscription modes; adds ability to output complete topics after `llm` model inference completes.
- Added [stereo depth estimation algorithm](../03_boxs/spatial/hobot_stereonet.md).


### Version: 2.4.1 (2025-7-30)

New Features (`RDK X5` platform):

- [MIPI image capture](../02_quick_demo/demo_sensor.md) supports `imx415` module.
- [EdgeSAM segment anything](../03_boxs/segmentation/mono_edgesam.md) algorithm adds `edgesam` for model inference; adds `nv12` format data input; adds padding for segmentation results for joint visualization in stereo depth use cases.
- Added [human instance tracking](../03_boxs/body/reid.md) algorithm, which extracts human features using the `reid` model and stores, manages, and queries features via an `SQlite` database.
- Added [stereo OCC](../03_boxs/spatial/dstereo_occupancy.md) algorithm, integrating D-Robotics stereo `OCC` network.
- [Vision-language model](../04_apps/hobot_llamacpp.md) adds `smolvlm2` model support, with image replay and subscription modes; adds ability to output complete topics after `llm` model inference completes.


### Version: 2.4.0 (2025-5-12)

New Features:

- Support for `RDK S100` platform.

### Version: 2.3.3 (2025-4-30)

New Features:

- Support for `RDK X5 Module` platform.
- Added [ASR open-source solution](../03_boxs/audio/sensevoice_ros2.md) based on `sensevoice_cpp`, supporting command word and ASR data publishing.
- [Stereo depth estimation algorithm](../03_boxs/spatial/hobot_stereonet.md) optimizes post-processing time; added V2.3 model version.
- Added on-device [vision-language model](../04_apps/hobot_llamacpp.md) algorithm example based on `llama.cpp`.


### Version: 2.3.2 (2025-1-15)

Changes:

- [Stereo depth estimation algorithm](../03_boxs/spatial/hobot_stereonet.md) updated stereo model to improve depth estimation quality.
- [Multi-channel video analysis](../04_apps/video_boxs.md) algorithm application example: optimized processing pipeline and WEB visualization.
- [Stereo utility package](https://github.com/D-Robotics/hobot_stereonet_utils) removed launch files that could not start.

New Features:

- Added [ZED camera image capture](../02_quick_demo/demo_sensor.md) to launch ZED camera for stereo images as input to stereo depth estimation algorithm.
- Added [DOSOD algorithm](../03_boxs/detection/hobot_dosod.md), D-Robotics open-vocabulary detection DOSOD on-device deployment package.

Bug Fixes:
- Fixed crash in [yolov8-seg image segmentation](../03_boxs/segmentation/yolov8_seg.md) algorithm post-processing caused by out-of-bounds boxes.
- [Image codec](../02_quick_demo/hobot_codec.md) fixed incorrect frame rate statistics.
- [Stereo MIPI image capture](../02_quick_demo/demo_sensor.md) fixed i2c detection issue; added lpwm switch configuration.

### Version: 2.3.1 (2024-11-20)

Changes:

- Upgraded dependent `opencv` version from 3.4.5 to 4.5.4 (latest release version used on Ubuntu 22.04).

New Features:

- [Tools](../02_quick_demo/demo_tool.md) support publishing `bgr/rgb` format message data; support configuring frame_id for published messages.
- [Human detection and tracking algorithm](../03_boxs/body/mono2d_body_detection.md) supports configuring subscribed message topics; supports component mode; pre-processing supports scaling input images before inference; launch scripts support compressed image replay with configurable image paths.
- [On-board algorithm model inference and deployment framework](https://github.com/D-Robotics/hobot_dnn.git) fixed incorrect inference latency calculation in multi-threaded inference; supports configuring task count in configuration files.
- [Image codec](../02_quick_demo/hobot_codec.md) uses frame_id from subscribed image messages as output image message frame_id; supports publish frame drop control.
- [Gesture recognition algorithm](../03_boxs/body/hand_gesture_detection.md) supports configuring post-processing thresholds at startup; supports dynamic gesture recognition.
- Added [face age detection algorithm](../03_boxs/body/mono_face_age_detection.md) for detecting human age.
- Added [face 106 keypoint detection algorithm](../03_boxs/body/mono_face_landmarks_detection.md) for detecting 106 facial keypoints.
- Added [perception message fusion Node](https://github.com/D-Robotics/tros_perception_fusion) to subscribe to multiple [PerceptionTargets](https://github.com/D-Robotics/hobot_msgs/blob/develop/ai_msgs/msg/PerceptionTargets.msg) topics, perform time alignment and deduplication, then fuse and publish as a single topic. See [multi-algorithm inference](../02_quick_demo/ai_predict.md) for application reference.
- Added [perception message filter Node](https://github.com/D-Robotics/tros_lowpass_filter) using OneEuroFilter strategy to smooth points and boxes, correcting positions of human, face, hand detection boxes and keypoints in perception results to fix jitter. See [multi-algorithm inference](../02_quick_demo/ai_predict.md) for application reference.
- Added [stereo utility package](https://github.com/D-Robotics/hobot_stereonet_utils) for capturing stereo and depth images.
- Added [multi-channel video analysis](../04_apps/video_boxs.md) algorithm application example that pulls multiple h264 and h265 streams via rtsp protocol for inference and visualizes perception results on the WEB.

Bug Fixes:

- [MIPI image capture](../02_quick_demo/demo_sensor.md) fixed `imx219` module startup failure.
- [Hand keypoint detection algorithm](../03_boxs/body/hand_lmk_detection.md) pre-processing adds hand box expansion to fix incorrect keypoint output.


### Version: 2.3.0 (2024-09-19)

New Features:

- Support for `RDK X5` platform.
- Data acquisition adds [stereo MIPI image capture](../02_quick_demo/demo_sensor.md) capability.
- Algorithm repository adds `yolov8` and `yolov10` [object detection](../03_boxs/detection/yolo.md), `yolov8-seg` [image segmentation](../03_boxs/segmentation/yolov8_seg.md) reference algorithms.
- Algorithm repository adds [YOLO-World algorithm](../03_boxs/detection/hobot_yolo_world.md) for open-vocabulary input detection.
- Algorithm repository adds [optical flow estimation algorithm](../03_boxs/function/mono_pwcnet.md) for optical flow detection.
- Algorithm repository adds [segment anything algorithm](../03_boxs/segmentation/mono_mobilesam.md) for universal segmentation.
- Algorithm repository adds [text-image feature retrieval algorithm](../03_boxs/function/hobot_clip.md) for text-image feature extraction and retrieval.
- Algorithm repository adds [stereo depth estimation algorithm](../03_boxs/spatial/hobot_stereonet.md) implementing vision-based depth estimation.


### Version: 2.2.0 (2024-04-11)

Changes:

- Based on TROS Foxy 2.1.3, adapted to Ubuntu 22.04 and ROS2 Humble.
- TROS installation path changed from `/opt/tros` to `/opt/tros/humble`, consistent with ROS2 installation path hierarchy and naming.
- No longer provides `tros-ros-base` package (includes rclcpp, rclpy, ros2cli and other ROS2 base packages); uses standard ROS2 distribution packages; installing TROS Humble automatically installs dependent ROS2 Humble.
- Uses ROS2 fastdds zero-copy communication for modules involving image data such as data acquisition, image codec, and algorithm examples.
- Zero-copy communication QoS Reliability changed from `RMW_QOS_POLICY_RELIABILITY_RELIABLE` (rclcpp::QoS()) to `RMW_QOS_POLICY_RELIABILITY_BEST_EFFORT` (rclcpp::SensorDataQoS()) to avoid potential stability risks when using zero-copy.
- Refactored `hobot_dnn` to use lower-level on-board inference framework `libdnn` instead of `easydnn`.
- `hobot_audio` upgraded speech algorithm SDK to use lower-level on-board inference framework `libdnn` instead of `easydnn`.
- `hobot_trigger` adapted to ROS2 Humble version rosbag2.

New Features:
- `robot_dev_config` added bloom build and packaging scripts for ARM platform TROS compilation and packaging.
- `hobot_mipi_cam` node added frame_ts_type configuration option, supporting realtime (for communication latency calculation) and sensor (default, for sensor timestamp synchronization) parameters.
- Added `hobot_shm` node for configuring ROS2 zero-copy environment.

Bug Fixes:
- Fixed compatibility issues introduced by compiler upgrade.
- Fixed path dependency issues in some ROS2 pkg on-board compilation.

## tros-foxy

### Version: 2.1.3 (2024-03-11)

Changes:

- JPEG compressed image data type changed from `sensor_msgs::msg::Image` to standard `sensor_msgs::msg::CompressedImage`, enabling tools such as foxglove and ros2 rqt to view TROS-published JPEG images. Affects hobot_websocket, hobot_codec, hobot_image_publisher, hobot_usb_cam modules.
- Unified use of jpeg/mjpeg configuration options for publishing/subscribing JPEG compressed images; removed jpeg-compressed/mjpeg-compressed configuration options. Affects hobot_codec and hobot_usb_cam modules.
- Introduced TROS_DISTRO environment variable to indicate TROS distribution. After running `source /opt/tros/setup.bash`/`source /opt/tros/local_setup.bash`, the `TROS_DISTRO` environment variable is empty. Configuration file paths for hobot_codec, hobot_audio, hobot_mipi_cam, hobot_usb_cam and other modules changed from `/opt/tros/lib` to `/opt/tros/${TROS_DISTRO}/lib`.


### Version: 2.1.2 (2024-01-19)

New Features:

- Refactored `hobot_usb_cam` with support for more format configurations and transcoding.
- `hobot_audio` updated speech SDK, supporting both 2mic and 4mic microphone boards; added micphone_name configuration for device ID.

Bug Fixes:

- `hobot_rgbd_cam` node fixed incorrect step field in sent data messages.
- `hobot_tts` updated audio playback function calls to fix playback failures on newer system versions.
- `hobot_llm` removed config device tree file and updated README; newer system versions can set ION memory size via command-line tools.

### Version: 2.1.1 (2023-11-03)

New Features:

- Added `hobot_chatbot` node that invokes intelligent speech, large language model, and text-to-speech modules to enable on-board voice chat.

Bug Fixes:

- Text-to-speech `hobot_tts` node fixed application exit caused by certain characters.

### Version: 2.1.0 (2023-09-14)

Changes:

- `tros-ros-base` updated to latest ROS2 foxy source, compatible with latest ROS2 foxy packages.
- Using ROS2 foxy packages only requires `source /opt/tros/setup.bash`; no longer need scripts to create symlinks.

New Features:

- Text-to-speech `hobot_tts` node added parameter to specify audio playback device.
- Added large language model `hobot_llm` node for on-device LLM experience.
- Image codec `hobot_codec` node configuration parameter `in_format` added `jpeg-compressed` option; subscribes to topic data type based on configuration option.

Bug Fixes:

- MIPI image capture `hobot_mipi_cam` node fixed incorrect step field in RGB format data messages.


### Version: 2.0.2 (2023-08-28)

Changes:

- ROS2 source configured during tros.b installation (`/etc/apt/sources.list.d/ros2.list`) changed to Tsinghua mirror, fixing slow and failed ROS2 package installation.

New Features:

- Added permission check when tros.b startup scripts configure the environment (`source /opt/tros/setup.bash` and `source /opt/tros/local_setup.bash`). If the current account lacks root permissions, automatically enters the process to switch to root account, fixing tros.b usage failures due to insufficient permissions.
- Intelligent speech algorithm `hobot_audio` node added audio device number parameter configuration for easier secondary development.
- Event trigger `hobot_trigger` node added ability to assign tasks to Trigger module via std_msg topics, standardizing Trigger configuration.

Bug Fixes:

- Fixed image acceleration processing `hobot_cv` node failure when performing crop&resize simultaneously.
- Fixed MIPI image capture `hobot_mipi_cam` node error log output at startup.
- Fixed invalid launch file configuration for data visualization message conversion `hobot_visualization` node.


### Version: 2.0-Release (2.0.1) (2023-06-10)

Changes:

- Upgraded speech algorithm to optimize ASR (Automatic Speech Recognition) performance.
- Optimized algorithm example `model_name` configuration option to automatically parse `model_name` from model files, fixing model loading failures caused by incorrect parameter configuration and improving ease of secondary development.
- tros.b installation package no longer includes nav2 packages; users install the latest ROS2 nav2 packages directly on RDK via apt, fixing stability issues in older nav2 versions.

New Features:

- Added `hobot_trigger` and `hobot_visalization` nodes for Trigger event triggering, rosbag data acquisition and visualization, helping users locate, reproduce, and visualize perception, planning, and control issues in robot scenarios. Users can also develop data triggering, recording, and real-time transmission capabilities.
- USB image capture node auto-adapts USB camera device numbers, lowering the barrier for USB camera usage.
- Added Visual Inertial Odometry (VIO) algorithm node for low-cost, robust, high-precision robot localization based on vision.
- Added text-to-speech `hobot_tts` node to convert text to speech for playback.
- Added LiDAR object detection algorithm `hobot_centerpoint` node.
- Added BEV perception algorithm `hobot_bev` node.
- Added stereo depth estimation algorithm `hobot_stereonet` node.

Bug Fixes:

- Upgraded `RDK X3` easydnn (version 1.6.1) and dnn (version 1.18.4), fixing operator crash issues and supporting more operators.
- Fixed incorrect depth data published by RGBD image capture node.

Other Updates:

- Optimized human detection and tracking algorithm node to adapt output perception result coordinates based on input image resolution.
- Fixed orb_slam3 algorithm compilation failure caused by incorrect compilation script path.


### Version: 2.0-Beta (2.0.0) (2023-05-29)

2.0-Beta (2.0.0) is the first 2.x version of tros.b. Users of [tros.b 1.x](https://developer.d-robotics.cc/api/v1/fileData/TogetherROS/index.html) are recommended to upgrade to 2.x.

Changes:

- Code hosting platform moved from Gitlab to GitHub for easier secondary development by more developers.
- Integrated more efficient package management to speed up version upgrades and simplify robot application installation.

New Features:

- Support for the new RDK X3 Module core board development kit.
- hobot_audio added ASR recognition result output for voice application development.

Bug Fixes:

- Fixed dnn_node built-in MobileNet_SSD model post-processing crash in multi-threaded scenarios.
- Fixed dnn_node DDR input model inference failure on X86 platform
- Fixed hobot_codec and hobot_image_publisher compilation failures on X86 platform.

Other Updates:

- Updated example launch scripts to reference dependent module launch scripts and configure parameters.
- websocket updated display-side D-Robotics logo.
