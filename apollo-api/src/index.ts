import cors from 'cors'
import express, { type Request, type Response } from 'express'
import createHttpError from 'http-errors'

import { env } from '~/env'
import userRoutes from '~/routes/user'
import errorHandler from './middlewares/error-handler'
import kategoriaEShpenzimeveRoutes from './routes/kategoriaEShpenzimeveRoutes'
import shpenzimetRoutes from './routes/shpenzimetRoutes'
import veturaRoutes from './routes/veturaRoutes'
import path from 'path'
import fs from 'fs'
import raportiShoferitRoutes from './routes/raportiShoferitRoutes'
import activityRoutes from './routes/activityRoutes'

const app = express()
const port = env.SERVER_PORT || 4321

app.use(
  cors({
    allowedHeaders: '*',
    methods: '*',
    origin: '*',
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    Hello: '!',
  })
})
app.get('/images/uploads/:folderpath/:filename', (req, res) => {
  const filename = req.params.filename
  if (!filename) {
    return res.status(400).json({ error: 'Filename is required' })
  }
  const folderpath = req.params.folderpath
  if (!folderpath) {
    return res.status(400).json({ error: 'Folderpath is required' })
  }
  const filePath = path.join(__dirname, '..', 'uploads', folderpath, filename)
  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'File not found' })
    } else {
      res.setHeader('Content-Disposition', 'attachment; filename=' + filename)
      res.sendFile(filePath)
    }
  })

  // res.sendFile(path.join(__dirname, '..', 'uploads', folderpath, filename));
})
app.use('/users', userRoutes)
app.use('/shpenzimet', shpenzimetRoutes)
app.use('/kategoriaeshpenzimeve', kategoriaEShpenzimeveRoutes)
app.use('/raportiShoferit', raportiShoferitRoutes)
app.use('/vetura', veturaRoutes)
app.use("/activity", activityRoutes)

app.use((req, res, next) => next(createHttpError(404, 'Endpoint not found')))

app.use(errorHandler)

app.listen(port, () => {
  console.log(`server started, url: http://localhost:${port}`)
})
