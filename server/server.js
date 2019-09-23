require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require("path");
const express = require("express");
const querystring = require("querystring");
const cors = require("cors");
const request = require("request");

const app = express();
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const stateKey = "spotify_auth_state";
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const env = process.env.NODE_ENV || "development";
let redirectUri, callbackUrl;
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
  redirectUri = baseurl + "/api/callback";
  callbackUrl = baseurl + "/loginsuccess";
};

setRedirectUrls();

app.use(cookieParser(), express.static(publicPath), cors());

app.get("/api/login", (req, res) => {
  let state = generateRandomString(16),
    scope = "user-read-private user-read-email";

  res.cookie(stateKey, state);

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirectUri,
        state: state
      })
  );
});

app.get("/api/callback", (req, res) => {
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
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
      },
      headers: {
        Authorization: "Basic " + new Buffer.from(client_id + ":" + client_secret).toString("base64")
      },
      json: true
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        res.cookie("accessToken", body.access_token, { maxAge: body.expires_in * 1000 }); //Max Age takes time value in milliseconds, Spotify returned value is returned in seconds.
        res.cookie("refreshToken", body.refresh_token);
        res.redirect(callbackUrl);
      } else {
        console.log(error); //TODO: Handle this error
      }
    });
  }
});

app.get("/api/refresh_token", (req, res) => {
  let refreshToken = req.query.refreshToken;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization: "Basic " + new Buffer.from(client_id + ":" + client_secret).toString("base64")
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refreshToken
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send({
        accessToken: body.access_token,
        refreshToken: body.refresh_token || refreshToken,
        expiresIn: body.expires_in
      });
    } else {
      console.log(error); //TODO: Handle this error
    }
  });
});

app.get("/api/me", (req, res) => {
  let accessToken = req.query.accessToken;
  let authOptions = {
    url: "https://api.spotify.com/v1/me",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  };

  request.get(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
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
