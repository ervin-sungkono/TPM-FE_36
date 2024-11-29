// Array Method
// for loop
// while

// Array.forEach()
const arr = [1,2,3,4,5,6,7,8,9,10]
arr.forEach((a) => {
    console.log(a)
})

// Array.map()
const arrMap = arr.map(a => {
    return a * 2
})

console.log(arr)
console.log("map:", arrMap)

// Array.filter()
// const arrFilter = arr.filter(a => {
//     return a > 3
// })
const arrFilter = arr.filter(a => (a <= 3 && a % 2 == 0))

console.log("filter:", arrFilter)

// Array.reduce()
let sum = 0
for(let i = 0; i < arr.length; i++){
    sum += arr[i]
}

console.log(sum)

const reduceSum = arr.reduce((currentSum, num) => {
    return currentSum += num
}, 0)

console.log(reduceSum)

// Array.find()
const data = [
    {id: 1, name: 'Josh'},
    {id: 2, name: 'John'}
]

const findResult = data.find(d => { return d.id === 3}) ?? {}

console.log(findResult)

// Spread dan Rest (...)
// Spread itu untuk array dan object
const copyArr = [...arr]
copyArr.push(11)
const arr2 = [15,16,17,18]

const mergeArr = [...copyArr, ...arr2]

console.log(arr, copyArr)
console.log(mergeArr)

// const deepCopyArr = arr
// deepCopyArr.push(11)
// console.log(arr, deepCopyArr)
const obj = {
    a: 10,
    b: 15
}
const copyObj = {...obj, c: 20}

console.log(copyObj)

// Rest Param function
// (...param)
function sumFn(...nums){
    // nums = [7, 8]
    if(nums.length === 0) return 0

    return nums.reduce((sum, num) => sum += num, 0)
}

console.log("sum result:", sumFn(7, 8), sumFn(1,2,3,10,11,12))

function printObj({ name, age, ...rest }){
    console.log({
        name,
        age,
        ...rest
    })
}

printObj({
    name: 'Ervin',
    age: '22',
    id: 1, // rest
    occupation: 'student' // rest
})

// Destructuring
// Array
const [firstNumber, secondNumber] = arr
console.log(firstNumber, secondNumber)

const objExample = {
    a: null,
    b: 10
}
const { a: firstAttr, b } = objExample
console.log(firstAttr)

console.log(objExample.a?.c) // Optional Chaining

const nestedObj = {
    a: {
        b: {
            c: 10
        },
        d: 5
    }
}

console.log(nestedObj?.a?.c?.d)