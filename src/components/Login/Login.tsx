"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // const response = await fetch("http://localhost:8000/api/login/", {
        const response = await fetch("https://rattleviper.pythonanywhere.com/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.error) {
        setError(responseData.error);
      } else {
        // Handle successful login (e.g., save token, redirect, etc.)
        router.push('/');
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError('Wrong credential please try login in again!.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="container mx-auto grid space-y-2 border p-[40px] m-[10px] shadow-md shadow-black"
      >
        <h1 className="text-center font-bold text-[2rem] text-gray-500">LOGIN PAGE</h1>
        <label htmlFor="email" className="text-gray-500">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="username"
          value={data.email}
          onChange={handleChange}
          className="border p-[3px] pl-[10px] rounded w-full outline-blue-100"
        />

        <label htmlFor="password" className="text-gray-500">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="*******"
          value={data.password}
          onChange={handleChange}
          className="border p-[3px] pl-[10px] rounded w-full outline-blue-100"
        />

        <button
          type="submit"
          className="py-1 px-4 text-gray-500 bg-blue-100 hover:bg-black hover:text-white"
        >
          <div className="flex justify-center items-center">
            {isLoading ? (
              <div className="flex items-center gap-3">
                <p>Loading ....</p>
              </div>
            ) : (
              <p>Login</p>
            )}
          </div>
        </button>

        {error && <p className="text-red-500">{error}</p>}

        <p className="text-gray-500">
          Please SignUp here{" "}
          <Link href="/" className="underline text-blue-400">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
























// "use client";
// import React from "react";
// import Link from "next/link";
// import { ChangeEvent, FormEvent, useState } from "react";
// import { useRouter } from "next/navigation";

// // import { FaSpinner } from "react-icons/fa";

// const Login = () => {
//   const [data, setData] = useState({
//     email: "",

//     password: "",
//   });

//   // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//   //   const { name, value } = event.target;
//   //   setData((prev) => ({ ...prev, [name]: value }));
//   // };


//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setData({
//       ...data,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const [isLoading, setisLoading] = useState(false);
//   const [error, setError] = useState("");
//   const router = useRouter();


//   const handleSubmit = async (event: FormEvent) => {
//     event.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8000/api/login/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

     
//       if (!response.ok){
//         throw new Error(`HTTP error status: ${response.status}`);

//       }

//       const responseData = await response.json();
//       console.log(responseData);

//       if (responseData.error){
//         console.error(responseData.error);
//         alert(responseData.error)
//       }else{
//         router.push('/')
//       }
   

//     } catch (error) {
//       console.error("wrong credentials:", error);
//       alert('wrong credentials')
     
//     }



//     setisLoading(true)
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     console.log(data);
//     setisLoading(false)
//   };

//   return (
//     <div>


//       <form
//         onSubmit={handleSubmit}
//         className="container mx-auto grid space-y-2 border p-[40px] m-[10px] shadow-md shadow-black"
//       >
//         <h1 className="text-center font-bold text-[2rem] text-gray-500">LOGIN PAGE</h1>
//         <label htmlFor="" className="text-gray-500">email</label>
//         <input
//           type="email"
//           name="email"
//           placeholder="username"
//           value={data.email}
//           onChange={handleChange}
//           className="border p-[3px] pl-[10px] rounded w-full outline-blue-100"
//         />

//         <label htmlFor="" className="text-gray-500">Password</label>
//         <input
//           type="text"
//           name="password"
//           placeholder="*******"
//           value={data.password}
//           onChange={handleChange}
//           className="border p-[3px] pl-[10px] rounded w-full  outline-blue-100"
//         />

//         <button
//           type="submit"
//           className="py-1 px-4 text-gray-500  bg-blue-100 hover:bg-black hover:text-white"
//         >


// <div className="flex justify-center">


// {isLoading ? (
//         <div className="flex items-center gap-3">
//           {/* <span className="animate-spin"><FaSpinner  /></span> */}
          
//           <p>Loading ....</p>
//         </div>
//       ) : (
//         <div>
         
//           <p></p>
//         </div>
//       )}

//       Login
// </div>



          
//         </button>
//         <p className="text-gray-500">
//           PLease Signup here{" "}
//           <Link href="/" className="underline text-blue-400">
//             SignUp
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;
