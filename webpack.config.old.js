const path = require("path");

const sassLoaderRules = {
  test: /\.s[ac]ss$/i,
  use: ["style-loader", "css-loader", "sass-loader"],
};

const babelLoaderRules = {
  test: /\.tsx?$/,
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

const cssImageLoader = {
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  type: "asset/resource",
};

const svgLoader = {
  test: /\.svg$/,
  use: ["@svgr/webpack"],
};

module.exports = {
  mode: "development",                 // 👈 set an explicit mode
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "../cidein-presupuestos/construimos-front"),
    filename: "[name].js",             // will emit main.js
    publicPath: "/",
    clean: { keep: /\.html$/ }, // 👈 preserve any .html files in the output dir
  },
  module: { rules: [babelLoaderRules, svgLoader, cssImageLoader, sassLoaderRules] },
  resolve: { extensions: [".ts", ".d.ts", ".tsx", ".js", ".json"] },
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    devMiddleware: { writeToDisk: true }, // 👈 see changes on disk while serving
  },
  // Optional: turn off the persistent cache once
  // cache: false,
};
