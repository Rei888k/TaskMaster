import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { Button, Collapse, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ja } from 'date-fns/locale';
import { useDispatch } from 'react-redux';
import { FETCH_ADDTASK_REQUEST, FETCH_UPDATETASK_REQUEST, fetchAddTaskRequest, fetchGetTaskRequest, fetchInitialProcessRequest, fetchUpdateTaskRequest } from './actions';
import { useSelector } from './store';
import ConfirmModal from './ConfirmModal';
import { Task, UpdateTask } from './interface';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CalendarModal from './CalendarModal';
import { getCurrentTime } from './common';
// import EditNoteIcon from '@mui/icons-material/EditNote';

interface EditState {
  id: number
  isEditting: boolean
}

// table header
const tableHeader1 = {
  width: '82.5vw'
}
const tableHeader2 = {
  width: '10vw'
}
const tableHeader3 = {
  width: '7.5vw'
}

// table column
const tableColumn1 = {
  width: '7.5vw'
}
const tableColumn2 = {
  width: '75vw'
}
const tableColumn3 = {
  width: '10vw'
}
const tableColumn4 = {
  width: '7.5vw'
}


function App() {

  const [inputValue, setInputValue] = useState<string>("")
  const [inputMemoValue, setInputMemoValue] = useState<string>("")
  const [inputValueForUpdate, setInputValueForUpdate] = useState<string>("")
  const [inputMemoValueForUpdate, setInputMemoValueForUpdate] = useState<string | null>("")
  const [editTitleState, setEditTitleState] = useState<EditState>({ id: NaN, isEditting: false })
  const [taskOpen, setTaskOpen] = useState<boolean>(false)
  const [isTextFocus, setIsTextFocus] = useState({ taskField: false, memoField: false })
  // console.log("isTextFocus", isTextFocus)
  // console.log(editTitleState)
  const dispatch = useDispatch()

  const allTaskList = useSelector(state => state.taskList)
  const taskList = typeof allTaskList === 'undefined' ? [] : allTaskList.filter(task => !task.isCompleted )
  const completedTaskList = typeof allTaskList === 'undefined' ? [] : allTaskList.filter(task => task.isCompleted )
  // const completedTaskList = useSelector(state => state.completedTaskList)
  const loading = useSelector(state => state.loading)
  const calendar = useSelector(state => state.calendar)


  const rootStyle = {
    opacity: loading ? 0.5 : 1
  }

  // フロントエンド内の入力内容を一時的に保持する
  const handleOnTitleChange = (event: any) => {
    setInputValue(event.target.value)
  }

  const handleOnMemoChange = (event: any) => {
    setInputMemoValue(event.target.value)
  }

  const handleOnTitleChangeForUpdate = (event: any) => {
    setInputValueForUpdate(event.target.value)
  }

  const handleOnMemoChangeForUpdate = (event: any) => {
    setInputMemoValueForUpdate(event.target.value)
  }

  // 追加ボタン押下
  const handleOnAddClick = () => {
    const task: Task = {
      taskId: NaN,
      title: inputValue,
      memo: inputMemoValue,
      limitDate: calendar != null ? calendar.toLocaleDateString() : null,
      isCompleted: false,
      completionDate: null,
      progressStatus: 0,
      progressRate: 0,
      registerDate: getCurrentTime(),
      updateDate: null
    }
    // タスク追加
    dispatch(fetchAddTaskRequest({ type: FETCH_ADDTASK_REQUEST, addTask: task }))

    // テキストフィールドをリセットする TODO
    setInputValue("")
    setInputMemoValue("")
    setTaskOpen(false)
  }

  // 編集ボタン押下
  const handleOnEditTitleClick = (id: number) => {
    setEditTitleState({ id, isEditting: true })
    // 未完了タスク
    const task = taskList.find((task) => task.taskId === id)
    if (task) {
      setInputValueForUpdate(task.title)
      setInputMemoValueForUpdate(task.memo)
      return
    }
  }

  // 更新ボタン押下
  const handleOnUpdateTitleClick = (id: number) => {
    const task: UpdateTask = {
      taskId: id,
      title: inputValueForUpdate,
      memo: inputMemoValueForUpdate,
      progressStatus: 0, // いったんいじらない
      progressRate: 0, // いったんいじらない
      updateDate: getCurrentTime()
    }    
    dispatch(fetchUpdateTaskRequest({ type: FETCH_UPDATETASK_REQUEST, updateTask: task }))
    setEditTitleState({ id: NaN, isEditting: false })
  }

  // Enterキー押下
  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      if (editTitleState.isEditting) {
        handleOnUpdateTitleClick(editTitleState.id)
      } else {
        handleOnAddClick()
      }
    }
  }

  // 完了ボタン押下
  const handleCompleteClick = (id: number) => {
    // dispatch(completeButton(id, new Date().toLocaleDateString()))
    const task: UpdateTask = {
      taskId: id,
      isCompleted: true,
      completionDate: getCurrentTime(),
      progressStatus: 0, // いったんいじらない
      progressRate: 0, // いったんいじらない
      updateDate: getCurrentTime()
    }
    console.log(id)
    dispatch(fetchUpdateTaskRequest({ type: FETCH_UPDATETASK_REQUEST, updateTask: task }))
  }

  // 元に戻すボタン押下
  const handleBackClick = (id: number) => {
    // dispatch(backButton(id))

    const task: UpdateTask = {
      taskId: id,
      isCompleted: false,
      completionDate: getCurrentTime(),
      progressStatus: 0, // いったんいじらない
      progressRate: 0, // いったんいじらない
      updateDate: getCurrentTime()
    }

    dispatch(fetchUpdateTaskRequest({ type: FETCH_UPDATETASK_REQUEST, updateTask: task }))
  }

  const handleOnTaskClick = (id: number) => {
    handleOnEditTitleClick(id)
  }

  const handleTitleBlur = (event: any, id: number, field: string) => {
    setIsTextFocus({ ...isTextFocus, [field]: false })
  };

  const handleOnFocus = (id: number, field: string) => {
    setIsTextFocus({ ...isTextFocus, [field]: true })
    handleOnTaskClick(id)
  }

  useEffect(() => {
    if (isTextFocus.taskField === false && isTextFocus.memoField === false && !Number.isNaN(editTitleState.id)) {
      handleOnUpdateTitleClick(editTitleState.id)
    }
  }, [isTextFocus])

  useEffect(() => {
    console.log("mount")
    // マウント時呼び出す
    dispatch(fetchInitialProcessRequest())
    // dispatch(fetchGetTaskRequest())
    console.log("mouint finish")
  }, [dispatch])

  return (
    <div className="App" style={rootStyle}>
      <Tooltip title={undefined}>
        <Grid
          sx={{ display: 'flex' }}
        >
          <h1 style={{ padding: '0px 15px' }}>タスク管理アプリ</h1>
          {/* <Button onMouseUp={handleOnSaveClick}>保存</Button> */}
          {/* <Button onMouseUp={handleOnLoadClick}>読込</Button> */}
        </Grid>
      </Tooltip>
      <Grid>
        {/* <Typography color='red'>{errorMessage}</Typography> */}
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2} style={tableHeader1}>{`未完了（${taskList.length}件）`}</TableCell>
                <TableCell style={tableHeader2}>日付</TableCell>
                <TableCell style={tableHeader3}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={tableColumn1}></TableCell>
                <TableCell style={tableColumn2} sx={{ padding: 0 }}>
                  <Button onMouseUp={() => setTaskOpen(!taskOpen)} sx={{ padding: 0 }}>タスクを追加</Button>
                </TableCell>
                <TableCell style={tableColumn3}></TableCell>
                <TableCell style={tableColumn4}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
                  <Collapse in={taskOpen} timeout="auto" unmountOnExit></Collapse>
                </TableCell>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
                  <Collapse in={taskOpen} timeout="auto" unmountOnExit>
                    <Grid sx={{ display: 'grid' }}>
                      <TextField
                        label="タスク名"
                        autoFocus
                        variant='standard'
                        onChange={handleOnTitleChange}
                        onKeyDown={handleKeyPress}
                        value={inputValue}
                        sx={{ zIndex: 0 }}
                      />
                      <TextField
                        label="メモ"
                        variant='standard'
                        onChange={handleOnMemoChange}
                        onKeyDown={handleKeyPress}
                        value={inputMemoValue}
                        sx={{ zIndex: 0 }}
                      />
                      <Grid>
                        <Button onMouseUp={handleOnAddClick}>追加</Button>
                        <Button onMouseUp={() => setTaskOpen(false)}>キャンセル</Button>
                      </Grid>
                    </Grid>
                  </Collapse>
                </TableCell>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
                  <Collapse in={taskOpen} timeout="auto" unmountOnExit>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                      <CalendarModal id={null} date={calendar} />
                    </LocalizationProvider>
                  </Collapse>
                </TableCell>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
                  <Collapse in={taskOpen} timeout="auto" unmountOnExit></Collapse>
                </TableCell>
              </TableRow>
              {/* 未完了タスク一覧 */}
              {taskList.length > 0 ? (
                taskList.map((task) => (
                  <TableRow
                    key={task.taskId}
                  >
                    <TableCell style={tableColumn1}>
                      <IconButton onMouseUp={() => handleCompleteClick(task.taskId)}>
                        <CheckBoxOutlineBlankIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell
                      style={tableColumn2}
                      onMouseUp={() => handleOnTaskClick(task.taskId)}
                    >
                      {editTitleState.isEditting && editTitleState.id === task.taskId
                        ?
                        <Grid>
                          <TextField
                            label="タスク名"
                            autoFocus
                            variant='standard'
                            onChange={handleOnTitleChangeForUpdate}
                            onFocus={() => handleOnFocus(task.taskId, "taskField")}
                            onBlur={(e) => handleTitleBlur(e, task.taskId, "taskField")}
                            onKeyDown={handleKeyPress}
                            value={inputValueForUpdate}
                            sx={{ width: '100%' }}
                          />
                          <TextField
                            label="メモ"
                            variant='standard'
                            onChange={handleOnMemoChangeForUpdate}
                            onFocus={() => handleOnFocus(task.taskId, "memoField")}
                            onBlur={(e) => handleTitleBlur(e, task.taskId, "memoField")}
                            onKeyDown={handleKeyPress}
                            value={inputMemoValueForUpdate}
                            sx={{ width: '100%' }}
                          />
                        </Grid>
                        :
                        <>
                          <Grid sx={{ width: '100%' }}>{task.title}</Grid>
                          <Grid sx={{ width: '100%' }}>{task.memo}</Grid>
                        </>
                      }
                    </TableCell>
                    <TableCell style={tableColumn3}>
                      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                        <CalendarModal id={task.taskId} date={task.limitDate != null ? new Date(task.limitDate as string) : null} />
                      </LocalizationProvider>
                    </TableCell>
                    <TableCell style={tableColumn4}>
                      <ConfirmModal id={task.taskId} buttonName={'削除'} />
                    </TableCell>
                  </TableRow>
                ))) : (
                <TableRow>
                  <TableCell style={tableColumn1}></TableCell>
                  <TableCell style={tableColumn2}>
                    タスクが存在しません
                  </TableCell>
                  <TableCell style={tableColumn3}></TableCell>
                  <TableCell style={tableColumn4}></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2} style={tableHeader1}>{`完了（${completedTaskList.length}件）`}</TableCell>
                <TableCell style={tableHeader2}>完了日</TableCell>
                <TableCell style={tableHeader3}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* 完了タスク一覧 */}
              {completedTaskList.length > 0 ? (
                completedTaskList.map(task => (
                  <TableRow
                    key={task.taskId}
                  >
                    <TableCell style={tableColumn1}>
                      <IconButton onMouseUp={() => handleBackClick(task.taskId)}>
                        <CheckBoxIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell
                      style={tableColumn2}
                      onMouseUp={() => handleOnTaskClick(task.taskId)}
                    >
                      {editTitleState.isEditting && editTitleState.id === task.taskId
                        ?
                        <>
                          <TextField
                            label="タスク名"
                            autoFocus
                            variant='standard'
                            onChange={handleOnTitleChangeForUpdate}
                            onFocus={() => handleOnFocus(task.taskId, "taskField")}
                            onBlur={(e) => handleTitleBlur(e, task.taskId, "taskField")}
                            onKeyDown={handleKeyPress}
                            value={inputValueForUpdate}
                            sx={{ width: '100%' }}
                          />
                          <TextField
                            label="メモ"
                            variant='standard'
                            onChange={handleOnMemoChangeForUpdate}
                            onFocus={() => handleOnFocus(task.taskId, "memoField")}
                            onBlur={(e) => handleTitleBlur(e, task.taskId, "memoField")}
                            onKeyDown={handleKeyPress}
                            value={inputMemoValueForUpdate}
                            sx={{ width: '100%' }}
                          />
                        </>
                        :
                        <>
                          <div>{task.title}</div>
                          <div>{task.memo}</div>
                        </>

                      }
                    </TableCell>
                    <TableCell style={tableColumn3}>
                      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                        <CalendarModal id={task.taskId} date={task.limitDate != null ? new Date(task.limitDate as string) : null} />
                      </LocalizationProvider>
                    </TableCell>
                    <TableCell style={tableColumn4}>
                      <ConfirmModal id={task.taskId} buttonName={'削除'} />
                    </TableCell>

                  </TableRow>
                ))
              )
                : (
                  <TableRow>
                    <TableCell style={tableColumn1}></TableCell>
                    <TableCell style={tableColumn2}>
                      タスクが存在しません
                    </TableCell>
                    <TableCell style={tableColumn3}></TableCell>
                    <TableCell style={tableColumn4}></TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
}

export default App;