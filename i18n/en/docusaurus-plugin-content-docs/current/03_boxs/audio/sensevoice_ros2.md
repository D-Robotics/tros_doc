---
sidebar_position: 2
sidebar_products: RDK-X5,RDK-S100,RDK-S600
---
# Sensevoice

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Introduction

The intelligent voice algorithm uses the SenseVoiceGGUF algorithm. It subscribes to audio data and sends it to the sensevoicegguf model for processing, then publishes messages such as **command word recognition** and **ASR recognition results**. The intelligent voice functionality is implemented by the TogetheROS.Bot **sensevoice_ros2** package, and is suitable for 3.5mm headset microphones.

Code repository: (https://github.com/D-Robotics/sensevoice_ros2.git)

Application scenarios: The intelligent voice algorithm can recognize custom command words in audio and interpret speech content as corresponding commands or convert it to text, enabling voice control and speech translation. It is mainly used in smart home, smart cockpit, smart wearables, and other fields.

Voice-controlled car movement example: [Voice-Controlled Car Movement](../../04_apps/car_audio_control.md)

## Supported Platforms

| Platform   | Runtime Environment     | Example Functionality                           |
| ------ | ------------ | ---------------------------------- |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | Start the audio module algorithm and display results in the terminal |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) | Start the audio module algorithm and display results in the terminal |
| RDK S600 | Ubuntu 24.04 (Jazzy) | Start the audio module algorithm and display results in the terminal |

## Preparation

1. The RDK has been flashed with the Ubuntu system image.
2. TogetheROS.Bot has been successfully installed on the RDK.
3. The intelligent voice 2 algorithm package has been successfully installed on the RDK. Installation commands:

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

   <DocScope products="RDK-S100">
   <Tabs groupId="tros-distro">
      <TabItem value="humble" label="Humble">

      ```bash
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


   ```bash
   sudo apt update
   sudo apt install tros-${ROS_DISTRO}-sensevoice-ros2
   ```
<DocScope products="RDK-X5">

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_x_doc/en/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-what-to-do-if-apt-update-fails-eg-key-error-update-failure-lock-file-in-use) section `Q10: How to handle apt update command failure or error?` for resolution.**
:::
</DocScope>
<DocScope products="RDK-S100">

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_s_doc/en/FAQ/hardware_and_system?v=4.0.5&p=RDK+S100#q6-how-do-i-handle-apt-update-failures-or-errors) section `Q6: How to handle apt update command failure or error?` for resolution.**
:::

</DocScope>
<DocScope products="RDK-S600">

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_s_doc/en/FAQ/hardware_and_system?v=5.1.0&p=RDK+S600#q6-how-do-i-handle-apt-update-failures-or-errors) section `Q6: How to handle apt update command failure or error?` for resolution.**
:::

</DocScope>
4. The audio board is correctly connected to the RDK X5 3.5mm headset microphone interface.
5. The USB speaker is correctly connected to the RDK X5 USB port.


## Usage

After the intelligent voice sensevoice_ros2 package starts running, it collects audio from the microphone and sends the collected audio data to the intelligent voice algorithm for processing, outputting intelligent information such as command words and ASR results. Command words are published as `audio_msg::msg::SmartAudioData` messages, and ASR results are published as `std_msgs::msg::String` messages.


The intelligent voice functionality supports ASR recognition on raw audio. Default command words are defined in the *config/cmd_word.json* file at the root of the intelligent voice code module:

```json
{
    "cmd_word": [
        "向前走",
        "向后退",
        "向左转",
        "向右转",
        "停止运动"
    ]
}
```

Run the sensevoice_ros2 package on the RDK board:


1. Configure the tros.b environment and start the application

<DocScope products="RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

   ```shell
   # Configure tros.b environment
   
   source /opt/tros/humble/setup.bash

   # Launch launch file
   ros2 launch sensevoice_ros2 sensevoice_ros2.launch.py micphone_name:="plughw:0,0"
   ```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

   ```shell
   # Configure tros.b environment
   
   source /opt/tros/jazzy/setup.bash

   # Launch launch file
   ros2 launch sensevoice_ros2 sensevoice_ros2.launch.py micphone_name:="plughw:0,0"
   ```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

   ```shell
   # Configure tros.b environment
   
   source /opt/tros/humble/setup.bash

   # Launch launch file
   ros2 launch sensevoice_ros2 sensevoice_ros2.launch.py micphone_name:="plughw:0,0"
   ```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

   ```shell
   # Configure tros.b environment
   
   source /opt/tros/jazzy/setup.bash

   # Launch launch file
   ros2 launch sensevoice_ros2 sensevoice_ros2.launch.py micphone_name:="plughw:0,0"
   ```

</TabItem>

</Tabs>
</DocScope>

## Result Analysis

The terminal output when running on the RDK is as follows:

```text
alsa_device_init, snd_pcm_open. handle((nil)), name(plughw:0,0), direct(1), mode(0)
snd_pcm_open succeed. name(plughw:0,0), handle(0xaaaad1248290)
Rate set to 16000Hz (requested 16000Hz)
Buffer size range from 32 to 131072
Period size range from 16 to 1024
Requested period size 512 frames
Periods = 4
was set period_size = 512
was set buffer_size = 2048
alsa_device_init. hwparams(0xaaaad12484a0), swparams(0xaaaad124a7a0)

```

The log above shows that the audio device initialized successfully, the audio device was opened, and audio can be captured normally.

When a person sequentially speaks the command words "向前走", "向左转", "向右转", and "向后退" near the microphone, the voice algorithm outputs recognition results after intelligent processing. The log is as follows:

```text
cost time :769 ms
[WARN] [1745810610.317172494] [sensevoice_ros2]: recv cmd word:向前走
result_str:向前走,
[WARN] [1745810610.479493615] [sensevoice_ros2]: asr msg:向前走,
result_str:向前走,
cost time :785 ms
[WARN] [1745810614.078700989] [sensevoice_ros2]: recv cmd word:向左转
result_str:向左转,
[WARN] [1745810614.187793932] [sensevoice_ros2]: asr msg:向左转,
result_str:向左转,
cost time :761 ms
[WARN] [1745810616.453310236] [sensevoice_ros2]: recv cmd word:向右转
result_str:向右转,
[WARN] [1745810616.587498515] [sensevoice_ros2]: asr msg:向右转,
result_str:向右转,
cost time :737 ms
[WARN] [1745810618.700084757] [sensevoice_ros2]: recv cmd word:向后退
result_str:向后退,
[WARN] [1745810618.857481535] [sensevoice_ros2]: asr msg:向后退,
result_str:向后退,

```


sensevoice_ros2 publishes intelligent voice messages to the topics **/audio_smart** and **/asr_text** by default. The `ros2 topic list` result is:

```shell
$ ros2 topic list
/audio_smart
/asr_text
```

The /asr_text topic requires a specific wake word "你好，地瓜机器人" to produce output. The `ros2 topic echo /asr_text` result is:

<img src="http://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/audio_asr.jpg" alt="Terminal echo of /asr_text topic output after wake-word speech recognition" style={{ width: '60%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>
