import createStore from 'storeon';

import user from './user';
import categories from './categories';
import ui from './ui';

export const store = () => createStore([
  user,
  categories,
  ui,
  process.env.NODE_ENV !== 'production' && require('storeon/devtools/logger')
]);
