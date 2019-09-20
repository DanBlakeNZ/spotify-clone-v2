import Cookies from "js-cookie";

const env = process.env.NODE_ENV || "development";
const baseurl = env === "development" ? "http://localhost:3000" : "https://spotify-clone-dblakenz.herokuapp.com";

export const refreshLogin = refreshToken => {
  return fetch(baseurl + `/api/refresh_token?refreshToken=${refreshToken}`)
    .then(response => response.json())
    .then(data => {
      //js-cookie requires value in days - Spotify returns time in milliseconds.
      Cookies.set("accessToken", data.accessToken, { expires: data.expiresIn / 86400 });
      Cookies.set("refreshToken", data.refreshToken || refreshToken);
      return data;
    })
    .catch(error => console.error(error));
};

export const getCurrentUserProfile = accessToken => {
  return fetch(baseurl + `/api/me?accessToken=${accessToken}`)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.error(error));
};
