import React from 'react';
import {Link} from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { Search } from './Search';



export const Navbar = ({darkTheme,setDarkTheme}) =>{
    return(
        <div >
        

          
          <Search/>
          
        </div>
    );
}