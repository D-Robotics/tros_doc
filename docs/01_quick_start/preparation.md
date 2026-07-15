---
sidebar_position: 1
---

# 5.1.1 环境准备

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

TogetheROS.Bot 支持在 RDK 和 X86 平台的 Ubuntu 系统上安装。使用 Ubuntu 系统通过 DEB 包安装的方式简单快捷，建议初期体验的用户尽量采用该方式进行安装。

接下来分别介绍 RDK 和 X86 平台环境准备详情。

## RDK 平台

### 系统安装

安装 tros.b 之前，建议用户将 RDK 系统镜像升级到最新版本，Ubuntu 镜像烧录方法：

<DocScope products="RDK-X3">


[Ubuntu 镜像烧录方法](https://developer.d-robotics.cc/rdk_x_doc/install_os/rdk_x3/?v=3.0.0&p=RDK+X3)

</DocScope>

<DocScope products="RDK-X5">


[Ubuntu 镜像烧录方法](https://developer.d-robotics.cc/rdk_x_doc/install_os/rdk_x5/?v=3.5.0&p=RDK+X5)

</DocScope>

<DocScope products="RDK X3">

:::caution **注意**
- **如果您使用的是 RDK X3，并且安装的是 1.x 版本系统，需要将系统升级到 2.x 版本。**
- **系统版本号查看方法以及详细说明，请查看[FAQs](https://developer.d-robotics.cc/rdk_x_doc/FAQ/applications_and_examples)。**
:::

</DocScope>

<DocScope products="RDK-S100">

[Ubuntu 镜像烧录方法](https://developer.d-robotics.cc/rdk_s_doc/Quick_start/install_os/rdk_s100/instruction?v=4.0.5&p=RDK+S100)

</DocScope>

<DocScope products="RDK-S600">

[Ubuntu 镜像烧录方法](https://developer.d-robotics.cc/rdk_s_doc/Quick_start/install_os/rdk_s600?v=5.1.0&p=RDK+S600)

</DocScope>

如果已经安装镜像，可以通过命令`sudo apt update`和`sudo apt upgrade`完成升级。

<DocScope products="RDK X3,RDK X5">

:::caution **注意**
<DocScope products="RDK-X3">
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system?v=3.0.0&p=RDK+X3#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q10: apt update 命令执行失败或报错如何处理？`解决。**
</DocScope>
<DocScope products="RDK-X5">
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q10: apt update 命令执行失败或报错如何处理？`解决。**
</DocScope>
:::

</DocScope>
<DocScope products="RDK S100,RDK S600">
:::caution **注意**
<DocScope products="RDK-S100">
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_s_doc/FAQ/hardware_and_system#q6-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q6: apt update 命令执行失败或报错如何处理？`解决。**
</DocScope>
<DocScope products="RDK-S600">
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_s_doc/FAQ/hardware_and_system?v=5.1.0&p=RDK+S600#q6-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q6: apt update 命令执行失败或报错如何处理？`解决。**
</DocScope>
:::
</DocScope>

### 系统配置

镜像成功烧写后，需要配置 RDK IP 地址，方便日常使用。登录用户名：root 密码：root。

:::caution **注意**
为方便后续顺利安装和使用 tros.b，请使用**root**账户进行登录。
:::

体验和开发过程中经常需要使用 scp/ssh 等命令通过 IP 地址访问 RDK，因此这里推荐使用动态配置，参考：

<DocScope products="RDK X3,RDK X5">


[网络配置](https://developer.d-robotics.cc/rdk_x_doc/System_configuration/network_blueteeth)

</DocScope>

<DocScope products="RDK S100,RDK S600">


[网络配置](https://developer.d-robotics.cc/rdk_s_doc/System_configuration/network_blueteeth)

</DocScope>


尝试 ping 百度服务器

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

ping 命令正常返回说明互联网访问以及 DNS 配置均正确

升级系统镜像以及源信息`sudo apt update` `sudo apt upgrade`

测试 ssh，`ssh root@RDK IP地址` 这里 RDK IP 地址为 10.64.61.228，因此输入`ssh root@10.64.61.228`，第一次 ssh 登陆会有如下提示

```shell
 ssh root@10.64.61.241
The authenticity of host '10.64.61.241 (10.64.61.241)' can't be established.
ECDSA key fingerprint is SHA256:5NQuzIkfNYZftPkxrzCugbQs5Gy5CEC5U3Nhtu+sJs8.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
```

输入`yes`回车，输入密码：root，即可正常访问 RDK

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

## X86 平台

使用 X86 平台物理机安装 Ubuntu 20.04 64 位系统，并配置好网络环境。也可使用虚拟机安装或 docker，但是运行效率可能会较低。
