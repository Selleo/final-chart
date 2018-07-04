import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import HighchartsData from 'highcharts/modules/data';
import HighchartsSeriesLabel from 'highcharts/modules/series-label';

import './App.css';
import FinalChart from './FinalChart'
import { chart1, fetchCsv1 } from './charts';

HighchartsData(ReactHighcharts.Highcharts);
HighchartsSeriesLabel(ReactHighcharts.Highcharts);

class App extends Component {
  state = {
    params: {
      url: window.location.origin + '/data/analytics.csv',
    },
    chart: {
      type: 'line',
      stacking: false,
    }
  }

  _change = key => ({ target: { value } }) =>
    this.setState({
      ...this.state,
      chart: {...this.state.chart, [key]: value}
    });

  _toggle = key => () =>
    this.setState({
      ...this.state,
      chart: {...this.state.chart, [key]: !this.state.chart[key] }
    });

  render() {
    return (
      <div className="App">
        <h1>Final Chart Demo</h1>
        <div>
          Chart Type
          <select onChange={this._change('type')} value={this.state.chart.type}>
            <option value="area">area</option>
            <option value="bar">bar</option>
            <option value="line">line</option>
          </select>
          Stacking
          <input type="checkbox" onChange={this._toggle('stacking')} defaultChecked={this.state.chart.stacking} />
        </div>
        <ReactHighcharts config={chart1({}, this.state)}/>
        <FinalChart
          config={this.state.chart}
          params={this.state.params}
          configPipe={chart1}
          fetchData={fetchCsv1}
          component={ReactHighcharts}
        />
      </div>
    );
  }
}

export default App;
