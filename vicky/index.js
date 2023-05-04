const server = (_path, $path) => {
    const express = require('express');
    const proxy = require('./middleware/setupProxy.js')
    const routerList = require('./mockData/testData.js')
    const app = express();
    const bodyParser = require('body-parser');
    const path = require('path')
    // const webpack = require('webpack');
    // const webpackDevMiddleware = require('webpack-dev-middleware');
    // const config = require('./build/webpack.common.js');
    // const _config = config(null, { mode: 'development' })
    // const complier = webpack(_config);
    app.use(express.static(path.join(_path, '../out')))
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    proxy(app)
    // const { exec } = require('child_process')
    // exec('open http://localhost:3000')
    // const mid = webpackDevMiddleware(complier, {
    //     publicPath: _config.output.publicPath,
    // })
    // app.use(mid);
    app.use(routerList)
    app.listen(3000);
}
module.exports = server
