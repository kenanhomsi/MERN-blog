import {TextInput ,Select, Button, Spinner} from 'flowbite-react'
import { useEffect, useState } from 'react'
import {useLocation ,useNavigate} from 'react-router-dom'
import PostCard from '../components/PostCard';
export default function Search() {
    const [sideBarData,setSideBarData]=useState({
        searhTerm:'',
        order:'decs',
        category:'uncategorized'
    })
    const [posts,setPosts]=useState([]);
    const [loading,setLoading]=useState(false);
    const [showMore,setShowMore]=useState(false);
    const location=useLocation();
    const navigate=useNavigate();
    useEffect(()=>{
        const urlParams=new URLSearchParams(location.search);
        const searchTermFromUrl=urlParams.get('searchTerm');
        const orderFromUrl=urlParams.get('order');
        const categoryFromUrl=urlParams.get('category');
        if(searchTermFromUrl || orderFromUrl || categoryFromUrl){
            setSideBarData({
                ...sideBarData,
                searhTerm:searchTermFromUrl,
                order:orderFromUrl,
                category:categoryFromUrl
            })
        }

        const fetchPosts= async()=>{
                setLoading(true);
                try{
                    const searchquerey=urlParams.toString();
                    const res=await fetch(`/api/post/getposts/?${searchquerey}`);
                    const data=await res.json();
                    if(!res.ok){
                        setLoading(false);
                        return console.log(data.message);
                    }
                    setPosts(data.posts);
                    setLoading(false);
                    if(data.posts.length === 9){setShowMore(true)}
                    else{setShowMore(false)}
                }catch(err){
                    setLoading(false);
                    console.log(err);
                }
        }
        fetchPosts();
    },[location.search])
    const handlechange=(e)=>{
        if(e.target.id ==='searchTerm'){
            setSideBarData({...sideBarData,searhTerm:e.target.value})
        }
        if(e.target.id === 'sort'){
            const order=e.target.value || 'decs';
            setSideBarData({
                ...sideBarData,order
            })
        }
        if(e.target.id === 'category'){
            const category =e.target.value || 'uncategorized';
            setSideBarData({
                ...sideBarData,category
            })
        }

    }
   const handleSubmit=(e)=>{
        e.preventDefault();
        const urlParams=new URLSearchParams(location.search);
        urlParams.set('searchTerm',sideBarData.searhTerm);
        urlParams.set('order',sideBarData.order);
        urlParams.set('category',sideBarData.category);
        navigate(`/search/?${urlParams.toString()}`);
   }
   const handleShowMore=async()=>{
    const startIndex=posts.length;
    const urlParams=new URLSearchParams(location.search);
    urlParams.set('startIndex',startIndex);
    const searchQuery=urlParams.toString();
    const res=await fetch(`/api/post/getposts/?${searchQuery}`);
    const data=await res.json();
    if(!res.ok){
       return console.log(data.message);
    }
    setPosts([...posts,...data.posts])
    if(data.posts.length === 9){setShowMore(true)}
    else{setShowMore(false)}
    
   }
    return (
    <div className='flex flex-col md:flex-row'>
        <div className=" p-7 border-b md:border-r md:min-h-screen border-gray-500">
            <form  className='flex flex-col gap-8' onSubmit={handleSubmit}>
                <div className=" flex items-center gap-2">
                    <label className=' whitespace-nowrap font-semibold'>Search Term:</label>
                    <TextInput  placeholder='search...' id='searchTerm' type='text' value={sideBarData.searhTerm} onChange={handlechange}/>
                </div>
                <div className=" flex items-center gap-2">
                    <label>Sort:</label>
                    <Select  id='sort' value={sideBarData.order}  onChange={handlechange}>
                            <option value="asc">Oldest</option>
                            <option value="decs">latest</option>
                    </Select>
                </div>
                <div className=" flex items-center gap-2">
                    <label>category:</label>
                    <Select   id='category' value={sideBarData.category} onChange={handlechange}>
                            <option value="uncategorized">Uncategorized</option>
                            <option value="reactjs">React.js</option>
                            <option value="javascript">JavaScript</option>
                            <option value="nextjs">Next.js</option>
                    </Select>
                </div>
                <Button  type='submit' gradientDuoTone='purpleToPink' outline> Apply Filter</Button>
            </form>
        </div>
        <div className="w-full">
            <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>Posts Result :</h1>
            <div className=" p-7 flex flex-wrap gap-4">
                {
                    !loading && posts.length === 0&& <p className='text-xl text-gray-500'>No posts Found.</p>
                }
                {
                    loading && <div className=" w-full min-h-screen flex justify-center items-center"><Spinner size='xl' /></div>
                }
                {
                    !loading && posts && posts.map((post)=>(
                        <PostCard key={post._id} post={post} />
                    ))
                }
                
            </div>
           <div className=" flex justify-center items-center my-7 ">
           {
                    showMore && <button onClick={handleShowMore} className=' text-lg p-7 text-teal-500 hover:underline'> show more</button>
            }
           </div>
        </div>
    </div>
  )
}
