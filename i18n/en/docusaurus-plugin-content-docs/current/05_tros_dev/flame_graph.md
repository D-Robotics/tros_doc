---
sidebar_position: 4
sidebar_products: RDK-X3,RDK-X5
---

# 5.5.4 Performance Flame Graph

## Introduction

A flame graph is a graphical way to display performance data collected by tools such as perf. It aggregates and analyzes the data to help identify performance hotspots.

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/05_tros_dev/image/flame_graph/flamegraph.png" alt="Flame graph concept diagram for visualizing performance sampling hotspots" style={{ width: '100%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>

Each box in a flame graph represents a function. The width of a box represents its execution time, so wider functions take longer to execute.

Each level higher in the flame graph represents a deeper function call. The top-level functions are leaf functions.

Code repository: (https://github.com/brendangregg/FlameGraph.git)

## Supported Platforms

| Platform    | Runtime Environment |
| ------- | ---------|
| RDK X3, RDK X3 Module, RDK X5, RDK X5 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble)    |
## Preparation

### RDK Platform

1. The flame graph tool consists of two parts. The first part is the `perf` executable. `perf` is a software performance analysis tool used to collect and output function call statistics for the system or a specific process. The RDK operating system already includes `perf` , so you can use it directly.

2. The second part of the flame graph tool is a script that parses perf text output. The script parses the text data collected by perf and generates an SVG function call flame graph for easy observation and analysis.

## Usage

1. Use the `perf record` tool to sample function calls on the RDK system and generate a `perf.data` file.

    ```shell
    root@ubuntu:~# perf record -F 99 -a -g -- sleep 60
    ```

2. Use `perf script` to parse the `perf.data` file and generate `out.perf` .

    ```shell
    root@ubuntu:~# perf script > out.perf
    ```

3. On a PC or RDK, run `git clone https://github.com/brendangregg/FlameGraph.git` , enter the flamegraph directory, and copy the `out.perf` file generated in step 2 into the flamegraph directory. Use `stackcollapse-perf.pl` from the flame graph tool package to collapse `out.perf` into `out.folded` .

    ```shell
    ./stackcollapse-perf.pl out.perf > out.folded
    ```

4. Use `flamegraph.pl` to generate an SVG flame graph.

    ```shell
    ./flamegraph.pl out.folded > flame.svg
    ```

Steps 1 and 2 are performed on the RDK. Steps 3 and 4 can be performed on a PC or RDK.

## Result Analysis

After following the workflow in the previous section, the function calls recorded on the RDK system are shown below.

<img src="https://rdk-doc.oss-cn-beijing.aliyuncs.com/doc/img/05_Robot_development/05_tros_dev/image/flame_graph/flame_graph_result.png" alt="Generated system function-call flame graph collected on RDK" style={{ width: '100%', maxWidth: '980px', height: 'auto', display: 'block', margin: '0 auto' }} /><br/>
