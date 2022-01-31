import { Link, Form, useNavigate } from 'remix';
import { useState } from "react";
import { Container } from "react-bootstrap";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function NavigationStudent({ onClick }) {
   let navigate = useNavigate();
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
               <Link className={'linkForDashboards'} to="/studentDashboard" style={{ textDecoration: 'none' }}><li><a>Student Dashboard</a></li></Link>
               <Link className={'linkForDashboards'} to="/studentQuiz" style={{ textDecoration: 'none' }}><li><a>Quiz</a></li></Link>
               <Link className={'linkForDashboards'} to="/studentRewards" style={{ textDecoration: 'none' }}><li><a>Rewards</a></li></Link>
               <Link className={'linkForDashboards'} to="/studentRewardsHistory" style={{ textDecoration: 'none' }}><li><a>Rewards History</a></li></Link>
               <Link className={'linkForDashboards'} to="/resourceNews" style={{ textDecoration: 'none' }}><li><a>Resource News</a></li></Link>
               <Link className={'linkForDashboards'} to="/search" style={{ textDecoration: 'none' }}><li><a>Q Search</a></li></Link>
               <Link className={'linkForDashboards'} to="/images" style={{ textDecoration: 'none' }}><li><a>Q Images</a></li></Link>
               <Link className={'linkForDashboards'} to="/videos" style={{ textDecoration: 'none' }}><li><a>Q Videos</a></li></Link>
               <Link className={'linkForDashboards'} to="/studentSettings" style={{ textDecoration: 'none' }}><li><a>Student Settings</a></li></Link>
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
