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

## Introduction

speech_agent_asr provides speech recognition functionality. The node creates/destroys ASR sessions via subscribed VAD events, and within each session sends the subscribed denoised audio data to the ASR model for speech recognition, finally publishing **speech ASR recognition result** messages. The speech_agent_asr functionality is implemented by the TogetheROS.Bot **speech_agent_asr** package.

Code repository: (https://github.com/D-Robotics/speech_agent_asr.git)

Application scenarios: speech_agent_asr converts audio data into corresponding text, enabling meeting transcription and speech translation. It is mainly used in smart home, smart cockpit, smart wearables, and other fields.

## Supported Platforms

| Platform   | Runtime Environment     | Example Functionality                           |
| ------ | ------------ | ---------------------------------- |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble), Ubuntu 24.04 (Jazzy)| Start the ASR module and output recognition results |

## Preparation

1. The RDK has been flashed with the Ubuntu system image.
2. TogetheROS.Bot has been successfully installed on the RDK.
3. The speech_agent_asr algorithm package has been successfully installed on the RDK. Installation commands:

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

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_x_doc/en/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-what-to-do-if-apt-update-fails-eg-key-error-update-failure-lock-file-in-use) section `Q10: How to handle apt update command failure or error?` for resolution.**
:::
</DocScope>

## Usage

After speech_agent_asr starts running, it receives subscribed VAD status event and denoised audio data. VAD event is used to create and destroy sessions, and within each session the denoised audio data is sent to the model for speech recognition. The recognized text is then published as the result. VAD event and denoised audio data are both subscribed to via `audio_msg::msg::SmartAudioData` messages, and the ASR recognition results are published via `std_msgs::msg::String` messages.

Running the speech_agent_asr package on the RDK:

1. Configure the tros.b environment and start the application

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
   # Download and install the ASR model
   wget https://archive.d-robotics.cc/TogetheROS/files/speech_solution/speech_agent_asr/speech_agent_asr_v1.1.0.tar.gz
   tar -zxvf speech_agent_asr_v1.1.0.tar.gz -C /opt/tros/${TROS_DISTRO}/lib/

   # Start the launch file(by default, recognition results are published to /asr_text)
   ros2 launch speech_agent_asr speech_agent_asr.launch.py

   # Since hobot_llamacpp subscribes to /prompt_text messages, if using the language model in hobot_llamacpp later, start with the following command
   ros2 launch speech_agent_asr speech_agent_asr.launch.py asr_pub_topic:=/prompt_text
   ```

## Result Analysis

The following output is displayed in the terminal when running on the RDK:

```text
[INFO] [launch]: All log files can be found below /root/.ros/log/2026-07-06-15-57-22-756663-ubuntu-3450
[INFO] [launch]: Default logging verbosity is set to INFO
[INFO] [bash-1]: process started with pid [3451]
[bash-1] [INFO] [1783324643.764947952] [speech_agent_asr]: This is speech agent asr example!
[bash-1] [2026-07-06 15:57:23.983] [info] [3453] [:] sa_init: config loaded
[bash-1] [INFO] [1783324696.558063174] [speech_agent_asr]: asr init success
```

The above log shows that the speech_agent_asr node has been initialized successfully. If the [speech_agent_audio](speech_agent_audio.md) node is also ready, you can say "土豆土豆，明天天气怎么样" (tu dou tu dou, what's the weather like tomorrow). The default topic for recognition results published by speech_agent_asr is **/asr_text**. Moreover, ASR content can only be spoken after the wake word is triggered. You can use `ros2 topic echo /asr_text` to view the ASR recognition result:

```
root@ubuntu:~# ros2 topic echo /asr_text
data: 明天天气怎么样
---
```
