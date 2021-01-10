import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Movie from "./Movie";
import { Box, CircularProgress, makeStyles, Paper } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { MovieType } from "../../types";

const useStyles = makeStyles({
  spinner: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
  error: {
    color: "white",
  },
  paper: {
    overflow: "auto",
    maxHeight:'60vh'
  },
});

interface Props {
  searchQuery: any;
  param: string | string[];
  setRelatedParam: (keyWordIds: string[]) => void;
}
const MovieList: React.FC<Props> = ({
  searchQuery,
  param,
  setRelatedParam,
}) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(searchQuery, {
    variables: { query: param },
  });
  if (loading)
    return (
      <Box className={classes.spinner}>
        <CircularProgress color="secondary" />
      </Box>
    );
  if (error)
    return <Box className={classes.error}>`Error! ${error.message}`;</Box>;

  return (
    <Paper className={classes.paper}>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Votes</TableCell>
              <TableCell align="right">Year</TableCell>
              <TableCell align="right">Budget</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.result.map((row: MovieType) => (
              <Movie setRelatedParam={setRelatedParam} key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MovieList;
