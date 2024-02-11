import { Task, UpdateTask } from "./interface";

// アクションタイプ
export const FETCH_READFILE_REQUEST = 'FETCH_READFILE_REQUEST';
export const FETCH_READFILE_SUCCESS = 'FETCH_READFILE_SUCCESS';
export const FETCH_READFILE_FAILURE = 'FETCH_READFILE_FAILURE';

export const FETCH_WRITEFILE_REQUEST = 'FETCH_WRITEFILE_REQUEST';
export const FETCH_WRITEFILE_SUCCESS = 'FETCH_WRITEFILE_SUCCESS';
export const FETCH_WRITEFILE_FAILURE = 'FETCH_WRITEFILE_FAILURE';

// 初期処理
export const FETCH_INITIAL_REQUEST = 'FETCH_INITIAL_REQUEST';
export const FETCH_INITIAL_SUCCESS = 'FETCH_INITIAL_SUCCESS';
export interface FetchInitialSuccessAction {
    type: typeof FETCH_INITIAL_SUCCESS
    taskList: Task[]
}


export const FETCH_INITIAL_FAILURE = 'FETCH_INITIAL_FAILURE';

// タスク取得
export const FETCH_GETTASK_REQUEST = 'FETCH_GETTASK_REQUEST'
export interface FetchGetTaskRequestAction {
    type: typeof FETCH_GETTASK_REQUEST
}

export const FETCH_GETTASK_SUCCESS = 'FETCH_GETTASK_SUCCESS'
export interface FetchGetTaskSuccessAction {
    type: typeof FETCH_GETTASK_SUCCESS
    taskList: Task[]
}

export const FETCH_GETTASK_FAILURE = 'FETCH_GETTASK_FAILURE'



// タスク追加
export const FETCH_ADDTASK_REQUEST = 'FETCH_ADDTASK_REQUEST'
export interface FetchAddTaskRequestAction {
    type: typeof FETCH_ADDTASK_REQUEST
    addTask: Task
}

export const FETCH_ADDTASK_SUCCESS = 'FETCH_ADDTASK_SUCCESS'
export interface FetchAddTaskSuccessAction {
    type: typeof FETCH_ADDTASK_SUCCESS
    addTask: Task
}

export const FETCH_ADDTASK_FAILURE = 'FETCH_ADDTASK_FAILURE'

// タスク更新
export const FETCH_UPDATETASK_REQUEST = 'FETCH_UPDATETASK_REQUEST'
export interface FetchUpdateTaskRequestAction {
    type: typeof FETCH_UPDATETASK_REQUEST
    updateTask: UpdateTask
}

export const FETCH_UPDATETASK_SUCCESS = 'FETCH_UPDATETASK_SUCCESS'
export const FETCH_UPDATETASK_FAILURE = 'FETCH_UPDATETASK_FAILURE'

// タスク削除
export const FETCH_DELETETASK_REQUEST = 'FETCH_DELETETASK_REQUEST'
export interface FetchDeleteTaskRequestAction {
    type: typeof FETCH_DELETETASK_REQUEST
    taskId: number
}

export const FETCH_DELETETASK_SUCCESS = 'FETCH_DELETETASK_SUCCESS'
export interface FetchDeleteTaskSuccesstAction {
    type: typeof FETCH_DELETETASK_SUCCESS
    taskId: number
}
export const FETCH_DELETETASK_FAILURE = 'FETCH_DELETETASK_FAILURE'

// 読込ボタン押下
export const fetchReadFileRequest = () => {
    return {
        type: FETCH_READFILE_REQUEST,
        value: '',
    }
}
export const fetchReadFileSuccess = (payload: any) => {
    return {
        type: FETCH_READFILE_SUCCESS,
        value: '',
        payload: payload
    }
}
export const fetchReadFileFailure = (payload: any) => {
    return {
        type: FETCH_READFILE_FAILURE,
        value: '',
        payload: payload
    }
}
// 保存ボタン押下
export const fetchWriteFileRequest = (payload: any) => {
    return {
        type: FETCH_WRITEFILE_REQUEST,
        payload: payload
    }
}
export const fetchWriteFileSuccess = (payload: any) => {
    return {
        type: FETCH_WRITEFILE_SUCCESS,
        payload: payload
    }
}
export const fetchWriteFileFailure = (payload: any) => {
    return {
        type: FETCH_WRITEFILE_FAILURE,
        payload: payload
    }
}
// タスク追加の日付設定
export const settingCalendar = (calendar: Date | null) => {
    return {
        type: 'SETTINGCALENDAR',
        calendar
    }
}
// アプリ初期処理
export const fetchInitialProcessRequest = () => {
    return {
        type: FETCH_INITIAL_REQUEST
    }
}
export const fetchInitialProcessSuccess = (data: FetchInitialSuccessAction) => {
    return {
        type: FETCH_INITIAL_SUCCESS,
        taskList: data.taskList
    }
}
export const fetchInitialProcessFailure = () => {
    return {
        type: FETCH_INITIAL_FAILURE
    }

}
// タスク取得
export const fetchGetTaskRequest = () => {
    return {
        type: FETCH_GETTASK_REQUEST
    }
}
export const fetchGetTaskSuccess = (data: FetchGetTaskSuccessAction) => {
    console.log(data)
    return {
        type: FETCH_GETTASK_SUCCESS,
        taskList: data.taskList
    }
}
export const fetchGetTaskFailure = () => {
    return {
        type: FETCH_GETTASK_FAILURE
    }
}

// タスク追加
export const fetchAddTaskRequest = (data: FetchAddTaskRequestAction) => {
    console.log(data.addTask)
    return {
        type: FETCH_ADDTASK_REQUEST,
        addTask: data.addTask
    }
}
export const fetchAddTaskSuccess = (data: FetchAddTaskSuccessAction) => {
    return {
        type: FETCH_ADDTASK_SUCCESS,
        addTask: data.addTask
    }
}
export const fetchAddTaskFailure = () => {
    return {
        type: FETCH_ADDTASK_FAILURE
    }
}
// タスク更新
export const fetchUpdateTaskRequest = (data: FetchUpdateTaskRequestAction) => {
    return {
        type: FETCH_UPDATETASK_REQUEST,
        updateTask: data.updateTask
    }
}
export const fetchUpdateTaskSuccess = () => {
    return {
        type: FETCH_UPDATETASK_SUCCESS
    }
}
export const fetchUpdateTaskFailure = () => {
    return {
        type: FETCH_UPDATETASK_FAILURE
    }
}
// タスク削除
export const fetchDeleteTaskRequest = (data: FetchDeleteTaskRequestAction) => {
    return {
        type: FETCH_DELETETASK_REQUEST,
        taskId: data.taskId
    }
}
export const fetchDeleteTaskSuccess = (data: FetchDeleteTaskSuccesstAction) => {
    return {
        type: FETCH_DELETETASK_SUCCESS,
        taskId: data.taskId
    }
}
export const fetchDeleteTaskFailure = () => {
    return {
        type: FETCH_DELETETASK_FAILURE
    }
}