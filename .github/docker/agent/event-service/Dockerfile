# 该镜像需要依赖的基础镜像
FROM apache/skywalking-java-agent:9.3.0-java17
# 设置环境变量
ENV TZ=Asia/Shanghai JAVA_OPTS="-Dfile.encoding=utf-8"
# 设置 agent 配置信息
ENV SW_AGENT_COLLECTOR_BACKEND_SERVICES="-Dskywalking.collector.backend_service=121.36.200.70:11800" \
    SW_AGENT_NAME="-Dskywalking.agent.service_name=TimeGenie::event-service"
# 调整时区 确保容器内的时间与主机系统或预期的时区一致，方便日志记录和调试
RUN rm -f /etc/localtime \
&& ln -sv /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
&& echo "Asia/Shanghai" > /etc/timezone
# 设置工作目录
WORKDIR /app
# 将当前目录下的jar包复制到docker容器的/目录下
ADD ./code/backend/event-service/target/event-service-0.0.1-SNAPSHOT.jar /app/
# 设置环境变量
ENV DB2_URL=${DB2_URL}
ENV DB2_USERNAME=${DB2_USERNAME}
ENV DB2_PASSWORD=${DB2_PASSWORD}
ENV NACOS_SERVER_ADDR=${NACOS_SERVER_ADDR}
ENV EVENT_SERVICE_PORT=${EVENT_SERVICE_PORT}
ENV USER_SERVER_IP=${USER_SERVER_IP}
# 指定docker容器启动时运行jar包
ENTRYPOINT exec java ${JAVA_OPTS} -javaagent:/skywalking/agent/skywalking-agent.jar ${SW_AGENT_COLLECTOR_BACKEND_SERVICES} ${SW_AGENT_NAME} -jar event-service-0.0.1-SNAPSHOT.jar
# 指定维护者的名字
MAINTAINER horizon22