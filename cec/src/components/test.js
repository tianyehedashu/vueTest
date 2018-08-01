async function* consumer() {
  let r
  while (true) {
    n = yield r
    console.log("n is ", n)
    r = new Promise(function (resolve) {
      setTimeout(() => {
        n = n + 2
        resolve(n)
      }, 5000)
    })
    await r
  }
}

let gen = consumer()
gen.next()
gen.next(3).then(function(data) {
  console.log("after handle ,n  is ", data.value)
})
console.log('lllll')
gen.next(8).then(function(data) {
  console.log("after handle ,n  is ", data.value)
})
console.log('iiii')

//mock function
function sleep(timer, data) {
  return new Promise(function (resolve) {
    setTimeout(() => {
      resolve(data)
    }, timer)
  })
}

function* ctc() {
  let res
  let flag = true
  let count = 0
  console.log("before start")
  yield "start"
  console.log("start")
  while (true) {
    if (flag === true) {
      flag = false
      count++
      res = sleep(3000, count)
      res.then(function() {
        flag = true
        console.log("chang flag")
      })
      res.catch(function() {
        flag = true
      })
      console.log("init")
      yield res
    } else {
      console.log("aready had one request")
      yield res
    }
  }
}
let gen2 = ctc()
gen2.next()
function ctclmp() {
  return gen2.next().value
}

// test
// only trigger one request
console.log("test1")
ctclmp().then(function(data) { console.log("after data is ", data) })
ctclmp().then(function(data) { console.log("after data is ", data) })
ctclmp().then(function(data) { console.log("after data is ", data) })
ctclmp().then(function(data) { console.log("after data is ", data) })
let temp1 = ctclmp()
let temp2 = ctclmp()
if (temp1 === temp2) {
  console.log("same value")
}

// after request 1 done,trgger a new request
async function test2() {
  await sleep(4000, 3)
  console.log("after 4s")
  // gen2.next()
  ctclmp().then(function(data) { console.log("after data is ", data) })
  ctclmp().then(function(data) { console.log("after data is ", data) })
  let result2 = ctclmp()
  if (result2 != temp1) {
    console.log("yes")
  }
}
test2()
