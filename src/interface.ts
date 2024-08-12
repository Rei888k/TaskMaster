export interface Task {
    taskId: string | null
    title: string
    memo: string | null
    limitDate: string | null
    isCompleted: boolean
    completionDate: string | null
    registerDate: string
    updateDate: string | null
}

export interface UpdateTask {
    taskId: string | null
    title?: string
    memo?: string | null
    limitDate?: string | null
    isCompleted?: boolean
    completionDate?: string | null
    // registerDate: string
    updateDate: string | null
}