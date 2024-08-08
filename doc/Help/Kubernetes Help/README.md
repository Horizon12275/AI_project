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

#### 安装

https://blog.csdn.net/m0_51510236/article/details/136329885?ydreferer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8%3D

```bash
sudo vi /etc/hosts

#k8s
192.168.0.226 k8s-control-plane
192.168.0.106 k8s-worker01
192.168.0.212 k8s-worker02
```

```bash
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

# 设置所需的 sysctl 参数，参数在重新启动后保持不变
cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.bridge.bridge-nf-call-ip6tables = 1
net.ipv4.ip_forward                 = 1
EOF

# 应用 sysctl 参数而不重新启动
sudo sysctl --system
```

```bash
lsmod | grep br_netfilter
lsmod | grep overlay

sysctl net.bridge.bridge-nf-call-iptables net.bridge.bridge-nf-call-ip6tables net.ipv4.ip_forward
```

```bash
sudo tar -zxvf cri-containerd-cni-1.7.13-linux-amd64.tar.gz -C /

containerd -v

sudo mkdir /etc/containerd

containerd config default | sudo tee /etc/containerd/config.toml

sudo vi /etc/containerd/config.toml

sudo systemctl enable --now containerd


```

```bash
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gpg
```

```bash
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

apt-cache madison kubelet kubeadm kubectl

sudo apt-get update
sudo apt-get install -y kubelet=1.28.7-1.1 kubeadm=1.28.7-1.1 kubectl=1.28.7-1.1
sudo apt-mark hold kubelet kubeadm kubectl
sudo apt-mark unhold kubelet kubeadm kubectl

kubeadm version

systemctl enable kubelet --now

sudo systemctl restart containerd

sudo kubeadm init \
--apiserver-advertise-address=192.168.0.226 \
--image-repository=registry.aliyuncs.com/google_containers \
--kubernetes-version=v1.28.7 \
--service-cidr=10.96.0.0/12 \
--pod-network-cidr=10.244.0.0/16 \
--cri-socket=unix:///run/containerd/containerd.sock

```

本机执行

```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

从节点执行

```bash
kubeadm join 192.168.0.226:6443 --token j9lqkf.fwqmjaf8sdwidtzg \
        --discovery-token-ca-cert-hash sha256:eaf5923db265465eea402dc7ed14724e2bbee7721ddda324907b4ad96b2a4006 \
        --cri-socket=unix:///var/run/containerd/containerd.sock
```

```bash
kubectl get nodes -o wide

kubectl get all -o wide
```

#### 安装网络插件 Calico

```bash
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.27.2/manifests/tigera-operator.yaml

kubectl create -f tigera-operator.yaml

kubectl delete -f tigera-operator.yaml
```

所有 kubectl 貌似只在 master 节点上执行

```bash
# 下载客户端资源文件
curl -LO https://raw.githubusercontent.com/projectcalico/calico/v3.27.2/manifests/custom-resources.yaml
# 修改pod的网段地址
sed -i 's/cidr: 192.168.0.0/cidr: 10.244.0.0/g' custom-resources.yaml

kubectl create -f custom-resources.yaml

kubectl delete -f custom-resources.yaml

watch kubectl get all -o wide -n calico-system

```

containerd 也要配置镜像源
在/etc/containerd/config.toml 中添加如下内容

```bash
 [plugins."io.containerd.grpc.v1.cri".registry]
      [plugins."io.containerd.grpc.v1.cri".registry.mirrors] #主要在这下面配置镜像加速服务
       [plugins."io.containerd.grpc.v1.cri".registry.mirrors."docker.io"]
        endpoint=["https://hub.uuuadc.top","https://docker.anyhub.us.kg","https://dockerhub.jobcher.com","https://dockerhub.icu","https://docker.ckyl.me","https://docker.awsl9527.cn"]
       [plugins."io.containerd.grpc.v1.cri".registry.mirrors."registry.k8s.io"]
        endpoint=["https://k8s.m.daocloud.io", "https://docker.mirrors.ustc.edu.cn","https://hub-mirror.c.163.com"]
```

重启 containerd

```bash
systemctl restart containerd

systemctl daemon-reload
systemctl restart containerd.service
```

查看

```bash
   crictl info
```

```bash
kubectl get services --all-namespaces

watch kubectl get all -o wide -n monitoring

watch kubectl get all -o wide -n kubernetes-dashboard

watch kubectl get all -o wide -n kube-system

watch kubectl get all -o wide -n user-service

watch kubectl get all -o wide -n event-service

watch kubectl get all -o wide -n load-balance

kubectl taint nodes ecs-c9ec node-role.kubernetes.io/master-

kubectl get pods --all-namespaces -o wide

kubectl -n kubernetes-dashboard create token admin-user

kubectl apply -f k8s_yml/

kubectl delete -f k8s_yml/

kubectl logs user-service-deployment-6b94bf89c6-9dxzk -c user-service -n user-service

kubectl logs event-service-deployment-6b94bf89c6-9dxzk -c event-service -n event-service

kubectl logs load-balance-deployment-85dbffd58f-69kvl -c load-balance -n load-balance

docker run -d \
  --name apm-server \
  -v /root/elk/apm-server.docker.yml:/usr/share/apm-server/apm-server.yml \
  -p 8200:8200 \
  elastic/apm-server:7.5.1



```
