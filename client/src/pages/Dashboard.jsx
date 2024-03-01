import {useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
export default function Dashboard() {
  const location=useLocation();
  const [Tab,setTab]=useState();
  useEffect(()=>{
    const UrlParams=new URLSearchParams(location.search)
    const tabFromUrl=UrlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search])
  return (
    <div className=' min-h-screen flex flex-col md:flex-row'>
      <div className=" md:w-56">
        {/* side bar */}
        <DashSidebar />
      </div>
      <div className="">
        {/* main side */}
        {Tab === 'profile'&& <DashProfile />}
      </div>
    </div>
  )
}
