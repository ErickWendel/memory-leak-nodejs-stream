import http from 'http'
import { Readable } from 'stream'

const handler = (apiName) => async function (request, response) {
    let count = 0;
    const maxItems = 10
    const readable = Readable({
        read() {
            const everySecond = (intervalContext) => () => {
                if (count++ <= maxItems) {
                    this.push(JSON.stringify({ id: Date.now() + count, name: `Erick-${count}`, apiName }) + "\n")
                    return;
                }
                clearInterval(intervalContext)
                this.push(null)
            }

            setInterval(everySecond(this))
        },
    })

    readable.pipe(response)
}

http.createServer(handler('api01')).listen(6000, () => console.log('server running at 6000'))
http.createServer(handler('api02')).listen(7000, () => console.log('server running at 7000'))