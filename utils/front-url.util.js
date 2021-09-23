const env = process.env.ENVIRONMENT

export const getFrontURL = () => {
  switch (env) {
    case 'production':
      return process.env.PROD_APP_DOMAIN
    case 'development':
      return process.env.DEV_APP_DOMAIN
    case 'qa':
      return process.env.QA_APP_DOMAIN
    default:
      return `${process.env.LOCAL_APP_DOMAIN}:${process.env.PORT}`
  }
}
