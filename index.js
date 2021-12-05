// exercises 4.15, 4.16, 4.17, 4.18, 4.19(?), 4.20, 4.21   done 

const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})