export const AppConstant = {
    PASSSWORD_PATTERN : /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    EMAIL_PATTERN : /^[\w.-]+@[\w.-]+\.\w+$/
} as const;