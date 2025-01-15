// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
// import food from "../assets/food.png"
// import axios from "axios";

// function Welcome() {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [showContent, setShowContent] = useState(false); // To control the fade-up animation
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Set a timeout to show the content with a delay
//     const timer = setTimeout(() => {
//       setShowContent(true);
//     }, 500); // Delay of 2 seconds

//     return () => clearTimeout(timer);
//   }, []);

//   const handleContinue = async () => {
//     if (!email.endsWith("@aiktc.ac.in")) {
//       setError("Please use a valid @aiktc.ac.in email.");
//       return;
//     }
//     try {
//       // Verify the email in MongoDB
//       const response = await axios.post("http://localhost:5000/api/verify-email", { email });
//       if (response.data.exists) {
//         navigate("/home");
//       } else {
//         navigate("/register");
//       }
//     } catch (err) {
//       setError("An error occurred while verifying the email.");
//     }
//   };

//   const handleSkip = () => {
//     navigate("/notification"); // Navigate to home if the skip button is clicked
//   };

//   return (
//     <div className="w-full h-screen bg-warm-orange flex flex-col items-center justify-between overflow-hidden relative">
//     <div className="md:hidden w-full h-screen bg-warm-orange flex flex-col items-center justify-between overflow-hidden relative"
//     style={{ backgroundImage: 'url("https://i.pinimg.com/736x/6b/81/c2/6b81c273ab9bec92f546c44650379ed0.jpg")' }}>
//     <div class="">
    
//       {/* Skip Button */}
//       <button onClick={handleSkip}
//         className="absolute top-5 right-5 bg-[#00000026] text-white font-extrabold text-sm py-2 px-4 rounded-2xl hover:bg-[#FF8A50] transition-all">
//         Skip
//       </button>

//       {/* Logo and Quote Section */}
//       <div className="z-10 text-center space-y-6 mt-24">
//       <div className="flex justify-center flex-col items-center">
//         {/* Logo */}
//         <img
//           src="https://i.pinimg.com/736x/13/a8/f5/13a8f5cd0deed9f4d5a54da69b641440.jpg" // Replace with your logo path
//           alt="Logo"
//           className="w-24 h-24 object-cover rounded-3xl mb-4"/>
//         <h1 className="font-extrabold text-2xl text-white">OneMenu</h1>
//       </div>

//       <p className="text-xl font-extrabold text-gray-200">
//         "Skip the Line, Enjoy the Dine!"<br />
//         <span className="text-[#FFA726]">Your Meal in Just Minutes!</span>
//       </p>

//       <p className="text-white">Log in or Sign up</p>

//       {/* Food Image with fade-up effect */}
//       <div className="relative">
//         <img src={food} alt="Food"
//           className="mb-14 w-full opacity-80 transform transition-all duration-1000 ease-in-out z-0"/>
//       </div>
//     </div>


//       {/* Input Field and Continue Button with fade-up animation */}
//       <div className={`transition-all z-10 duration-1000 transform ${
//         showContent ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
//       } w-full mx-auto bg-white py-10 rounded-2xl shadow-lg absolute bottom-0`}>
//         <h1 className="font-extrabold px-4 text-xl">Enter your Email</h1>
//         <div className="mt-6 w-full px-4">
//           <div className="relative flex items-center">
//             {/* Email Input Field */}         
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder=" "
//               className={`w-full px-4 py-4 border border-[#E3CAA5] rounded-xl text-[#534E55] focus:outline-none focus:ring-2 focus:ring-[#FFA726] transition-all ${
//                 email && "pt-6" // Adds padding to make room for the label when filled
//               }`}
//             />
//             <label
//               htmlFor="email"
//               className={`absolute left-4 top-4.5 text-[#534E55] transition-all ${
//                 email ? "text-[#FFA726] text-xs" : "text-sm"
//               } ${email ? "-top-4" : ""}`}
//             >
//               Enter your email
//             </label> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNWTD9OasxnFeLmqGEGZY8FzzC3J0v57crRQ&s" alt="c"
//           className="h-12 px-2" />
//           </div>
//           {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
//         </div>

//         <div className="px-4">
//           <button
//             onClick={handleContinue}
//             className={`py-4 px-4 my-4 w-full rounded-xl transition-all ${
//               email.endsWith("@aiktc.ac.in") && email !== ""
//                 ? "bg-[#FFA726] text-white hover:bg-green-600"
//                 : "bg-gray-200 cursor-not-allowed"
//             }`}
//             disabled={!email.endsWith("@aiktc.ac.in") || email === ""}
//           >
//             Continue
//           </button>
//         </div>

//         {/* Footer - Terms of Service and Privacy Policy */}
//         <div className="absolute bottom-0 w-full bg-gray-200 py-2 text-xs text-center mr-2">
//           <p className="text-[#534E55]">
//             By continuing, you agree to our{" "}
//             <span className="border-b-2 border-dashed border-[#534E55]">Terms of service</span> &{" "}
//             <span className="border-b-2 border-dashed border-[#534E55]">Privacy policy</span>
//           </p>
//         </div>
//       </div>

//       {/* Ensure the body and HTML do not overflow */}
//       <style>
//         {`
//           body, html {
//             height: 100%;
//             overflow: hidden;
//           }
//         `}
//       </style>
//     </div>
//     </div>
//     <div className="hidden md:flex w-full h-screen bg-[#FAF5FF] p-5 flex-col lg:flex-row items-center justify-center lg:justify-evenly">
//       {/* Image Section */}
//       <img
//         className="rounded-3xl w-full max-w-[99%] lg:max-w-lg h-[320px] sm:h-[400px] lg:h-full object-cover"
//         src="https://i.pinimg.com/564x/a5/84/72/a5847287e8fee4cd9b769b472022bcae.jpg"
//         alt="Image"
//       />

//       {/* Text and Buttons Section */}
//       <div className="flex flex-col items-center text-center lg:text-left mt-8 lg:mt-0 lg:w-1/2">
//         <h1 className="text-[#534E55] text-2xl sm:text-3xl md:text-4xl font-semibold">
//           Discover your favorite meal here
//         </h1>
//         <p className="text-[#534E55] mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg">
//           Explore all the most exciting dishes based on your taste and dietary preferences.
//         </p>

//         {/* Buttons */}
//         <div className="rounded-3xl mt-8 bg-[#F4F4F4] border-4 px-4 py-4 flex flex-col sm:flex-row gap-4 w-full max-w-[400px]">
//           <Link to="/register" className="w-full">
//             <button className="bg-[#F4F4F4] active:bg-slate-300 active:text-gray-900 active:border-[#979797] border border-transparent rounded-2xl text-[#5B5B5E] py-3 w-full text-sm sm:text-base">
//               Register
//             </button>
//           </Link>
//           <Link to="/login" className="w-full">
//             <button className="bg-[#F4F4F4] active:bg-slate-300 active:text-gray-900 active:border-[#979797] border border-transparent rounded-2xl text-[#5B5B5E] py-3 w-full text-sm sm:text-base">
//               Sign in
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default Welcome;















///////////////////////////////////////////////////////Perfect code with new Authentication
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Welcome() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // Step: 1 - Request OTP, 2 - Verify/Register
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    let countdown;
    if (!canResend) {
      countdown = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setCanResend(true);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
      if (countdown) clearInterval(countdown);
    };
  }, [canResend]);

  const handleSendOTP = async () => {
    if (!email.endsWith("@aiktc.ac.in")) {
      setError("Please use a valid @aiktc.ac.in email.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/send-otp", { email });
      setMessage(response.data.message);
      setIsNewUser(response.data.isNewUser);
      setStep(2);
      setResendTimer(60);
      setCanResend(false);
    } catch (error) {
      setError(error.response?.data?.message || "Server error.");
    }
  };

  const handleVerifyOTP = async () => {
    if (isNewUser && (!username || !password || password !== confirmPassword)) {
      setError("Ensure all fields are filled and passwords match.");
      return;
    }

    try {
      if (isNewUser) {
        const response = await axios.post("http://localhost:5000/register", {
          email,
          username,
          password,
          otp,
        });
        setMessage(response.data.message);
        navigate("/Notification");
      } else {
        const response = await axios.post("http://localhost:5000/verify-otp", {
          email,
          otp,
        });
        setMessage(response.data.message);
        navigate("/home");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Server error.");
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await axios.post("http://localhost:5000/resend-otp", { email });
      setMessage(response.data.message);
      setResendTimer(60);
      setCanResend(false);
    } catch (error) {
      setError(error.response?.data?.message || "Server error.");
    }
  };

  return (
    <div
      className="w-full h-screen bg-warm-orange flex flex-col items-center justify-between overflow-hidden relative"
      style={{
        backgroundImage:
          'url("https://i.pinimg.com/736x/6b/81/c2/6b81c273ab9bec92f546c44650379ed0.jpg")',
      }}
    >
      <div className="absolute top-5 right-5">
        <button
          onClick={() => navigate("/Notification")}
          className="bg-[#00000026] text-white font-extrabold text-sm py-2 px-4 rounded-2xl hover:bg-[#FF8A50] transition-all"
        >
          Skip
        </button>
      </div>
      <div className="z-10 text-center space-y-6 mt-24">
        <div className="flex justify-center flex-col items-center">
          <img
            src="https://i.pinimg.com/736x/13/a8/f5/13a8f5cd0deed9f4d5a54da69b641440.jpg"
            alt="Logo"
            className="w-24 h-24 object-cover rounded-3xl mb-4"
          />
          <h1 className="font-extrabold text-2xl text-white">OneMenu</h1>
        </div>
        <p className="text-xl font-extrabold text-gray-200">
          "Skip the Line, Enjoy the Dine!"<br />
          <span className="text-[#FFA726]">Your Meal in Just Minutes!</span>
        </p>
      </div>
      <div
        className={`transition-all duration-1000 ease-in-out ${
          showContent ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        } w-full mx-auto bg-white py-10 rounded-2xl shadow-lg absolute bottom-0`}
      >
        {step === 1 ? (
          <>
            <h1 className="font-extrabold px-4 text-xl">Enter your Email</h1>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-4 mt-4 border border-[#E3CAA5] rounded-xl"
            />
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            <button
              onClick={handleSendOTP}
              className={`bg-[#FFA726] w-full py-4 mt-4 text-white rounded-xl ${
                email.endsWith("@aiktc.ac.in") && email !== ""
                  ? ""
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!email.endsWith("@aiktc.ac.in")}
            >
              Continue
            </button>
          </>
        ) : (
          <>
            <h1 className="font-extrabold px-4 text-xl">Verify OTP</h1>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-4 mt-4 border border-[#E3CAA5] rounded-xl"
            />
            {isNewUser && (
              <>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Username"
                  className="w-full px-4 py-4 mt-4 border border-[#E3CAA5] rounded-xl"
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full px-4 py-4 mt-4 border border-[#E3CAA5] rounded-xl"
                  />
                  <button
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full px-4 py-4 mt-4 border border-[#E3CAA5] rounded-xl"
                  />
                  <button
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </>
            )}
            <button
              onClick={handleVerifyOTP}
              className={`bg-[#FFA726] w-full py-4 mt-4 text-white rounded-xl ${
                otp && (!isNewUser || (username && password === confirmPassword))
                  ? ""
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={
                !otp || (isNewUser && (!username || password !== confirmPassword))
              }
            >
              {isNewUser ? "Register" : "Login"}
            </button>
            {canResend ? (
              <button
                onClick={handleResendOTP}
                className="text-[#FFA726] text-sm mt-2"
              >
                Resend OTP
              </button>
            ) : (
              <p className="text-gray-500 text-sm mt-2">
                Resend OTP in {resendTimer}s
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Welcome;