import React, { Component } from 'react'
import "./dashboard.css";
class WidgetText extends Component {
    render() {
        return (
            <div>
                <div className="widgetwrap">
                    <div className="widgetTitle">{this.props.title}</div>
                
                <div className="widgetvalue">
                  <div className="value">{this.props.value}</div>
                  <div className="description"></div>
                </div>
                </div>
            </div>
        )
    }
}

export default WidgetText
