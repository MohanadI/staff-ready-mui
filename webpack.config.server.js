
const { makeDevelopmentConfig } = require('./webpack.config.modular.js');
const devexports = makeDevelopmentConfig();

/* ===========================================
 * This configuration file is used to launch
 * the webpack-dev-server. It creates a local
 * build folder /dist and serves content from
 * there. Proxy settings below will have to
 * be configured for communication with the
 * Tomcat server and Spring REST endpoints.
 * =========================================== */

module.exports = devexports;
module.exports.devtool = 'inline-source-map';
module.exports.devServer = {
    historyApiFallback: true,
    port: 3000,								// Port 3005 because Tomcat uses 8080
    hot: true,								// Enable hot-reload when changes are made (does not account for build errors)
    proxy: [{									// Enable proxy for any REST calls to Spring Controllers
        context: ['/StaffReady/v10/api/**'],
        target: 'https://cobalt301.openstack.local',
        secure: false,
    }],
    open: false,
    client: {
        logging: 'verbose',
    },
    static: './WEB-INF/views/build'
};
