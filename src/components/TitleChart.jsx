import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/lines';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/radar';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/graphic';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/visualMap';
class TitleChart extends Component {

  // constructor(props) {
  //   super(props);
  // };

  componentDidMount() {
    this.chart = echarts.init(this.chartDiv);
    if(this.props.getChart){
      this.props.getChart(this.chart);
    }

    this.chart.setOption(this.props.option);
  }
  componentWillUnmount() {
    this.chart.clear();
    this.chart.dispose();
    this.chartDiv = null;
  };

  componentWillReceiveProps(nextProps) {
    if (this.chart) {
      this.chart.resize();
      if (!R.equals(nextProps, this.props)) {
        this.chart.setOption(nextProps.option);
      }else{
        if(this.props.autoAnimate){
          let tempOp = this.chart.getOption();
          this.chart.clear();
          this.chart.setOption(tempOp);
        }
        
      }
    }
  }
  render() {
    return (
      <div style={this.props.style} className = {this.props.className}>
        <div style={{fontSize:"18px",width:'100%',fontFamily:'Microsoft Yahei',float:'left'}}>
          {this.props.title}<span style={{fontSize:"14px"}}>{this.props.unit}</span>
        </div>
        <div style={{width:'100%',height:'100%',paddingTop:"25px"}} ref={(node)=>{this.chartDiv=node;}}>
        </div>
      </div>
    );
  }
};

TitleChart.propTypes = {
  option: PropTypes.object.isRequired
}

export default TitleChart;
