---
sidebar_position: 4
sidebar_products: RDK-X3,RDK-X5
---

# 5.5.4 性能火焰图

## 功能介绍

火焰图是用图形化的方式来展现 perf 等工具采集的性能数据，对数据进行统计和分析，方便找出性能热点。

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/05_tros_dev/image/flame_graph/flamegraph.png" alt="火焰图原理示意：用图形化方式展示性能采样热点" style={{ width: '100%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

火焰图中的每一个方框是一个函数，方框的长度，代表了它的执行时间，所以越宽的函数，执行越久。

火焰图的楼层每高一层，就是更深一级的函数被调用，最顶层的函数，是叶子函数。

代码仓库： (https://github.com/brendangregg/FlameGraph.git)

## 支持平台

| 平台    | 运行方式 |
| ------- | ---------|
| RDK X3, RDK X3 Module, RDK X5, RDK X5 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble)    |
## 准备工作

### RDK 平台

1. flamegraph 工具分为两个部分，第一部分是可执行程序 perf。perf 是一款进行软件性能分析的工具，用于统计并输出系统或某一进程内的函数调用情况。perf 工具 RDK 的操作系统已经自带了，所以直接使用即可。

2. flamegraph 工具的第二部分是解析 perf 文本的脚本，脚本用于解析 perf 统计的文本数据，生成 SVG 格式的函数调用火焰图，方便观察和分析。

## 使用介绍

1. 使用 perf record 工具采样 RDK 系统内的函数调用情况，生成 perf.data 文件

    ```shell
    root@ubuntu:~# perf record -F 99 -a -g -- sleep 60
    ```

2. 使用 perf script 解析 perf.data 文件生成 out.perf

    ```shell
    root@ubuntu:~# perf script > out.perf
    ```

3. 在 PC 或者 RDK 上 `git clone https://github.com/brendangregg/FlameGraph.git`，进入 flamegraph 目录，把第 2 步生成的 out.perf 拷贝到 flamegraph 目录内。使用 flamegraph 工具包内的 stackcollapse-perf.pl 对 out.perf 反折叠生成 out.folded

    ```shell
    ./stackcollapse-perf.pl out.perf > out.folded
    ```

4. 使用 flamegraph.pl 生成 svg 火焰图

    ```shell
    ./flamegraph.pl out.folded > flame.svg
    ```

其中 1，2 步骤在 RDK 上完成，3，4 步骤在 PC 或者 RDK 上完成。

## 结果分析

经过前一节的使用流程，记录下来 RDK 的系统内的函数调用如下图所示

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/05_tros_dev/image/flame_graph/flame_graph_result.png" alt="在 RDK 上采集并生成的系统函数调用火焰图结果" style={{ width: '100%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} />
