import React from "react";
import "cesium/Widgets/widgets.css";
import * as Cesium from "cesium/Cesium";
import "./map/mars3d/mars3d.css";
import mars3d from "./map/mars3d/mars3d";
import { getMapConfig, getPoint } from "./map/api";
import { createMap } from "./map/main";

import "./cesiumContainer.css";

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      mapDivId: "mapView",
      mainMap: null,
      postInit: true,
      activeNav: "",
      activePage: "综合信息"
    };
  }

  componentDidMount() {
    getMapConfig().then(data => {
      var viewer = createMap("mapView", data);
      this.addPointToMap(viewer);
    });
  }

  //添加点数据  示例
  addPointToMap(viewer) {
    getPoint().then(data => {
      var dataSource = new Cesium.CustomDataSource();
      viewer.dataSources.add(dataSource);

      for (var item of data.Data) {
        var position = Cesium.Cartesian3.fromDegrees(item.JD, item.WD, 2);

        //添加实体
        var entity = dataSource.entities.add({
          name: item.JC,
          position: position,
          point: {
            //像素点
            color: Cesium.Color.fromCssColorString("#3388ff"),
            pixelSize: 10,
            outlineColor: Cesium.Color.fromCssColorString("#ffffff"),
            outlineWidth: 2,
            scaleByDistance: new Cesium.NearFarScalar(1000, 1, 1000000, 0.1)
          },
          label: {
            text: item.JC,
            font: "16px 楷体",
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            fillColor: Cesium.Color.AZURE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            pixelOffset: new Cesium.Cartesian2(0, -10), //偏移量
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
              0.0,
              200000
            )
          },
          data: item,
          click: function (entity) {
            //单击回调
            alert("您单击了：" + entity.data.JC);
          }
        });
      }
    });
  }

  componentWillUnmount() {

  }

  componentDidUpdate() {
    console.log("component did update!");
  }


  render() {
    let mapStyle = { height: "100%", width: "100%" };
    return (
      <React.Fragment>
        <div id="cesiumContainer" className="itemContainer bg-gis collapsed">
          <div id="mapView" style={mapStyle} className="appmap" />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
