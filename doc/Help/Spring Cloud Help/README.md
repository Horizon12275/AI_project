# Spring Cloud Alibaba

## Nacos

- 一个分布式服务管理中心 主要用于各个微服务的注册管理
- nacos 主要是一个管理工具 如果纳入版本管理会导致很多不必要的日志文件变动 因此我在我的分支里 gitignore 了 nacos 文件夹
- 具体步骤：下载我群里发的文件 将 nacos 文件夹放入 backend 文件夹下 修改 startup.cmd 文件中的 set MODE="cluster"为 set MODE="standalone" 然后配置一个 spring 脚本 具体可见视频https://www.bilibili.com/video/BV1AL4y1j7RY?p=20&vd_source=afe773a10ce28a886979173e5e8bfc2d 的第 20P 5 分 30 秒处 部署完毕后 以后要启动后端都需要先运行 nacos 脚本 然后运行各个模块的服务 才可以正常注册服务并运行

- 这里跑 nacos 的时候、他默认要求设置 JAVA_HOME 环境变量、如果没有设置的话、会报错，但是我这里如果设置了 JAVA_HOME 环境变量、会导致 react native 的前端无法启动。如何改动呢、就是要自己手动去修改 nacos 的启动脚本、将 JAVA_HOME 的检测去掉。具体步骤如下：
  - 找到 nacos 的启动脚本 startup.cmd
  - 找到如下代码
    ```shell
    if not exist "%JAVA_HOME%\bin\java.exe" echo Please set the JAVA_HOME variable in your environment, We need java(x64)! jdk8 or later is better! & EXIT /B 1
    set "JAVA=%JAVA_HOME%\bin\java.exe"
    ```
  - 编辑一下这段代码就行
