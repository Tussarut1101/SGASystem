import React, { useState, useEffect } from 'react';
import './Home.css';
import Header from '../Page/Header';
import { Home_Fn, Menu_Fn } from './Home_Fn';

function Home() {
  const empID = localStorage.getItem("emp_code");
  const { GETJOBS, counts } = Home_Fn();
  useEffect(() => {
    GETJOBS();
    const interval = setInterval(() => {
      GETJOBS(); // เรียกใช้งาน fetchData ทุกๆ 3 วินาที
    }, 3000);

    return () => clearInterval(interval);
  }, [empID]);

  const { handleMenu } = Menu_Fn();


  return (
    <div>
      <Header></Header>

      <div className='dFrist'>
        <div className='dContent'>
          <div className='dTitle'>Overview</div>
          <div className='dSubTitle'>Document pending in each status by user</div>
          <div className='dContentJobMain'>
            <div className='dContentJob'>
              <div className='dflex'>
                <label className='labelFont'>ISSUE</label>
                <div className='dLineIssue'></div>
                <div className='dOOO'></div>
              </div>
              <div className='dflex'>
                <div className='dContentJobRegister' onClick={() => handleMenu('/SGASystem/Transaction?txtHeader=SGA Register&txtSubHeader=Issue transaction&txtStatus=S10,S20,S30&txtType=TRANSACTION&txtAction=REGISTER')}>
                  <div className='dflex'>
                    <div className='dContentJobDetail1'>
                      SGA Register
                    </div>
                    <div className='dContentJobDetail2'>
                      {counts.count_iss}
                    </div>
                  </div>
                  <div className='dflex'>
                    <div className='dContentJobDetail1_1'>
                      Create / Advisor / Member / Gen Plan
                    </div>
                    <div className='dContentJobDetail2'>

                    </div>
                  </div>
                </div>
                <div className='dContentJobResult' onClick={() => handleMenu('/SGASystem/Transaction?txtHeader=SGA Update Result&txtSubHeader=Issue transaction&txtStatus=S40,S60,S80,S100,S120,S140,S60N,S80N,S100N,S120N,S140N,S160N&txtType=TRANSACTION&txtAction=UPDATE')}>
                  <div className='dflex'>
                    <div className='dContentJobDetail1'>
                      Waiting Result
                    </div>
                    <div className='dContentJobDetail2'>
                      {counts.count_res}
                    </div>
                  </div>
                </div>
              </div>
              <div className='dblank'></div>
              <div className='dflex'>
                <label className='labelFont'>APPROVE</label>
                <div className='dLineApprove'></div>
                <div className='dOOO'></div>
              </div>
              <div className='dflex'>
                <div className='dContentJobApprove' onClick={() => handleMenu('/SGASystem/Transaction?txtHeader=SGA Approve Result&txtSubHeader=Approve transaction&txtStatus=S50,S70,S90,S110,S130,S150&txtType=TRANSACTION&txtAction=APPROVE')}>
                  <div className='dflex'>
                    <div className='dContentJobDetail1'>
                      Waiting Approve
                    </div>
                    <div className='dContentJobDetail2'>
                      {counts.count_app}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Home