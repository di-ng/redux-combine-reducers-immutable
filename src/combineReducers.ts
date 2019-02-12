import { Map, Record } from 'immutable';
import { Action, AnyAction, Reducer, ReducersMapObject } from '../types/redux';

export type RecordState<S> = Readonly<S> & Map<keyof S, S[keyof S]>;

function objectKeys<T extends object>(obj: T): [keyof T] {
  // Not sure why TypeScript uses string[] as the return type of Object.keys?
  // This one is more correct
  return Object.keys(obj) as [keyof T];
}

// Constructs an error message for the case where a reducer returns undefined.
function getErrorMessage(key: string, action: Action): string {
  const actionType: string = action && action.type;
  const actionName: string =
    (actionType && `"${actionType.toString()}"`) || 'an action';

  return (
    `Reducer "${key}" returned undefined handling ${actionName}. ` +
    'To ignore an action, you must explicitly return the previous state.'
  );
}

function getDefaultState<S, A extends Action>(
  reducers: ReducersMapObject<S, A>,
): S {
  const keys = objectKeys(reducers);
  const defaultState: any = {};
  // Run each reducer with an emtpy object to initialize the state
  keys.forEach(key => {
    const reducer = reducers[key];
    defaultState[key] = reducer(undefined, {} as any);
  });
  return defaultState;
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single Immutable state Record, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @template S Combined state object type.
 *
 * @param reducers An object whose values correspond to different reducer
 *   functions that need to be combined into one. One handy way to obtain it
 *   is to use ES6 `import * as reducers` syntax. The reducers may never
 *   return undefined for any action. Instead, they should return their
 *   initial state if the state passed to them was undefined, and the current
 *   state for any unrecognized action.
 *
 * @returns A reducer function that invokes every reducer inside the passed
 *   object, and builds an Immutable Record state object with the same shape.
 */
export default function combineReducersImmutably<
  S,
  A extends Action = AnyAction
>(reducers: ReducersMapObject<S, A>): Reducer<RecordState<S>, A> {
  const defaultStateObj = getDefaultState(reducers);
  // tslint:disable-next-line:variable-name
  const AnonymousStateRecord = Record(defaultStateObj);
  const defaultState = new AnonymousStateRecord() as RecordState<S>;

  return function combination(
    state: RecordState<S> = defaultState,
    action: A,
  ): RecordState<S> | never {
    return state.withMutations(s => {
      const keys = objectKeys(reducers);
      keys.forEach(key => {
        const reducer = reducers[key];
        const newState = reducer(s.get(key), action);
        if (typeof newState === 'undefined') {
          // Catch possibly accidental missing 'default' case in reducer code
          throw new Error(getErrorMessage(key as string, action));
        }
        s.set(key, newState);
      });
      return s;
    }) as RecordState<S>;
  };
}
