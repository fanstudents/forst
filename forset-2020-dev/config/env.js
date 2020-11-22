const env = process.env.ENV || 'development';

const configs = {
  development: {
    srcDomain: 'https://project-name.oturn.co',
    apiDomain: 'https://project-name.oturn.co/api',
  },
  staging: {
    srcDomain: 'https://project-name.oturn.co',
    apiDomain: 'https://project-name.oturn.co/api',
  },
  production: {
    srcDomain: 'https://project-name.com.tw',
    apiDomain: 'https://project-name.com.tw/api',
  },
}[env];

module.exports = {
  SRC_DOMAIN: configs.srcDomain,
  API_DOMAIN: configs.apiDomain,
};

