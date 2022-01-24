import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { useResultContext } from "~/contexts/ResultContextProvider";

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
} from "react-bootstrap";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    },
  ];
}

import { Links } from "./Links";

export const Search = () => {
  const [text, setText] = useState("");
  const { setSearchTerm } = useResultContext();
  const [debouncedValue] = useDebounce(text, 200);

  useEffect(() => {
    if (debouncedValue) setSearchTerm(debouncedValue);
  }, [debouncedValue]);

  return (
    <div>
      {/* <input
        value={text}
        type="text"
        placeholder="search smt"
        onChange={(e) => setText(e.target.value)}
      /> */}

      {/* <Form.Label>Email address</Form.Label> */}

      {/* <Stack direction="horizontal" gap={3}>
  <Form.Control className="me-auto" placeholder="Add your item here..." />
  <Button variant="secondary">Submit</Button>
  <div className="vr" />
  <Button variant="outline-danger">Reset</Button>
</Stack> */}

      <Row>
        <Col>
          <Form.Control
            value={text}
            type="text"
            placeholder="search smt"
            onChange={(e) => setText(e.target.value)}
          />
        </Col>

        <Col>
          {text && (
            <button type="button" onClick={() => setText("")}>
              x
            </button>
          )}
        </Col>
      </Row>

      <Links />
    </div>
  );
};
