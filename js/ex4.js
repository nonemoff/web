function pluralizeRecords(n) {
    let recordsWord

    if (n % 10 === 1 && n % 100 !== 11) {
        recordsWord = "запись"
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        recordsWord = "записи"
    } else {
        recordsWord = "записей"
    }

    return `В результате выполнения запроса было найдено ${n} ${recordsWord}`
}

console.log(pluralizeRecords(1))
console.log(pluralizeRecords(2))
console.log(pluralizeRecords(5))
