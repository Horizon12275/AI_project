ide 打开两个窗口 一个打开gpt_python folder 一个打开gptclient folder

首先访问一下https://github.com/chatanywhere/GPT_API_free 领取免费的内测api

然后把gpt_python folder main.py 文件代码这里替换为自己的免费api_key

![image-20240711140626976](/Users/suntianran/Library/Application Support/typora-user-images/image-20240711140626976.png)

在gpt_python folder 终端中

运行

```
pip install openai==0.28 uvicorn langchain-openai langchain fastapi
```

可能还有一些库遗漏的，如果报错 直接pip install 报错信息里缺少的库就可以

然后终端运行：

```
uvicorn main:app --reload
```

接着打开gptclient folder

运行GPTSubtask main 函数 与 GPTReminder main 函数 即可得到结果

