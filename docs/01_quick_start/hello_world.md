---
sidebar_position: 4
---

# 5.1.4 运行“Hello World”

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

前提：已通过deb包或者源码安装的方式成功安装TogetheROS.Bot

启动两个终端，均ssh登陆至RDK或X86平台设备

<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">

第一个终端运行

```shell
source /opt/tros/setup.bash
ros2 run examples_rclcpp_minimal_subscriber subscriber_member_function
```

第二个终端运行

```shell
source /opt/tros/setup.bash
ros2 run examples_rclcpp_minimal_publisher publisher_member_function
```

</TabItem>

<TabItem value="humble" label="Humble">

安装`Hello World` example对应的package：

```shell
sudo apt update
sudo apt install ros-humble-examples-rclcpp-minimal-publisher ros-humble-examples-rclcpp-minimal-subscriber
```

:::caution **注意**
<DocScope products="RDK-X3">
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system?v=3.0.0&p=RDK+X3#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q10: apt update 命令执行失败或报错如何处理？`解决。**
</DocScope>
<DocScope products="RDK-X5">
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q10: apt update 命令执行失败或报错如何处理？`解决。**
</DocScope>
:::

第一个终端运行

```shell
source /opt/tros/humble/setup.bash
ros2 run examples_rclcpp_minimal_subscriber subscriber_member_function
```

第二个终端运行

```shell
source /opt/tros/humble/setup.bash
ros2 run examples_rclcpp_minimal_publisher publisher_member_function
```

</TabItem>

<TabItem value="jazzy" label="Jazzy">

安装`Hello World` example对应的package：

```shell
sudo apt update
sudo apt install ros-jazzy-examples-rclcpp-minimal-publisher ros-jazzy-examples-rclcpp-minimal-subscriber
```

:::caution **注意**
<DocScope products="RDK-X3">
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system?v=3.0.0&p=RDK+X3#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q10: apt update 命令执行失败或报错如何处理？`解决。**
</DocScope>
<DocScope products="RDK-X5">
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_x_doc/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q10: apt update 命令执行失败或报错如何处理？`解决。**
</DocScope>
:::

第一个终端运行

```shell
source /opt/tros/jazzy/setup.bash
ros2 run examples_rclcpp_minimal_subscriber subscriber_member_function
```

第二个终端运行

```shell
source /opt/tros/jazzy/setup.bash
ros2 run examples_rclcpp_minimal_publisher publisher_member_function
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

安装`Hello World` example对应的package：

```shell
sudo apt update
sudo apt install ros-humble-examples-rclcpp-minimal-publisher ros-humble-examples-rclcpp-minimal-subscriber
```

:::caution **注意**
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_s_doc/FAQ/hardware_and_system#q6-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q6: apt update 命令执行失败或报错如何处理？`解决。**
:::

第一个终端运行

```shell
source /opt/tros/humble/setup.bash
ros2 run examples_rclcpp_minimal_subscriber subscriber_member_function
```

第二个终端运行

```shell
source /opt/tros/humble/setup.bash
ros2 run examples_rclcpp_minimal_publisher publisher_member_function
```

</TabItem>
</Tabs>
</DocScope>

<DocScope products="RDK-S600">
<Tabs groupId="tros-distro">
<TabItem value="jazzy" label="Jazzy">

安装`Hello World` example对应的package：

```shell
sudo apt update
sudo apt install ros-jazzy-examples-rclcpp-minimal-publisher ros-jazzy-examples-rclcpp-minimal-subscriber
```

:::caution **注意**
**如果`sudo apt update`命令执行失败或报错，请查看[常见问题](https://developer.d-robotics.cc/rdk_s_doc/FAQ/hardware_and_system?v=5.1.0&p=RDK+S600#q6-apt-update-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%E6%88%96%E6%8A%A5%E9%94%99%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86)章节的`Q6: apt update 命令执行失败或报错如何处理？`解决。**
:::

第一个终端运行

```shell
source /opt/tros/jazzy/setup.bash
ros2 run examples_rclcpp_minimal_subscriber subscriber_member_function
```

第二个终端运行

```shell
source /opt/tros/jazzy/setup.bash
ros2 run examples_rclcpp_minimal_publisher publisher_member_function
```

</TabItem>
</Tabs>
</DocScope>


运行效果如下图

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/01_quick_start/image/hello_world/hello_world.png" alt="Hello World 示例中 publisher 与 subscriber 两端终端收发消息的运行效果" style={{ width: '90%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>
可以看到左侧终端作为pub，在不断发送“'Hello, world! N”，右侧终端作为sub端不断收到“'Hello, world! N”

OK tros.b目前已成功安装并验证！
