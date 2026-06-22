export enum ROLE {
    USER = 'user',
    MANAGER = 'manager',
    TEAM_LEAD = 'team-lead'
}

export interface IUser {
    id : string;
    name : string;
    email : string;
    role : ROLE;
    reportTo : string;
    accessToken : string;
}

export interface ILogin {
    enail : string;
    password : string;
}

export enum USER_FILTER {
    ALL = 'all',
    USER = ROLE.USER,
    TEAM_LEAD = ROLE.TEAM_LEAD
}