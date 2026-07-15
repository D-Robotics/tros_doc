---
sidebar_position: 1
---

# 5.5 使用 “zero-copy”

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 功能背景

通信是机器人开发引擎的基础功能，原生 ROS2 Foxy 进行大数据量通信时存在时延较大、系统负载较高等问题。TogetheROS.Bot Foxy 基于 RDK 系统软件库 hbmem 实现了 “zero-copy” 功能，数据跨进程传输零拷贝，可大大减少大块数据传输延时和系统资源占用。本节介绍如何使用 tros.b Foxy/Humble/Jazzy 创建 publisher 和 subscriber node 进行大块数据传输，并计算传输延时。

:::info
- tros.b Foxy 版本基于 ROS2 Foxy 新增了 “zero-copy” 功能。
- tros.b Humble 以及之后的版本使用的是 ROS2 的 “zero-copy” 功能，具体使用方法请参考 ROS2 官方[文档](https://docs.ros.org/en/humble/Tutorials/Advanced/FastDDS-Configuration.html#)和[代码](https://github.com/ros2/demos/blob/humble/demo_nodes_cpp/src/topics/talker_loaned_message.cpp)。
- tros.b Humble 之后的版本使用方式和 Humble 版本一致，参考本章节的 Humble 版本示例。
:::

## 前置条件

已按照[apt 安装与升级](../01_quick_start/install_tros.md)成功安装 tros.b，并已掌握 ROS2 node，topic，qos 等基础知识，以及如何创建 package 和使用自定义消息，具体教程可见 ROS2 官方教程[Creating a package](https://docs.ros.org/en/foxy/Tutorials/Beginner-Client-Libraries/Creating-Your-First-ROS2-Package.html)。

ROS2 软件包构建、编译等工具。安装命令：`sudo apt install ros-dev-tools`

## 任务内容

### 1. 创建 package

打开一个新的终端，source tros.b setup 脚本，确保`ros2`命令可以运行。

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
# 配置tros.b环境
source /opt/tros/setup.bash
```

使用以下命令创建一个 workspace，详细介绍可见 ROS2 官方教程[Creating a workspace](https://docs.ros.org/en/foxy/Tutorials/Workspace/Creating-A-Workspace.html)。

</TabItem>

<TabItem value="humble" label="Humble">

```bash
# 配置tros.b环境
source /opt/tros/humble/setup.bash
```

使用以下命令创建一个 workspace，详细介绍可见 ROS2 官方教程[Creating a workspace](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html)。

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
# 配置tros.b环境
source /opt/tros/jazzy/setup.bash
```

使用以下命令创建一个 workspace，详细介绍可见 ROS2 官方教程[Creating a workspace](https://docs.ros.org/en/jazzy/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html)。

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

使用以下命令创建一个 workspace，详细介绍可见 ROS2 官方教程[Creating a workspace](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html)。

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
# 配置tros.b环境
source /opt/tros/jazzy/setup.bash
```

使用以下命令创建一个 workspace，详细介绍可见 ROS2 官方教程[Creating a workspace](https://docs.ros.org/en/jazzy/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html)。

</TabItem>
</Tabs>
</DocScope>




```shell
mkdir -p ~/dev_ws/src
cd ~/dev_ws/src
```

运行以下命令创建一个 package

```shell
ros2 pkg create --build-type ament_cmake hbmem_pubsub
```

### 2. 创建自定义消息

#### 2.1 新建消息文件

运行以下命令，创建`msg`目录用来存放自定义消息文件

```shell
cd ~/dev_ws/src/hbmem_pubsub
mkdir msg
```

在`msg`目录下新建`SampleMessage.msg`文件，具体内容如下:

```idl
int32 index
uint64 time_stamp
uint8[4194304] data

uint32 MAX_SIZE=4194304
```

#### 2.2 编译依赖

返回到`~/dev_ws/src/hbmem_pubsub`目录，修改`package.xml`，在`<buildtool_depend>ament_cmake</buildtool_depend>`下面添加以下内容：

```xml
<build_depend>rosidl_default_generators</build_depend>
<exec_depend>rosidl_default_runtime</exec_depend>
<member_of_group>rosidl_interface_packages</member_of_group>
```

#### 2.3 编译脚本

修改`CMakeLists.txt`，在`# find_package(<dependency> REQUIRED)`下面添加以下内容，进行 msg 编译:

```cmake
find_package(rosidl_default_generators REQUIRED)
rosidl_generate_interfaces(${PROJECT_NAME}
  "msg/SampleMessage.msg"
)
```

### 3. 创建消息发布节点

#### 3.1 新建消息发布节点文件

在`~/dev_ws/src/hbmem_pubsub/src`目录下新建` publisher_hbmem.cpp`文件，用来创建 publisher node，具体代码和解释如下：

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```c++
#include <chrono>
#include <functional>
#include <memory>
#include <string>

#include "rclcpp/rclcpp.hpp"
#include "hbmem_pubsub/msg/sample_message.hpp"

using namespace std::chrono_literals;

class MinimalHbmemPublisher  : public rclcpp::Node {
 public:
  MinimalHbmemPublisher () : Node("minimal_hbmem_publisher"), count_(0) {
    // 创建publisher_hbmem，topic为"topic"
    publisher_ = this->create_publisher_hbmem<hbmem_pubsub::msg::SampleMessage>(
        "topic", rclcpp::SensorDataQoS());

    // 定时器，每隔40毫秒调用一次timer_callback进行消息发送
    timer_ = this->create_wall_timer(
        40ms, std::bind(&MinimalHbmemPublisher ::timer_callback, this));
  }

 private:
  // 定时器回调函数
  void timer_callback() {
    // 获取要发送的消息
    auto loanedMsg = publisher_->borrow_loaned_message();
    // 判断消息是否可用，可能出现获取消息失败导致消息不可用的情况
    if (loanedMsg.is_valid()) {
      // 引用方式获取实际的消息
      auto& msg = loanedMsg.get();
      
      // 获取当前时间，单位为us
      auto time_now =
          std::chrono::duration_cast<std::chrono::microseconds>(
              std::chrono::steady_clock::now().time_since_epoch()).count();
      
      // 对消息的index和time_stamp进行赋值
      msg.index = count_;
      msg.time_stamp = time_now;
      
      // 打印发送消息
      RCLCPP_INFO(this->get_logger(), "message: %d", msg.index);
      publisher_->publish(std::move(loanedMsg));
      // 注意，发送后，loanedMsg已不可用
      // 计数器加一
      count_++;
    } else {
      // 获取消息失败，丢弃该消息
      RCLCPP_INFO(this->get_logger(), "Failed to get LoanMessage!");
    }
  }
  
  // 定时器
  rclcpp::TimerBase::SharedPtr timer_;

  // hbmem publisher
  rclcpp::PublisherHbmem<hbmem_pubsub::msg::SampleMessage>::SharedPtr publisher_;
  
  // 计数器
  size_t count_;
};

int main(int argc, char * argv[])
{
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<MinimalHbmemPublisher>());
  rclcpp::shutdown();
  return 0;
}
```

</TabItem>

<TabItem value="humble" label="Humble/Jazzy">

```c++
#include <chrono>
#include <functional>
#include <memory>
#include <string>

#include "rclcpp/rclcpp.hpp"
#include "hbmem_pubsub/msg/sample_message.hpp"

using namespace std::chrono_literals;

class MinimalHbmemPublisher  : public rclcpp::Node {
 public:
  MinimalHbmemPublisher () : Node("minimal_hbmem_publisher"), count_(0) {
    // 创建publisher_hbmem，topic为"topic"
    publisher_ = this->create_publisher<hbmem_pubsub::msg::SampleMessage>(
        "topic", rclcpp::SensorDataQoS());

    // 定时器，每隔40毫秒调用一次timer_callback进行消息发送
    timer_ = this->create_wall_timer(
        40ms, std::bind(&MinimalHbmemPublisher ::timer_callback, this));
  }

 private:
  // 定时器回调函数
  void timer_callback() {
    // 获取要发送的消息
    auto loanedMsg = publisher_->borrow_loaned_message();
    // 判断消息是否可用，可能出现获取消息失败导致消息不可用的情况
    if (loanedMsg.is_valid()) {
      // 引用方式获取实际的消息
      auto& msg = loanedMsg.get();
      
      // 获取当前时间，单位为us
      auto time_now =
          std::chrono::duration_cast<std::chrono::microseconds>(
              std::chrono::steady_clock::now().time_since_epoch()).count();
      
      // 对消息的index和time_stamp进行赋值
      msg.index = count_;
      msg.time_stamp = time_now;
      
      // 打印发送消息
      RCLCPP_INFO(this->get_logger(), "message: %d", msg.index);
      publisher_->publish(std::move(loanedMsg));
      // 注意，发送后，loanedMsg已不可用
      // 计数器加一
      count_++;
    } else {
      // 获取消息失败，丢弃该消息
      RCLCPP_INFO(this->get_logger(), "Failed to get LoanMessage!");
    }
  }
  
  // 定时器
  rclcpp::TimerBase::SharedPtr timer_;

  // hbmem publisher
  rclcpp::Publisher<hbmem_pubsub::msg::SampleMessage>::SharedPtr publisher_;
  
  // 计数器
  size_t count_;
};

int main(int argc, char * argv[])
{
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<MinimalHbmemPublisher>());
  rclcpp::shutdown();
  return 0;
}
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble/Jazzy">

```c++
#include <chrono>
#include <functional>
#include <memory>
#include <string>

#include "rclcpp/rclcpp.hpp"
#include "hbmem_pubsub/msg/sample_message.hpp"

using namespace std::chrono_literals;

class MinimalHbmemPublisher  : public rclcpp::Node {
 public:
  MinimalHbmemPublisher () : Node("minimal_hbmem_publisher"), count_(0) {
    // 创建publisher_hbmem，topic为"topic"
    publisher_ = this->create_publisher<hbmem_pubsub::msg::SampleMessage>(
        "topic", rclcpp::SensorDataQoS());

    // 定时器，每隔40毫秒调用一次timer_callback进行消息发送
    timer_ = this->create_wall_timer(
        40ms, std::bind(&MinimalHbmemPublisher ::timer_callback, this));
  }

 private:
  // 定时器回调函数
  void timer_callback() {
    // 获取要发送的消息
    auto loanedMsg = publisher_->borrow_loaned_message();
    // 判断消息是否可用，可能出现获取消息失败导致消息不可用的情况
    if (loanedMsg.is_valid()) {
      // 引用方式获取实际的消息
      auto& msg = loanedMsg.get();
      
      // 获取当前时间，单位为us
      auto time_now =
          std::chrono::duration_cast<std::chrono::microseconds>(
              std::chrono::steady_clock::now().time_since_epoch()).count();
      
      // 对消息的index和time_stamp进行赋值
      msg.index = count_;
      msg.time_stamp = time_now;
      
      // 打印发送消息
      RCLCPP_INFO(this->get_logger(), "message: %d", msg.index);
      publisher_->publish(std::move(loanedMsg));
      // 注意，发送后，loanedMsg已不可用
      // 计数器加一
      count_++;
    } else {
      // 获取消息失败，丢弃该消息
      RCLCPP_INFO(this->get_logger(), "Failed to get LoanMessage!");
    }
  }
  
  // 定时器
  rclcpp::TimerBase::SharedPtr timer_;

  // hbmem publisher
  rclcpp::Publisher<hbmem_pubsub::msg::SampleMessage>::SharedPtr publisher_;
  
  // 计数器
  size_t count_;
};

int main(int argc, char * argv[])
{
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<MinimalHbmemPublisher>());
  rclcpp::shutdown();
  return 0;
}
```

</TabItem>

</Tabs>
</DocScope>

#### 3.2 编译依赖

返回到`~/dev_ws/src/hbmem_pubsub`目录，修改`package.xml`，在`<member_of_group>rosidl_interface_packages</member_of_group>`  下面增加`rclcpp`依赖：

```xml
  <depend>rclcpp</depend>
```

#### 3.3 编译脚本

修改`CMakeLists.txt`，在`rosidl_generate_interfaces`语句下面添加以下内容，完成 publisher 编译：

```cmake
find_package(rclcpp REQUIRED)

add_executable(talker src/publisher_hbmem.cpp)
ament_target_dependencies(talker rclcpp)
rosidl_target_interfaces(talker
  ${PROJECT_NAME} "rosidl_typesupport_cpp")

install(TARGETS
  talker
  DESTINATION lib/${PROJECT_NAME})
```

### 4. 创建消息接收节点

#### 4.1 新建消息接收节点文件

在`~/dev_ws/src/hbmem_pubsub/src`目录下新建`  subscriber_hbmem.cpp`文件，用来创建 subscriber node，具体代码和解释如下：

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```c++
#include <memory>

#include "rclcpp/rclcpp.hpp"
#include "hbmem_pubsub/msg/sample_message.hpp"

class MinimalHbmemSubscriber  : public rclcpp::Node {
 public:
  MinimalHbmemSubscriber () : Node("minimal_hbmem_subscriber") {
    // 创建subscription_hbmem，topic为"sample"
    // 消息回调函数为topic_callback
    subscription_ =
        this->create_subscription_hbmem<hbmem_pubsub::msg::SampleMessage>(
            "topic", rclcpp::SensorDataQoS(),
            std::bind(&MinimalHbmemSubscriber ::topic_callback, this,
                      std::placeholders::_1));
  }

 private:
  // 消息回调函数
  void topic_callback(
      const hbmem_pubsub::msg::SampleMessage::SharedPtr msg) const {
    // 注意，msg只能在回调函数中使用，回调函数返回后，该消息就会被释放
    // 获取当前时间
    auto time_now =
        std::chrono::duration_cast<std::chrono::microseconds>(
            std::chrono::steady_clock::now().time_since_epoch())
            .count();
    // 计算延时并打印出来
    RCLCPP_INFO(this->get_logger(), "msg %d, time cost %dus", msg->index,
                time_now - msg->time_stamp);
  }
  
  // hbmem subscription
  rclcpp::SubscriptionHbmem<hbmem_pubsub::msg::SampleMessage>::SharedPtr
      subscription_;
};


int main(int argc, char * argv[])
{
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<MinimalHbmemSubscriber>());
  rclcpp::shutdown();
  return 0;
}
```

</TabItem>

<TabItem value="humble" label="Humble/Jazzy">

```c++
#include <memory>

#include "rclcpp/rclcpp.hpp"
#include "hbmem_pubsub/msg/sample_message.hpp"

class MinimalHbmemSubscriber  : public rclcpp::Node {
 public:
  MinimalHbmemSubscriber () : Node("minimal_hbmem_subscriber") {
    // 创建subscription_hbmem，topic为"sample"
    // 消息回调函数为topic_callback
    subscription_ =
        this->create_subscription<hbmem_pubsub::msg::SampleMessage>(
            "topic", rclcpp::SensorDataQoS(),
            std::bind(&MinimalHbmemSubscriber ::topic_callback, this,
                      std::placeholders::_1));
  }

 private:
  // 消息回调函数
  void topic_callback(
      const hbmem_pubsub::msg::SampleMessage::SharedPtr msg) const {
    // 注意，msg只能在回调函数中使用，回调函数返回后，该消息就会被释放
    // 获取当前时间
    auto time_now =
        std::chrono::duration_cast<std::chrono::microseconds>(
            std::chrono::steady_clock::now().time_since_epoch())
            .count();
    // 计算延时并打印出来
    RCLCPP_INFO(this->get_logger(), "msg %d, time cost %dus", msg->index,
                time_now - msg->time_stamp);
  }
  
  // hbmem subscription
  rclcpp::Subscription<hbmem_pubsub::msg::SampleMessage>::SharedPtr
      subscription_;
};


int main(int argc, char * argv[])
{
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<MinimalHbmemSubscriber>());
  rclcpp::shutdown();
  return 0;
}
```

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble/Jazzy">

```c++
#include <memory>

#include "rclcpp/rclcpp.hpp"
#include "hbmem_pubsub/msg/sample_message.hpp"

class MinimalHbmemSubscriber  : public rclcpp::Node {
 public:
  MinimalHbmemSubscriber () : Node("minimal_hbmem_subscriber") {
    // 创建subscription_hbmem，topic为"sample"
    // 消息回调函数为topic_callback
    subscription_ =
        this->create_subscription<hbmem_pubsub::msg::SampleMessage>(
            "topic", rclcpp::SensorDataQoS(),
            std::bind(&MinimalHbmemSubscriber ::topic_callback, this,
                      std::placeholders::_1));
  }

 private:
  // 消息回调函数
  void topic_callback(
      const hbmem_pubsub::msg::SampleMessage::SharedPtr msg) const {
    // 注意，msg只能在回调函数中使用，回调函数返回后，该消息就会被释放
    // 获取当前时间
    auto time_now =
        std::chrono::duration_cast<std::chrono::microseconds>(
            std::chrono::steady_clock::now().time_since_epoch())
            .count();
    // 计算延时并打印出来
    RCLCPP_INFO(this->get_logger(), "msg %d, time cost %dus", msg->index,
                time_now - msg->time_stamp);
  }
  
  // hbmem subscription
  rclcpp::Subscription<hbmem_pubsub::msg::SampleMessage>::SharedPtr
      subscription_;
};


int main(int argc, char * argv[])
{
  rclcpp::init(argc, argv);
  rclcpp::spin(std::make_shared<MinimalHbmemSubscriber>());
  rclcpp::shutdown();
  return 0;
}
```

</TabItem>

</Tabs>
</DocScope>

#### 4.2 编译脚本

返回到`~/dev_ws/src/hbmem_pubsub`目录，之前已经在`package.xml`中增加`rclcpp`依赖，故不需要需改`package.xml`。

修改`CMakeLists.txt`，在`install`语句下面添加以下内容，完成 subscriber 编译：

```cmake
add_executable(listener src/subscriber_hbmem.cpp)
ament_target_dependencies(listener rclcpp)
rosidl_target_interfaces(listener
  ${PROJECT_NAME} "rosidl_typesupport_cpp")

install(TARGETS
  listener
  DESTINATION lib/${PROJECT_NAME})
```

### 5. 编译

整个 workspace 目录结构如下：

```shell
dev_ws/
└── src
    └── hbmem_pubsub
        ├── CMakeLists.txt
        ├── include
        │   └── hbmem_pubsub
        ├── msg
        │   └── SampleMessage.msg
        ├── package.xml
        └── src
            ├── publisher_hbmem.cpp
            └── subscriber_hbmem.cpp
```

完整的`package.xml`内容如下：

```xml
<?xml version="1.0"?>
<?xml-model href="http://download.ros.org/schema/package_format3.xsd" schematypens="http://www.w3.org/2001/XMLSchema"?>
<package format="3">
  <name>hbmem_pubsub</name>
  <version>0.0.0</version>
  <description>TODO: Package description</description>
  <maintainer email="root@todo.todo">root</maintainer>
  <license>TODO: License declaration</license>

  <buildtool_depend>ament_cmake</buildtool_depend>

  <build_depend>rosidl_default_generators</build_depend>
  <exec_depend>rosidl_default_runtime</exec_depend>
  <member_of_group>rosidl_interface_packages</member_of_group>

  <depend>rclcpp</depend>

  <test_depend>ament_lint_auto</test_depend>
  <test_depend>ament_lint_common</test_depend>

  <export>
    <build_type>ament_cmake</build_type>
  </export>
</package>

```

完整的`CMakeLists.txt`内容如下：

```cmake
cmake_minimum_required(VERSION 3.5)
project(hbmem_pubsub)

# Default to C99
if(NOT CMAKE_C_STANDARD)
  set(CMAKE_C_STANDARD 99)
endif()

# Default to C++14
if(NOT CMAKE_CXX_STANDARD)
  set(CMAKE_CXX_STANDARD 14)
endif()

if(CMAKE_COMPILER_IS_GNUCXX OR CMAKE_CXX_COMPILER_ID MATCHES "Clang")
  add_compile_options(-Wall -Wextra -Wpedantic)
endif()

# find dependencies
find_package(ament_cmake REQUIRED)
# uncomment the following section in order to fill in
# further dependencies manually.
# find_package(<dependency> REQUIRED)
find_package(rosidl_default_generators REQUIRED)

rosidl_generate_interfaces(${PROJECT_NAME}
  "msg/SampleMessage.msg"
)

find_package(rclcpp REQUIRED)

add_executable(talker src/publisher_hbmem.cpp)
ament_target_dependencies(talker rclcpp)
rosidl_target_interfaces(talker
  ${PROJECT_NAME} "rosidl_typesupport_cpp")

install(TARGETS
  talker
  DESTINATION lib/${PROJECT_NAME})

add_executable(listener src/subscriber_hbmem.cpp)
ament_target_dependencies(listener rclcpp)
rosidl_target_interfaces(listener
  ${PROJECT_NAME} "rosidl_typesupport_cpp")

install(TARGETS
  listener
  DESTINATION lib/${PROJECT_NAME})

if(BUILD_TESTING)
  find_package(ament_lint_auto REQUIRED)
  # the following line skips the linter which checks for copyrights
  # uncomment the line when a copyright and license is not present in all source files
  #set(ament_cmake_copyright_FOUND TRUE)
  # the following line skips cpplint (only works in a git repo)
  # uncomment the line when this package is not in a git repo
  #set(ament_cmake_cpplint_FOUND TRUE)
  ament_lint_auto_find_test_dependencies()
endif()

ament_package()

```

在 workspace 根目录`~/dev_ws`，编译 package:

```shell
colcon build --packages-select hbmem_pubsub
```

若提示`colcon`命令未安装，使用以下命令安装即可：

```shell
sudo apt install ros-dev-tools
```

### 6. 运行

打开一个新的终端，`cd`到`dev_ws`目录，source tros.b 和当前 workspace setup 文件：

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
source /opt/tros/setup.bash
cd ~/dev_ws
. install/setup.bash
# 运行talker node:
ros2 run hbmem_pubsub talker
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
source /opt/tros/humble/setup.bash
cd ~/dev_ws
. install/setup.bash
export RMW_IMPLEMENTATION=rmw_fastrtps_cpp
export FASTRTPS_DEFAULT_PROFILES_FILE=/opt/tros/humble/lib/hobot_shm/config/shm_fastdds.xml
export RMW_FASTRTPS_USE_QOS_FROM_XML=1
export ROS_DISABLE_LOANED_MESSAGES=0
# 运行talker node:
ros2 run hbmem_pubsub talker
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
source /opt/tros/jazzy/setup.bash
cd ~/dev_ws
. install/setup.bash
export RMW_IMPLEMENTATION=rmw_fastrtps_cpp
export FASTRTPS_DEFAULT_PROFILES_FILE=/opt/tros/jazzy/lib/hobot_shm/config/shm_fastdds.xml
export RMW_FASTRTPS_USE_QOS_FROM_XML=1
export ROS_DISABLE_LOANED_MESSAGES=0
# 运行talker node:
ros2 run hbmem_pubsub talker
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
source /opt/tros/humble/setup.bash
cd ~/dev_ws
. install/setup.bash
export RMW_IMPLEMENTATION=rmw_fastrtps_cpp
export FASTRTPS_DEFAULT_PROFILES_FILE=/opt/tros/humble/lib/hobot_shm/config/shm_fastdds.xml
export RMW_FASTRTPS_USE_QOS_FROM_XML=1
export ROS_DISABLE_LOANED_MESSAGES=0
# 运行talker node:
ros2 run hbmem_pubsub talker
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
source /opt/tros/jazzy/setup.bash
cd ~/dev_ws
. install/setup.bash
export RMW_IMPLEMENTATION=rmw_fastrtps_cpp
export FASTRTPS_DEFAULT_PROFILES_FILE=/opt/tros/jazzy/lib/hobot_shm/config/shm_fastdds.xml
export RMW_FASTRTPS_USE_QOS_FROM_XML=1
export ROS_DISABLE_LOANED_MESSAGES=0
# 运行talker node:
ros2 run hbmem_pubsub talker
```

</TabItem>
</Tabs>
</DocScope>


终端上会出现如下打印：

```text
[INFO] [1649227473.431381673] [minimal_hbmem_publisher]: message: 0
[INFO] [1649227473.470746697] [minimal_hbmem_publisher]: message: 1
[INFO] [1649227473.510923361] [minimal_hbmem_publisher]: message: 2
[INFO] [1649227473.550886783] [minimal_hbmem_publisher]: message: 3
[INFO] [1649227473.590664377] [minimal_hbmem_publisher]: message: 4
[INFO] [1649227473.630857041] [minimal_hbmem_publisher]: message: 5
```

再打开一个新的终端，同样`cd`到`dev_ws`目录，然后 souce setup 文件，之后运行 listener node:

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
source /opt/tros/setup.bash
cd ~/dev_ws
. install/setup.bash

ros2 run hbmem_pubsub listener
```

</TabItem>

<TabItem value="humble" label="Humble">

```bash
source /opt/tros/humble/setup.bash
cd ~/dev_ws
. install/setup.bash
export RMW_IMPLEMENTATION=rmw_fastrtps_cpp
export FASTRTPS_DEFAULT_PROFILES_FILE=/opt/tros/humble/lib/hobot_shm/config/shm_fastdds.xml
export RMW_FASTRTPS_USE_QOS_FROM_XML=1
export ROS_DISABLE_LOANED_MESSAGES=0
ros2 run hbmem_pubsub listener
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
source /opt/tros/jazzy/setup.bash
cd ~/dev_ws
. install/setup.bash
export RMW_IMPLEMENTATION=rmw_fastrtps_cpp
export FASTRTPS_DEFAULT_PROFILES_FILE=/opt/tros/jazzy/lib/hobot_shm/config/shm_fastdds.xml
export RMW_FASTRTPS_USE_QOS_FROM_XML=1
export ROS_DISABLE_LOANED_MESSAGES=0
ros2 run hbmem_pubsub listener
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
source /opt/tros/humble/setup.bash
cd ~/dev_ws
. install/setup.bash
export RMW_IMPLEMENTATION=rmw_fastrtps_cpp
export FASTRTPS_DEFAULT_PROFILES_FILE=/opt/tros/humble/lib/hobot_shm/config/shm_fastdds.xml
export RMW_FASTRTPS_USE_QOS_FROM_XML=1
export ROS_DISABLE_LOANED_MESSAGES=0
ros2 run hbmem_pubsub listener
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
source /opt/tros/jazzy/setup.bash
cd ~/dev_ws
. install/setup.bash
export RMW_IMPLEMENTATION=rmw_fastrtps_cpp
export FASTRTPS_DEFAULT_PROFILES_FILE=/opt/tros/jazzy/lib/hobot_shm/config/shm_fastdds.xml
export RMW_FASTRTPS_USE_QOS_FROM_XML=1
export ROS_DISABLE_LOANED_MESSAGES=0
ros2 run hbmem_pubsub listener
```

</TabItem>
</Tabs>
</DocScope>

终端上会有如下打印，表明 subscriber 已成功接收到 publisher 发送的消息：

```text
[INFO] [1649227450.387089523] [minimal_hbmem_subscriber]: msg 10, time cost 1663us
[INFO] [1649227450.427071280] [minimal_hbmem_subscriber]: msg 11, time cost 1713us
[INFO] [1649227450.466993413] [minimal_hbmem_subscriber]: msg 12, time cost 1622us
[INFO] [1649227450.507029960] [minimal_hbmem_subscriber]: msg 13, time cost 1666us
[INFO] [1649227450.546146910] [minimal_hbmem_subscriber]: msg 14, time cost 998us
[INFO] [1649227450.587002681] [minimal_hbmem_subscriber]: msg 15, time cost 1768us
```

使用`Ctrl+C`可结束每个 Node 的运行。

## 本节总结

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

如果你已经掌握 ROS2 的 publisher 和 subscriber 使用方式，那么很容易切换到使用基于 hbmem 零拷贝的 publisher 和 subscriber，使用时只需要做以下改动：

- **rclcpp::Publisher** 改为 **rclcpp::PublisherHbmem**
- **create_publisher** 改为 **create_publisher_hbmem**
- **rclcpp::Subscription** 改为 **rclcpp::SubscriptionHbmem**
- **create_subscription** 改为 **create_subscription_hbmem**
- **publisher**发送消息前要先调用**borrow_loaned_message**获取消息，然后**确认消息是否可用**，若可用，再进行赋值，发送
- **subscription**在回调函数中处理接收到的消息，且**接收到的消息只能在回调函数中使用**，回调函数执行完，该消息就会释放

注意：

- 使用基于 hbmem 的零拷贝会占用 ion 内存，若创建多个较大消息的 publisher，可能出现 ion 内存不够用，导致创建失败问题。

- 创建 publisher 时会一次性申请 KEEPLAST 的三倍个消息大小的 ion 内存（最大为 256MB），用于消息的传输，之后不会再动态申请。若 subscriber 端消息处理出错或者未及时处理，则会出现消息 buffer 都被占用，publisher 一直获取不到可用消息的情况。

</TabItem>

<TabItem value="humble" label="Humble/Jazzy">

</TabItem>

</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble/Jazzy">

</TabItem>

</Tabs>
</DocScope>

## 使用限制

和 ROS2 的 publisher/subscriber 数据传输方式相比，使用零拷贝传输存在以下限制：

- QOS History 只支持 KEEPLAST，不支持 KEEPALL，且 KEEPLAST 不能设置太大，有内存限制，目前设置为最大占用 256M 内存
- 传输的消息大小是固定的，即消息的`sizeof`值是不变的，不能包含可变长度类型数据，例如：string，动态数组
- 对于 TROS Humble 以及之后版本，推荐 QOS Reliability 使用 RMW_QOS_POLICY_RELIABILITY_BEST_EFFORT（建议直接使用 rclcpp::SensorDataQoS()设置 QOS），RMW_QOS_POLICY_RELIABILITY_RELIABLE 在多种通信方式下存在稳定性问题。
- 只能用于同一设备进程间通信，不可跨设备传输
- publisher 消息要先获取再赋值发送，且要判断是否获取成功
- subscriber 收到的消息有效期仅限回调函数中，不能在回调函数之外使用