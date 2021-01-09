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
    return wikiResult.extract;
  } catch (error) {
    if (error instanceof TypeError) {
      //If the movie dont have a wiki page then the link in the response is undefined, so the split gives a typeError
      return "Wikipedia page not found!";
    } else {
      console.log(error);
    }
  }
};

export {};
