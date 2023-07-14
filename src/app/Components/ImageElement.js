'use client'

import { useEffect, useRef } from "react";

export default function ImageElement({data, setDimensions}){

    const imgRef = useRef(null);
    const observerRef = useRef(null);

    const handleResize = () => {
        if(imgRef.current){
            const { height, width } = imgRef.current.getBoundingClientRect();
            setDimensions({ height, width });
        }
    }


    useEffect(() => {
        observerRef.current = new ResizeObserver(handleResize);
        observerRef.current.observe(imgRef.current);

        return () => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            if(imgRef.current) observerRef.current.unobserve(imgRef.current);
        }
        };
    }, []);

    return(

        <img alt="blog-image"
            ref={imgRef}
            src={data.content || '/placeholderimg.webp'}
            className="block aspect-video bg-transparent resize border-2 border-solid border-bordercolor rounded-lg h-full w-full"
        />
    )
}