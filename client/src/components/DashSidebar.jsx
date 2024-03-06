import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from 'flowbite-react';
import { HiUser ,HiArrowSmRight ,HiDocumentText } from 'react-icons/hi'
import {Link, useLocation} from 'react-router-dom'
import {useEffect, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { signOutSuccess } from '../../redux/user/userSlice';
export default function DashSidebar() {
  const {currentUser}= useSelector(state => state.user);
    const location=useLocation();
    const [Tab,setTab]=useState();
    const dispatch=useDispatch();
    useEffect(()=>{
      const UrlParams=new URLSearchParams(location.search)
      const tabFromUrl=UrlParams.get('tab');
      if(tabFromUrl){
        setTab(tabFromUrl);
      }
    },[location.search])
    const handleSignOut= async()=>{
      try{
        const res= await fetch('/api/user/signout/',{method:'POST'});
        const data=await res.json();
        if(!res.ok){
          console.log(data.message);
        }else{
          dispatch(signOutSuccess());
        }
      }catch(err){
          console.log(err.message)
      }

  }
  return (
    <Sidebar className=' w-full md:w-56'>
        <SidebarItems>
            <SidebarItemGroup className=' flex flex-col gap-1'>
            <Link to='/dashboard?tab=profile' >
                        <SidebarItem as='div' active={Tab==='profile'} icon={HiUser} label={currentUser.isAdmin?'Admin':'User'} labelColor='dark' >
                            Profile
                        </SidebarItem>
                </Link>
              {currentUser.isAdmin&& 
                
                <Link to='/dashboard?tab=posts' >
                        <SidebarItem as='div' active={Tab==='posts'} icon={HiDocumentText} label={currentUser.isAdmin?'Admin':'User'} labelColor='dark' >
                            posts
                        </SidebarItem>
                </Link>
              }
                <SidebarItem   icon={HiArrowSmRight} className=' cursor-pointer' onClick={handleSignOut}>
                    Sign Out
                </SidebarItem>
            </SidebarItemGroup>
        </SidebarItems>
    </Sidebar>
  )
}
