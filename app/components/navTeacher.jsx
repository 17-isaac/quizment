import { Link, Form } from 'remix';
import { useState } from "react";
import { Container } from "react-bootstrap";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function NavigationTeacher({ onClick }) {
   const [openCloseStatus, setOpenCloseStatus] = useState(faBars);
   function handleClick() {
      if (openCloseStatus === faBars) {
         setOpenCloseStatus(faTimes);
      } else {
         setOpenCloseStatus(faBars);
      }
   }
   return (
      <Container fluid>
      <div>
         <input type="checkbox" id="active"></input>
         <label htmlFor="active" className="menu-btn" onClick={onClick}><FontAwesomeIcon icon={faBars} onClick={handleClick} className={'fas fa-bars'}/></label>
         <div className="wrapper">
            <ul>
               <Link className={'linkForDashboards'} to="/teacherDashboard" style={{ textDecoration: 'none' }}><li><a>Teacher Dashboard</a></li></Link>
               <li><a href="#">Student Progress Management</a></li>
               <li><a href="#">Rewards Administration</a></li>
               <li><a href="#">Rewards History</a></li>
               <li><a href="#">Quiz Administration</a></li>
               <li><a href="#">Settings</a></li>
               <br></br>
               <Form method="post">
                  <button type="submit" style={{ border: "none", backgroundColor: "transparent", outline: "none" }}><li><a className="logoutColor">Logout</a></li></button>
               </Form>
            </ul>
         </div>
      </div>
      </Container>
   )
}