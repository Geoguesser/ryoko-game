const path = require("path");

const { NODE_ENV = "development" } = process.env;

module.exports = {
  entry: path.resolve(__dirname, "../index.tsx"),
  output: {
    path: path.resolve(__dirname, "../public"),
    filename: "bundle.js"
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "../public")
  },
  module: {
    rules: [
      {
        oneOf: [
          // add support for typescript and typescript + react
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
              }
            }
          },
          // add support for css
          {
            test: /\.css$/,
            exclude: /\.module\.css$/,
            use: [
              NODE_ENV === "development" && require.resolve("style-loader"),
              // NODE_ENV === "production" && { loader: minicssextractplugin loader ... },
              {
                loader: require.resolve("css-loader"),
                options: {
                  importLoaders: 1
                }
              }
            ]
          },
          // add support for css modules
          {
            test: /\.module\.css$/,
            use: [
              NODE_ENV === "development" && require.resolve("style-loader"),
              // NODE_ENV === "production" && { loader: minicssextractplugin loader ... },
              {
                loader: require.resolve("css-loader"),
                options: {
                  importLoaders: 1,
                  modules: {
                    localIdentName: "[name]_[local]_[hash:base64:5]"
                  }
                }
              }
            ],
          },
        ]
      }
    ]
  }
}