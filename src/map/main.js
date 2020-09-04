import * as Cesium from "cesium/Cesium";
import mars3d from "./mars3d/mars3d";

//汉化原生cesium
import {loadCesiumZH} from "./plugins/class/cesium-zh";

//导航球插件
import "./plugins/navigation/mars3d-navigation.css";
import  "./plugins/navigation/mars3d-navigation";


//地图创建  
export function createMap(id, config) {
  var viewer = mars3d.createMap({
    id: id,
    data: config.map3d,
    serverURL: config.serverURL,
  });

  //汉化
  loadCesiumZH();
  
  initWork(viewer);

  return viewer;
}

//当前页面业务相关
function initWork(viewer) {
    // Cesium 1.61以后会默认关闭反走样，对于桌面端而言还是开启得好，
    viewer.scene.postProcessStages.fxaa.enabled = true;

    // 鼠标滚轮放大的步长参数
    viewer.scene.screenSpaceCameraController._zoomFactor = 2.0;

    // IE浏览器优化
    if (window.navigator.userAgent.toLowerCase().indexOf('msie') >= 0) {
      viewer.targetFrameRate = 20; // 限制帧率
      viewer.requestRenderMode = true; // 取消实时渲染
    }

    // 禁用默认的实体双击动作。
    viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);

    // 二三维切换不用动画
    if (viewer.sceneModePicker) { viewer.sceneModePicker.viewModel.duration = 0.0; }


}