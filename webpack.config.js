const path = require("path");

const sassLoaderRules = {
  test: /\.s[ac]ss$/i,
  use: [
    // Creates `style` nodes from JS strings
    "style-loader",
    // Translates CSS into CommonJS
    "css-loader",
    // Compiles Sass to CSS
    "sass-loader",
  ],
};

const babelLoaderRules = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: [
    {
      loader: "babel-loader",
      options: {
        presets: [
          [
            "@babel/preset-react",
            {
              runtime: "automatic",
            },
          ],
          "@babel/preset-typescript",
        ],
      },
    },
  ],
};

const filesLoader = {
  test: /\.(png|jpe?g|gif)$/i,
  use: [
    {
      loader: "file-loader",
    },
  ],
};

module.exports = {
  entry: "./src/index.tsx",
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "public"), // string (default)
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: "[name].js", // string (default)
    // the filename template for entry chunks
  },
  module: { rules: [babelLoaderRules, sassLoaderRules, filesLoader] },
  resolve: { extensions: [".ts", ".d.ts", ".tsx", ".js", ".json"] },
  devtool: "source-map",
};
