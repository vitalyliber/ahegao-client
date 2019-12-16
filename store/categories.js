import axios from 'axios';

const initState = {
  categories: { list: [] }
};

export default store => {
  store.on('@init', () => initState);

  store.on('categories/set', ({ categories }, { list }) => {
    return { categories: { ...categories, list } };
  });
};
