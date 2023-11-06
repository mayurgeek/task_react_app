import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { search_task_api, apiCallAddTask, stepUpDown, deleteTaskApi } from './call_apis/apis.js'
const App = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [inputValuePop, setInputValuePop] = React.useState('');
  const [tasklist, setTasklist] = React.useState('');

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    apiCall(inputValue)
  };
  const handleInputChangePop = (e) => {
    setInputValuePop(e.target.value);
    // apiCall(inputValue)
  };

  const handlePopupSubmit = async () => {
    console.log(inputValuePop);
    try {
      let resData = await apiCallAddTask(inputValuePop)
      if (resData.status) {
        console.log(resData.response)
        setInputValuePop("")
        apiCall()
        setAnchorEl(null)
      } else {
        alert(resData, "resMsg")
        setInputValuePop("")
        setAnchorEl(null)
      }
    } catch (e) {
      console.log(e)
    }
  };
  const apiCall = async (search_val = "") => {
    try {
      let resData = await search_task_api(search_val);
      console.log(resData)
      if (resData.status) {
        setTasklist(resData.response)
      } else {
        alert(resData.resMsg)
      }
    } catch (e) {
      console.log(e)
    }

  }
  useEffect(() => {
    apiCall()
  }, [])

  const stepUpDownFun = async (id, step) => {
    console.log({ id, step })
    try {
      const resData = await stepUpDown(id, step)
      console.log("----console.log(resData)----------------")
      console.log(resData)
      if (resData.status) {
        apiCall()
      } else {
        alert(resData["res.Msg"])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTaskFun = async (id) => {
    try {
      const resData = await deleteTaskApi(id)
      if (resData.status) {
        apiCall()
      } else {
        alert(resData.resMsg)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <AppBar className='mt-4 app-bar' position="static">
        <Toolbar>
          <InputBase
            placeholder="Search..."
            onChange={handleInputChange}
            value={inputValue}
            startAdornment={
              <IconButton color="secondary" size="small">
                <SearchIcon />
              </IconButton>
            } className='search-bar' />
          <div style={{ flexGrow: 1 }}></div>
          <Button onClick={handleOpenPopover} variant="contained" className='btn-task'>
            Add Task
          </Button>
        </Toolbar>
      </AppBar>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Container style={{ padding: '16px' }}>
          <TextField
            label="Task Name"
            variant="outlined"
            fullWidth
            onChange={handleInputChangePop}
            value={inputValuePop}
          />
          <Button
            onClick={handlePopupSubmit}
            variant="contained"
            style={{ marginTop: '8px', color: '#E4E7EE !importent' }}
          >
            Submit
          </Button>
        </Container>
      </Popover>
      <div className='parent-container'>
        <div style={{ width: '25%', display: 'contents' }}>
          <Container className='custom-container'>
            {(tasklist || []).map((item, index) => {
              return (item.step === 1 ?
                <div className='task-box'>
                  <input id={"task_box_id" + item.id} type="hidden" value={item.id} />
                  <div className='arrows'>
                    <div className='mt-2'>{"(" + item.id + ") "}{item.title}</div>
                    <IconButton className='btn-dlt' onClick={
                      () => deleteTaskFun(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <div className='arrows'>
                    <IconButton className='btn-arrow' onClick={() => stepUpDownFun(item.id, "left")}>
                      <ArrowLeftIcon />
                    </IconButton>
                    {/* <div>1</div> */}
                    <IconButton className='btn-arrow' onClick={
                      () => stepUpDownFun(item.id, "rigth")
                    }>
                      <ArrowRightIcon />
                    </IconButton>
                  </div>
                </div> : null)
            })}
          </Container>
          <Container className='custom-container'>
            {(tasklist || []).map((item, index) => {
              return item.step === 2 ?

                <div className='task-box'>
                  <div className='arrows'>
                    <div className='mt-2'>{"(" + item.id + ") "}{item.title}</div>
                    <IconButton className='btn-dlt' onClick={
                      () => deleteTaskFun(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <div className='arrows'>
                    <IconButton className='btn-arrow' onClick={
                      () => stepUpDownFun(item.id, "left")
                    }>
                      <ArrowLeftIcon />
                    </IconButton>
                    {/* <div>1</div> */}
                    <IconButton className='btn-arrow' onClick={
                      () => stepUpDownFun(item.id, "rigth")
                    }>
                      <ArrowRightIcon />
                    </IconButton>
                  </div>
                </div> : null

            })}
          </Container>

          <Container className='custom-container'>
            {(tasklist || []).map((item, index) => {
              return item.step === 3 ?
                <div className='task-box'>
                  <div className='arrows'>
                    <div className='mt-2'>{"(" + item.id + ") "}{item.title}</div>
                    <IconButton className='btn-dlt' onClick={
                      () => deleteTaskFun(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <div className='arrows'>
                    <IconButton className='btn-arrow' onClick={
                      () => stepUpDownFun(item.id, "left")
                    }>
                      <ArrowLeftIcon />
                    </IconButton>
                    {/* <div>1</div> */}
                    <IconButton className='btn-arrow' onClick={
                      () => stepUpDownFun(item.id, "rigth")
                    }>
                      <ArrowRightIcon />
                    </IconButton>
                  </div>
                </div> : null
            })}


          </Container>

          <Container className='custom-container'>
            {(tasklist || []).map((item, index) => {
              return item.step === 4 ?
                <div className='task-box'>
                  <div className='arrows'>
                    <div className='mt-2'>{"(" + item.id + ") "}{item.title}</div>
                    <IconButton className='btn-dlt' onClick={
                      () => deleteTaskFun(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <div className='arrows'>
                    <IconButton className='btn-arrow' onClick={
                      () => stepUpDownFun(item.id, "left")
                    }>
                      <ArrowLeftIcon />
                    </IconButton>
                    {/* <div>1</div> */}
                    <IconButton className='btn-arrow' onClick={
                      () => stepUpDownFun(item.id, "rigth")
                    }>
                      <ArrowRightIcon />
                    </IconButton>
                  </div>
                </div> : null
            })}


          </Container>
        </div>
        {/* Add three more similar container components here */}
      </div>
    </>
  );
};

export default App;