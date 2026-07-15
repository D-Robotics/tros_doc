---
sidebar_position: 1
sidebar_products: RDK-X3
---

# Bloom Large Language Model

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Overview

This section describes how to experience on-device Large Language Model (LLM) on the RDK platform.

Code repository: (https://github.com/D-Robotics/hobot_llm.git)

## Supported Platforms

| Platform                            | Runtime Environment     | Example Functionality           |
| ------------------------------- | ------------ | ------------------ |
| RDK X3, RDK X3 Module (4GB RAM) | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | On-device large language model experience |

**Note: Only supports RDK X3 and RDK X3 Module with 4GB RAM.**

## Algorithm Information

<DocScope products="RDK-X3">

| Model | Parameters | Platform | prefill eval time(ms/token) | eval time(ms/token) |
| ---- | ---- | ---- | ---- | ---- |
| Bloom | 1.4B | X3 | 305.34 | 364.78 |

</DocScope>
## Preparation

### RDK Platform

1. RDK is the 4GB RAM version
2. RDK has been flashed with the Ubuntu system image.
3. TogetheROS.Bot has been successfully installed on the RDK.
4. Install transformers with the command `pip3 install transformers -i https://pypi.tuna.tsinghua.edu.cn/simple` .

## Usage

### RDK Platform

Before running the program, download and extract the model files with the following commands:

<DocScope products="RDK-X3">
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




```bash
# 下载模型文件
wget http://archive.d-robotics.cc/llm-model/llm_model.tar.gz

# 解压
sudo tar -xf llm_model.tar.gz -C /opt/tros/${TROS_DISTRO}/lib/hobot_llm/
```

Use the `srpi-config` command to set ION memory size to 1.9GB. For configuration instructions, refer to the [Performance Options](https://developer.d-robotics.cc/rdk_doc/System_configuration/srpi-config#performance-options) section in the RDK user manual for the `srpi-config` configuration tool.

After rebooting, set the maximum CPU frequency to 1.5GHz and the governor to `performance` with the following commands:

```bash
sudo bash -c 'echo 1 > /sys/devices/system/cpu/cpufreq/boost'
sudo bash -c 'echo performance > /sys/devices/system/cpu/cpufreq/policy0/scaling_governor'
```

Two experience modes are currently provided: direct terminal text chat, and subscribing to text messages and publishing results as text.

#### Terminal Interactive Experience

<DocScope products="RDK-X3">
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




```bash
ros2 run hobot_llm hobot_llm_chat
```

After the program starts, you can chat with the robot directly in the current terminal.

#### Subscribe and Publish Experience

1. Start hobot_llm

    <DocScope products="RDK-X3">
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

    


    ```bash
    ros2 run hobot_llm hobot_llm
    ```

2. Open a new terminal to subscribe to the output result topic
    <DocScope products="RDK-X3">
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

    


    ```bash
    ros2 topic echo /text_result
    ```

3. Open a new terminal to publish a message
    <DocScope products="RDK-X3">
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

    


    ```bash
    ros2 topic pub --once /text_query std_msgs/msg/String "{data: ""中国的首都是哪里""}"
    ```

After sending the message, you can view the output results in the terminal subscribed to the output.

## Notes

Confirm that the development board has 4GB RAM and set ION memory size to 1.9GB; otherwise, model loading will fail.
