---
sidebar_position: 3
sidebar_products: RDK-X3,RDK-X5
---

# 5.4.3 Pose Detection

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Overview

The pose detection App subscribes to image messages published by the camera, detects human keypoints, analyzes human pose, and publishes pose events.

Pose events are published using a custom algorithm message type. Users can subscribe to this topic for application development.

Currently, only fall detection is supported, which detects whether a person has fallen.

Code repository: (https://github.com/D-Robotics/hobot_falldown_detection)

## Supported Platforms

| Platform     | Runtime Environment     | Example Functionality                       |
| -------- | ------------ | ------------------------------ |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | Start MIPI/USB camera to capture images, perform human keypoint detection and pose detection, display images and algorithm results via Web, and publish pose events |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | Start MIPI/USB camera to capture images, perform human keypoint detection and pose detection, display images and algorithm results via Web, and publish pose events |
## Preparation

### RDK Platform

1. The RDK has been flashed with the Ubuntu system image.

2. TogetheROS.Bot has been successfully installed on the RDK.

3. Ensure the PC and RDK are on the same network segment, with the first three octets of the IP address matching.

4. A MIPI or USB camera has been installed on the RDK.

## Usage

### RDK Platform

The pose detection package subscribes to data published by the human keypoint detection package, performs algorithm inference, and publishes algorithm messages. The websocket package renders and displays the published images and algorithm results in a PC browser.

Tip: When testing the App, rotate the camera 90 degrees to simulate a person falling.

**Publish images using MIPI camera**

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


```shell
# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .

# 配置MIPI摄像头
export CAM_TYPE=mipi

# 启动launch文件
ros2 launch hobot_falldown_detection hobot_falldown_detection.launch.py
```

**Publish images using USB camera**

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


```shell
# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_body_detection/config/ .

# 配置USB摄像头
export CAM_TYPE=usb

# 启动launch文件
ros2 launch hobot_falldown_detection hobot_falldown_detection.launch.py
```

For parameter descriptions in the run commands, refer to the README.md in the hobot_falldown_detection package source code.

## Result Analysis

After starting the pose detection package, the terminal outputs the following information:

```shell
[hobot_falldown_detection-4] [INFO] [1660271558.250055538] [body_kps_Subscriber]: receive targetType: personpointType: body_kps
[hobot_falldown_detection-4] [INFO] [1660271558.250598996] [fall_down_publisher]: track_id: 1 is fall down
```

The log output shows that body_kps data was subscribed and a pose event was published.

Enter `http://IP:8000` in a PC browser to view the human detection boxes, keypoints, and pose detection results rendered on the web (IP is the RDK's IP address):

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/fall_detection/falldown.jpg)
