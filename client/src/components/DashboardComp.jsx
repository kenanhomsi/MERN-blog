import { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import {Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from 'flowbite-react'
import {Link}from 'react-router-dom'
import {HiOutlineUserGroup,HiArrowNarrowUp,HiAnnotation,HiDocumentText}from 'react-icons/hi'
export default function DashboardComp() {
    const [users,setUsers]=useState([]);
    const [comments,setComments]=useState([]);
    const [posts,setPosts]=useState([]);
    const [totalusers,settotalUsers]=useState(0);
    const [totalposts,setTotalPosts]=useState(0);
    const [totalcomments,setTotalComments]=useState(0);
    const [lastMountUsers,setlastMountUsers]=useState(0);
    const [lastMountposts,setlastMountposts]=useState(0);
    const [lastMountComments,setlastMountComments]=useState(0);
    const {currentUser}=useSelector(( state )=> state.user);
    useEffect(()=>{
        const fetchUsers=async()=>{
            try{
                const res=await fetch(`/api/user/getusers/?limit=5`)
                const data =await res.json();
                if(res.ok){
                    setUsers(data.users);
                    

                    settotalUsers(data.totalusers);
                    setlastMountUsers(data.lastMouthUsers);
                }
                
              }catch(err){
                console.log(err)
              }
        };
        const fetchPosts=async()=>{
            try{
                const res=await fetch(`/api/post/getposts/?limit=5`)
                const data =await res.json();

                if(res.ok){
                    setPosts(data.posts);
                    setTotalPosts(data.totalPosts);
                    setlastMountposts(data.lastMonthPosts);
                }
                
              }catch(err){
                console.log(err)
              }
        };
        const fetchComments=async()=>{
            try{
                const res=await fetch(`/api/comment/getComments/?limit=5`)
                const data =await res.json();
                if(res.ok){
                  setComments(data.comments);
                  setTotalComments(data.TotalComments);
                  setlastMountComments(data.CommentsOfLastMount);
                }
              }catch(err){
                console.log(err)
              }
        };
        if( currentUser.isAdmin ){
            fetchUsers();
            fetchPosts();
            fetchComments();
        }
    },[currentUser])

    // console.log(users)
    // console.log(comments)
    // console.log(posts)
    // console.log(totalusers)
    // console.log(totalposts)
    // console.log(totalcomments)
    // console.log(lastMountUsers)
    // console.log(lastMountposts)
    // console.log(lastMountComments)
    return (
    <div className="p-3  md:mx-auto">
        <div className="flex flex-wrap gap-4 justify-center">
        <div className=" flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md ">
            <div className=" flex justify-between">
                <div className="">
                    <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
                    <p className=" text-2xl">{totalusers}</p>
                </div>
                    <HiOutlineUserGroup className=" bg-teal-600 text-white rounded-full text-5xl shadow-lg p-3 "/>
            </div>
                <div className=" flex gap-2 text-sm">
                    <span className=" text-green-500 flex items-center">
                        <HiArrowNarrowUp />
                        {lastMountUsers}
                    </span>
                    <div className=" text-gray-500">last Mounth</div>
                </div>
        </div>
        <div className=" flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md ">
            <div className=" flex justify-between">
                <div className="">
                    <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
                    <p className=" text-2xl">{totalposts}</p>
                </div>
                    <HiDocumentText className=" bg-lime-600 text-white rounded-full text-5xl shadow-lg p-3 "/>
            </div>
                <div className=" flex gap-2 text-sm">
                    <span className="  text-green-500 flex items-center">
                        <HiArrowNarrowUp />
                        {lastMountposts}
                    </span>
                    <div className=" text-gray-500">last Mounth</div>
                </div>
        </div>
        <div className=" flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md ">
            <div className=" flex justify-between">
                <div className="">
                    <h3 className="text-gray-500 text-md uppercase">Total Comments</h3>
                    <p className=" text-2xl">{totalcomments}</p>
                </div>
                    <HiAnnotation className=" bg-indigo-600 text-white rounded-full text-5xl shadow-lg p-3 "/>
            </div>
                <div className=" flex gap-2 text-sm">
                    <span className=" text-green-500 flex items-center">
                        <HiArrowNarrowUp />
                        {lastMountComments}
                    </span>
                    <div className=" text-gray-500">last Mounth</div>
                </div>
        </div>
        </div>
        <div className=" flex flex-wrap gap-4 py-3 mx-auto justify-center">
            <div className=" flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                <div className="flex justify-between p-3 text-sm  font-semibold">
                    <h1 className="text-center p-2">Recent Users</h1>
                    <Button gradientDuoTone='purpleToPink' outline>
                        <Link to={'/dashboard/?tab=users'}>See All</Link>
                    </Button>
                </div>
                <Table hoverable>
                    <TableHead>
                        <TableHeadCell>user image</TableHeadCell>
                        <TableHeadCell>user name</TableHeadCell>
                    </TableHead>
                    <TableBody>
                        {users && users.map((user)=>
                        <TableRow key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <TableCell><img  className='w-10 h-10 bg-gray-500 rounded-full'src={user.profilePicture} alt="profile image" /></TableCell>
                            <TableCell>{user.username}</TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className=" flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                <div className="flex justify-between p-3 text-sm  font-semibold">
                    <h1 className="text-center p-2">Recent Comments</h1>
                    <Button gradientDuoTone='purpleToPink' outline>
                        <Link to={'/dashboard/?tab=comments'}>See All</Link>
                    </Button>
                </div>
                <Table hoverable>
                    <TableHead>
                        <TableHeadCell>Comment content</TableHeadCell>
                        <TableHeadCell>likes</TableHeadCell>
                    </TableHead>
                    <TableBody>
                        {comments && comments.map((comment)=>
                        <TableRow key={comment._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <TableCell className="w-96"><p className=" line-clamp-2">{comment.content}</p></TableCell>
                            <TableCell>{comment.numberOfLikes}</TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className=" flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                <div className="flex justify-between p-3 text-sm  font-semibold">
                    <h1 className="text-center p-2">Recent Posts</h1>
                    <Button gradientDuoTone='purpleToPink' outline>
                        <Link to={'/dashboard/?tab=posts'}>See All</Link>
                    </Button>
                </div>
                <Table hoverable>
                    <TableHead>
                        <TableHeadCell>Post image</TableHeadCell>
                        <TableHeadCell>Post Title</TableHeadCell>
                        <TableHeadCell>Category</TableHeadCell>
                    </TableHead>
                    <TableBody>
                        {posts && posts.map((post)=>
                        <TableRow key={post._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <TableCell><img  className='w-14 h-10 bg-gray-500 rounded-md'src={post.image} alt="profile image" /></TableCell>
                            <TableCell className="w-96">{post.title}</TableCell>
                            <TableCell className="w-5">{post.category}</TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

        </div>
    </div>
  )
}
