import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_ADDTASK_REQUEST, FETCH_ADDTASK_SUCCESS, FETCH_DELETETASK_REQUEST, FETCH_DELETETASK_SUCCESS, FETCH_GETTASK_REQUEST, FETCH_GETTASK_SUCCESS, FETCH_INITIAL_REQUEST, FETCH_INITIAL_SUCCESS, FETCH_UPDATETASK_REQUEST, FetchAddTaskRequestAction, FetchAddTaskSuccessAction, FetchDeleteTaskRequestAction, FetchDeleteTaskSuccesstAction, FetchGetTaskSuccessAction, FetchInitialSuccessAction, FetchUpdateTaskRequestAction, fetchAddTaskFailure, fetchAddTaskSuccess, fetchDeleteTaskFailure, fetchDeleteTaskSuccess, fetchGetTaskFailure, fetchGetTaskSuccess, fetchInitialProcessFailure, fetchInitialProcessSuccess, fetchUpdateTaskFailure, fetchUpdateTaskSuccess } from './actions';
import { fetchAddTask, fetchDeleteTask, fetchGetTask, fetchInitialProcess, fetchUpdateTask } from './api';
import { Task, UpdateTask } from './interface';

// function* fetchReadFileSaga() {
//     try {
//         const { payload, error } = yield call(fetchGetTaskData)
//         console.log(payload)
//         yield put(fetchReadFileSuccess({ type: 'FETCH_READFILE_SUCCESS', payload: payload }))
//     } catch (error) {
//         console.log(error)
//         yield put(fetchReadFileFailure({ type: 'FETCH_READFILE_FAILURE' }))
//     }
// }

// function* fetchWriteFileSaga(action: any) {
//     try {

//         console.log(action)
//         const { payload, error } = yield call(fetchSetTaskData, action.payload)
//         console.log(payload)
//         yield put(fetchWriteFileSuccess({ type: 'FETCH_WRITEFILE_SUCCESS', payload: payload }))
//     } catch (error) {
//         console.log(error)
//         yield put(fetchWriteFileFailure({ type: 'FETCH_WRITEFILE_FAILURE' }))
//     }

// }

// アプリ初期処理
function* fetchInitialProcessSaga() {
    try {
        const taskList: Task[] = yield call(fetchInitialProcess)
        yield put(fetchInitialProcessSuccess({ type: FETCH_INITIAL_SUCCESS, taskList: taskList } as FetchInitialSuccessAction ))
        console.log("初期処理完了")
    } catch (error) {
        console.log(error)
        yield put(fetchInitialProcessFailure())
    }
}

// タスク取得
function* fetchGetTaskSaga() {
    try {
        const taskList: Task[] = yield call(fetchGetTask)
        console.log(taskList)
        yield put(fetchGetTaskSuccess({ type: FETCH_GETTASK_SUCCESS, taskList: taskList } as FetchGetTaskSuccessAction ))
    } catch (error) {
        console.log(error)
        yield put(fetchGetTaskFailure())
    }
}
// タスク追加
function* fetchAddTaskSaga(action: FetchAddTaskRequestAction) {
    try {
        const task = action.addTask
        console.log(task)
        // 追加失敗の場合は、undefined?いったん考慮しない
        const addedTask: Task | undefined = yield call(fetchAddTask, task)

        yield put(fetchAddTaskSuccess({ type: FETCH_ADDTASK_SUCCESS, addTask: addedTask } as FetchAddTaskSuccessAction ))
    } catch (error) {
        console.error(error)
        yield put(fetchAddTaskFailure())
    }
}

// タスク更新
function* fetchUpdateTaskSaga(action: FetchUpdateTaskRequestAction) {
    try {
        const task: UpdateTask = action.updateTask
        yield call(fetchUpdateTask, task)

        yield put(fetchUpdateTaskSuccess())
    } catch (error) {
        console.error(error)
        yield put(fetchUpdateTaskFailure())
    }
}

// タスク削除
function* fetchDeleteTaskSaga(action: FetchDeleteTaskRequestAction) {
    try {
        const taskId = action.taskId
        yield call(fetchDeleteTask, taskId)

        yield put(fetchDeleteTaskSuccess({ type: FETCH_DELETETASK_SUCCESS, taskId: taskId } as FetchDeleteTaskSuccesstAction))
    } catch (error) {
        console.error(error)
        yield put(fetchDeleteTaskFailure())
    }
}

export default function* rootSaga() {
    // yield takeEvery('FETCH_READFILE_REQUEST', fetchReadFileSaga)
    // yield takeEvery('FETCH_WRITEFILE_REQUEST', fetchWriteFileSaga)
    yield takeEvery(FETCH_INITIAL_REQUEST, fetchInitialProcessSaga)
    yield takeEvery(FETCH_GETTASK_REQUEST, fetchGetTaskSaga)
    yield takeEvery(FETCH_ADDTASK_REQUEST, fetchAddTaskSaga)
    yield takeEvery(FETCH_UPDATETASK_REQUEST, fetchUpdateTaskSaga)
    yield takeEvery(FETCH_DELETETASK_REQUEST, fetchDeleteTaskSaga)
}