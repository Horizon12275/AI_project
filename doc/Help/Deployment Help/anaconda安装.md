### 服务器安装 anaconda 环境

- cd download

- bash Anaconda3-2024.06-1-Linux-x86_64.sh

- 中间安装的时候都输入 yes、有一步是帮你自动配置环境变量的、然后退出终端、重新打开终端，如果这一步输入了 no，那么就需要切换到 bin 目录下，然后输入：conda init ，然后重启命令行就可以了

- conda create -n xxx python=3.11
