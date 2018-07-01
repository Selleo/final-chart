'use strict';

var _index = require('../index');

var base = function base(state, props) {
  return state.set('title.text', null).set('chart.type', props.chart.type).set('plotOptions.series.stacked', props.chart.stacked);
};

var series = function series(state) {
  return state.set('series', []);
};

var initState = {};

var props = {
  chart: {
    type: 'pie',
    stacked: true
  }
};

describe('pipe', function () {
  test('base and series', function () {
    expect((0, _index.pipe)(base, series)(initState, props)).toMatchSnapshot();
  });
});