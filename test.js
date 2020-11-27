

// const promise = getOne()
// console.log(promise) // Promise


// const test = async _ => {
//     const one = await getOne()
//     console.log(2) // 1

// }

// test()

// async function tst(){
//     var res = await getOne()
//     console.log(res)
// }

// tst()

async function f() {

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 1000)
    });

    let result = await promise
    // console.log(1)
    // console.log(result)
}

f()