import {useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import {FaCheck, FaTimes} from 'react-icons/fa'
import {Button, Table, TableBody,Modal,ModalHeader,ModalBody,TableCell, TableHead, TableHeadCell, TableRow} from 'flowbite-react'
export default function DashUsers() {
  const {currentUser}=useSelector((state)=>state.user);
  const[users,setUsers]=useState([]);
  const[showMore,setShowMore]=useState(true);
  const[showModel,setShowModel]=useState(false);
  const[UserIdToDelete,setUserIdToDelete]=useState(null);
  useEffect(()=>{
    const fetchUsers=async()=>{
      try{
        const res=await fetch(`/api/user/getusers`)
        const data =await res.json();
        if(res.ok){
            setUsers(data.users);
          if(data.users.length < 9){
            setShowMore(false);
          }
        }
        
      }catch(err){
        console.log(err)
      }
      
   }
   if(currentUser.isAdmin){
    fetchUsers();
  }

  },[currentUser._id]);

  const handleShowMore= async()=>{
    const startIndex=users.length;
    console.log(startIndex);
    try{
      const res=await fetch(`/api/user/getusers/?startIndex=${startIndex}`)
      const data =await res.json();
 
      if(res.ok){
        setUsers((pre)=>[...pre,...data.users]);
        if(data.users.length < 9){
          setShowMore(false);
        }
      }
      
    }catch(err){
      console.log(err)
    }
  }


//   const handleDeletePost = async () => {
//     setShowModel(false);
//     try {
//       const res = await fetch(
//         `/api/user/deleteUser/${UserIdToDelete}/${currentUser._id}`,
//         {
//           method: 'DELETE',
//         }
//       );
//       const data = await res.json();
//       if (!res.ok) {
//         console.log(data.message);
//       } else {
//         setUsers((prev) =>
//           prev.filter((post) => post._id !== UserIdToDelete)
//         );
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
const handleDeleteUser=async()=>{
  try{
      const res=await fetch(`/api/user/delete/${UserIdToDelete}`,{method:'DELETE'});
      const data= await res.json();
      if(res.ok){
        setUsers((pre)=>pre.filter((user)=> user._id !== UserIdToDelete))
        setShowModel(false);
      }else{
        console.log(data.message);
      }
  }catch(err){
    console.log(err);
  }
}
  return (
    <div className=' table-auto overflow-x-scroll md:mx-auto p-3 scrollbar  scrollbar-track-slate-100 dark:scrollbar-track-slate-700 scrollbar-thumb-slate-100 dark:scrollbar-thumb-slate-500'> 
      { currentUser.isAdmin   && users.length > 0 ? (
        <>
          <Table hoverable className=' shadow-md'>
            <TableHead>
              <TableHeadCell>Date Created</TableHeadCell>
              <TableHeadCell>user Image</TableHeadCell>
              <TableHeadCell>username</TableHeadCell>
              <TableHeadCell>email</TableHeadCell>
              <TableHeadCell>Admin</TableHeadCell>
              <TableHeadCell>delete</TableHeadCell>
            </TableHead>
            <TableBody  className=' divide-y'>
            {
              users.map((user,index)=>
               (
                  <TableRow className='bg-white dark:bg-gray-800 dark:border-gray-700' key={index}>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                        
                            <img src={user.profilePicture} alt={user.username} className=' w-10 rounded-full h-10 object-cover bg-gray-500' />
                       
                    </TableCell>
                    <TableCell>
                    {user.username}
                    </TableCell>
                    <TableCell>
                    {user.email}
                    </TableCell>
                    <TableCell>{user.isAdmin?<FaCheck className='text-green-500' />:<FaTimes className=' text-red-500'/>}</TableCell>
                    <TableCell><span onClick={()=>{
                      setShowModel(true);
                      setUserIdToDelete(user._id);
                    }
                      } className=' font-medium text-red-500 hover:underline cursor-pointer'>Delete</span></TableCell>
                    
                  </TableRow>
               )
               )
              }
              </TableBody>
          </Table>
          {showMore && <button onClick={handleShowMore} className='w-full text-teal-500 text-sm py-7 self-center'>show more</button>}
        </>
      ):(
        <p>you have no users yet!</p>
      )}
        <Modal show={showModel} popup onClose={()=> setShowModel(false)} size='md'>
            <ModalHeader />
            <ModalBody>
                <div className=" text-center">
                    <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                    <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want do delete this User ?</h3>
                    <div className=" flex justify-center gap-4">
                        <Button color='failure' onClick={handleDeleteUser} >yes ,I'am sure</Button>
                        <Button color='gray' onClick={()=>setShowModel(false)}>No ,Cancel</Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
      </div>
  )
}
