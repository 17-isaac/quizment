import React from 'react';
import { NavLink } from 'react-router-dom';


const links=[
    {url:'/search',text:'All'},
    {url:'/images',text:'Images'},
    {url:'/videos',text:'Videos'},
    
]


export const Links = () =>{
    return(
        <div >
           <h6>Links</h6>

           {links.map(({url,text})=>(
               <NavLink
               to={url}
               >{text}</NavLink>
           ))}
          
          
        </div>
    );
}