import express, {Request, Response} from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import dalleRoutes from './routes/dalle.route'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json({limit : "50mb"}))

app.use('/api/v1/dalle', dalleRoutes)

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})