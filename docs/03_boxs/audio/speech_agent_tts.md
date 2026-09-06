---
sidebar_position: 5
sidebar_products: RDK-X5
---
# Speech_Agent_TTS

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 功能介绍

speech_agent_tts提供语音合成功能，该节点订阅 **/tts_text** 文本消息，将文本合成为音频数据，并通过ALSA接口播放，speech_agent_tts功能由TogetheROS.Bot的 **speech_agent_tts** package 实现。

代码仓库： (https://github.com/D-Robotics/speech_agent_tts.git)

应用场景：speech_agent_tts可将文字转换为对应的语音，主要应用于智能家居、智能座舱、智能穿戴设备等领域的语音交互场景。

## 支持平台

| 平台   | 运行环境     | 示例功能                           |
| ------ | ------------ | ---------------------------------- |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble), Ubuntu 24.04 (Jazzy)| 启动TTS模块并播出合成音频 |

## 准备工作

1. RDK已烧录好Ubuntu 系统镜像。
2. RDK已成功安装TogetheROS.Bot。
3. RDK已成功连接音频板。
   ```shell
   # 检查音频板是否安装成功
   cat /proc/asound/cards
   # 预期输出示例：0 为音频板
   0 [duplexaudioi2s1]: simple-card - duplex-audio-i2s1
                        duplex-audio-i2s1
   1 [duplexaudio    ]: simple-card - duplex-audio
                        duplex-audio

   # 检查播放设备节点
   ls /dev/snd/
   # 预期输出示例：pcmC0D0p 为音频板播放设备，pcmC0D1c 为音频板录音设备
   by-path  controlC0  controlC1  pcmC0D0p  pcmC0D1c pcmC1D0c pcmC1D0p timer
   ```
4. RDK 已成功安装 speech_agent_tts 算法包，安装命令：

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
   sudo apt install tros-${ROS_DISTRO}-speech-agent-tts
   ```

<DocScope products="RDK-X5">

:::caution **注意**
**如果 `sudo apt update` 命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的 `Q10: apt update 命令执行失败或报错如何处理？` 解决。**
:::
</DocScope>

## 使用介绍

speech_agent_tts开始运行后，会接收订阅的TTS文本消息，将文本合成为音频数据，并通过扬声器播放。TTS文本消息通过 `std_msgs::msg::String` 类型消息订阅。

RDK 板端运行 speech_agent_tts package：

1. 配置 tros.b 环境并启动应用

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
   # 启动 launch 文件
   ros2 launch speech_agent_tts speech_agent_tts.launch.py playback_device:=plughw:0,0 volume:=90 topic_sub:=/tts_text
   ```

## 播放测试

打开另一个终端，执行以下命令，扬声器将播放合成的语音：

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
# 发布一条TTS消息
ros2 topic pub --once /tts_text std_msgs/msg/String "{data: '你好，世界'}"
```
