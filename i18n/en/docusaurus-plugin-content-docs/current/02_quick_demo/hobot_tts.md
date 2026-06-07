---
sidebar_position: 8
---

# 5.2.8 Text-to-Speech

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Overview

This section describes how to convert text into speech signals and play them through the audio output interface.

Code repository: (https://github.com/D-Robotics/hobot_tts.git)

## Supported Platforms

| Platform    | Runtime Environment     | Example Function                       |
| ------- | ------------ | ------------------------------ |
| RDK X3 | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | Subscribe to text messages, convert them to speech data, and play them |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | Subscribe to text messages, convert them to speech data, and play them |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) | Subscribe to text messages, convert them to speech data, and play them |
| RDK S600 | Ubuntu 24.04 (Jazzy) | Subscribe to text messages, convert them to speech data, and play them |

**Note: Only RDK X3 is supported; RDK X3 Module is not supported. RDK S100/S600 only supports USB audio devices.**

## Prerequisites

### RDK Platform

1. RDK has been flashed with the Ubuntu system image.
2. TogetheROS.Bot has been successfully installed on RDK.
3. An RDK-compatible audio driver board is available, and the environment has been set up according to the [Smart Audio section](../03_boxs/audio/hobot_audio.md).
4. Headphones or speakers are connected to the audio board headphone jack.

## Usage

### RDK Platform

1. On first run, download and extract the model file. Run the following commands:

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
        sudo apt update
        sudo apt install tros-humble-hobot-tts
        source /opt/tros/humble/setup.bash
        ```

        </TabItem>

        <TabItem value="jazzy" label="Jazzy">

        ```bash
        # Configure tros.b environment
        sudo apt update
        sudo apt install tros-jazzy-hobot-tts
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
        sudo apt update
        sudo apt install tros-humble-hobot-tts
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
        sudo apt update
        sudo apt install tros-jazzy-hobot-tts
        source /opt/tros/jazzy/setup.bash
        ```

        </TabItem>

    </Tabs>
    </DocScope>

    ```bash
    wget http://archive.d-robotics.cc/tts-model/tts_model.tar.gz
    sudo tar -xf tts_model.tar.gz -C /opt/tros/${TROS_DISTRO}/lib/hobot_tts/
    ```

<DocScope products="RDK-X3">

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_x_doc/en/FAQ/hardware_and_system?v=3.0.0&p=RDK+X3#q10-what-to-do-if-apt-update-fails-eg-key-error-update-failure-lock-file-in-use) section `Q10: How to handle apt update command failure or error?` for resolution.**
:::

</DocScope>
<DocScope products="RDK-X5">

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_x_doc/en/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-what-to-do-if-apt-update-fails-eg-key-error-update-failure-lock-file-in-use) section `Q10: How to handle apt update command failure or error?` for resolution.**
:::

</DocScope>
<DocScope products="RDK-S100">

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_s_doc/FAQ/hardware_and_system#q6-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86) section `Q6: How to handle apt update command failure or error?` for resolution.**
:::

</DocScope>
<DocScope products="RDK-S600">

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_s_doc/en/FAQ/hardware_and_system?v=5.1.0&p=RDK+S600#q6-how-do-i-handle-apt-update-failures-or-errors) section `Q6: How to handle apt update command failure or error?` for resolution.**
:::

</DocScope>

2. Run the following command to check whether the audio device is working properly:

    ```bash
    root@ubuntu:~# ls /dev/snd/
    by-path  controlC0  pcmC0D0c  pcmC0D1p  timer
    ```

    If an audio playback device such as `pcmC0D1p` appears, the device is working properly.

    <DocScope products="RDK X3">

    On first use of the audio board, configure it using `srpi-config`. For configuration instructions, refer to the RDK user manual [RDK X3 Waveshare Audio Drive](/docs/03_Basic_Application/05_audio/rdk_x3_and_rdk_x3_module/audio_driver_hat2_rev2.md) section.

    </DocScope>
    <DocScope products="RDK X5">

    On first use of the audio board, configure it using `srpi-config`. For configuration instructions, refer to the RDK user manual [RDK X5 Waveshare Audio Drive](/docs/03_Basic_Application/05_audio/rdk_x5/audio_driver_hat2_rev2.md) section.
    
    </DocScope>

3. Start the hobot_tts program

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
    # Suppress debug log output
    export GLOG_minloglevel=1

    ros2 run hobot_tts hobot_tts
    ```

    Note: If the audio playback device is not `pcmC0D1p`, use the `playback_device` parameter to specify the playback device. For example, if the playback device is `pcmC1D1p`, the Waveshare board startup command is: `ros2 run hobot_tts hobot_tts --ros-args -p playback_device:="hw:1,1"`; the USB audio device startup command is: `ros2 run hobot_tts hobot_tts --ros-args -p playback_device:="plughw:1,1"`

4. Open a new terminal and use the echo command to publish a topic

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
   ros2 topic pub --once /tts_text std_msgs/msg/String "{data: ""你知道D-Robotics 吗？是的，我知道D-Robotics 。它是一条从地面延伸到天空的线，它定义了地面和天空之间的分界线。""}"
   ```

5. You should hear the audio playback through headphones or speakers

## Notes

Currently only Chinese and English text content is supported. Do not publish text messages in other languages.
