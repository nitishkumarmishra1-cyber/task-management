export enum ROLE {
    MANAGER = 'manager',
    USER = "user",
    TEAM_LEAD = 'team-lead'
}


export interface IUser {
    id : string;
    role : ROLE
}
