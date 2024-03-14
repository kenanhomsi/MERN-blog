import { Link } from "react-router-dom"
export default function PostCard({post}) {
  return (
    <div className=" group relative overflow-hidden w-full border transition-all border-teal-500 hover:border-2 h-[400px] rounded-lg sm:w-[360px]">
            <Link to={`/post/${post.slug}`}>
                <img src={post.image} alt={post.title}  className=" h-[260px] w-full object-cover group-hover:h-[200px] transition-all z-20  duration-300"/>
            </Link>  
            <div className=" flex flex-col p-3 gap-2">
                <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
                <span className=" italic text-sm">{post.category}</span>  
                <Link to={`/post/${post.slug}`}
                 className=" absolute bottom-[-200px] z-10 group-hover:bottom-0 left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md m-2 !rounded-tl-none">
                    Read article
                </Link>
            </div>    
    </div>
  )
}
