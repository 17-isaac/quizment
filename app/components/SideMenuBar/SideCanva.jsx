import React, { useState } from "react";

import {
  Button,
  Card,
  ProgressBar,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  FloatingLabel,
  Form,
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import Style from "../../styles/global.css";
export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    },
    // {
    //   rel: "stylesheet",
    //   href: Style,
    // },
  ];
}

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}
       aria-controls="example-fade-text"
     
       >
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><b className="ms-5">Teacher Dashboard</b></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        
            <Card className="bg-dark mt-2  text-white">
              <Card.Img className="cardHeight"
                src="https://media.istockphoto.com/photos/rising-arrow-on-staircase-increasing-business-picture-id840519184?k=20&m=840519184&s=612x612&w=0&h=rigJjj29aspc8kX4DsnCdfwCiH3zeb25DZyMy1-FgdQ="
                alt="Card image"
              />
              <Card.ImgOverlay className="cover">
                <Card.Title className="mt-5 cover-title ms-5">Student Progress</Card.Title>
                
              </Card.ImgOverlay>
            </Card>
        
            <Card className="bg-dark mt-2  text-white">
              <Card.Img className="cardHeight"
                src="https://images.cnbctv18.com/wp-content/uploads/2018/05/10.jpg"
                alt="Card image"
              />
              <Card.ImgOverlay className="cover">
                <Card.Title className="mt-5 cover-title">Quiz <br></br>Administration</Card.Title>
                
              </Card.ImgOverlay>
            </Card>
        
            <Card className="bg-dark mt-2  text-white">
              <Card.Img className="cardHeight" className="cardHeight"
                src="https://static.thehoneycombers.com/wp-content/uploads/sites/2/2021/07/rewards-credit-cards-singapore-900x643.png"
                alt="Card image"
              />
              <Card.ImgOverlay className="cover">
                <Card.Title className="mt-5 cover-title">
                    Rewards <br/> Administration
                </Card.Title>
                
              </Card.ImgOverlay>
            </Card>

          




        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export const SideCanva = () => {
  return (
    <div>
      <Example />
    
        

    </div>
  );
};
