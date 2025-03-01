/**
 * Константы маршрутов приложения
 */
export const APP_ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/products/:id',
  AUTH: '/auth',
  PROFILE: '/profile',
  ADMIN: '/admin',
  CART: '/cart',
  CHECKOUT: '/checkout',
  NOT_FOUND: '*'
};

/**
 * Константы ролей пользователей
 */
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'ADMIN'
};

/**
 * Константы статусов заказа
 */
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

/**
 * Константы для пагинации
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  PRODUCTS_PER_PAGE: 12
};

/**
 * Константы для локального хранилища
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  CART: 'cart'
};

/**
 * Константы для валидации форм
 */
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_TITLE_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 10
};
