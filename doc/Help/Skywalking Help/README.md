## 基于 docker 构建 skywalking 环境

0. 基本概念：

   - skywalking agent 和业务系统绑定在一起，负责收集各种监控数据。
   - skywalking oapservice 是负责处理监控数据的，比如接受 skywalking agent 的监控数据，并存储在数据库中;接受 skywalking webapp 的前端请求，从数据库查询数据，并返回数据给前端。
   - Skywalking oapservice 通常以集群的形式存在。
   - skywalking webapp，前端界面，用于展示数据。
   - 用于存储监控数据的数据库，比如 mysql、elasticsearch 等。

https://juejin.cn/post/7250317954993619000#heading-1

1. 下载镜像

```bash
docker pull elasticsearch:7.9.0
docker pull apache/skywalking-oap-server:8.9.1
docker pull apache/skywalking-ui:8.9.1
```

### Elasticsearch

1. 本机创建持久化目录

```bash
mkdir -p /home/data/elasticsearch/data
mkdir -p /home/data/elasticsearch/logs

chmod 777 /home/data/elasticsearch/data
chmod 777 /home/data/elasticsearch/logs
```

2. 启动 ES7

```bash
docker run -d --name=es7 \
--restart=always \
-p 9200:9200 -p 9300:9300 \
-e "discovery.type=single-node" \
-v /home/data/elasticsearch/data:/usr/share/elasticsearch/data \
-v /home/data/elasticsearch/data:/usr/share/elasticsearch/logs \
elasticsearch:7.9.0
```

### skywalking-oap-server

1. 启动 skywalking-oap-server

```bash
docker run --name oap --restart=always -d \
-e TZ=Asia/Shanghai \
-p 12800:12800 \
-p 11800:11800 \
--link es7:es7 \
-e SW_STORAGE=elasticsearch \
-e SW_STORAGE_ES_CLUSTER_NODES=es7:9200 \
apache/skywalking-oap-server:8.9.1
```

2. 登录容器

```bash
docker exec -it oap bash
```

3. 登出容器

```bash
exit
```

### skywalking-ui

1. 启动 skywalking-ui

```bash
docker run -d --name skywalking-ui \
--restart=always \
-e TZ=Asia/Shanghai \
-p 8088:8080 \
--link oap:oap \
-e SW_OAP_ADDRESS=oap:12800 \
apache/skywalking-ui:8.9.1
```

2. 访问地址

```bash
http://localhost:8088
```
