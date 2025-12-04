
const UserInfo = ({userName , userImg ,createAt}:{userName:string , userImg:string , createAt:string}) => {
  return (
    <div className='flex justify-between items-center'>
            <div className='flex '>

              {/* avatar */}
              <div className="avatar me-3 rounded-full">
                <div className="w-12 rounded-full">
                  <img className='rounded-full' src={userImg} />
                </div>
              </div>


              {/* name, date */}
              <div>
                <h4>{userName}</h4>
                <p> {createAt}</p>
              </div>
            </div>
            {/* icon */}
            <div>
              <i className="fa-solid fa-ellipsis"></i>
            </div>
          </div>
  )
}

export default UserInfo
