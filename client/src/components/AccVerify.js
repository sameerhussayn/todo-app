import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const url = "https://task-manager-m75j.onrender.com";

const AccVerify = () => {
  const location = useLocation();
  const { id } = location.state;
  const [otp, setOtp] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(url + "/api/user/verifyotp/" + id, {
        otp: +otp,
      });
      if (data.success) {
        alert(data.msg);
        window.location = "/";
      }
    } catch (error) {}
  }
  return (
    <>
      <div className="min-h-screen bg-[#00243D] flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md text-[#E4AE0C]">
          <h1 className="font-bold text-center text-2xl mb-5 ">
            Verify your account
          </h1>
          <div className="bg-[#1f2936] shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7">
              <form onSubmit={handleSubmit}>
                <label className="font-semibold text-sm  pb-1 block">OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full bg-inherit"
                  required
                  placeholder="Enter OTP received in mail"
                />

                <button
                  type="submit"
                  className="transition duration-200 bg-[#f5bd1f] hover:bg-[#ffb300] hover:scale-105 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  <span className="inline-block mr-2 text-black">
                    Verify now ☑️
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AccVerify;
