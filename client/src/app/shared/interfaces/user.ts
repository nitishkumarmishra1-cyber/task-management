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
}

export interface ILogin {
    enail : string;
    password : string;
}