export interface Task{
    id: number,
    sprintBacklogId: number,
    userId: number,
    fullName: string,
    name: string,
    status: number,
    priority: number,
    description: string,
    note: string,
    estimatedTime: number,
    listTaskDetail: any
}
