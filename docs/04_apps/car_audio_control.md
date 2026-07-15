---
sidebar_position: 6
sidebar_products: RDK X3,RDK-X5,RDK S100
---

# 5.4.6 语音控制小车运动

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 功能介绍

语音控制小车运动功能通过语音控制机器人向前、向后、向左、向右运动，需要搭配 D-Robotics RDK 机器人操作系统的智能语音模块一起使用。流程如下图：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/car_audio_tracking/audio_control.jpg" alt="语音控制小车运动功能整体软件流程图" style={{ width: '50%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

APP 以 PC 端 Gazebo 仿真环境下的虚拟小车举例，发布的控制指令也可以直接用于控制实物小车。

代码仓库： (https://github.com/D-Robotics/audio_control.git)

## 支持平台

| 平台     | 运行方式      | 示例功能                       |
| -------- | ------------ | ------------------------------ |
| RDK X3 | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | 启动智能语音模块解析语音信息并进行语音控制，通过 Gazebo 展示控制效果 |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | 启动智能语音模块解析语音信息并进行语音控制，通过 Gazebo 展示控制效果 |

**注意：仅支持 RDK X3，RDK X3 Module 暂不支持。**

## 准备工作

### RDK 平台

1. RDK 已烧录好 Ubuntu 镜像。

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

   

<DocScope products="RDK-X3">

:::caution **注意**
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system?v=3.0.0&p=RDK+X3#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q10: apt update 命令执行失败或报错如何处理？`解决。**
:::

</DocScope>
<DocScope products="RDK-X5">

:::caution **注意**
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q10: apt update 命令执行失败或报错如何处理？`解决。**
:::

</DocScope>

4. RDK 已成功接好适配的音频板（可参考[智能语音章节](../03_boxs/audio/hobot_audio.md)）。

5. 和 RDK 在同一网段（有线或者连接同一无线网，IP 地址前三段需保持一致）的 PC，PC 端需要安装的环境包括：

 <DocScope products="RDK-X3,RDK-X5">
 <Tabs groupId="tros-distro">
  <TabItem value="foxy" label="Foxy">

    - Ubuntu 20.04 系统和[ROS2 Foxy 桌面版](https://docs.ros.org/en/foxy/Installation/Ubuntu-Install-Debians.html)
    - Gazebo 和 Turtlebot3 相关的功能包，安装方法：

     ```shell
     sudo apt-get install ros-foxy-gazebo-*
     sudo apt install ros-foxy-turtlebot3
     sudo apt install ros-foxy-turtlebot3-simulations
     ```

  </TabItem>

  <TabItem value="humble" label="Humble">

    - Ubuntu 22.04 系统和[ROS2 Humble 桌面版](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html)
    - Gazebo 和 Turtlebot3 相关的功能包，安装方法：

     ```shell
     sudo apt-get install ros-humble-gazebo-*
     sudo apt install ros-humble-turtlebot3
     sudo apt install ros-humble-turtlebot3-simulations
     ```

  </TabItem>

 </Tabs>
 </DocScope>

 

## 使用介绍

PC 端启动仿真环境：

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```shell
source /opt/ros/foxy/setup.bash
```

</TabItem>

<TabItem value="humble" label="Humble">

```shell
source /opt/ros/humble/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

```shell
export TURTLEBOT3_MODEL=burger
ros2 launch turtlebot3_gazebo empty_world.launch.py
```

启动成功后，仿真环境中小车效果如下：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/car_tracking/gazebo.jpeg" alt="Gazebo 仿真环境中小车启动后的场景效果" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

RDK 平台启动程序：

1. 拷贝音频配置文件

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
    # 从tros.b的安装路径中拷贝出运行示例需要的配置文件。
    cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_audio/config/ .
    ```

2. 确认麦克风设备

    麦克风设备号通过配置文件 *config/audio_config.json* 中 `micphone_name` 字段设置，默认为"hw:0,0"，表示音频设备 Card0 Device0，设备号可通过命令 `ls /dev/snd` 查看如："pcmC0D1c"；最后字母 c 表示 capture 设备，C0 表示 Card0，D1 表示 Device1，修改参数为"hw:0,1"。

3. 启动程序

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
    #启动launch文件
    ros2 launch audio_control audio_control.launch.py
    ```

    程序启动成功后，可通过命令词“向前走”、“向后退”、“向左转”，“向右转”，“停止运动”控制小车运动。

## 结果分析

在 RDK 运行终端输出如下信息：

```shell
        This is audio control package.

============================================
        audio control usage

Wake up device is "D-Robotics 你好".
Audio control commnad word definitions are:
        "向前走": move front.
        "向后退": move back.
        "向右转": rotate robot to right.
        "向左转": rotate robot to left. 
============================================

```

以上 log 截取了一段音频控制 pkg 启动后的输出。log 内容显示，此语音控制模块配置的设备唤醒词是 “D-Robotics 你好”，控制小车运动的命令词有：“向前走”、“向后退”、“向左转”，“向右转”。

PC 端在终端使用`ros2 topic list`命令可以查询到 RDK 的 topic 信息：

```shell
$ ros2 topic list
/audio_smart
/cmd_vel
```

其中`/audio_smart`是 X3 发布的包含智能语音结果的算法 msg，`/cmd_vel`是 RDK 发布的运动控制指令。

PC 端在终端使用`ros2 topic echo /cmd_vel`命令可以查看到 RDK 发布的运动控制指令：

```shell
linear:
  x: 0.30000001192092896
  y: 0.0
  z: 0.0
angular:
  x: 0.0
  y: 0.0
  z: 0.0
---
linear:
  x: 0.0
  y: -0.30000001192092896
  z: 0.0
angular:
  x: 0.0
  y: 0.0
  z: -0.5
---
linear:
  x: 0.0
  y: 0.30000001192092896
  z: 0.0
angular:
  x: 0.0
  y: 0.0
  z: 0.5
---
```

PC 端仿真环境中小车跟随语音控制命令词的指示进行运动，仿真小车运动效果如下：

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/car_audio_control/move.gif" alt="仿真小车跟随语音控制命令词运动的效果动图" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />
