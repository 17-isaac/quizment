import React,{useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import ReactPlayer from 'react-player'

import { Loading } from './Loading'

import { useResultContext } from '~/contexts/ResultContextProvider'

export const Results =() =>{

    const {results, isLoading,getResults,searchTerm}=useResultContext();


    const location=useLocation()

    useEffect(()=>{


        if(searchTerm){
            if(location.pathname ==='/videos'){
                getResults(`/search/q=${searchTerm} vidoes`)

            }else{
                getResults(`${location.pathname}/q=${searchTerm}&num=40`)
            }
        }

      
    },[searchTerm,location.pathname])


    if(isLoading) return <Loading/>

    console.log(location.pathname)

    switch (location.pathname) {
        case '/search':
            
           return (
            <div>
            {results?.map(({link,title},index)=>(
                <div key={index}>
                    <a href={link} target="_blank" rel="noreferrer">
                        <p>
                            {link.length> 30 ? link.substring(0,30): link}
                        </p>
                        <p>
                            {title}
                        </p>
                    </a>

                 </div>
            ))}
        </div>
           );

        case '/images':
            
            return (
                <div>
                    {results?.map(({image,link:{href,title}},index)=>(
                        <a href={href} key={index} targe="_blank" rel="noreferrer">
                            <img src={image?.src} alt={title} loading='lazy'/>
                            <p>
                                {title}
                            </p>

                        </a>
                    ))}
                </div>
            )

        case '/videos':
            
                return (
                    <div>
                        {results.map((video,index)=>(
                            <div key={index}>

                            
              {video?.additional_links?.[0]?.href
             && <ReactPlayer url={video.additional_links[0].href} controls width="355px" height="200px"/>

  }
                               
                                </div>
                        ))}
                    </div>
                )
    
        default:
            return 'ERROR';
    }



    return(
        <h1>
            Resutls search
        </h1>
    )
}