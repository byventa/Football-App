

module.exports = {
  entry : {
    main: "./src/index.js",
    vendor: "./src/vendor.js"
  },
  module:{
    rules:[
    {
      test:/\.html$/,
      use:["html-loader"]
    },
    {
      test:/\.(svg|png|jpg|gif)$/,
      use:{
        loader:"file-loader?name=/src/img/logos/[name].[ext]",
        options:{
          name:"[name].[ext]",
          outputPath:"img"
        }
      }
    },
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
  }
};