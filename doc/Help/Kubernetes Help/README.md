### Notes For Kubernetes

#### 核心概念

- node：一个物理机或者虚拟机
- pod：k8s 最小的单元，一个 pod 可以包含一个或多个容器（最好是一个）
- sidecar：一个 pod 中的辅助容器，可以进行日志收集、监控等
- service：一个 pod 的抽象，可以让多个 pod 共享一个 IP （比如通过 service 的 IP 访问多个 pod 中的数据库）
- 内部服务：service 的类型为 ClusterIP，只能在集群内部访问
- 外部服务：service 的类型为 NodePort 或者 LoadBalancer，可以在集群外部访问
- NodePort：在每个 node 上开放一个端口，通过这个端口可以访问 service
- Ingress：实现域名到 service 的映射（而不是 ip），也可以配置负载均衡、SSL 等
- ConfigMap：配置文件的抽象，可以将配置文件独立出来，方便管理，实现解耦（都是明文的、需要注意安全性）
- Secret：加密的配置文件，比如数据库的密码等（其实只是做了一层 base64 加密），所以也需要注意安全性（需要结合 k8s 的 网络安全、访问控制、身份认证等）
- Volume：pod 的存储，解决容器的生命周期问题（容器重启后数据库中数据丢失），可以将数据持久化到 Volume 中，即挂载到本地磁盘或者网络存储
- Deployment：pod 的管理，可以实现 pod 的自动伸缩、滚动升级等，将多个 pod 组成一个抽象
- 副本控制：指定 pod 的副本数量，k8s 会自动创建或销毁 pod，保证副本数量的一致性
- 滚动更新：通过 Deployment 实现，可以实现 pod 的滚动升级，即先创建新的 pod，然后销毁旧的 pod，实现无缝升级
- StatefulSet：有状态服务的管理，比如数据库、缓存等，可以保证 pod 的唯一性、有序性、持久化等（类似于 Deployment）

#### k8s 的架构

1. master 节点

   - master：集群的控制中心，负责调度、管理、监控等
   - kube-apiserver：提供 RESTful API，是 k8s 集群的入口，所有的操作都会通过 kube-apiserver 进行，比如创建 pod、service 等，也可以鉴权、准入控制等
   - scheduler：负责 pod 的调度，即将 pod 分配到 node 上，实现负载均衡
   - controller-manager：负责控制器的管理，比如 node-controller、replication-controller 等，保证集群的正常运行，监测故障、自动恢复等
   - etcd：保存集群的所有数据，比如 pod、service 等，是一个高可用的分布式键值存储，保证数据的一致性（只包括集群的元数据，不包括实际数据、比如数据库中的数据）
   - cloud-controller-manager：负责集成云服务提供商的 API，比如 AWS、Azure 等，实现集群的自动化操作，比如负载均衡、存储等

2. worker 节点

   - worker：集群的节点，负责运行 pod（worker node 也可以称为 node）
   - 每个 node 在运行时都会运行三个组件：kubelet、kube-proxy、container runtime
   - kubelet：负责 pod 的创建、启动、监控等，并汇报给 apiserver
   - kube-proxy：负责 pod 的网络代理，实现 pod 的网络通信，也负责负载均衡
   - container runtime：负责 pod 中容器的运行，比如 docker-engine、containerd 等（负责拉取镜像、运行容器等，每个 node 上都使用容器运行时来运行容器，所以需要安装）

#### k8s 的安装

- 实际生产环境中使用 k3s

#### k8s cli 的常用指令

#### k8s 的监控

- 使用 portainer，可以监控 k8s 集群的资源使用情况、pod 的运行情况等

- 使用 prometheus，grafana 等、监控其中的后端进程的运行情况

![1](./img/1.png)
