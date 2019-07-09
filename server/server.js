require("dotenv").config();
const path = require("path");
const express = require("express");
const querystring = require("querystring");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const request = require("request");

const app = express();
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const stateKey = "spotify_auth_state";
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const env = process.env.NODE_ENV || "development";
let redirect_uri, callback_url;
const baseurl = env === "development" ? "http://localhost:3000" : "https://spotify-clone-dblakenz.herokuapp.com";

const generateRandomString = length => {
  let text = "",
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const setRedirectUrls = () => {
  redirect_uri = baseurl + "/api/callback";
  callback_url = baseurl + "/loginsuccess";
};

setRedirectUrls();

app.use(express.static(publicPath), cors(), cookieParser());

app.get("/api/login", function(req, res) {
  let state = generateRandomString(16),
    scope = "user-read-private user-read-email";

  res.cookie(stateKey, state);

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  );
});

app.get("/api/callback", function(req, res) {
  let code = req.query.code || null,
    state = req.query.state || null,
    storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    console.log("State mismatch"); //TODO: Handle this error
  } else {
    res.clearCookie(stateKey);
    let authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code"
      },
      headers: {
        Authorization: "Basic " + new Buffer.from(client_id + ":" + client_secret).toString("base64")
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        let access_token = body.access_token,
          refresh_token = body.refresh_token;

        res.cookie("accessToken", access_token);
        res.cookie("refreshToken", refresh_token);

        res.redirect(callback_url);
      } else {
        console.log(error); //TODO: Handle this error
      }
    });
  }
});

app.get("/api/refresh_token", function(req, res) {
  let refresh_token = req.query.refreshToken;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization: "Basic " + new Buffer.from(client_id + ":" + client_secret).toString("base64")
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      let newAccessToken = body.access_token,
        newRefreshToken = body.refresh_token || refresh_token;
      res.send({
        access_token: newAccessToken,
        refresh_token: newRefreshToken
      });
    } else {
      console.log(error); //TODO: Handle this error
    }
  });
});

// ENSURE THIS IS ALWAYS LAST
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
