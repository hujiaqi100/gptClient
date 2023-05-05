const server = (_path, mainWindow) => {
    const express = require('express');
    const proxy = require('./middleware/setupProxy.js')
    const routerList = require('./mockData/testData.js')
    const app = express();
    const bodyParser = require('body-parser');
    const path = require('path')
    app.use(express.static(path.join(_path, '../out')))
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    proxy(app)

    // const webpack = require('webpack');
    // const webpackDevMiddleware = require('webpack-dev-middleware');
    // const config = require('./build/webpack.common.js');
    // const _config = config(null, { mode: 'development' })
    // const complier = webpack(_config);
    // const mid = webpackDevMiddleware(complier, {
    //     publicPath: _config.output.publicPath,
    // })
    // app.use(mid);

    app.use(routerList(mainWindow))
    app.listen(3000);
}
module.exports = server
