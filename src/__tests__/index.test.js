import { pipe } from '../index';

const base = (state, props) =>
  state
    .set('title.text', null)
    .set('chart.type', props.chart.type)
    .set('plotOptions.series.stacked', props.chart.stacked);

const series = state =>
  state
    .set('series', []);

const initState = {};

const props = {
  chart: {
    type: 'pie',
    stacked: true,
  }
};

describe('pipe', () => {
  test('base and series', () => {
    expect(pipe(base, series)(initState, props)).toMatchSnapshot();
  });
});
