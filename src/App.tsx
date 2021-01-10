import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MovieList from "./components/Movies/MovieList";
import Search from "./components/Search/Search";
import mm from "./assets/images/mm.png";
import { SEARCH_MOVIES, SEARCH_RELATED_MOVIES } from "./utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "5vh 10vw",
    [theme.breakpoints.down("xs")]: {
      padding: "2vh 0.5rem",
    },
    flexDirection: "column",
    minHeight: "100vh",
    background: `url(${mm})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    overflow: "scroll",
  },
}));
const App: React.FC = () => {
  const classes = useStyles();
  const [searchParam, setSearchParam] = useState("");
  const [relatedParam, setRelatedParam] = useState<null | string[]>(null);

  // Handle the search param change, and set back the related to null
  const handleSearch = (val: string) => {
    setSearchParam(val);
    setRelatedParam(null);
  };

  let movileListContent;
  //If the realted param is not null we show the related moves
  if (relatedParam) {
    movileListContent = (
      <MovieList
        searchQuery={SEARCH_RELATED_MOVIES}
        param={relatedParam}
        setRelatedParam={setRelatedParam}
      />
    );
  } else if (searchParam) {
    movileListContent = (
      <MovieList
        searchQuery={SEARCH_MOVIES}
        param={searchParam}
        setRelatedParam={setRelatedParam}
      />
    );
  }
  return (
    <div className={classes.root}>
      <Search setQuery={handleSearch} />
      {movileListContent}
    </div>
  );
};

export default App;
