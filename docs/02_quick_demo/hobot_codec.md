---
sidebar_position: 3
---

# 5.2.3 图像编解码

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 功能介绍

图像编解码功能与 ROS image_transport package 类似，RDK 采用硬件单元加速 MJPEG/H264/H265 与 BGR8/RGB8/NV12 格式之间转换，可以大幅降低 CPU 占用的同时提升格式转换效率，X86 平台仅支持 MJPEG 与 BGR8/RGB8/NV12 格式之间的转换。

代码仓库：(https://github.com/D-Robotics/hobot_codec)

## 支持平台

| 平台    | 运行方式     | 示例功能                       |
| ------- | ------------ | ------------------------------ |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | 启动 MIPI 摄像头获取图像，然后进行图像编码，最后通过 Web 展示 |
| RDK X5, RDK X5 Module, RDK S100 | Ubuntu 22.04 (Humble) | 启动 MIPI 摄像头获取图像，然后进行图像编码，最后通过 Web 展示 |
| RDK S600 | Ubuntu 24.04 (Jazzy) | 启动 MIPI 摄像头获取图像，然后进行图像编码，最后通过 Web 展示 |
| X86     | Ubuntu 20.04 (Foxy) | 使用图像发布工具发布 YUV 图像，然后进行图像编码，最后通过 Web 展示 |

## 准备工作

### RDK 平台

1. RDK 已烧录好 Ubuntu 系统镜像。

2. RDK 已成功安装 TogetheROS.Bot。

3. RDK 已连接摄像头 F37 或其他 MIPI 摄像头。

### X86 平台

1. X86 环境已配置 Ubuntu 20.04 系统镜像。

2. X86 环境已安装 X86 版本 tros.b。

## 使用方式

下面以 JPEG 编码为例，介绍从摄像头或图像发布工具获取 NV12 格式图片数据，经过 JPEG 压缩编码后，实现在 PC 的 Web 端预览图片。

### RDK 平台

1. 获取 YUV 数据，并启动 JPGE 编码：

    通过 SSH 登录 RDK，使用 mipi_cam 作为数据来源，配置 hobot_codec 输入为 NV12 格式，输出为 JPEG 格式，可修改 mipi_cam 为实际使用的 sensor 型号。

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

    ```shell
    ros2 launch mipi_cam mipi_cam.launch.py mipi_video_device:=F37
    ```

    b. 启动 hobot_codec 编码

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
    ros2 launch hobot_codec hobot_codec.launch.py codec_in_mode:=shared_mem codec_in_format:=nv12 codec_out_mode:=ros codec_out_format:=jpeg codec_sub_topic:=/hbmem_img codec_pub_topic:=/image_jpeg
    ```

2. Web 端查看 JPEG 编码图像，另起一个终端：

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
    ros2 launch websocket websocket.launch.py websocket_image_topic:=/image_jpeg websocket_only_show_image:=true
    ```

3. PC 打开浏览器（chrome/firefox/edge）输入 `http://IP:8000` ，IP 为 RDK/X86 设备 IP 地址，点击左上方 Web 端展示即可查看 JPEG 编码的实时画面

    <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/hobot_codec/web-f37-codec.png" alt="Web 端查看 JPEG 编码实时画面的展示效果" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

### X86 平台

1. 获取 YUV 数据，并启动 JPGE 编码：

    a. 启动图像发布节点

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
    //从tros.b的安装路径中拷贝出运行示例需要的图片文件
    cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_image_publisher/config/ .

    // 启动图像发布节点
    
    ros2 launch hobot_image_publisher hobot_image_publisher.launch.py publish_output_image_w:=960 publish_output_image_h:=544 publish_message_topic_name:=/hbmem_img publish_fps:=20 
    ```

    b. 启动 JPEG 图片编码&发布 pkg

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
    ros2 launch hobot_codec hobot_codec.launch.py codec_in_mode:=shared_mem codec_in_format:=nv12 codec_out_mode:=ros codec_out_format:=jpeg codec_sub_topic:=/hbmem_img codec_pub_topic:=/image_jpeg
    ```

2. Web 端查看 JPEG 编码图像，另起一个终端：

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
    ros2 launch websocket websocket.launch.py websocket_image_topic:=/image_jpeg websocket_only_show_image:=true
    ```

3. PC 打开浏览器（chrome/firefox/edge）输入 `http://IP:8000` ，IP 为 RDK/X86 设备 IP 地址，点击左上方 Web 端展示即可查看 JPEG 编码的实时画面。

## 注意事项

如遇到 Hobot codec 节点启动异常，可通过下述步骤进行问题排查：

1. 是否设置 tros.b 环境
2. 参数是否正确，具体参考 Hobot_codec [README.md](https://github.com/D-Robotics/hobot_codec)
