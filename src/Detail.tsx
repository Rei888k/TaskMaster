import { Grid, IconButton, Tooltip, Typography } from "@mui/material"
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import { Task } from "./interface";

function Detail() {
    
    const navigate = useNavigate()
    const location = useLocation()

    const task: Task = location.state.task

    const goToHome = () => {
        navigate('/')
    }

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

            
            <Typography variant="h3">{task.title}</Typography>
            <div>進捗率：{task.progressRate}</div>
            <div>ステータス：{task.progressStatus}</div>
            <div>{task.memo}</div>
            {/* <div>{task.title}</div> */}

        </div>
    )
}

export default Detail