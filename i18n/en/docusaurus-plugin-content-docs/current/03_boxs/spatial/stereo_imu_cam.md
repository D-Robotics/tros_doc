---
sidebar_position: 7
sidebar_products: RDK-X5
---

# Stereo IMU Camera

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## 1. Overview

The D-Robotics stereo IMU camera includes complete calibration parameters: stereo calibration, IMU intrinsics, and extrinsics between stereo and IMU. Users can use it directly without additional calibration.
Using these parameters, high-precision depth maps can be computed via stereo matching for real-time 3D environment perception.
Camera data can also be used with open-source Visual-Inertial Odometry (VIO) algorithms such as OpenVINS to compute camera pose and trajectory.
Suitable for robot navigation, obstacle avoidance, and related applications, providing plug-and-play depth perception and visual-inertial fusion.

MIPI camera code repository:https://github.com/D-Robotics/hobot_mipi_cam

## 2. Supported Platforms

| Platform                  | System Support              | Example Features                            |
| --------------------- | --------------------- | ----------------------------------- |
| RDK X5, RDK X5 Module | Ubuntu 22.04 (Humble) | Start stereo camera; output stereo images and IMU data |

## 3. Preparation

### 3.1. RDK Platform

1. RDK has been flashed with RDK OS
2. TogetheROS.Bot has been successfully installed on RDK
3. Confirm that the PC can access RDK over the network

### 3.2. System and Package Versions

|                                       | Version        | Query Method                                        |
| ------------------------------------- | ----------- | ----------------------------------------------- |
| RDK X5 system image version                    | 3.4.1 and above | `cat /etc/version`                              |
| tros-humble-hobot-stereonet package version | 2.5.0 and above | `apt list \| grep tros-humble-hobot-stereonet/` |
| tros-humble-mipi-cam package version        | 2.5.0 and above | `apt list \| grep tros-humble-mipi-cam/`        |

- If the system image version does not meet requirements, refer to the corresponding documentation section for image flashing
- If the package version does not meet requirements, run the following commands to update:

```bash
sudo apt update
sudo apt install --only-upgrade tros-humble-hobot-stereonet
sudo apt install --only-upgrade tros-humble-mipi-cam
```

:::caution **Note**
**If the `sudo apt update` command fails or reports an error, please refer to the [FAQ](https://developer.d-robotics.cc/rdk_x_doc/en/FAQ/hardware_and_system?v=3.5.0&p=RDK+X5#q10-what-to-do-if-apt-update-fails-eg-key-error-update-failure-lock-file-in-use) section `Q10: How to handle apt update command failure or error?` for resolution.**
:::

## 4. Start Stereo Camera

### 4.1. Stereo IMU Camera

- Note: the camera is available in black metal and acrylic housing versions with identical functionality

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/LH_IMU_cam.jpg" alt="Photo of a stereo camera module with IMU (metal/acrylic housing)" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

### 4.2. Hardware Connection

1. Set the module back switch to `EXT` mode, not `LPWM` mode
2. Connect the camera black Dupont wire to RDK X5 pin `37` for external trigger to synchronize camera and IMU timestamps. See [Pin Definition and Application](../../../03_Basic_Application/01_40pin_user_sample/40pin_define.md) for pin definitions

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/RDK_X5_LH_IMU_cam.png" alt="Dupont-wire connection from the stereo IMU camera to RDK X5 pin 37" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

### 4.3. RDK X5 Configuration

1. RDK X5 requires configuration to read IMU data. First check system version meets requirements ( `3.4.1` or above):

```bash
cat /etc/version
```

2. Run the following on RDK X5 to configure:

```bash
srpi-config
```

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/LH_IMU_cam_config1.png" alt="srpi-config step 1 for stereo IMU camera related options" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>
<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/LH_IMU_cam_config2.png" alt="srpi-config step 2 for stereo IMU camera related options" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>
<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/LH_IMU_cam_config3.png" alt="srpi-config step 3 for stereo IMU camera related options" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>
<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/LH_IMU_cam_config4.png" alt="srpi-config step 4 for stereo IMU camera related options" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

3. After reboot, confirm `/sys/bus/iio/devices/` contains `iio:device1` and `iio:device2` for successful configuration

```bash
ll /sys/bus/iio/devices/
```

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/LH_IMU_cam_config5.png" alt="Terminal listing of IMU device nodes under /sys/bus/iio/devices" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

### 4.4. Camera Startup Commands

1. Run the following to start the camera:

```bash
source /opt/tros/humble/setup.bash

ros2 launch mipi_cam mipi_cam_dual_channel.launch.py \
mipi_channel:=2 mipi_channel2:=0 \
mipi_lpwm_enable:=True mipi_frame_ts_type:=realtime \
mipi_image_width:=816 mipi_image_height:=960 \
mipi_image_framerate:=10.0 mipi_gdc_enable:=True \
mipi_out_format:=nv12 \
log_level:=info
```

Parameter description:

- mipi_channel:=2 mipi_channel2:=0 Adjust left/right stitching order
- mipi_lpwm_enable:=True Enable LPWM hardware sync
- mipi_frame_ts_type:=realtime Use system time for timestamps
- mipi_image_width:=816 mipi_image_height:=960 Adjust image resolution; max 1088×1280
- mipi_image_framerate:=10.0 Adjust camera frame rate; max 30.0
- mipi_gdc_enable:=True Enable GDC rectification to publish rectified stereo images; otherwise distorted images are published
- mipi_out_format:=nv12 Set image format; supports nv12/bgr8
- log_level:=info Log level. info prints calibration parameters; set to warn for less output

2. On successful startup, the following log is printed including all camera calibration parameters. Stereo calibration currently uses fisheye mode; see [OpenCV fisheye](https://docs.opencv.org/4.x/db/d58/group__calib3d__fisheye.html):

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/LH_IMU_cam_run_success_log.png" alt="Success log of the stereo IMU camera startup with calibration parameters" style={{ width: '100%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

3. Published topics:

```bash
ros2 topic list -v
```

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/LH_IMU_cam_topic.png" alt="Output of ros2 topic list -v for stereo IMU camera topics" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

- /image_combine_raw is vertically stacked stereo image; mipi_channel:=2 mipi_channel2:=0 controls stitching order
- /image_left_raw and /image_right_raw are left/right data topics; mipi_channel:=2 mipi_channel2:=0 controls order
- /imu_data is IMU data topic publishing gyroscope and accelerometer data

:::caution **Note**
**In IMU data topic, `angular_velocity` is in rad/s, `linear_acceleration` is in m/s², and gravity is `9.81` **
:::

## 5. Start Stereo Depth Algorithm

### 5.1. Startup Commands

- Refer to [Stereo Depth Algorithm](./hobot_stereonet.md) for stereo algorithm introduction and startup commands
- Startup command for this camera:

```bash
bash run_stereo.sh --mipi_rotation 0.0

# Refer to corresponding documentation for parameter settings
```

### 5.2. Result Display

- After startup, view RGB and depth images on web at `http://ip:8000` (RDK IP in figure is 192.168.128.10):

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/LH_IMU_cam_DStereo.png" alt="Web UI showing RGB and depth images from the stereo IMU camera" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

## 6. Stereo VIO Algorithm (OpenVINS Example)

### 6.1. Record rosbag

Online VIO is not yet supported. Record a rosbag and process on PC

- Run commands

```bash
source /opt/tros/humble/setup.bash

ros2 pkg prefix mipi_cam

ros2 launch mipi_cam mipi_cam_dual_channel.launch.py \
mipi_channel:=2 mipi_channel2:=0 \
mipi_lpwm_enable:=True mipi_frame_ts_type:=realtime \
mipi_image_width:=816 mipi_image_height:=960 \
mipi_image_framerate:=10.0 mipi_gdc_enable:=False \
mipi_out_format:=nv12 \
log_level:=warn
```

- Mainly record IMU data and stereo image topics. Due to RDK X5 write performance limits, avoid long recording durations

```bash
ros2 bag record /imu_data /image_combine_raw --max-cache-size 1073741824
```

- Convert ros2 bag to ros1 format with your own program

### 6.2. Prepare VIO Parameters

Configure OpenVINS parameters. Create folder `drobotics_stereo_imu_cam` in OpenVINS config directory and create the following 3 files. Camera calibration files should be read from commands above

- estimator_config.yaml

```yaml
%YAML:1.0 # need to specify the file type at the top!

verbosity: "INFO" # ALL, DEBUG, INFO, WARNING, ERROR, SILENT

use_fej: true # if first-estimate Jacobians should be used (enable for good consistency)
integration: "rk4" # discrete, rk4, analytical (if rk4 or analytical used then analytical covariance propagation is used)
use_stereo: true # if we have more than 1 camera, if we should try to track stereo constraints between pairs
max_cameras: 2 # how many cameras we have 1 = mono, 2 = stereo, >2 = binocular (all mono tracking)

calib_cam_extrinsics: true # if the transform between camera and IMU should be optimized R_ItoC, p_CinI
calib_cam_intrinsics: true # if camera intrinsics should be optimized (focal, center, distortion)
calib_cam_timeoffset: true # if timeoffset between camera and IMU should be optimized
calib_imu_intrinsics: false # if imu intrinsics should be calibrated (rotation and skew-scale matrix)
calib_imu_g_sensitivity: false # if gyroscope gravity sensitivity (Tg) should be calibrated

max_clones: 11 # how many clones in the sliding window
max_slam: 50 # number of features in our state vector
max_slam_in_update: 25 # update can be split into sequential updates of batches, how many in a batch
max_msckf_in_update: 40 # how many MSCKF features to use in the update
dt_slam_delay: 1 # delay before initializing (helps with stability from bad initialization...)

gravity_mag: 9.7887 # magnitude of gravity in this location

feat_rep_msckf: "GLOBAL_3D"
feat_rep_slam: "ANCHORED_MSCKF_INVERSE_DEPTH"
feat_rep_aruco: "ANCHORED_MSCKF_INVERSE_DEPTH"

# zero velocity update parameters we can use
# we support either IMU-based or disparity detection.
try_zupt: false
zupt_chi2_multipler: 0 # set to 0 for only disp-based
zupt_max_velocity: 0.1
zupt_noise_multiplier: 10
zupt_max_disparity: 0.5 # set to 0 for only imu-based
zupt_only_at_beginning: false

# ==================================================================
# ==================================================================

init_window_time: 2.0 # how many seconds to collect initialization information
init_imu_thresh: 1.5 # threshold for variance of the accelerometer to detect a "jerk" in motion
init_max_disparity: 10.0 # max disparity to consider the platform stationary (dependent on resolution)
init_max_features: 50 # how many features to track during initialization (saves on computation)

init_dyn_use: false # if dynamic initialization should be used
init_dyn_mle_opt_calib: false # if we should optimize calibration during intialization (not recommended)
init_dyn_mle_max_iter: 50 # how many iterations the MLE refinement should use (zero to skip the MLE)
init_dyn_mle_max_time: 0.05 # how many seconds the MLE should be completed in
init_dyn_mle_max_threads: 6 # how many threads the MLE should use
init_dyn_num_pose: 6 # number of poses to use within our window time (evenly spaced)
init_dyn_min_deg: 10.0 # orientation change needed to try to init

init_dyn_inflation_ori: 10 # what to inflate the recovered q_GtoI covariance by
init_dyn_inflation_vel: 100 # what to inflate the recovered v_IinG covariance by
init_dyn_inflation_bg: 10 # what to inflate the recovered bias_g covariance by
init_dyn_inflation_ba: 100 # what to inflate the recovered bias_a covariance by
init_dyn_min_rec_cond: 1e-12 # reciprocal condition number thresh for info inversion

init_dyn_bias_g: [ 0.0, 0.0, 0.0 ] # initial gyroscope bias guess
init_dyn_bias_a: [ 0.0, 0.0, 0.0 ] # initial accelerometer bias guess

# ==================================================================
# ==================================================================

record_timing_information: false # if we want to record timing information of the method
record_timing_filepath: "/tmp/traj_timing.txt" # https://docs.openvins.com/eval-timing.html#eval-ov-timing-flame

# if we want to save the simulation state and its diagional covariance
# use this with rosrun ov_eval error_simulation
save_total_state: false
filepath_est: "/tmp/ov_estimate.txt"
filepath_std: "/tmp/ov_estimate_std.txt"
filepath_gt: "/tmp/ov_groundtruth.txt"

# ==================================================================
# ==================================================================

# our front-end feature tracking parameters
# we have a KLT and descriptor based (KLT is better implemented...)
use_klt: true # if true we will use KLT, otherwise use a ORB descriptor + robust matching
num_pts: 200 # number of points (per camera) we will extract and try to track
fast_threshold: 20 # threshold for fast extraction (warning: lower threshs can be expensive)
grid_x: 5 # extraction sub-grid count for horizontal direction (uniform tracking)
grid_y: 5 # extraction sub-grid count for vertical direction (uniform tracking)
min_px_dist: 10 # distance between features (features near each other provide less information)
knn_ratio: 0.70 # descriptor knn threshold for the top two descriptor matches
track_frequency: 21.0 # frequency we will perform feature tracking at (in frames per second / hertz)
downsample_cameras: false # will downsample image in half if true
num_opencv_threads: 4 # -1: auto, 0-1: serial, >1: number of threads
histogram_method: "HISTOGRAM" # NONE, HISTOGRAM, CLAHE

# aruco tag tracker for the system
# DICT_6X6_1000 from https://chev.me/arucogen/
use_aruco: false
num_aruco: 1024
downsize_aruco: true

# ==================================================================
# ==================================================================

# camera noises and chi-squared threshold multipliers
up_msckf_sigma_px: 1
up_msckf_chi2_multipler: 1
up_slam_sigma_px: 1
up_slam_chi2_multipler: 1
up_aruco_sigma_px: 1
up_aruco_chi2_multipler: 1

# masks for our images
use_mask: false

# imu and camera spacial-temporal
# imu config should also have the correct noise values
relative_config_imu: "kalibr_imu_chain.yaml"
relative_config_imucam: "kalibr_imucam_chain.yaml"
```

- kalibr_imu_chain.yaml

```yaml
      
%YAML:1.0

imu0:
  T_i_b:
    - [1.0, 0.0, 0.0, 0.0]
    - [0.0, 1.0, 0.0, 0.0]
    - [0.0, 0.0, 1.0, 0.0]
    - [0.0, 0.0, 0.0, 1.0]
  accelerometer_noise_density: 0.02229489595390929  # [ m / s^2 / sqrt(Hz) ]   ( accel "white noise" )
  accelerometer_random_walk: 0.0001785433950802699  # [ m / s^3 / sqrt(Hz) ].  ( accel bias diffusion )
  gyroscope_noise_density: 0.001145986736669183     # [ rad / s / sqrt(Hz) ]   ( gyro "white noise" )
  gyroscope_random_walk: 1.2431490829218913e-05     # [ rad / s^2 / sqrt(Hz) ] ( gyro bias diffusion ) 
  rostopic: /imu/data
  time_offset: 0.0
  update_rate: 344.0
  # three different modes supported:
  # "calibrated" (same as "kalibr"), "kalibr", "rpng"
  model: "kalibr"
  # how to get from Kalibr imu.yaml result file:
  #   - Tw is imu0:gyroscopes:M:
  #   - R_IMUtoGYRO: is imu0:gyroscopes:C_gyro_i:
  #   - Ta is imu0:accelerometers:M:
  #   - R_IMUtoACC not used by Kalibr
  #   - Tg is imu0:gyroscopes:A:
  Tw:
    - [ 1.0, 0.0, 0.0 ]
    - [ 0.0, 1.0, 0.0 ]
    - [ 0.0, 0.0, 1.0 ]
  R_IMUtoGYRO:
    - [ 1.0, 0.0, 0.0 ]
    - [ 0.0, 1.0, 0.0 ]
    - [ 0.0, 0.0, 1.0 ]
  Ta:
    - [ 1.0, 0.0, 0.0 ]
    - [ 0.0, 1.0, 0.0 ]
    - [ 0.0, 0.0, 1.0 ]
  R_IMUtoACC:
    - [ 1.0, 0.0, 0.0 ]
    - [ 0.0, 1.0, 0.0 ]
    - [ 0.0, 0.0, 1.0 ]
  Tg:
    - [ 0.0, 0.0, 0.0 ]
    - [ 0.0, 0.0, 0.0 ]
    - [ 0.0, 0.0, 0.0 ]
```

- kalibr_imucam_chain.yaml

```yaml
%YAML:1.0
cam0:
  T_cam_imu:
    - [-0.9999730211612913, 0.0011654864078604154, 0.007252488606936615, 0.05855576022314668]
    - [0.0011859186262073965, 0.9999953385940187, 0.002813607514727948, 0.002858928245212033]
    - [-0.00724917557882737, 0.0028221324681899397, -0.9999697420531085, -0.005490310834812385]
    - [0.0, 0.0, 0.0, 1.0]
  cam_overlaps: [1]
  camera_model: pinhole
  distortion_coeffs: [-0.029225109913193572, 0.02082403492287568, -0.03194158971070967, 0.0165934134408496]
  distortion_model: equidistant
  intrinsics: [497.81111262347383, 497.8055103598601, 396.48820025924294, 463.4451903675188]
  resolution: [816, 960]
  rostopic: /left_camera/image_raw
  timeshift_cam_imu: 0.005901386399303203
cam1:
  T_cam_imu:
    - [-0.9999845146989352, 0.004550487081340542, 0.003203658792316898, -0.010601870574768642]
    - [0.0045684145407885015, 0.9999738226044781, 0.005611033271290525, 0.002251517696825047]
    - [-0.0031780419944595945, 0.00562558202416158, -0.9999791262201281, -0.005008993420470941]
    - [0.0, 0.0, 0.0, 1.0]
  T_cn_cnm1:
    - [0.9999860743077356, 0.0033735794462250975, 0.004058343544320085, -0.06914417862245166]
    - [-0.003362141436934531, 0.9999903663337931, -0.0028219221399547337, -0.00042600348830910853]
    - [-0.0040678244261232255, 0.0028082381177397444, 0.9999877832269312, 0.0007114163409117424]
    - [0.0, 0.0, 0.0, 1.0]
  cam_overlaps: [0]
  camera_model: pinhole
  distortion_coeffs: [-0.028463396839828604, 0.012205852066252196, -0.01306188175421103, 0.001536051968099967]
  distortion_model: equidistant
  intrinsics: [494.7591785888601, 494.9156071869387, 384.67971500453064, 488.34269230328925]
  resolution: [816, 960]
  rostopic: /right_camera/image_raw
  timeshift_cam_imu: 0.00591541095880247
```

### 6.3. Start OpenVINS

- Open 3 terminals and run respectively

```bash
# Start OpenVINS
roslaunch ov_msckf subscribe.launch config:=drobotics_stereo_imu_cam verbosity:=DEBUG \
dosave:=true path_est:=~/openvins_traj.txt
```

```bash
# Start rviz
rosrun rviz rviz -d <OpenVINS目录>/open_vins/ov_msckf/launch/display.rviz
```

```bash
# Play recorded rosbag data
rosbag play xxx_ros1.bag
```

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/03_boxs/function/image/box_adv/LH_IMU_cam_OpneVINS.gif" alt="Animation of OpenVINS localization using stereo IMU data" style={{ width: '80%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

