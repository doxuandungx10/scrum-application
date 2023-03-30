export interface Backlog {
    id: number,
    projectId: number,
    userId: string;
    performerName: string;
    priority: number,
    name: string;
    description: string;
    status: number;
    statusText: string;
    category: number;
    checked: boolean;
    module: number;
    percentageRemain: number;
}