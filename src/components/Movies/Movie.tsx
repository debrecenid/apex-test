import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Button, CircularProgress, Link } from "@material-ui/core";
import { MovieType } from "../../types";
import { fetchWiki } from "../../utils";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  th: {
    cursor: "pointer",
  },
  collapse: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
    "& img": {
      maxWidth: "15%",
      marginRight: "2%",
      [theme.breakpoints.down("xs")]: {
        maxWidth: "30%",
      },
    },
  },
  button: {
    borderRadius: "1rem",
    margin: "1%",
    width: "10rem",
    background: "#ccc",
  },
}));

interface Props {
  row: MovieType;
  setRelatedParam: (keyWordIds: string[]) => void;
}
const Movie: React.FC<Props> = ({ row, setRelatedParam }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [wiki, setWiki] = useState();
  const [wikiUrl, setwikiUrl] = useState();

  // Handle the collapse, and calling the wikipedia fetch method.
  const handleOpen = async () => {
    setOpen((prevstate) => !prevstate);
    const wikiData: any = await fetchWiki(row.name);
    setWiki(wikiData.desc);
    setwikiUrl(wikiData.link);
  };

  // Set the keyword id-s to the related params, and trigger the realted movies search.
  const handleRelatedSearch = () => {
    const keyWordIds = row.keywords.map((keyWord) => keyWord.id);
    setRelatedParam(keyWordIds);
  };

  let collapseContent = <CircularProgress color="secondary" />;
  if (wiki) {
    collapseContent = (
      <Box margin={1} className={classes.collapse}>
        <img src={row.poster?.original} alt="" />
        <Box padding={1} width="100%">
          {wiki}
        </Box>
        {wikiUrl && (
          <Link target="_blank" href={wikiUrl}>
            Wiki
          </Link>
        )}
        <Button
          className={classes.button}
          onClick={handleRelatedSearch}
          variant="contained"
          type="button"
        >
          Related
        </Button>
      </Box>
    );
  }
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell
          className={classes.th}
          component="th"
          scope="row"
          onClick={handleOpen}
        >
          {row.name}
        </TableCell>
        <TableCell align="right">
          <Link
            target="_blank"
            href={
              row.socialMedia.imdb
                ? row.socialMedia.imdb
                : `https://www.imdb.com/find?q=${row.name}`
            }
          >
            IMDb: {row.score}
          </Link>
        </TableCell>
        <TableCell align="right">{row.votes}</TableCell>
        <TableCell align="right">
          {moment(row.releaseDate).format("YYYY")}
        </TableCell>
        <TableCell align="right">${row.budget / 1.0e6}M</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {collapseContent}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Movie;
