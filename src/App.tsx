import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './component/Layout/Layout'
import Register from './component/Register/Register'
import Login from './component/Login/Login'
import Home from './component/Home/Home'
import { Toaster } from 'react-hot-toast'
import AuthContextProvider from './Context/AuthContext'
import ProdectedRoute from './Prodectedroute/ProdectedRoute'
import Profile from './component/Profile/Profile'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PostDetails from './component/PostDetails/PostDetails'
import { Offline } from 'react-detect-offline';







function App() {

   const client = new QueryClient()


  const router = createBrowserRouter([
    {path: "", element:<Layout /> , children:[
      {index:true , element:<ProdectedRoute > <Home /></ProdectedRoute>},
      {path:"profile" , element:<ProdectedRoute > <Profile /></ProdectedRoute>},
      {path:"home" , element:<ProdectedRoute > <Home /></ProdectedRoute>},
      {path:"PostDetails/:id" , element:<ProdectedRoute > <PostDetails /></ProdectedRoute>},
      {path:"login" , element:<Login />},
      {path:"register" , element:<Register />},
      {path:"*" , element: <h1>Not Found Page</h1>},
    ]}
  ])

  return (
    <AuthContextProvider>
      <QueryClientProvider client={client}>
    <Toaster/>
    
      <Offline>
        <div className='p-3 rounded-2xl bg-amber-600 fixed top-1/2 start-0'>
          Only shown offline (surprise!)
          </div>
          </Offline>
    
    <RouterProvider router={router} />
    </QueryClientProvider>
    </AuthContextProvider>
    
  )
}

export default App
