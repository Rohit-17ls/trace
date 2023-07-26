'use client'

import { useEffect, useRef } from "react"

export default function BlogServe({markup}){

    const markupRef = useRef(null);

    useEffect(() => {
        console.log(markup);
        markupRef.current.innerHTML = markup;

    }, []);

    return(
        
       <>
        <section ref={markupRef}>

        </section>
       </>
    )

}