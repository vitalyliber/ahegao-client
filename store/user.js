import axios from 'axios';

const initState = {
  user: { authorized: false, admin: false, authModalVisible: false }
};

export default store => {
  store.on('@init', () => initState);

  store.on('user/set_local_info', ({ user }, { authorized, admin }) => {
    return { user: { ...user, authorized, admin } };
  });

  store.on('user/showAuthModal', ({ user }, _) => {
    return { user: { ...user, authModalVisible: true } };
  });

  store.on('user/hideAuthModal', ({ user }, _) => {
    return { user: { ...user, authModalVisible: false } };
  });
};
