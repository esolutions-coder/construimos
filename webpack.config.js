const path = require("path");

const sassLoaderRules = {
  test: /\.s[ac]ss$/i,
  use: [
    "style-loader",
    "css-loader",
    {
      loader: "sass-loader",
      options: {
        implementation: require("sass"),
        // ← Embedded API (sin warning)
      },
    },
  ],
};
const babelLoaderRules = {
  test: /\.tsx?$/i,
  exclude: /node_modules/,
  use: [
    {
      loader: "babel-loader",
      options: {
        presets: [
          ["@babel/preset-react", { runtime: "automatic" }],
          "@babel/preset-typescript",
        ],
      },
    },
  ],
};

const filesLoader = {
  test: /\.(png|jpe?g|gif|svg)$/i,
  type: "asset/resource", // sustituye file-loader
};

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js",
    clean: true, // limpia /public entre builds (opcional)
  },
  module: { rules: [babelLoaderRules, sassLoaderRules, filesLoader] },
  resolve: { extensions: [".ts", ".d.ts", ".tsx", ".js", ".json"] },
  devtool: "source-map",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
};
