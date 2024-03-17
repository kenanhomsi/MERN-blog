import { useEffect, useState } from 'react'
import CallToAction from '../components/CallToAction'
import PostCard from '../components/PostCard'
import { Link } from 'react-router-dom';
export default function Home() {
  const [posts,setPosts]=useState([]);
  useEffect(()=>{
      const fechPosts=async()=>{
        try{
          const res=await fetch(`/api/post/getposts/`)
          const data =await res.json();
          if(res.ok){
            setPosts(data.posts);
          }
        }catch(err){
          console.log(err);
        }
      }
      fechPosts();
  },[])
  return (
    <div className="flex flex-col">
      <div className=" flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className="  text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-xs sm:text-sm text-gray-500">Here you'll find a variety of articles and tutorials on topics such as web development, software engineering, and programming languages.</p>
        <Link className="text-start text-xs sm:text-sm font-bold text-teal-500 hover:underline" to={'/search'}>
        View all posts
        </Link>
      </div>
      <div className=" bg-pink-100 p-3 dark:bg-slate-500 ">
        <CallToAction />
      </div>
      {posts && posts.length > 0 &&
      
      <div className=" flex flex-col gap-8 items-center my-10 max-w-6xl mx-auto p-3 py-7">
        <div className=" font-semibold text-2xl text-gray-800 dark:text-white">Recent Posts</div>
        <div className=" flex flex-wrap gap-4  justify-center">
          {posts.map((post)=>
          <PostCard post={post} key={post._id} />
          )}
        </div>
        <Link to={'/search'} className='text-blue-500 text-lg text-center hover:underline'>
        view all posts
          </Link> 
      </div>
      }
    </div>
  )
}
