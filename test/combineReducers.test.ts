import { Record } from 'immutable';

import combineReducers from '../src/combineReducers';

describe('combineReducers', () => {
  it('should return a Record with the same keys as the schema', () => {
    const combinedReducer = combineReducers({
      a: (_state: string = '') => '<a>',
      b: (_state: number = 1) => 2,
    });
    expect(typeof combinedReducer).toBe('function');

    const newState = combinedReducer(undefined, { type: 'TEST' });
    expect(newState).toBeInstanceOf(Record);
    expect(newState).toHaveProperty('a', '<a>');
    expect(newState).toHaveProperty('b', 2);
  });
});
