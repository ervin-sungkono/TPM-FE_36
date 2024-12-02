// // Synchronous

// function print(dialog){
//     return console.log(dialog)
// }

// setTimeout(() => print("Hello World"), 0)
// setTimeout(() => print("Test1"), 0)
// print("Test2")

// // Asynchronous
// // Promise, async dan await

// function promiseFn(output){
//     return new Promise((resolve, reject) => {
//         if(!output) return reject("Output must not be empty")
//         return resolve(output)
//     })
// }

// promiseFn("Promise Example!").then((output) => console.log(output))

// async function main(){
//     const promise1 = await promiseFn("Async Promise1")
//     const promise2 = await promiseFn("Async Promise2")
//     const promise3 = await promiseFn("Async Promise3")

//     console.log(promise1)
//     console.log(promise2)
//     console.log(promise3)

//     try{
//         console.log(await promiseFn("Promise Try Catch"))
//     }catch(error){
//         console.log("Error:", error)
//     }finally{
//         console.log("Finally Executed")
//     }
// }

// main()

const flagContent = document.getElementById('flag-content')
const flagCount = document.getElementById('flag-count')

function generateCardHTML(flagData){
    const { flags, name } = flagData
    const image = document.createElement('img')
    image.src = flags.png
    image.alt = flags.alt

    const flagName = document.createElement('div')
    flagName.className = 'flag-name'
    flagName.innerText = name.common
    
    const flagCard = document.createElement('div')
    flagCard.className = 'flag-card'

    flagCard.append(image)
    flagCard.append(flagName)

    return flagCard
}

fetch("https://restcountries.com/v3.1/all?fields=name,flags", {
    method: 'GET',
    headers: {
        'content-type': 'application/json'
    }
})
.then(res => {
    if(res.ok) return res.json()
    
    if(res.status === 401) throw new Error("Unauthorized")
    else throw new Error("Something went wrong")
})
.then(data => {
    const flagHTML = data.slice(0, 10).map(flagData => generateCardHTML(flagData))

    flagCount.innerText += " " + data.length 
    flagContent.innerHTML = flagHTML.reduce((html, flagHTML) => html += flagHTML.outerHTML, "")
})
.catch(err => console.log(err))