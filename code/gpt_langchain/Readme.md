ide 打开两个窗口 一个打开 gpt_python folder 一个打开 gptclient folder

首先访问一下https://github.com/chatanywhere/GPT_API_free 领取免费的内测 api

然后把 gpt_python folder main.py 文件代码这里替换为自己的免费 api_key

![截屏2024-07-11 14.06.22](/截屏2024-07-11%14.06.22.png)

在 gpt_python folder 终端中

运行

```
pip install uvicorn
pip instal fastapi
pip install langchain==0.2.6
pip install langchain-openai==0.1.15
pip install openai==0.28 (这个最后安装)
```

可能还有一些库遗漏的，如果报错 直接 pip install 报错信息里缺少的库就可以

然后终端运行：

```
uvicorn main:app --reload
```

对于带文档的generate：

`uvicorn rag:app --reload`

接着打开 gptclient folder

运行 GPTSubtask main 函数 与 GPTReminder main 函数 即可得到结果
