const MESSAGES = {
  REQUEST: {
    INVALID: 'Invalid request',
  },
  ERRORS: {
    SYSTEM: {
      INTERNAL_SERVER_ERROR: 'Internal Server Error',
    },
    AUTH: {
      AUTHENTICATION_TOKEN_MISSING: 'access token missing in request header.',
      INVALID_TOKEN: 'Invalid token.',
      PARTNER_KEY_MISSING: 'api-key missing.',
      INVALID_AUTH_TOKEN: 'Your session has timed out. Please log in again',
      ACCESS_DENIED: 'You are not authorized to access this resource.',
      INVALID_ACCESS: 'You are not authorized. Please check your api-key.',
    },
    DB: {
      CONNECTION_FAILED: 'Failed to connect to database.',
    },
    USER: {
      DELETED_USER:
        'This user account is either deleted or disabled.Please contact admin.',
      BRAND_NOT_LINKED_TO_CONTRACT: 'Brand is not linked to contract',
      IN_ACTIVE_USER: 'Account has been deactivated, please contact admin.',
    },
    REDIS: {
      CONNECTION_MISSING: 'Please provide a redis connection object.',
      KEY_TYPE_ERROR: 'Key must be string type',
    },
    RESOURCES: {
      RESOURCE_NOT_FOUND: 'Resource not found.',
    },
  },
};

module.exports = MESSAGES;
