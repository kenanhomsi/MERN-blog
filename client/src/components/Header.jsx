import {Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, TextInput} from 'flowbite-react'
import { Link , useLocation ,useNavigate} from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import {FaMoon ,FaSun} from 'react-icons/fa'
import {useSelector ,useDispatch} from 'react-redux'
import {toggleTheme} from "../../redux/theme/themeSlice"
import { signOutSuccess } from '../../redux/user/userSlice'
import { useState,useEffect } from 'react'
export default function Header() {
    const [searchTerm,setsearchTerm]=useState('');
    const path=useLocation().pathname;
    const location=useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {currentUser}= useSelector(state => state.user);
    const {theme}= useSelector(state => state.theme);

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

    useEffect(()=>{
        const urlParams =new URLSearchParams(location.search);
        const searchTermFromUrl=urlParams.get('searchTerm')
        if(searchTermFromUrl){
            setsearchTerm(searchTermFromUrl);
        }
    },[location.search])
    const handleSubmit=(e)=>{
        e.preventDefault();
        const urlParams=new URLSearchParams(location.search);
        urlParams.set('searchTerm',searchTerm);
        const searchquery=urlParams.toString();
        navigate(`/search/?${searchquery}`);
    }
  return (
    <Navbar className='border-b-2' >
        <Link to='/' className=' self-center whitespace-nowrap text-sm sm:text-xl font-bold dark:text-white'>
            <span className='py-1 px-2  bg-gradient-to-r 
             from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Sahand's</span>
            Blog
        </Link>
        
        <form onSubmit={handleSubmit} className='flex'>
            <TextInput type='text' placeholder='Search'
             value={searchTerm} onChange={(e)=>setsearchTerm(e.target.value)} rightIcon={AiOutlineSearch}  className=' hidden lg:inline' />
             {/* <button type='submit' className=' z-20 ml-[-30px]'><AiOutlineSearch /></button> */}
        </form>
        <Button className=' w-12 h-12  lg:hidden' color='gray' pill>
            <AiOutlineSearch  />
        </Button>
        <div className=" flex gap-2  md:order-2">
            <Button className='w-12 h-10 hidden  sm:inline' color='gray' pill onClick={()=>dispatch(toggleTheme())}>
                 {theme ==='light' ?<FaSun /> :<FaMoon  /> }
            </Button>
            { currentUser ?(
                <Dropdown
                arrowIcon={false}
                inline
                label={
                    <Avatar alt='user' 
                    img={currentUser.profilePicture} rounded />}>
                <DropdownHeader>
                    <span className='block text-sm'>@{currentUser.username}</span>
                    <span className='block text-sm font-medium truncate'> @{currentUser.email}</span>
                </DropdownHeader>
                <Link to='/dashboard?tab=profile'>
                    <DropdownItem>Profile</DropdownItem>
                </Link>
                <DropdownDivider />
                <DropdownItem onClick={handleSignOut}>SignOut</DropdownItem>
                </Dropdown>
            )  :(

            <Link to='/sign-in'>
                <Button  gradientDuoTone='purpleToBlue' outline>
                    SigIn
                </Button>
            </Link>
            )}
            <Navbar.Toggle />
        </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link to='/'>Home</Link>           
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'} >
                <Link to='/about'>About</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/projects'} as={'div'} >                
                <Link to='/projects'>Projects</Link> 
                </Navbar.Link>

            </Navbar.Collapse>
    </Navbar>
  )
}
