---
sidebar_position: 3
---

# 5.1.3 Source Code Installation

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

This section introduces how to install TogetheROS.Bot from source code on RDK and X86 platforms.

## RDK Platform

Prerequisites:

- Development machine can access the [D-Robotics](https://github.com/D-Robotics) organization normally
- Docker is installed on the development machine

### Building tros.b

#### 1 Using Docker Image

All operations in this section are performed on the development machine.

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```shell
## Create directory
cd  /mnt/data/kairui.wang/test
mkdir -p cc_ws/tros_ws/src
## Get cross-compilation docker
wget http://archive.d-robotics.cc/TogetheROS/cross_compile_docker/pc_tros_v1.0.5.tar.gz
## Load docker image
sudo docker load --input pc_tros_v1.0.5.tar.gz 
## View image ID for pc_tros
sudo docker images
## Start docker with mounted directory
sudo docker run -it --entrypoint="/bin/bash" -v PC local directory:docker directory imageID, for example sudo docker run -it --entrypoint="/bin/bash" -v /mnt/data/kairui.wang/test:/mnt/test 9c2ca340973e
```

</TabItem>

<TabItem value="humble" label="Humble">


```shell
## Create directory
cd  /mnt/data/kairui.wang/test
mkdir -p cc_ws/tros_ws/src
## Get cross-compilation docker
wget http://archive.d-robotics.cc/TogetheROS/cross_compile_docker/pc_tros_ubuntu22.04_v1.0.0.tar.gz
## Load docker image
sudo docker load --input pc_tros_ubuntu22.04_v1.0.0.tar.gz 
## View image ID for pc_tros
sudo docker images
## Start docker with mounted directory
sudo docker run -it --entrypoint="/bin/bash" -v PC local directory:docker directory imageID, for example sudo docker run -it --entrypoint="/bin/bash" -v /mnt/data/kairui.wang/test:/mnt/test 4cbdb9d61e19
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```shell
## Create directory
cd  /mnt/data/kairui.wang/test
mkdir -p cc_ws/tros_ws/src
## Get cross-compilation docker
wget http://archive.d-robotics.cc/TogetheROS/cross_compile_docker/pc_tros_ubuntu24.04_v1.0.1.tar.gz
## Load docker image
sudo docker load --input pc_tros_ubuntu24.04_v1.0.1.tar.gz 
## View image ID for pc_tros
sudo docker images
## Start docker with mounted directory
sudo docker run -it --entrypoint="/bin/bash" -v PC local directory:docker directory imageID, for example sudo docker run -it --entrypoint="/bin/bash" -v /mnt/data/kairui.wang/test:/mnt/test 4cbdb9d61e19
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">


```shell
## Create directory
cd  /mnt/data/kairui.wang/test
mkdir -p cc_ws/tros_ws/src
## Get cross-compilation docker
wget http://archive.d-robotics.cc/TogetheROS/cross_compile_docker/pc_tros_ubuntu22.04_v1.0.0.tar.gz
## Load docker image
sudo docker load --input pc_tros_ubuntu22.04_v1.0.0.tar.gz 
## View image ID for pc_tros
sudo docker images
## Start docker with mounted directory
sudo docker run -it --entrypoint="/bin/bash" -v PC local directory:docker directory imageID, for example sudo docker run -it --entrypoint="/bin/bash" -v /mnt/data/kairui.wang/test:/mnt/test 4cbdb9d61e19
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```shell
## Create directory
cd  /mnt/data/kairui.wang/test
mkdir -p cc_ws/tros_ws/src
## Get cross-compilation docker
wget http://archive.d-robotics.cc/TogetheROS/cross_compile_docker/pc_tros_ubuntu24.04_v1.0.1.tar.gz
## Load docker image
sudo docker load --input pc_tros_ubuntu24.04_v1.0.1.tar.gz 
## View image ID for pc_tros
sudo docker images
## Start docker with mounted directory
sudo docker run -it --entrypoint="/bin/bash" -v PC local directory:docker directory imageID, for example sudo docker run -it --entrypoint="/bin/bash" -v /mnt/data/kairui.wang/test:/mnt/test 4cbdb9d61e19
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```shell
## Create directory
cd  /mnt/data/kairui.wang/test
mkdir -p cc_ws/tros_ws/src
## Get cross-compilation docker
wget http://archive.d-robotics.cc/TogetheROS/cross_compile_docker/pc_tros_ubuntu24.04_v1.0.1.tar.gz
## Load docker image
sudo docker load --input pc_tros_ubuntu24.04_v1.0.1.tar.gz 
## View image ID for pc_tros
sudo docker images
## Start docker with mounted directory
sudo docker run -it --entrypoint="/bin/bash" -v PC local directory:docker directory imageID, for example sudo docker run -it --entrypoint="/bin/bash" -v /mnt/data/kairui.wang/test:/mnt/test 4cbdb9d61e19
```

</TabItem>

</Tabs>
</DocScope>


#### 2 Get tros.b Source Code

All operations in this section are performed inside the development machine's docker.

Using the /mnt/test directory in docker as an example.

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```shell
cd /mnt/test/cc_ws/tros_ws
## Get configuration files
git clone https://github.com/D-Robotics/robot_dev_config.git -b foxy 
## Run cd robot_dev_config, use git tag --list to view available release versions
## Use git reset --hard [tag] to specify release version. See Build Specific tros.b Version section on this page for details
## Pull code
vcs-import src < ./robot_dev_config/ros2_release.repos 
```

</TabItem>

<TabItem value="humble" label="Humble">


```shell
cd /mnt/test/cc_ws/tros_ws
## Get configuration files
git clone https://github.com/D-Robotics/robot_dev_config.git -b develop 
## Run cd robot_dev_config, use git tag --list to view available release versions
## Use git reset --hard [tag] to specify release version. See Build Specific tros.b Version section on this page for details
## Pull code
vcs-import src < ./robot_dev_config/ros2_release.repos 
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">


```shell
cd /mnt/test/cc_ws/tros_ws
## Get configuration files
git clone https://github.com/D-Robotics/robot_dev_config.git -b jazzy 
## Run cd robot_dev_config, use git tag --list to view available release versions
## Use git reset --hard [tag] to specify release version. See Build Specific tros.b Version section on this page for details
## Pull code
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
## Get configuration files
git clone https://github.com/D-Robotics/robot_dev_config.git -b develop 
## Run cd robot_dev_config, use git tag --list to view available release versions
## Use git reset --hard [tag] to specify release version. See Build Specific tros.b Version section on this page for details
## Pull code
vcs-import src < ./robot_dev_config/ros2_release.repos 
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">


```shell
cd /mnt/test/cc_ws/tros_ws
## Get configuration files
git clone https://github.com/D-Robotics/robot_dev_config.git -b jazzy 
## Run cd robot_dev_config, use git tag --list to view available release versions
## Use git reset --hard [tag] to specify release version. See Build Specific tros.b Version section on this page for details
## Pull code
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
## Get configuration files
git clone https://github.com/D-Robotics/robot_dev_config.git -b jazzy 
## Run cd robot_dev_config, use git tag --list to view available release versions
## Use git reset --hard [tag] to specify release version. See Build Specific tros.b Version section on this page for details
## Pull code
vcs-import src < ./robot_dev_config/ros2_release.repos 
```

</TabItem>

</Tabs>
</DocScope>

The complete project directory structure is as follows

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

The `tros_ws/robot_dev_config` path contains configuration and script files needed for code pulling, building, and packaging; the `tros_ws/src` path stores the pulled code; the `sysroot_docker` path contains header files and libraries for cross-compilation dependencies, corresponding to the RDK's `/` directory. For example, the media library path in `sysroot_docker` is `sysroot_docker/usr/lib/hbmedia/`, and on RDK it is `/usr/lib/hbmedia/`.

During compilation, the `sysroot_docker` installation path is specified via the `CMAKE_SYSROOT` macro in the `robot_dev_config/aarch64_toolchainfile.cmake` build script.

:::info
For robot_dev_config tag numbers (version information), please refer to the [Release Notes](./changelog.md) section.
:::

#### 3 Cross Compilation

All operations in this section are performed inside the development machine's docker.

<DocScope products="RDK X3">

```shell
## Use build.sh to compile X3 version tros.b
bash ./robot_dev_config/build.sh -p X3
```
</DocScope>

<DocScope products="RDK X5">

```shell

## Use build.sh to compile X5 version tros.b
bash ./robot_dev_config/build.sh -p X5
```

</DocScope>

<DocScope products="RDK S100">

```shell  

## Use build.sh to compile S100 version tros.b
bash ./robot_dev_config/build.sh -p S100
```
</DocScope>

<DocScope products="RDK S600">

```shell

## Use build.sh to compile S600 version tros.b
bash ./robot_dev_config/build.sh -p S600
```
</DocScope>

After successful compilation, a message will indicate that N packages compiled successfully.

If using minimal_build.sh for minimal compilation, you can further compress the deployment package size by running ./minimal_deploy.sh -d "install_path".

### Installing tros.b

Copy the compiled install directory to RDK and rename it to tros. Here we place the deployment package in /opt/tros to be consistent with the deb installation directory.

### Build Specific tros.b Version

In step 2 **Get tros.b Source Code** of the **Building tros.b** section in this chapter, the latest tros.b source code is fetched by default. If you need to get source code for a specific release version, modify this step as follows:

```bash
## Get configuration files
git clone https://github.com/D-Robotics/robot_dev_config.git
cd robot_dev_config
## View available release versions
git tag --list
## Switch to specified version number, using tros.b 2.0.0 as an example
git reset --hard tros_2.0.0
cd ..
## Pull code
vcs-import src < ./robot_dev_config/ros2_release.repos
```

:::info
For robot_dev_config tag numbers (version information), please refer to the [Release Notes](./changelog.md) section.
:::

## X86 Platform

### System Requirements

Must be Ubuntu 20.04 64-bit system. You can also use the RDK platform cross-compilation docker image, but both compilation and running must be done inside docker.

**Note! X86 platform only supports TogetheROS.Bot version 2.0.0.**

### System Setup

#### Set Locale

Ensure the locale supports UTF-8

```shell
locale  # check for UTF-8

sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

locale  # verify settings
```

#### Add apt Sources

```shell
# First ensure Ubuntu Universe is enabled
sudo apt install software-properties-common
sudo add-apt-repository universe

sudo apt update && sudo apt install curl

# Add ROS2 official source
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Add tros.b official source
sudo curl -sSL http://archive.d-robotics.cc/keys/sunrise.gpg -o /usr/share/keyrings/sunrise.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/sunrise.gpg] http://archive.d-robotics.cc/ubuntu-rdk-sim focal main" | sudo    tee /etc/apt/sources.list.d/sunrise.list > /dev/null
```

#### Install ROS Tool Packages

```shell
sudo apt update && sudo apt install -y \
  libbullet-dev \
  python3-pip \
  python3-pytest-cov \
  ros-dev-tools
```

### Get tros.b Source Code

```shell
git config --global credential.helper store

mkdir -p ~/cc_ws/tros_ws/src
cd ~/cc_ws/tros_ws/

git clone https://github.com/D-Robotics/robot_dev_config.git -b develop 
vcs-import src < ./robot_dev_config/ros2_release.repos
```

### Install Dependencies

Install packages required for source code compilation

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

### Build

```shell
# Use build.sh to compile
bash ./robot_dev_config/build.sh -p X86
```

After successful compilation, a message will indicate that N packages compiled successfully.

### Installing tros.b

Copy the compiled install directory to /opt and rename it to tros, consistent with the deb installation directory.

## FAQ

Q1: How to determine if VCS successfully pulled code

A1: As shown below, a `.` printed during vcs import indicates successful repo pull. If `E` is printed, that repo pull failed. You can see the specific failed repo in the log after execution. In this case, try deleting the contents in src and re-running vcs import, or manually pull the failed repo.

![vcs_import](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/01_quick_start/image/cross_compile/vcs_import_error.png)

Q2: Unable to pull code from GitHub due to restrictions

A2: You can directly download the required version code from the [TogetheROS File Server](http://archive.d-robotics.cc/TogetheROS/source_code/). For example, the file `tros_2.0.0_source_code.tar.gz` corresponds to tros.b version 2.0.0.
