export interface SprintBacklog{
    id: number,
    backlogId: number,
    backlogName: string,
    name: string,
    status: number,
    priority: number,
    percentageRemain: number,
    isTarget: boolean,
    totalTask: number,
    doneTask: number,
}