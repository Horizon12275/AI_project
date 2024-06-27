- 没写完呢

- 安装工具和 GPG key

```bash
    sudo apt-get install ca-certificates curl gnupg lsb-release

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

- 这里可能会连不上 要配代理，然后虚拟机里进入 gpg 目录下载即可

- 更改 apt list 里的文件 docker.list、变成清华源、手动下载然后更改名字、然后再移动到对应的 apt keyring 的目录，还可能要修改权限（虚拟机的话可以开超级权限的控制台）

- 可以 su root 进入超级权限控制台

- sudo usermod -aG docker <用户名>

- 安装好之后、好像还会有域名解析的问题，应该是被墙掉了的原因

- docker pull dockerhub.icu/library/hello-world 所以要把这个 pull 后面的地址加上一个指定的前缀 这里是 dockerhub.icu/

- 容器内的端口其实是不对外开放的、所以要进行端口映射

- 可以在 springboot 里面通过 ssh 配置远程的 docker 服务器、然后进行远程的 docker 操作，就相当于我在本地操作构建部署、生成 jar 包之后、然后我编写对应的 dockerfile、他能一键在服务器上就能部署最新版本的 jar 包

![alt text](image.png)
