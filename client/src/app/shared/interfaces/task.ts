export enum STATUS {
    PENDING = 'pending',
    COMPLETED = 'completed'
}

export interface ITask {
  id?: string;
  title: string;
  description: string;
  status: STATUS;
  assignedTo?: string;
}