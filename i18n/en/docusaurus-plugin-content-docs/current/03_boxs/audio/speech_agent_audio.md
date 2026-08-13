---
sidebar_position: 3
sidebar_products: RDK-X5
---
# Intelligent Voice

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Introduction

speech_agent_audio runs in local offline mode. It sends the audio captured by the microphone to the model for processing(including ANS, AGC, AEC, BF and other algorithms), and then outputs messages such as **wake-up**, **command word recognition**, **VAD events**, and **sound source localization DOA angle**. The speech_agent_audio functionality is implemented by the TogetheROS.Bot **speech_agent_audio** package, and is suitable for the linear four-microphone array and circular six-microphone array that come with the RDK.

Code repository: (https://github.com/D-Robotics/speech_agent_audio.git)

Application scenarios: The speech_agent_audio algorithm can detect wake words and custom command words in audio, and output denoised ASR audio data as well as VAD events. It is mainly used in smart home, smart cockpit, smart wearables, and other fields.

## Supported Platforms

| Platform   | Runtime Environment     | Example Functionality                           |
| ------ | ------------ | ---------------------------------- |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble), Ubuntu 24.04 (Jazzy)| Start the Audio module and output wake-up results |

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

   # Check the recording device node
   ls /dev/snd/
   # Expected output example: pcmC0D1c is the audio board recording device, pcmC0D0p is the audio board playback device
   by-path  controlC0  controlC1  pcmC0D0p  pcmC0D1c pcmC1D0c pcmC1D0p timer
   ```
4. The intelligent voice algorithm package has been successfully installed on the RDK. Installation commands:

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

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_x_doc/en/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-what-to-do-if-apt-update-fails-eg-key-error-update-failure-lock-file-in-use) section `Q10: How to handle apt update command failure or error?` for resolution.**
:::
</DocScope>

## Usage

After speech_agent_audio starts running, it captures audio from the microphone array and sends the captured audio data to the algorithm model for processing, outputting wake-up events, command words, VAD events, ASR audio data, and sound source localization DOA angle information. Wake-up events are published via `std_msgs::msg::String` messages, while command words, sound source localization DOA angles, ASR audio data, and VAD events are all published via `audio_msg::msg::SmartAudioData` messages.

speech_agent_audio supports wake words and custom command words. Command words are defined in the */opt/tros/${ROS_DISTRO}/lib/speech_agent_audio/res/cmd_word/cmd_word.json* file, with the following defaults:

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

Additionally, speech_agent_audio supports outputting DOA angle information for sound source localization. The unit is degrees. For linear microphone arrays, the range is 0° to 180°, and for circular microphone arrays, the range is 0° to 360°.

The relative angular position is closely related to the microphone installation position. The linear four-microphone array DOA angle diagram is shown below:

![doa_line_4mic](http://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/doa_line_4mic.jpg)

The circular six-microphone array DOA angle diagram is shown below:

![doa_circ_6mic](http://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/doa_circ_6mic.jpg)

Running the speech_agent_audio package on the RDK:

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
   # Start the launch file (default 4mic)
   ros2 launch speech_agent_audio speech_agent_audio.launch.py

   # 6mic
   ros2 launch speech_agent_audio speech_agent_audio.launch.py mic_type:=6mic

   # After starting the hobot_llamacpp language model, use the following script to start the audio, asr, and tts modules simultaneously
   ros2 launch speech_agent_audio speech_agent.launch.py asr_pub_topic:=/prompt_text 
   ```

## Result Analysis

The following output is displayed in the terminal when running on the RDK X5:

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

The above log shows that the audio device has been initialized successfully and the audio device is open, ready to capture audio normally.

When saying the wake word "土豆土豆" (tu dou tu dou), wake-up is triggered and the log displays:

```text
[WARN] [1783391628.606371248] [speech_agent_audio]: wakeup word:tu3-dou4-tu3-dou4, 2026-07-07 10:33:48.606
[WARN] [1783391628.612485499] [speech_agent_audio]: angle:135.000000
```

When saying the command words "向前走", "向后退", "向左转", "向右转", "停止运动" in sequence, command words are triggered and the log displays:

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

The log shows that when wake-up and command words are triggered, the corresponding wake word and command word text information as well as DOA angle information are output. For example, the "angle:138.000000" field indicates a DOA angle of 138 degrees.

speech_agent_audio publishes five message topics: **/wkp_text**, **/doa_data**, **/audio_smart**, **/asr_data**, **/vad_data**. In another terminal, use the `ros2 topic list` command to query the topic information:

```shell
$ ros2 topic list
/asr_data
/audio_smart
/doa_data
/vad_data
/wkp_text
```

| Name | Message Type | Description |
| --- | --- | --- |
| /wkp_text | std_msgs/msg/String | Wake-up result |
| /audio_smart | audio_msg/msg/SmartAudioData | Command word result |
| /asr_data | audio_msg/msg/SmartAudioData | Denoised ASR audio data |
| /vad_data | audio_msg/msg/SmartAudioData | VAD status event (BOS/MID/EOS/timeout) |
| /doa_data | audio_msg/msg/SmartAudioData | Sound source localization angle |
