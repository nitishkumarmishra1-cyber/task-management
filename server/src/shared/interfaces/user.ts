export enum ROLE {
    MANAGER = 'manager',
    USER = "user",
    TEAM_LEAD = 'team-lead'
}


export interface IUser {
    id : string;
    role : ROLE
}

export enum FILTER {
    ALL = 'all',
    USER = ROLE.USER,
    TEAM_LEAD = ROLE.TEAM_LEAD
}