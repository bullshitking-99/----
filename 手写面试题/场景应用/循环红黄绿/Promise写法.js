function log(name) {
  console.log(name);
}
function light(name, delay) {
  return new Promise((r) => {
    setTimeout(() => {
      log(name);
      r();
    }, delay);
  });
}
function loopLight() {
  light("red", 1000)
    .then(light.bind(null, "yellow", 1000))
    .then(light.bind(null, "green", 1000))
    .then(loopLight);
}

loopLight();
