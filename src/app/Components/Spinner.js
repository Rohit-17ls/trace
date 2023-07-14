'use client'

export default function Spinner({type}){
    return(
        <span id={`${type === 'small' ? "small-loader" : "loader"}`}></span>
    )
} 