---
sidebar_position: 5
---

# 5.2.5 Data Communication

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Zero-Copy

### Overview

TogetheROS.Bot provides flexible and efficient zero-copy functionality that can significantly reduce communication latency and CPU usage for large data transfers. tros.b integrates the performance_test tool to conveniently benchmark performance differences before and after enabling zero-copy. The performance_test tool supports configuration of subscriber count, message size, QoS, and other parameters to evaluate communication performance in different scenarios. The main performance metrics are as follows:

- Latency: the transmission time from pub to sub for each message
- CPU usage: the percentage of CPU used by communication activity
- Resident memory: includes heap-allocated memory, shared memory, and stack memory used internally by the system
- Sample statistics: includes the number of messages sent, received, and lost in each experiment

Code repositories:
  - [https://github.com/D-Robotics/rclcpp](https://github.com/D-Robotics/rclcpp)
  - [https://github.com/D-Robotics/rcl_interfaces](https://github.com/D-Robotics/rcl_interfaces)
  - [https://github.com/D-Robotics/benchmark](https://github.com/D-Robotics/benchmark)

:::info
- The tros.b Foxy version adds the "zero-copy" feature based on ROS2 Foxy.
- The tros.b Humble version and later versions use the ROS2 "zero-copy" feature.
:::

### Supported Platforms

| Platform    | Runtime Environment      |
| ------- | ------------ |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) |
| RDK X5, RDK X5 Module, RDK S100 | Ubuntu 22.04 (Humble) |
| RDK S600 | Ubuntu 24.04 (Jazzy) |

### Prerequisites

#### RDK

1. Before testing, set the RDK to performance mode to ensure accurate test results. Run the following command:

   ```bash
   echo performance > /sys/devices/system/cpu/cpufreq/policy0/scaling_governor 
   ```

   <DocScope products="RDK-X3,RDK-X5">
   For more configuration details, refer to the [System Configuration](https://developer.d-robotics.cc/rdk_x_doc/System_configuration) section.
   </DocScope>
   <DocScope products="RDK-S100,RDK-S600">
   For more configuration details, refer to the [System Configuration](https://developer.d-robotics.cc/rdk_s_doc/System_configuration) section.
   </DocScope>

2. The performance_test package has been successfully installed on RDK. Installation command:

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
:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86) section `Q10: How to handle apt update command failure or error?` for resolution.**
:::
</DocScope>
<DocScope products="RDK-S100,RDK-S600">
:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_s_doc/FAQ/hardware_and_system#q6-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86) section `Q6: How to handle apt update command failure or error?` for resolution.**
:::
</DocScope>
### Usage

#### RDK Platform

1. 4M data transfer test without zero-copy enabled. Run the following command:

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

    **Test results are as follows**:

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

1. 4M data transfer test with zero-copy enabled (add the `--zero-copy` parameter). Run the following command:

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

    **Test results are as follows**:

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
    | 0          | 0         | 0       | 0      | 0      | 0        | 9734   |  2544  |
    +------------+-----------+---------+--------+--------+----------+--------+--------+

    Maximum runtime reached. Exiting.
    ```

### Result Analysis

The performance_test tool outputs various types of statistical results. The following mainly compares differences in latency and system usage:

**latency**
  Comparing the average communication latency with "zero-copy" disabled and enabled, the values are 4.546ms and 0.195ms respectively, showing that the "zero-copy" feature significantly reduces communication latency.

**system usage**

```dotnetcli
  +------------------+---------------+-------------------+--------+--------+----------+------------------+---------------------+
  | utime            | stime         | maxrss            | ixrss  | idrss  | isrss    | minflt           | majflt              |
  +------------------+---------------+-------------------+--------+--------+----------+------------------+---------------------+
  | userspace time (Hz)| system time (Hz)| resident memory size (Byte) | 0      | 0      | 0        | minor page fault count   | major page fault count      |
  +------------------+---------------+-------------------+--------+--------+----------+------------------+---------------------+
  | nswap            | inblock       | oublock           | msgsnd | msgrcv | nsignals | nvcsw            | nivcsw              |
  +------------------+---------------+-------------------+--------+--------+----------+------------------+---------------------+
  | 0                | 0             | 0                 | 0      | 0      | 0        | voluntary context switch count| involuntary context switch count|
  +------------------+---------------+-------------------+--------+--------+----------+------------------+---------------------+
```

| Communication Mode      | latency  | utime+stime |maxrss | minflt | majflt | nvcsw | nivcsw |
| --------------| ---------| ------------|-------|--------|--------|-------|--------|
| Non-"zero-copy" | 0.004546 | 23242551000 | 65092 | 11578  |   2    | 9885  |  7193  |
| "zero-copy"   | 0.000381 | 9035033000  | 46224 | 6440   |   0    | 9734  |  2544  |

Comparison shows:

- The sum of "zero-copy" utime and stime is significantly lower than non-"zero-copy", indicating that "zero-copy" consumes fewer CPU resources
- "zero-copy" maxrss is less than non-"zero-copy", indicating that "zero-copy" uses less memory
- "zero-copy" minflt and majflt are significantly less than non-"zero-copy", indicating less communication jitter with "zero-copy"
- "zero-copy" nvcsw and nivcsw are significantly less than non-"zero-copy", indicating less communication jitter with "zero-copy"

Overall, for large data communication, "zero-copy" is significantly better than non-"zero-copy" in terms of CPU consumption, memory usage, and communication latency jitter
