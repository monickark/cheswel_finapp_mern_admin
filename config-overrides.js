module.exports = function override(config){
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
            "zlib": require.resolve("browserify-zlib"), 
            "querystring": require.resolve("querystring-es3"),
            "path": require.resolve("path-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "stream": require.resolve("stream-browserify"),
            // "assert": require.resolve("assert/"),
            // "url": require.resolve("url/"),
            // "buffer": require.resolve("buffer/"),
            // "util": require.resolve("util/"), 
            fs: false, 
            "url": false, 
            "assert": false, 
            "buffer": false, 
            "util": false,

        })
        config.resolve.fallback = fallback;
        return config;
}