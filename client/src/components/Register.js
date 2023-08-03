import axios from "axios";
import { useState } from "react";
import { IoLogIn, IoSendSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const url = "https://task-manager-m75j.onrender.com";
const Register = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    phone: "",
  });

  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(url + "/api/user/register", {
        ...userData,
      });
      if (!data.success) {
        alert("Try again after sometime.");
      }
      console.log(data);
      alert(data.msg);
      navigate(`/verify`, { state: { id: data._id } });
    } catch (error) {
      console.log(error);
      if (error.response.data.error) {
        alert(error.response?.data?.error[0]?.msg);
      } else if (error.response.data) {
        alert(error.response.data.msg);
      }
    }
  }
  return (
    <>
      <div className="min-h-screen bg-[#00243D] flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto w-11/12 md:max-w-3xl">
          <h1 className="font-bold text-center text-yellow-400 text-2xl mb-5">
            Register account
          </h1>
          <div className="bg-[#1f2936] shadow w-full rounded-lg divide-y divide-gray-200">
            {/* <div className="flex flex-col md:flex-row"> */}
            <form onSubmit={handleSubmit}>
              <div className="px-2 py-7  flex flex-col md:flex-row  justify-around text-[#E4AE0C]">
                <div className="md:w-5/12 w-11/12 ">
                  <label className="font-semibold text-sm  pb-1 block">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="Enter first name"
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-inherit"
                  />
                  <label className="font-semibold text-sm pb-1 block">
                    Lastname
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    placeholder="Enter last name"
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-inherit"
                  />
                  <label className="font-semibold text-sm pb-1 block">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter mail"
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-inherit"
                  />
                </div>
                <div className="md:w-5/12 w-11/12">
                  <label className="font-semibold text-sm pb-1 block">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="Enter password"
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-inherit"
                  />
                  <label className="font-semibold text-sm pb-1 block">
                    Confirm pasword
                  </label>
                  <input
                    type="password"
                    name="password2"
                    required
                    placeholder="Confirm password"
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-inherit"
                  />
                  <label className="font-semibold text-sm pb-1 block">
                    Enter Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Enter phone"
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-inherit"
                  />
                </div>
              </div>
              <div className="mx-auto w-9/12">
                <button
                  type="submit"
                  className="transition duration-200 flex justify-center gap-2 items-center bg-[#f5bd1f] focus:shadow-sm focus:ring-4 hover:scale-105 focus:ring-opacity-50 text-white w-full  py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center "
                >
                  <span className=" mr-2 text-black">Register</span>
                  <span className="text-black">
                    <IoSendSharp />
                  </span>
                </button>
              </div>
            </form>

            <div className="py-5 text-gray-300">
              <div className="text-center">
                <span>Already Registered? </span>
                <div className="text-center sm:text-left">
                  <button
                    onClick={() => navigate("/")}
                    className="transition duration-200 w-9/12 flex justify-center gap-2 items-center mx-auto  py-2 cursor-pointer font-normal text-md bg-[#0b515b]  rounded-lg text-slate-100 focus:outline-none focus:bg-gray-200 focus:ring-2 hover:scale-105 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                  >
                    <span className="inline-block ml-1">Login</span>
                    <span>
                      <IoLogIn />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
