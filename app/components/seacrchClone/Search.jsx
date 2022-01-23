import React,{useEffect,useState} from 'react';
import {useDebounce} from 'use-debounce'

import {useResultContext} from '~/contexts/ResultContextProvider'

import {Links} from './Links'

export const Search = () =>{


    const [text,setText]=useState('')
    const {setSearchTerm} = useResultContext()
    const [debouncedValue]=useDebounce(text,200)

    useEffect(() =>{
        if(debouncedValue) setSearchTerm(debouncedValue)
    },[debouncedValue])


    return(
        <div >
           <input
           value={text}
           type='text'
           placeholder='search smt'
           onChange={(e)=> setText(e.target.value)}
           />
{
    !text &&(
        <button type="button" onClick={()=>setText('')}>
            x

        </button>
    )
}
           <Links/>
          
          
        </div>
    );
}