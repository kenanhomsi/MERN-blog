import { useEffect, useState } from 'react';
import {useParams ,Link} from 'react-router-dom'
import {Button, Spinner}from 'flowbite-react'
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
export default function PostPage() {
    const{ postSlug }=useParams();
    const [loading,setLoading]=useState(true);
    const [Error,setError]=useState(false);
    const [Post,setPost]=useState(null);
    const [RecentPosts,setRecentPosts]=useState(null);
    useEffect(()=>{
        const fetchPost=async()=>{
            try{
                setLoading(true);
                const res= await fetch(`/api/post/getposts/?slug=${postSlug}`);
                const data=await res.json();
                if(!res.ok){
                    setError(true);
                    setLoading(false);
                    return;
                }
                if(res.ok){
                    setPost(data.posts[0]);
                    setError(false);
                    setLoading(false);
                }

            }catch(err){
                setError(true);
                setLoading(false);
            }
        }
        fetchPost();
    },[postSlug]);
    useEffect(()=>{
        
            try{
                const fetchRecentPosts=async()=>{
                    const res=await fetch(`/api/post/getposts/?limit=3&order=dec`);
                    const data=await res.json();
                    if(res.ok){
                        setRecentPosts(data.posts)
                    }
                    console.log(data.posts);
            }
            fetchRecentPosts();
            }catch(err){
                console.log(err);
            }
       

    },[])
    if(loading){return <div className=' flex justify-center items-center min-h-screen'>
    <Spinner size='xl' />
</div>}
  return (
    <mian className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h1 className=' text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{Post && Post.title}</h1>
        <Link to={`/search/?category=${Post.category}`} className='mt-5 self-center'>
            <Button color='gray' pill size='xs'>
                    {Post && Post.category}
            </Button>
        </Link>
        <img src={Post && Post.image} alt={Post && Post.title}  className='mt-10  p-3 max-h-[600px] w-full object-cover'/>
        <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
            <span>{Post && new Date(Post.createdAt).toLocaleDateString()}</span>
            <span className=' italic'>{Post && (Post.content.length /1000).toFixed(0)} mins read</span>
        </div>
        <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{__html:Post &&Post.content}}></div>
        <div className=" max-w-4xl mx-auto w-full ">
            <CallToAction />
        </div>
            <CommentSection postId={Post._id} />
            <div className=" flex flex-col justify-center items-center mb-5">
                <h1 className='text-xl mt-5'>Recent articles</h1>
                <div className=" flex flex-wrap gap-5 my-5 justify-center">
                    {
                        RecentPosts && RecentPosts.map((post)=>
                            <PostCard key={post._id} post={post} />
                        )
                    }
                </div>
            </div>
    </mian>
  )
}
