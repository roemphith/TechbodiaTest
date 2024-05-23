// APP CONFIG - General Project Configuration
// APP CONFIG - General Project Configuration
const env = process.env

export const api = {

  baseURl: env.VUE_APP_API,
  prefix: env.VUE_APP_API_PREFIX ?? '/api/v1',

  endpoint: {
    setting: "get-setting",
    home: "name",
  }
}
