// This file is used to get the default directory of the project

import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const defaultDir = dirname(__filename).replace('/utils', '')

export default defaultDir
