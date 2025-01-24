const { environment } = require('@rails/webpacker');
const { resolve } = require('path');

environment.config.set('mode', process.env.NODE_ENV === 'production' ? 'production' : 'development');

environment.config.merge({
  mode: 'development', // or 'production'
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    alias: {
      '@src': resolve(__dirname, '../../app/javascript/src')
    }
  }
})



const customConfig = {
  resolve: {
    alias: {
      '@src': resolve(__dirname, '../../app/javascript/src')
    },
    fallback: {
      dgram: false,
      fs: false,
      net: false,
      tls: false,
      child_process: false
    }
  }
};

// Add a rule for handling image files
environment.loaders.append('images', {
  test: /\.(png|jpe?g|gif|svg)$/i,
  type: 'asset/resource',
});

environment.config.delete('node.dgram');
environment.config.delete('node.fs');
environment.config.delete('node.net');
environment.config.delete('node.tls');
environment.config.delete('node.child_process');

environment.config.merge(customConfig);

module.exports = environment;
