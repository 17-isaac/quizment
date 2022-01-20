import React from 'react';
import {Link} from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { Search } from './Search';



export const Navbar = ({darkTheme,setDarkTheme}) =>{
    return(
        <div >
           <h6>Navbar</h6>
           <Link to="/">
               GoogleS
           </Link>
           <Button onClick={()=> setDarkTheme(!darkTheme)}>
              {darkTheme ? 'Light':'Dark'}
           </Button>
          
          <Search/>
          
        </div>
    );
}