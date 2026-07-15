---
sidebar_position: 3
sidebar_products: RDK-X3
---

# 5.5.3 breakpad 使用

## 功能背景

Breakpad 是一个比 Linux core 机制更强大的、用于记录程序崩溃时信息的工具套件，可用来查看被 strip，也就是被剔除了编译器调试信息的应用程序的崩溃信息。在程序崩溃时，将崩溃信息记录在一个小巧的“ minidump” 文件中，将其发送回服务器。并且可以从这些 minidump 和符号文件来生成 C 和 C++堆栈跟踪。

## 前置条件

Breakpad 位于[代码仓库](https://github.com/D-Robotics/breakpad.git)，分支为 develop，目录内包含了经过交叉编译，可在 RDK 上运行的 bin，lib，includes 等文件夹，分别包含了 breakpad 工具，静态链接库，头文件等内容。

## 支持平台

| 平台    | 运行方式     |
| ------- | ------------ |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) |

## 任务内容
### 1. 创建、编译并运行 test 程序
下载源码后，在 Breakpad 目录下新建测试程序 test.cpp，并编译为可执行程序 test，其中要带上 -g 选项。新建目录 /tmp，再运行可执行程序 test

```c++
//  test.cpp

//  包含breakpad核心头文件
#include "client/linux/handler/exception_handler.h"

//  发生crash时的回调函数
static bool dumpCallback(const google_breakpad::MinidumpDescriptor& descriptor,
                          void* context, bool succeeded) {
  printf("Dump path: %s\n", descriptor.path());
  return succeeded;
}

//  crash函数
void crash() { volatile int* a = (int*)(nullptr); *a = 1; }

int main(int argc, char* argv[]) {
  //  初始化 descriptor，设置coredmup文件路径为 /tmp
  google_breakpad::MinidumpDescriptor descriptor("/tmp");
  google_breakpad::ExceptionHandler eh(descriptor, NULL, dumpCallback, NULL,
                                        true, -1);
  crash();
  return 0;
}
```

```shell
root@ubuntu:~/cc_ws/tros_ws/src/tools/breakpad# g++ ./test.cpp -o test -g \
  -I ./include/breakpad/ \
  -L ./lib/ \
  -lbreakpad -lbreakpad_client -lpthread

root@ubuntu:~/cc_ws/tros_ws/src/tools/breakpad# mkdir /tmp
root@ubuntu:~/cc_ws/tros_ws/src/tools/breakpad# ./test
Dump path: /tmp/4113ab89-7169-49df-963945b3-383e8364.dmp
Segmentation fault
```

### 2. 使用 breakpad 生成 dump 文件  

赋予程序可执行权限, 使用 dump_sys 工具把可执行程序 test 的 symbols 信息 dump 为 test.sym 文件

```shell
root@ubuntu:~/cc_ws/tros_ws/src/tools/breakpad# chmod +x ./bin/*
root@ubuntu:~/cc_ws/tros_ws/src/tools/breakpad# ./bin/dump_syms ./test > test.sym
```

查看 test.sym 第一行信息，并新建相关文件夹

```shell
root@ubuntu:~/cc_ws/tros_ws/src/tools/breakpad# head -n1 test.sym
MODULE Linux arm64 3816BF7138E87673BEE70E2C86F5FAC80 test
root@ubuntu:~/cc_ws/tros_ws/src/tools/breakpad# mkdir -p ./symbols/test/3816BF7138E87673BEE70E2C86F5FAC80 
root@ubuntu:~/cc_ws/tros_ws/src/tools/breakpad# cp test.sym ./symbols/test/3816BF7138E87673BEE70E2C86F5FAC80 
```

运行可执行程序 test，生成 minidump.dmp 文件，运行下面的命令，可得到程序的堆栈信息。注意 .dmp 文件名可能不同，这里的是第一步生成的 dmp 文件

```shell
root@ubuntu:~/cc_ws/tros_ws/src/tools/breakpad# ./bin/minidump_stackwalk /tmp/4113ab89-7169-49df-963945b3-383e8364.dmp ./symbols
```

### 3. 分析

 上一节第四步的命令的输出结果如下所示，可以看到程序在 test.cpp 的第 11 行崩溃，符合程序的预期。

```text
Thread 0 (crashed)
  0  test!crash() [test.cpp : 11 + 0x8]
      x0 = 0x0000000000000000    x1 = 0x0000000000000001
      x2 = 0x0000000000000000    x3 = 0x0000000000000001
      x4 = 0x0000005571754448    x5 = 0x0000005571754458
      x6 = 0x000000000000017f    x7 = 0x0000000000000000
      x8 = 0x0000000000000010    x9 = 0x0000000000000000
    x10 = 0x0000000000000000   x11 = 0x0000000000000000
    x12 = 0x0000007fb68d6e48   x13 = 0x0000000000000000
    x14 = 0x0000000000000000   x15 = 0x0000000000000020
    x16 = 0x0000005571753df8   x17 = 0x0000007fb6c5a418
    x18 = 0x0000000000000000   x19 = 0x00000055717333d0
    x20 = 0x0000000000000000   x21 = 0x0000005571710470
    x22 = 0x0000000000000000   x23 = 0x0000000000000000
    x24 = 0x0000000000000000   x25 = 0x0000000000000000
    x26 = 0x0000000000000000   x27 = 0x0000000000000000
    x28 = 0x0000000000000000    fp = 0x0000007ffb82b550
      lr = 0x0000005571710668    sp = 0x0000007ffb82b540
      pc = 0x00000055717105c4
    Found by: given as instruction pointer in context
  1  test!main [test.cpp : 18 + 0x0]
    x19 = 0x00000055717333d0   x20 = 0x0000000000000000
    x21 = 0x0000005571710470   x22 = 0x0000000000000000
    x23 = 0x0000000000000000   x24 = 0x0000000000000000
    x25 = 0x0000000000000000   x26 = 0x0000000000000000
    x27 = 0x0000000000000000   x28 = 0x0000000000000000
      fp = 0x0000007ffb82b550    sp = 0x0000007ffb82b550
      pc = 0x0000005571710668
    Found by: call frame info
  2  libc.so.6 + 0x20d4c
    x19 = 0x00000055717333d0   x20 = 0x0000000000000000
    x21 = 0x0000005571710470   x22 = 0x0000000000000000
    x23 = 0x0000000000000000   x24 = 0x0000000000000000
    x25 = 0x0000000000000000   x26 = 0x0000000000000000
    x27 = 0x0000000000000000   x28 = 0x0000000000000000
      fp = 0x0000007ffb82b700    sp = 0x0000007ffb82b700
      pc = 0x0000007fb68f3d50
    Found by: call frame info
```

## 本节总结

本章节介绍了如何使用 breakpad 框架生成崩溃文件并分析堆栈信息。应用程序通过指定 dump 文件生成的目录，并注册崩溃时的回调函数完成 breakpad 的初始化。
再使用 breakpad 的 dump_syms 工具生成 symbol 文件，同时创建 symbol 目录。最后利用 minidump_stackwalk 工具解析出 dump 文件并分析堆栈信息。

更详细的内容可以参考 breakpad 官方网站：https://chromium.googlesource.com/breakpad/breakpad/
