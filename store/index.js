import createStore from 'storeon';

import user from './user';

export const store = createStore([
  user,
  process.env.NODE_ENV !== 'production' && require('storeon/devtools/logger')
]);
