'use client'

import { useState } from "react";

export default function SubHead({ind, setFocusIndex, struct, setBlogStructure}){

    const [data, setData] = useState(struct);
    const [isFocused, setIsFocused] = useState(false);

    const updateBlogStructure = (x, y) => {
	
        // setBlogStructure(prevState => [...prevState.slice(0, ind), {type:'subhead', content: data.content}, ...prevState.slice(ind+1,)]); 
        setBlogStructure(prevState =>
            prevState.map((item, index) =>
              index === ind ? { ...data } : item
            )
          );

    }

    return(

        <>
        
            {
                isFocused ? 

                <input type="text"
                name="name"
                key={ind}
                defaultValue={data.content}
                onFocus={(e) => {
                    setFocusIndex.current = ind;
                    //    console.log(setFocusIndex.current);
                        // setFocusIndex(ind);
                    }}
                    onBlur={(e) => {
                        // console.log(data);
                        updateBlogStructure(data,ind);
                        setIsFocused(false);
                    }}
                    onChange={(e) => {
                        setData(prev => ({...prev, content : e.target.value}));
                    }}
                className = "bg-transparent outline-none w-[65%] my-[1vh] border-2 border-solid focus:border-[#e605ffd6] border-transparent py-1 px-2 rounded-2xl text-xl font-semibold"
            ></input>

            : 
            <h3 className="w-[65%] my-[1vh] py-1 px-2 rounded-2xl text-xl font-semibold"
                onDoubleClick={() => {
                    setIsFocused(true);
                }}>
                {data.content}</h3>

            }
        </>
    )
}