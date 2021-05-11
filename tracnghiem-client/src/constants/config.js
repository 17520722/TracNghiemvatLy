export const API_URL = "http://localhost:5000/api"
export const API_ENDPOINT = "http://localhost:5000/graphql"
export const API_AUTH = "http://localhost:5000/auth"

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
