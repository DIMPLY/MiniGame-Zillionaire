# 谁是大富翁
1. 克隆到本地
2. 保证本地电脑与测试手机接入同一局域网，并修改项目根目录下index.html中header里的javascript代码，使得pwd变量值为`“http://[本地电脑在局域网中的ip]:8000/”`
3. 在本地安装nodejs（我用的版本号0.10.33）http://nodejs.org/dist/v0.10.33/
并在项目根目录下运行`node ex-server.js`
4. 手机访问`http://[本地电脑在局域网中的ip]:8000/`
