import {
  PassThrough,
  Writable
} from 'stream'
import http from 'http'

const API_01 = 'http://localhost:6000'
const API_02 = 'http://localhost:7000'


function get(url, target) {
  http.get(url, res => res.pipe(target))
}

setInterval(() => {
  const stream = PassThrough()
  get(API_01, stream)
  get(API_02, stream)

  stream
    .pipe(
      Writable({
        write(chunk, enc, cb) {
          console.log(chunk.toString())
          cb()
        }
      })
    )
}, 400);