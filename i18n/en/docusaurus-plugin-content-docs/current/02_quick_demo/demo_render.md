---
sidebar_position: 2
---

# 5.2.2 Data Display

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Web Display

### Overview

Web display is used to preview camera images (JPEG format) and algorithm results. Images and algorithm results are transmitted over the network to a PC browser for rendering. The display client also supports showing video only without rendering intelligent results.

Code repository: [https://github.com/D-Robotics/hobot_websocket](https://github.com/D-Robotics/hobot_websocket)

### Supported Platforms

| Platform    | Runtime Environment      | Example Function                       |
| ------- | ------------- | ------------------------------ |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble)  | Start MIPI camera and display images via Web |
| RDK X5, RDK X5 Module,RDK S100 | Ubuntu 22.04 (Humble)  | Start MIPI camera and display images via Web |
| RDK S600 | Ubuntu 24.04 (Jazzy) | Start MIPI camera and display images via Web |
| X86     | Ubuntu 20.04 (Foxy) | Start USB camera and display images via Web |

### Prerequisites

#### RDK Platform

1. Confirm the F37 camera is correctly connected to RDK

2. Confirm the PC can access RDK over the network

3. Confirm TogetheROS.Bot has been successfully installed

#### X86 Platform

1. Confirm the X86 platform is running Ubuntu 20.04 and tros.b has been successfully installed

2. Confirm the USB camera is connected to the host USB port and can be recognized normally

### Usage

#### RDK Platform

1. Log in to RDK via SSH and start the board-side programs

    a. Start mipi_cam

   <DocScope products="RDK-X3,RDK-X5">
   <Tabs groupId="tros-distro">
      <TabItem value="foxy" label="Foxy">

      ```bash
      # Configure tros.b environment
      source /opt/tros/setup.bash
      ```

      </TabItem>

      <TabItem value="humble" label="Humble">

      ```bash
      # Configure tros.b environment
      source /opt/tros/humble/setup.bash
      ```

      </TabItem>

      <TabItem value="jazzy" label="Jazzy">

      ```bash
      # Configure tros.b environment
      source /opt/tros/jazzy/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   <DocScope products="RDK-S100">
   <Tabs groupId="tros-distro">
      <TabItem value="humble" label="Humble">

      ```bash
      # Configure tros.b environment
      source /opt/tros/humble/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   <DocScope products="RDK-S600">
   <Tabs groupId="tros-distro">
      <TabItem value="jazzy" label="Jazzy">

      ```bash
      # Configure tros.b environment
      source /opt/tros/jazzy/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   ```bash
    ros2 launch mipi_cam mipi_cam.launch.py mipi_video_device:=F37
    ```

    b. Start encoding

   <DocScope products="RDK-X3,RDK-X5">
   <Tabs groupId="tros-distro">
      <TabItem value="foxy" label="Foxy">

      ```bash
      # Configure tros.b environment
      source /opt/tros/setup.bash
      ```

      </TabItem>

      <TabItem value="humble" label="Humble">

      ```bash
      # Configure tros.b environment
      source /opt/tros/humble/setup.bash
      ```

      </TabItem>

      <TabItem value="jazzy" label="Jazzy">

      ```bash
      # Configure tros.b environment
      source /opt/tros/jazzy/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   <DocScope products="RDK-S100">
   <Tabs groupId="tros-distro">
      <TabItem value="humble" label="Humble">

      ```bash
      # Configure tros.b environment
      source /opt/tros/humble/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   <DocScope products="RDK-S600">
   <Tabs groupId="tros-distro">
      <TabItem value="jazzy" label="Jazzy">

      ```bash
      # Configure tros.b environment
      source /opt/tros/jazzy/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>


   ```bash
   ros2 launch hobot_codec hobot_codec_encode.launch.py
   ```

    c. Start websocket

   <DocScope products="RDK-X3,RDK-X5">
   <Tabs groupId="tros-distro">
      <TabItem value="foxy" label="Foxy">

      ```bash
      # Configure tros.b environment
      source /opt/tros/setup.bash
      ```

      </TabItem>

      <TabItem value="humble" label="Humble">

      ```bash
      # Configure tros.b environment
      source /opt/tros/humble/setup.bash
      ```

      </TabItem>

      <TabItem value="jazzy" label="Jazzy">

      ```bash
      # Configure tros.b environment
      source /opt/tros/jazzy/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   <DocScope products="RDK-S100">
   <Tabs groupId="tros-distro">
      <TabItem value="humble" label="Humble">

      ```bash
      # Configure tros.b environment
      source /opt/tros/humble/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   <DocScope products="RDK-S600">
   <Tabs groupId="tros-distro">
      <TabItem value="jazzy" label="Jazzy">

      ```bash
      # Configure tros.b environment
      source /opt/tros/jazzy/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   ```bash
   ros2 launch websocket websocket.launch.py websocket_image_topic:=/image_jpeg websocket_only_show_image:=true
   ```

2. Enter `http://IP:8000` in a PC browser (Chrome/Firefox/Edge) to view the image, where IP is the RDK IP address.

   ![websocket](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/websocket.png)

#### X86 Platform

1. Start the hobot_usb_cam node

   ```bash
   # Configure tros.b environment
   source /opt/tros/setup.bash
   # Change usb_video_device to the actual USB camera video node
   ros2 launch hobot_usb_cam hobot_usb_cam.launch.py usb_image_width:=1280 usb_image_height:=720 usb_video_device:=/dev/video0
   ```

2. Start the websocket node

   ```bash
   # Configure tros.b environment
   source /opt/tros/setup.bash
   ros2 launch websocket websocket.launch.py websocket_image_topic:=/image websocket_only_show_image:=true
   ```

3. Enter `http://IP:8000` in a PC browser (Chrome/Firefox/Edge) to view the image, where IP is the PC IP address. You can also use localhost when accessing locally.

### Notes

1. websocket requires port 8000. If the port is occupied, startup will fail. Solutions:

   - Use the `lsof -i:8000` command to check which process is using port 8000, then use `kill <PID>` to close the process occupying port 8000, and restart websocket.

   - If you do not want to stop the service currently using port 8000, you can modify the `listen` port number in the `/opt/tros/${TROS_DISTRO}/lib/websocket/webservice/conf/nginx.conf` configuration file to a port number greater than 1024 that is not in use. After changing the port number, the URL used in the browser must also be updated accordingly.

<DocScope products="RDK X3,RDK X5">

## HDMI Display

### Overview

This section describes how to display camera NV12 images via HDMI. Connect RDK to a display via HDMI to show real-time image output, corresponding to the hobot_hdmi package.

Code repository: [https://github.com/D-Robotics/hobot_hdmi](https://github.com/D-Robotics/hobot_hdmi)

### Supported Platforms

| Platform     | Runtime Environment     | Example Function                       |
| -------- | ------------ | ------------------------------ |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | Start MIPI camera and display images via HDMI |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | Start MIPI camera and display images via HDMI |

:::caution **Note**
HDMI display **EOL** notice:
- `RDK X3` and `RDK X3 Module` platforms are supported up to version `2.1.0`, corresponding to TROS version `2.2.0 (2024-04-11)`.
- `RDK X5` and `RDK X5 Module` platforms are supported up to version `2.4.2`, corresponding to TROS version `2.3.1 (2024-11-20)`.
:::

### Prerequisites

#### RDK Platform

1. RDK has been flashed with the Ubuntu system image.

2. TogetheROS.Bot has been successfully installed on RDK.

3. RDK is connected to a display via HDMI.

### Usage

#### RDK Platform

Log in to the development board via SSH and start the board-side programs:

<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
# Configure tros.b environment
source /opt/tros/setup.bash
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
# Configure tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>
<TabItem value="jazzy" label="Jazzy">

```bash
# Configure tros.b environment
source /opt/tros/jazzy/setup.bash
```

</TabItem>

</Tabs>

When using RDK X5, run the following additional commands:
```bash
# Disable desktop display
sudo systemctl stop lightdm
# Copy runtime dependencies
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_hdmi/config/ .
```

```shell
# HDMI image rendering
ros2 launch hobot_hdmi hobot_hdmi.launch.py device:=F37
```

### Result Analysis

The terminal outputs the following information during execution:

```text
[INFO] [launch]: All log files can be found below /root/.ros/log/2022-07-27-15-27-26-362299-ubuntu-13432
[INFO] [launch]: Default logging verbosity is set to INFO
[INFO] [mipi_cam-1]: process started with pid [13434]
[INFO] [hobot_hdmi-2]: process started with pid [13436]
```

The display shows the image as follows:
![hdmi](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/hdmi.png)

</DocScope>

## RViz2 Display

### Overview

TogetheROS.Bot is compatible with ROS2. To conveniently preview image output, images can be obtained through RViz2.

### Supported Platforms

| Platform    | Runtime Environment      |
| ------- | ------------- |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) |
| RDK X5, RDK X5 Module, RDK S100 | Ubuntu 22.04 (Humble) |
| RDK S600 | Ubuntu 24.04 (Jazzy) |
### Prerequisites

#### RDK Platform

1. RDK has been flashed with the Ubuntu desktop system image.

2. tros.b has been successfully installed on RDK.

<DocScope products="RDK-X3,RDK-X5">
3. The PC has Ubuntu 20.04/Ubuntu 22.04, ROS2 Foxy/Humble desktop edition, and the RViz2 data visualization tool installed, and is on the same network segment as RDK (first three digits of IP address are the same).

   - ROS2 installation reference: [Foxy version](https://docs.ros.org/en/foxy/Installation/Ubuntu-Install-Debians.html), [Humble version](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html)

   - Install RViz2 on PC: `sudo apt install ros-$ROS_DISTRO-rviz-common ros-$ROS_DISTRO-rviz-default-plugins ros-$ROS_DISTRO-rviz2`. Where `$ROS_DISTRO` is the ROS2 version, such as `foxy` or `humble`.
</DocScope>

<DocScope products="RDK-S100">
3. The PC has Ubuntu 22.04, ROS2 Humble desktop edition, and the RViz2 data visualization tool installed, and is on the same network segment as RDK (first three digits of IP address are the same).

   - ROS2 installation reference: [Humble version](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html)

   - Install RViz2 on PC: `sudo apt install ros-$ROS_DISTRO-rviz-common ros-$ROS_DISTRO-rviz-default-plugins ros-$ROS_DISTRO-rviz2`. Where `$ROS_DISTRO` is the ROS2 version, such as `humble`.
</DocScope>

<DocScope products="RDK-S600">
3. The PC has Ubuntu 24.04, ROS2 Jazzy desktop edition, and the RViz2 data visualization tool installed, and is on the same network segment as RDK (first three digits of IP address are the same).

   - ROS2 installation reference: [Jazzy version](https://docs.ros.org/en/jazzy/Installation/Ubuntu-Install-Debians.html)

   - Install RViz2 on PC: `sudo apt install ros-$ROS_DISTRO-rviz-common ros-$ROS_DISTRO-rviz-default-plugins ros-$ROS_DISTRO-rviz2`. Where `$ROS_DISTRO` is the ROS2 version, such as `jazzy`.
</DocScope>

### Usage

#### RDK Platform

1. Log in to RDK via SSH and start the board-side programs

   <DocScope products="RDK-X3,RDK-X5">
   <Tabs groupId="tros-distro">
      <TabItem value="foxy" label="Foxy">

      ```bash
      # Configure tros.b environment
      source /opt/tros/setup.bash
      ```

      </TabItem>

      <TabItem value="humble" label="Humble">

      ```bash
      # Configure tros.b environment
      source /opt/tros/humble/setup.bash
      ```

      </TabItem>

      <TabItem value="jazzy" label="Jazzy">

      ```bash
      # Configure tros.b environment
      source /opt/tros/jazzy/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   <DocScope products="RDK-S100">
   <Tabs groupId="tros-distro">
      <TabItem value="humble" label="Humble">

      ```bash
      # Configure tros.b environment
      source /opt/tros/humble/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   <DocScope products="RDK-S600">
   <Tabs groupId="tros-distro">
      <TabItem value="jazzy" label="Jazzy">

      ```bash
      # Configure tros.b environment
      source /opt/tros/jazzy/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   ```shell
   # Start mipi camera to publish BGR8 format images
   ros2 launch mipi_cam mipi_cam.launch.py mipi_out_format:=bgr8 mipi_image_width:=480 mipi_image_height:=272 mipi_io_method:=ros mipi_video_device:=F37
   ```

   Note: Do not change mipi_out_format arbitrarily. RViz2 only supports image formats such as RGB8, RGBA8, BGR8, and BGRA8.

   If the program outputs the following information, the node has started successfully:

   ```shell
   [INFO] [launch]: All log files can be found below /root/.ros/log/2022-08-19-03-53-54-778203-ubuntu-2881662
   [INFO] [launch]: Default logging verbosity is set to INFO
   [INFO] [mipi_cam-1]: process started with pid [2881781]
   ```

2. Open a new window on RDK and query topics. Command and return result:

   <DocScope products="RDK-X3,RDK-X5">
   <Tabs groupId="tros-distro">
      <TabItem value="foxy" label="Foxy">

      ```bash
      # Configure tros.b environment
      source /opt/tros/setup.bash
      ```

      </TabItem>

      <TabItem value="humble" label="Humble">

      ```bash
      # Configure tros.b environment
      source /opt/tros/humble/setup.bash
      ```

      </TabItem>

      <TabItem value="jazzy" label="Jazzy">

      ```bash
      # Configure tros.b environment
      source /opt/tros/jazzy/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   <DocScope products="RDK-S100">
   <Tabs groupId="tros-distro">
      <TabItem value="humble" label="Humble">

      ```bash
      # Configure tros.b environment
      source /opt/tros/humble/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   <DocScope products="RDK-S600">
   <Tabs groupId="tros-distro">
      <TabItem value="jazzy" label="Jazzy">

      ```bash
      # Configure tros.b environment
      source /opt/tros/jazzy/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   ```shell
   # Query topics
   ros2 topic list
   ```

   Output:

   ```shell
   /camera_info
   /image_raw
   /parameter_events
   /rosout
   ```

3. Start RViz2 on RDK to subscribe to topics and preview camera data;

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
   # Install RViz2
   sudo apt install ros-${TROS_DISTRO}-rviz-common ros-${TROS_DISTRO}-rviz-default-plugins ros-${TROS_DISTRO}-rviz2
   # Start RViz2
   ros2 run rviz2 rviz2
   ```

   Note: To run rviz on RDK, use tools such as MobaXterm for SSH connection, or add the "-Y" parameter when connecting via command-line SSH.

   In the RViz2 interface, first click the add button, then select the published image by topic. In this example, the topic name is /image_raw, then click image:

   ![rviz2-config](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/rviz2-config.png)

   The image output looks like this:

   ![rviz2-result](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/rviz2-result.png)


## RQt Display

### Overview

TogetheROS.Bot is compatible with ROS2 and supports previewing compressed format images through RQt, which can significantly reduce network bandwidth consumption. The example in this section starts the MIPI camera on RDK to capture images, then uses RQt on RDK for preview.

### Supported Platforms

| Platform    | Runtime Environment      |
| ------- | ------------- |
| RDK X5, RDK X5 Module, RDK S100 | Ubuntu 22.04 (Humble) |
| RDK S600 | Ubuntu 24.04 (Jazzy) |

### Prerequisites

#### RDK Platform

1. RDK has been flashed with the Ubuntu desktop system image.

2. tros.b has been successfully installed on RDK.

<DocScope products="RDK-X3,RDK-X5">
3. The PC has Ubuntu 20.04/Ubuntu 22.04, ROS2 Foxy/Humble desktop edition, and the RQt data visualization tool installed, and is on the same network segment as RDK (first three digits of IP address are the same).

   - ROS2 installation reference: [Foxy version](https://docs.ros.org/en/foxy/Installation/Ubuntu-Install-Debians.html), [Humble version](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html)

   - Install rqt-image-view on PC: `ros-$ROS_DISTRO-rqt-image-view ros-$ROS_DISTRO-rqt`. Where `$ROS_DISTRO` is the ROS2 version, such as `foxy` or `humble`.
</DocScope>

<DocScope products="RDK-S100">
3. The PC has Ubuntu 22.04, ROS2 Humble desktop edition, and the RQt data visualization tool installed, and is on the same network segment as RDK (first three digits of IP address are the same).

   - ROS2 installation reference: [Humble version](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html)

   - Install rqt-image-view on PC: `ros-$ROS_DISTRO-rqt-image-view ros-$ROS_DISTRO-rqt`. Where `$ROS_DISTRO` is the ROS2 version, such as `humble`.
</DocScope>

<DocScope products="RDK-S600">
3. The PC has Ubuntu 24.04, ROS2 Jazzy desktop edition, and the RQt data visualization tool installed, and is on the same network segment as RDK (first three digits of IP address are the same).

   - ROS2 installation reference: [Jazzy version](https://docs.ros.org/en/jazzy/Installation/Ubuntu-Install-Debians.html)

   - Install rqt-image-view on PC: `ros-$ROS_DISTRO-rqt-image-view ros-$ROS_DISTRO-rqt`. Where `$ROS_DISTRO` is the ROS2 version, such as `jazzy`.
</DocScope>

### Usage

#### RDK Platform

1. Log in to the RDK development board via SSH and start the mipi camera:

   <DocScope products="RDK-X3,RDK-X5">
   <Tabs groupId="tros-distro">
      <TabItem value="foxy" label="Foxy">

      ```bash
      # Configure tros.b environment
      source /opt/tros/setup.bash
      ```

      </TabItem>

      <TabItem value="humble" label="Humble">

      ```bash
      # Configure tros.b environment
      source /opt/tros/humble/setup.bash
      ```

      </TabItem>

      <TabItem value="jazzy" label="Jazzy">

      ```bash
      # Configure tros.b environment
      source /opt/tros/jazzy/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   <DocScope products="RDK-S100">
   <Tabs groupId="tros-distro">
      <TabItem value="humble" label="Humble">

      ```bash
      # Configure tros.b environment
      source /opt/tros/humble/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   <DocScope products="RDK-S600">
   <Tabs groupId="tros-distro">
      <TabItem value="jazzy" label="Jazzy">

      ```bash
      # Configure tros.b environment
      source /opt/tros/jazzy/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   ```shell
   ros2 launch mipi_cam mipi_cam.launch.py mipi_image_width:=640 mipi_image_height:=480 mipi_video_device:=F37
   ```

2. Start hobot_codec on RDK to publish compressed format images:

   <DocScope products="RDK-X3,RDK-X5">
   <Tabs groupId="tros-distro">
      <TabItem value="foxy" label="Foxy">

      ```bash
      # Configure tros.b environment
      source /opt/tros/setup.bash
      ```

      </TabItem>

      <TabItem value="humble" label="Humble">

      ```bash
      # Configure tros.b environment
      source /opt/tros/humble/setup.bash
      ```

      </TabItem>

      <TabItem value="jazzy" label="Jazzy">

      ```bash
      # Configure tros.b environment
      source /opt/tros/jazzy/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   <DocScope products="RDK-S100">
   <Tabs groupId="tros-distro">
      <TabItem value="humble" label="Humble">

      ```bash
      # Configure tros.b environment
      source /opt/tros/humble/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   <DocScope products="RDK-S600">
   <Tabs groupId="tros-distro">
      <TabItem value="jazzy" label="Jazzy">

      ```bash
      # Configure tros.b environment
      source /opt/tros/jazzy/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   ```shell
   ros2 launch hobot_codec hobot_codec_encode.launch.py codec_out_format:=jpeg codec_pub_topic:=/image_raw/compressed
   ```

3. Subscribe to topics on RDK and preview camera data;

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
   # Install rqt
   sudo apt install ros-${TROS_DISTRO}-rqt-image-view ros-${TROS_DISTRO}-rqt ros-${TROS_DISTRO}-compressed-image-transport
   # Start rqt
   ros2 run rqt_image_view rqt_image_view
   ```

   Note: To run rqt on RDK, use tools such as MobaXterm for SSH connection, or add the "-Y" parameter when connecting via command-line SSH.

   Select the topic `/image_raw/compressed`. The image output looks like this:

   ![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/rqt-result.png)

## Foxglove Display

### Overview

Foxglove is an open-source toolkit that includes online and offline versions, designed to simplify robot system development and debugging. It provides a series of features for building robot applications.

This section mainly uses Foxglove's data recording and playback functionality: Foxglove allows recording ROS2 topic data to files for subsequent playback and analysis. This is very useful for system fault diagnosis, performance optimization, and algorithm debugging.

In the demo, we use the hobot_visualization package developed by TogetheROS to convert intelligent inference results into ROS2 rendering topic information.

Code repository: [https://github.com/D-Robotics/hobot_visualization](https://github.com/D-Robotics/hobot_visualization)

### Supported Platforms

| Platform    | Runtime Environment      |
| ------- | ------------- |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) |
| RDK X5, RDK X5 Module, RDK S100 | Ubuntu 22.04 (Humble) |
| RDK S600 | Ubuntu 24.04 (Jazzy) |
| X86     | Ubuntu 20.04 (Foxy) |

### Prerequisites

#### RDK Platform

1. Confirm the F37 camera is correctly connected to RDK

2. Confirm the PC can access RDK over the network

3. Confirm TogetheROS.Bot has been successfully installed

#### X86 Platform

1. Confirm the X86 platform is running Ubuntu 20.04 and tros.b has been successfully installed

### Usage

#### RDK Platform / X86 Platform

1. Log in to the RDK platform via SSH and start the board-side programs:

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
# Configure tros.b environment
source /opt/tros/setup.bash
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
# Configure tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
# Configure tros.b environment
source /opt/tros/jazzy/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# Configure tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
# Configure tros.b environment
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

At the same time, use SSH to log in to another terminal and record topic information on the board:

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
# Configure tros.b environment
source /opt/tros/setup.bash
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
# Configure tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
# Configure tros.b environment
source /opt/tros/jazzy/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# Configure tros.b environment
source /opt/tros/humble/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
# Configure tros.b environment
source /opt/tros/jazzy/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

```shell
# Record rosbag data, which will be generated in the current working directory
ros2 bag record -a
```

2. Play rosbag data on the Foxglove online page

1) Enter (https://foxglove.dev/studio) in a PC browser (Chrome/Firefox/Edge) to access the Foxglove website

   ![foxglove](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/foxglove_guide_1.png)

PS: Registration is required for first-time use. You can register using a Google account or a third-party email.

   ![foxglove](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/foxglove_guide_11.png)

2) Enter the visualization interface

   ![foxglove](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/foxglove_guide_2.png)

3) Click to select the local rosbag file

   ![foxglove](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/foxglove_guide_3.png)

4) Open the layout interface. In the upper right corner of the layout interface, click Settings, select the icon, and enable marker rendering message playback

   ![foxglove](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/foxglove_guide_4.png)

5) Click Play
   ![foxglove](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/foxglove_guide_5.png)

6) View the data
   ![foxglove](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_render/foxglove_guide_6.png)

### Notes

1. For Foxglove to visualize image data, ROS2 official message formats must be used with image encoding formats supported by Foxglove. For details, see (https://foxglove.dev/docs/studio/panels/image).

2. When recording messages with rosbag, topic information from other devices may also be recorded. To ensure clean rosbag data, you can set `export ROS_DOMAIN_ID=xxx`, such as `export ROS_DOMAIN_ID=1`.
