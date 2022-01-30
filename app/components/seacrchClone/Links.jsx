import { NavLink } from "react-router-dom";

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
  Breadcrumb,
  ListGroup,
} from "react-bootstrap";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    },
  ];
}

export const Linkss = () => {
  return (
    <div>


      <Breadcrumb  className="ms-5 mt-3">
        <Breadcrumb.Item variant="secondary" href="http://localhost:3000/search">
          All
        </Breadcrumb.Item>
        <Breadcrumb.Item href="http://localhost:3000/images">
          Images
        </Breadcrumb.Item>
        <Breadcrumb.Item href="http://localhost:3000/videos">
          Videos
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};
