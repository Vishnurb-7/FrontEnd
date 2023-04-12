import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../../components/adminComponents/Sidebar'
import { currentToken } from '../../features/authSlice'
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import axios from '../../utils/axios'


const AdminHome = () => {
  ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get('/admin/dashboard').then((res) => {
      setData(res.data);

    })
  }, []);

  const chartConfigs = {
    type: 'column2d',
    width: 1000,
    height: 500,
    dataFormat: 'json',
    dataSource: data
    ,
  };
  const token = useSelector(currentToken)
  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full flex justify-center items-center'>
        {/* <Banner2 type="admin" /> */}
        <ReactFC {...chartConfigs} />
      </div>
    </div>
  )
}


export default AdminHome