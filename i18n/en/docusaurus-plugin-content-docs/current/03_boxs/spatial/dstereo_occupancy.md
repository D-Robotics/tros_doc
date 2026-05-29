---
sidebar_position: 6
sidebar_products: RDK-X5,RDK-S100
---

# Stereo OCC Algorithm

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Overview

The **D-Robotics Stereo OCC Algorithm** subscribes to stereo images, runs inference on the BPU, and publishes occupancy grid information.

Stereo OCC algorithm code repository: https://github.com/D-Robotics/dstereo_occnet

ZED camera code repository: https://github.com/D-Robotics/hobot_zed_cam

## Supported Platforms

| Platform                  | System Support              | Example Features                                                   |
| --------------------- | --------------------- | ---------------------------------------------------------- |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | Start stereo camera; display stereo images via Web; display occupancy grid results via rviz2 |
| RDK S100, RDK S100P   | Ubuntu 22.04 (Humble) | Start stereo camera; display stereo images via Web; display occupancy grid results via rviz2 |

## Algorithm Information

| Model          | Platform | Input Size    | Inference FPS |
| ------------- | ---- | ----------- | ------------- |
| DStereoOccNet | X5   | 2x3x352x640 | 6             |
| DStereoOccNet | S100 | 2x3x352x640 | 45            |

## Preparation

### RDK Platform

1. RDK has been flashed with RDK OS.

2. TogetheROS.Bot has been successfully installed on RDK.

3. For real-time online inference, only the ZED-2i camera is currently supported. For offline inference, please prepare <strong style={{ color: 'red' }}>rectified</strong> stereo image data.

4. Confirm that the PC can access RDK over the network.

### System and Package Versions

|                          | Version Requirement         | Query Method                                       |
| ------------------------ | ---------------- | ---------------------------------------------- |
| RDK X5 system image version       | 3.3.1 and above      | `cat /etc/version`                             |
| RDK S100 system image version     | 4.0.2-Beta and above | `cat /etc/version`                             |
| dstereo_occnet package version | 1.0.1 and above      | `apt list \| grep tros-humble-dstereo-occnet/` |
| hobot_zed_cam            | 2.3.3 and above      | `apt list \| grep tros-humble-hobot-zed-cam/`  |

## Usage

### 1. With ZED-2i Camera

- Must be used together with the hobot_zed_cam package

- Execute the following command on RDK (supported on both X5 and S100):

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

```bash
# 启动ZED-2i相机和占用网络推理程序
ros2 launch dstereo_occnet zed2i_occ_node.launch.py
```

- After the program starts, you can view stereo images published by ZED-2i via the web page. Enter `http://ip:8000` in a PC browser to view stereo images, where ip is the RDK board IP (e.g., `192.168.128.10` in the example). Ensure the PC and RDK can communicate over the network.

![ZED-2i-stereo-img](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/ZED-2i-stereo-img.png)

- After the program starts, you can view the occupancy grid via rviz2. rviz2 can be installed directly on RDK. Note the following rviz2 configuration:

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

```bash
# 安装rviz2
sudo apt install ros-humble-rviz2
# 启动rviz2
rviz2
```

![rviz2-occ](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/rviz2-occ.png)

- To save results, add the following parameters. `save_occ_flag` enables saving, `save_occ_dir` controls the save directory (created automatically if it does not exist), `save_freq` controls save frequency, and `save_total` controls the total number of saves:

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

```bash
# 启动ZED-2i相机和占用网络推理程序
ros2 launch dstereo_occnet zed2i_occ_node.launch.py \
save_occ_flag:=True save_occ_dir:=./occ_result save_freq:=4 save_total:=10
```

### 2. Offline Inference with Custom Data

- Prepare offline data and upload it to the RDK board. The offline data format is as follows:
    - The offline directory must contain left and right images. The program checks that left images contain the `left` field (png or jpg format) and right images contain the `right` field with the same naming as the left images.
    - Image resolution must be `640*352`; other resolutions are not supported.
    - Left and right images must be rectified to achieve epipolar alignment.
    - Since the model is currently trained with ZED-2i data, try to make offline image intrinsics close to ZED-2i. ZED-2i camera parameters are: `fx=354.9999, fy=354.9999, cx=322.9469, cy=176.2076, baseline=0.12`

![stereonet_rdk](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/image_format.png)

- Execute the following command on RDK (supported on both X5 and S100). `local_image_dir` controls the offline data directory. `save_occ_flag` enables saving, and `save_occ_dir` controls the save directory (created automatically if it does not exist):

```bash
ros2 launch dstereo_occnet offline_infer_web_visual.launch.py \
local_image_dir:=./offline_images save_occ_flag:=True save_occ_dir:=./offline_result
```

- After the program starts, you can also view stereo images published by ZED-2i via the web page and view the occupancy grid via rviz2.

## Package Description

### Parameters

| Name                | Parameter Value                                         | Description                                                            |
| ------------------- | ---------------------------------------------- | --------------------------------------------------------------- |
| stereo_msg_topic    | Default /image_combine_raw                        | Subscribed stereo image topic name                                          |
| camera_info_topic   | Default /image_combine_raw/camera_info            | Subscribed camera intrinsic topic name                                          |
| occ_model_file_path | Default X5-OCC-32x64x96x2_constinput_modified.bin | Path to the stereo occupancy network model                                          |
| use_local_image     | Default False                                     | Whether to use offline inference                                                |
| local_image_dir     | Default config                                    | Directory for offline inference images                                          |
| save_occ_flag       | Default False                                     | Whether to save inference results                                                |
| save_occ_dir        | Default ./occ_results                             | Directory for saving inference results                                              |
| save_freq           | Default 1                                         | Save frequency. For example, 4 means save once every 4 frames. Default saves every inference result |
| save_total          | Default -1                                        | Total number of saves. For example, 10 means save 10 frames total; -1 means save continuously      |
| voxel_size          | Default 0.02                                      | Size of each occupancy grid cell in meters. 0.02 means each cell is 2×2×2 cm      |
| log_level           | Default INFO                                      | Log level. Default is INFO                                              |

### Subscribed Topics

| Topic Name                       | Message Type                     | Description                                                                                                     |
| ------------------------------ | ---------------------------- | -------------------------------------------------------------------------------------------------------- |
| /image_combine_raw             | sensor_msgs::msg::Image      | Subscribed stereo image. Image format is NV12, vertically stacked with left image on top and right image on bottom. Can be modified via the stereo_msg_topic parameter |
| /image_combine_raw/camera_info | sensor_msgs::msg::CameraInfo | Subscribed camera intrinsics. Optional—not required. When available, camera parameters can be saved together with results                         |

### Published Topics

| Name                       | Message Type                      | Description                                  |
| -------------------------- | ----------------------------- | ------------------------------------- |
| /dstereo_occnet_node/voxel | sensor_msgs::msg::PointCloud2 | Published occupancy grid data, which can be displayed using rviz2 |
