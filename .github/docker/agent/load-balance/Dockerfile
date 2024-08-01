# 该镜像需要依赖的基础镜像
FROM apache/skywalking-java-agent:8.13.0-java17
# 设置环境变量
ENV TZ=Asia/Shanghai JAVA_OPTS="-Dfile.encoding=utf-8"
# 设置 agent 配置信息
ENV SW_AGENT_COLLECTOR_BACKEND_SERVICES="-Dskywalking.collector.backend_service=121.36.200.70:11800" \
    SW_AGENT_NAME="-Dskywalking.agent.service_name=TimeGenie::load-balance"
# 调整时区 确保容器内的时间与主机系统或预期的时区一致，方便日志记录和调试
RUN rm -f /etc/localtime \
&& ln -sv /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
&& echo "Asia/Shanghai" > /etc/timezone
# 设置工作目录
WORKDIR /app
# 将当前目录下的jar包复制到docker容器的/目录下
ADD ./code/backend/load-balance/target/load-balance-0.0.1-SNAPSHOT.jar /app/
# 设置环境变量
ENV NACOS_SERVER_ADDR=${NACOS_SERVER_ADDR}
ENV LOAD_BALANCE_PORT=${LOAD_BALANCE_PORT} 
# 指定docker容器启动时运行jar包
ENTRYPOINT exec java ${JAVA_OPTS} -javaagent:/skywalking/agent/skywalking-agent.jar ${SW_AGENT_COLLECTOR_BACKEND_SERVICES} ${SW_AGENT_NAME} -jar load-balance-0.0.1-SNAPSHOT.jar
# 指定维护者的名字
MAINTAINER horizon22