# Combine Reducers Immutable

[![Greenkeeper badge](https://badges.greenkeeper.io/di-ng/redux-combine-reducers-immutable.svg)](https://greenkeeper.io/)

A drop-in replacement for Redux's [combineReducers](https://redux.js.org/api/combinereducers) helper function that returns [Immutable Records](https://immutable-js.github.io/immutable-js/docs/#/Record) instead of JS objects.

```ts
import combineReducers from 'redux-combine-reducers-immutable';

const rootReducer = combineReducers({
  users: usersReducer,
});

// Now you can access your state with dot syntax, while still having Immutable data.
// e.g. getState().users

export rootReducer;

// Note that the TypeScript types work well too!
export type RootAppState = ReturnType<typeof rootReducer>;
```

## Local Development

Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.
