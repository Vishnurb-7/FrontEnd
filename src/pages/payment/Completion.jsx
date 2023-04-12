

import React from 'react'
import { Link } from 'react-router-dom'

const Completion = () => {
    return (
        <div className='flex flex-col items-center gap-28'>
            <h1 className="mt-96 text-5xl text-green-700 font-Viaoda font-extrabold text-center">Payment Successfully completed! 🎉</h1>
            <Link to={"/userlanding"} className='text-2xl font-bold border-2 border-black p-5 rounded-full'>Goto Home </Link>
        </div>
    )
}

export default Completion
