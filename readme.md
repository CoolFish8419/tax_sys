首先确保你有npm 
```
npm -v 
```

安装微信开发者工具模拟器  

# 使用 npm 安装 Taro
$ npm install -g @tarojs/cli

# OR 使用 yarn 安装 Taro
$ yarn global add @tarojs/cli

值得一提的是，如果安装过程出现sass相关的安装错误，请在安装 mirror-config-china 后重试。

$ npm install -g mirror-config-china

npm info @tarojs/cli

查看 Taro 版本信息

切换到MyAPP下
```
cd myApp
```
安装依赖
```
yarn
```
生成微信小程序
```
taro build --type weapp --watch
```