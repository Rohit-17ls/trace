'use client'

import { useEffect, useState } from "react"

export default function({weights, indexToWords, input}){

    const [suggestions, setSuggestions] = useState([]);

    
    useEffect(() => {
        
        const findSimilarWords = () => {
            const split = input.toLowerCase().split('.');
            let similarWords = [];
            const targetSentence = split[split.length - 1];

            const targetWords = targetSentence.split(' ').slice(-3,);
            
            const embed_size = 10;
            for(let targetWord of targetWords){
                if(!weights[targetWord]) continue;
                
                const wordVector = weights[targetWord];
                let distances = [];

                let ind = 0;
                for(let word in weights){
                    const embedding = weights[word];
                    let distance = 0;
                    for(let i = 0; i < embed_size; i++){
                        const diff = wordVector[i] - embedding[i];
                        distance += diff * diff;
                    }
                    distances.push([Math.sqrt(distance), ind++]);
                }
                distances = distances.sort();
                const result = distances.slice(0, 5).map(item => indexToWords[item[1]]);
                console.log(result);
                similarWords = similarWords.concat(result);
                
            }
            console.log(similarWords);
            similarWords = Array.from(new Set(similarWords))
            setSuggestions(similarWords);


        }

        findSimilarWords();
        

    }, [input]);

    return(

        <div className="bg-gray-800 p-2 rounded-xl my-2 h-fit flex flex-row flex-wrap">
            <span>Suggested Words : </span>
            {suggestions.length != 0 && 
                suggestions.map((suggestedWord, ind) => 
                                <strong className="suggestion-color font-semibold mx-2" key={ind}>
                                    {suggestedWord}
                                </strong>)}
        </div>
    )
}