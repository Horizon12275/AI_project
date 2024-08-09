# 该镜像需要依赖的基础镜像，使用 OpenJDK 17 和 Alpine 基础镜像
FROM openjdk:17-alpine
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
ENV TOMCAT_ACCEPT_COUNT=${TOMCAT_ACCEPT_COUNT}
ENV TOMCAT_MAX_THREAD=${TOMCAT_MAX_THREAD}
ENV TOMCAT_MIN_THREAD=${TOMCAT_MIN_THREAD}
ENV TOMCAT_MAX_CONNECTIONS=${TOMCAT_MAX_CONNECTIONS}
ENV JAVA_OPTS="-Xms256m -Xmx256m -XX:MetaspaceSize=64m -XX:MaxMetaspaceSize=256m"
# 指定docker容器启动时运行jar包
ENTRYPOINT exec java ${JAVA_OPTS} -jar load-balance-0.0.1-SNAPSHOT.jar
# 指定维护者的名字
MAINTAINER horizon22