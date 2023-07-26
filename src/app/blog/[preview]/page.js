'use client'

import Footer from "@/app/Components/Footer"
import Navbar from "@/app/Components/Navbar"
import Spinner from "@/app/Components/Spinner";
import { useEffect, useRef, useState } from "react"

export default function Preview(){

    const blogRef = useRef();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const markdown = localStorage.getItem('blog');
        blogRef.current.innerHTML = markdown;
        setIsLoading(false);

    }, []);

    return(
        <section className="flex flex-col justify-between min-h-[100vh]">
            <Navbar/>
            {isLoading && <Spinner/>}
            <section ref={blogRef} className="mb-auto"></section>
            <Footer/>
        </section>

    )
}