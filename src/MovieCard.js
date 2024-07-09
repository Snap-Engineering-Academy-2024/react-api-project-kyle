import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import CardHeader from "@mui/material/CardHeader";
import { useState } from "react";

export default function MovieCard(props) {
  let [vote, setVote] = useState(0);

  return (
    <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardMedia
                component="img"
                image= {props.image}
              />
              {/* <CardHeader
                title= {props.title}
                titleTypographyProps={{ align: "left" }}
                sx={{ mt: 1, pb: 0}}
              />
              <CardContent sx={{mt: 0}}>
                <Typography>
                  Metacritic: {props.metacritic} {<br></br>}
                  imdb: {props.imdb} {<br></br>}
                  Rotten Tomatoes: {props.rottentomatoes}
                </Typography>
              </CardContent> */}
            </Card>
          </Grid>
  );
}