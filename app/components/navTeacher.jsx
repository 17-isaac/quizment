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
         <div className="wrapper">
         <label htmlFor="active" className="menu-btn" onClick={onClick}><FontAwesomeIcon icon={openCloseStatus} onClick={handleClick} className={'fas fa-bars'}/></label>
            <ul>
               <Link className={'linkForDashboards'} to="/teacherDashboard" style={{ textDecoration: 'none' }}><li><a>Teacher Dashboard</a></li></Link>
               <Link className={'linkForDashboards'} to="/teacherStudentProgress" style={{ textDecoration: 'none' }}><li><a >Student Progress Management</a></li></Link>
               <Link className={'linkForDashboards'} to="/teacherRewards" style={{ textDecoration: 'none' }}><li><a >Rewards Administration</a></li></Link>
               <Link className={'linkForDashboards'} to="/teacherRewardsHistory" style={{ textDecoration: 'none' }}><li><a >Rewards History</a></li></Link>
               <Link className={'linkForDashboards'} to="/quizAdmin" style={{ textDecoration: 'none' }}><li><a >Quiz Administration</a></li></Link>
               <Link className={'linkForDashboards'} to="/teacherSettings" style={{ textDecoration: 'none' }}><li><a >Teacher Settings</a></li></Link>
               <br></br>
               <Form method="post">
                  <input name='logout' value="LOGOUT" type='hidden'></input>
                  <button type="submit" style={{ border: "none", backgroundColor: "transparent", outline: "none" }}><li><a className="logoutColor">Logout</a></li></button>
               </Form>
            </ul>
         </div>
      </div>
      </Container>
   )
}