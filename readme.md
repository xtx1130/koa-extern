## koa-extend
> 对koa进行扩展，分离router和controller，支持async，舍弃koa-convert

### 1.简介

1.拆分开koa-router的router和controller，分别用一个js文件（router.js和controller/index.js）进行管理，分开管理router和controller，
让这两部分的分工更加明确  
2.重新定义router，单独拎出来一级路由和其他路由，为一级路由开辟单独的workspace。更加适合大型项目选型  
3.重点放在router和controller中，弱化view和model层，架构会拆分开一级路由，而一级路由里面的整体架构这个项目不会care，给每个一级路由更大的自主权  
4.重构koa.use方法，删掉koa-convert包引用，为将要到来的node v8.x的lts做准备  
5.扩展koa-router,底层加入router数组和controller数组对中间件的注册绑定进行管理，而外部暴露出来的增删改查均和配置文件的key有关，人为无法直接
对底层的数组进行操作，只能通过key来操作与绑定中间件  
6.每个一级路由下分别有各自的router和controller配置文件，团队负责不同路由下面页面开发时互不干扰。  
7.koa底层加入rpc调用并维护一个公用的数据json，作为每个一级路由公用数据调用通道  
8.本项目剥离业务层，所以本地环境对debug-log的支持仅限于controller，router和底层均用assert直接抛出  
9.项目完成后，会加入cli构建，开发过程中每个模块的代码均需要在test/目录下写测试用例  