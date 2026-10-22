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
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) | On-device large language model experience |

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
# Configure tros.b environment
source /opt/tros/humble/setup.bash
```


</TabItem>

</Tabs>
</DocScope>


```bash
lib=/opt/tros/humble/lib/hobot_xlm/lib
export LD_LIBRARY_PATH=${lib}:${LD_LIBRARY_PATH}
# config contains the model configuration files used by the example
cp -r /opt/tros/humble/lib/hobot_xlm/config/ .
ros2 run hobot_xlm hobot_xlm --ros-args -p feed_type:=0 -p model_name:="DeepSeek_R1_Distill_Qwen_1.5B"
```

After the program starts, you can chat with the robot directly in the current terminal.

Currently supported model types are `DeepSeek_R1_Distill_Qwen_1.5B"` and `"DeepSeek_R1_Distill_Qwen_7B"` . The 7B model is only applicable to RDK S100P.

#### Subscribe and Publish Experience

1. Start hobot_llm

   

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


    ```bash
    lib=/opt/tros/humble/lib/hobot_xlm/lib
    export LD_LIBRARY_PATH=${lib}:${LD_LIBRARY_PATH}
    # config contains the model configuration files used by the example
    cp -r /opt/tros/humble/lib/hobot_xlm/config/ .
    ros2 run hobot_xlm hobot_xlm --ros-args -p feed_type:=1 -p ros_string_sub_topic_name:="/prompt_text" -p model_name:="DeepSeek_R1_Distill_Qwen_1.5B"
    ```

    Currently supported model types are `DeepSeek_R1_Distill_Qwen_1.5B"` and `"DeepSeek_R1_Distill_Qwen_7B"` . The 7B model is only applicable to RDK S100P.

2. Open a new terminal to subscribe to the output result topic

   

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


    ```bash
    ros2 topic echo /tts_text
    ```

3. Open a new terminal to publish a message

   

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
[Assistant] >>> ...

Artificial intelligence (AI) has developed through several major stages:

1. **Early AI**:
   - **AI**: Initially used for specific tasks, such as games and customer service.
   - **Machine learning**: In the 1950s, computers began to learn, such as automatic recognition and speech recognition.
   - **Expert systems**: In the 1970s, systems such as "Wiki" simulated human experts.

2. **Computer vision**:
   - **Image recognition**: In the 1980s, computers recognized simple images such as handwritten digits.
   - **Natural language processing**: In the 1990s, such as automatic search and editing on Wikipedia.

3. **Deep learning**:
   - **Neural networks**: In the 1980s, neural networks were used to process complex data.
   - **Convolutional neural networks (CNNs)**: In the 1990s, used for image recognition, such as self-driving cars.
   - **Deep learning**: In the 2010s, such as GPT and BERT, used for natural language processing.

4. **Reinforcement learning**:
   - **Robot control**: In the 1980s, robots learned actions.
   - **Autonomous driving**: In the 2010s, such as self-driving cars.

5. **Deep learning and neural networks**:
   - **Image recognition**: Such as classification, segmentation, and generation.
   - **Natural language processing**: Such as text generation, translation, and dialogue.
   - **Speech recognition**: Such as transcription and speech synthesis.

6. **AI applications**:
   - **Healthcare**: Such as diagnosis and drug discovery.
   - **Transportation**: Such as autonomous driving and traffic management systems.
   - **Education**: Such as intelligent learning systems.
   - **Finance**: Such as automated trading and risk management.

7. **Ethics and challenges**:
   - **Privacy issues**: Data leaks and privacy violations.
   - **Ethical controversies**: Such as algorithmic bias and privacy issues.

8. **Future outlook**:
   - **AI chips**: Used for training and inference.
   - **Edge AI**: Runs on devices, reducing data transmission.
   - **Multimodal AI**: Combines visual, auditory, and other multimodal data.
   - **Human assistants**: Such as chatbots and life support systems.

AI will continue to develop in many fields, driving technological progress and social change.
Performance prefill: 1113.04tokens/s    decode: 20.22tokens/s
```
