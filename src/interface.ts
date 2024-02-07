export interface Task {
    taskId: number
    title: string
    memo: string | null
    limitDate: string | null
    isCompleted: boolean
    completionDate: string | null
    progressStatus: number
    progressRate: number
    registerDate: string
    updateDate: string | null
}

export interface UpdateTask {
    taskId: number
    title?: string
    memo?: string | null
    limitDate?: string | null
    isCompleted?: boolean
    completionDate?: string | null
    progressStatus?: number
    progressRate?: number
    // registerDate: string
    updateDate: string | null
}