#这里的端口也要设置环境变量
docker pull horizon12275/user-service:latest
docker rm -f user-service||true&&docker run  --name=user-service -d -p 8082:8082 horizon12275/user-service:latest
docker image prune -af