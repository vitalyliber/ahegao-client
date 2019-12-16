import createStore from 'storeon';

import user from './user';
import categories from './categories';

export const store = () => createStore([
  user,
  categories,
  process.env.NODE_ENV !== 'production' && require('storeon/devtools/logger')
]);
