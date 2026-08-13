---
sidebar_position: 11
sidebar_products: RDK-X5
---

# 5.4.11 智能语音盒子

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 概述

本节介绍如何在RDK平台上体验完整的语音交互功能，它由音频前处理 + 唤醒词/命令词/语音活动检测 + 语音识别 + 语义理解 + 语音合成组成，包含四个节点模块：**speech_agent_audio**、**speech_agent_asr**、**hobot_llamacpp** 和 **speech_agent_tts**。

[speech_agent_audio](../03_boxs/audio/speech_agent_audio.md) 用于音频降噪，增益控制和回声消除等音频前处理任务，同时实现唤醒词、自定义命令词和语音活动检测，经过预处理后的音频送入[speech_agent_asr](../03_boxs/audio/speech_agent_asr.md) 进行语音识别并输出对应的文本，识别文本交由 [hobot_llamacpp](../03_boxs/generate/hobot_llamacpp.md) 中的语言模型做语义理解和应答生成，最后下发应答文本至 [speech_agent_tts](../03_boxs/audio/speech_agent_tts.md) 合成语音并播放输出。

完整的语音交互链路如下图所示：

![smart_voice_box](http://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/smart_voice_box/smart_voice_box_workflow.jpg)

## 支持平台

| 平台                            | 运行环境     | 示例功能           |
| ------------------------------- | ------------ | ------------------ |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble), Ubuntu 24.04 (Jazzy) | 智能语音盒子体验 |

## 准备工作

1. RDK已烧录好Ubuntu系统镜像。
2. RDK已成功安装TogetheROS.Bot。
3. RDK已成功安装语音算法包，安装命令：

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

    # 安装用于音频前处理和唤醒词检测的speech_agent_audio模块
    sudo apt install tros-${ROS_DISTRO}-speech-agent-audio

    # 安装用于语音识别的speech_agent_asr模块
    sudo apt install tros-${ROS_DISTRO}-speech-agent-asr

    # 安装用于语音合成的speech_agent_tts模块
    sudo apt install tros-${ROS_DISTRO}-speech-agent-tts

    # 安装用于语义理解的hobot_llamacpp模块
    sudo apt install tros-${ROS_DISTRO}-hobot-llamacpp
    ```
4. 详细的安装和使用说明请参考对应模块的文档。

## 使用方法

- 已安装音频前处理和唤醒词检测算法包

- 已安装语音识别算法包

- 已安装语音合成算法包

- 已安装语义理解算法包

- RDK连接音频板和扬声器，确认音频板已正确安装：

    ```bash
    # 检查音频板是否安装成功
    cat /proc/asound/cards
    # 预期输出示例：0为音频板
    0 [duplexaudioi2s1]: simple-card - duplex-audio-i2s1
                            duplex-audio-i2s1
    1 [duplexaudio    ]: simple-card - duplex-audio
                            duplex-audio

    # 检查录音和播放节点
    ls /dev/snd/
    # 预期输出示例：pcmC0D1c为音频板录音节点，pcmC0D0p为音频板播放节点
    by-path  controlC0  controlC1  pcmC0D0p  pcmC0D1c pcmC1D0c pcmC1D0p timer
    ```

如上所示，音频板录音设备为 "plughw:0,1"，音频板播放设备为 "plughw:0,0"。

<DocScope products="RDK-X5">

![smart_voice_box_device](http://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/smart_voice_box/smart_voice_box_device.jpg)

</DocScope>

### 操作说明

### 多终端启动

终端 1 —— 启动语义理解模块：

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
# 启动 hobot_llamacpp 节点前，要先下载语言模型到本地，同时注意要指定 prompt 和 LLM 模型文件路径
cp -r /opt/tros/${ROS_DISTRO}/lib/hobot_llamacpp/config/ .
ros2 run hobot_llamacpp hobot_llamacpp --ros-args -p feed_type:=2 -p system_prompt:="config/system_prompt.txt" -p llm_model_name:=qwen2.5-0.5b-instruct-q4_0.gguf
```

终端 2 —— 启动语音模块：

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
# 同时启动Audio、ASR和TTS模块（根据音频板类型设置mic_type，默认为4mic）
ros2 launch speech_agent_audio speech_agent.launch.py mic_type:=4mic asr_pub_topic:=/prompt_text

```

## 结果展示

程序启动并完成初始化后，即可通过语音与设备进行交互。首先通过“土豆土豆”唤醒设备，然后说出你想做的事。设备接收到任务后开始推理，并输出文字和播放应答语音。例如：

"土豆土豆，一加一等于几"
```text
> [WARN] [1783484321.534556061] [llama_cpp_node]: Recved string data: 一加一等于几
buffer: '一加一等于几'
一加一等于二
```

"土豆土豆，讲个笑话"
```text
> [WARN] [1783482249.790015597] [llama_cpp_node]: Recved string data: 讲个笑话
buffer: '讲个笑话'
小明：我今天去跑步，结果没跑多远就累死了。
小红：那你在跑步时，有没有注意过风向？
```

## 注意事项

1. 语音交互链路中的ASR模块启动相对较慢。当日志中出现`[speech_agent_asr]: asr init success`信息时，表示ASR模块已完成初始化。

2. 如果在使用过程中发现句子开头偶尔会被吞掉，可以尝试在说完唤醒词后稍作停顿，再说文本内容。例如，用“土豆土豆”唤醒设备后，停顿 0.5s ~ 1s 后，说“一加一等于几”。

3. 关于语言模型的选择：LLM模型支持使用 https://huggingface.co/models?search=GGUF 社区中转换为 GGUF 格式的模型进行推理，例如 Qwen2.5-0.5B-Instruct-Q4_0.gguf。
