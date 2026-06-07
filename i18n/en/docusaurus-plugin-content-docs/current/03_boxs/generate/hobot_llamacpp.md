---
sidebar_position: 2
sidebar_products: RDK-X5,RDK-S100
---

# Vision Language Model

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Overview

This section describes how to experience on-device Vision Language Model (VLM) on the RDK platform. Thanks to the excellent work of [InternVL](https://hf-mirror.com/OpenGVLab/InternVL2_5-1B) and [SmolVLM](https://hf-mirror.com/HuggingFaceTB/SmolVLM2-256M-Video-Instruct), we have implemented quantization and deployment on the RDK platform. This example is based on the powerful KV Cache management capabilities in [llama.cpp](https://github.com/ggml-org/llama.cpp), combined with the computational advantages of the RDK platform BPU module, to achieve local VLM model deployment.

Code repository: (https://github.com/D-Robotics/hobot_llamacpp.git)

## Supported Platforms

| Platform                            | Runtime Environment     | Example Functionality           |
| ------------------------------- | ------------ | ------------------ |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | On-device vision language model experience |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) | On-device vision language model experience |

## Supported Models

| Model Type | Parameters | Platform | Image Encoding Model | Text Encoding/Decoding Model |
| ------- | ------ | ------- | ---------- | ------------- |
| InternVL2_5 | 1B | X5 | [vit_model_int16_v2.bin](https://hf-mirror.com/D-Robotics/InternVL2_5-1B-GGUF-BPU/resolve/main/rdkx5/vit_model_int16_v2.bin) | [Qwen2.5-0.5B-Instruct-Q4_0.gguf](https://hf-mirror.com/D-Robotics/InternVL2_5-1B-GGUF-BPU/resolve/main/Qwen2.5-0.5B-Instruct-Q4_0.gguf) |
| InternVL2_5 | 1B | S100 | [vit_model_int16.hbm](https://hf-mirror.com/D-Robotics/InternVL2_5-1B-GGUF-BPU/resolve/main/rdks100/vit_model_int16.hbm) | [Qwen2.5-0.5B-Instruct-Q4_0.gguf](https://hf-mirror.com/D-Robotics/InternVL2_5-1B-GGUF-BPU/resolve/main/Qwen2.5-0.5B-Instruct-Q4_0.gguf) |
| InternVL3 | 1B | X5 | [vit_model_int16_VL3_1B_Instruct_X5.bin](https://hf-mirror.com/D-Robotics/InternVL3-1B-Instruct-GGUF-BPU/resolve/main/rdkx5/vit_model_int16_VL3_1B_Instruct_X5.bin) | [qwen2_5_q8_0_InternVL3_1B_Instruct.gguf](https://hf-mirror.com/D-Robotics/InternVL3-1B-Instruct-GGUF-BPU/resolve/main/qwen2_5_q8_0_InternVL3_1B_Instruct.gguf) |
| InternVL3 | 1B | S100 | [vit_model_int16_VL3_1B_Instruct.hbm](https://hf-mirror.com/D-Robotics/InternVL3-1B-Instruct-GGUF-BPU/resolve/main/rdks100/vit_model_int16_VL3_1B_Instruct.hbm) | [qwen2_5_q8_0_InternVL3_1B_Instruct.gguf](https://hf-mirror.com/D-Robotics/InternVL3-1B-Instruct-GGUF-BPU/resolve/main/qwen2_5_q8_0_InternVL3_1B_Instruct.gguf) |
| InternVL3 | 2B | X5 | [vit_model_int16_VL3_2B_Instruct.bin](https://hf-mirror.com/D-Robotics/InternVL3-2B-Instruct-GGUF-BPU/resolve/main/rdkx5/vit_model_int16_VL3_2B_Instruct.bin) | [qwen2_5_1.5b_q8_0_InternVL3_2B_Instruct.gguf](https://hf-mirror.com/D-Robotics/InternVL3-2B-Instruct-GGUF-BPU/blob/main/qwen2_5_1.5b_q8_0_InternVL3_2B_Instruct.gguf) |
| InternVL3 | 2B | S100 | [vit_model_int16_VL3_2B_Instruct.hbm](https://hf-mirror.com/D-Robotics/InternVL3-2B-Instruct-GGUF-BPU/resolve/main/rdks100/vit_model_int16_VL3_2B_Instruct.hbm) | [qwen2_5_1.5b_q8_0_InternVL3_2B_Instruct.gguf](https://hf-mirror.com/D-Robotics/InternVL3-2B-Instruct-GGUF-BPU/blob/main/qwen2_5_1.5b_q8_0_InternVL3_2B_Instruct.gguf) |
| SmolVLM2 | 256M | X5 | [SigLip_int16_SmolVLM2_256M_Instruct_MLP_C1_UP_X5.bin](https://hf-mirror.com/D-Robotics/SmolVLM2-256M-Video-Instruct-GGUF-BPU/resolve/main/rdkx5/SigLip_int16_SmolVLM2_256M_Instruct_MLP_C1_UP_X5.bin) | [SmolVLM2-256M-Video-Instruct-Q8_0.gguf](https://hf-mirror.com/D-Robotics/SmolVLM2-256M-Video-Instruct-GGUF-BPU/resolve/main/SmolVLM2-256M-Video-Instruct-Q8_0.gguf) |
| SmolVLM2 | 256M | S100 | [SigLip_int16_SmolVLM2_256M_Instruct_S100.hbm](https://hf-mirror.com/D-Robotics/SmolVLM2-256M-Video-Instruct-GGUF-BPU/resolve/main/rdks100/SigLip_int16_SmolVLM2_256M_Instruct_S100.hbm) | [SmolVLM2-256M-Video-Instruct-Q8_0.gguf](https://hf-mirror.com/D-Robotics/SmolVLM2-256M-Video-Instruct-GGUF-BPU/resolve/main/SmolVLM2-256M-Video-Instruct-Q8_0.gguf) |
| SmolVLM2 | 500M | X5 | [SigLip_int16_SmolVLM2_500M_Instruct_MLP_C1_UP_X5.bin](https://hf-mirror.com/D-Robotics/SmolVLM2-500M-Video-Instruct-GGUF-BPU/resolve/main/rdkx5/SigLip_int16_SmolVLM2_500M_Instruct_MLP_C1_UP_X5.bin) | [SmolVLM2-500M-Video-Instruct-Q8_0.gguf](https://hf-mirror.com/D-Robotics/SmolVLM2-500M-Video-Instruct-GGUF-BPU/resolve/main/SmolVLM2-500M-Video-Instruct-Q8_0.gguf) |
| SmolVLM2 | 500M | S100 | [SigLip_int16_SmolVLM2_500M_Instruct_S100.hbm](https://hf-mirror.com/D-Robotics/SmolVLM2-500M-Video-Instruct-GGUF-BPU/resolve/main/rdks100/SigLip_int16_SmolVLM2_500M_Instruct_S100.hbm) | [SmolVLM2-500M-Video-Instruct-Q8_0.gguf](https://hf-mirror.com/D-Robotics/SmolVLM2-500M-Video-Instruct-GGUF-BPU/resolve/main/SmolVLM2-500M-Video-Instruct-Q8_0.gguf) |

## Algorithm Information


| Model | Parameters | Quantization | Platform | Input Size | image encoder time(ms) | prefill eval time(ms/token) | eval time(ms/token) |
| ---- | ---- | ---- | ---- | ------------ | ---- | ---- | ---- |
| InternVL2_5 | 1B | Q4_0 | X5 | 1x3x448x448 | 2456.00 | 7.7 | 51.6 |
| InternVL3 | 1B | Q8_0 | S100 | 1x3x448x448 | 2851.00 | 9.19 | 41.65 |
| Smolvlm2 | 256M | Q8_0 | X5 | 1x3x512x512 | 1053 | 9.3 | 27.8 |
| Smolvlm2 | 500M | Q8_0 | X5 | 1x3x512x512 | 1053 | 27.3 | 65.7 |

## Preparation

### RDK Platform

1. RDK has been flashed with the Ubuntu system image.
2. TogetheROS.Bot has been successfully installed on the RDK.
3. Download and install the package

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# 配置tros.b环境
source /opt/tros/humble/setup.bash
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

```shell
sudo apt update
sudo apt install tros-${TROS_DISTRO}-hobot-llamacpp
```

<DocScope products="RDK-X5">
:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_x_doc/en/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-what-to-do-if-apt-update-fails-eg-key-error-update-failure-lock-file-in-use) section `Q10: How to handle apt update command failure or error?` for resolution.**
:::
</DocScope>
<DocScope products="RDK-S100">
:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_s_doc/FAQ/hardware_and_system#q6-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86) section `Q6: How to handle apt update command failure or error?` for resolution.**
:::
</DocScope>

4. System configuration

Use the `srpi-config` command to set ION memory size to 1.6GB, and set CPU to maximum frequency after reboot.

- ION size configuration reference: manual section [srpi-config Tool Configuration](https://developer.d-robotics.cc/rdk_x_doc/en/System_configuration/srpi-config)

- CPU frequency configuration reference: manual section [Thermal and CPU Frequency Management](https://developer.d-robotics.cc/rdk_x_doc/en/System_configuration/frequency_management)

## Usage

Two experience modes are currently provided: direct terminal input of images and text, and subscribing to image and text messages and publishing results as text.

### Internvl

Before running the program, download model files to the working directory with the following commands:

<DocScope products="RDK-X5">

```bash
wget https://hf-mirror.com/D-Robotics/InternVL2_5-1B-GGUF-BPU/resolve/main/Qwen2.5-0.5B-Instruct-Q4_0.gguf
wget https://hf-mirror.com/D-Robotics/InternVL2_5-1B-GGUF-BPU/resolve/main/rdkx5/vit_model_int16_v2.bin
```

</DocScope>

<DocScope products="RDK-S100">

```bash
wget https://hf-mirror.com/D-Robotics/InternVL2_5-1B-GGUF-BPU/resolve/main/Qwen2.5-0.5B-Instruct-Q4_0.gguf
wget https://hf-mirror.com/D-Robotics/InternVL2_5-1B-GGUF-BPU/resolve/main/rdks100/vit_model_int16.hbm
```

</DocScope>

<DocScope products="RDK-X5">

```bash
source /opt/tros/humble/setup.bash
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_llamacpp/config/ .
ros2 run hobot_llamacpp hobot_llamacpp --ros-args -p feed_type:=0 -p image:=config/image2.jpg -p image_type:=0 -p user_prompt:="描述一下这张图片." -p model_file_name:=vit_model_int16_v2.bin -p llm_model_name:=Qwen2.5-0.5B-Instruct-Q4_0.gguf
```

</DocScope>

<DocScope products="RDK-S100">

```bash
source /opt/tros/humble/setup.bash
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_llamacpp/config/ .
ros2 run hobot_llamacpp hobot_llamacpp --ros-args -p feed_type:=0 -p image:=config/image2.jpg -p image_type:=0 -p user_prompt:="描述一下这张图片." -p model_file_name:=vit_model_int16.hbm -p llm_model_name:=Qwen2.5-0.5B-Instruct-Q4_0.gguf
```

</DocScope>

After the program starts, you can use local images and custom prompts for output.

![internvlm_result](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/hobot_llamacpp/vlm_result.png)

### SmolVLM

Before running the program, download model files to the working directory with the following commands:

<DocScope products="RDK-X5">

```bash
wget https://hf-mirror.com/D-Robotics/SmolVLM2-256M-Video-Instruct-GGUF-BPU/resolve/main/rdkx5/SigLip_int16_SmolVLM2_256M_Instruct_MLP_C1_UP_X5.bin
wget https://hf-mirror.com/D-Robotics/SmolVLM2-256M-Video-Instruct-GGUF-BPU/resolve/main/SmolVLM2-256M-Video-Instruct-Q8_0.gguf
```

</DocScope>

<DocScope products="RDK-S100">

```bash
wget https://hf-mirror.com/D-Robotics/SmolVLM2-256M-Video-Instruct-GGUF-BPU/resolve/main/rdks100/SigLip_int16_SmolVLM2_256M_Instruct_S100.hbm
wget https://hf-mirror.com/D-Robotics/SmolVLM2-256M-Video-Instruct-GGUF-BPU/resolve/main/SmolVLM2-256M-Video-Instruct-Q8_0.gguf
```

</DocScope>

<DocScope products="RDK-X5">
```bash
source /opt/tros/humble/setup.bash
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_llamacpp/config/ .
ros2 run hobot_llamacpp hobot_llamacpp --ros-args -p feed_type:=0 -p model_type:=1 -p image:=config/image2.jpg -p image_type:=0 -p user_prompt:="Describe the image." -p model_file_name:=SigLip_int16_SmolVLM2_256M_Instruct_MLP_C1_UP_X5.bin -p llm_model_name:=SmolVLM2-256M-Video-Instruct-Q8_0.gguf
```

</DocScope>

<DocScope products="RDK-S100">

```bash
source /opt/tros/humble/setup.bash
cp -r /opt/tros/${TROS_DISTRO}/lib/hobot_llamacpp/config/ .
ros2 run hobot_llamacpp hobot_llamacpp --ros-args -p feed_type:=0 -p model_type:=1 -p image:=config/image2.jpg -p image_type:=0 -p user_prompt:="Describe the image." -p model_file_name:=SigLip_int16_SmolVLM2_256M_Instruct_S100.hbm -p llm_model_name:=SmolVLM2-256M-Video-Instruct-Q8_0.gguf
```

</DocScope>

After the program starts, you can use local images and custom prompts for output.

![smolvlm_result](http://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/02_quick_demo/image/hobot_llamacpp/smolvlm_result.png)


## Notes

On the X5 platform, set ION memory size to 1.6GB. On the S100 platform, set ION memory size to greater than 1.6GB; otherwise, model loading will fail.
