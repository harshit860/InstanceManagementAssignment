import React, { useEffect, useState } from 'react';
import './../style/dashboard.css'
import axios from 'axios';
import Switch from '@material-ui/core/Switch';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const Dashboard = () => {
  const [data, handleData] = useState([])
  const [currency, handleCurrency] = useState(true)
  const [running,handleRunning] = useState(0)
  const [stopped,handleStopped] = useState(0)
  const [running2,handleRunning2] = useState(0)
  const [stopped2,handleStopped2] = useState(0)
  const [go,handleGo] = useState(false)


  const currencyChange = () => {
    handleCurrency(prev => !prev)
  }

  const Logout = () => {
    console.log("inside log")
    sessionStorage.removeItem('login')
    handleGo(true)
  }

  const countInstance = (data) =>{
      let totalRunning = 0;
      let totalStopped = 0;
      let totalRunning2 = 0;
      let totalStopped2 = 0;
      data.map((val) =>{
        if(val.status == 'running')
        {
          totalRunning = totalRunning + val.costPerHour;
          totalRunning2 = totalRunning2 + val.costPerHour * 1000/15;
        }
        else
        {
          totalStopped = totalStopped + val.costPerHour;
          totalStopped2 = totalStopped2 + val.costPerHour * 1000/15;
        }
      })

      handleRunning(totalRunning.toFixed(2))
      handleStopped(totalStopped.toFixed(2))
      handleRunning2(totalRunning2.toFixed(2)) 
      handleStopped2(totalStopped2.toFixed(2))
  }
  const handleSwitch = (id) => {
    console.log(id)
    let newData = data.map(val => {
      if (val.id == id) {
        if (val['status'] == 'running') {
          val['status'] = 'stopped'
        }
        else
          val['status'] = 'running'
      }

      return val;
    })

    handleData(newData)
  }
  useEffect(() => {

    var config = {
      method: 'get',
      url: 'http://localhost:8080/api/instances',
      headers: {
        'Authorization': `Bearer Fe26.2**e342a497ac9d5516a37b9a849aae89958ce47393ea2e06e46fba0be1c4e656c7*BXBIoArDdgjNPBkvpSIszA*gJWizNvAvayTSGFNdhWuELALVBcJ0cYa7EmjhuCvzX4**103a960aa26f77a56b3f198c1e630a7fe578e799039f56d125dfcd7175f887c2*9zs15AIPlQcjSrIf5iqgFMias5Coa_D4ntQRmBYq5OQ`
      }
    };

    axios(config)
      .then((response) => {
        handleData(response.data.instances);
        countInstance(response.data.instances);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [])

  const rows = data.map((value, index) => {
    return <div className="singlerow" style={{ backgroundColor: "#e9f0f0" }}>
      <p style={{ width: '10%' }}>{value.id}</p>
      <p style={{ width: '10%' }}>{value.name}</p>
      <p style={{ width: '30%' }}>{(currency) ? ('$'):('₹')} {value.costPerHour}</p>
      <p style={{ width: '20%', color: (value.status == 'stopped') ? ('red') : ('#005a3c') }}>{value.status}</p>
      <p style={{ width: '20%' }}>{(value.status === 'stopped') ? (<button id="start" onClick={() => handleSwitch(value.id)}>start</button>) : (<button id="stop" onClick={() => handleSwitch(value.id)}>stop</button>)}</p>
    </div>
  })
  console.log(running,stopped)
  return (
    <div className="main">
      <div id="nav">
        <div style={{ backgroundColor: "transparent", border: 'none', color: "white", fontSize: 35, padding: 35 }}>Dashboard</div>
        <button style={{ backgroundColor: "transparent", border: 'none', color: "white", fontSize: 35, padding: 35 }} onClick={() => Logout()}>logout</button>
      </div>
      <div id="status" style={{ display: "flex", justifyContent: "space-around" }}>
      <div style={{padding:20}}>
        <b> {(currency) ? (`$ ${running}`):(`₹ ${running2}`)} / hr</b>
        <p>Running Instances</p>
      </div>
      <div style={{padding:20}}>
        <b> {(currency) ? (`$ ${stopped}`):(`₹ ${stopped2}`)}/ hr</b>
        <p>Stopped Instances</p>
      </div>
        <span style={{ display: "flex", flexDirection: "row" }}>
          <p>INR</p>
          <Switch
            checked={currency}
            color="default"
            onChange={currencyChange}
          />
          <p>USD</p>
        </span>
      </div>

      <div id="status2">
        <div style={{ padding: 10, borderRadius: 50 }}>
          <div style={{ padding: 10 }}>
            <h3>
              Instances
            </h3>
          </div>
          <div className="singlerow" style={{ backgroundColor: '#b8d5d1' }}>
            <p style={{ width: '10%' }}>ID</p>
            <p style={{ width: '10%' }}>Instance Name</p>
            <p style={{ width: '30%' }}>Cost Per Hour</p>
            <p style={{ width: '20%' }}>Status</p>
            <p style={{ width: '20%' }} >Action</p>
          </div>
          {rows}
        </div>
      </div>
      {go ? (<Redirect to="/" ></Redirect>) : ('')}
    </div>
  )
}
export default Dashboard;