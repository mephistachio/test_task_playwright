export const API_CONFIG = {
  BASE_URL: 'https://petstore.swagger.io/v2',
  ENDPOINTS: {
    PET: '/pet',
    PET_BY_ID: (id) => `/pet/${id}`,
    FIND_BY_STATUS: '/pet/findByStatus'
  },
  DEFAULT_API_KEY: 'special-key'
};
