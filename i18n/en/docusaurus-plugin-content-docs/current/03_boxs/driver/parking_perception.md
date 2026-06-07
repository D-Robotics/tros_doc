---

sidebar_position: 3

sidebar_products: RDK-X3

---

# Road Surface Structure Perception



```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```



## Overview



The parking_perception package is a road surface structure perception algorithm example developed based on the hobot_dnn package. It uses the BPU for model inference to obtain algorithm inference results.

This package supports directly subscribing to sensors/msg/image topics and supports inference by reading local images. While publishing algorithm information via topics, it also renders results for visualization on a web page and supports saving rendered images to the result directory where the program runs.



Supported object detection categories:



| Category         | Description   |

| ------------ | ------ |

| cyclist      | Cyclist |

| person       | Pedestrian   |

| rear         | Vehicle rear   |

| vehicle      | Vehicle   |

| parking_lock | Parking lock   |



Supported semantic segmentation categories:



| Category          | Description     |

| ------------- | -------- |

| road          | Road     |

| background    | Background     |

| lane_marking  | Lane marking   |

| sign_line     | Sign line   |

| parking_lane  | Parking lane   |

| parking_space | Parking space |

| parking_rod   | Parking rod   |

| parking_lock  | Parking lock     |



Code repository: (https://github.com/D-Robotics/parking_perception.git)



Application scenario: The outdoor parking area detection algorithm is based on semantic segmentation to identify parking areas in images, enabling automatic parking functionality. It is mainly used in autonomous driving.



Parking space search case: [Parking Space Search](../../04_apps/parking_search.md)



## Supported Platforms



| Platform                  | Runtime Environment     | Example Functionality                                                     |

| --------------------- | ------------ | ------------------------------------------------------------ |

| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) | · Start MIPI/USB camera/local feedback playback, display inference rendering results on web/save locally |

| X86                   | Ubuntu 20.04 (Foxy) | · Start local feedback playback, display inference rendering results on web/save locally             |



## Algorithm Information



<DocScope products="RDK-X3">

| Model | Platform | Input Size | Inference Frame Rate (fps) |
| ---- | ---- | ---- | ---- |
| parking_perception | X3 | 1x3x640x320 | 103.52 |

</DocScope>


## Preparation



### RDK Platform



1. RDK has been flashed with the Ubuntu system image.



2. TogetheROS.Bot has been successfully installed on the RDK.



### X86 Platform



1. The X86 environment has Ubuntu 20.04 system image configured.



2. tros.b has been successfully installed in the X86 environment.



## Usage



The package publishes algorithm messages containing semantic segmentation and object detection information. Users can subscribe to the published messages for application development.



### RDK Platform



**Publish Images with MIPI Camera**



<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">



```bash

# 配置tros.b环境

source /opt/tros/setup.bash

```



</TabItem>

<TabItem value="humble" label="Humble">



```bash

# 配置tros.b环境

source /opt/tros/humble/setup.bash

```





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





</TabItem>

</Tabs>
</DocScope>





```shell

# 从tros.b的安装路径中拷贝出运行示例需要的配置文件。

cp -r /opt/tros/${TROS_DISTRO}/lib/parking_perception/config/ .



# 配置MIPI摄像头

export CAM_TYPE=mipi



# 启动launch文件

ros2 launch parking_perception parking_perception.launch.py 

```



**Publish Images with USB Camera**



<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">



```bash

# 配置tros.b环境

source /opt/tros/setup.bash

```



</TabItem>

<TabItem value="humble" label="Humble">



```bash

# 配置tros.b环境

source /opt/tros/humble/setup.bash

```





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





</TabItem>

</Tabs>
</DocScope>



```shell

# 从tros的安装路径中拷贝出运行示例需要的配置文件。

cp -r /opt/tros/${TROS_DISTRO}/lib/parking_perception/config/ .



# 配置USB摄像头

export CAM_TYPE=usb



# 启动launch文件

ros2 launch parking_perception parking_perception.launch.py 

```



**Use Single Feedback Image**



<DocScope products="RDK-X3,RDK-X5">
<Tabs groupId="tros-distro">
<TabItem value="foxy" label="Foxy">



```bash

# 配置tros.b环境

source /opt/tros/setup.bash

```



</TabItem>

<TabItem value="humble" label="Humble">



```bash

# 配置tros.b环境

source /opt/tros/humble/setup.bash

```





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





</TabItem>

</Tabs>
</DocScope>





```shell

# 从tros的安装路径中拷贝出运行示例需要的配置文件。

cp -r /opt/tros/${TROS_DISTRO}/lib/parking_perception/config/ .



# 配置回灌图片

export CAM_TYPE=fb



# 启动launch文件

ros2 launch parking_perception parking_perception.launch.py 

```





### X86 Platform



**Use Single Feedback Image**



```bash

# 配置tros.b环境

source /opt/tros/setup.bash



# 从tros的安装路径中拷贝出运行示例需要的配置文件。

cp -r /opt/tros/${TROS_DISTRO}/lib/parking_perception/config/ .



# 配置回灌图片

export CAM_TYPE=fb



# 启动launch文件

ros2 launch parking_perception parking_perception.launch.py 

```



## Result Analysis



**Publish Images with MIPI Camera**



After the package initializes, the running terminal outputs the following information:



```

[INFO] [launch]: All log files can be found below /root/.ros/log/2022-08-02-06-46-55-605266-ubuntu-3669

[INFO] [launch]: Default logging verbosity is set to INFO

[INFO] [mipi_cam-1]: process started with pid [3671]

[INFO] [hobot_codec_republish-2]: process started with pid [3673]

[INFO] [parking_perception-3]: process started with pid [3675]

[INFO] [websocket-4]: process started with pid [3677]

[parking_perception-3] [WARN] [1659394017.194211788] [parking_perception]: Parameter:

[parking_perception-3] shared_men:1

[parking_perception-3]  is_sync_mode_: 1

[parking_perception-3]  model_file_name_: config/parking_perception_640x320.bin

[parking_perception-3] feed_image:

[parking_perception-3] [INFO] [1659394017.194695288] [dnn]: Node init.

[parking_perception-3] [INFO] [1659394017.194784038] [parking_perception]: Set node para.

[parking_perception-3] [INFO] [1659394017.194845413] [dnn]: Model init.

[parking_perception-3] [BPU_PLAT]BPU Platform Version(1.3.1)!

[parking_perception-3] [C][3675][08-02][06:46:57:202][configuration.cpp:49][EasyDNN]EasyDNN version: 0.4.11

[parking_perception-3] [HBRT] set log level as 0. version = 3.14.5

[parking_perception-3] [DNN] Runtime version = 1.9.7_(3.14.5 HBRT)

[parking_perception-3] [INFO] [1659394017.247423580] [dnn]: The model input 0 width is 640 and height is 320

[parking_perception-3] [INFO] [1659394017.247664997] [dnn]: Task init.

[parking_perception-3] [INFO] [1659394017.255848788] [dnn]: Set task_num [2]

[parking_perception-3] [INFO] [1659394017.255999663] [parking_perception]: The model input width is 640 and height is 320

[parking_perception-3] [INFO] [1659394017.263431163] [parking_perception]: msg_pub_topic_name: ai_msg_parking_perception

[parking_perception-3] [INFO] [1659394017.263554788] [parking_perception]: Detect images that use subscriptions

[parking_perception-3] [WARN] [1659394017.263597997] [parking_perception]: Create hbmem_subscription with topic_name: /hbmem_img

[parking_perception-3] [WARN] [1659394017.267204163] [parking_perception]: start success!!!

[parking_perception-3] [WARN] [1662036456.219133588] [parking_perception]: input fps: 29.73, out fps: 29.79

[parking_perception-3] [WARN] [1662036457.228303881] [parking_perception]: input fps: 29.73, out fps: 29.73

[parking_perception-3] [WARN] [1662036458.237841548] [parking_perception]: input fps: 29.73, out fps: 29.73

```



**Use Single Feedback Image**



In the example, inference results from reading local images are rendered onto the images. Enter `http://IP:8000` in a PC browser to view the images and algorithm rendering results (IP is the RDK's IP address), and open the settings in the upper-right corner of the interface.



![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/operation_1.png)



Select the "Full Image Segmentation" option to display the rendering effect.



![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/operation_2.png)



The visualization results show that in outdoor scenes, parking areas are effectively separated from driving areas, distinguishing parking lane markings from driving lane markings. The object detection task also locates distant vehicles.



![](https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/render_parking.png)



When "dump_render_img" is set to "1", the rendering results are saved in the result directory under the current path.

