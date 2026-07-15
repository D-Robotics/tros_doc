---
sidebar_position: 3
sidebar_products: RDK-X3
---

# 5.5.3 Using Breakpad

## Background

Breakpad is a tool suite more powerful than the Linux core mechanism for recording information when a program crashes. It can be used to view crash information from applications that have been stripped of compiler debug information. When a program crashes, crash information is recorded in a compact "minidump" file and sent back to the server. C and C++ stack traces can be generated from these minidumps and symbol files.

## Prerequisites

Breakpad is located in the [code repository](https://github.com/D-Robotics/breakpad.git) on the `develop` branch. The directory contains cross-compiled `bin` , `lib` , `includes` , and other folders that include Breakpad tools, static link libraries, header files, and more, which can run on RDK.

## Supported Platforms

| Platform    | Runtime Environment     |
| ------- | ------------ |
| RDK X3, RDK X3 Module | Ubuntu 20.04 (Foxy), Ubuntu 22.04 (Humble) |

## Task Content
### 1. Create, Compile, and Run the Test Program
After downloading the source code, create a test program `test.cpp` in the Breakpad directory and compile it into the executable `test` with the `-g` option. Create the `/tmp` directory, then run the executable `test` .

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

### 2. Generate a Dump File Using Breakpad

Grant execute permission to the programs, then use the `dump_syms` tool to dump the symbol information of the executable `test` into a `test.sym` file.

```shell
root@ubuntu:~/cc_ws/tros_ws/src/tools/breakpad# chmod +x ./bin/*
root@ubuntu:~/cc_ws/tros_ws/src/tools/breakpad# ./bin/dump_syms ./test > test.sym
```

View the first line of `test.sym` and create the related directories.

```shell
root@ubuntu:~/cc_ws/tros_ws/src/tools/breakpad# head -n1 test.sym
MODULE Linux arm64 3816BF7138E87673BEE70E2C86F5FAC80 test
root@ubuntu:~/cc_ws/tros_ws/src/tools/breakpad# mkdir -p ./symbols/test/3816BF7138E87673BEE70E2C86F5FAC80 
root@ubuntu:~/cc_ws/tros_ws/src/tools/breakpad# cp test.sym ./symbols/test/3816BF7138E87673BEE70E2C86F5FAC80 
```

Run the executable `test` to generate a `minidump.dmp` file. Run the following command to obtain the program stack trace. Note that the `.dmp` filename may differ; here it is the dmp file generated in step 1.

```shell
root@ubuntu:~/cc_ws/tros_ws/src/tools/breakpad# ./bin/minidump_stackwalk /tmp/4113ab89-7169-49df-963945b3-383e8364.dmp ./symbols
```

### 3. Analysis

The output of the command in step 4 of the previous section is shown below. You can see that the program crashed at line 11 of `test.cpp` , which matches the expected behavior.

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

## Summary

This section describes how to use the Breakpad framework to generate crash dump files and analyze stack information. The application initializes Breakpad by specifying the directory for dump file generation and registering a callback function for crashes. Then use Breakpad's `dump_syms` tool to generate symbol files and create the symbol directory. Finally, use the `minidump_stackwalk` tool to parse the dump file and analyze stack information.

For more details, refer to the Breakpad official website: https://chromium.googlesource.com/breakpad/breakpad/
