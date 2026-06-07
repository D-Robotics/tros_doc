---
sidebar_position: 5
sidebar_products: RDK-X5,RDK-S100
---

# Stereo Depth Algorithm

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 1. Overview

The D-Robotics stereo depth estimation algorithm takes stereo image data as input and outputs disparity and depth maps corresponding to the left view. Inspired by the IGEV network, it uses a GRU architecture with good data generalization and high inference efficiency.

Stereo algorithm code repository:https://github.com/D-Robotics/hobot_stereonet

MIPI camera code repository:https://github.com/D-Robotics/hobot_mipi_cam

ZED camera code repository:https://github.com/D-Robotics/hobot_zed_cam

Stereo algorithm tutorial: [Live Replay | RDK X5 AI Stereo Algorithm Deployment](https://www.bilibili.com/video/BV1KdEjzREMz/?share_source=copy_web&vd_source=deb3551e36cc4b1c1020033ad17c564b)

## 2. Supported Platforms

| Platform                  | System Support              | Example Features                                    |
| --------------------- | --------------------- | ------------------------------------------- |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | Start stereo camera, infer depth results, and display on Web |
| RDK S100, RDK S100P   | Ubuntu 22.04 (Humble) | Start stereo camera, infer depth results, and display on Web |

## 3. Model Versions

| Platform | Algorithm Version              | Quantization | Input Size    | Max Inference FPS | Model Description                                    |
| ---- | --------------------- | -------- | ----------- | ----------------- | ------------------------------------------- |
| X5   | V2.0                  | int16    | 640x352x3x2 | 15                | Legacy version                                    |
| X5   | V2.1                  | int16    | 640x352x3x2 | 15                | Legacy version with confidence output                      |
| X5   | V2.2                  | int8     | 640x352x3x2 | 23                | Legacy version                                    |
| X5   | V2.3                  | int8     | 640x352x3x2 | 27                | Legacy version, highest frame rate                          |
| X5   | V2.4_int16            | int16    | 640x352x3x2 | 15                | Current main version, high-precision depth estimation                  |
| X5   | V2.4_int8             | int8     | 640x352x3x2 | 23                | Current main version, high-frame-rate depth estimation                  |
| X5   | V2.5_int16            | int16    | 640x352x3x2 | 16                | Latest version, high-precision depth estimation                    |
| X5   | V2.5_int16_96         | int16    | 640x352x3x2 | 18                | Latest version, max search disparity 96                |
| X5   | V2.5_int16_544_448    | int16    | 544x448x3x2 | 15                | Latest version, 544×448 resolution                     |
| X5   | V2.5_int16_544_448_96 | int16    | 544x448x3x2 | 17                | Latest version, 544×448 resolution, max search disparity 96 |
| S100 | V2.1                  | int16    | 640x352x3x2 | 53                | Legacy version with confidence output                      |
| S100 | V2.4                  | int16    | 640x352x3x2 | 53                | Current main version with confidence output                    |

## 4. Preparation

### 4.1. RDK Platform

1. RDK has been flashed with RDK OS
2. TogetheROS.Bot has been successfully installed on RDK
3. For online inference, prepare a stereo camera. Multiple MIPI cameras and ZED mini/2i USB cameras are currently supported
4. For offline inference, prepare stereo image data
5. Confirm that the PC can access RDK over the network

### 4.2. System and Package Versions

|                                       | Version             | Query Method                                        |
| ------------------------------------- | ---------------- | ----------------------------------------------- |
| RDK X5 system image version                    | 3.3.3 and above      | `cat /etc/version`                              |
| RDK S100 system image version                  | 4.0.2-Beta and above | `cat /etc/version`                              |
| tros-humble-hobot-stereonet package version | 2.5.0 and above      | `apt list \| grep tros-humble-hobot-stereonet/` |
| tros-humble-mipi-cam package version        | 2.3.13 and above     | `apt list \| grep tros-humble-mipi-cam/`        |
| tros-humble-hobot-zed-cam package version   | 2.3.3 and above      | `apt list \| grep tros-humble-hobot-zed-cam/`   |

- If the system image version does not meet requirements, refer to the corresponding documentation section for image flashing
- If the package version does not meet requirements, run the following commands to update:

```bash
sudo apt update
sudo apt install --only-upgrade tros-humble-hobot-stereonet
sudo apt install --only-upgrade tros-humble-mipi-cam
sudo apt install --only-upgrade tros-humble-hobot-zed-cam
```

- If the above commands cannot update the program to the latest version, change the apt source file to the beta source:

```bash
# Switch to beta source, run the following commands:
sudo echo 'deb [signed-by=/usr/share/keyrings/sunrise.gpg] http://archive.d-robotics.cc/ubuntu-rdk-x5-beta  jammy main' | sudo tee /etc/apt/sources.list.d/sunrise.list
apt update

# To switch back to the official source, run the following commands:
sudo echo 'deb [signed-by=/usr/share/keyrings/sunrise.gpg] http://archive.d-robotics.cc/ubuntu-rdk-x5  jammy main' | sudo tee /etc/apt/sources.list.d/sunrise.list
apt update
```

<DocScope products="RDK-X5">

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_x_doc/en/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-what-to-do-if-apt-update-fails-eg-key-error-update-failure-lock-file-in-use) section `Q10: How to handle apt update command failure or error?` for resolution.**
:::
</DocScope>
<DocScope products="RDK-S100">

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_s_doc/en/FAQ/hardware_and_system?v=4.0.5&p=RDK+S100#q6-how-do-i-handle-apt-update-failures-or-errors) section `Q6: How to handle apt update command failure or error?` for resolution.**
:::

</DocScope>
## 5. Algorithm Startup

### 5.1. Important Notes (Must Read!!!)

:::caution **Note**
**Run the commands in this document as the `root` user. Other users may lack sufficient permissions and cause unnecessary errors.**
:::

![os_user](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/os_user.png)

### 5.2. MIPI Stereo Camera Installation

#### (1) 230AI MIPI Stereo Camera

- The official RDK 230AI MIPI stereo camera is shown below:

![RDK_Stereo_Cam_230ai](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/RDK_Stereo_Cam_230ai.png)

<p style={{ color: 'red' }}> Note: Check that the camera back silkscreen shows CDPxxx-V3/V4 to confirm V3 or V4 version </p>

- RDK X5 installation is shown below:

![RDK_X5_230ai](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/RDK_X5_230ai.png)

- RDK S100 installation is shown below. Note: set the S100 CAM daughter board DIP switches to `LPWM` and `3.3V`:

![RDK_S100_230ai](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/RDK_S100_230ai.png)

#### (2) 132GS MIPI Stereo Camera

- The official RDK 132GS MIPI stereo camera is shown below:

![RDK_Stereo_Cam_132gs](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/RDK_Stereo_Cam_132gs.png)

- RDK X5 installation is shown below:

![RDK_X5_132gs](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/RDK_X5_132gs.png)

- The latest cables have been upgraded. Note that cables are directional: CAM end connects to the camera, RDK end connects to the development board. (Both white and black cables work normally; either may be shipped randomly)

![RDK_X5_132gs_mipi](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/RDK_X5_132gs_mipi.png)

- RDK S100 installation is shown below. Note: set the S100 CAM daughter board DIP switches to `LPWM` and `3.3V`:

![RDK_S100_132gs](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/RDK_S100_132gs.png)

### 5.3. Online Startup Commands

#### (1) Verify Stereo Camera I2C Signal

- To verify 230AI stereo camera I2C signal, connect to RDK via SSH and run the following commands. If addresses such as 0x30, 0x32, 0x50 appear, the camera connection is normal:

```bash
# RDK X5
i2cdetect -r -y 4
i2cdetect -r -y 6

# RDK S100
i2cdetect -r -y 1
i2cdetect -r -y 2
```

![i2cdetect_230ai](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/i2cdetect_230ai.png)


- To verify 132GS stereo camera I2C signal, connect to RDK via SSH and run the following commands. If addresses such as 0x32, 0x33, 0x50 appear, the camera connection is normal:

```bash
# RDK X5
i2cdetect -r -y 4
i2cdetect -r -y 6

# RDK S100
i2cdetect -r -y 1
i2cdetect -r -y 2
```

![i2cdetect_132gs](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/i2cdetect_132gs.png)

:::caution **Note**
**If I2C signal cannot be detected, the camera will not work properly**
:::

#### (2) Verify Camera Streaming

- Method 1: If tros-humble-hobot-stereonet is installed, copy directly

```bash
cp -rv /opt/tros/humble/share/hobot_stereonet/script/run_cam.sh ./
```

- Method 2: Manually create startup script `run_cam.sh` with the following content

```bash
#!/bin/bash
source /opt/tros/humble/setup.bash

ros2 pkg prefix mipi_cam

image_width=1280
image_height=1088
framerate=30.0
rotation=90.0
gdc_enable=False
cal_rotation=90.0
lpwm_enable=True
frame_ts_type=realtime
out_format=nv12
channel=2
channel2=0
log_level=ERROR

while [[ $# -gt 0 ]]; do
  case $1 in
    --image_width) image_width=$2; shift 2 ;;
    --image_height) image_height=$2; shift 2 ;;
    --framerate) framerate=$2; shift 2 ;;
    --rotation) rotation=$2; shift 2 ;;
    --gdc_enable) gdc_enable=$2; shift 2 ;;
    --cal_rotation) cal_rotation=$2; shift 2 ;;
    --lpwm_enable) lpwm_enable=$2; shift 2 ;;
    --frame_ts_type) frame_ts_type=$2; shift 2 ;;
    --out_format) out_format=$2; shift 2 ;;
    --channel) channel=$2; shift 2 ;;
    --channel2) channel2=$2; shift 2 ;;
    --log_level) log_level=$2; shift 2 ;;
    *) echo "unknown param: $1"; exit 1 ;;
  esac
done

ros2 run mipi_cam mipi_cam --ros-args \
-p device_mode:=dual -p dual_combine:=1 \
-p image_width:=$image_width -p image_height:=$image_height \
-p framerate:=$framerate -p rotation:=$rotation \
-p gdc_enable:=$gdc_enable -p cal_rotation:=$cal_rotation \
-p lpwm_enable:=$lpwm_enable \
-p frame_ts_type:=$frame_ts_type \
-p out_format:=$out_format \
-p channel:=$channel -p channel2:=$channel2 \
--log-level $log_level
```

- Run the following commands:

<Tabs groupId="Stereo Cam">
<TabItem value="230AI" label="230AI">

```bash
bash run_cam.sh --image_width 1920 --image_height 1080 --rotation 0.0 --cal_rotation 0.0 --log_level INFO
```

</TabItem>
<TabItem value="132GS" label="132GS">

```bash
bash run_cam.sh --rotation 90.0 --log_level INFO
```

</TabItem>
</Tabs>

- Using 132GS camera on X5 as an example, a correctly started camera prints the following log (S100 or different camera models will print different logs):

![cam_run_success_log](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/cam_run_success_log.png)


- Log analysis:

I2C bus is the **control channel number**, used to configure sensor registers such as resolution, frame rate, and starting streaming. Image data does not go through I2C; I2C is only responsible for **control**.
The program checks whether the 4th and 6th I2C controllers on X5 can scan sensor addresses. The log detects addresses 0x32 and 0x30, corresponding to I2C bus-4 and I2C bus-6. You can also use `i2cdetect -r -y 4` mentioned above to scan sensor addresses.

mipi rx phy is the **image data channel number**. Image data captured by the camera is transmitted to the chip through this high-speed channel.
The log shows X5 has two mipi phy channels, numbered 0 and 2, corresponding to left and right cameras. These numbers can be set via the `channel` and `mipi_channel` parameters mentioned below to change the left/right image stitching order.


#### (3) Create Stereo Algorithm Startup Script

- Method 1: If tros-humble-hobot-stereonet is installed, copy directly

```bash
cp -rv /opt/tros/humble/share/hobot_stereonet/script/run_stereo.sh ./
```

- Method 2: Manually create startup script `run_stereo.sh` with the following content

```bash
#!/bin/bash
source /opt/tros/humble/setup.bash

ros2 pkg prefix mipi_cam
ros2 pkg prefix hobot_stereonet

rm -rfv performance_*.txt

# stereonet version
stereonet_version=v2.4_int16

# node name
stereo_node_name=StereoNetNode

# uncertainty
uncertainty_th=-0.10

# topic
stereo_image_topic=/image_combine_raw
camera_info_topic=/image_combine_raw/right/camera_info
left_camera_info_topic=/image_combine_raw/left/camera_info
depth_image_topic="~/stereonet_depth"
depth_camera_info_topic="~/stereonet_depth/camera_info"
rectify_left_camera_info_topic="~/rectify_left_image/camera_info"
rectify_right_camera_info_topic="~/rectify_right_image/camera_info"
pointcloud2_topic="~/stereonet_pointcloud2"
publish_pcd_enabled=True
rectify_left_image_topic="~/rectify_left_image"
rectify_right_image_topic="~/rectify_right_image"
publish_rectify_bgr=False
origin_left_image_topic="~/origin_left_image"
origin_right_image_topic="~/origin_right_image"
publish_origin_enable=True
visual_image_topic="~/stereonet_visual"
publish_visual_enabled=True
stereonet_frame_id="camera_link"

# mipi cam
use_mipi_cam=True
mipi_image_width=640
mipi_image_height=352
mipi_image_framerate=30.0
mipi_frame_ts_type=realtime
mipi_gdc_enable=True
mipi_lpwm_enable=True
mipi_rotation=90.0
mipi_channel=2
mipi_channel2=0
mipi_cal_rotation=0.0

# calib
calib_method=none
stereo_calib_file_path=calib.yaml

# render
render_type=distance
render_perf=True
render_max_disp=80
render_z_near=-1.0
render_z_range=3.0

# speckle filter
speckle_filter_enable=False
max_speckle_size=100
max_disp_diff=1.0

# pointcloud
pointcloud_height_min=-5.0
pointcloud_height_max=5.0
pointcloud_depth_max=5.0

# pcl filter
pcl_filter_enable=False
grid_size=0.1
grid_min_point_count=5

# thread
infer_thread_num=2
save_thread_num=4
max_save_task=50

# save
save_result_flag=False
save_dir=./result
save_freq=1
save_total=-1
save_stereo_flag=True
save_origin_flag=False
save_disp_flag=True
save_uncert_flag=False
save_depth_flag=True
save_visual_flag=True
save_pcd_flag=False

# local image
use_local_image_flag=False
local_image_dir=./offline
image_sleep=0

# camera intrinsic
camera_cx=0.0
camera_cy=0.0
camera_fx=0.0
camera_fy=0.0
baseline=0.0
doffs=0.0

# mask
left_img_mask_enable=False

# epipolar
epipolar_mode=False
epipolar_img=rect
chessboard_per_rows=20
chessboard_per_cols=11
chessboard_square_size=0.06
feature_epipolar_mode=False

# web
stereonet_pub_web=True
codec_sub_topic=/$stereo_node_name/stereonet_visual
codec_in_format=bgr8
codec_pub_topic=/image_jpeg
websocket_image_topic=/image_jpeg
websocket_channel=0

while [[ $# -gt 0 ]]; do
  case $1 in
    # stereonet version
    --stereonet_version) stereonet_version=$2; shift 2 ;;

    # node name
    --stereo_node_name) stereo_node_name=$2; shift 2 ;;

    # uncertainty
    --uncertainty_th) uncertainty_th=$2; shift 2 ;;

    # topic
    --stereo_image_topic) stereo_image_topic=$2; shift 2 ;;
    --camera_info_topic) camera_info_topic=$2; shift 2 ;;
    --left_camera_info_topic) left_camera_info_topic=$2; shift 2 ;;
    --depth_image_topic) depth_image_topic=$2; shift 2 ;;
    --rectify_left_camera_info_topic) rectify_left_camera_info_topic=$2; shift 2 ;;
    --rectify_right_camera_info_topic) rectify_right_camera_info_topic=$2; shift 2 ;;
    --depth_camera_info_topic) depth_camera_info_topic=$2; shift 2 ;;
    --pointcloud2_topic) pointcloud2_topic=$2; shift 2 ;;
    --publish_pcd_enabled) publish_pcd_enabled=$2; shift 2 ;;
    --rectify_left_image_topic) rectify_left_image_topic=$2; shift 2 ;;
    --rectify_right_image_topic) rectify_right_image_topic=$2; shift 2 ;;
    --publish_rectify_bgr) publish_rectify_bgr=$2; shift 2 ;;
    --origin_left_image_topic) origin_left_image_topic=$2; shift 2 ;;
    --origin_right_image_topic) origin_right_image_topic=$2; shift 2 ;;
    --publish_origin_enable) publish_origin_enable=$2; shift 2 ;;
    --visual_image_topic) visual_image_topic=$2; shift 2 ;;
    --publish_visual_enabled) publish_visual_enabled=$2; shift 2 ;;
    --stereonet_frame_id) stereonet_frame_id=$2; shift 2 ;;

    # mipi cam
    --use_mipi_cam) use_mipi_cam=$2; shift 2 ;;
    --mipi_image_width) mipi_image_width=$2; shift 2 ;;
    --mipi_image_height) mipi_image_height=$2; shift 2 ;;
    --mipi_image_framerate) mipi_image_framerate=$2; shift 2 ;;
    --mipi_frame_ts_type) mipi_frame_ts_type=$2; shift 2 ;;
    --mipi_gdc_enable) mipi_gdc_enable=$2; shift 2 ;;
    --mipi_lpwm_enable) mipi_lpwm_enable=$2; shift 2 ;;
    --mipi_rotation) mipi_rotation=$2; shift 2 ;;
    --mipi_channel) mipi_channel=$2; shift 2 ;;
    --mipi_channel2) mipi_channel2=$2; shift 2 ;;
    --mipi_cal_rotation) mipi_cal_rotation=$2; shift 2 ;;

    # calib
    --calib_method) calib_method=$2; shift 2 ;;
    --stereo_calib_file_path) stereo_calib_file_path=$2; shift 2 ;;

    # render
    --render_type) render_type=$2; shift 2 ;;
    --render_perf) render_perf=$2; shift 2 ;;
    --render_max_disp) render_max_disp=$2; shift 2 ;;
    --render_z_near) render_z_near=$2; shift 2 ;;
    --render_z_range) render_z_range=$2; shift 2 ;;

    # speckle filter
    --speckle_filter_enable) speckle_filter_enable=$2; shift 2 ;;
    --max_speckle_size) max_speckle_size=$2; shift 2 ;;
    --max_disp_diff) max_disp_diff=$2; shift 2 ;;

    # pointcloud
    --pointcloud_height_min) pointcloud_height_min=$2; shift 2 ;;
    --pointcloud_height_max) pointcloud_height_max=$2; shift 2 ;;
    --pointcloud_depth_max) pointcloud_depth_max=$2; shift 2 ;;

    # pcl filter
    --pcl_filter_enable) pcl_filter_enable=$2; shift 2 ;;
    --grid_size) grid_size=$2; shift 2 ;;
    --grid_min_point_count) grid_min_point_count=$2; shift 2 ;;

    # thread
    --infer_thread_num) infer_thread_num=$2; shift 2 ;;
    --save_thread_num) save_thread_num=$2; shift 2 ;;
    --max_save_task) max_save_task=$2; shift 2 ;;

    # save
    --save_result_flag) save_result_flag=$2; shift 2 ;;
    --save_dir) save_dir=$2; shift 2 ;;
    --save_freq) save_freq=$2; shift 2 ;;
    --save_total) save_total=$2; shift 2 ;;
    --save_stereo_flag) save_stereo_flag=$2; shift 2 ;;
    --save_origin_flag) save_origin_flag=$2; shift 2 ;;
    --save_disp_flag) save_disp_flag=$2; shift 2 ;;
    --save_uncert_flag) save_uncert_flag=$2; shift 2 ;;
    --save_depth_flag) save_depth_flag=$2; shift 2 ;;
    --save_visual_flag) save_visual_flag=$2; shift 2 ;;
    --save_pcd_flag) save_pcd_flag=$2; shift 2 ;;

    # local image
    --use_local_image_flag) use_local_image_flag=$2; shift 2 ;;
    --local_image_dir) local_image_dir=$2; shift 2 ;;
    --image_sleep) image_sleep=$2; shift 2 ;;

    # camera intrinsic
    --camera_cx) camera_cx=$2; shift 2 ;;
    --camera_cy) camera_cy=$2; shift 2 ;;
    --camera_fx) camera_fx=$2; shift 2 ;;
    --camera_fy) camera_fy=$2; shift 2 ;;
    --baseline) baseline=$2; shift 2 ;;
    --doffs) doffs=$2; shift 2 ;;

    # mask
    --left_img_mask_enable) left_img_mask_enable=$2; shift 2 ;;

    # epipolar
    --epipolar_mode) epipolar_mode=$2; shift 2 ;;
    --epipolar_img) epipolar_img=$2; shift 2 ;;
    --chessboard_per_rows) chessboard_per_rows=$2; shift 2 ;;
    --chessboard_per_cols) chessboard_per_cols=$2; shift 2 ;;
    --chessboard_square_size) chessboard_square_size=$2; shift 2 ;;

    # web
    --stereonet_pub_web) stereonet_pub_web=$2; shift 2 ;;
    --codec_sub_topic) codec_sub_topic=$2; shift 2 ;;
    --codec_in_format) codec_in_format=$2; shift 2 ;;
    --codec_pub_topic) codec_pub_topic=$2; shift 2 ;;
    --websocket_image_topic) websocket_image_topic=$2; shift 2 ;;
    --websocket_channel) websocket_channel=$2; shift 2 ;;

    *) echo "unknown param: $1"; exit 1 ;;
  esac
done

ros2 launch hobot_stereonet stereonet_model_web_visual_$stereonet_version.launch.py \
stereo_node_name:=$stereo_node_name \
uncertainty_th:=$uncertainty_th \
stereo_image_topic:=$stereo_image_topic camera_info_topic:=$camera_info_topic left_camera_info_topic:=$left_camera_info_topic \
depth_image_topic:=$depth_image_topic depth_camera_info_topic:=$depth_camera_info_topic \
rectify_left_camera_info_topic:=$rectify_left_camera_info_topic rectify_right_camera_info_topic:=$rectify_right_camera_info_topic \
pointcloud2_topic:=$pointcloud2_topic publish_pcd_enabled:=$publish_pcd_enabled \
rectify_left_image_topic:=$rectify_left_image_topic rectify_right_image_topic:=$rectify_right_image_topic publish_rectify_bgr:=$publish_rectify_bgr \
origin_left_image_topic:=$origin_left_image_topic origin_right_image_topic:=$origin_right_image_topic publish_origin_enable:=$publish_origin_enable \
visual_image_topic:=$visual_image_topic publish_visual_enabled:=$publish_visual_enabled \
use_mipi_cam:=$use_mipi_cam mipi_image_width:=$mipi_image_width mipi_image_height:=$mipi_image_height \
mipi_image_framerate:=$mipi_image_framerate mipi_frame_ts_type:=$mipi_frame_ts_type \
mipi_gdc_enable:=$mipi_gdc_enable mipi_lpwm_enable:=$mipi_lpwm_enable mipi_rotation:=$mipi_rotation \
mipi_channel:=$mipi_channel mipi_channel2:=$mipi_channel2 mipi_cal_rotation:=$mipi_cal_rotation \
calib_method:=$calib_method stereo_calib_file_path:=$stereo_calib_file_path \
render_type:=$render_type render_perf:=$render_perf render_max_disp:=$render_max_disp render_z_near:=$render_z_near render_z_range:=$render_z_range \
speckle_filter_enable:=$speckle_filter_enable max_speckle_size:=$max_speckle_size max_disp_diff:=$max_disp_diff \
pointcloud_height_min:=$pointcloud_height_min pointcloud_height_max:=$pointcloud_height_max pointcloud_depth_max:=$pointcloud_depth_max \
pcl_filter_enable:=$pcl_filter_enable grid_size:=$grid_size grid_min_point_count:=$grid_min_point_count \
infer_thread_num:=$infer_thread_num save_thread_num:=$save_thread_num max_save_task:=$max_save_task \
use_local_image_flag:=$use_local_image_flag local_image_dir:=$local_image_dir image_sleep:=$image_sleep \
save_result_flag:=$save_result_flag save_dir:=$save_dir save_freq:=$save_freq save_total:=$save_total save_stereo_flag:=$save_stereo_flag \
save_origin_flag:=$save_origin_flag save_disp_flag:=$save_disp_flag save_uncert_flag:=$save_uncert_flag save_depth_flag:=$save_depth_flag \
save_visual_flag:=$save_visual_flag save_pcd_flag:=$save_pcd_flag \
use_local_image_flag:=$use_local_image_flag local_image_dir:=$local_image_dir image_sleep:=$image_sleep \
camera_cx:=$camera_cx camera_cy:=$camera_cy camera_fx:=$camera_fx camera_fy:=$camera_fy baseline:=$baseline doffs:=$doffs \
left_img_mask_enable:=$left_img_mask_enable \
epipolar_mode:=$epipolar_mode epipolar_img:=$epipolar_img \
chessboard_per_rows:=$chessboard_per_rows chessboard_per_cols:=$chessboard_per_cols chessboard_square_size:=$chessboard_square_size \
feature_epipolar_mode:=$feature_epipolar_mode \
stereonet_pub_web:=$stereonet_pub_web codec_sub_topic:=$codec_sub_topic codec_in_format:=$codec_in_format \
codec_pub_topic:=$codec_pub_topic websocket_image_topic:=$websocket_image_topic websocket_channel:=$websocket_channel
```

#### (4) Run Stereo Algorithm Startup Command

- Connect to RDK via SSH and run the following commands to start the algorithm:

<Tabs groupId="RDK">
<TabItem value="RDK X5" label="RDK X5">

```bash
# With 230AI camera
bash run_stereo.sh --mipi_rotation 0.0

# With 132GS camera
bash run_stereo.sh

# Note:
# Check whether the RGB image on the web page is from the left camera; cover the left camera lens to verify
# If left/right camera order is incorrect, adjust using one of two methods:
# Method 1: Swap MIPI cables
# Method 2: Add parameters to the run command: --mipi_channel 0 --mipi_channel2 2 or --mipi_channel 2 --mipi_channel2 0, and see which produces correct results
```

</TabItem>
<TabItem value="RDK S100" label="RDK S100">

```bash
# With 230AI camera
bash run_stereo.sh --stereonet_version v2.4 --mipi_rotation 0.0

# With 132GS camera
bash run_stereo.sh --stereonet_version v2.4

# S100 also supports high-resolution models. Using 132GS camera as an example, startup command:
bash run_stereo.sh --stereonet_version v2.4_1280_704 --mipi_image_width 1280 --mipi_image_height 704

# Note:
# Check whether the RGB image on the web page is from the left camera; cover the left camera lens to verify
# If left/right camera order is incorrect, adjust using one of two methods:
# Method 1: Swap MIPI cables
# Method 2: Add parameters --mipi_channel 0 --mipi_channel2 1 or --mipi_channel 1 --mipi_channel2 0 to the run command above, and see which produces the correct result
```

</TabItem>
</Tabs>

:::caution **Note**
**If the program does not start correctly, use `ros2 topic list -v` to check whether topics corresponding to `stereo_image_topic` and `camera_info_topic` exist**

**If the program starts correctly but depth quality is poor, verify: 1. Left/right image stitching order is top-left and bottom-right; 2. Refer below to confirm left/right images meet epipolar alignment requirements**
:::

- Left/right camera definition. <span style={{ color: 'red' }}> Confirm that the RGB image displayed on the web page below is captured by the left camera </span>:

![230ai_left_right_cam](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/230ai_left_right_cam.png)

- After successful stereo algorithm startup, the following log is printed. `fx/fy/cx/cy/baseline` are camera intrinsics; `fps` is the algorithm running frame rate:

![stereonet_run_success_log](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/stereonet_run_success_log.png)

- View RGB and depth images via the web page. Enter http://ip:8000 in a browser (RDK IP in the figure is 192.168.1.100):

![web_depth_visual](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/web_depth_visual.png)

- View point cloud via rviz2. rviz2 can be installed directly on RDK. Note the following rviz2 configuration:

```bash
# Install rviz2
sudo apt install ros-humble-rviz2
# Start rviz2
source /opt/tros/humble/setup.bash
rviz2
```

![stereonet_rviz](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/stereonet_rviz.png)


#### (5) Parameter Definitions

The `run_stereo.sh` script has many configurable parameters. Common parameter definitions are introduced below; refer to source code comments for others:

- stereonet_version controls which algorithm version to launch
  - RDK X5 can be set to `v2.0`, `v2.1`, `v2.2`, `v2.3`, `v2.4_int16`, `v2.4_int8`, `v2.5_int16`, `v2.5_int16_96`, `v2.5_int16_544_448`, `v2.5_int16_544_448_96`
  - RDK S100 can be set to `v2.1`, `v2.4`, `v2.4_1280_704`
- stereo_node_name controls the ROS node name
- uncertainty_th is the confidence threshold. Only effective for models with confidence output when set to a positive value. If enabling, recommended value is `0.10`
- stereo_image_topic/camera_info_topic are topic names the ROS node subscribes to: stereo image and corresponding camera parameters
- depth_image_topic/pointcloud2_topic/visual_image_topic etc. control ROS node published topic names

- mipi_image_width, mipi_image_height, mipi_image_framerate control camera resolution and frame rate
- mipi_gdc_enable controls GDC rectification. The camera reads EEPROM-stored parameters for distortion correction. Currently shipped cameras include factory calibration parameters
- mipi_lpwm_enable controls hardware synchronization so left/right image timestamps are consistent. If False, software sync is used with larger sync error
- mipi_rotation controls image rotation. 132GS camera CMOS is mounted with 90° rotation; set this parameter to `90.0`
- mipi_channel and mipi_channel2 swap left/right image output order

- calib_method controls rectification method
  - When `mipi_gdc_enable:=True`, the `hobot_mipi_cam` package has already rectified images; `hobot_stereonet` does not need further rectification. Set calib_method to `none`
  - When `mipi_gdc_enable:=False`, or when the camera cannot rectify images, set calib_method to `custom` and specify `stereo_calib_file_path`
- stereo_calib_file_path controls the path to custom calibration parameters

- render_type controls rendering mode. Default is `distance`, which auto-renders pseudocolor based on depth for web display. Can be set to `indoor` or `outdoor`; `indoor` is not recommended
- render_perf controls whether CPU, BPU usage, latency, and FPS are shown on rendered images. Can be `True` or `False`

- speckle_filter_enable controls speckle filter. Can be `True` or `False`
- max_speckle_size controls speckle size. Speckles smaller than this are filtered. Larger values mean stronger filtering
- max_disp_diff controls disparity difference threshold within speckles. Neighboring pixels below this threshold are grouped into the same speckle. Smaller values mean stronger filtering

- pointcloud_height_min/pointcloud_height_max/pointcloud_depth_max control point cloud display range in meters

- pcl_filter_enable controls point cloud filtering. Can be `True` or `False`
- grid_size controls grid size for point cloud filtering in meters
- grid_min_point_count controls minimum points per grid cell; cells with fewer points are filtered

- save_result_flag controls whether to save results. When enabled, saves **camera parameters, raw left/right images, rectified left/right images, disparity map, depth map, point cloud**
- save_dir controls save directory (created automatically if missing). Ensure sufficient space or saving will fail
- save_freq controls save frequency. For example, 4 means save once every 4 frames
- save_total controls total saves. -1 means save continuously; 100 means stop after 100 frames

- use_local_image_flag controls offline inference
- local_image_dir controls local image directory for offline inference

- epipolar_mode controls chessboard-based epipolar alignment detection
- epipolar_img controls whether to use `origin` raw image or `rect` rectified image
- chessboard_per_rows/chessboard_per_cols/chessboard_square_size control inner corner counts and square size (meters)
- feature_epipolar_mode controls ORB feature-based epipolar alignment detection 

- infer_thread_num controls inference thread count. Default is 2 threads: higher FPS but larger latency. Set to 1 for lower FPS but lower latency

- stereonet_pub_web controls whether to publish visualization images to the web

#### (6) Save One Frame

- After successful startup, open another terminal and run the following to save one frame:

```bash
source /opt/tros/humble/setup.bash

# First check whether the node is running normally; note whether ROS_DOMAIN_ID is set or node name changed
ros2 node list

# If /StereoNetNode is running normally, run the following to save one frame
# Set save directory (absolute path recommended; created automatically if missing)
ros2 param set /StereoNetNode save_dir /root/online_once
# Save one frame (can be repeated)
ros2 param set /StereoNetNode save_result_once true
```

#### (7) Save Batch Data

- Method 1: Specify parameters at startup

```bash
# With 230AI camera
bash run_stereo.sh --mipi_rotation 0.0 \
--save_result_flag True --save_dir /root/online_batch \
--save_freq 1 --save_total -1 \
--save_stereo_flag True --save_origin_flag False \
--save_disp_flag True --save_uncert_flag False \
--save_depth_flag True --save_visual_flag True \
--save_pcd_flag False

# With 132GS camera
bash run_stereo.sh \
--save_result_flag True --save_dir /root/online_batch \
--save_freq 1 --save_total -1 \
--save_stereo_flag True --save_origin_flag False \
--save_disp_flag True --save_uncert_flag False \
--save_depth_flag True --save_visual_flag True \
--save_pcd_flag False

# S100 requires model version, e.g. add --stereonet_version v2.4
# save_stereo_flag    Save stereo image fed to the algorithm for inference
# save_origin_flag    Save raw stereo images not fed to inference (e.g. unrectified or resolution-mismatched images after preprocessing)
# save_disp_flag      Save disparity map
# save_uncert_flag    Save confidence map (only supported by models with confidence output)
# save_depth_flag     Save depth map
# save_visual_flag    Save web-rendered visualization
# save_pcd_flag       Save point cloud data
```

![stereonet_save_log](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/stereonet_save_log.png)

![stereonet_save_files](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/stereonet_save_files.png)

- Method 2: After successful startup, open another terminal and run the following to save data

```bash
source /opt/tros/humble/setup.bash

# First check whether the node is running normally; note whether ROS_DOMAIN_ID is set or node name changed
ros2 node list

# If /StereoNetNode is running normally, run the following to save data
# Set save directory (absolute path recommended; created automatically if missing)
ros2 param set /StereoNetNode save_dir /root/online_batch
# Set total save count
ros2 param set /StereoNetNode save_total 10
# Set save frequency
ros2 param set /StereoNetNode save_freq 1

# Set save content as needed
ros2 param set /StereoNetNode save_stereo_flag true   # 保存双目图像，该图像会输入算法进行推理
ros2 param set /StereoNetNode save_origin_flag true   # 保存双目原始图像，该图像不会最终输入算法推理，比如没有矫正的图、和算法模型分辨率不匹配的图，会进行预处理，得到最终可以输入算法的图像
ros2 param set /StereoNetNode save_disp_flag true     # 保存视差图
ros2 param set /StereoNetNode save_uncert_flag true   # 保存置信度图，只有带置信度的模型支持
ros2 param set /StereoNetNode save_depth_flag true    # 保存深度图
ros2 param set /StereoNetNode save_visual_flag true   # 保存web端渲染的可视化图
ros2 param set /StereoNetNode save_pcd_flag true      # 保存点云数据

# Execute save command
ros2 param set /StereoNetNode save_result_flag true

# To continue saving after completion, run the following two commands again
# Reset total save count
ros2 param set /StereoNetNode save_total 10
# Execute save command
ros2 param set /StereoNetNode save_result_flag true
```

#### (8) Enable Epipolar Alignment Detection Mode

Poor depth quality may be due to incorrect left/right stitching order or lack of epipolar alignment between left/right images.
Stereo algorithms require strict epipolar alignment; left/right epipolar error should generally be less than `1 pixel`.

This program provides two epipolar alignment detection methods: chessboard calibration board (stricter, recommended);
and ORB feature-based method (no calibration board needed, runs in texture-rich scenes, but epipolar error may be larger).

- Chessboard-based epipolar alignment detection startup command (X5 with 132GS camera example):

```bash
# X5 with 132GS camera; for S100 or other cameras refer to parameter settings above
# Note chessboard parameters: example uses 20 inner corners per row, 11 per column, 0.06m square size
bash run_stereo.sh --epipolar_mode True \
--chessboard_per_rows 20 --chessboard_per_cols 11 --chessboard_square_size 0.06
```

After successful startup, the following image appears on the web:

![epipolar_mode](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/epipolar_mode.jpg)

For chessboard-based detection, epipolar and reprojection errors should both be within `1 pixel` for qualified stereo images; otherwise calibration parameters are incorrect

- ORB feature-based epipolar alignment detection startup command (X5 with 132GS camera example):

```bash
# X5 with 132GS camera; for S100 or other cameras refer to parameter settings above
bash run_stereo.sh --feature_epipolar_mode True
```

After successful startup, the following image appears on the web:

![feature_epipolar_mode](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/feature_epipolar_mode.png)

ORB feature-based detection is less strict. Empirically, for 640×352 images epipolar error should be less than `1 pixel`; for 1280×1088 images less than `2 pixel` for qualified stereo images


### 5.4. Offline Startup Commands

#### (1) Prepare Offline Images

- To evaluate algorithm performance with local images, prepare the following data and upload to RDK:

1. **Undistorted, epipolar-aligned** left/right images in png or jpg format. Name images according to rules: left images must contain `left`, right images must contain `right`. The algorithm iterates through images by index until all are processed:

![stereonet_rdk](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/image_format.png)

2. Camera intrinsic file saved in the image directory as `camera_intrinsic.txt`. Reference content:
```bash
# fx fy cx cy baseline(m)
215.762581 215.762581 325.490113 173.881556 0.079957
```

#### (2) Run Startup Command

- Connect to RDK via SSH and run the following commands:

<Tabs groupId="RDK">
<TabItem value="RDK X5" label="RDK X5">

```bash
bash run_stereo.sh \
--use_local_image_flag True --local_image_dir <offline_image_path> \
--save_result_flag True --save_dir <result_save_path> \
--save_stereo_flag True --save_origin_flag False \
--save_disp_flag True --save_uncert_flag False \
--save_depth_flag True --save_visual_flag True \
--save_pcd_flag True

# If web display is too fast, add --image_sleep 2000 to control pause time
```

</TabItem>
<TabItem value="RDK S100" label="RDK S100">

```bash
bash run_stereo.sh --stereonet_version v2.4 \
--use_local_image_flag True --local_image_dir <offline_image_path> \
--save_result_flag True --save_dir <result_save_path> \
--save_stereo_flag True --save_origin_flag False \
--save_disp_flag True --save_uncert_flag False \
--save_depth_flag True --save_visual_flag True \
--save_pcd_flag True

# If web display is too fast, add --image_sleep 2000 to control pause time
```

</TabItem>
</Tabs>

- After successful startup, the following log is printed

![stereonet_offline_log](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/stereonet_offline_log.png)

- View RGB and depth images via web. Enter http://ip:8000 in browser (RDK IP in figure is 192.168.128.10):

![web_depth_visual_offline](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/web_depth_visual_offline.png)

### 5.5. Running with ZED Camera

#### (1) ZED Camera Installation

- ZED stereo camera is shown below:

![zed_cam](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/zed_cam.png)

- Connect ZED camera to RDK via USB

#### (2) Startup Commands

- First, start ZED camera. Connect to RDK via SSH; X5 and S100 use the same commands:

```bash
source /opt/tros/humble/setup.bash

ros2 launch hobot_zed_cam zed_cam_node.launch.py \
resolution:=720p \
need_rectify:=true dst_width:=640 dst_height:=352
```

Parameter description:

| Parameter         | Description                                                               |
| ------------ | ------------------------------------------------------------------ |
| resolution   | ZED raw output resolution with distortion. 720p means 1280×720; can be set to 1080p |
| need_rectify | Whether final output images need rectification                                     |
| dst_width    | Final rectified output width is 640×352                                |
| dst_height   | Final rectified output height is 640×352                                |

<p style={{ color: 'red' }}> Note: RDK must be online when running ZED camera, as ZED requires internet to download calibration files </p>


![stereonet_zed_run_success_log](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/stereonet_zed_run_success_log.png)

When online, the program automatically downloads calibration files. If RDK is offline, manually download and upload calibration files to RDK.
Based on log info, open a browser on PC and visit (https://calib.stereolabs.com/?SN=38085162) to download calibration file SN38085162.conf.
Note each ZED has a different SN. Download the corresponding calibration file based on error messages and upload to `/root/zed/settings/` (create directory if missing).

- Then start the stereo algorithm in another terminal:

```bash
bash run_stereo.sh --use_mipi_cam False --camera_info_topic /image_combine_raw/camera_info
```

- View depth map via web at http://ip:8000 (ip is RDK IP). For **point cloud** and **save images**, refer to corresponding settings above

## 6. Package Topic Description

### 6.1. Subscribed Topics

| Default Name (Configurable)                         | Message Type                     | Description                                       |
| -------------------------------------------- | ---------------------------- | ------------------------------------------ |
| /image_combine_raw                           | sensor_msgs::msg::Image      | Vertically stacked left/right images for model inference         |
| /image_combine_raw/right/camera_info (optional) | sensor_msgs::msg::CameraInfo | Camera calibration parameters for disparity/depth conversion |

### 6.2. Published Topics

| Default Name (Configurable)                 | Message Type                      | Description                 |
| ------------------------------------ | ----------------------------- | -------------------- |
| /StereoNetNode/stereonet_depth       | sensor_msgs::msg::Image       | Depth image in millimeters |
| /StereoNetNode/stereonet_visual      | sensor_msgs::msg::Image       | Visualization rendered image       |
| /StereoNetNode/stereonet_pointcloud2 | sensor_msgs::msg::PointCloud2 | Point cloud in meters        |
| /StereoNetNode/rectify_left_image    | sensor_msgs::msg::Image       | Rectified left image fed to algorithm |
| /StereoNetNode/rectify_right_image   | sensor_msgs::msg::Image       | Rectified right image fed to algorithm |
| /StereoNetNode/origin_left_image     | sensor_msgs::msg::Image       | Raw left image, not fed to algorithm |
| /StereoNetNode/origin_right_image    | sensor_msgs::msg::Image       | Raw right image, not fed to algorithm |









