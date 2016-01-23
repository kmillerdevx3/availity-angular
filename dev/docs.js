import webpack from 'webpack';

import Logger from './logger';
import metalsmith from './metalsmith';
import wepackConfig from '../webpack.config.babel';

function bundle() {

  return new Promise((resolve, reject) => {

    // If path is not set to 'build' => Error: EACCES: permission denied, mkdir '/build'
    wepackConfig.output.path = 'build';

    webpack(wepackConfig).run((err, stats) => {

      if (err) {
        Logger.failed('webpack bundle');
        return reject(err);
      }

      Logger.log(stats.toString(wepackConfig.stats));
      Logger.ok('webpack bundle');
      resolve();

    });

  });

}

function docs() {

  return metalsmith()
    .then(bundle)
    .catch( (err) => {
      Logger.error(err);
    });
}

export default docs;