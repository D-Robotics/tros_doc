---
sidebar_position: 10
sidebar_products: RDK-X5,RDK-S100
---

# 5.4.10 Vision-Voice Box

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Overview

This section describes how to experience the full ASR + VLM/LLM + TTS pipeline on the RDK platform.

Code repository: (https://github.com/D-Robotics/hobot_llamacpp.git)

## Supported Platforms

| Platform                            | Runtime Environment     | Example Functionality           |
| ------------------------------- | ------------ | ------------------ |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | Vision-voice box experience |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) | Vision-voice box experience |

## Preparation

### RDK Platform

1. RDK with 4GB memory version
2. The RDK has been flashed with the RDK OS system.
3. TogetheROS.Bot has been successfully installed on the RDK.
4. Install the ASR module for voice input with the command `apt install tros-humble-sensevoice-ros2`.

## Usage

### RDK Platform

- Vision language model can be used: [Vision Language Model](../03_boxs/generate/hobot_llamacpp.md)

- TTS tool can be used: [Text-to-Speech](../02_quick_demo/hobot_tts.md)

- ASR tool is installed

- Connect a USB speaker with microphone to the RDK device (some RDK products include a 3.5 mm headphone jack; you can connect wired headphones for testing). After connecting, verify the audio device is working properly:

        
```bash
root@ubuntu:~# ls /dev/snd/

by-id  by-path  controlC0  controlC2  pcmC0D0c  pcmC0D0p  pcmC2D0c  pcmC2D0p  timer
```

The audio device name shown should be "plughw:0,0".

<DocScope products="RDK-X5">



![headset](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/vlm_boxs/headset.jpg)

</DocScope>

<DocScope products="RDK-S100">

![headset](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/vlm_boxs/usb_audio.jpg)
</DocScope>

### Instructions

<DocScope products="RDK-X5">

**Publish images using MIPI camera**

```shell
source /opt/tros/humble/setup.bash
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_llamacpp/config/ .
# 配置MIPI摄像头
export CAM_TYPE=mipi
ros2 launch hobot_llamacpp llama_vlm.launch.py audio_device:=plughw:0,0
```

**Publish images using USB camera**

```shell
source /opt/tros/humble/setup.bash
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_llamacpp/config/ .
# 配置USB摄像头
export CAM_TYPE=usb
ros2 launch hobot_llamacpp llama_vlm.launch.py audio_device:=plughw:0,0
```

**Use local image feed**

```shell
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_llamacpp/config/ .
# 配置本地回灌图片
export CAM_TYPE=fb
ros2 launch hobot_llamacpp llama_vlm.launch.py audio_device:=plughw:0,0
```

</DocScope>

<DocScope products="RDK-S100">

**Publish images using MIPI camera**

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
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_llamacpp/config/ .
# 配置MIPI摄像头
export CAM_TYPE=mipi
ros2 launch hobot_llamacpp llama_vlm.launch.py llamacpp_vit_model_file_name:=vit_model_int16.hbm audio_device:=plughw:0,0
```

**Publish images using USB camera**

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
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_llamacpp/config/ .
# 配置USB摄像头
export CAM_TYPE=usb
ros2 launch hobot_llamacpp llama_vlm.launch.py llamacpp_vit_model_file_name:=vit_model_int16.hbm audio_device:=plughw:0,0
```

**Use local image feed**

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
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_llamacpp/config/ .
# 配置本地回灌图片
export CAM_TYPE=fb
ros2 launch hobot_llamacpp llama_vlm.launch.py llamacpp_vit_model_file_name:=vit_model_int16.hbm audio_device:=plughw:0,0
```

</DocScope>

After the program starts, you can interact with the device via voice prompts. Usage: Wake the device with "你好" (hello), then give the device a task, such as "请描述这种图片" (please describe this image). After receiving the task, the device replies "好的" (OK). Wait for the device to complete inference and begin outputting text.

Example flow:

1. User: "你好, 描述这张图片." (Hello, describe this image.)

2. Device: "好的, 让我看看先哈." (OK, let me take a look first.)

3. Device: "这张图片显示了xxx." (This image shows xxx.)

## Advanced Features

In addition to vision-language model capabilities, the package also supports using a pure language model for conversation:

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
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_llamacpp/config/ .

ros2 launch hobot_llamacpp llama_llm.launch.py llamacpp_gguf_model_file_name:=Qwen2.5-0.5B-Instruct-Q4_0.gguf audio_device:=plughw:0,0 
```

After the program starts, you can interact with the device via voice prompts. Usage: After the device initializes, it says "我来啦" (I'm here). Wake the device with "你好" (hello), then give the device a task, such as "周末应该怎么休息?" (How should I rest on the weekend?). After receiving the task, the device begins inference and outputs text via speech.

1. Device: "我来啦" (I'm here)

2. User: "你好, 周末应该怎么休息?" (Hello, how should I rest on the weekend?)

3. Device: "休息很重要，可以看看书、听音乐、画画、运动" (Rest is important. You can read books, listen to music, draw, or exercise.)

## Notes

1. About the ASR module: After ASR starts, the program serial port will output logs even if no wake word is detected. You can speak at this time to verify detection. If nothing is detected, first check the device status and device number with `ls /dev/snd/`.

2. About wake word functionality: Using the "你好" wake word may not be recognized with some probability, preventing subsequent content from being output. When functionality is abnormal, check the logs for the `[llama_cpp_node]: Recved string data: xxx` field. If present, text was recognized.

3. About audio devices: It is generally recommended to use the same device for recording and playback to avoid echo. If recording and playback devices are different, search for the `audio_device` field in the `/opt/tros/${TROS_DISTRO}/share/hobot_llamacpp/launch/llama_vlm.launch.py` file and modify the device name.

4. About model selection: The VLM model currently only supports the large model provided in this example. The LLM model supports inference with GGUF-converted models from the https://huggingface.co/models?search=GGUF community.
