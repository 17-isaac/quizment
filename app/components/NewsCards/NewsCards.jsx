import React from "react";
import { Grid, Grow, Typography } from "@material-ui/core";

import useStyles from "./styles.js";
import NewsCard from "../NewsCard/NewsCard";

const infoCards = [
  {
    color: "#1565c0",
    title: "News by category",
    text: "Try saying give me the latest : Business, Entertainment, Technology",
  },
  {
    color: "#4527a0",
    title: "News by Terms",
    text: " Try saying What's up with : Bitcoin, Playstation 5, Smartphone",
  },
  {
    color: "#283593",
    title: "News by Sources",
    text: "Try saying give me the news from: ABC News, CNN, BBC News",
  },
];

const NewsCards = ({ articles,activeArticle }) => {
  const classes = useStyles();

  if (!articles.length) {
    return (
      <Grow in>
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {infoCards.map((infoCard) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className={classes.infoCard}
            >
              <div
                className={classes.card}
                style={{ backgroundColor: infoCard.color }}
              >
                <h3>{infoCard.title}</h3>
                <br />
                <h5>{infoCard.text}</h5>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>
    );
  }

  return (
    <Grow in>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {articles.map((article, i) => (
          <Grid
            item
            xs={3}
            sm={6}
            md={4}
            lg={3}
            style={{ display: "flex" }}
            key={i}
          >
            <NewsCard article={article}
            activeArticle={activeArticle}
            i={i} />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
};

export default NewsCards;
