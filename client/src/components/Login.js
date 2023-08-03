import { useState } from 'react'
import {FaUserPlus} from 'react-icons/fa'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const url = 'https://task-manager-m75j.onrender.com'
const Login = () => {
  let navigate = useNavigate()
    const [userData, setUserData] = useState({
      email:'', password:''
    })
    const [notVerified, setNotVerified] = useState(false)

    function onChange(e){
      setUserData({
        ...userData,[e.target.name]: e.target.value
      })
    }
  async  function handleSubmit (e){
      try {
        e.preventDefault();
          const {data} = await axios.post(url+'/api/user/login', {...userData})
          if(!data.success){
            alert(data.msg)
          }
          localStorage.setItem('token', data?.token)
        alert(data?.msg)
        navigate('/home', {state: {name: data.name}})
      } catch (error) {
        console.log(error)
        if(error.response.data?.msg == 'Account not verified.'){
          setNotVerified(true)
        }
        alert(error.response.data?.msg)
      }
    }

    async function handleResetOTP() {
      if(!userData.email){
        return alert("Please enter your email")
      }
     try {
      const {data} = await axios.get('/api/user/resendotp/'+userData.email)
      if(data.success){
        alert(data.msg)
        navigate(`/verify`, {state: {id: data.id}})
      }
     } catch (error) {
      console.log(error)
     }
    }
  return (
    <div className="min-h-screen bg-[#00243D] flex flex-col justify-center sm:py-12">
  <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
    <h1 className="font-bold text-center text-2xl mb-5 text-[#E4AE0C] ">Task Schedular</h1>
    <div className=" shadow bg-[#1f2936] w-full rounded-lg divide-y divide-gray-200 ">
      <div className="px-5 py-7 text-[#E4AE0C]">
        <form onSubmit={handleSubmit}>
        <label className="font-semibold text-sm pb-1 block">
          Email
        </label>
        <input
          type="email"
          name='email'
          onChange={onChange}
          className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-inherit"
          placeholder='Enter your mail'
          required
        />
        <label className="font-semibold text-sm  pb-1 block">
          Password
        </label>
        <input
          type="password"
          name='password'
          onChange={onChange}
          placeholder='Enter your password'
          className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-inherit"
          required
        />
        <button
          
          type="submit"
          className="transition duration-200 bg-[#f5bd1f] hover:bg-[#ffb300] hover:scale-105 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
        >
          <span className="inline-block mr-2 text-black">Login</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
            className="w-4 h-4 inline-block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
        </form>
      </div>
      {notVerified ?(<div>
          <a href="#" onClick={handleResetOTP}>Resend OTP?</a>
      </div>): null}
      <div className="py-5">
        <div className="">
          <div className="text-center sm:text-left">
            <button onClick={()=>navigate('/register')}  className="transition duration-200 w-9/12 flex justify-center gap-2 items-center mx-auto  py-2 cursor-pointer font-normal text-md bg-[#0b515b] hover:scale-105 rounded-lg text-slate-100  focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
            <span><FaUserPlus/></span>
              <span className="inline-block ml-1">Create an account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</div>

  )
}
export default Login