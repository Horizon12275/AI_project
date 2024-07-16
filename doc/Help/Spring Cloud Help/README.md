# Spring Cloud Alibaba

## Nacos

- 一个分布式服务管理中心 主要用于各个微服务的注册管理
-  nacos 主要是一个管理工具 如果纳入版本管理会导致很多不必要的日志文件变动 因此我在我的分支里 gitignore 了 nacos 文件夹
- 具体步骤：下载我群里发的文件 将 nacos 文件夹放入 backend 文件夹下 修改 startup.cmd 文件中的 set MODE="cluster"为 set MODE="standalone" 然后配置一个 spring 脚本 具体可见视频https://www.bilibili.com/video/BV1AL4y1j7RY?p=20&vd_source=afe773a10ce28a886979173e5e8bfc2d 的第 20P 5分30秒处 部署完毕后 以后要启动后端都需要先运行nacos脚本 然后运行各个模块的服务 才可以正常注册服务并运行
