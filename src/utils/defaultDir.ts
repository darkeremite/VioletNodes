// This file is used to get the default directory of the project

import { dirname, resolve } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __filename = fileURLToPath(import.meta.url)
const defaultDir = process.platform == "linux" ? dirname(__filename).replace('/utils', '') : 
                   process.platform == "win32" ? dirname(__filename).replace('\\utils', ''):
                   undefined

export default defaultDir
