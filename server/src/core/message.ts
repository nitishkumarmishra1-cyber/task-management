export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
} as const;

export const MESSAGES = {
    AUTH: {
        INVALID_CREDENTIALS: 'Invalid email or password',
        NOT_AUTHENTICATED: 'Not authenticated',
        TOKEN_EXPIRED: 'Token has expired, please log in again',
        INVALID_TOKEN: 'Invalid token',
        ACCESS_DENIED: 'Access denied. No token provided.',
        LOGOUT_SUCCESS: 'Logged out successfully',
        LOGIN_SUCCESS: 'Logged in successfully'
    },
    USER: {
        NOT_FOUND: 'User not found',
        EMAIL_ALREADY_EXISTS: 'Email already registered',
        CREATED: 'User created successfully',
        UPDATED: 'User updated successfully',
        DELETED: 'User deleted successfully',
    },
    VALIDATION: {
        FAILED: 'Validation failed.',
    },
    GENERIC: {
        SERVER_ERROR: 'Something went wrong, please try again later',
        NOT_FOUND: (resource: string) => `${resource} not found`,  // function for dynamic messages
        FORBIDDEN: `You don't have access to get this information`,
        SUCCESS: ''
    },
} as const;