---
sidebar_position: 1
sidebar_products: RDK-X3,RDK-X5
---
# 智能语音

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 功能介绍

智能语音算法采用本地离线模式，订阅音频数据后送给 BPU 处理，然后发布**唤醒、命令词识别**、**声源定位 DOA 角度信息**以及**语音 ASR 识别结果**等消息。智能语音功能的实现对应于 TogetheROS.Bot 的**hobot_audio** package，适用于 RDK 配套的环形和线形四麦阵列。

代码仓库： (https://github.com/D-Robotics/hobot_audio.git)

应用场景：智能语音算法能够识别音频中的唤醒词以及自定义的命令词，并将语音内容解读为对应指令或转化为文字，可实现语音控制以及语音翻译等功能，主要应用于智能家居、智能座舱、智能穿戴设备等领域。

语音控制小车运动案例：[语音控制小车运动](../../04_apps/car_audio_control.md)

## 支持平台

| 平台   | 运行方式     | 示例功能                           |
| ------ | ------------ | ---------------------------------- |
| RDK X3 | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | 启动音频模块算法，并在终端显示结果 |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | 启动音频模块算法，并在终端显示结果 |

## 准备工作

1. RDK 已烧录好 Ubuntu 系统镜像。
2. RDK 已成功安装 TogetheROS.Bot。
3. RDK 已成功安装智能语音算法包，安装命令：

   <DocScope products="RDK-X3,RDK-X5">
   <Tabs groupId="tros-distro">
      <TabItem value="foxy" label="Foxy">

      ```bash
      sudo apt update
      sudo apt install tros-hobot-audio
      ```

      </TabItem>

      <TabItem value="humble" label="Humble">

      ```bash
      sudo apt update
      sudo apt install tros-humble-hobot-audio
      ```

      </TabItem>

   </Tabs>
   </DocScope>

   

:::caution **注意**
<DocScope products="RDK-X3">
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system?v=3.0.0&p=RDK+X3#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q10: apt update 命令执行失败或报错如何处理？`解决。**
</DocScope>
<DocScope products="RDK-X5">
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q10: apt update 命令执行失败或报错如何处理？`解决。**
</DocScope>
:::

4. 按照以下方法在 RDK 上接好环形或线形四麦音频板。

### 连接音频板

#### 接口连接

#### 环形麦克风阵列

环形麦克风板为一体化设计，实物如下图：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/cir_mic_board.png" alt="环形麦克风阵列板一体化实物外观" style={{ width: '70%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

购买链接如下：

 (https://www.waveshare.net/shop/Audio-Driver-HAT.htm)

连接步骤：

1. 将麦克风板连接到 RDK X3 40PIN GPIO 接口上，连接后实物如下图：

   <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/circle_mic_full.png" alt="环形麦克风板连接到 RDK X3 40PIN GPIO 后的实物图" style={{ width: '70%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

2. 接上电源，网线等。

#### 线形麦克风阵列

线形麦克风阵列由音频转接板和线形麦克风板两部分组成，实物图和连接说明如下：

音频转接板:

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/connect_board.jpg" alt="线形麦克风阵列音频转接板实物图" style={{ width: '70%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

线形麦克风板：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/line_mic.jpg" alt="线形麦克风拾音板实物图" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

1. 首先需要将 RDK X3 与音频转接板连接，二者引脚与引脚均应对齐，连接实物图如下：

   <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/link.jpg" alt="RDK X3 与音频转接板引脚对齐连接的实物图" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

2. 其次，需要将 RDK X3 与麦克风阵列拾音板连接，转接板 FPC 接口通过 15pin 异面 FFC 线缆接入到麦克风阵列拾音板，线缆金手指应朝下，连接实物图如下：

   <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/link_mic.jpg" alt="转接板通过 FFC 线缆连接线形麦克风拾音板的实物图" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

3. 接上 AEC 的线。

   <img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/mic_line.jpg" alt="线形麦克风阵列接入 AEC 回采线的连接示意" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

4. 接上电源，网线等。

#### 上电检查

将 RDK 与麦克风阵列接好之后上电，在串口上使用指令`i2cdetect -r -y 0`可以检查设备的接入情况，若成功接好，默认可以在 I2C 上读取到三个地址。如下图：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/detect_mic.jpg" alt="i2cdetect 检测到麦克风阵列三个 I2C 地址的终端输出" style={{ width: '70%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

若没检测到，请重新检查设备的连接。

#### 配置音频板

    <DocScope products="RDK-X3">

    首次使用音频板需要使用`srpi-config`进行配置，配置方法参考 RDK 用户手册[RDK X3 微雪 Audio Drive](https://developer.d-robotics.cc/rdk_x_doc/Basic_Application/audio/rdk_x3_and_rdk_x3_module/audio_driver_hat2_rev2?v=3.0.0&p=RDK+X3)章节。

    </DocScope>
    <DocScope products="RDK-X5">

    首次使用音频板需要使用`srpi-config`进行配置，配置方法参考 RDK 用户手册[RDK X5 微雪 Audio Drive](https://developer.d-robotics.cc/rdk_x_doc/Basic_Application/audio/rdk_x5/audio_driver_hat2_rev2?v=3.5.0&p=RDK+X5)章节。

    </DocScope>

## 使用介绍

智能语音 hobot_audio package 开始运行之后，会从麦克风阵列采集音频，并且将采集到的音频数据送入语音智能算法 SDK 模块做智能处理，输出唤醒事件、命令词、ASR 结果等智能信息，其中唤醒事件、命令词通过`audio_msg::msg::SmartAudioData`类型消息发布，ASR 结果通过`std_msgs::msg::String`类型消息发布。

具体流程如下图：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/hobot_audio.jpg" alt="hobot_audio 智能语音处理流程与输出事件示意" style={{ width: '70%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

智能语音功能支持对原始音频进行降噪之后进行 ASR 识别，默认的唤醒词和命令词定义在智能语音功能代码模块根目录下*config/hrsc/cmd_word.json*文件，默认为：

```json
{
    "cmd_word": [
        "地瓜你好",
        "向前走",
        "向后退",
        "向左转",
        "向右转",
        "停止运动"
    ]
}
```

唤醒词以及命令词用户可以根据需要配置，若更改唤醒词效果可能会与默认的唤醒词命令词效果有差异。推荐唤醒词以及命令词使用中文，最好是朗朗上口的词语，且词语长度推荐使用 3~5 个字。

另外，智能语音功能支持输出声源定位的 DOA 角度信息，单位为角度，环形麦克风阵列取值范围：0 度\~360 度，线形麦克风阵列取值范围：0 度\~180 度。

角度的相对位置关系与麦克风的安装位置强相关，环形麦克风阵列 DOA 角度示意图如下：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/car_audio_tracking/doa_circle.jpg" alt="环形麦克风阵列声源定位 DOA 角度相对位置示意图" style={{ width: '70%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

线形麦克风阵列 DOA 角度示意图如下：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/car_audio_tracking/doa_line.jpg" alt="线形麦克风阵列声源定位 DOA 角度相对位置示意图" style={{ width: '70%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

RDK 板端运行 hobot_audio package：

1. 拷贝配置文件

 <DocScope products="RDK-X3,RDK-X5">
 <Tabs groupId="tros-distro">
  <TabItem value="foxy" label="Foxy">

     ```bash
     # 配置tros.b环境
     source /opt/tros/setup.bash
     ```

  </TabItem>

  <TabItem value="humble" label="Humble">

     ```bash
     # 配置tros.b环境
     source /opt/tros/humble/setup.bash
     ```

  </TabItem>

 </Tabs>
 </DocScope>

 

   ```shell
   # 从tros.b的安装路径中拷贝出运行示例需要的配置文件，若已拷贝则可忽略
   cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_audio/config/ .
   ```

1. 确认配置文件

   配置文件 *config/audio_config.json* 默认配置如下：

   ```json
   {
      "micphone_enable": 1,
      "micphone_name": "hw:0,0",
      "micphone_rate": 16000,
      "micphone_chn": 8,
      "micphone_buffer_time": 0,
      "micphone_nperiods": 4,
      "micphone_period_size": 512,
      "voip_mode": 0,
      "mic_type": 0,
      "asr_mode": 0,
      "asr_channel": 3,
      "save_audio": 0
   }
   ```

   需要确认的配置有：麦克风设备号，麦克风阵列类型，以及是否需要发布 ASR 结果。
   - **麦克风设备号**通过`micphone_name`字段设置，默认为"hw:0,0"，表示音频设备 Card0 Device0，设备号可通过命令 `ls /dev/snd` 查看如："pcmC0D1c"；最后字母 c 表示 capture 设备，C0 表示 Card0，D1 表示 Device1，修改参数为"hw:0,1"。
   - **麦克风阵列类型**通过`mic_type`字段设置，默认值为`0`，表示环形麦克风阵列。如果使用线形麦克风阵列，需要修改该字段为`1`。
   - **ASR 输出**通过`asr_mode`字段设置，默认值为`0`，表示不输出 ASR 结果。若要开启 ASR 结果输出，需要将该字段改为`1`或`2`，其中`1`表示唤醒后进行一次 ASR 识别并发布结果，`2`表示一直进行 ASR 识别并发布结果。

2. 配置 tros.b 环境和启动应用

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

   ```shell
   # 配置tros.b环境
   source /opt/tros/setup.bash

   # 屏蔽调式打印信息
   export GLOG_minloglevel=3

   #启动launch文件
   ros2 launch hobot_audio hobot_audio.launch.py
   ```

</TabItem>

<TabItem value="humble" label="Humble">

   ```shell
   # 配置tros.b环境
   source /opt/tros/humble/setup.bash

   # 屏蔽调式打印信息
   export GLOG_minloglevel=3

   #启动launch文件
   ros2 launch hobot_audio hobot_audio.launch.py
   ```

</TabItem>

</Tabs>
</DocScope>

## 结果分析

在旭日 X3 板端运行终端输出如下信息：

```text
alsa_device_init, snd_pcm_open. handle((nil)), name(hw:0,0), direct(1), mode(0)
snd_pcm_open succeed. name(hw:0,0), handle(0x557d6e4d00)
Rate set to 16000Hz (requested 16000Hz)
Buffer size range from 16 to 20480
Period size range from 16 to 10240
Requested period size 512 frames
Periods = 4
was set period_size = 512
was set buffer_size = 2048
alsa_device_init. hwparams(0x557d6e4fa0), swparams(0x557d6e5210)

```

以上 log 显示，音频设备初始化成功，并且打开了音频设备，可正常采集音频。

当人依次在麦克风旁边说出“地瓜你好”、“向前走”、“向左转”、“向右转”、“向后退”命令词，语音算法 sdk 经过智能处理后输出识别结果，log 显示如下：

```text
recv hrsc sdk event wakeup success, wkp count is 1
[WARN] [1657869437.600230208] [hobot_audio]: recv event:0
recv hrsc sdk doa data: 100
recv hrsc sdk command data: 向前走
[WARN] [1657869443.870029101] [hobot_audio]: recv cmd word:向前走
recv hrsc sdk doa data: 110
recv hrsc sdk command data: 向左转
[WARN] [1657869447.623147766] [hobot_audio]: recv cmd word:向左转
recv hrsc sdk doa data: 100
recv hrsc sdk command data: 向右转
[WARN] [1657869449.865822772] [hobot_audio]: recv cmd word:向右转
recv hrsc sdk doa data: 110
recv hrsc sdk command data: 向后退
[WARN] [1657869452.313969277] [hobot_audio]: recv cmd word:向后退

```

log 显示，识别到语音命令词“向前走”、“向左转”、“向右转”、“向后退”，并且输出 DOA 的角度信息，如 “recv hrsc sdk doa data: 110” 字段表示 DOA 角度为 110 度。

hobot_audio 默认发布的智能语音消息话题名为：**/audio_smart**,  在另一个终端执行使用`ros2 topic list`命令可以查询到此 topic 信息：

```shell
$ ros2 topic list
/audio_smart
```

若开启 ASR 输出，发布消息话题为：**/audio_asr**，`ros2 topic list`结果为：

```shell
$ ros2 topic list
/audio_smart
/audio_asr
```
