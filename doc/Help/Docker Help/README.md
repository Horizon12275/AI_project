## Ubuntu22.04 安装 Docker Engine

- 根据官方文档，并结合 mobaxterm 的文本编辑器和文件上传进行安装（其中有步骤有问题） https://docs.docker.com/engine/install/ubuntu/

- 安装工具和 GPG key

```bash
    sudo apt-get install ca-certificates curl gnupg lsb-release

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

- 这里可能会连不上 要配代理，然后虚拟机里进入 gpg 目录下载即可

- 更改 apt list 里的文件 docker.list、变成清华源、手动下载然后更改名字、然后再移动到对应的 apt keyring 的目录，还可能要修改权限（虚拟机的话可以开超级权限的控制台）

## Add Docker's official GPG key:

sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

- 注意这里好像是.asc 文件，需要手动调整一下：而且好像没有办法通过 curl -fssl 直接下载这个 gpg 文件，只能手动下载然后移动到对应的目录下面

- 方法：ctrl + 左键点击这个链接、然后把这个文件下载到本地、然后把这个文件名改成 docker.asc、然后移动到/etc/apt/keyrings/目录下面

- # Add the repository to Apt sources:

- 控制台输入以下指令，其中这个 https 是清华源（这个源只是 apt 的源、不是 dockerhub 的源、所以后面的 dockerhub 的源还需要额外配置）

```bash
echo \
 "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu \
 $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
 sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

- 这里也是 asc 文件、需要手动调整一下（和一开始下载的密钥文件格式一样、如果上面是 gpg 文件、这里也是 gpg 文件，如果上面是 asc 文件、这里也是 asc 文件）

- 配置好上面的之后 根据官方文档 输入下方指令进行下载

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

- 可以 su root 进入超级权限控制台（因为 docker 需要 root 权限）

- sudo usermod -aG docker <用户名>

- 安装好之后、好像还会有域名解析的问题，应该是被 dockerhub 被墙掉了的原因

- docker pull dockerhub.icu/library/hello-world 所以要把这个 pull 后面的地址加上一个指定的前缀 这里是 dockerhub.icu/

- 容器内的端口其实是不对外开放的、所以要进行端口映射

- 可以在 springboot 里面通过 ssh 配置远程的 docker 服务器、然后进行远程的 docker 操作，就相当于我在本地操作构建部署、生成 jar 包之后、然后我编写对应的 dockerfile、他能一键在服务器上就能部署最新版本的 jar 包

![alt text](image.png)

## 配置所有可用的 dockerhub 源镜像

https://github.com/cmliu/CF-Workers-docker.io/issues/8

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<EOF
{
    "registry-mirrors": [
        "https://hub.uuuadc.top",
        "https://docker.anyhub.us.kg",
        "https://dockerhub.jobcher.com",
        "https://dockerhub.icu",
        "https://docker.ckyl.me",
        "https://docker.awsl9527.cn"
    ]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 设置容器日志大小

```bash
# vim /etc/docker/daemon.json

{
"log-driver":"json-file",
"log-opts": {"max-size":"500m", "max-file":"3"}
}

sudo systemctl daemon-reload
sudo systemctl restart docker
```

- max-size=500m，意味着一个容器日志大小上限是 500M，

- max-file=3，意味着一个容器有三个日志，分别是 id+.json、id+1.json、id+2.json。

## 也可以不设置，操作示例（根据实际需要替换对应的镜像）：

- 就是在每次操作前面都加上 dockerhub.icu/，然后后面的镜像地址就是 dockerhub 的地址，就是从这个地址源拉取镜像

```bash

1. 拉取镜像

docker pull dockerhub.icu/library/alpine:latest

2. 重命名镜像

docker image tag dockerhub.icu/library/alpine:latest library/alpine:latest

3. 删除镜像

docker rmi dockerhub.icu/library/alpine:latest

```

## 常见指令

- 也可以直接跟着官方文档操作，或者 https://www.itbaima.cn/document/zj9uvg0sp3b0sok8 这里面讲得也很清楚，下面就是自己记一下常用的指令

- 查看所有容器

```bash
docker ps -a
```

- 查看所有镜像

```bash
docker images
```

- 运行指定容器

```bash
docker run -d -p 8080:8080 --name <container_name> <image_name>
```

-（这里的端口是映射对，就是还需要去安全组里配置开放规则）

- 删除指定容器

```bash
docker rm <container_id/container_name>
```

## 配置服务器监控

https://blog.csdn.net/qq_37688023/article/details/106532101

- （服务器）netstat -anpt 查看监听端口情况

- 然后这里我设置安全组之后、可能会连不上、可能要关代理

- prometheus 里的 yml 文件需要自己配置 ip 地址，不要忘记了

- 然后这里理论上是在服务器上运行 node_exporter，然后在本地使用 prometheus 和 grafana 进行监控

- （本地）grafana 通过浏览器 localhost:3000 访问，然后默认账号密码是 admin admin

- （本地）prometheus 通过浏览器 localhost:9090 访问

- docker run -d -p 9100:9100 prom/node-exporter
