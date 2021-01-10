import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import dog from "../../assets/images/dog.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
    height: "30vh",
    marginBottom: "5vh",
  },
  logo: {
    maxWidth: "15rem",
  },
  form: {
    width: "90%",
    [theme.breakpoints.up("md")]: {
      width: "60%",
    },
    backgroundColor: "white",
    opacity: "0.9",
    borderRadius: "2rem",
    display: "flex",
  },
  input: {
    width: "80%",
    borderRadius: "2rem",
    border: "none",
    height: "5vh",
    margin: "0",
    display: "inline-block",
    outline: "none",
    paddingLeft: "5%",
    fontSize:'1rem',
  },
  button: {
    flex: "20%",
    borderRadius: "2rem",
    height: "5vh",
    backgroundColor: "#ccc",
  },
}));

interface Props {
  setQuery: (value: string) => void;
}
const Search: React.FC<Props> = ({ setQuery }) => {
  const classes = useStyles();

  const handleSearch = (event: any) => {
    event.preventDefault();
    const { name } = event.target.elements;
    setQuery(name.value);
  };
  return (
    <div className={classes.root}>
      <img src={dog} alt="dogoo" className={classes.logo} />
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSearch}
      >
        <input
          data-testid="search-input"
          name="name"
          className={classes.input}
          placeholder="Search for a movie..."
        />
        <Button
          data-testid="search-button"
          className={classes.button}
          variant="contained"
          type="submit"
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default Search;
