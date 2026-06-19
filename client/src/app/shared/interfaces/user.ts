export enum ROLE {
    EMPLOYEE = 'employee',
    MANAGER = 'manager',
    TEAM_LEAD = 'team-lead'
}

export interface IUser {
    id : string;
    username : string;
    email : string;
    role : ROLE;
    reportTo : string;
}
