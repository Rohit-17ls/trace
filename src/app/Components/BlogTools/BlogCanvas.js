'use client'

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "./Head";
import BlogBody from "./BlogBody";
import BlogUtils from "./BlogUtils";

const WEIGHTS_URL = 'https://bitbucket.org/ml-projects-17/gradient/raw/d3da09f66c201c235f49fbf9921ca86646345011/weights.json';
let weights = {};
let indexToWords = [];

export default function BlogCanvas(){

    const [head, setHead] = useState('Your Blog Title');
    const [blogStructure, setBlogStructure] = useState([]);
    // const [focusIndex, setFocusIndex] = useState(-1);
    const setFocusIndex = useRef(-1);
    const blogRef = useRef();
    const downloadRef = useRef();
    const [isFetchedWeights, setIsFetchedWeights] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    
    const router = useRouter();

    const getMarkUp = () => {
        let markup = blogRef.current.innerHTML;
        markup = markup.replaceAll('textarea', 'p');
        markup = markup.replaceAll('resize', 'resize-none');

        return markup
    }

    const previewHandler = () => {
        const markup = getMarkUp();
        localStorage.setItem('blog', markup);
        window.open('/blog/preview', '_blank')
    }
    
    const downloadHandler = () => {
        const markup = getMarkUp();
        const blob = new Blob([markup], {type : 'text/html'});
        const link = downloadRef.current;
        link.href = window.URL.createObjectURL(blob);
        link.download = `${head}.html`;
        link.click();
    }

    const publishHandler = async() => {
        setIsPublishing(true);
        const markup = getMarkUp();
        const res = await fetch('/api/publish', {
            method : 'POST',
            credentials : 'include',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({title : head, markup})
        });
        const data = await res.json();
        console.log(data);
        setIsPublishing(false);

        if(data.error)  router.push('/signin');
    
    }


    useEffect(() => {

        const handleHotKey = (e) => {
            if(e.altKey && e.key === 'h'){
                console.log(setFocusIndex.current);
                
                setBlogStructure(prevState => [...prevState.slice(0, setFocusIndex.current+1), 
                 {type: 'subhead',content : 'New Subheading'},
                 ...prevState.slice(setFocusIndex.current+1,)]);
                
                 
                 
                }else if(e.altKey && e.key === 't'){
                console.log(setFocusIndex.current);
                
                setBlogStructure(prevState => [...prevState.slice(0, setFocusIndex.current+1), 
                {type: 'textblock',content : ''},
                ...prevState.slice(setFocusIndex.current+1,)]);
            }
            else if(e.altKey && e.key === 'i'){
                console.log(setFocusIndex.current);
                
                 setBlogStructure(prevState => [...prevState.slice(0, setFocusIndex.current+1), 
                 {type: 'image',content : ''},
                 ...prevState.slice(setFocusIndex.current+1,)]);
            }
        }

        const fetchWeights = async() => {
            const res = await fetch(WEIGHTS_URL);
            const data = await res.json();
            console.log(data);
            weights = data;
            for(let word in weights){
                indexToWords.push(word);
            }
            setIsFetchedWeights(true);
        }

        
        window.addEventListener('keydown', handleHotKey);
        fetchWeights();

        return () => {
            window.removeEventListener('keydown', handleHotKey);
        }

    }, []);



    // console.log(blogStructure);
    // console.log(setFocusIndex);

    return(

       <section className="mb-auto">
            <div ref={blogRef}>
                <Head name="blog-heading" head={head} setHead={setHead} setFocusIndex={setFocusIndex}/> 
                <div className="flex flex-row justify-start lg:justify-evenly items-start">
                    <BlogBody blogStructure={blogStructure}
                            setFocusIndex={setFocusIndex}
                            setBlogStructure={setBlogStructure}
                            isFetchedWeights={isFetchedWeights}
                            indexToWords={indexToWords}
                            weights={weights}/>
                    {/* <section className="bg-yellow-100 min-w-[25%]">
                        <strong className="block text-center text-xl">Recommended</strong>
                    </section>  */}
                </div>
            </div>
            <a className="invisible" ref={downloadRef}>asdfsd</a>
            <BlogUtils previewHandler={previewHandler}
                       downloadHandler={downloadHandler}
                       publishHandler={publishHandler}
                       isPublishing={isPublishing}/>
            
        </section>
    )
}