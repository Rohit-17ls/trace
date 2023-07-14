'use client'

import { useEffect, useState } from "react"
import Image from "./Image"
import SubHead from "./SubHead"
import TextBlock from "./TextBlock"

export default function BlogBody({blogStructure,
                                 setFocusIndex, 
                                 setBlogStructure,
                                 isFetchedWeights, 
                                 indexToWords,
                                 weights}){
   

    

    

    return(

    <>
        <div className="mx-[4vw] w-[70%] min-w-[60vw] max-w-[1000px] lg:w-[80%] flex flex-col justify-evenly align-start">
            {blogStructure.map((struct, ind) => {

                console.log(ind, struct);


                return (struct.type === 'subhead' && <SubHead key={ind} ind={ind} struct={struct} setFocusIndex={setFocusIndex} setBlogStructure={setBlogStructure}/>) || 
                 (struct.type === 'textblock' && <TextBlock key={ind} ind={ind} struct={struct} setFocusIndex={setFocusIndex} setBlogStructure={setBlogStructure} isFetched={isFetchedWeights} indexToWords={indexToWords} weights={weights}/>) || 
                 (struct.type === 'image' && <Image key={ind} ind={ind} struct={struct} setFocusIndex={setFocusIndex} setBlogStructure={setBlogStructure}/>)
                })

            
            }
       
        </div>
    </>
    )

}