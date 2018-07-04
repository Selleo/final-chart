import { pipe } from 'final-chart';
import ReactHighcharts from 'react-highcharts'
import axios from 'axios';
import Papa from 'papaparse';

export const fetchCsv1 = (params) => {
  axios(params)
  .then(res => res.data.replace(/\n\n/g, '\n'))
  .then(csv => Papa.parse(csv, { comments: "#" }))
  .then(console.log)
}

const yAxis = ({left = true} = {}) => ({
  title: {
    text: null
  },
  [!left && 'linkedTo']: 0,
  [!left && 'opposite']: true,
  labels: {
    align: left ? 'left' : 'right',
    x: left ? 6 : -6,
    y: 12,
    format: '{value:.,0f}'
  },
  showFirstLabel: false
});

const base = (state, props) =>
  state
  .set('title.text', null)
  .set('chart.type', props.chart.type)
  .set('plotOptions.series.animation', false)
  .set('plotOptions.series.stacking', props.chart.stacking)
  .merge('legend', {
    align: 'left',
    verticalAlign: 'top',
  })
  .merge('tooltip', {
    shared: true,
    crosshairs: true
  })

const series = state =>
  state
  .set('data', ({
    csvURL: window.location.origin + '/data/analytics.csv',
    beforeParse: csv => csv.replace(/\n\n/g, '\n'),
  }))
  .set('xAxis', {
    tickInterval: 7 * 24 * 3600 * 1000, // one week
    tickWidth: 0,
    gridLineWidth: 1,
    labels: {
      align: 'left',
      x: 3,
      y: -3
    }
  })
  .set('yAxis.0',
    yAxis()
  )
  .set('series.0', {
    name: 'All sessions',
  })
  .set('yAxis.1',
    yAxis({ left: false })
  )
  .set('series.1', {
    name: 'New users',
  })

const pointer = state =>
  state
  .merge('plotOptions.series', {
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
  })

export const chart1 = pipe(base, series, pointer)