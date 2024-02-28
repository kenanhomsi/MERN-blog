import {Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle} from 'flowbite-react'
import { Link } from 'react-router-dom'
import { BsFacebook ,BsInstagram,BsTwitter,BsGithub,BsDribbble} from 'react-icons/bs'
export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500 '>

        <div className=" w-full  max-w-7xl mx-auto">
            <div className=" grid w-full justify-between sm:flex md:grid-cols-1">
                <div className=" mt-5">
                <Link to='/' className=' self-center whitespace-nowrap text-lg   sm:text-2xl font-bold dark:text-white'>
                    <span className='py-1 px-2  bg-gradient-to-r 
                    from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Sahand's</span>
                    Blog
                </Link>
                </div>
                <div className=" grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6 ">
                    <div >
                        <FooterTitle title='About' />
                    <FooterLinkGroup col >
                        <FooterLink href='#' target='_blank'> 100 js projects</FooterLink>
                        <FooterLink href='/About' target='_blank'> Sahand's Blog</FooterLink>

                    </FooterLinkGroup>
                    </div>
                    <div >
                        <FooterTitle title='FOLLOW US'/>
                        <FooterLinkGroup col >
                            <FooterLink href='#' target='_blank' >Github</FooterLink>
                            <FooterLink href='#' target='_blank' >Discord</FooterLink>

                        </FooterLinkGroup>
                    </div>
                    <div >
                        <FooterTitle title='LEGAL'/>
                        <FooterLinkGroup col >
                            <FooterLink href='#' target='_blank' >Privacy Policy</FooterLink>
                            <FooterLink href='#' target='_blank' >Terms & Conditions</FooterLink>

                        </FooterLinkGroup>
                    </div>
                </div>
            </div>
            <FooterDivider />
            <div className=" w-full sm:flex  sm:items-center sm:justify-between">
                <FooterCopyright href='#' by="Kenan's blog " year={new Date().getFullYear()}/>
                <div className=" flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                <FooterIcon href='#'  icon={BsFacebook}/>
                <FooterIcon href='#'  icon={BsInstagram}/>
                <FooterIcon href='#'  icon={BsTwitter}/>
                <FooterIcon href='#'  icon={BsGithub}/>
                <FooterIcon href='#'  icon={BsDribbble}/>
            </div>
            </div>
           
        </div>
    </Footer>
  )
}
