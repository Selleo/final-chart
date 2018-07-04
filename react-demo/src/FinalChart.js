import React, { Component } from 'react';
import {Subject} from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

class FinalChart extends Component {
  config = new Subject();
  params = new Subject();

  componentDidMount() {
    this.config
    .pipe(distinctUntilChanged())
    .subscribe(console.log)

    this.params
    .pipe(distinctUntilChanged())
    .subscribe(console.log)

    this.params.next(this.props.params);
    this.config.next(this.props.config);
  }

  componentDidUpdate(prevProps) {
    this.params.next(this.props.params);
    this.config.next(this.props.config);
  }

  render() {
    return (
      <pre>FinalChart</pre>
    );
  }
}

export default FinalChart;
