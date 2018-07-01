import immutable from 'object-path-immutable';

export const pipe = (...fns) => (state, props) =>
  fns.reduce((s, fn) => fn(s, props), immutable(state)).value();
