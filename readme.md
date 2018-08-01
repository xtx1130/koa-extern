## koa-extend
> 对koa进行扩展，分离router和controller，支持async，舍弃koa-convert , 开发[note](https://github.com/xtx1130/koa-extern/blob/master/note)  

[![Build Status](https://travis-ci.org/xtx1130/koa-extern.svg?branch=master)](https://travis-ci.org/xtx1130/koa-extern)
[![Coverage Status](https://coveralls.io/repos/github/xtx1130/koa-extern/badge.svg?branch=master)](https://coveralls.io/github/xtx1130/koa-extern?branch=master)
### 1.简介

+ 拆分开koa-router的router和controller，分别用一个js文件（router.js和controller/index.js）进行管理，分开管理router和controller，
让这两部分的分工更加明确  
+ 重新定义router，单独拎出来一级路由，为一级路由开辟单独的workspace。更加适合大型项目选型  
+ 重点放在router和controller中，弱化view和model层，一级路由里面的整体架构这个项目不会care，给每个一级路由更大的自主权  
+ ~~重构koa.use方法，删掉koa-convert包引用，为将要到来的node v8.x的lts做准备~~  
+ 扩展koa-router,底层加入router Map和controller Map对中间件的注册绑定进行管理，而外部暴露出来的增删改查均和配置文件的key有关，人为无法直接
对底层的Map进行操作，只能通过key来操作与绑定中间件  
+ 每个一级路由下分别有各自的router和controller配置文件，整体团队负责不同路由下面的页面开发时互不干扰  
+ koa底层加入request，作为每个一级路由公用数据调用通道（已加入koa2-request-middleware）  
+ 本项目剥离业务层，所以本地环境对除虫模式的支持仅限于controller，router和底层错误均用assert直接抛出  
+ 项目完成后，会加入cli构建，开发过程中每个模块的代码均需要在/test目录下写测试用例（TO DO）

### 2.文件目录

root----koasConfig.js(config文件)  
      |--test/(测试用例)  
      | |--test/(测试文件)  
      | |--list/(一级路由的一级文件夹)  
      | | |--controller/(controller文件夹)  
      | | | |--index.js(总管一级路由下controller的文件)  
      | | | |--other.js(其他的路由文件，一个路由对应一个文件)  
      | | |--router.js(一级路由下面的二级~n级路由管理文件)  
      | |--movie/(同上)  
      | |--json/(mock接口文件)  
      | |--koasConfig.js(测试用的config文件)  
      |--app/  
      | |--routes/(封装的koa-router)  
      | |--controllers/(c层结构，主要是统一读取routes的function)  
      | |--routes/(router,主要是统一对路由进行处理)  
	  |--deps/(依赖文件)  
      |--index.js(入口文件)  