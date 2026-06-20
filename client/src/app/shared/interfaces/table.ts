export interface ListColumn {
  key: string;
  label: string;
  type?: 'text' | 'status-badge' | 'truncate';
  sortable?: boolean;
  truncateLength?: number;
}

export interface ListAction {
  id: string;
  name: string;
  listener: (row: any) => void;
}