---
sidebar_position: 1
---

# 5.5 Using "Zero-Copy"

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Functional Background

Communication is a fundamental function of robot development engines. The native ROS2 Foxy has issues with high latency and high system load when handling large-volume data communication. TogetheROS.Bot Foxy implements the "zero-copy" feature based on the RDK system software library `hbmem` , enabling zero-copy data transfer across processes, significantly reducing large data transfer latency and system resource usage. This section describes how to use tros.b Foxy/Humble/Jazzy to create publisher and subscriber nodes for large data transfer and calculate the transfer latency.

:::info
- The tros.b Foxy version adds the "zero-copy" feature to ROS2 Foxy.
- tros.b Humble and subsequent versions use ROS2's "zero-copy" feature. For specific usage, refer to the official ROS2 [documentation](https://docs.ros.org/en/humble/Tutorials/Advanced/FastDDS-Configuration.html#) and [code](https://github.com/ros2/demos/blob/humble/demo_nodes_cpp/src/topics/talker_loaned_message.cpp).
- The usage for versions after tros.b Humble is the same as the Humble version; refer to the Humble version example in this section.
:::

## Prerequisites

tros.b has been successfully installed following [apt Installation and Upgrade](../01_quick_start/install_tros.md). Basic knowledge of ROS2 nodes, topics, QoS, how to create packages, and use custom messages is required. For specific tutorials, see the official ROS2 tutorials [Creating a package](https://docs.ros.org/en/foxy/Tutorials/Beginner-Client-Libraries/Creating-Your-First-ROS2-Package.html).

ROS2 software package building and compiling tools, etc. Installation command: `sudo apt install ros-dev-tools`

## Task Content

### 1. Create a package

Open a new terminal, source the tros.b setup script, and ensure the `ros2` command can run.

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
# Configure tros.b environment
source /opt/tros/setup.bash
```

Use the following command to create a workspace. For details, see the official ROS2 tutorial [Creating a workspace](https://docs.ros.org/en/foxy/Tutorials/Workspace/Creating-A-Workspace.html).

</TabItem>

<TabItem value="humble" label="Humble">

```bash
# Configure tros.b environment
source /opt/tros/humble/setup.bash
```

Use the following command to create a workspace. For details, see the official ROS2 tutorial [Creating a workspace](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html).

</TabItem>

<TabItem value="jazzy" label="Jazzy">

```bash
# Configure tros.b environment
source /opt/tros/jazzy/setup.bash
```

Use the following command to create a workspace. For details, see the official ROS2 tutorial [Creating a workspace](https://docs.ros.org/en/jazzy/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html).

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```bash
# Configure tros.b environment
source /opt/tros/humble/setup.bash
```

Use the following command to create a workspace. For details, see the official ROS2 tutorial [Creating a workspace](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html).

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

```bash
# Configure tros.b environment
source /opt/tros/jazzy/setup.bash
```

Use the following command to create a workspace. For details, see the official ROS2 tutorial [Creating a workspace](https://docs.ros.org/en/jazzy/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html).

</TabItem>
</Tabs>
</DocScope>

```shell
mkdir -p ~/dev_ws/src
cd ~/dev_ws/src
```

Run the following command to create a package

```shell
ros2 pkg create --build-type ament_cmake hbmem_pubsub
```

### 2. Create a custom message

#### 2.1 Create a new message file

Run the following command to create a `msg` directory to store custom message files

```shell
cd ~/dev_ws/src/hbmem_pubsub
mkdir msg
```

Create a new `SampleMessage.msg` file in the `msg` directory with the following content:

```idl
int32 index
uint64 time_stamp
uint8[4194304] data

uint32 MAX_SIZE=4194304
```

#### 2.2 Build dependencies

Return to the `~/dev_ws/src/hbmem_pubsub` directory, modify `package.xml` , and add the following content below `<buildtool_depend>ament_cmake</buildtool_depend>` :

```xml
<build_depend>rosidl_default_generators</build_depend>
<exec_depend>rosidl_default_runtime</exec_depend>
<member_of_group>rosidl_interface_packages</member_of_group>
```

#### 2.3 Build script

Modify `CMakeLists.txt` , add the following content below `# find_package(<dependency> REQUIRED)` to compile the msg:

```cmake
find_package(rosidl_default_generators REQUIRED)
rosidl_generate_interfaces(${PROJECT_NAME}
  "msg/SampleMessage.msg"
)
```

### 3. Create a message publishing node

#### 3.1 Create a new message publishing node file

Create a new `publisher_hbmem.cpp` file in the `~/dev_ws/src/hbmem_pubsub/src` directory to create a publisher node. The specific code and explanation are as follows:

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
    // Create publisher_hbmem with topic "topic"
    publisher_ = this->create_publisher_hbmem<hbmem_pubsub::msg::SampleMessage>(
        "topic", rclcpp::SensorDataQoS());

    // Timer, calls timer_callback every 40 milliseconds to send messages
    timer_ = this->create_wall_timer(
        40ms, std::bind(&MinimalHbmemPublisher ::timer_callback, this));
  }

 private:
  // Timer callback function
  void timer_callback() {
    // Get the message to send
    auto loanedMsg = publisher_->borrow_loaned_message();
    // Check if the message is available; it may be unavailable if acquisition fails
    if (loanedMsg.is_valid()) {
      // Get the actual message by reference
      auto& msg = loanedMsg.get();
      
      // Get the current time in microseconds
      auto time_now =
          std::chrono::duration_cast<std::chrono::microseconds>(
              std::chrono::steady_clock::now().time_since_epoch()).count();
      
      // Assign values to the message's index and time_stamp
      msg.index = count_;
      msg.time_stamp = time_now;
      
      // Print the sent message
      RCLCPP_INFO(this->get_logger(), "message: %d", msg.index);
      publisher_->publish(std::move(loanedMsg));
      // Note: after sending, loanedMsg is no longer available
      // Increment the counter
      count_++;
    } else {
      // Failed to get the message, discard it
      RCLCPP_INFO(this->get_logger(), "Failed to get LoanMessage!");
    }
  }
  
  // Timer
  rclcpp::TimerBase::SharedPtr timer_;

  // hbmem publisher
  rclcpp::PublisherHbmem<hbmem_pubsub::msg::SampleMessage>::SharedPtr publisher_;
  
  // Counter
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
    // Create publisher_hbmem with topic "topic"
    publisher_ = this->create_publisher<hbmem_pubsub::msg::SampleMessage>(
        "topic", rclcpp::SensorDataQoS());

    // Timer, calls timer_callback every 40 milliseconds to send messages
    timer_ = this->create_wall_timer(
        40ms, std::bind(&MinimalHbmemPublisher ::timer_callback, this));
  }

 private:
  // Timer callback function
  void timer_callback() {
    // Get the message to send
    auto loanedMsg = publisher_->borrow_loaned_message();
    // Check if the message is available; it may be unavailable if acquisition fails
    if (loanedMsg.is_valid()) {
      // Get the actual message by reference
      auto& msg = loanedMsg.get();
      
      // Get the current time in microseconds
      auto time_now =
          std::chrono::duration_cast<std::chrono::microseconds>(
              std::chrono::steady_clock::now().time_since_epoch()).count();
      
      // Assign values to the message's index and time_stamp
      msg.index = count_;
      msg.time_stamp = time_now;
      
      // Print the sent message
      RCLCPP_INFO(this->get_logger(), "message: %d", msg.index);
      publisher_->publish(std::move(loanedMsg));
      // Note: after sending, loanedMsg is no longer available
      // Increment the counter
      count_++;
    } else {
      // Failed to get the message, discard it
      RCLCPP_INFO(this->get_logger(), "Failed to get LoanMessage!");
    }
  }
  
  // Timer
  rclcpp::TimerBase::SharedPtr timer_;

  // hbmem publisher
  rclcpp::Publisher<hbmem_pubsub::msg::SampleMessage>::SharedPtr publisher_;
  
  // Counter
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
    // Create publisher_hbmem with topic "topic"
    publisher_ = this->create_publisher<hbmem_pubsub::msg::SampleMessage>(
        "topic", rclcpp::SensorDataQoS());

    // Timer, calls timer_callback every 40 milliseconds to send messages
    timer_ = this->create_wall_timer(
        40ms, std::bind(&MinimalHbmemPublisher ::timer_callback, this));
  }

 private:
  // Timer callback function
  void timer_callback() {
    // Get the message to send
    auto loanedMsg = publisher_->borrow_loaned_message();
    // Check if the message is available; it may be unavailable if acquisition fails
    if (loanedMsg.is_valid()) {
      // Get the actual message by reference
      auto& msg = loanedMsg.get();
      
      // Get the current time in microseconds
      auto time_now =
          std::chrono::duration_cast<std::chrono::microseconds>(
              std::chrono::steady_clock::now().time_since_epoch()).count();
      
      // Assign values to the message's index and time_stamp
      msg.index = count_;
      msg.time_stamp = time_now;
      
      // Print the sent message
      RCLCPP_INFO(this->get_logger(), "message: %d", msg.index);
      publisher_->publish(std::move(loanedMsg));
      // Note: after sending, loanedMsg is no longer available
      // Increment the counter
      count_++;
    } else {
      // Failed to get the message, discard it
      RCLCPP_INFO(this->get_logger(), "Failed to get LoanMessage!");
    }
  }
  
  // Timer
  rclcpp::TimerBase::SharedPtr timer_;

  // hbmem publisher
  rclcpp::Publisher<hbmem_pubsub::msg::SampleMessage>::SharedPtr publisher_;
  
  // Counter
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

#### 3.2 Build dependencies

Return to the `~/dev_ws/src/hbmem_pubsub` directory, modify `package.xml` , and add the `rclcpp` dependency below `<member_of_group>rosidl_interface_packages</member_of_group>` :

```xml
  <depend>rclcpp</depend>
```

#### 3.3 Build script

Modify `CMakeLists.txt` , add the following content below the `rosidl_generate_interfaces` statement to compile the publisher:

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

### 4. Create a message receiving node

#### 4.1 Create a new message receiving node file

Create a new `subscriber_hbmem.cpp` file in the `~/dev_ws/src/hbmem_pubsub/src` directory to create a subscriber node. The specific code and explanation are as follows:

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
    // Create subscription_hbmem with topic "sample"
    // The message callback function is topic_callback
    subscription_ =
        this->create_subscription_hbmem<hbmem_pubsub::msg::SampleMessage>(
            "topic", rclcpp::SensorDataQoS(),
            std::bind(&MinimalHbmemSubscriber ::topic_callback, this,
                      std::placeholders::_1));
  }

 private:
  // Message callback function
  void topic_callback(
      const hbmem_pubsub::msg::SampleMessage::SharedPtr msg) const {
    // Note: msg can only be used within the callback function; after the callback returns, the message will be released
    // Get the current time
    auto time_now =
        std::chrono::duration_cast<std::chrono::microseconds>(
            std::chrono::steady_clock::now().time_since_epoch())
            .count();
    // Calculate latency and print it
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
    // Create subscription_hbmem with topic "sample"
    // The message callback function is topic_callback
    subscription_ =
        this->create_subscription<hbmem_pubsub::msg::SampleMessage>(
            "topic", rclcpp::SensorDataQoS(),
            std::bind(&MinimalHbmemSubscriber ::topic_callback, this,
                      std::placeholders::_1));
  }

 private:
  // Message callback function
  void topic_callback(
      const hbmem_pubsub::msg::SampleMessage::SharedPtr msg) const {
    // Note: msg can only be used within the callback function; after the callback returns, the message will be released
    // Get the current time
    auto time_now =
        std::chrono::duration_cast<std::chrono::microseconds>(
            std::chrono::steady_clock::now().time_since_epoch())
            .count();
    // Calculate latency and print it
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
    // Create subscription_hbmem with topic "sample"
    // The message callback function is topic_callback
    subscription_ =
        this->create_subscription<hbmem_pubsub::msg::SampleMessage>(
            "topic", rclcpp::SensorDataQoS(),
            std::bind(&MinimalHbmemSubscriber ::topic_callback, this,
                      std::placeholders::_1));
  }

 private:
  // Message callback function
  void topic_callback(
      const hbmem_pubsub::msg::SampleMessage::SharedPtr msg) const {
    // Note: msg can only be used within the callback function; after the callback returns, the message will be released
    // Get the current time
    auto time_now =
        std::chrono::duration_cast<std::chrono::microseconds>(
            std::chrono::steady_clock::now().time_since_epoch())
            .count();
    // Calculate latency and print it
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

#### 4.2 Build script

Return to the `~/dev_ws/src/hbmem_pubsub` directory. The `rclcpp` dependency has already been added to `package.xml` , so no modification to `package.xml` is needed.

Modify `CMakeLists.txt` , add the following content below the `install` statement to compile the subscriber:

```cmake
add_executable(listener src/subscriber_hbmem.cpp)
ament_target_dependencies(listener rclcpp)
rosidl_target_interfaces(listener
  ${PROJECT_NAME} "rosidl_typesupport_cpp")

install(TARGETS
  listener
  DESTINATION lib/${PROJECT_NAME})
```

### 5. Build

The entire workspace directory structure is as follows:

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

The complete `package.xml` content is as follows:

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

The complete `CMakeLists.txt` content is as follows:

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

In the workspace root directory `~/dev_ws` , compile the package:

```shell
colcon build --packages-select hbmem_pubsub
```

If the `colcon` command is not installed, use the following command to install it:

```shell
sudo apt install ros-dev-tools
```

### 6. Run

Open a new terminal, `cd` to the `dev_ws` directory, and source the tros.b and current workspace setup files:

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

```bash
source /opt/tros/setup.bash
cd ~/dev_ws
. install/setup.bash
# Run the talker node:
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
# Run the talker node:
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
# Run the talker node:
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
# Run the talker node:
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
# Run the talker node:
ros2 run hbmem_pubsub talker
```

</TabItem>
</Tabs>
</DocScope>

The following output will appear on the terminal:

```text
[INFO] [1649227473.431381673] [minimal_hbmem_publisher]: message: 0
[INFO] [1649227473.470746697] [minimal_hbmem_publisher]: message: 1
[INFO] [1649227473.510923361] [minimal_hbmem_publisher]: message: 2
[INFO] [1649227473.550886783] [minimal_hbmem_publisher]: message: 3
[INFO] [1649227473.590664377] [minimal_hbmem_publisher]: message: 4
[INFO] [1649227473.630857041] [minimal_hbmem_publisher]: message: 5
```

Open another new terminal, `cd` to the `dev_ws` directory, source the setup file, and then run the listener node:

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

The terminal will display output similar to the following, indicating that the subscriber has successfully received the message sent by the publisher:

```text
[INFO] [1649227450.387089523] [minimal_hbmem_subscriber]: msg 10, time cost 1663us
[INFO] [1649227450.427071280] [minimal_hbmem_subscriber]: msg 11, time cost 1713us
[INFO] [1649227450.466993413] [minimal_hbmem_subscriber]: msg 12, time cost 1622us
[INFO] [1649227450.507029960] [minimal_hbmem_subscriber]: msg 13, time cost 1666us
[INFO] [1649227450.546146910] [minimal_hbmem_subscriber]: msg 14, time cost 998us
[INFO] [1649227450.587002681] [minimal_hbmem_subscriber]: msg 15, time cost 1768us
```

Press `Ctrl+C` to stop each node.

## Usage Limitations

Compared to ROS2's publisher/subscriber data transfer method, using zero-copy transfer has the following limitations:

- QOS History only supports KEEPLAST, not KEEPALL, and KEEPLAST cannot be set too high due to memory constraints. Currently, it is set to a maximum of 256MB.
- The size of the transmitted message is fixed, meaning the `sizeof` value of the message is constant, and it cannot contain variable-length data types (e.g., string, dynamic arrays).
- For TROS Humble and later versions, it is recommended to use `RMW_QOS_POLICY_RELIABILITY_BEST_EFFORT` for QOS Reliability (it is recommended to directly use `rclcpp::SensorDataQoS()` to set QOS). `RMW_QOS_POLICY_RELIABILITY_RELIABLE` has stability issues in various communication scenarios.
- It can only be used for inter-process communication on the same device, not for cross-device transmission.
- The publisher must first acquire the message before assigning values and sending, and must check whether the acquisition was successful.
- The validity of messages received by the subscriber is limited to the callback function; they cannot be used outside the callback function.