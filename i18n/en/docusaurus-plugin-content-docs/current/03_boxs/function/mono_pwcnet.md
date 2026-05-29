---
sidebar_position: 2
sidebar_products: RDK-X5
---
# Optical Flow Estimation

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Overview

The optical flow estimation algorithm uses PwcNet, an optical flow estimation model trained on the [FlyingChairs dataset](https://lmb.informatik.uni-freiburg.de/resources/datasets/FlyingChairs.en.html).

The algorithm takes two consecutive frames of image data as input and outputs an optical flow map for the first frame, showing the motion vectors of objects in the first frame in horizontal and vertical directions.

Code repository: (https://github.com/D-Robotics/mono_pwcnet)

Application scenario: Optical flow estimation is a technique used to determine the pixel movement patterns on object surfaces in image sequences. It can be applied in autonomous driving, motion analysis, object tracking, and other fields.

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/render_pwcnet_feedback_0_0.jpeg)

## Supported Platforms

| Platform                             | Runtime Environment     | Example Functionality                                                 |
| -------------------------------- | ------------ | -------------------------------------------------------- |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | Start MIPI/USB camera/local feedback playback and display inference rendering results via web |

## Algorithm Information

| Model | Platform | Input Size | Inference Frame Rate (fps) |
| ---- | ---- | ------------ | ---- |
| pwcnet | X5 | 1×6×384×512 | 23 |

## Preparation

### RDK Platform

1. RDK has been flashed with RDK OS.

2. TogetheROS.Bot has been successfully installed on the RDK.

3. MIPI or USB camera has been installed on the RDK.

4. Confirm that the PC can access the RDK over the network.

## Usage

The optical flow estimation (mono_pwcnet) package subscribes to images published by the sensor package. After inference, it publishes algorithm messages. The websocket package displays the images published by the sensor and corresponding algorithm results in a PC browser.

### RDK Platform

**Publish Images with MIPI Camera**

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


```shell
# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/mono_pwcnet/config/ .

# 配置MIPI摄像头
export CAM_TYPE=mipi

# 启动launch文件
ros2 launch mono_pwcnet pwcnet.launch.py
```

**Publish Images with USB Camera**

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


```shell

# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/mono_pwcnet/config/ .

# 配置USB摄像头
export CAM_TYPE=usb

# 启动launch文件
ros2 launch mono_pwcnet pwcnet.launch.py
```


**Use Local Feedback Images**

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

```shell
# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/mono_pwcnet/config/ .

# 配置本地回灌图片
export CAM_TYPE=fb

# 启动launch文件
ros2 launch mono_pwcnet pwcnet.launch.py

```

## Result Analysis

The running terminal outputs the following information:

```shell
[mono_pwcnet-3] [WARN] [0000000495.652908486] [mono_pwcnet]: Parameter:
[mono_pwcnet-3]  cache_img_limit: 11
[mono_pwcnet-3]  cache_task_limit: 8
[mono_pwcnet-3]  dump_render_img: 0
[mono_pwcnet-3]  feed_type(0:local, 1:sub): 1
[mono_pwcnet-3]  image_size: 2
[mono_pwcnet-3]  is_shared_mem_sub: 1
[mono_pwcnet-3]  is_sync_mode: 0
[mono_pwcnet-3]  ai_msg_pub_topic_name: /pwcnet_msg
[mono_pwcnet-3]  ros_img_sub_topic_name: /image
[mono_pwcnet-3] [WARN] [0000000495.653288277] [mono_pwcnet]: model_file_name_: config/model.hbm, task_num: 4
[mono_pwcnet-3] [WARN] [0000000495.653349777] [mono_pwcnet]: model_file_name_: config/model.hbm, task_num: 4
[mono_pwcnet-3] [BPU_PLAT]BPU Platform Version(1.3.6)!
[mono_pwcnet-3] [HBRT] set log level as 0. version = 3.15.49.0
[mono_pwcnet-3] [DNN] Runtime version = 1.23.8_(3.15.49 HBRT)
[mono_pwcnet-3] [WARN] [0000000495.864239611] [mono_pwcnet]: Get model name: pwcnet_pwcnetneck_flyingchairs from load model.
[mono_pwcnet-3] [WARN] [0000000495.890934569] [mono_pwcnet]: Create hbmem_subscription with topic_name: /hbmem_img
[mono_pwcnet-3] [WARN] [0000000495.920407361] [mono_pwcnet]: Loaned messages are only safe with const ref subscription callbacks. If you are using any other kind of subscriptions, set the ROS_DISABLE_LOANED_MESSAGES environment variable to 1 (the default).
[mono_pwcnet-3] [WARN] [0000000497.404133403] [mono_pwcnet]: Sub img fps: 6.00, Smart fps: 5.84, pre process time ms: 19, infer time ms: 41, post process time ms: 2
[mono_pwcnet-3] [WARN] [0000000499.603858154] [mono_pwcnet]: Sub img fps: 5.04, Smart fps: 5.08, pre process time ms: 19, infer time ms: 41, post process time ms: 1
[mono_pwcnet-3] [WARN] [0000000500.623022321] [mono_pwcnet]: Sub img fps: 4.91, Smart fps: 4.91, pre process time ms: 38, infer time ms: 41, post process time ms: 2
[mono_pwcnet-3] [WARN] [0000000501.823021197] [mono_pwcnet]: Sub img fps: 5.00, Smart fps: 5.00, pre process time ms: 38, infer time ms: 41, post process time ms: 2
[mono_pwcnet-3] [WARN] [0000000503.023211572] [mono_pwcnet]: Sub img fps: 5.00, Smart fps: 5.00, pre process time ms: 38, infer time ms: 41, post process time ms: 2
[mono_pwcnet-3] [WARN] [0000000504.213473156] [mono_pwcnet]: Sub img fps: 5.00, Smart fps: 5.04, pre process time ms: 29, infer time ms: 41, post process time ms: 1
[mono_pwcnet-3] [WARN] [0000000505.404481615] [mono_pwcnet]: Sub img fps: 5.00, Smart fps: 5.04, pre process time ms: 39, infer time ms: 41, post process time ms: 1
[mono_pwcnet-3] [WARN] [0000000506.422719074] [mono_pwcnet]: Sub img fps: 5.00, Smart fps: 4.91, pre process time ms: 38, infer time ms: 41, post process time ms: 1
[mono_pwcnet-3] [WARN] [0000000507.422862825] [mono_pwcnet]: Sub img fps: 5.04, Smart fps: 5.00, pre process time ms: 38, infer time ms: 41, post process time ms: 1
```

Enter http://IP:8000 in a PC browser, then click 'Full Image Segmentation' on the right to view the rendering effect (IP is the RDK device's IP address)

![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/pwcnet.gif)
