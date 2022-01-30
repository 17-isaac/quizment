import {useState,useEffect,createRef} from "react";
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import classNames from "classnames";

import useStyles from './styles.js'

const NewsCard = ({
  article: { description, publishedAt, source, title, url, urlToImage },
  i,activeArticle
}) => {
    const classes = useStyles();

    const [elRefs,setElRefs]=useState([])

    const scrollToRef =(ref) =>window.scroll(0,ref.current.offsetTop -50)

    useEffect(()=>{
        setElRefs((refs)=>Array(20).fill().map((_,j)=> refs[j] || createRef()));
    },[])

    useEffect(()=>{

        if(i === activeArticle && elRefs[activeArticle]){
            scrollToRef(elRefs[activeArticle])
        }

    },[i,activeArticle,elRefs])


  return (
    <Card ref={elRefs[i]} className={classNames(classes.card,activeArticle === i ? classes.activeCard : null)}>
      <CardActionArea href={url} target="_blank">
        <CardMedia className={classes.media}
          image={
            urlToImage ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgHjUTP5gH8bgrMqXG4tN3SwK_bU0ivVBnLQ&usqp=CAU"
          }
        />
        <div>
          <Typography className={classes.title} variant="body2" color="textSecondary" component="h2">
            {new Date(publishedAt).toDateString()}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="h2">
            {source.name}
          </Typography>
        </div>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.CardActions}>
        <Button sixe="small" color="secondary">
         Read
        </Button>
        <Typography variant="h5" color="textSecondary">
          {i + 1}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
