function getSortedArray(array, key) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            const a = array[j];
            const b = array[j + 1];

            const valueA = a[key];
            const valueB = b[key];

            if (typeof valueA === 'number' && typeof valueB === 'number') {
                if (valueA > valueB) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                }
            } else {
                if (valueA.toString() > valueB.toString()) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                }
            }
        }
    }
    return array;
}

let array = [
    { name: 'Макар', age: 20 },
    { name: 'Роберт', age: 32 },
    { name: 'Екатерина', age: 50 },
    { name: 'Оксана', age: 24 },
    { name: 'Святослав', age: 43 }
];

array = getSortedArray(array, 'age');
console.log(array);

array = getSortedArray(array, 'name');
console.log(array);
