import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from '@mui/material/TextField';
import MovieCard from "./MovieCard";
import movieTitles from "./MovieTitles.json";
import { useState } from "react";

function App() {
  let [myMoviePoster, getNewMovieImage] = useState();
  let [myMovieTitle, getNewMovieTitle] = useState();
  let [myMovieMetacritic, getNewMovieMetacritic] = useState();
  let [myMovieimdb, getNewMovieimdb] = useState();
  let [myMovieRottenTomatoes, getNewMovieRottenTomatoes] = useState();

  let [movieCorrectAnswerID, getMovieCorrectAnswerID] = useState();
  let [answerSelected, setAnswerSelected] = useState(false);
  let [secondGuess, setSecondGuess] = useState(false);
  let [gameOver, setGameOver] = useState(false);

  let [round, setRound] = useState(0);
  let [score, setScore] = useState(0);
  const [ratingGuess, setRatingGuess] = useState('');
  let [movieSuggestion, setMovieSuggestion] = useState('');
  
  return (
    <div className="App">
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid lightgray" }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Movies Inc
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography
          variant="h2"
          align="center"
          color="text.primary"
          sx={{ py: 2 }}
        >
          Whose rating was higher?
        </Typography>
        {round == 0 && <Button
            href="#"
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => {
              fetchMovie();
              setRound(round += 1)
            }}
          >
            Start
          </Button>}
        <Typography>
          Round: {round}{<br></br>}
          Score: {score}
        </Typography>
      </Container>
      {/* End hero unit */}

      <Container maxWidth="lg">
        <Grid
          container
          spacing={5}
          justifyContent="left"
          alignItems="flex-start"
        >
          {round > 0 && <MovieCard
            title={myMovieTitle}
            image={myMoviePoster}
            metacritic={myMovieMetacritic}
            imdb={myMovieimdb}
            rottentomatoes={myMovieRottenTomatoes}
          >
          </MovieCard>}

          {round > 0 && <Grid item xs={12} md={4}>
            <Button
              disabled={answerSelected}
              href="#"
              variant="outlined"
              sx={{ my: 1 }}
              onClick={() => {
                checkAnswer(0);
              }}
            >
              imdb
            </Button>

            <Button
              disabled={answerSelected}
              href="#"
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
              onClick={() => {
                checkAnswer(1);
              }}
            >
              Metacritic
            </Button>

            <Button
              disabled={answerSelected}
              href="#"
              variant="outlined"
              sx={{ my: 1}}
              onClick={() => {
                checkAnswer(2);
              }}
            >
              Rotten Tomatoes
            </Button>

            {answerSelected == true && <div>
            <Typography
              sx={{pt: 5, pb: 2}}
            >
              The correct answer is: {getCorrectMovieFromID(movieCorrectAnswerID)} {<br></br>}
            </Typography>

            <Button
                disabled={gameOver}
                href="#"
                variant="outlined"
                sx={{ }}
                onClick={() => {
                  setAnswerSelected(answerSelected = false)
                  setSecondGuess(secondGuess = false)
                  setRatingGuess('')
                  if(round == 10){
                    setGameOver(gameOver = true)
                  }
                  else{
                    setRound(round += 1)
                    fetchMovie();
                  }
                }}
              >
                Next
              </Button>
              
            <Typography
              sx={{pt: 5, pb: 2}}
            >
              Guess the rating for an extra point?{<br></br>} Scores are in the range from 0 - 100
            </Typography>
            </div>}

            {answerSelected == true && <form
                onSubmit={(event) => {
                  let highestRating = myMovieimdb;

                  if(movieCorrectAnswerID == 1){
                    highestRating = myMovieMetacritic
                  }

                  if(movieCorrectAnswerID == 2){
                    highestRating = myMovieRottenTomatoes
                  }

                  if(ratingGuess == highestRating){
                    setScore(score += 1)
                    setRatingGuess('')
                  }
                  setSecondGuess(secondGuess = true)
                }}
              >
                <TextField
                disabled={secondGuess}
                id="outlined-controlled"
                label="Rating"
                value={ratingGuess}
                sx={{ my: 1}}
                onChange={(event) => {
                  setRatingGuess(event.target.value)
                }}
              />
                <Button
                disabled={secondGuess}
                type="submit"
                variant="outlined"
                sx={{ my: 1, mx: 1.5, pt: 1.75, pb: 1.75}}
                >Submit</Button>
              </form>}

                {secondGuess == true && <div>
                  <Typography sx={{mt: 2}}>
                    imdb: {myMovieimdb}
                  </Typography>
                  <Typography>
                    Metacritic: {myMovieMetacritic}
                  </Typography>
                  <Typography>
                    Rotten Tomatoes: {myMovieRottenTomatoes}
                  </Typography>

                  <Typography
                    sx={{pt: 5}}>
                    Want to try again with a specific movie?
                  </Typography>

                    <TextField
                    id="outlined-controlled"
                    label="Movie Title"
                    value={movieSuggestion}
                    sx={{ my: 1}}
                    onChange={(event) => {
                      setMovieSuggestion(event.target.value)
                    }}
                  />
                    <Button
                    type="submit"
                    variant="outlined"
                    sx={{ my: 1, mx: 1.5, pt: 1.75, pb: 1.75}}
                    onClick={() => {
                      
                      setAnswerSelected(answerSelected = false)
                      setSecondGuess(secondGuess = false)
                      setRatingGuess('')
                      setMovieSuggestion('')
                      if(round == 10){
                        setGameOver(gameOver = true)
                      }
                      else{
                        setRound(round += 1)
                        fetchUserMovie(movieSuggestion);
                      }
                    }}
                    >Get Movie</Button>
                  
                </div>}
          </Grid>}
        </Grid>
      </Container>
    </div>
  );

  function fetchMovie(){
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    let newMovieTitle = movieTitles[parseInt(Math.random() * movieTitles.length)]
    fetch("http://www.omdbapi.com/?t=" + newMovieTitle + "&apikey=5281a629", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        try{
          getNewMovieRottenTomatoes(myMovieRottenTomatoes = parseInt(result.Ratings[1].Value))
        }
        catch{
          myMovieRottenTomatoes = NaN;
        }

        if(isNaN(parseFloat(result.imdbRating) * 10) || isNaN(parseInt(result.Metascore)) || isNaN(myMovieRottenTomatoes)){
          fetchMovie();
        }

        getNewMovieImage(myMoviePoster = result.Poster)
        getNewMovieTitle(myMovieTitle = result.Title)

        getNewMovieimdb(myMovieimdb = parseFloat(result.imdbRating) * 10)
        getNewMovieMetacritic(myMovieMetacritic = parseInt(result.Metascore))
        
        //Get the correct answer
        getMovieCorrectAnswerID(findAnswerID())
        
      })
      .catch((error) => console.error(error));
      
  }

  function fetchUserMovie(title){
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("http://www.omdbapi.com/?t=" + title + "&apikey=5281a629", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if(result.Response == "False"){
          fetchMovie();
        }
        else{
          try{
            getNewMovieRottenTomatoes(myMovieRottenTomatoes = parseInt(result.Ratings[1].Value))
          }
          catch{
            myMovieRottenTomatoes = NaN;
          }
  
          if(isNaN(parseFloat(result.imdbRating) * 10) || isNaN(parseInt(result.Metascore)) || isNaN(myMovieRottenTomatoes)){
            fetchMovie();
          }
  
          getNewMovieImage(myMoviePoster = result.Poster)
          getNewMovieTitle(myMovieTitle = result.Title)
  
          getNewMovieimdb(myMovieimdb = parseFloat(result.imdbRating) * 10)
          getNewMovieMetacritic(myMovieMetacritic = parseInt(result.Metascore))
          
          //Get the correct answer
          getMovieCorrectAnswerID(findAnswerID())
        }
      })
      .catch((error) => console.error(error));
  }

  function findAnswerID(){
    let highestRating = myMovieimdb;
    let highestRatingID = 0;

    if(myMovieMetacritic > highestRating){
      highestRating = myMovieMetacritic;
      highestRatingID = 1;
    }

    if(myMovieRottenTomatoes > highestRating){
      highestRating = myMovieRottenTomatoes;
      highestRatingID = 2;
    }
    return(highestRatingID)
  }

  function checkAnswer(answer){
    setAnswerSelected(answerSelected = true)
    if(answer === movieCorrectAnswerID){
      setScore(score += 1)
    }
  }

  function getCorrectMovieFromID(id){
    switch(id){
      case 0:
        return "IMDB";
      case 1:
        return "Metacritic";
      case 2:
        return "Rotten Tomatoes"
    }
  }
}

export default App;