function fibb(n) {
    if (n < 0) return 0
    if (n === 0) return 0
    if (n === 1) return 1

    let a = 0
    let b = 1
    let result

    for (let i = 2; i <= n; i++) {
        result = a + b
        a = b
        b = result
    }

    return result
}

console.log(fibb(0))
console.log(fibb(1))
console.log(fibb(10))
