# 该镜像需要依赖的基础镜像，使用 OpenJDK 17 和 Alpine 基础镜像
FROM eclipse-temurin:17
# 调整时区 确保容器内的时间与主机系统或预期的时区一致，方便日志记录和调试
RUN rm -f /etc/localtime \
&& ln -sv /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
&& echo "Asia/Shanghai" > /etc/timezone
# 设置工作目录
WORKDIR /app
# 将当前目录下的jar包复制到docker容器的/目录下
ADD ./code/backend/event-service/target/event-service-0.0.1-SNAPSHOT.jar /app/
# 设置环境变量
ENV DB1_URL=${DB1_URL}
ENV DB1_USERNAME=${DB1_USERNAME}
ENV DB1_PASSWORD=${DB1_PASSWORD}
ENV DB2_URL=${DB2_URL}
ENV DB2_USERNAME=${DB2_USERNAME}
ENV DB2_PASSWORD=${DB2_PASSWORD}
ENV NACOS_SERVER_ADDR=${NACOS_SERVER_ADDR}
ENV USER_SERVICE_PORT=${USER_SERVICE_PORT}
ENV EVENT_SERVICE_PORT=${EVENT_SERVICE_PORT}
ENV USER_SERVER_IP=${USER_SERVER_IP}
# 指定docker容器启动时运行jar包
ENTRYPOINT ["java", "-jar","event-service-0.0.1-SNAPSHOT.jar"]
# 指定维护者的名字
MAINTAINER horizon22