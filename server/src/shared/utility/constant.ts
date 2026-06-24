export const AppConstant = {
    PASSSWORD_PATTERN: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    EMAIL_PATTERN: /^[\w.-]+@[\w.-]+\.\w+$/,

    // socket events
    TASK_UPDATE: 'task:update',
    TASK_ASSIGN: 'task:assign',
    NOTIFICATION_UPDATE: 'notification:update'
} as const;