import {Button} from 'flowbite-react'
export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 text-center justify-center items-center rounded  rounded-tl-3xl rounded-br-3xl'>
        {/* left side */}
        <div className=' flex-1 justify-center flex flex-col '>
            <h2 className='text-2xl'>Want to learn more about JavaScript ?</h2>
            <p className='text-gray-500 my-2 '>Check out these resources with 100 JavaScript Projects</p>
            <Button gradientDuoTone='purpleToPink' className=' rounded-2xl rounded-bl-none rounded-tr-none  '><a href="https://google.com" rel='noopener noreferre' target='_blank'>100 JavaScript Projects</a></Button>
        </div>
        {/* right side */}
        <div className=" flex-1 p-7">
            <img src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221114110410/Top-10-JavaScript-Project-Ideas-For-Beginners-2023.png" alt="" />
        </div>
    </div>
  )
}
