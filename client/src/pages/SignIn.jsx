import { Link ,useNavigate  } from "react-router-dom"
import  { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useState } from "react"
export default function SignIn() {
  const [FormData,setFormData]=useState({})
  const [errorMessage,seterrorMessage]=useState(null)
  const [Loading,setLoading]=useState(false)
  const navigate=useNavigate()

  const handleChange=(e)=>{
    setFormData({...FormData,[e.target.id]:e.target.value.trim()})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if( !FormData.email || !FormData.password){
        return seterrorMessage(' Please fill out all fields')
    }
    try{
      setLoading(true);
      seterrorMessage(null);
        const res=await fetch('/api/auth/signin',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(FormData)
        });
        const data= await res.json();
        if(data.success ===false){
          setLoading(false);
          return seterrorMessage(data.message)
        }
        setLoading(false);
        if(res.ok){
          navigate('/')
        }
    }catch(err){
      seterrorMessage(err.message)
    }
  }
  return (
    <div className=' min-h-screen mt-20'>
      <div className=" flex p-3 max-w-3xl mx-auto flex-col gap-5  md:flex-row md:items-center">
        {/* left side */}
        <div className=" flex-1">
        <Link to='/' className=' text-4xl  font-bold dark:text-white'>
            <span className='py-1 px-2  bg-gradient-to-r 
             from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Sahand's</span>
            Blog
        </Link>
        <p className=" text-sm mt-5">This is a demo project. You can sign in with your email and password or with Google.</p>

        </div>
        {/* right side */}
        <div className=" flex-1">
          <form className=" flex flex-col gap-4 " onSubmit={handleSubmit} >
          
            <div>
              <Label value=" Your Email" />
              <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange}/>
            </div>
            <div>
              <Label value=" Your Password" />
              <TextInput type="password" placeholder="********" id="password" onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToPink' type="submit" disabled={Loading}>
              {
                Loading ? <><Spinner size='sm'/> <span className="pl-3">loading...</span></>: "Sign In"
              }
                
            </Button>
          </form>
          <div className=" flex gap-2 text-sm mt-5">
            <span>Dont Have an account?</span>
            <Link to='/sign-up' className=" text-blue-500">
              Sign Up
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className="mt-5" color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>  
      </div>  
    </div>
  )
}
