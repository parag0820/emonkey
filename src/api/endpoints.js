export default {
  AUTH: {
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    LOGOUT: 'auth/logout',
  },

  USER: {
    PROFILE: 'user/profile',
    UPDATE_PROFILE: 'user/update-profile',
  },

  ORDERS: {
    LIST: 'orders',
    DETAILS: id => `orders/${id}`,
    CREATE: 'orders/create',
  },

  CART: {
    ADD: 'cart/add',
    REMOVE: 'cart/remove',
    VIEW: 'cart',
  },
};
