import { useState } from "react";
import { FaUsersCog,FaChessRook } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi"
import { VscRequestChanges } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authChange ,refreshToken} from "../../features/authSlice";
import instance from "../../utils/instance";
import { Link } from "react-router-dom";
const Sidebar = (props) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector(refreshToken)

  const handleLogout = async () => {
    const response = await instance.post("/admin/adminLogout", { token })
    if (response.status === 204) {
      dispatch(authChange({ adminName: "", accessToken: "", refreshToken: "" }))
      navigate('/adminLogin')
    }
  }

  return (
    <div className="flex top-0 sticky">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-cyan-900 h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
        <Link to={"/adminLanding"}>
            <img
              src="logo.png"
              className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                }`}
            />
          </Link>
          {/* <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            LOGO
          </h1> */}
        </div>
        <ul className="pt-6">

            <li className={`${props.type=="user" && "bg-gray-700"} flex  rounded-md p-2 cursor-pointer hover:bg-gray-700  items-center gap-x-4 mb-5`}>
              <FaUsersCog className="text-3xl text-white"/>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
              <h1 onClick={() => { navigate('/usermanagement') }} className="text-white text-xl">User Management</h1>
              </span>
                  </li>
                  <li className={`${props.type=="req" && "bg-gray-700"} flex  rounded-md p-2 cursor-pointer hover:bg-gray-700  items-center gap-x-4 mb-5`}>
              <VscRequestChanges className="text-3xl text-white"/>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                <h1 onClick={() => { navigate('/requests') }} className="text-white text-xl">Requests</h1>
              </span>
                  </li>
                  <li className={`${props.type=="event" && "bg-gray-700"} flex  rounded-md p-2 cursor-pointer hover:bg-gray-700  items-center gap-x-4 mb-5`}>
              <FaChessRook className="text-3xl text-white"/>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                <h1 onClick={() => { navigate('/eventmanagers') }} className="text-white text-xl">Event Managers</h1>
              </span>
            </li>
            <li onClick={() => { navigate('/transactions') }} className={`${props.type == "transaction" && "bg-gray-700"} flex  rounded-md p-2 cursor-pointer hover:bg-gray-700  items-center gap-x-4 mb-5`}>
            <BiTransfer className="text-3xl text-white" />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              <h1 className="text-white text-xl">Transaction History</h1>
            </span>
          </li>

        </ul>
        <button onClick={handleLogout} className={`${!open && "hidden"} bg-white w-[90%] text-xl font-semibold rounded-lg p-2 border-white border-2 hover:bg-black hover:text-white `}>Logout</button>
      </div>

    </div>
  );
};
export default Sidebar;