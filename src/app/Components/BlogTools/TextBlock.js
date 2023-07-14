'use client'

import { useState } from "react";
import WordSuggest from "./WordSuggest";

export default function TextBlock({ind, setFocusIndex, struct, setBlogStructure, isFetched, indexToWords, weights}){

    const [data, setData] = useState(struct);
    const [isFocused, setIsFocused] = useState(false);

    const updateBlogStructure = (x, y) => {
	
        // setBlogStructure(prevState => [...prevState.slice(0, ind), {type:'textblocks', content: data.content}, ...prevState.slice(ind+1,)]); 
        setBlogStructure(prevState =>
            prevState.map((item, index) =>
              index === ind ? { ...data } : item
            )
          );

    }

    return(
        <>
            {(isFocused && isFetched) && <WordSuggest weights={weights} indexToWords={indexToWords} input={data.content}/>}
            <textarea defaultValue={data.content}
                    
                    onFocus={(e) => {
                        setFocusIndex.current = ind;
                        setIsFocused(true);
                        // console.log(setFocusIndex.current);
                        // setFocusIndex(ind);
                    }}
                    onBlur={(e) => {
                        // console.log(data);
                        updateBlogStructure(data, ind);
                        setIsFocused(false);
                    }}
                    onChange={(e) => {
                        // updateBlogStructure(data, ind);
                        setData(prev => ({...prev, content : e.target.value}));
                    }}
                    className="block my-[22px] sm:w-[95vw] h-fit overflow-visible bg-transparent py-1 px-2 outline-none rounded-lg border-2 border-solid focus:border-[#e605ffd6] border-transparent"/>
        </>
    )

}