module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                  'babel-loader'
                ]
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    output: {
        libraryTarget: 'umd'
    }
}