---
sidebar_position: 1
---

# 5.1.1 Environment Preparation

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

TogetheROS.Bot supports installation on Ubuntu systems for both RDK and X86 platforms. Installing via DEB packages on Ubuntu is simple and fast. Users who are getting started are recommended to use this installation method.

The following sections describe environment preparation details for RDK and X86 platforms respectively.

## RDK Platform

### System Installation

Before installing tros.b, it is recommended to upgrade the RDK system image to the latest version. Ubuntu image flashing method:

<DocScope products="RDK-X3">


[Ubuntu Image Flashing Method](https://developer.d-robotics.cc/rdk_x_doc/en/install_os/rdk_x3?v=3.0.0&p=RDK+X3)

</DocScope>

<DocScope products="RDK-X5">


[Ubuntu Image Flashing Method](https://developer.d-robotics.cc/rdk_x_doc/en/install_os/rdk_x5?v=3.5.0&p=RDK+X5)

</DocScope>

<DocScope products="RDK X3">

:::caution **Note**
- **If you are using RDK X3 with a 1.x version system, you need to upgrade the system to 2.x version.**
- **For system version checking methods and detailed instructions, please refer to [FAQs](https://developer.d-robotics.cc/rdk_x_doc/FAQ/applications_and_examples).**
:::

</DocScope>

<DocScope products="RDK-S100">

[Ubuntu Image Flashing Method](https://developer.d-robotics.cc/rdk_s_doc/en/02_install_os/rdk_s100)

</DocScope>

<DocScope products="RDK-S600">

[Ubuntu Image Flashing Method](https://developer.d-robotics.cc/rdk_s_doc/en/Quick_start/install_os/rdk_s600)

</DocScope>

If the image is already installed, you can upgrade using the commands `sudo apt update` and `sudo apt upgrade`.

<DocScope products="RDK-X3">

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_x_doc/en/FAQ/hardware_and_system?v=3.0.0&p=RDK+X3#q10-what-to-do-if-apt-update-fails-eg-key-error-update-failure-lock-file-in-use) section `Q10: How to handle apt update command failure or error?` for resolution.**
:::

</DocScope>
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
<DocScope products="RDK-S600">

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_s_doc/en/FAQ/hardware_and_system?v=5.1.0&p=RDK+S600#q6-how-do-i-handle-apt-update-failures-or-errors) section `Q6: How to handle apt update command failure or error?` for resolution.**
:::

</DocScope>

### System Configuration

After the image is successfully flashed, you need to configure the RDK IP address for daily use. Login username: root, password: root.

:::caution **Note**
To ensure smooth installation and use of tros.b, please log in using the **root** account.
:::

During experience and development, commands such as scp/ssh are frequently used to access the RDK via IP address. Dynamic configuration is recommended here. Refer to:

<DocScope products="RDK X3,RDK X5">


[Network Configuration](https://developer.d-robotics.cc/rdk_x_doc/System_configuration/network_blueteeth)

</DocScope>

<DocScope products="RDK S100,RDK S600">


[Network Configuration](https://developer.d-robotics.cc/rdk_s_doc/System_configuration/network_blueteeth)

</DocScope>


Try pinging Baidu server

```shell
root@ubuntu:~# ping www.baidu.com
PING www.a.shifen.com (180.101.49.11) 56(84) bytes of data.
64 bytes from 180.101.49.11 (180.101.49.11): icmp_seq=1 ttl=52 time=4.10 ms
64 bytes from 180.101.49.11 (180.101.49.11): icmp_seq=2 ttl=52 time=4.34 ms
64 bytes from 180.101.49.11 (180.101.49.11): icmp_seq=3 ttl=52 time=4.28 ms
64 bytes from 180.101.49.11 (180.101.49.11): icmp_seq=4 ttl=52 time=4.21 ms
64 bytes from 180.101.49.11 (180.101.49.11): icmp_seq=5 ttl=52 time=4.19 ms
64 bytes from 180.101.49.11 (180.101.49.11): icmp_seq=6 ttl=52 time=4.98 ms
^C
--- www.a.shifen.com ping statistics ---
6 packets transmitted, 6 received, 0% packet loss, time 5008ms
rtt min/avg/max/mdev = 4.100/4.348/4.978/0.291 ms

```

A normal ping response indicates that internet access and DNS configuration are both correct.

Upgrade the system image and source information: `sudo apt update` `sudo apt upgrade`

Test ssh: `ssh root@RDK IP address`. Here the RDK IP address is 10.64.61.228, so enter `ssh root@10.64.61.228`. The first ssh login will show the following prompt:

```shell
 ssh root@10.64.61.241
The authenticity of host '10.64.61.241 (10.64.61.241)' can't be established.
ECDSA key fingerprint is SHA256:5NQuzIkfNYZftPkxrzCugbQs5Gy5CEC5U3Nhtu+sJs8.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
```

Enter `yes` and press Enter, then enter password: root, to access the RDK normally.

```dotnetcli
ssh root@10.64.61.241
The authenticity of host '10.64.61.241 (10.64.61.241)' can't be established.
ECDSA key fingerprint is SHA256:5NQuzIkfNYZftPkxrzCugbQs5Gy5CEC5U3Nhtu+sJs8.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.64.61.241' (ECDSA) to the list of known hosts.
root@10.64.61.241's password:
Permission denied, please try again.
root@10.64.61.241's password:
Welcome to Ubuntu 20.04.4 LTS (GNU/Linux 4.14.87 aarch64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage
Last login: Sat Apr  2 05:57:05 2022 from 10.64.37.219
root@ubuntu:~#
```

## X86 Platform

Install Ubuntu 20.04 64-bit on an X86 physical machine and configure the network environment. You can also use a virtual machine or Docker, but runtime efficiency may be lower.
