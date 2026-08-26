---
sidebar_position: 3
---

# 5.1.3 源码安装

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

本章节介绍 RDK 平台如何通过源码安装 TogetheROS.Bot。

## RDK 平台

前提：

- 开发机能够正常访问[D-Robotics](https://github.com/D-Robotics)组织
- 开发机已安装 docker

### 编译 tros.b

#### 1 使用 docker 文件

该部分操作均在开发机内完成。

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```shell
## 创建目录
cd  /mnt/data/kairui.wang/test
mkdir -p cc_ws/tros_ws/src
## 获取交叉编译用docker
wget http://archive.d-robotics.cc/TogetheROS/cross_compile_docker/pc_tros_v1.0.5.tar.gz
## 加载docker镜像
sudo docker load --input pc_tros_v1.0.5.tar.gz 
## 查看pc_tros对应的image ID
sudo docker images
## 启动docker挂载目录
sudo docker run -it --entrypoint="/bin/bash" -v PC本地目录:docker目录 imageID，这里以 sudo docker run -it --entrypoint="/bin/bash" -v /mnt/data/kairui.wang/test:/mnt/test 9c2ca340973e 为例
```

</TabItem>

<TabItem value="humble" label="Humble">


```shell
## 创建目录
cd  /mnt/data/kairui.wang/test
mkdir -p cc_ws/tros_ws/src
## 获取交叉编译用docker
wget http://archive.d-robotics.cc/TogetheROS/cross_compile_docker/pc_tros_ubuntu22.04_v1.0.0.tar.gz
## 加载docker镜像
sudo docker load --input pc_tros_ubuntu22.04_v1.0.0.tar.gz 
## 查看pc_tros对应的image ID
sudo docker images
## 启动docker挂载目录
sudo docker run -it --entrypoint="/bin/bash" -v PC本地目录:docker目录 imageID，这里以 sudo docker run -it --entrypoint="/bin/bash" -v /mnt/data/kairui.wang/test:/mnt/test 4cbdb9d61e19 为例
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```shell
## 创建目录
cd  /mnt/data/kairui.wang/test
mkdir -p cc_ws/tros_ws/src
## 获取交叉编译用docker
wget http://archive.d-robotics.cc/TogetheROS/cross_compile_docker/pc_tros_ubuntu24.04_v1.0.1.tar.gz
## 加载docker镜像
sudo docker load --input pc_tros_ubuntu24.04_v1.0.1.tar.gz 
## 查看pc_tros对应的image ID
sudo docker images
## 启动docker挂载目录
sudo docker run -it --entrypoint="/bin/bash" -v PC本地目录:docker目录 imageID，这里以 sudo docker run -it --entrypoint="/bin/bash" -v /mnt/data/kairui.wang/test:/mnt/test 4cbdb9d61e19 为例
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">


```shell
## 创建目录
cd  /mnt/data/kairui.wang/test
mkdir -p cc_ws/tros_ws/src
## 获取交叉编译用docker
wget http://archive.d-robotics.cc/TogetheROS/cross_compile_docker/pc_tros_ubuntu22.04_v1.0.0.tar.gz
## 加载docker镜像
sudo docker load --input pc_tros_ubuntu22.04_v1.0.0.tar.gz 
## 查看pc_tros对应的image ID
sudo docker images
## 启动docker挂载目录
sudo docker run -it --entrypoint="/bin/bash" -v PC本地目录:docker目录 imageID，这里以 sudo docker run -it --entrypoint="/bin/bash" -v /mnt/data/kairui.wang/test:/mnt/test 4cbdb9d61e19 为例
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```shell
## 创建目录
cd  /mnt/data/kairui.wang/test
mkdir -p cc_ws/tros_ws/src
## 获取交叉编译用docker
wget http://archive.d-robotics.cc/TogetheROS/cross_compile_docker/pc_tros_ubuntu24.04_v1.0.1.tar.gz
## 加载docker镜像
sudo docker load --input pc_tros_ubuntu24.04_v1.0.1.tar.gz 
## 查看pc_tros对应的image ID
sudo docker images
## 启动docker挂载目录
sudo docker run -it --entrypoint="/bin/bash" -v PC本地目录:docker目录 imageID，这里以 sudo docker run -it --entrypoint="/bin/bash" -v /mnt/data/kairui.wang/test:/mnt/test 4cbdb9d61e19 为例
```

</TabItem>
</Tabs>
</DocScope>


#### 2 获取 tros.b 源码

该部分操作均在开发机的 docker 内完成。

这里以 docker 中/mnt/test 目录为例。

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```shell
cd /mnt/test/cc_ws/tros_ws
## 获取配置文件
git clone https://github.com/D-Robotics/robot_dev_config.git -b foxy 
## 执行cd robot_dev_config，使用 git tag --list 命令查看可用的发布版本
## 使用 git reset --hard [tag号] 命令指定发布版本。详细说明参考本页面 编译指定版本tros.b 内容
## 拉取代码
vcs-import src < ./robot_dev_config/ros2_release.repos 
```

</TabItem>

<TabItem value="humble" label="Humble">


```shell
cd /mnt/test/cc_ws/tros_ws
## 获取配置文件
git clone https://github.com/D-Robotics/robot_dev_config.git -b develop 
## 执行cd robot_dev_config，使用 git tag --list 命令查看可用的发布版本
## 使用 git reset --hard [tag号] 命令指定发布版本。详细说明参考本页面 编译指定版本tros.b 内容
## 拉取代码
vcs-import src < ./robot_dev_config/ros2_release.repos 
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">


```shell
cd /mnt/test/cc_ws/tros_ws
## 获取配置文件
git clone https://github.com/D-Robotics/robot_dev_config.git -b jazzy 
## 执行cd robot_dev_config，使用 git tag --list 命令查看可用的发布版本
## 使用 git reset --hard [tag号] 命令指定发布版本。详细说明参考本页面 编译指定版本tros.b 内容
## 拉取代码
vcs-import src < ./robot_dev_config/ros2_release.repos 
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">


```shell
cd /mnt/test/cc_ws/tros_ws
## 获取配置文件
git clone https://github.com/D-Robotics/robot_dev_config.git -b develop 
## 执行cd robot_dev_config，使用 git tag --list 命令查看可用的发布版本
## 使用 git reset --hard [tag号] 命令指定发布版本。详细说明参考本页面 编译指定版本tros.b 内容
## 拉取代码
vcs-import src < ./robot_dev_config/ros2_release.repos 
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">


```shell
cd /mnt/test/cc_ws/tros_ws
## 获取配置文件
git clone https://github.com/D-Robotics/robot_dev_config.git -b jazzy 
## 执行cd robot_dev_config，使用 git tag --list 命令查看可用的发布版本
## 使用 git reset --hard [tag号] 命令指定发布版本。详细说明参考本页面 编译指定版本tros.b 内容
## 拉取代码
vcs-import src < ./robot_dev_config/ros2_release.repos 
```

</TabItem>
</Tabs>
</DocScope>

整个工程目录结构如下

```text
├── cc_ws
│   ├── sysroot_docker
│   │   ├── etc
│   │   ├── lib -> usr/lib
│   │   ├── opt
│   │   └── usr
│   └── tros_ws
│       ├── robot_dev_config
│       └── src
```

其中 `tros_ws/robot_dev_config` 路径包含代码拉取、编译、打包等功能所需要的配置、脚本文件； `tros_ws/src` 路径存放拉取的代码； `sysroot_docker` 路径包含交叉编译依赖的头文件和库，和 RDK 的 `/` 目录对应。例如媒体库在 `sysroot_docker` 中的路径为 `sysroot_docker/usr/lib/hbmedia/` ，在 RDK 中的路径为 `/usr/lib/hbmedia/` 。

编译时，在 `robot_dev_config/aarch64_toolchainfile.cmake` 编译脚本中通过 `CMAKE_SYSROOT` 宏指定 `sysroot_docker` 的安装路径。

:::info
robot_dev_config 的 tag 号（版本信息），请查看[版本发布记录](./changelog.md)章节。
:::

#### 3 交叉编译

该部分操作均在开发机的 docker 内完成。

<DocScope products="RDK X3">

```shell
## 使用build.sh编译X3版本tros.b
bash ./robot_dev_config/build.sh -p X3
```
</DocScope>

<DocScope products="RDK X5">

```shell

## 使用build.sh编译X5版本tros.b
bash ./robot_dev_config/build.sh -p X5
```

</DocScope>

<DocScope products="RDK S100">

```shell  

## 使用build.sh编译S100版本tros.b
bash ./robot_dev_config/build.sh -p S100
```
</DocScope>

<DocScope products="RDK S600">

```shell

## 使用build.sh编译S600版本tros.b
bash ./robot_dev_config/build.sh -p S600
```
</DocScope>

编译成功后会提示总计 N packages 编译通过。

若使用 minimal_build.sh 进行最小化编译，还可通过执行./minimal_deploy.sh -d “install_path”，进一步压缩部署包大小。

### 安装 tros.b

将编译生成的 install 目录拷贝至 RDK 中并重命名为 tros，这里我们将部署包放在/opt/tros 目录下与 deb 安装目录保持一致

### 编译指定版本 tros.b

在本章节**编译 tros.b**小节第 2 步**获取 tros.b 源码**中，默认是获取的最新版本 tros.b 源码。如果需要获取某个指定发布版本源码，该步骤需要做如下修改

```bash
## 获取配置文件
git clone https://github.com/D-Robotics/robot_dev_config.git
cd robot_dev_config
## 查看可用的发布版本
git tag --list
## 切换至指定版本号，这里以tros.b 2.0.0为例
git reset --hard tros_2.0.0
cd ..
## 拉取代码
vcs-import src < ./robot_dev_config/ros2_release.repos
```

:::info
robot_dev_config 的 tag 号（版本信息），请查看[版本发布记录](./changelog.md)章节。
:::

## 常见问题

Q1： 如何判断 VCS 是否成功拉取代码

A1：如下图所示，vcs import 过程中打印.表示成功拉取 repo，如果打印 E 表示该 repo 拉取失败可以通过执行后的 log 看到具体失败的 repo，碰到这种情况可以尝试删除 src 里面的内容重新 vcs import 或者手动拉取失败的 repo.

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/01_quick_start/image/cross_compile/vcs_import_error.png" alt="vcs import 拉取仓库时成功打印点号、失败打印 E 的终端日志示例" style={{ width: '90%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

Q2：条件受限无法从 github 拉取代码

A2：可以直接在[TogetheROS 文件服务器](http://archive.d-robotics.cc/TogetheROS/source_code/)中选择下载需要的版本代码。例如 `tros_2.0.0_source_code.tar.gz` 文件对应于 tros.b 2.0.0 版本。
