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
const redirect_uri = "http://localhost:3000/api/callback"; //TODO: needs to work in production + Spotify Developers

const generateRandomString = function(length) {
  let text = "",
    possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

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
          refresh_token = body.refresh_token,
          expires_in = body.expires_in;

        res.cookie("accessToken", access_token, {
          maxAge: expires_in
        });
        res.cookie("refreshToken", refresh_token);

        res.redirect("http://localhost:8080/browse");
      } else {
        console.log(error); //TODO: Handle this error
      }
    });
  }
});

// ENSURE THIS IS ALWAYS LAST
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
