import UserInfo from '../UserInfo/UserInfo'
import type { Post } from '../../Types/posts.type'
import { Link } from 'react-router-dom'
import CommentForm from '../CommentForm/CommentForm'
import HeaderPost from '../HeaderPost/HeaderPost'
// import { id } from 'zod/v4/locales'

const PostComp = ({ post, isPostDetails }: { post: Post, isPostDetails: boolean }) => {
  return (
    <div>
      <div className='bg-slate-700 p-5 mb-3 rounded-xl'>
        {/* header */}
        <div className="header">
          <HeaderPost userName={post?.user?.name} userImg={post?.user?.photo} createAt={post?.createdAt} userPostId={post?.user?._id} postId={post?.id}/>

        </div>

        {/* body */}

        <div className="body my-4">
          <p className='text-center'>{post?.body}</p>
          <img className='mt-4 w-full' src={post?.image} alt="" />
        </div>

        {/* comments */}
        {post?.comments.length == 0 ? <h1 className='text-center font-bold'>No Comments</h1>:""}

        {post?.comments.length > 0  && !isPostDetails ? <div className="comments p-3 rounded-sm bg-slate-600 border-2 border-slate-200/20">

          <Link to={`/PostDetails/${post.id}`} className='text-center block text-blue-500 mb-2'>View All Comments</Link>
          <UserInfo userName={post?.comments[0]?.commentCreator?.name} userImg={post?.comments[0]?.commentCreator?.photo.includes("undefined") ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_lvjjRAVDQ-nBDq_4dy1xCyRjjDaHV-Tqcw&s" : post?.comments[0]?.commentCreator?.photo} createAt={post?.comments[0]?.createdAt} />

          <p className='mt-4'>{post?.comments[0]?.content}</p>
        </div> :
          <>
            {post?.comments && (
              <>
                {post?.comments.map(function (post, idx) {
                  return (
                    <div key={idx} className="comments mb-3 p-3 rounded-sm bg-slate-600 border-2 border-slate-200/20">

                      <UserInfo userName={post?.commentCreator?.name} userImg={post?.commentCreator?.photo.includes("undefined") ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_lvjjRAVDQ-nBDq_4dy1xCyRjjDaHV-Tqcw&s" : post?.commentCreator?.photo} createAt={post?.createdAt} />

                      <p className='mt-4'>{post?.content}</p>
                    </div>
                  )

                })}
              </>)}
          </>}

          <CommentForm  id={post.id}/>
      </div>
    </div>
  )
}

export default PostComp
