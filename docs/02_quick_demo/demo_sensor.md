---
sidebar_position: 1
---
# 5.2.1 数据采集

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## USB 图像采集

### 功能介绍

为实现环境感知能力，机器人产品中通常会搭载摄像头以获取图像信息。USB 摄像头易于获取，使用方便，通用性好，TogetheROS.Bot 添加了对 USB 摄像头的支持，支持 ROS2 标准图像消息。

代码仓库：[https://github.com/D-Robotics/hobot_usb_cam.git](https://github.com/D-Robotics/hobot_usb_cam.git)

### 支持平台

| 平台    | 运行方式     |
| ------- | ------------ |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) |
| RDK S600 | Ubuntu 24.04 (Jazzy) |

### 准备工作

#### RDK 平台

1. 确认手中 USB 摄像头工作正常，将 USB 摄像头接入 RDK 的 USB 插槽

2. RDK 已烧录好 Ubuntu 系统镜像

3. RDK 已成功安装 tros.b

4. 确认 PC 机能够通过网络访问 RDK

### 使用方式（默认 usb_pixel_format 为 mjpeg）

以下以 RDK 平台为例：

1. 通过 SSH 登录 RDK，确认 USB 摄像头设备名称，这里以 `/dev/video8` 为例

2. 并通过下述命令启动 USB 摄像头

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
   # launch方式启动：
   ros2 launch hobot_usb_cam hobot_usb_cam.launch.py usb_video_device:=/dev/video8
   ```

3. 如程序输出如下信息，说明节点已成功启动

    ```text
    [INFO] [launch]: All log files can be found below /root/.ros/log/2024-01-18-19-44-39-419588-ubuntu-3951
    [INFO] [launch]: Default logging verbosity is set to INFO
    [INFO] [hobot_usb_cam-1]: process started with pid [3953]
    [hobot_usb_cam-1] [WARN] [1705578280.808870437] [hobot_usb_cam]: framerate: 30
    [hobot_usb_cam-1] [WARN] [1705578280.809851560] [hobot_usb_cam]: pixel_format_name: mjpeg
    [hobot_usb_cam-1] [WARN] [1705578280.936697507] [hobot_usb_cam]: This devices supproted formats:
    [hobot_usb_cam-1] [WARN] [1705578280.936858791] [hobot_usb_cam]:        Motion-JPEG: 640 x 480 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.936912830] [hobot_usb_cam]:        Motion-JPEG: 1920 x 1080 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.936960328] [hobot_usb_cam]:        Motion-JPEG: 320 x 240 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.937007285] [hobot_usb_cam]:        Motion-JPEG: 800 x 600 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.937053241] [hobot_usb_cam]:        Motion-JPEG: 1280 x 720 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.937098906] [hobot_usb_cam]:        Motion-JPEG: 1024 x 576 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.937144528] [hobot_usb_cam]:        YUYV 4:2:2: 640 x 480 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.937190068] [hobot_usb_cam]:        YUYV 4:2:2: 1920 x 1080 (5 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.937235858] [hobot_usb_cam]:        YUYV 4:2:2: 320 x 240 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.937282064] [hobot_usb_cam]:        YUYV 4:2:2: 800 x 600 (20 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.937328020] [hobot_usb_cam]:        YUYV 4:2:2: 1280 x 720 (10 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.937373518] [hobot_usb_cam]:        YUYV 4:2:2: 1024 x 576 (15 Hz)
    ```

4. Web 端查看 USB 摄像头图像，另起一个终端：

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
# 启动websocket
ros2 launch websocket websocket.launch.py websocket_image_topic:=/image websocket_only_show_image:=true
```

5. PC 打开浏览器 `Chrome/Firefox/Edge` ，输入 `IP:8000` （IP 为 RDK 的 IP 地址），点击左上方 Web 端展示即可查看 USB 摄像头实时画面。

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/usb_cam_pic.png" alt="Web 端展示的 USB 摄像头实时画面" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

### 使用方式 2（usb_pixel_format 为 yuyv2rgb）
以下以 RDK 平台为例：

1. 通过 SSH 登录 RDK，确认 USB 摄像头设备名称，这里以 `/dev/video8` 为例

2. 并通过下述命令启动 USB 摄像头

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
    # launch方式启动：
    ros2 launch hobot_usb_cam hobot_usb_cam.launch.py usb_video_device:=/dev/video8 usb_pixel_format:=yuyv2rgb usb_image_width:=640 usb_image_height:=480
    ```

3. 如程序输出如下信息，说明节点已成功启动

    ```text
    [INFO] [launch]: All log files can be found below /root/.ros/log/2024-01-18-19-44-39-419588-ubuntu-3951
    [INFO] [launch]: Default logging verbosity is set to INFO
    [INFO] [hobot_usb_cam-1]: process started with pid [3953]
    [hobot_usb_cam-1] [WARN] [1705578280.808870437] [hobot_usb_cam]: framerate: 30
    [hobot_usb_cam-1] [WARN] [1705578280.809851560] [hobot_usb_cam]: pixel_format_name: yuyv2rgb
    [hobot_usb_cam-1] [WARN] [1705578280.936697507] [hobot_usb_cam]: This devices supproted formats:
    [hobot_usb_cam-1] [WARN] [1705578280.936858791] [hobot_usb_cam]:        Motion-JPEG: 640 x 480 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.936912830] [hobot_usb_cam]:        Motion-JPEG: 1920 x 1080 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.936960328] [hobot_usb_cam]:        Motion-JPEG: 320 x 240 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.937007285] [hobot_usb_cam]:        Motion-JPEG: 800 x 600 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.937053241] [hobot_usb_cam]:        Motion-JPEG: 1280 x 720 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.937098906] [hobot_usb_cam]:        Motion-JPEG: 1024 x 576 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.937144528] [hobot_usb_cam]:        YUYV 4:2:2: 640 x 480 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.937190068] [hobot_usb_cam]:        YUYV 4:2:2: 1920 x 1080 (5 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.937235858] [hobot_usb_cam]:        YUYV 4:2:2: 320 x 240 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.937282064] [hobot_usb_cam]:        YUYV 4:2:2: 800 x 600 (20 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.937328020] [hobot_usb_cam]:        YUYV 4:2:2: 1280 x 720 (10 Hz)
    [hobot_usb_cam-1] [WARN] [1705578280.937373518] [hobot_usb_cam]:        YUYV 4:2:2: 1024 x 576 (15 Hz)
    ```

4. 通过 hobot codec 进行编码成 mjpeg

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
    # launch方式启动：
    ros2 launch hobot_codec hobot_codec_encode.launch.py codec_in_mode:=ros codec_in_format:=rgb8 codec_out_mode:=ros codec_sub_topic:=/image codec_pub_topic:=/image_mjpeg
    ```

5. Web 端查看 USB 摄像头图像，另起一个终端：

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
    # 启动websocket
    ros2 launch websocket websocket.launch.py websocket_image_topic:=/image_mjpeg websocket_only_show_image:=true
    ```

6. PC 打开浏览器（chrome/firefox/edge）输入 `http://IP:8000` （IP 为 RDK IP 地址），点击左上方 Web 端展示即可查看 USB 摄像头实时画面
    <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/usb_cam_pic.png" alt="Web 端展示的 USB 摄像头实时画面" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

### 注意事项

1. USB 摄像头需要进行标定，并设置相机标定文件的读取路径，否则无法发布相机内参，但不影响其它功能
2. 设置相机标定文件读取路径，具体步骤如下：

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
    # launch 方式启动
    ros2 launch hobot_usb_cam hobot_usb_cam.launch.py usb_camera_calibration_file_path:=（实际标定文件绝对路径）
    ```

3. pixel_format 配置的更改

   hobot_usb_cam 支持以下配置集：
   "mjpeg","mjpeg2rgb","rgb8","yuyv","yuyv2rgb","uyvy","uyvy2rgb","m4202rgb","mono8","mono16","y102mono8"

   通过第一种的默认参数启动 usb camera 查询设备硬件所支持支持的 formats，如下 log：

    ```text
    [hobot_usb_cam-1] [WARN] [1705548544.174669672] [hobot_usb_cam]: This devices supproted formats:
    [hobot_usb_cam-1] [WARN] [1705548544.174844917] [hobot_usb_cam]:        Motion-JPEG: 640 x 480 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705548544.174903166] [hobot_usb_cam]:        Motion-JPEG: 1920 x 1080 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705548544.174950581] [hobot_usb_cam]:        Motion-JPEG: 320 x 240 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705548544.174996788] [hobot_usb_cam]:        Motion-JPEG: 800 x 600 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705548544.175043412] [hobot_usb_cam]:        Motion-JPEG: 1280 x 720 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705548544.175089161] [hobot_usb_cam]:        Motion-JPEG: 1024 x 576 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705548544.175135035] [hobot_usb_cam]:        YUYV 4:2:2: 640 x 480 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705548544.175180325] [hobot_usb_cam]:        YUYV 4:2:2: 1920 x 1080 (5 Hz)
    [hobot_usb_cam-1] [WARN] [1705548544.175226449] [hobot_usb_cam]:        YUYV 4:2:2: 320 x 240 (30 Hz)
    [hobot_usb_cam-1] [WARN] [1705548544.175272365] [hobot_usb_cam]:        YUYV 4:2:2: 800 x 600 (20 Hz)
    [hobot_usb_cam-1] [WARN] [1705548544.175318697] [hobot_usb_cam]:        YUYV 4:2:2: 1280 x 720 (10 Hz)
    [hobot_usb_cam-1] [WARN] [1705548544.175365195] [hobot_usb_cam]:        YUYV 4:2:2: 1024 x 576 (15 Hz)
    ```

    a.查询 usb camera 支持的图像格式，如上述 log，log 显示支持 mjpeg 和 YUYV;

    b.则只能设置"mjpeg","mjpeg2rgb","yuyv","yuyv2rgb"；否则 hobot_usb_cam 程序退出。

## MIPI 图像采集

### 功能介绍

为实现环境感知能力，机器人产品中通常会搭载摄像头、ToF 等类型的传感器。为降低用户传感器适配和使用成本，TogetheROS.Bot 会对多种常用传感器进行封装，并抽象成 hobot_sensor 模块，支持 ROS 标准图像消息。当配置的传感器参数与接入的摄像头不符时，程序会自动适应正确的传感器类型。目前已支持的 MIPI 传感器类型如下所示：

| 序号 | 名称   | 示意图片                    | 参数     |  支持平台 | 参考链接                                                     |
| ---- | ------ | -------------------- | -------- |  -------- | ------------------------------------------------------------ |
| 1    | F37    | <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/F37.jpg" alt="F37 MIPI 摄像头模组实物示意图" style={{ width: 'auto', maxWidth: '120px', height: 'auto', display: 'block', margin: '0 auto' }} />       | 200W 像素 | RDK X3, RDK X3 Module | [F37](https://developer.d-robotics.cc/accessory#23) |
| 2    | GC4663 | <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/GC4663.jpg" alt="GC4663 MIPI 摄像头模组实物示意图" style={{ width: 'auto', maxWidth: '120px', height: 'auto', display: 'block', margin: '0 auto' }} /> | 400W 像素 | RDK X3, RDK X3 Module | [GC4663](https://developer.d-robotics.cc/accessory#23) |
| 4    | IMX477 | <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/IMX477.jpg" alt="IMX477 MIPI 摄像头模组实物示意图" style={{ width: 'auto', maxWidth: '120px', height: 'auto', display: 'block', margin: '0 auto' }} /> | 200W 像素 | RDK X3, RDK X3 Module | [IMX477](https://www.waveshare.net/shop/IMX477-160-12.3MP-Camera.htm) |
| 5    | OV5647 | <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/OV5647.jpg" alt="OV5647 MIPI 摄像头模组实物示意图" style={{ width: 'auto', maxWidth: '120px', height: 'auto', display: 'block', margin: '0 auto' }} /> | 200W 像素 | RDK X3, RDK X3 Module, RDK X5, RDK X5 Module | [OV5647](https://www.waveshare.net/shop/RPi-Camera-G.htm) |
| 6    | IMX415 | <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/IMX415.jpg" alt="IMX415 MIPI 摄像头模组实物示意图" style={{ width: 'auto', maxWidth: '120px', height: 'auto', display: 'block', margin: '0 auto' }} /> | 200W 像素 | RDK X5, RDK X5 Module | [IMX415](https://e.tb.cn/h.hNHZxXLFdgg6oHj?tk=b1Id4UgKNVn) |

代码仓库：[https://github.com/D-Robotics/hobot_mipi_cam.git](https://github.com/D-Robotics/hobot_mipi_cam.git)

### 准备工作

#### RDK 平台

1. 确认摄像头正确接入 RDK。

    如 F37 摄像头的接入 RDK X3 方式如下图：

    <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/08_FAQ/image/hardware_and_system/image-X3-PI-Camera.png" alt="F37 摄像头接入 RDK X3 的连接示意图" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

    如 imx219 摄像头的接入 RDK S100 方式如下图：
    
    <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/image-S100-imx219.jpg" alt="IMX219 摄像头接入 RDK S100 的连接示意图" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

2. RDK 已烧录好 Ubuntu 系统镜像

3. RDK 已成功安装 tros.b

4. 确认 PC 机能够通过网络访问 RDK

### 使用方式

#### RDK 平台

下面介绍摄像头数据获取和预览的方法：

1. 通过 SSH 登录 RDK

2. 并通过下述命令启动 hobot_sensor 节点

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

    ```shell
    # launch 方式启动
    ros2 launch mipi_cam mipi_cam.launch.py
    ```

3. 如程序输出如下信息，说明节点已成功启动

    ```text
    [INFO] [launch]: All log files can be found below /root/.ros/log/2022-06-11-15-16-13-641715-ubuntu-8852
    [INFO] [launch]: Default logging verbosity is set to INFO
    [INFO] [mipi_cam-1]: process started with pid [8854]
    ...
    ```

4. Web 端查看摄像头图像，由于发布原始数据，需要编码 JPEG 图像，另起两个终端：一个进行订阅 MIPI 数据编码为 JPEG，一个用 webservice 发布

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

    ```shell
    # 启动编码
    ros2 launch hobot_codec hobot_codec_encode.launch.py

    # 再起一个终端，并且配置tros.b环境
    # 启动websocket
    ros2 launch websocket websocket.launch.py websocket_image_topic:=/image_jpeg websocket_only_show_image:=true
    ```

5. PC 打开浏览器（chrome/firefox/edge）输入 `http://IP:8000` （IP 为 RDK IP 地址），点击左上方 Web 端展示即可看到 F37 输出的实时画面
    <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/hobot_codec/web-f37-codec.png" alt="Web 端查看 F37 摄像头 JPEG 编码实时画面的效果" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

6. 在 PC 机上查询相机内参（具体数据以读取的相机标定文件为准），命令及结果如下:

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

   ```shell
   root@ubuntu:~# source /opt/ros/foxy/setup.bash
   ```

</TabItem>

<TabItem value="humble" label="Humble">

   ```shell
   root@ubuntu:~# source /opt/ros/humble/setup.bash
   ```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

   ```shell
   root@ubuntu:~# source /opt/ros/jazzy/setup.bash
   ```

</TabItem>
</Tabs>
</DocScope>

    ```shell
    root@ubuntu:~# ros2 topic echo /camera_info
        header:
    stamp:
        sec: 1662013622
        nanosec: 672922214
    frame_id: default_cam
    height: 1080
    width: 1920
    distortion_model: plumb_bob
    d:
    - 0.169978
    - -0.697303
    - -0.002944
    - -0.004961
    - 0.0
    k:
    - 1726.597634
    - 0.0
    - 904.979671
    - 0.0
    - 1737.359551
    - 529.123375
    - 0.0
    - 0.0
    - 1.0
    r:
    - 1.0
    - 0.0
    - 0.0
    - 0.0
    - 1.0
    - 0.0
    - 0.0
    - 0.0
    - 1.0
    p:
    - 1685.497559
    - 0.0
    - 881.6396
    - 0.0
    - 0.0
    - 1756.460205
    - 526.781147
    - 0.0
    - 0.0
    - 0.0
    - 1.0
    - 0.0
    binning_x: 0
    binning_y: 0
    roi:
    x_offset: 0
    y_offset: 0
    height: 0
    width: 0
    do_rectify: false

    ```

### 注意事项

1. mipi_cam 提供 F37 以及 GC4663 两种摄像头的标定文件，默认读取 F37 的标定文件 `F37_calibration.yaml` ，如使用 GC4663，请更改相机标定文件的读取路径，具体步骤如下：

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

    ```shell
    # launch 方式启动
    ros2 launch mipi_cam mipi_cam.launch.py mipi_video_device:=GC4663 mipi_camera_calibration_file_path:=/opt/tros/${TROS_DISTRO}/lib/mipi_cam/config/GC4663_calibration.yaml
    ```

2. 摄像头插拔注意事项

   **严禁在开发板未断电的情况下插拔摄像头，否则非常容易烧坏摄像头模组。**

3. 如遇到 hobot_sensor 节点启动异常，可通过下述步骤进行问题排查：
    - 检查硬件连接
    - 是否设置 tros.b 环境
    - 参数是否正确，具体参考[README.md](https://github.com/D-Robotics/hobot_mipi_cam/blob/develop/README.md)
4. 由于同时如果两路图像向同一个 topic 发送图像，导致图像冲突，因此启动第二路图像需要重映射 topic，启动第二个相机的指令（仅限 X5 和 S100）：
    <DocScope products="RDK-X5">
    <Tabs groupId="tros-distro">
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
    # run 方式启动
    ros2 run mipi_cam mipi_cam --ros-args --remap /image_raw:=/image_raw_alias
    # 或者launch 方式启动
    ros2 launch mipi_cam mipi_cam_topic_remap.launch.py
    ```

## 双目 MIPI 图像采集

### 功能介绍

为了实现环境的立体感知能力，机器人产品中通常会搭载双目摄像头、ToF 等类型的传感器。为降低用户传感器适配和使用成本，TogetheROS.Bot 会对多种常用传感器进行封装，并抽象成 hobot_sensor 模块，支持 ROS 标准图像消息。当配置的传感器参数与接入的摄像头不符时，程序会自动适应正确的传感器类型。目前已支持的 MIPI 传感器类型如下所示：

| 类型 | 型号 | 规格 | 支持平台 |
| ------ | ------ | ------ | ------ |
| 摄像头| SC230ai | 200W | RDK X5, RDK X5 Module, RDK S100, RDK S100P, RDK S600 |
| 摄像头| SC132gs | 200W | RDK X5, RDK X5 Module, RDK S100, RDK S100P, RDK S600 |

代码仓库：[https://github.com/D-Robotics/hobot_mipi_cam.git](https://github.com/D-Robotics/hobot_mipi_cam.git)

### 支持平台

| 平台   | 运行方式      |
| ------ | ------------- |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble)  |
| RDK 100, RDK S100P | Ubuntu 22.04 (Humble)  |
| RDK S600 | Ubuntu 24.04 (Jazzy) |

### 准备工作

#### RDK 平台

1. 确认摄像头正确接入 RDK。

    如 SC230ai 双目摄像头的接入 RDK X5, RDK X5 Module 方式如下图：

    <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/image-X5-PI-DualCamera.jpg" alt="SC230AI 双目摄像头接入 RDK X5 的连接示意图" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

    如 SC230ai 双目摄像头的接入 S100 方式如下图：

    <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/image-S100-sc230ai-DualCamera.png" alt="SC230AI 双目摄像头接入 RDK S100 的连接示意图" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

2. RDK 已烧录好 RDK OS 系统

3. RDK 已成功安装 tros.b

4. 确认 PC 机能够通过网络访问 RDK

### 使用方式

#### RDK 平台

下面以 SC230ai 为例，介绍摄像头数据获取和预览的方法：

1. 只启动双目摄像机的启动方式,方便其他 node 订阅。
   
   (1) 通过下述命令启动 hobot_sensor 节点

    <DocScope products="RDK-X5">
    <Tabs groupId="tros-distro">
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
    # launch 方式启动
    ros2 launch mipi_cam mipi_cam_dual_channel.launch.py
    ```
    (2) 如程序输出如下信息，说明节点已成功启动

    ```text
    [INFO] [launch]: All log files can be found below /root/.ros/log/2024-09-18-19-15-26-160110-ubuntu-3931
    [INFO] [launch]: Default logging verbosity is set to INFO
    config_file_path is  /opt/tros/humble/lib/mipi_cam/config/
    Hobot shm pkg enables zero-copy with fastrtps profiles file: /opt/tros/humble/lib/hobot_shm/config/shm_fastdds.xml
    Hobot shm pkg sets RMW_FASTRTPS_USE_QOS_FROM_XML: 1
    env of RMW_FASTRTPS_USE_QOS_FROM_XML is  1 , ignore env setting
    [INFO] [mipi_cam-1]: process started with pid [3932]
    [mipi_cam-1] [WARN] [1726658126.449994704] [mipi_node]: frame_ts_type value: sensor
    [mipi_cam-1] [ERROR] [1726658126.455022356] [mipi_factory]: This is't support device type(), start defaule capture.
    [mipi_cam-1]
    [mipi_cam-1] [WARN] [1726658126.456074125] [mipi_cam]: this board support mipi:
    [mipi_cam-1] [WARN] [1726658126.456274529] [mipi_cam]: host 0
    [mipi_cam-1] [WARN] [1726658126.456333567] [mipi_cam]: host 2
    [mipi_cam-1] [WARN] [1726658128.722451045] [mipi_cam]: [init]->cap default init success.
    [mipi_cam-1]
    ...
    ```

2. Web 端查看双目摄像头图像，由于发布原始数据，需要一个编码 JPEG 图像的节点，一个用 webservice 发布的节点
   
   (1) 启动命令如下：

    <DocScope products="RDK-X5">
    <Tabs groupId="tros-distro">
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
    # launch 方式启动
    ros2 launch mipi_cam mipi_cam_dual_channel_websocket.launch.py
    ```

    (2) PC 打开浏览器（chrome/firefox/edge）输入 `http://IP:8000` （IP 为 RDK IP 地址），点击左上方 Web 端展示即可看到双目输出的实时画面
    <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/web-dualcamera-codec.jpg" alt="Web 端查看双目摄像头输出实时画面的效果" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

### 注意事项

1. 摄像头插拔注意事项

   **严禁在开发板未断电的情况下插拔摄像头，否则非常容易烧坏摄像头模组。**

2. 如遇到 hobot_sensor 节点启动异常，可通过下述步骤进行问题排查：
    - 检查硬件连接
    - 是否设置 tros.b 环境
    - 参数是否正确，具体参考[README.md](https://github.com/D-Robotics/hobot_mipi_cam/blob/develop/README.md)

## RGBD 图像采集

### 功能介绍

为实现环境感知能力，机器人产品中通常会搭载摄像头、ToF 等类型的传感器。为降低用户传感器适配和使用成本，TogetheROS.Bot 会对多种常用传感器进行封装，并抽象成 hobot_sensor 模块，支持 ROS 标准图像消息，自定义图像消息输出以及相机标定数据发布。目前已支持的 RGBD 传感器类型如下所示：

| 类型 | 型号 | 规格 | 支持平台 |
| ------ | ------ | ------ | ---- |
| 摄像头| CP3AM | 200W | RDK X3 |

代码仓库：[https://github.com/D-Robotics/hobot_rgbd_cam.git](https://github.com/D-Robotics/hobot_rgbd_cam.git)

### 支持平台

| 平台   | 运行方式      | 示例功能                                           |
| ------ | ------------- | -------------------------------------------------- |
|RDK X3| Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble)  | 启动 RGBD 摄像头，并在 PC 端通过 rviz2 预览 RGB 图和深度图 |

**注意：仅支持 RDK X3，RDK X3 Module 暂不支持。**

### 准备工作

#### RDK 平台

1. 确认摄像头正确接入 RDK，RGBD 模组接入 RDK X3 方式如下图：

    <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/hobot_rgbd.png" alt="RGBD 模组接入 RDK X3 的硬件连接示意图" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

    **注意：RGBD 模组需要额外转接板才能接到 RDK X3 上**。
2. RDK 已烧录好 Ubuntu 系统镜像。

3. RDK 已成功安装 tros.b

4. 确认 PC 机能够通过网络访问 RDK

5. PC 端需安装 ros2 foxy 版本和 rviz2，安装命令如下：

```shell
  sudo apt install ros-foxy-rviz-common ros-foxy-rviz-default-plugins ros-foxy-rviz2
```

### 使用方式

#### RDK 平台

下面以 CP3AM 为例，介绍摄像头数据获取和预览的方法：

1. 通过 SSH 登录 RDK，并通过下述命令启动 hobot_sensor 节点

    <DocScope products="RDK-X3">
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

    ```shell
    cp -r /opt/tros/${TROS_DISTRO}/lib/rgbd_sensor/parameter .
    # lanuch 方式启动
    ros2 launch rgbd_sensor rgbd_sensor.launch.py
    ```

2. 如程序输出如下信息，说明节点已成功启动

    ```text
    [WARN] [1654573498.706920307] [example]: [wuwl]->This is rgbd!
    sh: 1: echo: echo: I/O error
    pipeId[1], mipiIdx[1], vin_vps_mode[3]
    [ERROR]["LOG"][irs2381c_utility.c:192] 2381 enter sensor_init_setting
    [ERROR]["LOG"][irs2381c_utility.c:200] start write 2381c reg
    camera read reg: 0xa001 val:0x7
    ...
    [ERROR]["LOG"][irs2381c_utility.c:207] end write 2381c reg
    HB_MIPI_InitSensor end
    HB_MIPI_SetDevAttr end
    pstHbVideoDev->vin_fd = 29
    sensorID: 634-2362-2676-68d0
    find local calib_file

    find local calib_file

    SDK Version: V4.4.35 build 20220525 09:27:53.
    read file(./calib-0634-2362-2676-68d0.bin), ok, file_len=132096, read_len=132096.......
    module config file(user custom) is: ./parameter/T00P11A-17.ini.
    parse calib data, data len:132096...
    sunny_degzip2 decode_len=155575.
    calib data with crc.
    parse calib data, ok.
    max roi (firstly): (0, 224, 0, 128).
    cur roi (firstly): (0, 224, 0, 128).
    HB_MIPI_InitSensor end
    HB_MIPI_SetDevAttr end
    pstHbVideoDev->vin_fd = 55
    vencChnAttr.stRcAttr.enRcMode=11
    mmzAlloc paddr = 0x1a6e6000, vaddr = 0x917e1000
    camera read reg: 0x9400 val:0x1
    ...

    [wuwl-StartCamera]->camT=3, ret=0.
    camera read reg: 0x3e val:0x40
    [ERROR]["vio_devop"][utils/dev_ioctl.c:121] [499334.399304]dev_node_dqbuf_ispoll[121]: failed to ioctl: dq (14 - Bad address)
    [ERROR]["vio_devop"][utils/dev_ioctl.c:189] [499334.399355]entity_node_dqbuf_ispoll[189]: dev type(9) dq failed

    [ERROR]["vio_core"][commom_grp/binding_main.c:1034] [499334.399371]comm_dq_no_data[1034]: G1 MIPI_SIF_MODULE module chn0 dq failed! maybe framedrop error_detail -14

    [wuwl-StartCamera]->camT=1, ret=0.
    [INFO] [1654573500.226606117] [rclcpp]: [childStart]-> ret=0 !

    [INFO] [1654573500.226831567] [rclcpp]: [StartStream]->pthread create sucess

    [INFO] [1654573500.226963854] [rclcpp]: <========>[doCapStreamLoop]->Start.

    [WARN] [1654573500.226998103] [rgbd_node]: [RgbdNode]->mipinode init sucess.

    [WARN] [1654573500.227352507] [example]: [wuwl]->rgbd init!
    [WARN] [1654573500.228502174] [example]: [wuwl]->rgbd add_node!

    [INFO] [1662723985.860666547] [rgbd_node]: publish camera info.
    [INFO] [1662723985.866077156] [rgbd_node]: [pub_ori_pcl]->pub pcl w:h=24192:1,nIdx-24192:sz=24192.
    [INFO] [1662723985.876428980] [rgbd_node]: [timer_ros_pub]->pub dep w:h=224:129,sz=982464, infra w:h=224:108, sz=24192.

    [INFO] [1662723985.946767230] [rgbd_node]: publish camera info.
    [INFO] [1662723985.951415418] [rgbd_node]: [pub_ori_pcl]->pub pcl w:h=24192:1,nIdx-24192:sz=24192.
    [INFO] [1662723985.960161280] [rgbd_node]: [timer_ros_pub]->pub dep w:h=224:129,sz=982464, infra w:h=224:108, sz=24192.
    ...

    ```

3. PC 机上查询当前话题，查询命令及返回结果如下：

<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

   ```shell
   source /opt/ros/foxy/setup.bash
   ```

</TabItem>

<TabItem value="humble" label="Humble">

   ```shell
   source /opt/ros/humble/setup.bash
   ```

</TabItem>

</Tabs>

    ```bash
    ros2 topic list
    ```

    输出：

    ```text
    /rgbd_CP3AM/depth/image_rect_raw

    /rgbd_CP3AM/depth/color/points

    /rgbd_CP3AM/color/camera_info

    /rgbd_CP3AM/aligned_depth_to_color/color/points

    /rgbd_CP3AM/infra/image_rect_raw

    /rgbd_CP3AM/color/image_rect_raw

    /parameter_events

    /rosout
    ```

4. PC 机上订阅话题，并预览摄像头数据

<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

   ```shell
   source /opt/ros/foxy/setup.bash
   ```

</TabItem>

<TabItem value="humble" label="Humble">

   ```shell
   source /opt/ros/humble/setup.bash
   ```

</TabItem>

</Tabs>

    ```bash
    ros2 run rviz2 rviz2
    ```

    在 rviz2 界面上点击 add 按钮，添加 rgbd_sensor 所发布 topic （参见目录 3 所标示的 rgbd_CP3AM 相关 topic），订阅点云需要把 rviz2 配置的 Global Options 里面的选项 “Fixed Frame” 修改为 “depth”，就可以观看实时点云信息。在 point 话题配置中，里面 point type 选择 points 即可。

    <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/hobot_rgbd_sensor.png" alt="在 RViz2 中订阅 RGBD 相关话题并显示点云的效果" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

5. 在 PC 机上查询相机内参

<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

   ```shell
   source /opt/ros/foxy/setup.bash
   ```

</TabItem>

<TabItem value="humble" label="Humble">

   ```shell
   source /opt/ros/humble/setup.bash
   ```

</TabItem>

</Tabs>

    ```bash
    ros2 topic echo /rgbd_CP3AM/color/camera_info
    ```

    输出结果如下:

    ```text
    header:
    stamp:
        sec: 119811
        nanosec: 831645108
    frame_id: color
    height: 1080
    width: 1920
    distortion_model: plumb_bob
    d:
    - -0.32267
    - 0.083221
    - 0.000164
    - -0.002134
    - 0.0
    k:
    - 1066.158339
    - 0.0
    - 981.393777
    - 0.0
    - 1068.659998
    - 545.569587
    - 0.0
    - 0.0
    - 1.0
    r:
    - 1.0
    - 0.0
    - 0.0
    - 0.0
    - 1.0
    - 0.0
    - 0.0
    - 0.0
    - 1.0
    p:
    - 741.315308
    - 0.0
    - 968.865379
    - 0.0
    - 0.0
    - 969.43042
    - 546.524343
    - 0.0
    - 0.0
    - 0.0
    - 1.0
    - 0.0
    binning_x: 0
    binning_y: 0
    roi:
    x_offset: 0
    y_offset: 0
    height: 0
    width: 0
    do_rectify: false
    ```

### 注意事项

如遇到 hobot_sensor 节点启动异常，可通过下述步骤进行问题排查：

1. 检查硬件连接
2. 是否设置 tros.b 环境
3. 参数是否正确，具体参考 Hobot_Sensors README.md

## RealSense 图像采集

### 功能介绍

双目相机是机器人开发常用的传感器，经常扮演着机器人“眼睛”的角色。双目相机在机器人上的应用涵盖了多个方面，例如导航避障、目标识别、三维重建、人机交互等。RDK 平台也支持市面上常见的双目相机，例如 RealSense、Orbbec、ZED 等系列相机。

目前 RealSense 和 Orbbec 的双目相机在 ROS 上的使用是按照如下架构实现的，首先需要不同硬件平台上编译的 SDK 库文件，相机的 SDK 提供了相机启动、相机设置等 API 接口，在此基础上，再进行 ROS 封装，即可实现 ROS 调用相机。

所以，双目相机 ROS 功能包的一般安装流程是：首先安装相机的 SDK 库文件，然后安装相机的 ROS 封装功能包。

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/stereo-camera-ros-arch.png" alt="双目相机 SDK 与 ROS 功能包分层安装架构示意图" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

本节介绍 RealSense 相机在 RDK 平台上的使用方法。

### 支持平台

| 平台    | 运行方式     |
| ------- | ------------ |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) |
### 准备工作

#### RDK 平台

1. 确认手中 RealSense 相机工作正常，将 USB 数据线接入 RDK 的 USB 插槽
2. RDK 已烧录好 Ubuntu 系统镜像
3. RDK 已成功安装 tros.b
4. 确认 PC 机能够通过网络访问 RDK

### 使用方式

直接使用 apt 命令安装 RealSense SDK2.0 以及 RealSense ROS wrapper 后，即可在 RDK 平台使用 Realsense 系列相机。

此处列出 RealSense SDK2.0 和 RealSense ROS wrapper 的 GitHub 仓库，本教程也是参考这两个仓库编写，用户可以查看仓库中更为详细的教程。

- RealSense SDK2.0：https://github.com/IntelRealSense/librealsense
- RealSense ROS wrapper：https://github.com/IntelRealSense/realsense-ros/tree/ros2-development

#### 1. 通过串口或者 SSH 登录 RDK，确认 ROS 的版本

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

   ```shell
   # 配置tros.b环境
   source /opt/tros/setup.bash
   # 打印ros版本的环境变量
   echo $ROS_DISTRO
   ```

</TabItem>

<TabItem value="humble" label="Humble">

   ```shell
   # 配置tros.b环境
   source /opt/tros/humble/setup.bash
   # 打印ros版本的环境变量
   echo $ROS_DISTRO
   ```

</TabItem>

</Tabs>
</DocScope>

#### 2. apt 安装 RealSense SDK2.0 以及 RealSense ROS2 wrapper

```shell
# 安装RealSense SDK2.0
sudo apt-get install ros-$ROS_DISTRO-librealsense2* -y
# 安装RealSense ROS2 wrapper
sudo apt-get install ros-$ROS_DISTRO-realsense2-* -y
```

#### 3. RealSense 相机启动

安装完毕后，即可通过 ROS 命令启动 RealSense 相机：

```shell
ros2 launch realsense2_camera rs_launch.py
```

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/realsense-start-up-log.png" alt="RealSense 相机 ros2 launch 启动成功后的终端日志" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

可以通过 `ros2 topic list` 查看 RealSense 发布的话题，默认参数启动 RealSense 相机只会开启相机的深度数据流和 RGB 数据流。

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/realsense-basic-topic.png" alt="默认参数下 RealSense 发布的深度与 RGB 话题列表" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

RealSense ROS wrapper 提供了很多可设置参数，例如 `enable_infra1:=true` 和 `pointcloud.enable:=true` 会开启相机的左 IR 数据流和点云数据流。

```shell
ros2 launch realsense2_camera rs_launch.py enable_infra1:=true pointcloud.enable:=true
```

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/realsense-ir-pointcloud-topic.png" alt="开启红外与点云后 RealSense 发布的话题列表示意" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/realsense-image.png" alt="RealSense 红外与点云相关话题对应的图像/数据示意" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

此外 RealSense 还开启了一些服务，可以通过 `ros2 service list` 查看，例如可以通过服务查询相机的序列号、固件版本等信息。

```shell
ros2 service call /camera/device_info realsense2_camera_msgs/srv/DeviceInfo
```

更多话题和服务的相关设置可参考 RealSense ROS wrapper 的 GitHub 仓库。

#### 4. 深度和 RGB 对齐

在实际的应用中，经常需要双目相机的深度图对齐彩色图，RealSense 也提供了对应的启动方式。

```shell
ros2 launch realsense2_camera rs_launch.py enable_rgbd:=true enable_sync:=true align_depth.enable:=true enable_color:=true enable_depth:=true
```

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/realsense-d2c-topic.png" alt="开启深度对齐到彩色后 RealSense 发布的话题列表" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/realsense-image-align.png" alt="RealSense 深度对齐彩色（D2C）后的图像效果" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

#### 5. 图像和点云的显示

要显示 RealSense 的图像和点云，有多种方式，可参考[数据展示](./demo_render.md)，例如可以在 PC 机上使用 `rviz2` 显示，这种方式需要确认 PC 机能够通过网络访问 RDK，数据通过网络传输，压力较大，可能会出现卡顿的现象。

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/realsense-rviz2.png" alt="在 RViz2 中显示 RealSense 图像与点云的可视化效果" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

推荐直接在 RDK 上直接读取数据，确认出流是否正常，可以通过 `ros2 topic echo topic_name` 打印数据或者编写代码订阅相应话题。

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/realsense-topic-echo.png" alt="使用 ros2 topic echo 在板端确认 RealSense 出流数据的终端输出" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

## 奥比中光(Orbbec)相机图像采集

### 功能介绍

双目相机是机器人开发常用的传感器，经常扮演着机器人“眼睛”的角色。双目相机在机器人上的应用涵盖了多个方面，例如导航避障、目标识别、三维重建、人机交互等。RDK 平台也支持市面上常见的双目相机，例如 RealSense、Orbbec、ZED 等系列相机。

目前 RealSense 和 Orbbec 的双目相机在 ROS 上的使用是按照如下架构实现的，首先需要不同硬件平台上编译的 SDK 库文件，相机的 SDK 提供了相机启动、相机设置等 API 接口，在此基础上，再进行 ROS 封装，即可实现 ROS 调用相机。

所以，双目相机 ROS 功能包的一般安装流程是：首先安装相机的 SDK 库文件，然后安装相机的 ROS 封装功能包。

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/stereo-camera-ros-arch.png" alt="双目相机 SDK 与 ROS 功能包分层安装架构示意图" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

本节介绍 Orbbec 相机在 RDK 平台上的使用方法。

### 支持平台

| 平台    | 运行方式     |
| ------- | ------------ |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) |

### 准备工作

#### RDK 平台

1. 确认手中 Orbbec 相机工作正常，将 USB 数据线接入 RDK 的<font color="red"><b>USB3.0</b></font>插槽（目前发现 USB2.0 可能存在无法启动的问题）
2. RDK 已烧录好 Ubuntu 系统镜像
3. RDK 已成功安装 tros.b
4. 确认 PC 机能够通过网络访问 RDK

### 使用方式

目前 Orbbec 相机不支持直接使用 apt 命令安装 SDK 库文件以及 ROS wrapper 功能包，需要下载源码编译后才能在 RDK 平台运行。

此处列出 Orbbec SDK 和 Orbbec ROS2 wrapper 的 GitHub 仓库，本教程也是参考这两个仓库编写，用户可以查看仓库中更为详细的教程。

- Orbbec SDK：https://github.com/orbbec/OrbbecSDK
- Orbbec ROS2 wrapper：https://github.com/orbbec/OrbbecSDK_ROS2

#### 1. 通过串口或者 SSH 登录 RDK，确认 ROS 的版本

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

   ```shell
   # 配置tros.b环境
   source /opt/tros/setup.bash
   # 打印ros版本的环境变量
   echo $ROS_DISTRO
   ```

</TabItem>

<TabItem value="humble" label="Humble">

   ```shell
   # 配置tros.b环境
   source /opt/tros/humble/setup.bash
   # 打印ros版本的环境变量
   echo $ROS_DISTRO
   ```

</TabItem>

</Tabs>
</DocScope>

#### 2. 下载 Orbbec ROS2 wrapper 源码进行编译

```shell
# 先创建一个ros工作区
mkdir -p tros_ws/src
cd tros_ws/src

# 下载Orbbec ROS2 wrapper源码到tros_ws/src目录
git clone https://github.com/orbbec/OrbbecSDK_ROS2.git
```

注意，OrbbecSDK_ROS2 这个仓库已经包含了 Orbbec 相机的 SDK 库文件，在 `OrbbecSDK_ROS2/orbbec_camera/SDK` 目录下，在 RDK 平台编译的过程中会依赖 `arm64` 的版本。

下载好源码，接下来就要进行编译，但编译该程序至少需要 4GB 以上的内存，在 RDK 平台可能会出现内存不足的情况，导致编译失败。

解决的方案有两个:

1. 设置 swap 空间，充当临时内存
2. 使用交叉编译，在 PC 上编译，然后在 RDK 上运行

方案 1 的优点是操作简单，并且可以在 RDK 平台上直接编译，但缺点是由于 RDK 平台性能有限，编译速度较慢，例如在 RDK X3 平台上编译耗时需要 30 分钟。方案 2 的优点是编译速度快，但缺点是搭建交叉编译环境较为复杂。本教程介绍方案 1 的实现，方案 2 可参考教程：[交叉编译环境部署](https://developer.d-robotics.cc/forumDetail/112555549341653662)。

下面介绍 swap 空间的使用方式：

```shell
# 创建一个4GB的swap文件，该文件位于/swapfile目录
sudo dd if=/dev/zero of=/swapfile bs=1M count=4096
# 出于安全考虑，将Swap文件的权限设置为只有root用户可以读取和写入
sudo chmod 600 /swapfile
# 使用mkswap命令将文件格式化为swap空间
sudo mkswap /swapfile
# 使用swapon命令启用swap文件
sudo swapon /swapfile
```

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/swapfile.png" alt="创建并启用 swapfile 交换分区的命令执行示意" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

设置好 swap 空间后，可以使用 `swapon --show` 、 `free -h` 或 `htop` 命令查看当前的 swap 使用情况，例如使用 `htop` 命令查看：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/htop-swap.png" alt="使用 htop 查看系统 swap 使用情况的界面截图" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

这样设置只是临时生效，断电重启后 swap 空间会失效，如果希望系统重启后仍然使用这个 swap 文件，可以重新执行一下 `sudo swapon /swapfile` ，或者将其添加到 `/etc/fstab文` 件中。

```shell
# 通过vim打开/etc/fstab
sudo vim /etc/fstab
# 添加以下行，保存退出
/swapfile none swap sw 0 0
# 执行sync刷新一下缓存，确保所有数据已正确地写入磁盘
sync
```

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/etc-fstab.png" alt="在 /etc/fstab 中配置 swap 开机自动挂载的文件内容示意" style={{ width: '60%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

如果要删除 swap 空间的话，可以执行如下命令。

```shell
# 使用swapoff命令禁用Swap文件
sudo swapoff /swapfile
# 删除swap文件
sudo rm -rf /swapfile
# 如果在/etc/fstab添加了swap文件的条目，则需要移除该条目
sudo vim /etc/fstab
# 删除以下行
/swapfile none swap sw 0 0
```

通过以上操作开启 swap 空间后，就可以进行编译了。

```shell
# 回到ros的工作空间
cd tros_ws
# 执行colcon编译，编译时间较久，请耐心等待
colcon build
```

在 RDK X3 平台的编译结果：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/orbbec-ros-colcon-build.png" alt="Orbbec 相机 ROS 包在 RDK X3 上 colcon 编译成功的结果" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

#### 3. Orbbec 相机启动

编译完毕后，即可通过 ROS 命令启动 Orbbec 相机，OrbbecSDK_ROS2 有 Orbbec 所有相机的启动文件，包括 Orbbec 的 Astra 系列、Dabai 系列、Gemini 系列，只需要对应的 launch 文件即可启动，本教程以 Gemini2 相机为例。

```shell
cd tros_ws
source ./install/setup.bash
ros2 launch orbbec_camera gemini2.launch.py
```

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/orbbec-start-up-log.png" alt="Orbbec Gemini2 相机 launch 启动成功后的终端日志" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

可以通过 `ros2 topic list` 查看 Gemini2 发布的话题，默认参数启动 Gemini2 相机会开启相机的深度数据流、RGB 数据流、IR 数据流和点云数据流。

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/orbbec-topic-list.png" alt="Gemini2 默认启动后发布的深度、RGB、IR 与点云话题列表" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

Orbbec ROS2 wrapper 提供了很多可设置参数，例如 `enable_point_cloud:=false` 和 `enable_colored_point_cloud:=false` 会关闭相机的点云数据流。

此外 Orbbec 相机还开启了一些服务，可以通过 `ros2 service list` 查看，例如可以通过服务查询相机的 SDK 版本、查询或设置曝光时间和增益、开启或关闭激光等，例如：

```shell
# 查询SDK版本
ros2 service call /camera/get_sdk_version orbbec_camera_msgs/srv/GetString '{}'
# 关闭彩色相机自动曝光
ros2 service call /camera/set_color_auto_exposure std_srvs/srv/SetBool '{data: false}'
# 开启激光
ros2 service call  /camera/set_laser_enable std_srvs/srv/SetBool '{data: true}'
```

更多话题和服务的相关设置可参考 Orbbec ROS2 wrapper 的 GitHub 仓库。

#### 4. 深度和 RGB 对齐

在实际的应用中，经常需要双目相机的深度图对齐彩色图，Orbbec 也提供了对应的启动方式。

```shell
cd tros_ws
source ./install/setup.bash
ros2 launch orbbec_camera gemini2.launch.py depth_registration:=true
```

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/orbbec-image-align.png" alt="Orbbec 开启深度配准后的图像对齐效果" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

#### 5. 图像和点云的显示

要显示 Orbbec 的图像和点云，有多种方式，可参考[数据展示](./demo_render.md)，例如可以在 PC 机上使用 `rviz2` 显示，这种方式需要确认 PC 机能够通过网络访问 RDK，数据通过网络传输，压力较大，可能会出现卡顿的现象。

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/orbbec-rviz2.png" alt="在 RViz2 中显示 Orbbec 图像与点云的可视化效果" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

推荐直接在 RDK 上直接读取数据，确认出流是否正常，可以通过 `ros2 topic echo topic_name` 打印数据或者编写代码订阅相应话题。

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/orbbec-topic-echo.png" alt="使用 ros2 topic echo 确认 Orbbec 出流数据的终端输出" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

## ZED 相机图像采集

### 功能介绍

双目相机是机器人开发常用的传感器，经常扮演着机器人“眼睛”的角色。双目相机在机器人上的应用涵盖了多个方面，例如导航避障、目标识别、三维重建、人机交互等。RDK 平台也支持市面上常见的双目相机，例如 RealSense、Orbbec、ZED 等系列相机。

代码仓库：[https://github.com/D-Robotics/hobot_zed_cam](https://github.com/D-Robotics/hobot_zed_cam)

本节介绍 ZED 相机在 RDK 平台上的使用方法。

### 支持平台

| 平台    | 运行方式     |
| ------- | ------------ |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) |

### 准备工作

#### RDK 平台

1. 确认手中 ZED 相机工作正常，将 USB 数据线接入 RDK 的 USB 插槽
2. RDK 已烧录好 RDK OS 系统
3. RDK 已成功安装 tros.b
4. 确认 PC 机能够通过网络访问 RDK

### 使用方式

1. 通过 SSH 登录 RDK，并通过下述命令启动 ZED 相机

<DocScope products="RDK-X5">
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

# 启动ZED相机，发布双目图像数据
ros2 launch hobot_zed_cam pub_stereo_imgs.launch.py need_rectify:=true
```

2. 如程序输出如下信息，说明节点已成功启动

```shell
[anypub_stereo_imgs-1] [INFO] [0946684888.710715101] [pub_stereo_imgs_nv12_node]: => connected to camera sn: 38085162[/dev/video0]
[anypub_stereo_imgs-1] [INFO] [0946684888.779280740] [pub_stereo_imgs_nv12_node]: => calibration file found. Loading...
[anypub_stereo_imgs-1] [INFO] [0946684888.831008271] [pub_stereo_imgs_nv12_node]: => camera Matrix L:
[anypub_stereo_imgs-1] [514.5878861678406, 0, 665.3764572143555, 0;
[anypub_stereo_imgs-1]  0, 514.5878861678406, 320.3872646755642, 0;
[anypub_stereo_imgs-1]  0, 0, 1, 0]
[anypub_stereo_imgs-1] [INFO] [0946684888.831235937] [pub_stereo_imgs_nv12_node]: => camera Matrix R:
[anypub_stereo_imgs-1] [514.5878861678406, 0, 665.3764572143555, 61695.48427422668;
[anypub_stereo_imgs-1]  0, 514.5878861678406, 320.3872646755642, 0;
[anypub_stereo_imgs-1]  0, 0, 1, 0]
[anypub_stereo_imgs-1] [INFO] [0946684888.831287187] [pub_stereo_imgs_nv12_node]: => rectified fx: 514.587886, fy: 514.587886, cx: 665.376457, cy: 320.387265, base_line: 0.119893
[anypub_stereo_imgs-1] [INFO] [0946684888.831357562] [pub_stereo_imgs_nv12_node]: => camera_fx:=514.587886 camera_fy:=514.587886 camera_cx:=665.376457 camera_cy:=320.387265 base_line:=0.119893
[anypub_stereo_imgs-1] [INFO] [0946684888.851400416] [pub_stereo_imgs_nv12_node]: => raw img size: [1280, 720]
[anypub_stereo_imgs-1] [INFO] [0946684888.883419384] [pub_stereo_imgs_nv12_node]: => rectify img size: [1280, 640]
```

3. PC 打开浏览器 `Chrome/Firefox/Edge` ，输入 `IP:8000` （IP 为 RDK 的 IP 地址），点击左上方 Web 端展示即可查看 ZED 相机实时画面。

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_sensor/zed_cam_pic.png" alt="Web 端展示的 ZED 相机实时画面" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />
