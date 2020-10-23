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
  connect: (host = '127.0.0.1', port = 9912, user = 'evemitter', pwd = '') => {
    return new evemitter.Evemitter(host, port, user, pwd)
  },
  Evemitter: class Evemitter {
    constructor (ip, port, user, pwd) {
      this.connection = null
      this.login = { user, pwd }

      this.port = port
      this.ip = ip
      this.generateHost()
      this.uri = `${this.host}${this.login.user}/${this.login.pwd}/`
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

    onCall (id, callBack) {
      if (typeof callBack !== 'function') throw new TypeError('callBack must be a function') // Is CallBack valid?

      const callsRequest = zGET({ url: this.uri + 'calls' })
    }
  }
}

if (window) {
  window.evemitter = evemitter
}
