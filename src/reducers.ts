import { FETCH_ADDTASK_FAILURE, FETCH_ADDTASK_REQUEST, FETCH_ADDTASK_SUCCESS, FETCH_DELETETASK_FAILURE, FETCH_DELETETASK_REQUEST, FETCH_DELETETASK_SUCCESS, FETCH_GETTASK_FAILURE, FETCH_GETTASK_REQUEST, FETCH_GETTASK_SUCCESS, FETCH_UPDATETASK_FAILURE, FETCH_UPDATETASK_REQUEST, FETCH_UPDATETASK_SUCCESS, } from './actions';
import { enqueueSnackbar } from 'notistack';
import { Task, UpdateTask } from './interface';

const initialState = {
    taskList: [] as Task[],
    loading: false,
    message: '',
    error: null,
    calendar: null as Date | null
}

// actionをanyで定義していいものか・・・TypeScriptなんだから型をしっかりすべきでは？
// 修正案としては共通で使用するIFを定義するとか？？
// const buttonClickReducer = (state = initialState, action: { type: any; value: string; memo: string | null; date: string | null; taskId: number; payload: any; calendar: Date | null, taskList: Task[] }) => {
const buttonClickReducer = (state = initialState, action: { type: any; value: string; memo: string | null; date: string | null; taskId: number; payload: any; calendar: Date | null, taskList: Task[], addTask: Task, updateTask: UpdateTask }) => {
    let allTask: Task[] = []
    switch (action.type) {
        // タスク追加
        case FETCH_ADDTASK_REQUEST:
            return {
                ...state,
                loading: true,
                // taskList: [...state.taskList, action.addTask],
                calendar: null
                // message: '保存中です。'
            }
        case FETCH_ADDTASK_SUCCESS:
            // enqueueSnackbar("保存が完了しました", { variant: "success", autoHideDuration: 3000 })
            return {
                ...state,
                loading: false,
                taskList: [...state.taskList, action.addTask],
                // message: '保存が完了しました。'
            }
        case FETCH_ADDTASK_FAILURE:
            enqueueSnackbar("保存が失敗しました", { variant: "error", autoHideDuration: null })
            return {
                ...state,
                loading: false,
                message: '保存が失敗しました。'
            }
        // case 'ADDBUTTON':
        //     const newTask: Task = {
        //         taskId: 0,
        //         title: action.value,
        //         memo: action.memo,
        //         limitDate: action.date,
        //         completionDate: null,
        //         progressStatus: 0,
        //         progressRate: 0,
        //         registerDate: "",
        //         updateDate: null,
        //         isCompleted: false
        //     }

        //     enqueueSnackbar("タスク追加しました", { variant: "info", autoHideDuration: 5000 })
        //     return {
        //         ...state,
        //         taskList: [...state.taskList, newTask],
        //         calendar: null,
        //     }
        // タスク更新
        case FETCH_UPDATETASK_REQUEST:
            allTask = [...state.taskList].map(task => {
                console.log(task.taskId)
                console.log(action.updateTask.taskId)
                if (task.taskId === action.updateTask.taskId) {
                    return {
                        ...task,
                        title: action.updateTask.title === undefined ? task.title : action.updateTask.title,
                        memo: action.updateTask.memo === undefined ? task.memo : action.updateTask.memo,
                        limitDate: action.updateTask.limitDate === undefined ? task.limitDate : action.updateTask.limitDate,
                        isCompleted: action.updateTask.isCompleted === undefined ? task.isCompleted : action.updateTask.isCompleted,
                        completionDate: action.updateTask.completionDate === undefined ? task.completionDate : action.updateTask.completionDate,
                        progressStatus: action.updateTask.progressStatus === undefined ? task.progressStatus : action.updateTask.progressStatus,
                        progressRate: action.updateTask.progressRate === undefined ? task.progressRate : action.updateTask.progressRate,
                        updateDate: action.updateTask.updateDate === undefined ? task.updateDate : action.updateTask.updateDate
                    } as Task
                }
                return { ...task } as Task
            })

            return {
                ...state,
                loading: true,
                taskList: allTask
            }
        case FETCH_UPDATETASK_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case FETCH_UPDATETASK_FAILURE:
            return {
                ...state,
                loading: false,
            }

        // case 'UPDATETITLEBUTTON':
        //     // 未完了タスク
        //     notFinishedTaskList = [...state.taskList].map(task => {
        //         if (task.taskId === action.taskId) {
        //             return { ...task, taskName: action.value, taskMemo: action.memo } as Task
        //         }
        //         return { ...task } as Task
        //     })

        //     // 完了タスク
        //     finishedTaskList = [...state.completedTaskList].map(task => {
        //         if (task.taskId === action.taskId) {
        //             return { ...task, taskName: action.value, taskMemo: action.memo } as Task
        //         }
        //         return { ...task } as Task
        //     })
        //     return {
        //         ...state,
        //         taskList: notFinishedTaskList,
        //         completedTaskList: finishedTaskList
        //     }
        // case 'UPDATEDATEBUTTON':
        //     // 未完了タスク
        //     console.log(action.date)
        //     notFinishedTaskList = [...state.taskList].map(task => {
        //         if (task.taskId === action.taskId) {
        //             return { ...task, taskDate: action.date } as Task
        //         }
        //         return { ...task } as Task
        //     })

        //     // 完了タスク
        //     finishedTaskList = [...state.completedTaskList].map(task => {
        //         if (task.taskId === action.taskId) {
        //             return { ...task, taskDate: action.date } as Task
        //         }
        //         return { ...task } as Task
        //     })
        //     return {
        //         ...state,
        //         taskList: notFinishedTaskList,
        //         completedTaskList: finishedTaskList
        //     }
        // タスク削除
        case FETCH_DELETETASK_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_DELETETASK_SUCCESS:
            return {
                ...state,
                loading: false,
                taskList: [...state.taskList].filter((task) => task.taskId !== action.taskId)
            }
        case FETCH_DELETETASK_FAILURE:
            return {
                ...state,
                loading: false,
            }
        // case 'DELETEBUTTON':
        //     // 削除ボタンが押下されたタスクID以外を抽出
        //     // 未完了タスク
        //     notFinishedTaskList = [...state.taskList].filter((task) => task.taskId !== action.taskId)

        //     // 完了タスク
        //     // finishedTaskList = [...state.completedTaskList].filter((task) => task.taskId !== action.taskId)

        //     return {
        //         ...state,
        //         taskList: notFinishedTaskList,
        //         completedTaskList: finishedTaskList
        //     }
        // case 'COMPLETEBUTTON':
        //     // タスクリストから削除

        //     // タスクの状態更新
        //     allTask = [...state.taskList].map((task) => {
        //         if (task.taskId === action.taskId) {
        //             return { ...task, taskDate: action.date, isCompleted: true }
        //         }
        //         return task
        //     })
        //     // 未完了、完了タスクをまとめる
        //     // allTask = [...allTask, ...state.completedTaskList]

        //     return {
        //         ...state,
        //         taskList: [...allTask].filter((task) => !task.isCompleted),
        //         completedTaskList: [...allTask].filter((task) => task.isCompleted)
        //     }
        // case 'BACKBUTTON':
        //     // 完了タスクリストから削除

        //     // タスクの状態更新
        //     // allTask = [...state.completedTaskList].map((task) => {
        //     //     if (task.taskId === action.taskId) {
        //     //         return { ...task, taskDate: action.date, isCompleted: false }
        //     //     }
        //     //     return task
        //     // })
        //     // 未完了、完了タスクをまとめる
        //     allTask = [...allTask, ...state.taskList]

        //     return {
        //         ...state,
        //         taskList: [...allTask].filter((task) => !task.isCompleted),
        //         completedTaskList: [...allTask].filter((task) => task.isCompleted)
        //     }
        // case FETCH_READFILE_REQUEST:
        //     return {
        //         ...state,
        //         loading: true,
        //         message: '読込中です。'
        //     }
        // case FETCH_READFILE_SUCCESS:

        //     // タスクが存在するかチェック
        //     if (action.payload.payload !== undefined) {
        //         action.payload.payload.forEach((task: Task) => {
        //             // ここで完了タスクと未完了タスクに振り分ける
        //             if (task.isCompleted) {
        //                 tmpFinishedTaskList = [...tmpFinishedTaskList, {
        //                     taskId: task.taskId,
        //                     title: task.title,
        //                     memo: task.memo,
        //                     limitDate: task.limitDate,
        //                     completionDate: task.completionDate,
        //                     progressStatus: task.progressStatus,
        //                     progressRate: task.progressRate,
        //                     registerDate: task.registerDate,
        //                     updateDate: task.updateDate,
        //                     isCompleted: task.isCompleted
        //                 }]
        //             } else {
        //                 tmpNotFinishedTaskList = [...tmpNotFinishedTaskList, {
        //                     taskId: task.taskId,
        //                     title: task.title,
        //                     memo: task.memo,
        //                     limitDate: task.limitDate,
        //                     completionDate: task.completionDate,
        //                     progressStatus: task.progressStatus,
        //                     progressRate: task.progressRate,
        //                     registerDate: task.registerDate,
        //                     updateDate: task.updateDate,
        //                     isCompleted: task.isCompleted
        //                 }]
        //             }
        //         });
        //     }

        //     enqueueSnackbar("読込が完了しました", { variant: "success", autoHideDuration: 3000 })
        //     return {
        //         ...state,
        //         taskList: tmpNotFinishedTaskList,
        //         completedTaskList: tmpFinishedTaskList,
        //         loading: false,
        //         message: '読込が完了しました。'
        //     }
        // case FETCH_READFILE_FAILURE:
        //     enqueueSnackbar("読込が失敗しました", { variant: "error", autoHideDuration: null })
        //     return {
        //         ...state,
        //         loading: false,
        //         message: '読込が失敗しました。'
        //     }
        // case FETCH_WRITEFILE_REQUEST:
        //     return {
        //         ...state,
        //         loading: true,
        //         message: '保存中です。'
        //     }
        // case FETCH_WRITEFILE_SUCCESS:
        //     enqueueSnackbar("保存が完了しました", { variant: "success", autoHideDuration: 3000 })
        //     return {
        //         ...state,
        //         loading: false,
        //         message: '保存が完了しました。'
        //     }
        // case FETCH_WRITEFILE_FAILURE:
        //     enqueueSnackbar("保存が失敗しました", { variant: "error", autoHideDuration: null })
        //     return {
        //         ...state,
        //         loading: false,
        //         message: '保存が失敗しました。'
        //     }
        case 'SETTINGCALENDAR':
            return {
                ...state,
                calendar: action.calendar
            }
        case FETCH_GETTASK_REQUEST:
            return {
                ...state,
                loading: true,
                message: '読込中です。'
            }
        case FETCH_GETTASK_SUCCESS:
            enqueueSnackbar("読込が完了しました", { variant: "success", autoHideDuration: 3000 })
            action.taskList.map((task) => {
                console.log(task.taskId)
            })
            return {
                ...state,
                taskList: action.taskList,
                loading: false,
                message: '読込が完了しました。'
            }
        case FETCH_GETTASK_FAILURE:
            enqueueSnackbar("読込が失敗しました", { variant: "error", autoHideDuration: null })
            return {
                ...state,
                loading: false,
                message: '読込が失敗しました。'
            }
        default:
            return state
    }
}

export default buttonClickReducer