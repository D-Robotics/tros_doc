---
sidebar_position: 9
sidebar_products: RDK-S100
---

# Object Tracking and Segmentation (EdgeTAM)

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocScope from '@site/src/components/DocScope';
```

## Introduction

EdgeTAM (Edge Track Anything Model) is an object tracking and segmentation application deployed on the RDK platform based on the open-source [EdgeTAM](https://github.com/facebookresearch/EdgeTAM) model from Facebook Research. Using point or box prompts, it continuously tracks and segments arbitrary targets in video streams.

`mono_edgetam` consists of two sub-projects:

- **mono_edgetam_prompt**: Responsible for prompt initialization. Performs model inference based on input images and point/box prompts, generates and saves memory feature files for downstream use.
- **mono_edgetam_track**: Responsible for continuous tracking and segmentation. Loads feature information saved during the prompt phase and performs tracking on subsequent frames, publishing segmentation results.

Usage flow: First start `mono_edgetam_prompt` to initialize the target, then start `mono_edgetam_track` to load the initialization features and begin tracking.

Code repository:

 (https://github.com/D-Robotics/mono_edgetam)

Application scenarios: EdgeTAM can continuously track and segment arbitrary targets using point/box prompts, enabling video object segmentation, interactive video editing, and other features. It is mainly used in autonomous driving, video analysis, intelligent interaction, and other fields.

## Supported Platforms

| Platform                     | Runtime Environment     | Example Functionality                                                 |
| ------------------------ | ------------ | -------------------------------------------------------- |
| RDK S100, RDK S100P | Ubuntu 22.04 (Humble) | Start MIPI/USB camera/local feedback and display inference rendering results via Web |

## Algorithm Info

<DocScope products="RDK-S100">

| Model | Platform | Input Size | Inference FPS |
| ---- | ---- | ---- | ---- |
| EdgeTAM Prompt | S100 | 1x1024x1024x3 | - |
| EdgeTAM Track | S100 | 1x1024x1024x3 | - |

</DocScope>
## Preparation

### RDK Platform

1. The RDK has been flashed with the Ubuntu 22.04 system image.

2. TogetheROS.Bot has been successfully installed on the RDK.

3. A MIPI or USB camera has been installed on the RDK. Without a camera, you can experience the algorithm by feeding back local JPEG images.

4. Confirm that the PC can access the RDK over the network.

### Download Models and Data

```shell
# Download prompt model
wget https://archive.d-robotics.cc/downloads/models/edgetam/s100/model_prompt_to_memory_points.hbm

# Download track model
wget https://archive.d-robotics.cc/downloads/models/edgetam/s100/model_track_step_s7.hbm

# Download sample dataset
wget https://archive.d-robotics.cc/downloads/models/edgetam/bedroom.tar
tar -xvf bedroom.tar
```

## Usage

EdgeTAM tracking and segmentation consists of two phases: **prompt phase** and **tracking phase**.

1. Prompt phase: Before tracking, you need to obtain a **traget embedding** prompt feature for tracking. This step uses the SAM mechanism — by providing a point/box prompt on the image, it generates the image segmentation result and **traget embedding** prompt feature. Note that the target object should move into the prompt point/box region. You can modify the point/box region in **Advanced Usage** at the bottom of this document.

2. Tracking phase: After closing the prompt phase, load the previous **traget embedding** prompt feature and perform tracking.
The two nodes cannot be started simultaneously.

### 1. Start mono_edgetam_prompt (Prompt Phase)

The prompt initialization node performs model inference based on input images and point/box prompts, generates **traget embedding** prompt feature files and saves them locally for the tracking node to load.

**Publish Images Using MIPI Camera**



<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```shell
# Configure ROS2 environment
source /opt/tros/humble/setup.bash

# Configure MIPI camera
export CAM_TYPE=mipi

# Launch launch file
ros2 launch mono_edgetam_prompt mono_edgetam_prompt.launch.py edgetam_prompt_mode:=0
```

</TabItem>

</Tabs>
</DocScope>

**Publish Images Using USB Camera**



<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```shell
# Configure ROS2 environment
source /opt/tros/humble/setup.bash

# Configure USB camera
export CAM_TYPE=usb

# Launch launch file
ros2 launch mono_edgetam_prompt mono_edgetam_prompt.launch.py edgetam_prompt_mode:=0
```

</TabItem>

</Tabs>
</DocScope>

**Using Single Feedback Image**



<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```shell
# Configure ROS2 environment
source /opt/tros/humble/setup.bash

# Configure feedback image
export CAM_TYPE=fb

# Launch launch file
ros2 launch mono_edgetam_prompt mono_edgetam_prompt.launch.py edgetam_prompt_mode:=0
```

</TabItem>

</Tabs>
</DocScope>

#### Web Display

Enter `http://IP:8000` in a PC browser to view the image and algorithm rendering results (IP is the RDK IP address). Open the settings in the upper right corner of the interface and select the "Full Image Segmentation" option to display the segmentation rendering effect.

Prompt phase rendering effect:

<img src="http://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/body/image/render_frame0.png" alt="EdgeTAM single-frame target segmentation render in the web UI" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

After the prompt phase node completes one inference, it automatically saves the generated feature file to the current working directory for the tracking node to load.

**Prompt Save Instructions**

- **Save timing**: After the node receives an image and completes inference, it immediately writes the memory feature tensor to a local file. Exit when the frame with the best segmentation result is selected — at this point the current tracking features are saved.
- **Generated files**:
  - `cond_maskmem_features.bin` : mask memory feature file
  - `cond_maskmem_pos_enc.bin` : memory positional encoding file
  - `cond_obj_ptr.bin` : object pointer file

:::warning
**Note**: The tracking node loads these feature files from the current working directory at startup. If you switch working directories between the prompt phase and tracking phase, copy the generated feature files to the tracking node's working directory, or run both phases in the same directory.
:::

### 2. Start mono_edgetam_track (Tracking Phase)

The tracking node loads feature files ( `cond_maskmem_features.bin` , `cond_maskmem_pos_enc.bin` , `cond_obj_ptr.bin` ), continuously tracks and segments targets in the video stream, and publishes segmentation results.

**Note**: Run the `mono_edgetam_track` tracking node in the **same directory** to ensure the tracking node loads the feature files generated during the prompt phase.

**Publish Images Using MIPI Camera**



<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```shell
# Configure ROS2 environment
source /opt/tros/humble/setup.bash

# Configure MIPI camera
export CAM_TYPE=mipi

# Launch launch file
ros2 launch mono_edgetam_track mono_edgetam_track.launch.py edgetam_is_overwrite_features:=0
```

</TabItem>

</Tabs>
</DocScope>

**Publish Images Using USB Camera**



<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```shell
# Configure ROS2 environment
source /opt/tros/humble/setup.bash

# Configure USB camera
export CAM_TYPE=usb

# Launch launch file
ros2 launch mono_edgetam_track mono_edgetam_track.launch.py edgetam_is_overwrite_features:=0
```

</TabItem>

</Tabs>
</DocScope>

**Using Single Feedback Image**



<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```shell
# Configure ROS2 environment
source /opt/tros/humble/setup.bash

# Configure feedback image
export CAM_TYPE=fb

# Launch launch file
ros2 launch mono_edgetam_track mono_edgetam_track.launch.py edgetam_is_overwrite_features:=0
```

</TabItem>

</Tabs>
</DocScope>


## Result Analysis

### Web Display

Enter `http://IP:8000` in a PC browser to view the image and algorithm rendering results (IP is the RDK IP address). Open the settings in the upper right corner of the interface and select the "Full Image Segmentation" option to display the segmentation rendering effect.

Tracking phase rendering effect:

<img src="http://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/body/image/render_frames.gif" alt="EdgeTAM multi-frame target segmentation render animation in the web UI" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

## Advanced Usage

### 1. Modify Prompt Mode (Prompt Phase Only)

Prompt mode is set via the `edgetam_prompt_mode` parameter:

- `0` : **Box prompt** (default) — The algorithm uses a bounding box to define the target region. Objects within the box will be tracked and segmented as the target.
- `1` : **Point prompt** — The algorithm uses point coordinates to define the target region. Based on the SAM mechanism, the algorithm selects the most prominent target object near the specified point. You can specify up to two points to refine the selection range.

**How to Select Region with Point Prompt**

When setting `edgetam_prompt_mode:=1` (point prompt mode), you need to specify at least one point coordinate. Each point is represented by a `rect` ( `width=0, height=0` ), where `x_offset` and `y_offset` define the pixel coordinates of the point on the image. The algorithm uses SAM's segmentation capability to identify target objects near the given point.

In the example below, two points are specified:
- The first point `{x_offset: 210, y_offset: 350}` serves as a **positive point** — the algorithm will include the target object near this location.
- The second point `{x_offset: 250, y_offset: 220}` serves as an additional reference point to help the algorithm locate the target object more precisely.

Using two (or more) positive points on the same target can produce a more accurate segmentation mask. A single point can also be used if the target is well separated from the background.

### 2. Dynamically Modify Prompts (Prompt Phase Only)

While the node is running, you can dynamically modify prompt boxes/points by publishing to a topic:



<DocScope products="RDK-S100">
<Tabs groupId="tros-distro">
<TabItem value="humble" label="Humble">

```shell
# Configure ROS2 environment
source /opt/tros/humble/setup.bash
```

</TabItem>

</Tabs>
</DocScope>

```shell
# Publish 'box' prompt in another terminal
# rect parameter description:
#   x_offset: bounding box top-left X coordinate (in pixels)
#   y_offset: bounding box top-left Y coordinate (in pixels)
#   width: bounding box width (in pixels), set to 0 for point prompt mode
#   height: bounding box height (in pixels), set to 0 for point prompt mode
#   When width > 0 and height > 0: (x_offset, y_offset) is the top-left corner of the box prompt
#   When width = 0 and height = 0: (x_offset, y_offset) is the coordinate of the point prompt
ros2 topic pub /hobot_dnn_detection ai_msgs/msg/PerceptionTargets \
  '{"targets": [{"rois": [{"rect": {"x_offset": 240, "y_offset": 135, "width": 480, "height": 270}, "type": "anything"}]}]}'
```

```shell
# Or publish 'point' prompt (set box width and height to 0)
# The two points below define two positive points to help the algorithm locate the target more accurately
# rect parameter description:
#   x_offset: prompt point X coordinate (in pixels)
#   y_offset: prompt point Y coordinate (in pixels)
ros2 topic pub /hobot_dnn_detection ai_msgs/msg/PerceptionTargets \
  '{"targets": [{"rois": [{"rect": {"x_offset": 210, "y_offset": 350, "width": 0, "height": 0}, "type": "anything"}, {"rect": {"x_offset": 250, "y_offset": 220, "width": 0, "height": 0}, "type": "anything"}]}]}'
```
