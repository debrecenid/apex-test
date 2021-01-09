import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MovieList from "./components/Movies/MovieList";
import Search from "./components/Search/Search";
import mm from "./assets/images/mm.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "5vh 10vw",
    [theme.breakpoints.down("md")]: {
      padding: "2vh 5vw",
    },
    flexDirection: "column",
    height: "100vh",
    background: `url(${mm})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    overflow: "scroll",
  },
}));
const App: React.FC = () => {
  const [query, setQuery] = useState(null);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Search setQuery={setQuery} />
      {query && <MovieList query={query} />}
    </div>
  );
};

export default App;
