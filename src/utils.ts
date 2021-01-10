import { gql } from "@apollo/client";

export const fetchWiki = async (name: string) => {
  let url = "https://en.wikipedia.org/w/api.php";
  const params: any = {
    action: "opensearch",
    search: name,
    limit: "1",
    namespace: "0",
    format: "json",
  };
  url = url + "?origin=*";
  Object.keys(params).forEach((key) => {
    url += "&" + key + "=" + params[key];
  });

  try {
    const response = await (await fetch(url)).json();
    const wikiPath = response[3][0].split("/").pop();
    const wikiResult = await (
      await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiPath}`
      )
    ).json();
    return {
      link: `https://en.wikipedia.org/wiki/${wikiPath}`,
      desc: wikiResult.extract,
    };
  } catch (error) {
    if (error instanceof TypeError) {
      return { desc: "Wikipedia page not found!", link: "" };
    } else {
      console.log(error);
      return { desc: "Error when fetching wikipedia!", link: "" };
    }
  }
};

export const SEARCH_MOVIES = gql`
  query SearchMovies($query: String!) {
    result: searchMovies(query: $query) {
      id
      name
      score
      votes
      budget
      releaseDate
      keywords {
        name
        id
      }
      socialMedia {
        imdb
      }
      poster {
        original
      }
    }
  }
`;
export const SEARCH_RELATED_MOVIES = gql`
  query DiscoverMovies($query: [ID!]) {
    result: discoverMovies(
      filter: { withKeywords: { include: $query, includeLogic: OR } }
    ) {
      id
      name
      score
      votes
      status
      budget
      releaseDate
      keywords {
        name
        id
      }
      socialMedia {
        imdb
      }
      poster {
        original
      }
    }
  }
`;