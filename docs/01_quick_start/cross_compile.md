---
sidebar_position: 3
---

# 5.1.3 源码安装

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

本章节介绍 RDK 和 X86 平台如何通过源码安装 TogetheROS.Bot。

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

其中`tros_ws/robot_dev_config`路径包含代码拉取、编译、打包等功能所需要的配置、脚本文件；`tros_ws/src`路径存放拉取的代码；`sysroot_docker`路径包含交叉编译依赖的头文件和库，和 RDK 的`/`目录对应。例如媒体库在`sysroot_docker`中的路径为`sysroot_docker/usr/lib/hbmedia/`，在 RDK 中的路径为`/usr/lib/hbmedia/`。

编译时，在`robot_dev_config/aarch64_toolchainfile.cmake`编译脚本中通过`CMAKE_SYSROOT`宏指定`sysroot_docker`的安装路径。

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

## X86 平台

### 系统要求

必须为 Ubuntu 20.04 64 位系统，也可使用 RDK 平台交叉编译 docker 镜像，但编译和运行必须都在 docker 中进行。

**注意！X86 平台仅支持 2.0.0 版本 TogetheROS.Bot。**

### 系统设置

#### 设置 local

确保语言环境支持 UTF-8

```shell
locale  # check for UTF-8

sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

locale  # verify settings
```

#### 添加 apt 源

```shell
# 首先确保已启用 Ubuntu Universe
sudo apt install software-properties-common
sudo add-apt-repository universe

sudo apt update && sudo apt install curl

# 添加ROS2官方源
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# 添加tros.b官方源
sudo curl -sSL http://archive.d-robotics.cc/keys/sunrise.gpg -o /usr/share/keyrings/sunrise.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/sunrise.gpg] http://archive.d-robotics.cc/ubuntu-rdk-sim focal main" | sudo    tee /etc/apt/sources.list.d/sunrise.list > /dev/null
```

#### 安装 ROS 工具包

```shell
sudo apt update && sudo apt install -y \
  libbullet-dev \
  python3-pip \
  python3-pytest-cov \
  ros-dev-tools
```

### 获取 tros.b 源码

```shell
git config --global credential.helper store

mkdir -p ~/cc_ws/tros_ws/src
cd ~/cc_ws/tros_ws/

git clone https://github.com/D-Robotics/robot_dev_config.git -b develop 
vcs-import src < ./robot_dev_config/ros2_release.repos
```

### 安装依赖项

安装源码编译依赖的包

```shell
# install some pip packages needed for testing
python3 -m pip install -U \
  argcomplete \
  flake8-blind-except \
  flake8-builtins \
  flake8-class-newline \
  flake8-comprehensions \
  flake8-deprecated \
  flake8-docstrings \
  flake8-import-order \
  flake8-quotes \
  pytest-repeat \
  pytest-rerunfailures \
  pytest

# install Fast-RTPS dependencies
sudo apt install --no-install-recommends -y \
  libasio-dev \
  libtinyxml2-dev

# install Cyclone DDS dependencies
sudo apt install --no-install-recommends -y \
  libcunit1-dev

# install tros.b basic models
sudo apt install --no-install-recommends -y \
  hobot-models-basic

# install other packages dependencies
sudo apt install --no-install-recommends -y \
  qt5-qmake \
  libpyside2-dev \
  libshiboken2-dev \
  pyqt5-dev \
  python3-pyqt5 \
  python3-pyqt5.qtsvg \
  python3-pyside2.qtsvg \
  python3-sip-dev \
  shiboken2 \
  libyaml-dev \
  qtbase5-dev \
  libzstd-dev \
  libeigen3-dev \
  libxml2-utils \
  libtinyxml-dev \
  libssl-dev \
  python3-numpy \
  libconsole-bridge-dev \
  pydocstyle \
  libqt5core5a \
  libqt5gui5 \
  libgtest-dev \
  cppcheck \
  tango-icon-theme \
  libqt5opengl5 \
  libqt5widgets5 \
  python3-lark \
  libspdlog-dev \
  google-mock \
  clang-format \
  python3-flake8 \
  libbenchmark-dev \
  python3-pygraphviz \
  python3-pydot \
  python3-psutil \
  libfreetype6-dev \
  libx11-dev \
  libxaw7-dev \
  libxrandr-dev \
  libgl1-mesa-dev \
  libglu1-mesa-dev \
  python3-pytest-mock \
  python3-mypy \
  default-jdk \
  libcunit1-dev \
  libopencv-dev \
  python3-ifcfg \
  python3-matplotlib \
  graphviz \
  uncrustify \
  python3-lxml \
  libcppunit-dev \
  libcurl4-openssl-dev \
  python3-mock \
  python3-nose \
  libsqlite3-dev \
  pyflakes3 \
  clang-tidy \
  python3-lttng \
  liblog4cxx-dev \
  python3-babeltrace \
  python3-pycodestyle \
  libassimp-dev \
  libboost-dev \
  libboost-python-dev \
  python3-opencv \
  libboost-python1.71.0
```

### 编译

```shell
# 使用build.sh编译
bash ./robot_dev_config/build.sh -p X86
```

编译成功后会提示总计 N packages 编译通过。

### 安装 tros.b

将编译生成的 install 目录拷贝至/opt 目录下并重命名为 tros，与 deb 安装目录保持一致

## 常见问题

Q1： 如何判断 VCS 是否成功拉取代码

A1：如下图所示，vcs import 过程中打印.表示成功拉取 repo，如果打印 E 表示该 repo 拉取失败可以通过执行后的 log 看到具体失败的 repo，碰到这种情况可以尝试删除 src 里面的内容重新 vcs import 或者手动拉取失败的 repo.

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/01_quick_start/image/cross_compile/vcs_import_error.png" alt="vcs import 拉取仓库时成功打印点号、失败打印 E 的终端日志示例" style={{ width: '90%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

Q2：条件受限无法从 github 拉取代码

A2：可以直接在[TogetheROS 文件服务器](http://archive.d-robotics.cc/TogetheROS/source_code/)中选择下载需要的版本代码。例如`tros_2.0.0_source_code.tar.gz`文件对应于 tros.b 2.0.0 版本。
