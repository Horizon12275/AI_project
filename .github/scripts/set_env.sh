# MySQL 数据库配置
export DB1_URL=${{secrets.DB1_URL}}
export DB1_USERNAME=${{secrets.DB1_USERNAME}}
export DB1_PASSWORD=${{secrets.DB1_PASSWORD}}

# Supabase 云端数据库配置
export DB2_URL=${{secrets.DB2_URL}}
export DB2_USERNAME=${{secrets.DB2_USERNAME}}
export DB2_PASSWORD=${{secrets.DB2_PASSWORD}}

# Nacos 服务注册中心配置
export NACOS_SERVER_ADDR=${{secrets.NACOS_SERVER_ADDR}}

# 端口设置
export USER_SERVICE_PORT=${{secrets.USER_SERVICE_PORT}}
export EVENT_SERVICE_PORT=${{secrets.EVENT_SERVICE_PORT}}

# 各个服务ip设置
export USER_SERVER_IP=${{secrets.USER_SERVER_IP}}