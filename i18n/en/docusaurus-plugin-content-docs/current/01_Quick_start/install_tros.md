---
sidebar_position: 2
---

# 5.1.2 apt Installation and Upgrade

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

This section introduces how to install TogetheROS.Bot using apt on RDK and X86 platforms.

## RDK Platform

Prerequisites

- Completed the work in [Environment Preparation](./preparation.md)
- Ubuntu system is installed on RDK
- RDK can access the internet normally
- RDK supports remote ssh

<DocScope products="RDK X3,RDK X5">

:::info 📋 System Version Confirmation and Download

Before installing TogetheROS, you need to confirm the system version and download the latest image. For system image download, please refer to: [Download Resources Summary](https://developer.d-robotics.cc/rdk_x_doc/Quick_start/download)

:::

</DocScope>

<DocScope products="RDK S100,RDK S600">

:::info 📋 System Version Confirmation and Download

Before installing TogetheROS, you need to confirm the system version and download the latest image. For system image download, please refer to: [Download Resources Summary](https://developer.d-robotics.cc/rdk_x_doc/Quick_start/download)

:::

</DocScope>


<DocScope products="RDK X3">


Please note for RDK X3 platform:

:::caution Note
- **2.x version tros.b only supports 2.x version system images. [1.x version tros.b](https://developer.d-robotics.cc/api/v1/fileData/TogetherROS/index.html) only supports 1.x version systems.**
- **If you are using a 1.x version system image, you need to upgrade from [Environment Preparation](./preparation.md) to 2.x version.**
- **For system and tros.b version checking methods and detailed instructions, please refer to [FAQs](https://developer.d-robotics.cc/rdk_x_doc/FAQ/applications_and_examples).**
:::


</DocScope>

<DocScope products="RDK X3,RDK X5">

| Dependency    | 1.x tros.b  | 2.x tros.b |
| -----------| ------------| ------------|
| 1.x System Image |       √     |       x     |
| 2.x System Image |       x     |       √     |

</DocScope>

### Installing tros.b

**Note: The RDK IP used here is 10.64.61.241. Replace with your own RDK IP during installation.**

Log in to RDK:

```shell
ssh root@10.64.61.241
```

Install tros.b package:

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
sudo apt update
sudo apt install tros
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
sudo apt update
sudo apt install tros-humble
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
sudo apt update
sudo apt install tros-jazzy
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
sudo apt update
sudo apt install tros-humble
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
sudo apt update
sudo apt install tros-jazzy
```

</TabItem>

</Tabs>
</DocScope>


<DocScope products="RDK-X3">

:::caution **Note**
- **If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_x_doc/en/FAQ/hardware_and_system?v=3.0.0&p=RDK+X3#q10-what-to-do-if-apt-update-fails-eg-key-error-update-failure-lock-file-in-use) section `Q10: How to handle apt update command failure or error?` for resolution.**
- **If after running the install command you see `E: Unmet dependencies. Try 'apt --fix-broken install' with no packages (or specify a solution).`, first run `apt --fix-broken install` to install related dependencies, then install tros.b.**
:::

</DocScope>

<DocScope products="RDK-X5">

:::caution **Note**
- **If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_x_doc/en/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-what-to-do-if-apt-update-fails-eg-key-error-update-failure-lock-file-in-use) section `Q10: How to handle apt update command failure or error?` for resolution.**
- **If after running the install command you see `E: Unmet dependencies. Try 'apt --fix-broken install' with no packages (or specify a solution).`, first run `apt --fix-broken install` to install related dependencies, then install tros.b.**
:::

</DocScope>

<DocScope products="RDK-S100">

:::caution **Note**
- **If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_s_doc/FAQ/hardware_and_system#q6-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86) section `Q6: How to handle apt update command failure or error?` for resolution.**
- **If after running the install command you see `E: Unmet dependencies. Try 'apt --fix-broken install' with no packages (or specify a solution).`, first run `apt --fix-broken install` to install related dependencies, then install tros.b.**
:::

</DocScope>

<DocScope products="RDK-S600">

:::caution **Note**
- **If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_s_doc/en/FAQ/hardware_and_system?v=5.1.0&p=RDK+S600#q6-how-do-i-handle-apt-update-failures-or-errors) section `Q6: How to handle apt update command failure or error?` for resolution.**
- **If after running the install command you see `E: Unmet dependencies. Try 'apt --fix-broken install' with no packages (or specify a solution).`, first run `apt --fix-broken install` to install related dependencies, then install tros.b.**
:::

</DocScope>



After installation, check files in the /opt directory

```bash
root@ubuntu:/userdata# ls /opt/
hobot  tros
```

You can see tros.b is installed in the /opt directory.

### Upgrading tros.b

Using RDK installation as an example, the X86 Ubuntu upgrade method is the same as RDK.

Log in to RDK

```shell
ssh root@10.64.61.241
```

Upgrade tros.b deb package

```shell
sudo apt update
sudo apt upgrade
```

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_x_doc/en/FAQ/hardware_and_system?v=3.0.0&p=RDK+X3#q10-what-to-do-if-apt-update-fails-eg-key-error-update-failure-lock-file-in-use) section `Q10: How to handle apt update command failure or error?` for resolution.**
:::

### Check Current tros.b Version

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
root@ubuntu:~# apt show tros
Package: tros
Version: 2.0.0-20230523223852
Maintainer: kairui.wang <kairui.wang@d-robotics.cc>
Installed-Size: unknown
Depends: hobot-models-basic, tros-ros-base, tros-ai-msgs, tros-audio-control, tros-audio-msg, tros-audio-tracking, tros-body-tracking, tros-dnn-benchmark-example, tros-dnn-node, tros-dnn-node-example, tros-dnn-node-sample, tros-elevation-net, tros-gesture-control, tros-hand-gesture-detection, tros-hand-lmk-detection, tros-hbm-img-msgs, tros-hobot-app-xrrobot-body-tracking, tros-hobot-app-xrrobot-gesture-control, tros-hobot-codec, tros-hobot-cv, tros-hobot-falldown-detection, tros-hobot-hdmi, tros-hobot-image-publisher, tros-hobot-mot, tros-hobot-usb-cam, tros-image-subscribe-example, tros-img-msgs, tros-imu-sensor, tros-line-follower-model, tros-line-follower-perception, tros-mipi-cam, tros-mono2d-body-detection, tros-mono2d-trash-detection, tros-mono3d-indoor-detection, tros-parking-perception, tros-parking-search, tros-rgbd-sensor, tros-websocket, tros-xrrobot, tros-xrrobot-msgs
Download-Size: 980 B
APT-Manual-Installed: yes
APT-Sources: http://archive.d-robotics.cc/ubuntu-rdk focal/main arm64 Packages
Description: TogetheROS Bot

```

You can see the current tros.b version has been upgraded to 2.0.0.

</TabItem>

<TabItem value="humble" label="Humble">

```bash
root@ubuntu:~# apt show tros-humble
Package: tros-humble
Version: 2.2.0-jammy.20240410.221258
Priority: optional
Section: misc
Maintainer: zhuo <zhuo.wang@d-robotics.cc>
Installed-Size: 44.0 kB
Depends: hobot-models-basic, tros-humble-ai-msgs, tros-humble-audio-control, tros-humble-audio-msg, tros-humble-audio-tracking, tros-humble-base, tros-humble-body-tracking, tros-humble-dnn-benchmark-example, tros-humble-dnn-node, tros-humble-dnn-node-example, tros-humble-dnn-node-sample, tros-humble-elevation-net, tros-humble-gesture-control, tros-humble-hand-gesture-detection, tros-humble-hand-lmk-detection, tros-humble-hbm-img-msgs, tros-humble-hobot-audio, tros-humble-hobot-chatbot, tros-humble-hobot-codec, tros-humble-hobot-cv, tros-humble-hobot-falldown-detection, tros-humble-hobot-hdmi, tros-humble-hobot-image-publisher, tros-humble-hobot-llm, tros-humble-hobot-mot, tros-humble-hobot-shm, tros-humble-hobot-tts, tros-humble-hobot-usb-cam, tros-humble-hobot-vio, tros-humble-hobot-visualization, tros-humble-img-msgs, tros-humble-imu-sensor, tros-humble-line-follower-model, tros-humble-line-follower-perception, tros-humble-mipi-cam, tros-humble-mono2d-body-detection, tros-humble-mono2d-trash-detection, tros-humble-mono3d-indoor-detection, tros-humble-parking-perception, tros-humble-parking-search, tros-humble-rgbd-sensor, tros-humble-websocket, tros-humble-ros-workspace
Download-Size: 5,546 B
APT-Manual-Installed: yes
APT-Sources: http://archive.d-robotics.cc/ubuntu-rdk jammy/main arm64 Packages
Description: TogetheROS Bot

```

You can see the current tros.b version has been upgraded to 2.2.0.

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
root@ubuntu:~# apt show tros-jazzy
Package: tros-jazzy
Version: 2.5.0-noble.20251202.080038
Priority: optional
Section: misc
Maintainer: zhuo <zhuo.wang@d-robotics.cc>
Installed-Size: 44.0 kB
Depends: hobot-models-basic, tros-jazzy-ai-msgs, tros-jazzy-audio-control, tros-jazzy-audio-msg, tros-jazzy-audio-tracking, tros-jazzy-base, tros-jazzy-body-tracking, tros-jazzy-dnn-benchmark-example, tros-jazzy-dnn-node, tros-jazzy-dnn-node-example, tros-jazzy-dnn-node-sample, tros-jazzy-elevation-net, tros-jazzy-gesture-control, tros-jazzy-hand-gesture-detection, tros-jazzy-hand-lmk-detection, tros-jazzy-hbm-img-msgs, tros-humble-hobot-audio, tros-jazzy-hobot-chatbot, tros-jazzy-hobot-codec, tros-jazzy-hobot-cv, tros-jazzy-hobot-falldown-detection, tros-jazzy-hobot-hdmi, tros-jazzy-hobot-image-publisher, tros-jazzy-hobot-llm, tros-jazzy-hobot-mot, tros-jazzy-hobot-shm, tros-jazzy-hobot-tts, tros-jazzy-hobot-usb-cam, tros-jazzy-hobot-vio, tros-humble-hobot-visualization, tros-jazzy-img-msgs, tros-jazzy-imu-sensor, tros-jazzy-line-follower-model, tros-humble-line-follower-perception, tros-jazzy-mipi-cam, tros-jazzy-mono2d-body-detection, tros-jazzy-mono2d-trash-detection, tros-jazzy-mono3d-indoor-detection, tros-jazzy-parking-perception, tros-jazzy-parking-search, tros-jazzy-rgbd-sensor, tros-jazzy-websocket, tros-jazzy-ros-workspace
Download-Size: 5,546 B
APT-Manual-Installed: yes
APT-Sources: http://archive.d-robotics.cc/ubuntu-rdk-s600 noble/main arm64 Packages
Description: TogetheROS Bot

```

You can see the current tros.b version has been upgraded to 2.5.0.

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
root@ubuntu:~# apt show tros-humble
Package: tros-humble
Version: 2.2.0-jammy.20240410.221258
Priority: optional
Section: misc
Maintainer: zhuo <zhuo.wang@d-robotics.cc>
Installed-Size: 44.0 kB
Depends: hobot-models-basic, tros-humble-ai-msgs, tros-humble-audio-control, tros-humble-audio-msg, tros-humble-audio-tracking, tros-humble-base, tros-humble-body-tracking, tros-humble-dnn-benchmark-example, tros-humble-dnn-node, tros-humble-dnn-node-example, tros-humble-dnn-node-sample, tros-humble-elevation-net, tros-humble-gesture-control, tros-humble-hand-gesture-detection, tros-humble-hand-lmk-detection, tros-humble-hbm-img-msgs, tros-humble-hobot-audio, tros-humble-hobot-chatbot, tros-humble-hobot-codec, tros-humble-hobot-cv, tros-humble-hobot-falldown-detection, tros-humble-hobot-hdmi, tros-humble-hobot-image-publisher, tros-humble-hobot-llm, tros-humble-hobot-mot, tros-humble-hobot-shm, tros-humble-hobot-tts, tros-humble-hobot-usb-cam, tros-humble-hobot-vio, tros-humble-hobot-visualization, tros-humble-img-msgs, tros-humble-imu-sensor, tros-humble-line-follower-model, tros-humble-line-follower-perception, tros-humble-mipi-cam, tros-humble-mono2d-body-detection, tros-humble-mono2d-trash-detection, tros-humble-mono3d-indoor-detection, tros-humble-parking-perception, tros-humble-parking-search, tros-humble-rgbd-sensor, tros-humble-websocket, tros-humble-ros-workspace
Download-Size: 5,546 B
APT-Manual-Installed: yes
APT-Sources: http://archive.d-robotics.cc/ubuntu-rdk jammy/main arm64 Packages
Description: TogetheROS Bot

```

You can see the current tros.b version has been upgraded to 2.2.0.

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
root@ubuntu:~# apt show tros-jazzy
Package: tros-jazzy
Version: 2.5.0-noble.20251202.080038
Priority: optional
Section: misc
Maintainer: zhuo <zhuo.wang@d-robotics.cc>
Installed-Size: 44.0 kB
Depends: hobot-models-basic, tros-jazzy-ai-msgs, tros-jazzy-audio-control, tros-jazzy-audio-msg, tros-jazzy-audio-tracking, tros-jazzy-base, tros-jazzy-body-tracking, tros-jazzy-dnn-benchmark-example, tros-jazzy-dnn-node, tros-jazzy-dnn-node-example, tros-jazzy-dnn-node-sample, tros-jazzy-elevation-net, tros-jazzy-gesture-control, tros-jazzy-hand-gesture-detection, tros-jazzy-hand-lmk-detection, tros-jazzy-hbm-img-msgs, tros-humble-hobot-audio, tros-jazzy-hobot-chatbot, tros-jazzy-hobot-codec, tros-jazzy-hobot-cv, tros-jazzy-hobot-falldown-detection, tros-jazzy-hobot-hdmi, tros-jazzy-hobot-image-publisher, tros-jazzy-hobot-llm, tros-jazzy-hobot-mot, tros-jazzy-hobot-shm, tros-jazzy-hobot-tts, tros-jazzy-hobot-usb-cam, tros-jazzy-hobot-vio, tros-humble-hobot-visualization, tros-jazzy-img-msgs, tros-jazzy-imu-sensor, tros-jazzy-line-follower-model, tros-humble-line-follower-perception, tros-jazzy-mipi-cam, tros-jazzy-mono2d-body-detection, tros-jazzy-mono2d-trash-detection, tros-jazzy-mono3d-indoor-detection, tros-jazzy-parking-perception, tros-jazzy-parking-search, tros-jazzy-rgbd-sensor, tros-jazzy-websocket, tros-jazzy-ros-workspace
Download-Size: 5,546 B
APT-Manual-Installed: yes
APT-Sources: http://archive.d-robotics.cc/ubuntu-rdk-s600 noble/main arm64 Packages
Description: TogetheROS Bot

```

You can see the current tros.b version has been upgraded to 2.5.0.

</TabItem>

</Tabs>
</DocScope>

:::caution Note
- The version number `Version` displayed in the query is the actually installed `tros.b` version, which may differ from the version number `Version` shown in this example.
- For tros.b release version information, see [Release Notes](./changelog).
:::

## X86 Platform

Prerequisites:

- Completed the work in [Environment Preparation](./preparation.md)
- Ubuntu system is Ubuntu 20.04 and can access the internet normally

1. Set locale and enable universe repository

   ```bash
   sudo apt update && sudo apt install locales
   sudo locale-gen en_US en_US.UTF-8
   sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
   export LANG=en_US.UTF-8

   sudo apt install software-properties-common
   sudo add-apt-repository universe
   ```

2. Download gpg key file and add source list:

   ```bash
   sudo apt update && sudo apt install curl

   sudo curl -sSL http://archive.d-robotics.cc/keys/sunrise.gpg -o /usr/share/keyrings/sunrise.gpg
   echo "deb [arch=amd64 signed-by=/usr/share/keyrings/sunrise.gpg] http://archive.d-robotics.cc/ubuntu-rdk-sim focal main" | sudo    tee /etc/apt/sources.list.d/sunrise.list > /dev/null

   sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
   ```

3. Update source information and install tros.b:

   ```bash
   sudo apt update
   sudo apt install tros
   ```

:::caution
- **If your X86 platform has 1.x version tros.b installed, please first use the command `sudo apt remove tros` to remove it before installing 2.x version tros.b**.
- **For how to check tros.b version number, please refer to [FAQs](https://developer.d-robotics.cc/rdk_s_doc/FAQ/applications_and_examples)**.
:::
