const path = require("path");
const Dotenv = require("dotenv-webpack");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = env => {
  const isProduction = env === "production";
  return {
    stats: "errors-only",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "public", "dist"),
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ["file-loader"]
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "babel-loader"
            },
            {
              loader: "react-svg-loader",
              options: {
                jsx: true // true outputs JSX tags
              }
            }
          ]
        }
      ]
    },
    plugins: [new Dotenv()],
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      publicPath: "/dist/",
      historyApiFallback: true,
      writeToDisk: true
    }
  };
};
