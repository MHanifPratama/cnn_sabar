import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmLoginModal from "../components/ConfirmLoginModal";
import ErrorLoginModal from "../components/ErrorLoginModal";
import { MdCoPresent } from "react-icons/md";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] =  useState("")
    const [showModal, setShowModal] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const loginHandler = async () => {
      console.warn(email, password);
      const item = { email, password };
    
      try {
        const response = await fetch("http://127.0.0.1:3001/api/v1/user/login", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(item)
        });
    
        if (!response.ok) {
          setOpenModal(true)
        }
    
        const result = await response.json();
    
        if (result.message === "Success Login") {
          sessionStorage.setItem('status', 'loggedin');
          sessionStorage.setItem('token', result.token);
          setShowModal(true);
        } else if (result.message === "Invalid Login") {
          setOpenModal(true)
        } else {
          setOpenModal(true)
        }
      } catch (error) {
        setOpenModal(true)
      }
    };
    
    

    return (
      <>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a className="flex hover:cursor-text items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <MdCoPresent className="m-1"/>
                    CNN SABAR    
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input onChange={ (e) => setEmail(e.target.value) } type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@unila.ac.id" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onChange={ (e) => setPassword(e.target.value) } type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <ConfirmLoginModal showModal={showModal} setShowModal={setShowModal} />
                            <button onClick={ loginHandler } type="submit" className="w-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">Sign in</button>
                            <p className="text-sm text-left font-light text-gray-500 dark:text-gray-400">
                                Don't have an account yet?
                                <a onClick={ () => navigate("/register") } className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 hover:cursor-pointer"> Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div> 
        </section>
        <ErrorLoginModal openModal={openModal} setOpenModal={setOpenModal} />
      </>
    );
};

export default Login;
