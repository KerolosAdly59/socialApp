import { Link, useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import { authContext } from '../../Context/AuthContext';

const Navbar = () => {


  

  const {token , logout:contextlogout}=useContext(authContext)!

  const navegate = useNavigate()

  function logout() {
    contextlogout()
    navegate("/login")
    
  }
  return (
    <div className='px-25'>
      <div className="navbar py-3 bg-base-100 shadow-sm">
  <div className="flex-1">
{token?    <Link to="/" className="btn btn-ghost text-xl text-blue-600 dark:text-white font-bold">Linled Posts</Link> : <h1 className='text-2xl'>Login First</h1>}
  </div>

  {token?<div className="flex gap-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        

        <li>
          <Link to="/profile" className="justify-between">
            Profile
            
          </Link>
        </li>
        <li onClick={logout}><button>Logout</button></li>
      </ul>
    </div>
  </div>:<div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      <li>
          <Link to="/login" className="justify-between">
            Login
            
          </Link>
        </li>
        <li><Link to="/register">Register</Link></li> 
    </ul>
  </div>}
  
</div>
    </div>
  )
}

export default Navbar
