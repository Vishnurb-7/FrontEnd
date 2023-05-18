import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../../public/Banner4.jpg";
import SearchBox from "./SearchBox";
import logo1 from "../../public/logo1.png"

const Banner2 = ({ type }) => {
  const navigate = useNavigate();

  const userHandle = () => {
    navigate("/login");
  };
  const eventHandle = () => {
    navigate("/providerProfile");
  };

  return (
    <div
      className={`h-screen bg-cover bg-center`} style={{ backgroundImage: `url(${image})` }} >
    
      <div className="flex">
        <div className="container mx-auto pt-16 flex-col gap-2 h-full mt-32 sm:mt-44 text-black flex justify-center items-center font-Viaoda text-3xl lg:text-5xl text-center">
       <div className="flex items-center justify-center " >
          <img src={logo1} alt="logo" width={200}  />
        </div>
          From Venue Selection to Event Execution, We’re With You Every Step of
          the Way!
        </div>
        
      </div>
     

      <div className="mb-12 w-50 mt-8 flex items-center justify-center">
        <SearchBox />
      </div>

      <div
        className={`${
          type === "admin" ? "hidden" : "flex"
        }  w-full  justify-center gap-8 mb-12 px-3`}
      >
        <button
          onClick={userHandle}
          className="w-56 h-12 md:h-14 text-md rounded-full border-2 shadow-md shadow-black border-white md:text-xl text-sky-700  font-Viaoda font-semibold hover:scale-105 hover:bg-gray-400  hover:bg-opacity-50 hover:-translate-y-1 hover:duration-200"
        >USER</button>
        <button
          onClick={eventHandle}
          className="w-56 h-12 md:h-14 text-md rounded-full border-2 shadow-md shadow-black border-white md:text-xl text-sky-700  font-Viaoda font-semibold hover:scale-105 hover:bg-gray-400  hover:bg-opacity-50 hover:-translate-y-1 hover:duration-200"
        >EVENT MANAGEMENT</button>
      </div>

      <div
        className={`${
          type === "admin" || type === "landing" ? "hidden" : "flex"
        }  w-full  justify-center`}
      >
        <img
          src="/scroll.webp"
          alt="scroll"
          className="z-50 w-20 h-20 md:w-20 md:h-30 lg:w-40 lg:h-40"
        />
      </div>
    </div>
  );
};

export default Banner2;
