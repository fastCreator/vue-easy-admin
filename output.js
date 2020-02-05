{
  mode: 'development',
  context: 'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\easy-admin',
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: 'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\easy-admin\\dist',
    filename: 'js/[name].js',
    publicPath: '/',
    chunkFilename: 'js/[name].js'
  },
  resolve: {
    alias: {
      '@': 'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\easy-admin\\src',
      vue$: 'vue/dist/vue.runtime.esm.js',
      'element-ui': 'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\easy-admin\\node_modules\\element-ui',
      service: 'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\easy-admin\\src\\service',
      _src: 'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\easy-admin\\src'
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    modules: [
      'node_modules',
      'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\easy-admin\\node_modules',
      'E:\\easy-admin\\easy-admin\\node_modules\\_@vue_cli-service@4.1.2@@vue\\cli-service\\node_modules'
    ]
  },
  resolveLoader: {
    modules: [
      'E:\\easy-admin\\easy-admin\\node_modules\\_@vue_cli-plugin-babel@4.1.2@@vue\\cli-plugin-babel\\node_modules',
      'node_modules',
      'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\easy-admin\\node_modules',
      'E:\\easy-admin\\easy-admin\\node_modules\\_@vue_cli-service@4.1.2@@vue\\cli-service\\node_modules'
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_cache-loader@4.1.0@cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\easy-admin\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '0c0d182e'
            }
          },
          {
            loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-loader@15.8.3@vue-loader\\lib\\index.js',
            options: {
              compilerOptions: {
                whitespace: 'condense'
              },
              cacheDirectory: 'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\easy-admin\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '0c0d182e'
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_url-loader@2.3.0@url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        exclude: [
          'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\easy-admin\\src\\svg'
        ],
        use: [
          {
            loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_file-loader@4.3.0@file-loader\\dist\\cjs.js',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_url-loader@2.3.0@url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_url-loader@2.3.0@url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        oneOf: [
          /* config.module.rule('pug').rule('pug-vue') */
          {
            resourceQuery: /vue/,
            use: [
              {
                loader: 'pug-plain-loader'
              }
            ]
          },
          /* config.module.rule('pug').rule('pug-template') */
          {
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_raw-loader@0.5.1@raw-loader\\index.js'
              },
              {
                loader: 'pug-plain-loader'
              }
            ]
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('css').rule('theme') */
          {
            test: /[\\\/]theme[\\\/]/,
            use: [
              {
                loader: 'style-loader',
                options: {
                  injectType: 'lazyStyleTag'
                }
              },
              {
                loader: 'css-loader'
              }
            ]
          },
          /* config.module.rule('css').rule('normal') */
          {
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          },
          /* config.module.rule('postcss').rule('normal') */
          {
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_sass-loader@8.0.2@sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    run_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.25.0\t(Sass Compiler)\t[Dart]\ndart2js\t2.7.0\t(Dart Compiler)\t[Dart]',
                    types: {
                      Boolean: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    }
                  }
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_sass-loader@8.0.2@sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    run_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.25.0\t(Sass Compiler)\t[Dart]\ndart2js\t2.7.0\t(Dart Compiler)\t[Dart]',
                    types: {
                      Boolean: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    }
                  }
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_sass-loader@8.0.2@sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    run_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.25.0\t(Sass Compiler)\t[Dart]\ndart2js\t2.7.0\t(Dart Compiler)\t[Dart]',
                    types: {
                      Boolean: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    }
                  }
                }
              }
            ]
          },
          /* config.module.rule('scss').rule('normal') */
          {
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_sass-loader@8.0.2@sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    run_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.25.0\t(Sass Compiler)\t[Dart]\ndart2js\t2.7.0\t(Dart Compiler)\t[Dart]',
                    types: {
                      Boolean: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_sass-loader@8.0.2@sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    run_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.25.0\t(Sass Compiler)\t[Dart]\ndart2js\t2.7.0\t(Dart Compiler)\t[Dart]',
                    types: {
                      Boolean: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    }
                  },
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_sass-loader@8.0.2@sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    run_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.25.0\t(Sass Compiler)\t[Dart]\ndart2js\t2.7.0\t(Dart Compiler)\t[Dart]',
                    types: {
                      Boolean: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    }
                  },
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_sass-loader@8.0.2@sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    run_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.25.0\t(Sass Compiler)\t[Dart]\ndart2js\t2.7.0\t(Dart Compiler)\t[Dart]',
                    types: {
                      Boolean: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    }
                  },
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').rule('normal') */
          {
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_sass-loader@8.0.2@sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  implementation: {
                    run_: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    render: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    renderSync: function () {
                      return _call(f, Array.prototype.slice.apply(arguments));
                    },
                    info: 'dart-sass\t1.25.0\t(Sass Compiler)\t[Dart]\ndart2js\t2.7.0\t(Dart Compiler)\t[Dart]',
                    types: {
                      Boolean: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Color: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      List: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Map: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Null: function () {
                        return _call(f, Array.prototype.slice.apply(arguments));
                      },
                      Number: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      String: function () {
                        return _call(f, this, Array.prototype.slice.apply(arguments));
                      },
                      Error: function Error() { [native code] }
                    }
                  },
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_less-loader@5.0.0@less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_less-loader@5.0.0@less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_less-loader@5.0.0@less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').rule('normal') */
          {
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_less-loader@5.0.0@less-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').rule('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').rule('normal') */
          {
            use: [
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_vue-style-loader@4.1.2@vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_css-loader@3.4.1@css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              {
                loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_postcss-loader@3.0.0@postcss-loader\\src\\index.js',
                options: {
                  sourceMap: false,
                  plugins: [
                    function () { /* omitted long function */ }
                  ]
                }
              },
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          {
            loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_cache-loader@4.1.0@cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\easy-admin\\node_modules\\.cache\\babel-loader',
              cacheIdentifier: '2b0cbabf'
            }
          },
          {
            loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_babel-loader@8.0.6@babel-loader\\lib\\index.js',
            options: {
              configFile: 'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\easy-admin\\babel.config.js'
            }
          }
        ]
      },
      /* config.module.rule('eslint') */
      {
        enforce: 'pre',
        test: /\.(vue|(j|t)sx?)$/,
        exclude: [
          /node_modules/,
          'E:\\easy-admin\\easy-admin\\node_modules\\_@vue_cli-service@4.1.2@@vue\\cli-service\\lib'
        ],
        use: [
          {
            loader: 'E:\\easy-admin\\easy-admin\\node_modules\\_eslint-loader@2.2.1@eslint-loader\\index.js',
            options: {
              extensions: [
                '.js',
                '.jsx',
                '.vue'
              ],
              cache: true,
              cacheIdentifier: '599bde44',
              emitWarning: false,
              emitError: false,
              eslintPath: 'E:\\easy-admin\\easy-admin\\node_modules\\_eslint@5.16.0@eslint',
              formatter: function () { /* omitted long function */ },
              configFile: 'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\easy-admin\\.eslintrc.js'
            }
          }
        ]
      },
      /* config.module.rule('icons') */
      {
        test: /\.svg$/,
        include: [
          'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\easy-admin\\src\\svg'
        ],
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\\/]node_modules[\\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      {
        options: {
          test: /\.m?js(\?.*)?$/i,
          chunkFilter: () => true,
          warningsFilter: () => true,
          extractComments: false,
          sourceMap: true,
          cache: true,
          cacheKeys: defaultCacheKeys => defaultCacheKeys,
          parallel: true,
          include: undefined,
          exclude: undefined,
          minify: undefined,
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          }
        }
      }
    ]
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"development"',
          BASE_URL: '"/"',
          cwdDir: '"C:\\\\Users\\\\Administrator\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\easy-admin"',
          pagesDir: '"C:\\\\Users\\\\Administrator\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\easy-admin\\\\src\\\\pages"',
          componentsDir: '"C:\\\\Users\\\\Administrator\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\easy-admin\\\\src\\\\components"',
          localDir: '"C:\\\\Users\\\\Administrator\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\easy-admin\\\\src\\\\pages\\\\local"',
          svgDir: '"C:\\\\Users\\\\Administrator\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\easy-admin\\\\src\\\\svg"',
          themeDir: '"C:\\\\Users\\\\Administrator\\\\AppData\\\\Roaming\\\\npm\\\\node_modules\\\\easy-admin\\\\src\\\\theme"'
        }
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('html') */
    new HtmlWebpackPlugin(
      {
        templateParameters: function () { /* omitted long function */ },
        template: 'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\easy-admin\\public\\index.html'
      }
    ),
    /* config.plugin('preload') */
    new PreloadPlugin(
      {
        rel: 'preload',
        include: 'initial',
        fileBlacklist: [
          /\.map$/,
          /hot-update\.js$/
        ]
      }
    ),
    /* config.plugin('prefetch') */
    new PreloadPlugin(
      {
        rel: 'prefetch',
        include: 'asyncChunks'
      }
    ),
    /* config.plugin('copy') */
    new CopyPlugin(
      [
        {
          from: 'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\easy-admin\\public',
          to: 'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\easy-admin\\dist',
          toType: 'dir',
          ignore: [
            '.DS_Store',
            {
              glob: 'index.html',
              matchBase: false
            }
          ]
        }
      ]
    ),
    {
      patterns: [
        {
          from: 'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\easy-admin\\public',
          to: 'C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\easy-admin\\dist\\public'
        }
      ],
      options: {}
    }
  ],
  entry: {
    app: [
      './src/main.js'
    ]
  }
}
