// var, let, const
var a = 10
console.log(a)
// a = "10"
// console.log(a)

// var
var b = 10
console.log(b)
var b = 5
console.log(b)

function varScope(){
    console.log("var scope")
    var b = 5
    if(true){
        var b = 2
        console.log(b)
    }

    console.log(b)
}

varScope()

// let -> untuk variable yang sifatnya berubah
let c = 10
function add(a){
    let c = 5
    return a + c
}

function letScope(){
    console.log("let scope")
    let b = 5
    if(true){
        let b = 2
        console.log(b)
    }

    console.log(b)
}
letScope()

console.log(add(10))

// const -> untuk variable yang sifatnya tetap
const d = 20

// tipe data primitif
// boolean
let isTrue = true // true atau false
let test // undefined

console.log(isTrue)
console.log(test)

// tipe non primitif
const array = new Array()
let array1 = [1,2,3,"Hello World"]

array.push(1,2,3, "Array Example")
console.log(array, array1)

let myObject = {
    a: 5,
    b: 10
}

let myObject2 = {}
myObject2.a = 8
myObject2.b = 12

console.log(myObject)
console.log(myObject2)

// Arithemtic + - * / %
let sum = a + b
console.log(sum)

let sum3 = a - b
console.log(sum3)

let multiply = a * b
console.log(multiply)

let divide = a / b
console.log(divide)

// ++ --
let count = 0
count++ // 1
console.log(count)
count-- // 0
console.log(count)

// Assignment (=, +=, -=, *=, /=)
let e = 5
e += 10
console.log(e) // 15

e -= 20
console.log(e) // -5

let f = 2
f *= 5
console.log(f) // 10

f /= 2
console.log(f) // 5

// ** Pangkat
console.log(f ** 2) // 25
f **= 2
console.log(f) // 25

// >, <, >=, <=
let i = 10
let j = 5
console.log(i > j) // true
console.log(i < j) // false
// == (Loose Equal)
var a = "10"
var compare = 10
console.log(a == compare)
console.log(null == undefined)
console.log("true" == true)
// === (Strict Equal)
console.log(a === compare)
console.log(null === undefined)
console.log("true" === true)

// If Else, Ternary
// if(i > j){
//     console.log("i > j")
// }else if(i < j){
//     console.log("i < j")
// }else{
//     console.log("i == j")
// }

// Ternary
// (expression) ? statement 1 : statement 2
i > j ? console.log("i > j") : i < j ? console.log("i < j") : console.log("i == j")

// Switch Case
let menu = 1
switch(menu){
    case 0:
        console.log("Main Menu")
        break;
    case 1:
        console.log("Logout")
        break;
    default:
        console.log("Not Found")
}

// Looping
// For Loop
for(let i = 0; i < 10; i++){
    console.log("count:", i)
}

// For In, For Of
const obj = {
    a: 5,
    b: 6,
    c: 10
}
for(key in obj){
    console.log(key, obj[key])
}

const arr = [1, 2, 3 ,4 ,5]
for(a of arr){
    console.log(a)
}
// Sama aja dengan:
// for(i = 0; i < arr.length; i++){
//     console.log(arr[i])
// }

let n = 10
while(n > 0){
    console.log(n)
    n--
}

do{
    console.log(n)
    n--
}while(n > 0)

// Function
// Cara 1
function example(){
    console.log("contoh function")
}
example()
// Cara 2 (expression)
const example2 = function(){
    console.log("contoh expression function")
}
example2()

const arrowFn = () => {
    console.log("contoh arrow function")
}
arrowFn()

function substract(a, b = 0){
    return a - b
}

const result = substract(10, 5)
console.log(result)

function increment(counter){
    let initialCount = counter
    return function(){
        initialCount++
        console.log(initialCount)
    }
}

const incrementFn = increment(10)
incrementFn()
incrementFn()
incrementFn()