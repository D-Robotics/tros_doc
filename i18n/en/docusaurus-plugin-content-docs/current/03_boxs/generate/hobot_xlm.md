---
sidebar_position: 3
sidebar_products: RDK-S100
---

# DeepSeek Large Language Model

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Overview

This section describes how to experience on-device Large Language Model (LLM) on the RDK S100 series platform.

Code repository: (https://github.com/D-Robotics/hobot_xlm.git)

## Supported Platforms

| Platform                            | Runtime Environment     | Example Functionality           |
| ------------------------------- | ------------ | ------------------ |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble), Ubuntu 24.04 (Jazzy) | On-device large language model experience |

## Algorithm Information

<DocScope products="RDK-S100">

| Model | Parameters | Token Length | Quantization | Platform | prefill eval (tokens/s) | eval (tokens/s) |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| Deepseek-R1 | 1.5B | 1024 | Q8 | S100 | 635.24 | 17.05 |
| Deepseek-R1 | 7B | 1024 | Q8 | S100 | 279.17 | 3.72 |
| Deepseek-R1 | 1.5B | 1024 | Q8 | S100P | 1326.40 | 26.52 |
| Deepseek-R1 | 7B | 1024 | Q8 | S100P | 468.86 | 6.68 |

</DocScope>
## Preparation

### System Preparation

1. RDK has been flashed with the Ubuntu system image.
2. TogetheROS.Bot has been successfully installed on the RDK.

### Model Download

Before running the program, download the model files with the following commands:

#### DeepSeek_R1_Distill_Qwen_1.5B

```shell
wget -c ftp://oeftp@sdk.d-robotics.cc/oe_llm/model/DeepSeek_R1_Distill_Qwen_1.5B_1024.hbm --ftp-password=Oeftp~123$%
```

#### DeepSeek_R1_Distill_Qwen_7B

```shell
wget -c ftp://oeftp@sdk.d-robotics.cc/oe_llm/model/DeepSeek_R1_Distill_Qwen_7B_1024.hbm --ftp-password=Oeftp~123$%
```

### Package Installation

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
apt install tros-humble-hobot-xlm
```


</TabItem>
<TabItem value="jazzy" label="Jazzy">

```bash
apt install tros-jazzy-hobot-xlm
```

</TabItem>

</Tabs>
</DocScope>

### System Configuration

- Set ION memory to maximum to meet large model inference requirements

```shell
/usr/hobot/bin/hb_switch_ion.sh bpu_first
reboot
```

- Set performance mode `Note: Performance mode is only supported on RDK S100P`
```shell
devmem 0x2b047000 32 0x99
devmem 0x2b047004 32 0x99
```

## Usage

Two experience modes are currently provided: direct terminal text chat, and subscribing to text messages and publishing results as text.

#### Terminal Interactive Experience

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# setup tros.b environment
source /opt/tros/humble/setup.bash
```


</TabItem>
<TabItem value="jazzy" label="Jazzy">

```bash
# setup tros.b environment
source /opt/tros/jazzy/setup.bash
```

</TabItem>

</Tabs>
</DocScope>


```bash
lib=/opt/tros/${TROS_DISTRO}/lib/hobot_xlm/lib
export LD_LIBRARY_PATH=${lib}:${LD_LIBRARY_PATH}
# copy config files
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_xlm/config/ .
ros2 run hobot_xlm hobot_xlm --ros-args -p feed_type:=0 -p model_name:="DeepSeek_R1_Distill_Qwen_1.5B"
```

After the program starts, you can chat with the robot directly in the current terminal.

Currently supported model types are `DeepSeek_R1_Distill_Qwen_1.5B"` and `"DeepSeek_R1_Distill_Qwen_7B"`. The 7B model is only applicable to RDK S100P.

#### Subscribe and Publish Experience

1. Start hobot_llm

   <DocScope products="RDK-S100">
   <Tabs groupId="tros-distro">
      <TabItem value="humble" label="Humble">

      ```bash
      # setup tros.b environment
      source /opt/tros/humble/setup.bash
      ```

      </TabItem>
      <TabItem value="jazzy" label="Jazzy">

      ```bash
      # setup tros.b environment
      source /opt/tros/jazzy/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>


    ```bash
    lib=/opt/tros/${TROS_DISTRO}/lib/hobot_xlm/lib
    export LD_LIBRARY_PATH=${lib}:${LD_LIBRARY_PATH}
    # copy model file
    cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_xlm/config/ .
    ros2 run hobot_xlm hobot_xlm --ros-args -p feed_type:=1 -p ros_string_sub_topic_name:="/prompt_text" -p model_name:="DeepSeek_R1_Distill_Qwen_1.5B"
    ```

    Currently supported model types are `DeepSeek_R1_Distill_Qwen_1.5B"` and `"DeepSeek_R1_Distill_Qwen_7B"`. The 7B model is only applicable to RDK S100P.

2. Open a new terminal to subscribe to the output result topic

   
   <DocScope products="RDK-S100">
   <Tabs groupId="tros-distro">
      <TabItem value="humble" label="Humble">

      ```bash
      # setup tros.b environment
      source /opt/tros/humble/setup.bash
      ```

      </TabItem>
      <TabItem value="jazzy" label="Jazzy">

      ```bash
      # setup tros.b environment
      source /opt/tros/jazzy/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>

    ```bash
    ros2 topic echo /tts_text
    ```

3. Open a new terminal to publish a message

   <DocScope products="RDK-S100">
   <Tabs groupId="tros-distro">
      <TabItem value="humble" label="Humble">

      ```bash
      # setup tros.b environment
      source /opt/tros/humble/setup.bash
      ```

      </TabItem>
      <TabItem value="jazzy" label="Jazzy">

      ```bash
      # setup tros.b environment
      source /opt/tros/jazzy/setup.bash
      ```

      </TabItem>

   </Tabs>
   </DocScope>


    ```bash
    ros2 topic pub --once /prompt_text std_msgs/msg/String "{data: ""Briefly describe the development of artificial intelligence""}"
    ```

After sending the message, you can view the output results in the terminal subscribed to the output.

## Result Example

```bash
[UCP]: log level = 3
[UCP]: UCP version = 3.7.3
[VP]: log level = 3
[DNN]: log level = 3
[HPL]: log level = 3
[UCPT]: log level = 6
[WARN] [1757949703.788157149] [xlm_node]: This is hobot xlm node!
[WARN] [1757949703.800199173] [xlm_node]: Parameter:
 feed_type(0:local, 1:sub): 0
 model_name: DeepSeek_R1_Distill_Qwen_1.5B
 ai_msg_pub_topic_name: /generation/lanaguage/deepseek
 text_msg_pub_topic_name: /tts_text
 ros_string_sub_topic_name: /prompt_text
[WARN] [1757949703.800428372] [xlm_node]: Model Parameter:
 model_path:   ./DeepSeek_R1_Distill_Qwen_1.5B_4096.hbm
 token_path:   ./config/DeepSeek_R1_Distill_Qwen_1.5B_config/
 k_cache_int8: 0
 model_type:   3
 context_size: 1024
 prompt_file:
 path_prompt_cache:
 sampling: {
     top_k:    3
     top_p:    0.95
     min_p:    0.1
     temp:     0.1
     typ_p:    1
     min_keep: 5
 }
[BPU][[BPU_MONITOR]][281473285378048][INFO]BPULib verison(2, 1, 2)[0d3f195]!
[DNN] HBTL_EXT_DNN log level:6
[DNN]: 3.6.1_(4.2.7post0.dev202307211111+6aaae37 HBRT)
[WARN] [1757949705.795194210] [xlm_node]: model init successed!
板端大模型多轮对话交互demo，请输入你的问题并按下回车
- 退出请输入Ctrl C
- 清除缓存请输入reset
[User] <<< Briefly describe the development of artificial intelligence
[Assistant] >>> Okay, so I need to describe the development of artificial intelligence in a brief but meaningful way. I remember that AI is a big field, with different subfields and a long history. Let me start by recalling some key milestones and areas.

First, the 50s and 60s might have been foundational. Maybe the pioneers like McCarthy and M Organization, who laid the groundwork. They probably focused on logical problem-solving, like in chess, by creating something called the M Organization and the M Program, which used look-around tables. That was a big step.

Then, in the 70s and 80s, there were big moves in research and development on things like neural networks. The Coworkers paper from 1983 was foundational, introducing concepts like backpropagation and neural networks. That definitely changed the way machines learn.

Moving into the 90s, cognitive science began to play a larger role in AI development. People started focusing on understanding human thought processes, which led to work on speech recognition, robotics, and natural language processing. Notable examples like IBM's Watson and speech recognition systems.

2000s saw AI reach new heights. The Netflix Recommendation Engine was a big deal, leveraging machine learning algorithms. The Human Genome Project and other breakthroughs in computational power allowed for more complex AI, like ChatGPT and GPT-4, which are widely used today.

2010s have brought more ethical and societal impacts. There were debates about job displacement, privacy, and the impact of AI on society. The rise of companies like DeepMind and organizations working on bias and transparency in AI is important to consider.

Now, challenges remain. Terms like spurious correlations and the "catastrophic effect" show that AI can develop without proper grounding in causality. Privacy laws like GDPR and ethical guidelines for AI researchers are still evolving.

Putting this all together, I need to structure it clearly, maybe with sections for history, key areas like machine learning, applications, ethical considerations, and current challenges. Each section should briefly explain what they are and their significance. I might need to make sure the transition between sections is smooth and that key points are highlighted without getting too detailed.

I should also ensure that I cover the main breakthroughs in key areas and mention any ongoing debates or challenges mentioned earlier. Maybe conclude by summarizing how the field is evolving and the ongoing debates around its impact and ethical implications.

I think I have the main points covered, but I should check if I've missed any major milestones or if there's more to include. Maybe touch upon how different industries have leveraged AI, like healthcare, finance, and transportation. Also, the role of research institutions and funding agencies has been crucial in advancing the field.

I need to write it concisely, so each paragraph can focus on one major area or part of the field. Start with a broad overview, then delve into specific areas and milestones, and conclude with current challenges and future directions.

Okay, let me organize this into a brief overview, perhaps four parts: history, key areas, ethical debates, and future directions.

In history, I can mention the 50s-60s with focus on symbolic AI, the 70s-80s with neural networks, 90s with cognitive science and early ML, and 2000s growth with big ML systems.

Key areas would cover symbolic AI, machine learning, NLP, NPI, ethics, human-AI collaboration, and societal challenges.

Ethical debates would include issues like fairness, data privacy, diversity, inclusion, and transparency.

Future directions might touch on autonomous systems, societal impact, and emerging technologies.

Performance prefill: 1113.04tokens/s    decode: 20.22tokens/s
```
