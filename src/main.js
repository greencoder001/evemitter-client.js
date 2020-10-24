/* global Operation, zGET, waitFor, btoa */

/* Start Load Dependencies */
if (typeof Operation === 'undefined' || typeof waitFor === 'undefined' || typeof zGET === 'undefined') {
  document.write('<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/greencoder001/zGET@latest/dist/bundle.js"></script><script type="text/javascript" src="https://cdn.jsdelivr.net/gh/greencoder001/async.js@latest/dist/bundle.js"></script>')
}

window.addEventListener('DOMContentLoaded', () => {
  if (typeof Operation === 'undefined' || typeof waitFor === 'undefined' || typeof zGET === 'undefined') {
    throw new Error('Dependencies are not avaible! Make sure that you have embedded zGET and async.js!')
  }
})
/* End Load Dependencies */

// Real Script:
const evemitter = {
  connect: (host = '127.0.0.1', port = 9912, user = 'evemitter', pwd = '', interval = 500) => {
    return new evemitter.Evemitter(host, port, user, pwd, interval)
  },
  Evemitter: class Evemitter {
    constructor (ip, port, user, pwd, interval = 500) {
      this.interval = interval
      this.lastProcessedCall = 0
      this.connection = null
      this.login = { user, pwd }

      this.callHandlers = {}

      this.port = port
      this.ip = ip
      this.generateHost()
      this.uri = `${this.host}${this.login.user}/${this.login.pwd}/`

      this.gcS()
    }

    ping () {
      const request = zGET({
        url: this.host
      })
      request.on('success', () => {
        this.connection = true
      })
      request.on('fail', () => {
        this.connection = false
      })
    }

    generateHost () {
      this.host = `https://${this.ip}:${this.port}/`
    }

    // Real functions:

    call (id, value) {
      const encrypted = btoa(value)

      return zGET({ url: `${this.uri}call/${id}/${encrypted}` })
    }

    getCalls (cid, callBack) {
      if (typeof callBack !== 'function') throw new TypeError('callBack must be a function') // Is CallBack valid?
      cid = `${cid}`

      const callsRequest = zGET({ url: this.uri + 'calls' })

      waitFor(callsRequest, (value) => {
        const calls = JSON.parse(value)

        for (const { callID, timeStamp, owner, callMsg } of calls) {
          if (cid === callID || cid === '*') {
            callBack({
              timestamp: timeStamp,
              owner,
              id: callID,
              msg: callMsg
            })
          }
        }
      })
    }

    gcS () {
      const p = this

      function gCalls () {
        for (const [key, values] of Object.entries(p.callHandlers)) {
          for (const callHandler of values) {
            p.getCalls(key, callHandler)
          }
        }
      }

      setInterval(gCalls, this.interval)
    }

    onCall (callID = '*', callBack = console.log) {
      if (typeof callBack !== 'function') throw new TypeError('callBack must be a function') // Is CallBack valid?
      callID = `${callID}`
      this.callHandlers[callID] = typeof this.callHandlers[callID] !== 'object' /* array */ ? [] : this.callHandlers[callID]

      this.callHandlers[callID].push(callBack)
    }
  }
}

if (window) {
  window.evemitter = evemitter
}
