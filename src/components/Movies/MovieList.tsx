import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Movie from "./Movie";
import {
  CircularProgress,
  makeStyles,
  Paper,
  TablePagination,
} from "@material-ui/core";
import { gql, useQuery } from "@apollo/client";
import { MovieType } from "../../types";

const GET_MOVIES = gql`
  query SearchMovies($query: String!) {
    searchMovies(query: $query) {
      id
      name
      score
      votes
      status
      keywords {
        name
        id
      }
      socialMedia {
        imdb
      }
    }
  }
`;
const useStyles = makeStyles({
  spinner: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
});
const MovieList: React.FC<any> = ({ query }) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_MOVIES, {
    variables: { query },
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event: any, newPage: number) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    console.log(event.target.value);
  };
  if (loading)
    return (
      <div className={classes.spinner}>
        <CircularProgress color="secondary" />
      </div>
    );
  if (error) return <div>`Error! ${error.message}`;</div>;

  return (
    <Paper>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Votes</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.searchMovies.map((row: MovieType) => (
              <Movie key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.searchMovies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default MovieList;
