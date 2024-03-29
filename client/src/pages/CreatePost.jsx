import {Alert, Button, FileInput, Select, TextInput} from 'flowbite-react'
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom'

import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getStorage,ref,uploadBytesResumable,getDownloadURL } from 'firebase/storage';
export default function CreatePost() {
  const [FormData,setFormData]=useState({});
  const [imageFile,setimageFile]=useState(null);
  const [ImageUploadProgress,setImageUploadProgress]=useState(null);
  const[IamgeFileUploadError,setIamgeFileUploadError]=useState(null);
  const[PuplishError,setPuplishError]=useState(null);
    
      const navigate=useNavigate();
  const handleIamgeChange=(e)=>{
    const file=e.target.files[0];
   
    if(file){
      setimageFile(file)
    }
}
  const handleImageUpload=()=>{
       
    try{
        if(!imageFile){
           IamgeFileUploadError('pleass upload a image');
           return;
        }
    setIamgeFileUploadError(null);
    const storage=getStorage(app);
    const fileName=new Date().getTime()+ imageFile.name;
    const storageRef=ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef,imageFile);
    uploadTask.on(
    'state_changed',
    (snapshot)=>{
        const progress=
        (snapshot.bytesTransferred / snapshot.totalBytes) *100;
        setImageUploadProgress(progress.toFixed(0));
    },
    ()=>{
        setIamgeFileUploadError('could not upload image (file must be less then 2MB)')
        setimageFile(null);
        setImageUploadProgress(null);
    },
    ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
            setFormData({...FormData,image:downloadUrl});
            setIamgeFileUploadError(null);
            setImageUploadProgress(null);
        })})
        
    }catch(err){
      setIamgeFileUploadError('image upload failed');
      setImageUploadProgress(null);
    }
  }
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
      const response=await fetch('/api/post/create/',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(FormData)
      })
      const data=await response.json();
      if(!response.ok){
        setPuplishError(data.message)
        return ;
      }
      setPuplishError(null);
      navigate(`/post/${data.slug}`);

    }catch(err){
     return setPuplishError(err.message)
    }


  }
 
  return (
    <div className='p-3  max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
            <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput type='text'  placeholder='Title' required id='title' onChange={(e)=>setFormData({...FormData,title:e.target.value})} className='flex1' />
                    <Select onChange={(e)=>setFormData({...FormData,category:e.target.value})}>
                        <option value="uncategorized">Select a category</option>
                        <option value="javascript">JavaScript</option>
                        <option value="reactjs">React.js</option>
                        <option value="nextjs">Next.js</option>
                    </Select>
                </div>
                <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3" >
                    <FileInput onChange={handleIamgeChange} type='file' accept='image/*' />
                    <Button onClick={handleImageUpload} type='button' gradientDuoTone='purpleToBlue' size='md' outline disabled={ImageUploadProgress}>
                      {ImageUploadProgress?
                      <div className='w-16 h-16'>
                         <CircularProgressbar  value={ImageUploadProgress ||0} text={`${ImageUploadProgress}%`} />
                      </div>
                      :'Upload Image'}</Button>
                </div>
                {IamgeFileUploadError && <Alert color='failure'>{IamgeFileUploadError}</Alert>}
                {FormData.image && <img src={FormData.image} alt='uploadimage' className='w-full h-72  object-cover' />}
                <ReactQuill theme="snow" placeholder='Write Something...'
                 className=' h-72 mb-12' required  onChange={(value)=>setFormData({...FormData,content:value})} />
                <Button type='submit' gradientDuoTone='purpleToPink'>Puplish</Button>
                {PuplishError && <Alert className='mt-5' color='failure'>{PuplishError}</Alert>}
            </form>
    </div>
  )
}
