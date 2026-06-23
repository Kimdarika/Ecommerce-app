import { preview } from 'vite'
import config from '../vite.config.js'

const server = await preview({
    ...config,
    configFile: false,
})
server.printUrls()
