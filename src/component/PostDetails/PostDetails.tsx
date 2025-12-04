import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import PostComp from '../PostComp/PostComp'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet';

const PostDetails = () => {


     const {id} = useParams()


    function getSinglePost(){
        return axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{
            headers:{
                token: localStorage.getItem("token")
            }
        })
    }

    



const {data , isLoading} = useQuery({
    queryKey:["postDetails" ,id ],
    queryFn:getSinglePost,
    

    
})
    
  if (isLoading) {
    return (
    <div className='h-screen flex justify-center items-center'>
      <i className='text-white fa-solid fa-spinner fa-spin fa-7x'></i>
    </div>
    )
  }

  return (
      <section className='w-full md:w-2/3 lg:w-1/2 mx-auto p-5 my-4'>
        <title>Post Details - </title>
          <Helmet>
                <title>Post Details - {data?.data.post.user.name}</title>
            </Helmet>
        <PostComp  post={data?.data.post} isPostDetails={true}/>
      </section>
  )
}

export default PostDetails
