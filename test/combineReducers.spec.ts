import { expect } from 'chai';
import { Record } from 'immutable';

import combineReducers from '../src/combineReducers';

describe('combineReducers', () => {
  it('should return a Record with the same keys as the schema', () => {
    const combinedReducer = combineReducers({
      a: (state: string = '') => '<a>',
      b: (state: number = 1) => 2,
    });
    expect(combinedReducer).to.be.a('function');

    const newState = combinedReducer(undefined, { type: 'TEST' });
    expect(newState).to.be.an.instanceof(Record);
    expect(newState).to.have.property('a', '<a>');
    expect(newState).to.have.property('b', 2);
  });
});
