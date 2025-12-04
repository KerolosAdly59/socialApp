import axios from 'axios'
import type { Post } from '../../Types/posts.type'
import PostComp from '../PostComp/PostComp'
import { useQuery } from '@tanstack/react-query'
import AddPost from '../AddPost/AddPost'
import {Helmet} from "react-helmet";

const Home = () => {


  function getAllPosts() {
    return axios.get("https://linked-posts.routemisr.com/posts?limit=50", {
      headers: {
        token: localStorage.getItem("token")
      }
    }
    )
  }

  const { data, isLoading } = useQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPosts,
  })



  if (isLoading) {
    return (
    <div className='h-screen flex justify-center items-center'>
      <i className='text-white fa-solid fa-spinner fa-spin fa-7x'></i>
    </div>
    )
  }


  return (
    <>
   
      <section className='w-full md:w-2/3 lg:w-1/2 mx-auto p-5 my-4'>

       <Helmet>
                <title>Linked post</title>
            </Helmet>
      <div className='mb-5 text-center'>
        <AddPost />
      </div>

        {data?.data?.posts.map( function(post:Post , idx:number){return <PostComp key={idx} post={post} isPostDetails={false} />})}
      </section>
      </>
  );

}

export default Home
