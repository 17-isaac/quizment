import { useEffect } from "react";
import { useLocation } from "remix";
import ReactPlayer from "react-player";

import { Loading } from "./Loading";

import { useResultContext } from "~/contexts/ResultContextProvider";

import {
  Button,
  Card,
  ProgressBar,
  Row,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    },
  ];
}

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();

  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/videos") {
        getResults(`/search/q=${searchTerm} vidoes`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}&num=40`);
      }
    }
  }, [searchTerm, location.pathname]);

  if (isLoading) return <Loading />;

  console.log(location.pathname);

  switch (location.pathname) {
    case "/search":
      return (
        <Row lg="2">
          {results?.map(({ link, title }, index) => (
            <div key={index}>
              <a href={link} target="_blank" rel="noreferrer">
                <p>{link.length > 30 ? link.substring(0, 30) : link}</p>
                <p>{title}</p>
              </a>
            </div>
          ))}
        </Row>
      );

    case "/images":
      return (
        <Row lg="4" >
          {results?.map(({ image, link: { href, title } }, index) => (
            <Card
              style={{ width: "18rem" }}
              className="m-5"
              href={href}
              key={index}
              target="_blank"
              rel="noreferrer"
            >
              <Card.Img
                variant="top"
                style={{ height: "18rem" }}
                src={image?.src}
              />
              <Card.Link> {title}</Card.Link>
            </Card>
          ))}
        </Row>
      );

    case "/videos":
      return (
        <Row lg="3" >
          {results?.map((video, index) => (
            <div key={index} className="mt-2">
              {video?.additional_links?.[0]?.href && (
                <ReactPlayer
                  url={video.additional_links[0].href}
                  controls
                  width="355px"
                  height="200px"
                />
              )}
            </div>
          ))}
        </Row>
      );

    default:
      return "ERROR";
  }

  return <h1>Resutls search</h1>;
};
