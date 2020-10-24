# Evemitter Client for JavaScript
The client to use evemitter with js.

## Embed:
```html
<script src="https://cdn.jsdelivr.net/gh/greencoder001/evemitter-client.js@0.0.0/dist/bundle.js"></script>
```

## Example:
```js
const eve = evemitter.connect()
eve.onCall('msg', function (call) {
  const { msg } = call

  console.log(msg)
})
```
