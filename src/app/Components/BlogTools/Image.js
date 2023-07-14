'use client'

import { useEffect, useRef, useState } from "react";
import ImageElement from "../ImageElement";
// import placeholderimg from '../../../../public/placeholderimg.webp'

export default function Image({ind, setFocusIndex, struct, setBlogStructure}){

    const [isFocused, setIsFocused] = useState(false);
    const [data, setData] = useState(struct);
    // const [imageURL, setImageURL] = useState('');
    const imageURL = useRef('');
    const [dimensions, setDimensions] = useState({height : 0, width: 0});
    // const divRef = useRef(null);
    // const observerRef = useRef(null);
    
    // console.log(`Index ${ind} , [${imageURL.current}] image rerendered`);

    // const handleResize = () => {
    //     if(divRef.current){
    //         const { height, width } = divRef.current.getBoundingClientRect();
    //         setDimensions({ height, width });
    //     }
    // }

    // useEffect(() => {
    //     observerRef.current = new ResizeObserver(handleResize);
    //     observerRef.current.observe(divRef.current);

    //     return () => {
    //     if (observerRef.current && divRef.current) {
    //         observerRef.current.unobserve(divRef.current);
    //         observerRef.current.disconnect();
    //     }
    //     };
    // }, []);


    const updateBlogStructure = (x, y) => {
	
        // setBlogStructure(prevState => [...prevState.slice(0, ind), {type:'image', content: data.content}, ...prevState.slice(ind+1,)]); 
        setBlogStructure(prevState =>
            prevState.map((item, index) =>
              index === ind ? { ...data } : item
            )
          );
    }

    return (

        <>

            {isFocused ? <input type="text"
                            name="img-url"
                            key={ind}
                            onChange={(e) => {
                                setData(prev => ({...prev, content : e.target.value}));
                            }}
                            onBlur={(e) => {
                                // console.log(data);
                                updateBlogStructure(data, ind);
                                setIsFocused(false);
                            }}
                            onFocus={(e) => {
                                setFocusIndex.current = ind;
                                // console.log(ind);
                                // setFocusIndex(ind);
                            }}
                            placeholder={imageURL.current || 'Drop image URL'}
                            className="py-1 px-2 outline-none bg-transparent border-2 border-solid border-bordercolor rounded-2xl"
                            /> 

                        :


                        <div onDoubleClick={(e) => {setIsFocused(true)}}
                            key={ind}
                            height={dimensions.height || 'auto'}
                            width={dimensions.width || 'auto'}
                            onFocus={(e) => {
                                // console.log(setFocusIndex.current);
                                setFocusIndex.current = ind;
                                // setFocusIndex(ind);
                            }}
                            onBlur={(e) => {
                                // console.log(data);
                                updateBlogStructure(data, ind);
                                setIsFocused(false);
                                
                            }}

                            // ref={divRef}

                            
                            className={`my-[22px] overflow-hidden mx-auto resize max-w-[80%]`} >


                            <ImageElement data={data} setDimensions={setDimensions}/>
            
                    </div>
        
            
        
            }

            
        </>

        
    )
}