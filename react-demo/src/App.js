import React, { Component } from 'react';

import ReactHighcharts from 'react-highcharts';
import HighchartsData from 'highcharts/modules/data';
import HighchartsSeriesLabel from 'highcharts/modules/series-label';

import './App.css';

HighchartsData(ReactHighcharts.Highcharts);
HighchartsSeriesLabel(ReactHighcharts.Highcharts);

class App extends Component {
  state = {
    chart: {
      type: 'line',
      stacked: false,
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
    const config = {
      chart: {
        type: this.state.chart.type,
      },

      title: {
        text: null,
      },

      data: {
        csvURL: window.location.origin + '/data/analytics.csv',
        beforeParse: function (csv) {
          return csv.replace(/\n\n/g, '\n');
        }
      },

      xAxis: {
        tickInterval: 7 * 24 * 3600 * 1000, // one week
        tickWidth: 0,
        gridLineWidth: 1,
        labels: {
          align: 'left',
          x: 3,
          y: -3
        }
      },

      yAxis: [{ // left y axis
        title: {
          text: null
        },
        labels: {
          align: 'left',
          x: 3,
          y: 16,
          format: '{value:.,0f}'
        },
        showFirstLabel: false
      }, { // right y axis
        linkedTo: 0,
        gridLineWidth: 0,
        opposite: true,
        title: {
          text: null
        },
        labels: {
          align: 'right',
          x: -3,
          y: 16,
          format: '{value:.,0f}'
        },
        showFirstLabel: false
      }],

      legend: {
        align: 'left',
        verticalAlign: 'top',
        borderWidth: 0
      },

      tooltip: {
        shared: true,
        crosshairs: true
      },

      plotOptions: {
        series: {
          animation: false,
          cursor: 'pointer',
          point: {
            events: {
              click: function (e) {
                alert(ReactHighcharts.Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ' sessions');
              }
            }
          },
          marker: {
            lineWidth: 1
          }
        },
        area: {
          [this.state.chart.stacked && 'stacking']: 'normal',
        },
        bar: {
          [this.state.chart.stacked && 'stacking']: 'normal',
        },
      },

      series: [{
        name: 'All sessions',
        lineWidth: 4,
        marker: {
          radius: 4
        }
      }, {
        name: 'New users'
      }]
    }

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
          Stacked
          <input type="checkbox" onChange={this._toggle('stacked')} defaultChecked={this.state.chart.stacked} />
        </div>
        <ReactHighcharts config={config}/>
      </div>
    );
  }
}

export default App;
