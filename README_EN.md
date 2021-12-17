<p align="center">
<img src="https://cdn.jsdelivr.net/gh/muyao1987/cdn/mars3d.cn/logo.png" width="300px" />
</p>

<p align="center">Mars3d development template based on React template</p>

<p align="center">
<a target="_black" href="https://github.com/marsgis/mars3d">
<img alt="GitHub stars" src="https://img.shields.io/github/stars/marsgis/mars3d?style=flat&logo=github">
</a>
<a target="_black" href="https://www.npmjs.com/package/mars3d">
<img alt="Npm downloads" src="https://img.shields.io/npm/dt/mars3d?style=flat&logo=npm">
</a>
<a target="_black" href="https://www.npmjs.com/package/mars3d">
<img alt="Npm version" src="https://img.shields.io/npm/v/mars3d.svg?style=flat&logo=npm&label=version"/>
</a>
</p>

 [**English**](./README_EN.md) |[**中文**](./README.md) 

 🌎 Mars3D platform, the simplest application project template under the `React technology stack`.
   


 
 

## Run command
 
### Install dependencies before first run
 `npm install` or `cnpm install`
 
### http run project
 `npm run serve`  after run access：`http://localhost:3002/` 

### Package and compile project
 run `npm run build` to build the project. 


### common problem：
 `npm run build` If you experience a memory leak, enter：
```
    npm install -g increase-memory-limit
    increase-memory-limit 
```

 
## Operation effect 
 [online Demo](http://mars3d.cn/project/vue-template/)  

 ![image](http://mars3d.cn/project/vue-template/screenshot.jpg)
 
 
  
## How to integrate into your existing project
1. ### Install the mars3d dependency package
```bash
npm install mars3d   //or  cnpm install mars3d   or  yarn add mars3d
```

2. ### Copy file
 > Scene profile：`public\config\config.json`
  

3. ### configuration vue.config.js 
  Refer to `webpack.config.js`to modify the webpack configuration of your project. You need to install `copy-webpack-plugin` and see the relevant code of `mars3d-cesium`.

4. ### Create earth 
 Refer to the `src\app.js`file to introduce the map components and structures to create the earth. 


5. ### Common problem
 When running an error, please check whether there is any conflict between the related versions, such as webpack 4.43.0 and copy-webpack-plugin 7.0.0

  >1. Check the compatibility between webpack and copy-webpack-plugin versions
  >2. Check whether webpack and copy-webpack-plugin are compatible with Node and NPM versions
 

## What is Mars3D 
>  `Mars3D platform` is [Mars technology](http://marsgis.cn/) a 3D client development platform based on WebGL technology, which is based on [Cesium](https://cesium.com/cesiumjs/) optimization and B / S architecture design,The lightweight and efficient GIS development platform supporting multi industry expansion can run efficiently in the browser without installation and plug-ins, and can quickly access and use a variety of GIS data and three-dimensional models, present the visualization of three-dimensional space, and complete the flexible application of the platform in different industries.

 > Mars3d platform can be used to build 3D GIS applications without plug-ins, across operating systems and across browsers. The platform uses WebGL for hardware accelerated graphics, and realizes real dynamic big data 3D visualization across platforms and browsers. The Mars3D product can quickly realize beautiful and smooth 3D map presentation and spatial analysis on browsers and mobile terminals.

### Related websites 
- Mars3D official website：[http://mars3d.cn](http://mars3d.cn)  

- Mars3D GitHub navigation list：[https://github.com/marsgis/mars3d](https://github.com/marsgis/mars3d)




