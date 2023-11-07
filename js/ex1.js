function pow(a, b) {
    let total = a
    for (let i = 1; i < b; i++) {
        total = total * a
    }
    return total
}

console.log(pow(2, 10))
