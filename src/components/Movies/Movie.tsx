import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { CircularProgress, Link } from "@material-ui/core";
import { MovieType } from "../../types";
import { fetchWiki } from "../../utils";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  th: {
    cursor: "pointer",
  },
});
const Movie: React.FC<{ row: MovieType }> = ({ row }) => {
  const [open, setOpen] = React.useState(false);
  const [wiki, setWiki] = useState("");

  const handleOpen = async () => {
    setOpen((prevstate) => !prevstate);
    const wikiData = await fetchWiki(row.name);
    setWiki(wikiData);
  };
  const classes = useRowStyles();

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
        <TableCell align="right">{row.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {!wiki ? (
              <CircularProgress />
            ) : (
              <Box margin={1}>
                {wiki}
                <Link href="#">Wiki</Link>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Movie;
