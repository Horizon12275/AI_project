#这里的端口也要设置环境变量
docker pull horizon12275/event-service:latest
docker rm -f event-service||true&&docker run  --name=event-service -d -p 8083:8083 horizon12275/event-service:latest
docker image prune -af