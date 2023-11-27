import {app} from './app.js'
import 'dotenv/config'
import { figletText, printDevOptions, print } from './util/print.js'
import { DEV_OPTIONS } from './configs/config_app.js'
import testuser from './util/testuser.js'
import {sequelize} from './database/connection.js'

import { User } from './models/user.js'
import { Hit } from './models/hits.js'
import { Option } from './models/option.js'
import game_options from './configs/game_options.js'
import { ORIGIN } from './config.js'
import generateDefaultUsers from './util/generateDefaultUsers.js'


const port = process.env.PORT || 3000

const initDatabase = async () => {
    Hit; User; Option
    await sequelize.sync({force: true})
}

app.listen(port, async () => {
    await initDatabase()
    const rlen = 35
    console.log(figletText("QRCade"))
    console.log("-".repeat(rlen))
    printDevOptions()
    console.log("-".repeat(rlen))
    print("http://localhost:" + port , "Running on: ")
    console.log("-".repeat(rlen))
    print(`CORS Origin : ${ORIGIN}`)
    console.log("-".repeat(rlen))

    setTimeout(() => game_options(), 100)

    if(DEV_OPTIONS.DEV_MODE && DEV_OPTIONS.TEST_USER){
        setTimeout(() => testuser(), 1000)
    }
    setTimeout(() => generateDefaultUsers(), 1000)

})