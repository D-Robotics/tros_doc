---
sidebar_position: 2
---

# 5.2.2 数据展示

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Web 展示

### 功能介绍

Web 展示用于预览摄像头图像（JPEG 格式）和算法效果，通过网络将图像和算法结果传输到 PC 浏览器，然后进行渲染显示。该展示端还支持仅显示视频，而不渲染智能结果。

代码仓库：[https://github.com/D-Robotics/hobot_websocket](https://github.com/D-Robotics/hobot_websocket)

### 支持平台

| 平台    | 运行方式      | 示例功能                       |
| ------- | ------------- | ------------------------------ |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble)  | 启动 MIPI 摄像头，并通过 Web 展示图像 |
| RDK X5, RDK X5 Module,RDK S100 | Ubuntu 22.04 (Humble)  | 启动 MIPI 摄像头，并通过 Web 展示图像 |
| RDK S600 | Ubuntu 24.04 (Jazzy) | 启动 MIPI 摄像头，并通过 Web 展示图像 |
| X86     | Ubuntu 20.04 (Foxy) | 启动 USB 摄像头，并通过 Web 展示图像 |

### 准备工作

#### RDK 平台

1. 确认摄像头 F37 正确接到 RDK 上

2. 确认 PC 可以通过网络访问 RDK

3. 确认已成功安装 TogetheROS.Bot

#### X86 平台

1. 确认 X86 平台系统为 Ubuntu 20.04，且已成功安装 tros.b

2. 确认 USB 摄像头接入主机 USB 插口，并可正常识别

### 使用方式

#### RDK 平台

1. 通过 SSH 登录 RDK，启动板端相关程序

    a. 启动 mipi_cam

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

   <TabItem value="jazzy" label="Jazzy">

   ```bash
   # 配置tros.b环境
   source /opt/tros/jazzy/setup.bash
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

   <DocScope products="RDK-S600">
   <Tabs groupId="tros-distro">
   <TabItem value="jazzy" label="Jazzy">

   ```bash
   # 配置tros.b环境
   source /opt/tros/jazzy/setup.bash
   ```

   </TabItem>
   </Tabs>
   </DocScope>

   ```bash
    ros2 launch mipi_cam mipi_cam.launch.py mipi_video_device:=F37
    ```

    b. 启动编码

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

   <TabItem value="jazzy" label="Jazzy">

   ```bash
   # 配置tros.b环境
   source /opt/tros/jazzy/setup.bash
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

   <DocScope products="RDK-S600">
   <Tabs groupId="tros-distro">
   <TabItem value="jazzy" label="Jazzy">

   ```bash
   # 配置tros.b环境
   source /opt/tros/jazzy/setup.bash
   ```

   </TabItem>
   </Tabs>
   </DocScope>


   ```bash
   ros2 launch hobot_codec hobot_codec_encode.launch.py
   ```

    c. 启动 websocket

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

   <TabItem value="jazzy" label="Jazzy">

   ```bash
   # 配置tros.b环境
   source /opt/tros/jazzy/setup.bash
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

   <DocScope products="RDK-S600">
   <Tabs groupId="tros-distro">
   <TabItem value="jazzy" label="Jazzy">

   ```bash
   # 配置tros.b环境
   source /opt/tros/jazzy/setup.bash
   ```

   </TabItem>
   </Tabs>
   </DocScope>

   ```bash
   ros2 launch websocket websocket.launch.py websocket_image_topic:=/image_jpeg websocket_only_show_image:=true
   ```

2. PC 浏览器（chrome/firefox/edge）输入 `http://IP:8000` ，即可查看图像，IP 为 RDK IP 地址。

   <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/websocket.png" alt="浏览器通过 WebSocket 查看 RDK 实时图像的 Web 展示界面" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

#### X86 平台

1. 启动 hobot_usb_cam 节点

   ```bash
   # 配置tros.b环境
   source /opt/tros/setup.bash
   # usb_video_device需要更改为实际usb摄像头video节点
   ros2 launch hobot_usb_cam hobot_usb_cam.launch.py usb_image_width:=1280 usb_image_height:=720 usb_video_device:=/dev/video0
   ```

2. 启动 websocket 节点

   ```bash
   # 配置tros.b环境
   source /opt/tros/setup.bash
   ros2 launch websocket websocket.launch.py websocket_image_topic:=/image websocket_only_show_image:=true
   ```

3. PC 浏览器（chrome/firefox/edge）输入 `http://IP:8000` ，即可查看图像效果，IP 为 PC IP 地址，若在本机访问，也可使用 localhost。

### 注意事项

1. websocket 需要使用 8000 端口，如果端口被占用，则会启动失败，解决方法如下：

   - 使用`lsof -i:8000`命令查看 8000 端口占用进程，使用`kill <PID>`关闭占用 8000 端口进程，然后重新启动 websocket 即可。

   - 若用户不想停止当前正在占用 8000 端口的服务，可以修改 `/opt/tros/${TROS_DISTRO}/lib/websocket/webservice/conf/nginx.conf` 配置文件中的`listen`端口号，改为大于 1024 且未使用的端口号。修改端口号后，浏览器端使用的 URL 也要同步修改。

<DocScope products="RDK X3,RDK X5">

## HDMI 展示

### 功能介绍

本章节介绍通过 HDMI 展示 camera nv12 图像的使用，RDK 通过 HDMI 接显示器即可显示实时图像效果，对应于 hobot_hdmi package。

代码仓库：[https://github.com/D-Robotics/hobot_hdmi](https://github.com/D-Robotics/hobot_hdmi)

### 支持平台

| 平台     | 运行方式     | 示例功能                       |
| -------- | ------------ | ------------------------------ |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | 启动 MIPI 摄像头，并通过 HDMI 展示图像 |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | 启动 MIPI 摄像头，并通过 HDMI 展示图像 |

:::caution **注意**
HDMI 展示**EOL**说明：
- `RDK X3`和`RDK X3 Module`平台支持到`2.1.0`版本，对应 TROS 版本`2.2.0 (2024-04-11)`。
- `RDK X5`和`RDK X5 Module`平台支持到`2.4.2`版本，对应 TROS 版本`2.3.1 (2024-11-20)`。
:::

### 准备工作

#### RDK 平台

1. RDK 已烧录好 Ubuntu 系统镜像。

2. RDK 已成功安装 TogetheROS.Bot。

3. RDK 已 HDMI 连接显示器。

### 使用介绍

#### RDK 平台

通过 SSH 登录开发板，启动板端相关程序：

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

<TabItem value="jazzy" label="Jazzy">

```bash
# 配置tros.b环境
source /opt/tros/jazzy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>





使用 RDK X5 时, 需要额外使用下面命令:
```bash
# 关闭桌面显示
sudo systemctl stop lightdm
# 复制运行依赖
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_hdmi/config/ .
```

```shell
# HDMI图像渲染
ros2 launch hobot_hdmi hobot_hdmi.launch.py device:=F37
```

### 结果分析

在运行终端输出如下信息：

```text
[INFO] [launch]: All log files can be found below /root/.ros/log/2022-07-27-15-27-26-362299-ubuntu-13432
[INFO] [launch]: Default logging verbosity is set to INFO
[INFO] [mipi_cam-1]: process started with pid [13434]
[INFO] [hobot_hdmi-2]: process started with pid [13436]
```

显示器显示图像如下：
<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/hdmi.png" alt="HDMI 显示输出节点 hobot_hdmi 启动成功的终端日志" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

</DocScope>

## RViz2 展示

### 功能介绍

TogetheROS.Bot 兼容 ROS2，为了方便预览图像效果，可以通过 RViz2 获取图像。

### 支持平台

| 平台    | 运行方式      |
| ------- | ------------- |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) |
| RDK X5, RDK X5 Module, RDK S100 | Ubuntu 22.04 (Humble) |
| RDK S600 | Ubuntu 24.04 (Jazzy) |
### 准备工作

#### RDK 平台

1. RDK 已烧录好 Ubuntu 桌面版本系统镜像。

2. RDK 已成功安装 tros.b。

<DocScope products="RDK-X3,RDK-X5">
3. PC 已安装 Ubuntu 20.04/Ubuntu 22.04 系统、ROS2 Foxy/Humble 桌面版和数据可视化工具 RViz2，并且和 RDK 在同一网段（IP 地址前三位相同）。

   - ROS2 安装参考：[Foxy 版本](https://docs.ros.org/en/foxy/Installation/Ubuntu-Install-Debians.html)，[Humble 版本](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html)

   - PC 端安装 RViz2：`sudo apt install ros-$ROS_DISTRO-rviz-common ros-$ROS_DISTRO-rviz-default-plugins ros-$ROS_DISTRO-rviz2`。其中`$ROS_DISTRO`为 ROS2 版本，如`foxy`、`humble`。
</DocScope>

<DocScope products="RDK-S100">
3. PC 已安装 Ubuntu 22.04 系统、ROS2 Humble 桌面版和数据可视化工具 RViz2，并且和 RDK 在同一网段（IP 地址前三位相同）。

   - ROS2 安装参考：[Humble 版本](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html)

   - PC 端安装 RViz2：`sudo apt install ros-$ROS_DISTRO-rviz-common ros-$ROS_DISTRO-rviz-default-plugins ros-$ROS_DISTRO-rviz2`。其中`$ROS_DISTRO`为 ROS2 版本，如`humble`。
</DocScope>

<DocScope products="RDK-S600">
3. PC 已安装 Ubuntu 24.04 系统、ROS2 Jazzy 桌面版和数据可视化工具 RViz2，并且和 RDK 在同一网段（IP 地址前三位相同）。

   - ROS2 安装参考：[Jazzy 版本](https://docs.ros.org/en/jazzy/Installation/Ubuntu-Install-Debians.html)

   - PC 端安装 RViz2：`sudo apt install ros-$ROS_DISTRO-rviz-common ros-$ROS_DISTRO-rviz-default-plugins ros-$ROS_DISTRO-rviz2`。其中`$ROS_DISTRO`为 ROS2 版本，如`jazzy`。
</DocScope>

### 使用方式

#### RDK 平台

1. 通过 SSH 登录 RDK，启动板端相关程序

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

   <TabItem value="jazzy" label="Jazzy">

   ```bash
   # 配置tros.b环境
   source /opt/tros/jazzy/setup.bash
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

   <DocScope products="RDK-S600">
   <Tabs groupId="tros-distro">
   <TabItem value="jazzy" label="Jazzy">

   ```bash
   # 配置tros.b环境
   source /opt/tros/jazzy/setup.bash
   ```

   </TabItem>
   </Tabs>
   </DocScope>

   ```shell
   # 启动mipi camera发布BGR8格式图像
   ros2 launch mipi_cam mipi_cam.launch.py mipi_out_format:=bgr8 mipi_image_width:=480 mipi_image_height:=272 mipi_io_method:=ros mipi_video_device:=F37
   ```

   注意: mipi_out_format 请勿随意更改，RViz2 只支持 RGB8, RGBA8, BGR8, BGRA8 等图像格式.

   如程序输出如下信息，说明节点已成功启动：

   ```shell
   [INFO] [launch]: All log files can be found below /root/.ros/log/2022-08-19-03-53-54-778203-ubuntu-2881662
   [INFO] [launch]: Default logging verbosity is set to INFO
   [INFO] [mipi_cam-1]: process started with pid [2881781]
   ```

2. RDK 新建一个窗口，查询话题命令及返回结果如下：

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

   <TabItem value="jazzy" label="Jazzy">

   ```bash
   # 配置tros.b环境
   source /opt/tros/jazzy/setup.bash
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

   <DocScope products="RDK-S600">
   <Tabs groupId="tros-distro">
   <TabItem value="jazzy" label="Jazzy">

   ```bash
   # 配置tros.b环境
   source /opt/tros/jazzy/setup.bash
   ```

   </TabItem>
   </Tabs>
   </DocScope>

   ```shell
   # 查询topic
   ros2 topic list
   ```

   输出：

   ```shell
   /camera_info
   /image_raw
   /parameter_events
   /rosout
   ```

3. RDK 上启动 RViz2 订阅话题，并预览摄像头数据；

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

   ```shell
   source /opt/tros/foxy/setup.bash
   ```

</TabItem>

<TabItem value="humble" label="Humble">

   ```shell
   source /opt/tros/humble/setup.bash
   ```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

   ```bash
   source /opt/tros/jazzy/setup.bash
   ```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

   ```shell
   source /opt/tros/humble/setup.bash
   ```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

   ```bash
   source /opt/tros/jazzy/setup.bash
   ```

</TabItem>
</Tabs>
</DocScope>

   ```shell
   # 安装RViz2
   sudo apt install ros-${TROS_DISTRO}-rviz-common ros-${TROS_DISTRO}-rviz-default-plugins ros-${TROS_DISTRO}-rviz2
   # 启动RViz2
   ros2 run rviz2 rviz2
   ```

   注意：RDK 上运行 rviz，需要使用 mobaxterm 等工具进行 ssh 连接，或者命令行 ssh 连接时加上“-Y” 参数。

   在 RViz2 界面上首先点击 add 按钮，然后按照 topic 选择发布的图像，在该示例中 topic 名为/image_raw，然后点击 image：

   <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/rviz2-config.png" alt="在 RViz2 中添加 Image 显示并选择 /image_raw 话题的配置界面" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

   图像效果图如下：

   <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/rviz2-result.png" alt="RViz2 成功显示摄像头图像话题后的可视化效果" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />


## RQt 展示

### 功能介绍

TogetheROS.Bot 兼容 ROS2，支持通过 RQt 预览压缩格式图像，可以大幅度降低网络带宽消耗。本章节的示例将会在 RDK 上启动 MIPI 摄像头获取图像，然后在 RDK 上使用 RQt 预览。

### 支持平台

| 平台    | 运行方式      |
| ------- | ------------- |
| RDK X5, RDK X5 Module, RDK S100 | Ubuntu 22.04 (Humble) |
| RDK S600 | Ubuntu 24.04 (Jazzy) |

### 准备工作

#### RDK 平台

1. RDK 已烧录好 Ubuntu 桌面版本系统镜像。

2. RDK 已成功安装 tros.b。

<DocScope products="RDK-X3,RDK-X5">
3. PC 已安装 Ubuntu 20.04/Ubuntu 22.04 系统、ROS2 Foxy/Humble 桌面版和数据可视化工具 RQt，并且和 RDK 在同一网段（IP 地址前三位相同）。

   - ROS2 安装参考：[Foxy 版本](https://docs.ros.org/en/foxy/Installation/Ubuntu-Install-Debians.html)，[Humble 版本](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html)

   - PC 端安装 rqt-image-view ：`ros-$ROS_DISTRO-rqt-image-view ros-$ROS_DISTRO-rqt`。其中`$ROS_DISTRO`为 ROS2 版本，如`foxy`、`humble`。
</DocScope>

<DocScope products="RDK-S100">
3. PC 已安装 Ubuntu 22.04 系统、ROS2 Humble 桌面版和数据可视化工具 RQt，并且和 RDK 在同一网段（IP 地址前三位相同）。

   - ROS2 安装参考：[Humble 版本](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html)

   - PC 端安装 rqt-image-view ：`ros-$ROS_DISTRO-rqt-image-view ros-$ROS_DISTRO-rqt`。其中`$ROS_DISTRO`为 ROS2 版本，如`humble`。
</DocScope>

<DocScope products="RDK-S600">
3. PC 已安装 Ubuntu 24.04 系统、ROS2 Jazzy 桌面版和数据可视化工具 RQt，并且和 RDK 在同一网段（IP 地址前三位相同）。

   - ROS2 安装参考：[Jazzy 版本](https://docs.ros.org/en/jazzy/Installation/Ubuntu-Install-Debians.html)

   - PC 端安装 rqt-image-view ：`ros-$ROS_DISTRO-rqt-image-view ros-$ROS_DISTRO-rqt`。其中`$ROS_DISTRO`为 ROS2 版本，如`jazzy`。
</DocScope>

### 使用方式

#### RDK 平台

1. 通过 SSH 登录 RDK 开发板，启动 mipi camera：

   <DocScope products="RDK-X5">
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

   <TabItem value="jazzy" label="Jazzy">

   ```bash
   # 配置tros.b环境
   source /opt/tros/jazzy/setup.bash
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

   <DocScope products="RDK-S600">
   <Tabs groupId="tros-distro">
   <TabItem value="jazzy" label="Jazzy">

   ```bash
   # 配置tros.b环境
   source /opt/tros/jazzy/setup.bash
   ```

   </TabItem>
   </Tabs>
   </DocScope>

   ```shell
   ros2 launch mipi_cam mipi_cam.launch.py mipi_image_width:=640 mipi_image_height:=480 mipi_video_device:=F37
   ```

2. 在 RDK 上启动 hobot_codec, 发布 compressed 格式图像：

   <DocScope products="RDK-X5">
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

   <TabItem value="jazzy" label="Jazzy">

   ```bash
   # 配置tros.b环境
   source /opt/tros/jazzy/setup.bash
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

   <DocScope products="RDK-S600">
   <Tabs groupId="tros-distro">
   <TabItem value="jazzy" label="Jazzy">

   ```bash
   # 配置tros.b环境
   source /opt/tros/jazzy/setup.bash
   ```

   </TabItem>
   </Tabs>
   </DocScope>

   ```shell
   ros2 launch hobot_codec hobot_codec_encode.launch.py codec_out_format:=jpeg codec_pub_topic:=/image_raw/compressed
   ```

3. RDK 上订阅话题，并预览摄像头数据；

<DocScope products="RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

   ```shell
   source /opt/tros/foxy/setup.bash
   ```

</TabItem>

<TabItem value="humble" label="Humble">

   ```shell
   source /opt/tros/humble/setup.bash
   ```
</TabItem>

<TabItem value="jazzy" label="Jazzy">

   ```bash
   source /opt/tros/jazzy/setup.bash
   ```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

   ```shell
   source /opt/tros/humble/setup.bash
   ```
</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

   ```bash
   source /opt/tros/jazzy/setup.bash
   ```

</TabItem>
</Tabs>
</DocScope>

   ```shell
   # 安装rqt
   sudo apt install ros-${TROS_DISTRO}-rqt-image-view ros-${TROS_DISTRO}-rqt ros-${TROS_DISTRO}-compressed-image-transport
   # 启动rqt
   ros2 run rqt_image_view rqt_image_view
   ```

   注意：RDK 上运行 rqt，需要使用 mobaxterm 等工具进行 ssh 连接，或者命令行 ssh 连接时加上“-Y” 参数。

   选择话题`/image_raw/compressed`，图像效果图如下：

   <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/rqt-result.png" alt="rqt 订阅 /image_raw/compressed 话题后显示的图像效果" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

## Foxglove 展示

### 功能介绍

Foxglove 是一个开源的工具包，包括线上和线下版。旨在简化机器人系统的开发和调试。它提供了一系列用于构建机器人应用程序的功能。

本章节主要用到 Foxglove 数据记录和回放功能：Foxglove 允许将 ROS2 话题的数据记录到文件中，以便后续回放和分析。这对于系统故障诊断、性能优化和算法调试非常有用。

演示中，我们会利用 TogetheROS 开发的 hobot_visualization 功能包，将智能推理结果转换为 ROS2 渲染的话题信息。

代码仓库：[https://github.com/D-Robotics/hobot_visualization](https://github.com/D-Robotics/hobot_visualization)

### 支持平台

| 平台    | 运行方式      |
| ------- | ------------- |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) |
| RDK X5, RDK X5 Module, RDK S100 | Ubuntu 22.04 (Humble) |
| RDK S600 | Ubuntu 24.04 (Jazzy) |
| X86     | Ubuntu 20.04 (Foxy) |

### 准备工作

#### RDK 平台

1. 确认摄像头 F37 正确接到 RDK 上

2. 确认 PC 可以通过网络访问 RDK

3. 确认已成功安装 TogetheROS.Bot

#### X86 平台

1. 确认 X86 平台系统为 Ubuntu 20.04，且已成功安装 tros.b

### 使用方式

#### RDK 平台 / X86 平台

1. 通过 SSH 登录 RDK 平台，启动板端相关程序：

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

<TabItem value="jazzy" label="Jazzy">

```bash
# 配置tros.b环境
source /opt/tros/jazzy/setup.bash
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

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
# 配置tros.b环境
source /opt/tros/jazzy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

```shell
export CAM_TYPE=fb
cp -r /opt/tros/${TROS_DISTRO}/lib/dnn_node_example/config/ .

ros2 launch hobot_visualization hobot_vis_render.launch.py dnn_example_config_file:=config/yolov2workconfig.json
```

同时，利用 ssh 登录另一个终端，在板端记录话题信息：

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

<TabItem value="jazzy" label="Jazzy">

```bash
# 配置tros.b环境
source /opt/tros/jazzy/setup.bash
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

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
# 配置tros.b环境
source /opt/tros/jazzy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

```shell
# 记录rosbag数据，会生成在当前工作目录下
ros2 bag record -a
```

2. Foxglove 在线页面播放 rosbag 数据

1）PC 浏览器（chrome/firefox/edge）输入 (https://foxglove.dev/studio) , 进入 foxglove 官网

   <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/foxglove_guide_1.png" alt="Foxglove Studio 官网首页入口界面" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

PS: 首次使用需要注册, 可使用谷歌账号或第三方邮箱进行注册。

   <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/foxglove_guide_11.png" alt="Foxglove Studio 首次使用时的账号注册界面" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

2）进入可视化功能界面

   <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/foxglove_guide_2.png" alt="Foxglove Studio 可视化功能主界面" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

3）点击选中本地 rosbag 文件

   <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/foxglove_guide_3.png" alt="在 Foxglove 中选择本地 rosbag 文件的操作界面" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

4）打开布局界面，在布局界面右上角，点击设置，选中图标，打开播放 maker 渲染消息功能

   <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/foxglove_guide_4.png" alt="Foxglove 布局设置中开启 Marker 渲染消息的配置步骤" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

5）点击播放
   <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/foxglove_guide_5.png" alt="Foxglove 完成 Marker 渲染相关设置后的界面示意" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

6）观看数据
   <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/foxglove_guide_6.png" alt="Foxglove 播放 rosbag 并完成可视化展示的最终效果" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

### 注意事项

1. Foxglove 可视化图像数据，需采用 ROS2 官方的消息格式，使用 foxglove 支持的图像编码格式，详情请见 (https://foxglove.dev/docs/studio/panels/image)。

2. rosbag 进行消息记录时，可能会录制其他设备的话题信息，因此为了保证 rosbag 数据的干净，可以通过设置'export ROS_DOMAIN_ID=xxx' ，如'export ROS_DOMAIN_ID=1'的方法。
