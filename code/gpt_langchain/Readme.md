ide 打开两个窗口 一个打开 gpt_python folder 一个打开 gptclient folder

首先访问一下https://github.com/chatanywhere/GPT_API_free 领取免费的内测 api

然后把 gpt_python folder main.py 文件代码这里替换为自己的免费 api_key

![截屏2024-07-11 14.06.22](/截屏2024-07-11%14.06.22.png)

在 gpt_python folder 终端中

注：pip 下载太慢 切换一下国内镜像源 
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple

运行

```
pip install uvicorn
pip install fastapi
pip install langchain==0.2.6
pip install langchain-openai==0.1.15
pip install langchain_community
pip install openai==0.28 (这个最后安装)
```

可能还有一些库遗漏的，如果报错 直接 pip install 报错信息里缺少的库就可以

然后终端运行：

```
uvicorn main:app --reload

# (实际部署时使用)
nohup uvicorn main:app --host 0.0.0.0 --port 8000 &
```

对于带文档的 generate：

`uvicorn rag:app --reload`

如果我自己用curl 测试 输入是类似这样的

```
curl -X POST "http://localhost:8000/generate_subtasks" \
     -H "Content-Type: application/json" \
     -d '{
           "event": {
             "title": "Team Meeting",
             "category": "Work",
             "location": "Conference Room",
             "details": "Discuss project progress and next steps.",
             "ddl": "2024-07-30T10:00:00Z"
           },
           "path": "/path/to/your/documents"//会读取一个目录下的所有文件
         }'

```

```
curl -X POST "http://localhost:8000/generate_reminders" \
     -H "Content-Type: application/json" \
     -d '{
           "event": {
             "title": "Team Meeting",
             "category": "Work",
             "location": "Conference Room",
             "details": "Discuss project progress and next steps.",
             "ddl": "2024-07-30T10:00:00Z"
           },
           "path": "/path/to/your/documents"//会读取一个目录下的所有文件
         }'
```

```
对于总结的部分
uvicorn main:app --reload
```

然后我的测试数据格式是这样的

```
curl -X POST "http://127.0.0.1:8000/generate_summary" -H "Content-Type: application/json" -d '{
  "titles": ["Project Meeting", "Code Review", "Client Presentation"],
  "categories": ["Work", "Work", "Work"],
  "details": ["Discuss the project status and next steps", "Review the new code changes and provide feedback", "Present the project progress to the client"]
}'
```

对于吃的部分

```
uvicorn eat:app --reload
```

然后我的测试数据格式

```
curl -X POST "http://127.0.0.1:8000/restaurants" -H "Content-Type: application/json" -d '{"question": "I want to eat something spicy. Can you recommend a restaurant?"}'
```

