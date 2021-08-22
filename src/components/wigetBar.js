import React from 'react'
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

function WidgetBar(props) {
    const chartConfigs = {
        type: "bar2d", // The chart type
        width: "100%", // Width of the chart
        height: "200", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
          // Chart Configuration
          chart: {             //Set the chart subcaption
            bgColor: "#2a2a2a",          //Set the x-axis name
            theme: "fusion"                 //Set the theme for your chart
          },
          // Chart Data - from step 2
          data: props.data
        }
      };
    return (
        <div>
        <div className="widgetwrap">
            <div className="widgetTitle">{props.title}</div>
        
        <div className="widgetvalue">
            <ReactFC {...chartConfigs} />
        </div>
        </div>
    </div>
    )
}
export default WidgetBar;
