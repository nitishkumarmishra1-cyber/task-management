import { STATUS } from "../shared/interfaces";

export class Constant {
    // auth api endpoints
    public static readonly LOGIN_URL = 'auth/login';
    public static readonly LOGOUT_URL = 'auth/logout';
    public static readonly USER_STORE_KEY = `user-login-cortext-ai-user-status`;

    // chat api end-points
    public static readonly USER_SIDEBAR_URL = 'chat/sidebar';

    // users api end-points
    public static readonly CREATE_USER_URL = 'user';
    public static readonly USER_LIST = 'user/users';
    public static readonly USER_ME = 'user/me';
    public static readonly USER_BY_ID = 'user/';
    public static readonly USER_PATCH = 'user/';
    public static readonly DELETE_USER = 'user/';


    public static readonly STATUS_OPTIONS: { value: STATUS, label: string }[] = [
        { value: STATUS.PENDING, label: 'Pending' },
        { value: STATUS.COMPLETED, label: 'Completed' }
    ];
}