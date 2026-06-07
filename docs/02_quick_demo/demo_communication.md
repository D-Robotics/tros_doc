---
sidebar_position: 5
---

# 5.2.5 数据通信

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 零拷贝

### 功能介绍

TogetheROS.Bot提供了灵活、高效的零拷贝功能，可以显著降低大尺寸数据的通信延时和CPU占用。tros.b通过集成performance_test工具，可以方便的评测开启零拷贝前后的性能差异。performance_test工具能够实现sub数量、消息大小、QoS等参数配置，方便评估不同场景下的通信性能，主要性能指标如下：

- 时延（latency）：对应消息从pub到sub的传输时间
- CPU使用率（CPU usage）：通信活动所占CPU使用百分比
- 驻留内存（resident memory）：包括堆分配内存、共享内存以及用于系统内部的栈内存
- 样本统计（sample statistics）：包括每次实验发送、接收以及丢失的消息数量

代码仓库：
  - [https://github.com/D-Robotics/rclcpp](https://github.com/D-Robotics/rclcpp)
  - [https://github.com/D-Robotics/rcl_interfaces](https://github.com/D-Robotics/rcl_interfaces)
  - [https://github.com/D-Robotics/benchmark](https://github.com/D-Robotics/benchmark)

:::info
- tros.b Foxy版本基于ROS2 Foxy新增了“zero-copy”功能。
- tros.b Humble版本以及之后版本使用的是ROS2的“zero-copy”功能。
:::

### 支持平台

| 平台    | 运行方式      |
| ------- | ------------ |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) |
| RDK X5, RDK X5 Module, RDK S100 | Ubuntu 22.04 (Humble) |
| RDK S600 | Ubuntu 24.04 (Jazzy) |

### 准备工作

#### RDK

1. 开始测试前，需要将RDK调整为性能模型，以保证测试结果准确性。命令如下：

   ```bash
   echo performance > /sys/devices/system/cpu/cpufreq/policy0/scaling_governor 
   ```

   <DocScope products="RDK-X3">

   更多配置说明参考[系统配置](https://developer.d-robotics.cc/rdk_x_doc/System_configuration?v=3.0.0&p=RDK+X3)章节。

   </DocScope>
   <DocScope products="RDK-X5">

   更多配置说明参考[系统配置](https://developer.d-robotics.cc/rdk_x_doc/System_configuration?v=3.5.0&p=RDK+X5)章节。

   </DocScope>
   <DocScope products="RDK-S100">

   更多配置说明参考[系统配置](https://developer.d-robotics.cc/rdk_s_doc/System_configuration?v=4.0.5&p=RDK+S100)章节。

   </DocScope>
   <DocScope products="RDK-S600">

   更多配置说明参考[系统配置](https://developer.d-robotics.cc/rdk_s_doc/System_configuration?v=5.1.0&p=RDK+S600)章节。

   </DocScope>

 

2. RDK已成功安装performance_test工具包，安装命令：

   <DocScope products="RDK-X3,RDK-X5">
   <Tabs groupId="tros-distro">
   <TabItem value="foxy" label="Foxy">

   ```bash
   sudo apt update
   sudo apt install tros-performance-test
   ```

   </TabItem>

   <TabItem value="humble" label="Humble">

   ```bash
   sudo apt update
   sudo apt install tros-humble-performance-test
   ```
   </TabItem>

   <TabItem value="jazzy" label="Jazzy">

   ```bash
   sudo apt update
   sudo apt install tros-jazzy-performance-test
   ```

   </TabItem>
   </Tabs>
   </DocScope>

   <DocScope products="RDK-S100">
   <Tabs groupId="tros-distro">
   <TabItem value="humble" label="Humble">

   ```bash
   sudo apt update
   sudo apt install tros-humble-performance-test
   ```
   </TabItem>
   </Tabs>
   </DocScope>

   <DocScope products="RDK-S600">
   <Tabs groupId="tros-distro">
   <TabItem value="jazzy" label="Jazzy">

   ```bash
   sudo apt update
   sudo apt install tros-jazzy-performance-test
   ```

   </TabItem>
   </Tabs>
   </DocScope>

<DocScope products="RDK-X3,RDK-X5">
:::caution **注意**
<DocScope products="RDK-X3">
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system?v=3.0.0&p=RDK+X3#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q10: apt update 命令执行失败或报错如何处理？`解决。**
</DocScope>
<DocScope products="RDK-X5">
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q10: apt update 命令执行失败或报错如何处理？`解决。**
</DocScope>
:::
</DocScope>
<DocScope products="RDK-S100,RDK-S600">
:::caution **注意**
<DocScope products="RDK-S100">
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_s_doc/FAQ/hardware_and_system#q6-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q6: apt update 命令执行失败或报错如何处理？`解决。**
</DocScope>
<DocScope products="RDK-S600">
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_s_doc/FAQ/hardware_and_system?v=5.1.0&p=RDK+S600#q6-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q6: apt update 命令执行失败或报错如何处理？`解决。**
</DocScope>
:::
</DocScope>
### 使用介绍

#### RDK平台

1. 不开启零拷贝功能的4M数据传输测试，命令如下：

 <DocScope products="RDK-X3,RDK-X5">
 <Tabs groupId="tros-distro">
 <TabItem value="foxy" label="Foxy">

    ```bash
    source /opt/tros/setup.bash
    ros2 run performance_test perf_test --reliable --keep-last --history-depth 10 -s 1 -m Array4m -r 100 --max-runtime 30
    ```

 </TabItem>

 <TabItem value="humble" label="Humble">

    ```bash
    source /opt/tros/humble/setup.bash
    ros2 run performance_test perf_test --reliable --keep-last --history-depth 10 -s 1 -m Array4m -r 100 --max-runtime 30
    ```

 </TabItem>

 <TabItem value="jazzy" label="Jazzy">

   ```bash
   source /opt/tros/jazzy/setup.bash
   ros2 run performance_test perf_test --reliable --keep-last --history-depth 10 -s 1 -m Array4m -r 100 --max-runtime 30
   ```

 </TabItem>
 </Tabs>
 </DocScope>

 <DocScope products="RDK-S100">
 <Tabs groupId="tros-distro">
 <TabItem value="humble" label="Humble">

    ```bash
    source /opt/tros/humble/setup.bash
    ros2 run performance_test perf_test --reliable --keep-last --history-depth 10 -s 1 -m Array4m -r 100 --max-runtime 30
    ```

 </TabItem>
 </Tabs>
 </DocScope>

 <DocScope products="RDK-S600">
 <Tabs groupId="tros-distro">
 <TabItem value="jazzy" label="Jazzy">

   ```bash
   source /opt/tros/jazzy/setup.bash
   ros2 run performance_test perf_test --reliable --keep-last --history-depth 10 -s 1 -m Array4m -r 100 --max-runtime 30
   ```

 </TabItem>
 </Tabs>
 </DocScope>

    **测试结果如下**：

    ```dotnetcli
    run time

    +--------------+-----------+--------+----------+
    | T_experiment | 30.982817 | T_loop | 1.000126 |
    +--------------+-----------+--------+----------+

    samples                                              latency

    +------+------+------+-----------+---------------+   +----------+----------+----------+----------+
    | recv | sent | lost | data_recv | relative_loss |   | min      | max      | mean     | variance |
    +------+------+------+-----------+---------------+   +----------+----------+----------+----------+
    | 99   | 100  | 0    | 418505326 | 0.000000      |   | 0.004327 | 0.005605 | 0.004546 | 0.000000 |
    +------+------+------+-----------+---------------+   +----------+----------+----------+----------+

    publisher loop                                       subscriber loop

    +----------+----------+----------+----------+        +----------+----------+----------+----------+
    | min      | max      | mean     | variance |        | min      | max      | mean     | variance |
    +----------+----------+----------+----------+        +----------+----------+----------+----------+
    | 0.007260 | 0.008229 | 0.008057 | 0.000000 |        | 0.000000 | 0.000000 | 0.000000 | 0.000000 |
    +----------+----------+----------+----------+        +----------+----------+----------+----------+

    system usage

    +-------------+-----------+---------+--------+--------+----------+--------+--------+
    | utime       | stime     | maxrss  | ixrss  | idrss  | isrss    | minflt | majflt |
    +-------------+-----------+---------+--------+--------+----------+--------+--------+
    | 23120954000 | 121597000 | 65092   | 0      | 0      | 0        | 11578  | 2      |
    +-------------+-----------+---------+--------+--------+----------+--------+--------+
    | nswap       | inblock   | oublock | msgsnd | msgrcv | nsignals | nvcsw  | nivcsw |
    +-------------+-----------+---------+--------+--------+----------+--------+--------+
    | 0           | 0         | 0       | 0      | 0      | 0        | 9885   | 7193   |
    +-------------+-----------+---------+--------+--------+----------+--------+--------+

    Maximum runtime reached. Exiting.
    ```

1. 开启零拷贝功能(加入--zero-copy参数)的4M数据传输测试，命令如下：

 <DocScope products="RDK-X3,RDK-X5">
 <Tabs groupId="tros-distro">
 <TabItem value="foxy" label="Foxy">

    ```bash
    source /opt/tros/setup.bash
    ros2 run performance_test perf_test --zero-copy --reliable --keep-last --history-depth 10 -s 1 -m Array4m -r 100 --max-runtime 30
    ```

 </TabItem>

 <TabItem value="humble" label="Humble">

    ```bash
    source /opt/tros/humble/setup.bash
    export RMW_IMPLEMENTATION=rmw_fastrtps_cpp
    export FASTRTPS_DEFAULT_PROFILES_FILE=/opt/tros/humble/lib/hobot_shm/config/shm_fastdds.xml
    export RMW_FASTRTPS_USE_QOS_FROM_XML=1
    export ROS_DISABLE_LOANED_MESSAGES=0
    ros2 run performance_test perf_test --zero-copy --reliable --keep-last --history-depth 10 -s 1 -m Array4m -r 100 --max-runtime 30
    ```

 </TabItem>

 <TabItem value="jazzy" label="Jazzy">

   ```bash
   source /opt/tros/jazzy/setup.bash
   export RMW_IMPLEMENTATION=rmw_fastrtps_cpp
   export FASTRTPS_DEFAULT_PROFILES_FILE=/opt/tros/jazzy/lib/hobot_shm/config/shm_fastdds.xml
   export RMW_FASTRTPS_USE_QOS_FROM_XML=1
   export ROS_DISABLE_LOANED_MESSAGES=0
   ros2 run performance_test perf_test --zero-copy --reliable --keep-last --history-depth 10 -s 1 -m Array4m -r 100 --max-runtime 30
   ```

 </TabItem>
 </Tabs>
 </DocScope>

 <DocScope products="RDK-S100">
 <Tabs groupId="tros-distro">
 <TabItem value="humble" label="Humble">

    ```bash
    source /opt/tros/humble/setup.bash
    export RMW_IMPLEMENTATION=rmw_fastrtps_cpp
    export FASTRTPS_DEFAULT_PROFILES_FILE=/opt/tros/humble/lib/hobot_shm/config/shm_fastdds.xml
    export RMW_FASTRTPS_USE_QOS_FROM_XML=1
    export ROS_DISABLE_LOANED_MESSAGES=0
    ros2 run performance_test perf_test --zero-copy --reliable --keep-last --history-depth 10 -s 1 -m Array4m -r 100 --max-runtime 30
    ```

 </TabItem>
 </Tabs>
 </DocScope>

 <DocScope products="RDK-S600">
 <Tabs groupId="tros-distro">
 <TabItem value="jazzy" label="Jazzy">

   ```bash
   source /opt/tros/jazzy/setup.bash
   export RMW_IMPLEMENTATION=rmw_fastrtps_cpp
   export FASTRTPS_DEFAULT_PROFILES_FILE=/opt/tros/jazzy/lib/hobot_shm/config/shm_fastdds.xml
   export RMW_FASTRTPS_USE_QOS_FROM_XML=1
   export ROS_DISABLE_LOANED_MESSAGES=0
   ros2 run performance_test perf_test --zero-copy --reliable --keep-last --history-depth 10 -s 1 -m Array4m -r 100 --max-runtime 30
   ```

 </TabItem>
 </Tabs>
 </DocScope>

    **测试结果如下**：

    ```dotnetcli
    run time

    +--------------+-----------+--------+----------+
    | T_experiment | 30.554773 | T_loop | 1.000084 |
    +--------------+-----------+--------+----------+

    samples                                              latency

    +------+------+------+-----------+---------------+   +----------+----------+----------+----------+
    | recv | sent | lost | data_recv | relative_loss |   | min      | max      | mean     | variance |
    +------+------+------+-----------+---------------+   +----------+----------+----------+----------+
    | 99   | 99   | 0    | 418701472 | 0.000000      |   | 0.000146 | 0.000381 | 0.000195 | 0.000000 |
    +------+------+------+-----------+---------------+   +----------+----------+----------+----------+

    publisher loop                                       subscriber loop

    +----------+----------+----------+----------+        +----------+----------+----------+----------+
    | min      | max      | mean     | variance |        | min      | max      | mean     | variance |
    +----------+----------+----------+----------+        +----------+----------+----------+----------+
    | 0.009812 | 0.009895 | 0.009877 | 0.000000 |        | 0.000000 | 0.000000 | 0.000000 | 0.000000 |
    +----------+----------+----------+----------+        +----------+----------+----------+----------+

    system usage

    +------------+-----------+---------+--------+--------+----------+--------+--------+
    | utime      | stime     | maxrss  | ixrss  | idrss  | isrss    | minflt | majflt |
    +------------+-----------+---------+--------+--------+----------+--------+--------+
    | 8727113000 | 307920000 | 46224   | 0      | 0      | 0        | 6440   | 0      |
    +------------+-----------+---------+--------+--------+----------+--------+--------+
    | nswap      | inblock   | oublock | msgsnd | msgrcv | nsignals | nvcsw  | nivcsw |
    +------------+-----------+---------+--------+--------+----------+--------+--------+
    | 0          | 0         | 0       | 0      | 0      | 0        | 9734   | 2544   |
    +------------+-----------+---------+--------+--------+----------+--------+--------+

    Maximum runtime reached. Exiting.
    ```

### 结果分析

performance_test工具可输出多种类型的统计结果，下面主要对比延时、系统占用的差异：

**latency**
  对比关闭和打开“zero-copy”功能的通信时延均值分别为4.546ms和0.195ms，可以看出“zero-copy”功能显著降低通信时延。

**system usage**

```dotnetcli
  +------------------+---------------+-------------------+--------+--------+----------+------------------+---------------------+
  | utime            | stime         | maxrss            | ixrss  | idrss  | isrss    | minflt           | majflt              |
  +------------------+---------------+-------------------+--------+--------+----------+------------------+---------------------+
  | userspace耗时(Hz)| system耗时(Hz)| 驻留内存大小(Byte) | 0      | 0      | 0        | 次缺页错误次数   | 主缺页错误次数      |
  +------------------+---------------+-------------------+--------+--------+----------+------------------+---------------------+
  | nswap            | inblock       | oublock           | msgsnd | msgrcv | nsignals | nvcsw            | nivcsw              |
  +------------------+---------------+-------------------+--------+--------+----------+------------------+---------------------+
  | 0                | 0             | 0                 | 0      | 0      | 0        | 自愿上下文切换次数| 非自愿上下文切换次数|
  +------------------+---------------+-------------------+--------+--------+----------+------------------+---------------------+
```

| 通信方式      | latency  | utime+stime |maxrss | minflt | majflt | nvcsw | nivcsw |
| --------------| ---------| ------------|-------|--------|--------|-------|--------|
| 非“zero-copy” | 0.004546 | 23242551000 | 65092 | 11578  |   2    | 9885  |  7193  |
| “zero-copy”   | 0.000381 | 9035033000  | 46224 | 6440   |   0    | 9734  |  2544  |

对比可知

- “zero-copy” utime和stime之和明显低于非“zero-copy”，表明“zero-copy”消耗的CPU资源更少
- “zero-copy” maxrss少于非“zero-copy”，表明“zero-copy”占用的内存少
- “zero-copy” minflt、majflt明显少于非“zero-copy”，表明“zero-copy”通信抖动更小
- “zero-copy” nvcsw、nivcsw明显少于非“zero-copy”，表明“zero-copy”通信抖动更小

总的来说对于大数据通信，“zero-copy”在CPU消耗、内存占用以及通信延迟抖动方面均明显优于非“zero-copy”
