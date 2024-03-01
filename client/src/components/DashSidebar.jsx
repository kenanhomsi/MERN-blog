import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react';
import { HiUser ,HiArrowSmRight } from 'react-icons/hi'
import {Link, useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'
export default function DashSidebar() {
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
    <Sidebar className=' w-full md:w-56'>
        <SidebarItems>
            <SidebarItemGroup>
                <Link to='/dashboard?tab=profile' >
                        <SidebarItem active={Tab==='profile'} icon={HiUser} label={'User'} labelColor='dark' >
                            Profile
                        </SidebarItem>
                </Link>
                <SidebarItem  icon={HiArrowSmRight} className=' cursor-pointer'>
                    Sign Out
                </SidebarItem>
            </SidebarItemGroup>
        </SidebarItems>
    </Sidebar>
  )
}
