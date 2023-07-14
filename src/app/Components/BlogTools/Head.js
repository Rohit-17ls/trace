'use client'

import { useState } from "react";

export default function Head({head, name, setHead, setFocusIndex}){
    const [isFocused, setIsFocused] = useState(false);
    
    return (

        <>
        {
            isFocused ? 
            <input type="text"
               name="name"
               onFocus={(e) => {
                setFocusIndex.current = -1;
                console.log(setFocusIndex.current);
                // setFocusIndex(-1);
                }}
                onBlur={(e) => {
                    setIsFocused(false);
                }}
               value={head}
               onChange={(e) => {setHead(e.target.value)}}
               className = "bg-transparent outline-none w-[80%] my-[3vh] mx-[3vw] border-2 border-solid focus:border-[#e605ffd6] border-transparent py-1 px-2 rounded-2xl text-3xl font-semibold"
               />

               :

               <h1 className="w-[80%] my-[3vh] mx-[3vw] py-1 px-2 text-3xl font-semibold"
                    onClick={(e) => {
                        setIsFocused(true);
                    }}>
                {head}
               </h1>
        }
        </>
    )
}