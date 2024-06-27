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

export default function CharacterCard(props) {
  let [vote, setVote] = useState(0);

  return (
    <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardMedia
                component="img"
                height="350px"
                image= {props.pic}
              />
              <CardHeader
                title= {props.title}
                titleTypographyProps={{ align: "left" }}
                sx={{ mt: 1, pb: 0}}
              />
              <CardContent sx={{mt: 0}}>
                {props.bulletPoint.map((descriptionBulletPoint) => 
                  <Typography sx={{p: .5}} key={descriptionBulletPoint}>
                    {descriptionBulletPoint}
                  </Typography>
                )}

                <Typography sx={{mt: 2}}>
                  Votes: {vote}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  sx={{ px: 6, mx: "auto", backgroundColor: "black"}}
                  onClick={() => {
                    setVote(vote + 1)
                  }}
                >
                  Vote
                </Button>
              </CardActions>
            </Card>
          </Grid>
  );
}