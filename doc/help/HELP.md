# 如何配置 react native 环境

    - 查看文档 跟随指引完成大部分步骤https://reactnative.cn/docs/environment-setup
    - 几个踩坑点：
        - 安装android studio的sdk过程中需要开代理
        - 安装sdk步骤中 可以不用和文档里一样安装api34的镜像 选择最新的35也可以 只要勾选上SDK Platform和Intel X86 Atom64 Image的镜像即可 不过我不知道两者有什么具体区别
        可以照着我的勾选：
        ![alt text](image.png)
        ![alt text](image-1.png)
        ![alt text](image-2.png)
        - 添加新的安卓虚拟机 选择API35的镜像即可 我也不知道文档说的tiramisu api33是哪个镜像
        - 如果你和我一样把android studio以及它的sdk路径放在了其他盘而不是默认路径 那么很有可能你会遇到启动虚拟机失败的情况 请参考这个链接 https://zhuanlan.zhihu.com/p/636061626
        - JDK版本最好换成17 要更改jdk的版本 需要修改环境变量 首先JAVA_HOME的环境变量要填写成jdk17的安装路径 且最好写在系统变量里 然后系统变量path中的C:/ProgramData/Oracle/Java/javapath删除 最后把"%JAVA_HOME%\bin"添加到系统变量path中 应该就可以了 终端里输入javac --version查看jdk版本 如果是17就可以了 如果需要更换回原来的jdk版本 只需要修改JVA_HOME这个环境变量指向需要的路径即可
        - 启动react native最简单的方法：先进入文件夹 npm start 然后按a启动安卓应用 第一次会编译很久
        - 想要节省系统盘空间的 和我一样在系统变量里创建一个"GRADLE_USER_HOME" 路径填其他盘的文件 这样gradle的几个g的文件就不会装到默认的c盘了 注意系统变量设置完最好重启一下电脑
    - Mac怎么安装我没有研究过 可能需要自己跟着文档试试了 如果遇到某些问题可以参考上面 有可能是相通的
