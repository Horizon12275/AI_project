### 在服务器上用 docker 部署 nacos

- 参考文章 https://nacos.io/zh-cn/docs/quick-start-docker.html

#### 1. 下载 nacos-docker 项目

```bash
git clone https://github.com/nacos-group/nacos-docker.git
cd nacos-docker
```

#### 2. 单机模式 Derby 数据库

- 其中的 -d 参数是后台运行的意思
- 运行

```bash
docker-compose -f example/standalone-derby.yaml up -d
```

- 查看目前运行的容器

```bash
docker ps -a
```
