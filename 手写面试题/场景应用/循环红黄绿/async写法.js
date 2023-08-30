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

async function loopLight() {
  await light("red", 1000);
  await light("yellow", 1000);
  await light("green", 1000);
  loopLight();
}

loopLight();
