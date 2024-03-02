import {useSelector} from 'react-redux'
import {Alert, Button, TextInput} from 'flowbite-react'
import { useState ,useRef, useEffect} from 'react';
import {getStorage, ref, uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import {app} from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
export default function DashProfile() {
    const {currentUser}=useSelector(state => state.user);
    const [imageFile,setIamgeFile]=useState(null);
    const [imageFileUrl,setIamgeFileUrl]=useState(null);
    const [IamgeFileUploadProgress,setIamgeFileUploadProgress]=useState(null);
    const [IamgeFileUploadError,setIamgeFileUploadError]=useState(null);
    const filePickerRef=useRef();
    const handleIamgeChange=(e)=>{
        const file=e.target.files[0];
        if(file){
            setIamgeFile(file)
            // setIamgeFileUrl(URL.createObjectURL(file));
        }
    }
    useEffect(()=>{
        if(imageFile){
            uploadImage();
        }
    },[imageFile])
    const uploadImage=async ()=>{
        // firebase storage code for rules:
        // service firebase.storage {
        //     match /b/{bucket}/o {
        //       match /{allPaths=**} {
        //         allow read
        //         allow write: if 
        //         request.resource.size < 2 * 1024 * 1024 && 
        //         request.resource.contentType.matches('image/.*')
        //       }
        //     }
        //   }
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
                setIamgeFileUploadProgress(progress.toFixed(0));
            },
            ()=>{
                setIamgeFileUploadError('could not upload image (file must be less then 2MB)')
                setIamgeFileUploadProgress(null);
                setIamgeFile(null);
                setIamgeFileUrl(null);
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                    setIamgeFileUrl(downloadUrl);
                setIamgeFileUploadProgress(null);

                })
            }
        )
        }
  return (
    <div  className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <input className=' hidden' type='file' accept='image/*' ref={filePickerRef} onChange={handleIamgeChange} />
            <div className=" relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
                
                {IamgeFileUploadProgress && <CircularProgressbar  value={IamgeFileUploadProgress ||0}
                 text={`${IamgeFileUploadProgress}%`} strokeWidth={5} styles={{root:{
                    width:'100%',
                    height:'100%',
                    position:'absolute',
                    top:0,
                    left:0
                 },path:{
                    stroke:`rgba(62,152,199,${IamgeFileUploadProgress / 100})`
                 },
                 }}/>}
                <img src={imageFileUrl?imageFileUrl:currentUser.profilePicture}
                alt="user profile image" onClick={()=>filePickerRef.current.click()} 
                className={` rounded-full w-full border-8  object-cover border-[lightgray] ${IamgeFileUploadProgress && IamgeFileUploadProgress < 100 && ' opacity-60'} `} />
            </div>
            {IamgeFileUploadError && 
                <Alert color='failure'>{IamgeFileUploadError}</Alert>
            }
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
            <TextInput type='text' id='email' placeholder='email' defaultValue={currentUser.email} />
            <TextInput type='password' id='password' placeholder='password'  />
            <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
        </form>
        <div className=" text-red-500 flex justify-between mt-5">
            <span className='cursor-pointer' >Delete Account</span>
            <span className='cursor-pointer'>Sign Out</span>
        </div>
    </div>
  )
}