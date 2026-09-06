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

## Introduction

speech_agent_tts provides speech synthesis functionality. The node subscribes to **/tts_text** text messages, synthesizes the text into audio data, and plays it back through the ALSA interface. The speech_agent_tts functionality is implemented by the TogetheROS.Bot **speech_agent_tts** package.

Code repository: (https://github.com/D-Robotics/speech_agent_tts.git)

Application scenarios: speech_agent_tts converts text into corresponding audio, and is mainly used in voice interaction scenarios in smart home, smart cockpit, smart wearables, and other fields.

## Supported Platforms

| Platform   | Runtime Environment     | Example Functionality                           |
| ------ | ------------ | ---------------------------------- |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble), Ubuntu 24.04 (Jazzy)| Start the TTS module and play the synthesized audio |

## Preparation

1. The RDK has been flashed with the Ubuntu system image.
2. TogetheROS.Bot has been successfully installed on the RDK.
3. The RDK has been successfully connected to the audio board.
   ```shell
   # Check if the audio board is installed successfully
   cat /proc/asound/cards
   # Expected output example: 0 is the audio board
   0 [duplexaudioi2s1]: simple-card - duplex-audio-i2s1
                        duplex-audio-i2s1
   1 [duplexaudio    ]: simple-card - duplex-audio
                        duplex-audio

   # Check the playback device node
   ls /dev/snd/
   # Expected output example: pcmC0D0p is the audio board playback device, pcmC0D1c is the audio board recording device
   by-path  controlC0  controlC1  pcmC0D0p  pcmC0D1c pcmC1D0c pcmC1D0p timer
   ```
4. The speech_agent_tts algorithm package has been successfully installed on the RDK. Installation commands:

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

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_x_doc/en/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-what-to-do-if-apt-update-fails-eg-key-error-update-failure-lock-file-in-use) section `Q10: How to handle apt update command failure or error?` for resolution.**
:::
</DocScope>

## Usage

After speech_agent_tts starts running, it receives subscribed TTS text messages, synthesizes the text into audio data, and plays it back through the speaker. TTS text messages are subscribed to via `std_msgs::msg::String` messages.

Running the speech_agent_tts package on the RDK:

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
   # Start the launch file
   ros2 launch speech_agent_tts speech_agent_tts.launch.py playback_device:=plughw:0,0 volume:=90 topic_sub:=/tts_text
   ```

## Playback Test

Open another terminal and execute the following command. The speaker will play the synthesized audio:

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
# Publish a TTS message
ros2 topic pub --once /tts_text std_msgs/msg/String "{data: 'Hello World'}"
```
