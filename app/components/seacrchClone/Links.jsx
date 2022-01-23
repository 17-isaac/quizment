import React from "react";
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
  ListGroup
} from "react-bootstrap";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    },
  ];
}

const links = [
  { url: "/search", text: "All" },
  { url: "/images", text: "Images" },
  { url: "/videos", text: "Videos" },
];

export const Links = () => {
  return (
    <div>
      <h6>Links</h6>

      <ListGroup horizontal>
  <ListGroup.Item>This</ListGroup.Item>
  <ListGroup.Item>ListGroup</ListGroup.Item>
  <ListGroup.Item>renders</ListGroup.Item>
  <ListGroup.Item>horizontally!</ListGroup.Item>
</ListGroup>

      {links.map(({ url, text }, i) => (
        <NavLink key={i} to={url}>
          {text}
         
        </NavLink>
       
      ))}
    </div>
  );
};
