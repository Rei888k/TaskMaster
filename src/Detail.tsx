import { Grid, IconButton, Table, TableBody, TableCell, TableRow, Tooltip, Typography } from "@mui/material"
import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import { Task } from "./interface";
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Tabs } from "@mui/base/Tabs";
import { TabsList } from "@mui/base/TabsList";
import { Tab } from "@mui/base/Tab";
import { TabPanel } from "@mui/base/TabPanel";

// table header
const rootStyle = {
    padding: "0px 20px 0px 20px"
}

function Detail() {

    const navigate = useNavigate()
    const location = useLocation()

    const task: Task = location.state.task

    const goToHome = () => {
        navigate('/')
    }

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );

    return (
        <div>
            <Tooltip title={undefined}>
                <Grid
                    sx={{ display: 'flex' }}
                >
                    <h1 style={{ padding: '0px 15px' }}>タスク管理アプリ</h1>
                    {/* <Button onMouseUp={handleOnSaveClick}>保存</Button> */}
                    {/* <Button onMouseUp={handleOnLoadClick}>読込</Button> */}
                    <IconButton onMouseUp={goToHome}>
                        <HomeIcon />
                    </IconButton>
                </Grid>
            </Tooltip>

            <div style={rootStyle}>
                <Typography variant="h3">{task.title}</Typography>
                {/* <div>進捗率：{task.progressRate}</div>
                <div>ステータス：{task.progressStatus}</div>
                <div>{task.memo}</div> */}
                {/* <div>{task.title}</div> */}
            </div>

            <section style={{
                backgroundColor: "#fff",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "5px"
            }}>
                <Table style={{
                    width: '50%'
                }}>
                    <TableBody>
                        <TableRow>
                            <TableCell>タスク状況</TableCell>
                            <TableCell>ここにステータス</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>進捗率</TableCell>
                            <TableCell>ここに進捗率</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <div >
                    <h2>概要</h2>
                    <div style={{ border: "1px solid" }}>
                        <Editor editorState={editorState} onChange={setEditorState} />
                    </div>
                </div>
                <div >
                    <h2>添付ファイル</h2>
                    <input type="file" />
                </div>
                {/* <div >
                    <h2>アクティビティ</h2>
                    <ul>
                        <li>すべて</li>
                        <li>コメント</li>
                        <li>作業ログ</li>
                        <li>履歴</li>
                        <li>アクティビティ</li>
                    </ul>
                    <p>この課題に関するコメントはまだありません。</p>
                    <textarea placeholder="コメント"></textarea>
                </div> */}
                <div style={{ margin: "20px"}}>
                    <Tabs defaultValue={0}>
                        <TabsList>
                            <Tab value={0}>すべて</Tab>
                            <Tab value={1}>コメント</Tab>
                            <Tab value={2}>作業ログ</Tab>
                        </TabsList>
                        <TabPanel value={0}>My account page</TabPanel>
                        <TabPanel value={1}>Profile page</TabPanel>
                        <TabPanel value={2}>Language page</TabPanel>
                    </Tabs>
                </div>
            </section>

        </div>
    )
}

export default Detail