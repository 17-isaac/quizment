
import { Outlet } from "remix";
import React  from 'react';




import {
  
  Row,
  Col,

  Container,

} from "react-bootstrap";


export function links() {
  return [
   
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    },
  ];
}


export default function videos() {

 

  return (

    <Container className="ml-5" fluid>
  <Row>
    <Col>  <main>
        <Outlet/>
      </main></Col>
  </Row>
</Container>
   
  );
}
