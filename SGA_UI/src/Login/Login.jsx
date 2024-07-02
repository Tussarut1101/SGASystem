import * as React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import './Login.css';
import Logo from '../Images/Logo.png';
import { TextField } from '@mui/material';
import { Login_Function } from './Login_Fn';



function Login() {
  const { LoginCHECK, settxtEmpID } = Login_Function();
  return (
    <div className='divFirst'>
      <Card className='CardFirst'>
        <div className='divLogo'>
          <img src={Logo} alt="Logo" className='logo' />
        </div>
        <div>
          <label className='divnamesys'>SGASystem</label>
        </div>
        <div className='divTextLogin'>
          <TextField id="standard-basic" label="Employee ID" variant="standard" fullWidth="true" onChange={(e) => settxtEmpID(e.target.value)} />
        </div>
        <div className='divBtnLogin'>
          <Button variant="contained" className='btnLogin' fullWidth="true" onClick={LoginCHECK}>Login</Button>
        </div>
      </Card>
    </div>)
}

export default Login