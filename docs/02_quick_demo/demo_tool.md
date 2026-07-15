---
sidebar_position: 7
---

# 5.2.7 工具

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 图像发布工具

### 功能介绍

图片发布工具支持批量读取本地图片或视频文件，并按照 ROS 消息格式发布，从而提高算法调试和部署效率。

对于图片发布，支持读取 JPEG/JPG/PNG/NV12 格式的图片，发布压缩图片或者将压缩图片转换为 NV12 格式进行发布。

对于视频发布，支持 H264/H265/MP4 格式，读取视频文件后提取相关的视频流进行发布。

代码仓库: (https://github.com/D-Robotics/hobot_image_publisher.git)

### 支持平台

| 平台    | 运行方式     |
| ------- | ------------ |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) |
| RDK X5, RDK X5 Module, RDK S100 | Ubuntu 22.04 (Humble) |
| RDK S600 | Ubuntu 24.04 (Jazzy) |
| X86     | Ubuntu 20.04 (Foxy) |

:::caution
X86 平台不支持将 H.264、H.265 视频解码为 NV12 格式，因此 H.264、H.265 视频发布功能无法在 X86 平台展示。
:::

### 准备工作

#### RDK 平台

1. RDK 已烧录好 Ubuntu 系统镜像

2. RDK 已成功安装 tros.b

3. 可以通过网络访问 RDK 的 PC

#### X86 平台

1. X86 环境已配置 Ubuntu 20.04 系统镜像

2. X86 环境已安装 X86 版本 tros.b

### 图片发布使用介绍

循环读取本地的一张 NV12 格式图片并发布，使用图像编解码模块将图片压缩编码成 JPEG 格式，在 PC 的 Web 端展示图片。

#### RDK/X86 平台

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

<TabItem value="jazzy" label="Jazzy">

```bash
# 配置tros.b环境
source /opt/tros/jazzy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# 配置tros.b环境
source /opt/tros/humble/setup.bash
```
</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
# 配置tros.b环境
source /opt/tros/jazzy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

```shell
# 从tros.b的安装路径中拷贝出运行示例需要的图片文件
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_image_publisher/config/ .

# 启动launch文件
ros2 launch hobot_image_publisher hobot_image_publisher_demo.launch.py
```

### 图片发布结果分析

在运行终端输出如下信息：

```text
[INFO] [launch]: All log files can be found below /root/.ros/log/2022-08-19-12-58-02-288516-ubuntu-24492
[INFO] [launch]: Default logging verbosity is set to INFO
webserver has launch
[INFO] [hobot_image_pub-1]: process started with pid [24511]
[INFO] [hobot_codec_republish-2]: process started with pid [24513]
[INFO] [websocket-3]: process started with pid [24519]
```

输出 log 显示出 webserver 已启动，hobot_image_pub、hobot_codec_republish、websocket 都正常运行

在 PC 端的浏览器输入 `http://IP:8000` 即可查看图像展示效果（IP 为 RDK/X86 设备的 IP 地址）：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_tool/show.png" alt="hobot_img_pub 发布本地图片后在 Web 端的图像展示效果" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />

### 视频发布使用介绍

读取本地 video.list 文件，获取 list 文件中的视频文件路径，循环读取视频文件并发布，先使用图像编解码模块将视频流解码成 NV12 格式图片，再使用图像编解码模块将图片压缩编码成 JPEG 格式，在 PC 的 Web 端展示图片。

#### RDK 平台


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

<TabItem value="jazzy" label="Jazzy">

```bash
# 配置tros.b环境
source /opt/tros/jazzy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# 配置tros.b环境
source /opt/tros/humble/setup.bash
```
</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
# 配置tros.b环境
source /opt/tros/jazzy/setup.bash
```

</TabItem>
</Tabs>
</DocScope>


```shell
# 从tros.b的安装路径中拷贝出运行示例需要的图片文件
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_image_publisher/config/ .

# 启动launch文件
ros2 launch hobot_image_publisher hobot_image_publisher_videolist_demo.launch.py
```

#### X86 平台

```bash
# 配置tros.b环境
source /opt/tros/setup.bash

# 从tros.b的安装路径中拷贝出运行示例需要的图片文件
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_image_publisher/config/ .

# 启动图片发布节点，使用本地MP4格式视频文件进行发布（可以根据自己的需求进行参数配置），暂不支持Web端显示
/opt/tros/${TROS_DISTRO}/lib/hobot_image_publisher/hobot_image_pub --ros-args -p image_source:=./config/video.list -p fps:=30 -p image_format:=mp4
```

### 视频发布结果分析

在运行终端输出如下信息：

```text
[INFO] [launch]: All log files can be found below /root/.ros/log/2022-10-22-21-44-03-663907-ubuntu-702475
[INFO] [launch]: Default logging verbosity is set to INFO
webserver has launch
[INFO] [hobot_image_pub-1]: process started with pid [702597]
[INFO] [hobot_codec_republish-2]: process started with pid [702599]
[INFO] [hobot_codec_republish-3]: process started with pid [702601]
[INFO] [websocket-4]: process started with pid [702603]
```

输出 log 显示出 webserver 已启动，hobot_image_pub、hobot_codec_republish、websocket 都正常运行。

:::info
如果输出 log 显示如下告警信息：
[HobotVdec]: findSPSPPSVPS fail. ret: -1, nSPSLen: 0, nLen: 59
并且 PC 端的浏览器不显示图像，属于正常现象，解码器正在对视频码流进行检查，稍等片刻即可正常显示图像。
:::

在 PC 端的浏览器输入 `http://IP:8000` 即可查看图像展示效果（IP 为 RDK/X86 设备的 IP 地址）：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_tool/mp4show.jpg" alt="hobot_img_pub 发布视频后在 Web 端的图像展示效果" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

<DocScope products="RDK-X3">

## Trigger 记录工具

### 功能介绍

所谓 Trigger，是在设定好已有 Trigger 机制基础上，监测 Trigger 模块订阅的消息变化，例如检测框结果数量变化，小车控制信息变化等，触发对应 Trigger 事件，记录指定时间区间内的 ROS2 消息，从而帮助开发人员定位和复现机器人场景中的感知、规控等问题。

trigger_node package 是 D-Robotics 基于 ROS2 开发的 Trigger 基础模块，用于在触发 Trigger 事件后，获取指定 rosbag 数据的功能包。package 支持直接订阅 ai_msg/msg/PerceptionTargets 类型的话题，在话题回调函数中，判断是否触发 Trigger 事件，并记录 Trigger 事件相关的 rosbag 包，最后将 Trigger 事件信息保存，并发布 std_msg/msg/String 类型的 Trigger 事件话题。

本章节展示的示例，是 D-Robotics 在自定义 trigger 基础模块基础上，开发的 Trigger 模块使用示例。本示例展示的功能，是订阅垃圾检测框信息，根据垃圾检测框的数量是否大于等于 3，判断是否触发 Trigger 事件。若检测框数量大于等于 3，则触发 Trigger 事件。

代码仓库：(https://github.com/D-Robotics/hobot_trigger.git)

应用场景：机器人数据闭环链路，机器人 Trigger 事件上报场景，可配合感知、规控等任务，记录 Trigger 事件发生时的 rosbag 数据。

### 支持平台

| 平台    | 运行方式      | 示例功能                       |
| ------- | ------------ | ------------------------------ |
| RDK X3, RDK X3 Module| Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | · 启动 MIPI/USB 摄像头，触发记录的 rosbag 数据记录在本地 |

### 使用说明

#### Trigger 初始化配置说明   

Trigger 基础模块，定义了初始化配置需要的参数。

config_file 配置文件格式为 json 格式，具体配置如下：

```bash
{ 
  "domain": Trigger事件domain。如扫地机、人型机等，Trigger类型不同，通过domain区分不同领域类型机器人Trigger。

  "desc": Trigger模块描述信息。

  "duration_ts_back": 录制Trigger发生后持续时长。

  "duration_ts_front": 录制Tirgger发生前持续时长。
  
  "level": Trigger事件的优先级, 多个不同Trigger发生时, 可利用一个总节点，筛选一些高优或低优的Trigger事件。
  
  "src_module_id": 发生Trigger的模块ID, 用于管理不同的Trigger模块, 满足业务不同Trigger模块管理需求。
  
  "status": Trigger状态, '0': 关闭, '1': 打开。
  
  "strategy_version": Trigger模块策略的版本号。
  
  "topics": 需要记录的话题list，包含话题名。
  
  "trigger_type": Trigger类型ID。每个Trigger模块并不是只有一种触发情况，比如检测到2个垃圾触发是一种类型，检测到3个垃圾是一种类型。
  
  "unique_id": 设备唯一标识。
  
  "version": Trigger模块版本信息。
  
  "extra_kv": 其他冗余扩展信息可记录在此。
}
  ```

#### Trigger 事件触发配置说明

在 trigger_node 基类中，定义了 Config 结构体，其中部分配置与初始化时 Trigger 配置保持一致，剩下内容需由 Trigger 触发时根据实际情况填充。

用户基于 Trigger_node 进行二次开发时，仅需要在每次 Trigger 发生时，实例化一个结构体变量，将 Trigger 发生时的相关信息填入结构体变量，如 "timestamp"、"gps_pos"等，送入 Trigger 事件记录队列 "requests_"中。

在此基础上，用户就可以开发自定义的 Trigger 模块，更多信息请在代码仓库中参考 trigger_node_example 的实现方式。

代码仓库：(https://github.com/D-Robotics/hobot_trigger.git)

结构体信息如下：

```c++
struct Config {
  std::string domain;       // Trigger事件domain
  std::string desc;         // Trigger描述信息
  long duration_ts_back;    // 录制Trigger 发生后持续时长
  long duration_ts_front;   // 录制tirgger 发生前持续时长
  GPS_POS gps_pos;          // GPS定位
  int level;                // 优先级
  std::string rosbag_path;  // Trigger发生后rosbag本地文件路径
  int src_module_id;        // 发生Trigger的模块
  int status;               // Trigger状态
  std::string strategy_version; // 策略版本号
  long timestamp;           // Trigger发生时间戳
  std::vector<std::string> topics;    // 需要记录的话题list，包含话题名和话题类型
  int trigger_type;         // Trigger类型
  std::string unique_id;    // 设备唯一标识
  std::string version;      // Trigger版本信息
  std::vector<EXTRA_KV> extra_kv;   // 额外信息
};
```

### 准备工作

#### RDK 平台

1. RDK 已烧录好 Ubuntu 系统镜像。

2. RDK 已成功安装 TogetheROS.Bot。

3. 安装功能包 `apt install tros-humble-trigger-node-example`。

### 使用介绍

#### RDK 平台

**使用 MIPI 摄像头发布图片**

<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
# 配置tros.b环境
source /opt/tros/setup.bash
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
# 安装mcap包
apt install ros-humble-rosbag2-storage-mcap

# 配置tros.b环境
source /opt/tros/humble/setup.bash
```

</TabItem>

</Tabs>

```shell
# 从tros的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_trash_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/trigger_node_example/config/ .

# 配置MIPI摄像头
export CAM_TYPE=mipi

# 启动launch文件
ros2 launch trigger_node_example hobot_trigger_example.launch.py
```

**使用 usb 摄像头发布图片**

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

```shell
# 从tros的安装路径中拷贝出运行示例需要的配置文件。
cp -r /opt/tros/${TROS_DISTRO}/lib/mono2d_trash_detection/config/ .
cp -r /opt/tros/${TROS_DISTRO}/lib/trigger_node_example/config/ .

# 配置USB摄像头
export CAM_TYPE=usb

# 启动launch文件
ros2 launch trigger_node_example hobot_trigger_example.launch.py
```


### 结果分析

**使用 mipi 摄像头发布图片**

package 初始化后，在终端输出如下信息：

```shell
  [INFO] [launch]: All log files can be found below /root/.ros/log/2023-05-13-17-31-53-158704-ubuntu-2981490
   [INFO] [launch]: Default logging verbosity is set to INFO
   [INFO] [trigger_node_example-1]: process started with pid [2981766]
   [trigger_node_example-1] [WARN] [1683970314.850652382] [hobot_trigger]: Parameter:
   [trigger_node_example-1]  cache_path: /home/hobot/recorder/
   [trigger_node_example-1]  config_file: config/trigger_config.json
   [trigger_node_example-1]  format: mcap
   [trigger_node_example-1]  isRecord(1:record, 0:norecord): 1
   [trigger_node_example-1]  agent_msg_sub_topic_name: /hobot_agent
   [trigger_node_example-1]  event_msg_sub_topic_name: /ai_msg_mono2d_trash_detection
   [trigger_node_example-1]  msg_pub_topic_name: /hobot_trigger
   [trigger_node_example-1]  config detail: {"domain":"robot","desc":"trigger lane","duration_ts_back":5000,"duration_ts_front":5000,"level":1,"rosbag_path":"","src_module_id":203,"timestamp":-1,"topic":["/image_raw/compressed","/ai_msg_mono2d_trash_detection"],"trigger_type":1110,"unique_id":"v1.0.0\n","version":"v1.0.0\n"}
   [trigger_node_example-1] [WARN] [1683970314.893573769] [hobot_trigger]: TriggerNode Init Succeed!
   [trigger_node_example-1] [WARN] [1683970314.898132256] [example]: TriggerExampleNode Init.
   [trigger_node_example-1] [WARN] [1683970315.931225440] [example]: Trigger Event!
   [trigger_node_example-1] [WARN] [1683970322.178604839] [rosbag2_storage_mcap]: no message indices found, falling back to reading in file order
   [trigger_node_example-1] [WARN] [1683970323.007470033] [hobot_trigger]: Trigger Event Report. Trigger moudle id: 203, type id: 1110
   [trigger_node_example-1]  Report message: {"domain":"","desc":"trigger lane","duration_ts_back":5000,"duration_ts_front":5000,"level":1,"rosbag_path":"trigger/OriginBot002_20230513-173155-931/OriginBot002_20230513-173155-931_0.mcap","src_module_id":203,"timestamp":1683970315931,"topic":["/image_raw/compressed","/ai_msg_mono2d_trash_detection"],"trigger_type":1110,"unique_id":"bot","version":"v1.0.0"}

```

运行后 Trigger 触发产生的 rosbag 数据，将记录在当前运行目录 "trigger" 目录下。记录的 rosbag 数据，可以在 foxglove 中播放。在 foxglove 中播放 rosbag 文件的方法，可以参考手册 2.2 数据展示——foxglove 展示。

foxglove 中播放效果：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/demo_tool/trigger_example_trash_det.gif" alt="Foxglove 中播放垃圾检测示例 rosbag 的可视化效果动图" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

说明：该 Trigger 示例记录了事件发生前 5s 和事件发生后 5s 的数据。同时看到在事件中间时刻，记录了 Trigger 事件发生的原因：即在场景中丢入了一个垃圾,使得场景中垃圾达到三个，触发 Trigger。


### 拓展功能

#### 给 Trigger 模块下发任务

Trigger 模块支持由其他节点下发 Trigger 任务,控制 Trigger 配置。下发方式,通过发布 std_msg 的话题消息,消息数据为 json 格式的 String 数据。将任务协议发送到 Trigger 模块。

##### Trigger 任务协议
```json
{
   "version": "v0.0.1_20230421",       // Trigger模块版本信息。
   "trigger_status": true,             // Trigger状态, 'false': 关闭, 'true': 打开。
   "strategy": [
      {
            "src_module_id": 203,      // 发生Trigger的模块ID
            "trigger_type": 1110,      // Trigger类型ID。
            "level": 1,                // Trigger事件的优先级
            "desc": "",                // Trigger模块描述信息。
            "duration_ts_back": 5000,  // 录制Trigger发生后持续时长
            "duration_ts_front": 3000  // 录制Tirgger 发生前持续时长
      }
   ]
}
```


##### 运行

在前面启动 Trigger 节点基础上,在另一个终端,发布话题名为"/hobot_agent"的 std_msg 话题消息。

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

```shell
# 发布话题名为"/hobot_agent"的std_msg话题消息
ros2 topic pub /hobot_agent std_msgs/String "data: '{\"version\":\"v0.0.1_20230421\",\"trigger_status\":true,\"strategy\":[{\"src_module_id\":203,\"trigger_type\":1110,\"status\":true,\"level\":1,\"desc\":\"test\",\"duration_ts_back\":5000,\"duration_ts_front\":3000}]}'"
```

##### 日志信息
```shell
   [WARN] [1691670626.026737642] [hobot_trigger]: TriggerNode Init Succeed!
   [WARN] [1691670626.026859316] [example]: TriggerExampleNode Init.
   [INFO] [1691670626.517232775] [TriggerNode]: Updated Trigger Config: {"domain":"robot","desc":"trigger lane","duration_ts_back":5000,"duration_ts_front":3000,"gps_pos":{"latitude":-1,"longitude":-1},"level":1,"rosbag_path":"","src_module_id":203,"strategy_version":"Robot_sweeper_V1.0_20230526","timestamp":0,"topic":["/image_raw/compressed","/ai_msg_mono2d_trash_detection","/hobot_visualization"],"trigger_type":1110,"unique_id":"OriginBot002","version":"v0.0.1_20230421","extra_kv":[]}
```
分析: 对 Trigger 模块下发配置任务的时候,可以成功更新 Trigger 节点的配置。（Trigger 节点 Log 日志为 INFO 时可看到日志更新）

</DocScope>