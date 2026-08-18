---
sidebar_position: 3
sidebar_products: RDK-X5
---
# 智能语音

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 功能介绍

speech_agent_audio采用本地离线模式运行，将麦克风采集到的音频送入模型中进行处理（包括降噪、自动增益控制、回声消除和波束形成等），然后输出**唤醒**、**命令词识别**、**VAD事件**以及**声源定位DOA角度**等信息，speech_agent_audio功能由TogetheROS.Bot的 **speech_agent_audio** package 实现，适用于RDK配套的线形四麦阵列和环形六麦阵列。

代码仓库： (https://github.com/D-Robotics/speech_agent_audio.git)

应用场景：speech_agent_audio算法能够检测音频中的唤醒词和自定义命令词，并输出降噪后的ASR音频数据和VAD事件，主要应用于智能家居、智能座舱、智能穿戴设备等领域。

## 支持平台

| 平台   | 运行环境     | 示例功能                           |
| ------ | ------------ | ---------------------------------- |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble), Ubuntu 24.04 (Jazzy)| 启动Audio模块并输出唤醒结果 |

## 准备工作

1. RDK已烧录好Ubuntu系统镜像。
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

   # 检查录音设备节点
   ls /dev/snd/
   # 预期输出示例：pcmC0D1c 为音频板录音设备，pcmC0D0p 为音频板播放设备
   by-path  controlC0  controlC1  pcmC0D0p  pcmC0D1c pcmC1D0c pcmC1D0p timer
   ```
4. RDK 已成功安装智能语音算法包，安装命令：

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
   sudo apt install tros-${ROS_DISTRO}-speech-agent-audio
   ```
   
<DocScope products="RDK-X5">

:::caution **注意**
**如果 `sudo apt update` 命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的 `Q10: apt update 命令执行失败或报错如何处理？` 解决。**
:::
</DocScope>

## 使用介绍

speech_agent_audio开始运行后，会从麦克风阵列采集音频，并将采集到的音频数据送入算法模型中进行处理，输出唤醒事件、命令词、VAD事件、ASR音频数据和声源定位DOA角度信息。唤醒事件通过 `std_msgs::msg::String` 类型消息发布，命令词、声源定位DOA角度、ASR音频数据和VAD事件都通过 `audio_msg::msg::SmartAudioData` 类型消息发布。

speech_agent_audio支持唤醒词和自定义命令词。命令词定义在 */opt/tros/${ROS_DISTRO}/lib/speech_agent_audio/res/cmd_word/cmd_word.json* 文件中，默认为：

```json
{
   "cmd_word": [
      {
         "text": "向前走",
         "pinyin": "xiang4 qian2 zou3"
      },
      {
         "text": "向后退",
         "pinyin": "xiang4 hou4 tui4"
      },
      {
         "text": "向左转",
         "pinyin": "xiang4 zuo3 zhuan3"
      },
      {
         "text": "向右转",
         "pinyin": "xiang4 you3 zhuan3"
      },
      {
         "text": "停止运动",
         "pinyin": "ting2 zhi3 yun4 dong4"
      }
   ]
}
```

另外，speech_agent_audio支持输出声源定位的DOA角度信息，单位为角度。线形麦克风阵列取值范围为 0°~180°，环形麦克风阵列取值范围为 0°~360°。

角度的相对位置关系与麦克风的安装位置强相关，线形四麦阵列DOA角度示意图如下：

![doa_line_4mic](http://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/doa_line_4mic.jpg)

环形六麦阵列DOA角度示意图如下：

![doa_circ_6mic](http://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/doa_circ_6mic.jpg)

RDK板端运行speech_agent_audio package：

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
   # 启动 launch 文件（默认使用线性4麦克风阵列）
   ros2 launch speech_agent_audio speech_agent_audio.launch.py

   # 指定使用环形6麦克风阵列
   ros2 launch speech_agent_audio speech_agent_audio.launch.py mic_type:=6mic
   ```

## 结果分析

在RDK X5上运行时，终端会输出如下信息：

```text
[INFO] [launch]: All log files can be found below /root/.ros/log/2026-07-06-21-25-02-500375-ubuntu-3158
[INFO] [launch]: Default logging verbosity is set to INFO
[INFO] [bash-1]: process started with pid [3159]
[bash-1] [WARN] [1783344303.237248799] [speech_agent_audio]: This is speech agent audio example!
[bash-1] [WARN] [1783344303.624701700] [speech_agent_audio]: Parameter:
[bash-1]  micphone_name: plughw:0,1
[bash-1]  mic_type: 4mic
[bash-1]  wkp_event_pub_topic_name: /wkp_text
[bash-1]  doa_pub_topic_name: /doa_data
[bash-1]  cmd_pub_topic_name: /audio_smart
[bash-1]  asr_pub_topic_name: /asr_data
[bash-1]  vad_pub_topic_name: /vad_data
[bash-1]  push_wakeup: 0
[bash-1]  vad_eos_timeout: 500
[bash-1] alsa_device_init, snd_pcm_open. handle((nil)), name(plughw:0,1), direct(1), mode(0)
[bash-1] snd_pcm_open succeed. name(plughw:0,1), handle(0xaaab181bc230)
[bash-1] Rate set to 16000Hz (requested 16000Hz)
[bash-1] Buffer size range from 8 to 32768
[bash-1] Period size range from 4 to 256
[bash-1] Requested period size 1024 frames
[bash-1] Periods = 4
[bash-1] was set period_size = 256
[bash-1] was set buffer_size = 1024
[bash-1] alsa_device_init. hwparams(0xaaab181ccf30), swparams(0xaaab181bc440)
```

以上log显示，音频设备初始化成功，并且打开了音频设备，可正常采集音频。

当说出唤醒词“土豆土豆”时，会触发唤醒，log 显示如下：

```text
[WARN] [1783391628.606371248] [speech_agent_audio]: wakeup word:tu3-dou4-tu3-dou4, 2026-07-07 10:33:48.606
[WARN] [1783391628.612485499] [speech_agent_audio]: angle:135.000000
```

当依次说出命令词“向前走”、“向后退”、“向左转”、“向右转”、“停止运动”时，会触发命令词，log 显示如下：

```text
[WARN] [1783391830.459405544] [speech_agent_audio]: cmd word:向前走
[WARN] [1783391830.479927721] [speech_agent_audio]: angle:141.000000
...
[WARN] [1783391834.231577294] [speech_agent_audio]: cmd word:向后退
[WARN] [1783391834.237735889] [speech_agent_audio]: angle:138.000000
...
[WARN] [1783391837.105040497] [speech_agent_audio]: cmd word:向左转
[WARN] [1783391837.116078058] [speech_agent_audio]: angle:138.000000
...
[WARN] [1783391841.450396773] [speech_agent_audio]: cmd word:向右转
[WARN] [1783391841.461561625] [speech_agent_audio]: angle:138.000000
...
[WARN] [1783391845.199409439] [speech_agent_audio]: cmd word:停止运动
[WARN] [1783391845.219007336] [speech_agent_audio]: angle:138.000000
```

log显示，当触发唤醒和命令词时，会输出对应的唤醒词和命令词文字信息以及DOA角度信息，例如，"angle:138.000000" 字段表示DOA角度为138度。

speech_agent_audio发布五个消息话题：**/wkp_text**、**/doa_data**、**/audio_smart**、**/asr_data**、**/vad_data**，在另一个终端使用 `ros2 topic list` 命令可以查询到话题信息：

```shell
$ ros2 topic list
/asr_data
/audio_smart
/doa_data
/vad_data
/wkp_text
```

| 名称 | 消息类型 | 说明 |
| --- | --- | --- |
| /wkp_text | std_msgs/msg/String | 唤醒词结果 |
| /audio_smart | audio_msg/msg/SmartAudioData | 命令词结果 |
| /asr_data | audio_msg/msg/SmartAudioData | 降噪后的ASR音频数据 |
| /vad_data | audio_msg/msg/SmartAudioData | VAD状态事件（BOS/MID/EOS/超时） |
| /doa_data | audio_msg/msg/SmartAudioData | 声源定位角度 |
