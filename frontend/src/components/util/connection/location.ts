import config from './config'

export const _backend = config.PROD ? config.BACKEND_DOMAIN_LIVE : config.BACKEND_DOMAIN_TEST
export const _frontend = config.PROD ? config.FRONTEND_DOMAIN_LIVE : config.FRONTEND_DOMAIN_TEST

export default {
    backend: _backend,
    frontend: _frontend
}