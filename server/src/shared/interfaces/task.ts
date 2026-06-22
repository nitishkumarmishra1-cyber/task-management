export enum STATUS {
    PENDING = 'pending',
    COMPLETED = 'completed'
}

export enum FILTER {
    ALL = 'all',
    PENDING = STATUS.PENDING,
    COMPLETED = STATUS.COMPLETED,
    TEAM = 'team'
}