import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import characters from './protagonists.json'
import CharacterCard from "./CharacterCard";
import { useState } from "react";

function App() {
  let [myFact, setMyFact] = useState("Maine is the closest US state to the continent of Africa");

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
            Characters Inc
          </Typography>
          <Button
            href="#"
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => {
              fetchFact();
            }}
          >
            Get Fact
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Typography
          variant="h2"
          align="center"
          color="text.primary"
          sx={{ py: 2 }}
        >
          Prevalent Protagonists
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mx: 10 }}
          id="factButton"
        >
          {myFact}
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="lg">
        <Grid
          container
          spacing={5}
          justifyContent="center"
          alignItems="flex-start"
        >
          {characters.map((character) => 
            <CharacterCard
            title={character.title}
            pic={character.pic}
            bulletPoint={character.description}
            key={character.description}
          >
          </CharacterCard>
          )}

        </Grid>
      </Container>
    </div>
  );

  function fetchFact(){
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("https://uselessfacts.jsph.pl/api/v2/facts/random", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setMyFact(myFact = result.text)
      })
      .catch((error) => console.error(error));
  }
}

export default App;