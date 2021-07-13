export const API_URL = "https://vatlythpt.herokuapp.com/api"
export const API_ENDPOINT = "https://vatlythpt.herokuapp.com/graphql"
export const API_AUTH = "https://vatlythpt.herokuapp.com/auth"

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
