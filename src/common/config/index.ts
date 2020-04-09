interface Config {
  base_url : string,
}

function getConfig(){
  const configs :{[key:string]: Config} = {
    default: {
      base_url: 'http://127.0.0.1:3000/api'
    },
    development: {
      base_url: 'http://127.0.0.1:3000/api'
    },
    production: {
      base_url: 'http://127.0.0.1:3000/api'
    }
  };

  const config = configs[process.env.NODE_ENV];
  const defaultConfig = configs.default;
  return {...defaultConfig, ...config}
}

export default getConfig();
