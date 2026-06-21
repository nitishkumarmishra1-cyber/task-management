import { ROLE, STATUS } from "../shared/interfaces";

export class Constant {
    // auth api endpoints
    public static readonly LOGIN = 'auth/login';
    public static readonly LOGOUT = 'auth/logout';
    public static readonly USER_STORE_KEY = `user-login-cortext-ai-user-status`;

    // users api end-points
    public static readonly CREATE_USER = 'user';
    public static readonly USER_LIST = 'user/list';
    public static readonly USER_ME = 'user/me';
    public static readonly ASSIGNABLE_USER = 'user/assignable';
    public static readonly UPDATE_USER = 'user/';
    public static readonly DELETE_USER = 'user/';

    // task api end-points
    public static readonly CREATE_TASK = 'task';
    public static readonly UPDATE_TASK = 'task/';
    public static readonly GET_TASK = 'task';
    public static readonly DELETE_TASK = 'task/';
    public static readonly ALL_TASK = 'task/all';

    // notificatio api end-points
    public static readonly UPDATE_NOTIFICATION = 'notification';
    public static readonly GET_NOTIFICATION = 'notification';
    public static readonly UNSEEN_COUNT_NOTIFICATION = 'notification/unseen';

    public static readonly STATUS_OPTIONS: { value: STATUS, label: string }[] = [
        { value: STATUS.PENDING, label: 'Pending' },
        { value: STATUS.COMPLETED, label: 'Completed' }
    ];

    private static readonly ROLE_OPTIONS: { value: ROLE, label: string }[] = [
        { value: ROLE.USER, label: 'User' },
        { value: ROLE.TEAM_LEAD, label: 'Team-lead' }
    ];

    public static ROLE_OPTION(role : ROLE = ROLE.TEAM_LEAD) {
        return this.ROLE_OPTIONS.filter((element : any) => element.value !== role);
    }
}