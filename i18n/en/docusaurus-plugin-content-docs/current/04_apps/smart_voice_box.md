---
sidebar_position: 11
sidebar_products: RDK-X5
---

# 5.4.11 Smart Voice Box

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Overview

This section describes how to experience the full voice interaction pipeline on the RDK platform. It consists of audio front-end processing + wake word/command word/voice activity detection + speech recognition + semantic understanding + speech synthesis, and includes four node modules: **speech_agent_audio**, **speech_agent_asr**, **hobot_llamacpp**, and **speech_agent_tts**.

[speech_agent_audio](../03_boxs/audio/speech_agent_audio.md) handles audio front-end processing tasks such as noise reduction, gain control, and echo cancellation, while also implementing wake word, custom command word, and voice activity detection. The preprocessed audio is sent to [speech_agent_asr](../03_boxs/audio/speech_agent_asr.md) to be recognized into the corresponding text. The recognized text is then passed to the language model in [hobot_llamacpp](../03_boxs/generate/hobot_llamacpp.md) for semantic understanding and response generation. Finally, the response text is sent to [speech_agent_tts](../03_boxs/audio/speech_agent_tts.md) to synthesize speech and play it back.

The full voice interaction pipeline is illustrated below:

![smart_voice_box](http://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/smart_voice_box/smart_voice_box_workflow.jpg)

## Supported Platforms

| Platform                            | Runtime Environment     | Example Functionality           |
| ------------------------------- | ------------ | ------------------ |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble), Ubuntu 24.04 (Jazzy) | Smart voice box experience |

## Preparation

1. The RDK has been flashed with the Ubuntu system image.
2. TogetheROS.Bot has been successfully installed on the RDK.
3. The voice algorithm package has been successfully installed on the RDK. Installation commands:

    <DocScope products="RDK-X5">
    <Tabs groupId="tros-distro">
    <TabItem value="humble" label="Humble">

    ```bash
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

    ```bash
    sudo apt update

    # Install the speech_agent_audio module for audio front-end processing and wake word detection
    sudo apt install tros-${ROS_DISTRO}-speech-agent-audio

    # Install the speech_agent_asr module for speech recognition
    sudo apt install tros-${ROS_DISTRO}-speech-agent-asr

    # Install the speech_agent_tts module for speech synthesis
    sudo apt install tros-${ROS_DISTRO}-speech-agent-tts

    # Install the hobot_llamacpp module for semantic understanding
    sudo apt install tros-${ROS_DISTRO}-hobot-llamacpp
    ```
4. Refer to the corresponding module documentation for detailed installation and usage instructions.
    - Audio Pre-processing and Wake-up Module:[speech_agent_audio](../03_boxs/audio/speech_agent_audio.md)
    - Automatic Speech Recognition Module:[speech_agent_asr](../03_boxs/audio/speech_agent_asr.md)
    - Large Language Model Module:[hobot_llamacpp](../03_boxs/generate/hobot_llamacpp.md)
    - Text-to-Speech Module:[speech_agent_tts](../03_boxs/audio/speech_agent_tts.md)

## Usage

- Audio front-end processing and wake word detection algorithm package installed

- Speech recognition algorithm package installed

- Speech synthesis algorithm package installed

- Semantic understanding algorithm package installed

- Connect an audio board and speaker to the RDK, and verify that the audio board is properly installed:

    ```bash
    # Check if the audio board is installed successfully
    cat /proc/asound/cards
    # Expected output example: 0 is the audio board
    0 [duplexaudioi2s1]: simple-card - duplex-audio-i2s1
                            duplex-audio-i2s1
    1 [duplexaudio    ]: simple-card - duplex-audio
                            duplex-audio

    # Check recording and playback nodes
    ls /dev/snd/
    # Expected output example: pcmC0D1c is the audio board recording node, pcmC0D0p is the audio board playback node
    by-path  controlC0  controlC1  pcmC0D0p  pcmC0D1c pcmC1D0c pcmC1D0p timer
    ```

As shown above, the audio board recording device is "plughw:0,1", and the audio board playback device is "plughw:0,0".

<DocScope products="RDK-X5">

![smart_voice_box_device](http://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/smart_voice_box/smart_voice_box_device.jpg)

</DocScope>

### Launch

<DocScope products="RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
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

```shell
# Before starting the smart voice box, you need to download the language model locally, and specify the file paths for the prompt and LLM model. (The launch script uses a 4‑microphone linear array by default.)
ros2 launch speech_agent_audio speech_agent.launch.py system_prompt:=./config/system_prompt.txt llm_model_name:=./qwen2.5-0.5b-instruct-q4_0.gguf

```

About language model selection: The LLM model supports inference using GGUF-converted models from the https://huggingface.co/models?search=GGUF community, such as Qwen2.5-0.5B-Instruct-Q4_0.gguf.

## Results

After the program starts and completes initialization, you can interact with the device via voice. First, wake the device with "土豆土豆" (potato potato), then state what you want to do. After receiving the task, the device begins inference and outputs text as well as plays a spoken response. For example:

"土豆土豆，一加一等于几" (Potato potato, what is one plus one)
```text
> [WARN] [1783484321.534556061] [llama_cpp_node]: Recved string data: 一加一等于几
buffer: '一加一等于几'
一加一等于二
```

"土豆土豆，讲个笑话" (Potato potato, tell a joke)
```text
> [WARN] [1783482249.790015597] [llama_cpp_node]: Recved string data: 讲个笑话
buffer: '讲个笑话'
小明：我今天去跑步，结果没跑多远就累死了。
小红：那你在跑步时，有没有注意过风向？
```

## Notes

1. The ASR module in the voice interaction pipeline starts relatively slowly. When the log message `[speech_agent_asr]: asr init success` appears, it indicates that the ASR module has completed initialization.

2. If you notice that the beginning of a sentence is occasionally lost during use, try slightly extending the pause after the wake word before speaking the text content. For example, after waking the device with "土豆土豆", pause for 0.5s ~ 1s, then say "一加一等于几".
