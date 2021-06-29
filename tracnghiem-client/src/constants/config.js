export const API_URL = "http://localhost:5000/api"
export const API_ENDPOINT = "http://localhost:5000/graphql"
export const API_AUTH = "http://localhost:5000/auth"

//https://vatlythpt.herokuapp.com
//http://localhost:5000/
//process.env.PORT


export const mathjax_config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
};
