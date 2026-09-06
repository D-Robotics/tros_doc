---
sidebar_position: 4
sidebar_products: RDK-X5
---
# Speech_Agent_ASR

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 功能介绍

speech_agent_asr提供语音识别功能，该节点通过订阅的VAD事件来创建/销毁ASR会话，并在每个会话中将订阅的降噪音频数据送入ASR模型中进行语音识别，最终发布**语音ASR识别结果**消息。speech_agent_asr功能由TogetheROS.Bot的 **speech_agent_asr** package实现。

代码仓库： (https://github.com/D-Robotics/speech_agent_asr.git)

应用场景：speech_agent_asr可将音频数据转换为对应的文字，实现会议记录和语音翻译等功能，主要应用于智能家居、智能座舱、智能穿戴设备等领域。

## 支持平台

| 平台   | 运行环境     | 示例功能                           |
| ------ | ------------ | ---------------------------------- |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble), Ubuntu 24.04 (Jazzy)| 启动ASR模块并输出识别结果 |

## 准备工作

1. RDK已烧录好Ubuntu系统镜像。
2. RDK已成功安装TogetheROS.Bot。
3. RDK已成功安装speech_agent_asr算法包，安装命令：

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
   sudo apt install tros-${ROS_DISTRO}-speech-agent-asr
   ```

<DocScope products="RDK-X5">

:::caution **注意**
**如果 `sudo apt update` 命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的 `Q10: apt update 命令执行失败或报错如何处理？` 解决。**
:::
</DocScope>

## 使用介绍

speech_agent_asr开始运行后，会接收订阅的VAD状态事件和降噪音频数据，VAD事件用于创建和销毁会话，在每个会话中将降噪音频数据送入模型中进行语音识别，然后将识别出的文字作为结果发布。VAD事件和降噪音频数据均通过 `audio_msg::msg::SmartAudioData` 类型消息订阅，ASR识别结果通过 `std_msgs::msg::String` 类型消息发布。

RDK板端运行speech_agent_asr package：

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
   # 下载并安装ASR模型
   wget https://archive.d-robotics.cc/TogetheROS/files/speech_solution/speech_agent_asr/speech_agent_asr_v1.1.0.tar.gz
   tar -zxvf speech_agent_asr_v1.1.0.tar.gz -C /opt/tros/${TROS_DISTRO}/lib/

   # 启动 launch 文件（默认使用 /asr_text 发布识别结果）
   ros2 launch speech_agent_asr speech_agent_asr.launch.py

   # 由于 hobot_llamacpp 订阅的是 /prompt_text 消息，如果后续要在 hobot_llamacpp 中使用语言模型，请使用以下命令启动
   ros2 launch speech_agent_asr speech_agent_asr.launch.py asr_pub_topic:=/prompt_text
   ```

## 结果分析

在RDK上运行时，终端会输出如下信息：

```text
[INFO] [launch]: All log files can be found below /root/.ros/log/2026-07-06-15-57-22-756663-ubuntu-3450
[INFO] [launch]: Default logging verbosity is set to INFO
[INFO] [bash-1]: process started with pid [3451]
[bash-1] [INFO] [1783324643.764947952] [speech_agent_asr]: This is speech agent asr example!
[bash-1] [2026-07-06 15:57:23.983] [info] [3453] [:] sa_init: config loaded
[bash-1] [INFO] [1783324696.558063174] [speech_agent_asr]: asr init success
```

以上log显示speech_agent_asr节点已成功初始化，如果 [speech_agent_audio](speech_agent_audio.md) 节点也已准备就绪，可以说“土豆土豆，明天天气怎么样”，speech_agent_asr发布的识别结果话题默认为 **/asr_text**，并且只有在唤醒后才能说ASR内容。可以使用`ros2 topic echo /asr_text`查看ASR识别结果：

```
root@ubuntu:~# ros2 topic echo /asr_text
data: 明天天气怎么样
---
```
