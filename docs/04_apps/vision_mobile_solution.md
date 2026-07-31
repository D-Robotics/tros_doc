---
sidebar_position: 10
sidebar_products: RDK-X5
---

# 5.4.10 机器人移动解决方案

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## 功能介绍

基于 [D-Robotics RDK X5](https://developer.d-robotics.cc/rdkx5) 平台，面向室内移动机器人场景，提供软硬结合、深度优化、低成本、开箱即用的**全栈纯视觉移动参考解决方案**，帮助用户建立起移动机器人底层的核心和基础能力，推动智能机器人产品快速落地。支持轮式、四足、双足等不同机器人类型。

针对室内家庭场景，移动Solution提供了无感和断点续建的建图能力，使机器人从开箱时刻起就成为家庭的一员。机器人首次启动就能够立刻和人互动，无需等待，在互动的过程中自动完成建图。同时在家庭复杂环境下能够自主避障和自动脱困，不制造麻烦。得益于Lifelong的SLAM能力，机器人在使用的过程中持续进化，越来越"懂家"，越用越聪明。使移动Solution成为家庭智能服务的隐形守护者。

移动Solution包含双目深度估计、VSLAM（6DoF位姿估计、重定位、Lifelong实时3D建图）、障碍物识别、导航和避障、以及用于开发的工具箱。

**极简&低成本硬件：**

| 移动底盘 | RDK X5 | 双目相机 | → | 组装后 |
| :---: | :---: | :---: | :---: | :---: |
| <img src="http://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/vision_mobile_solution/originbot_controller_install.png" height="250" /> | <img src="http://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/vision_mobile_solution/image_004.png" height="250" /> | <img src="http://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/vision_mobile_solution/cam_132gswi.png" height="250" /> | → | <img src="http://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/vision_mobile_solution/originbot_cam70mm.jpg" height="250" /> |

**纯视觉 & Lifelong & 实时 3D建图和导航效果：**

<img src="http://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/04_apps/image/vision_mobile_solution/mapping.gif" width="900" />


## 使用手册

参考[视觉移动Solution套件使用手册](https://d-robotics.github.io/tros_vims_doc/)。


## 问题反馈

如有问题，请[提issue](https://github.com/D-Robotics/tros_vims_doc/issues)。
