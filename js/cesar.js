function cesar(str, shift, action) {
    const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
    const alphabetLength = alphabet.length

    return str.split("").map((char) => {
        if (alphabet.includes(char)) {
            const index = alphabet.indexOf(char)
            if (action === "encode") {
                const encodedIndex = (index + shift) % alphabetLength
                return alphabet[encodedIndex]
            } else if (action === "decode") {
                const decodedIndex = (index - shift + alphabetLength) % alphabetLength
                return alphabet[decodedIndex]
            }
        }
        return char
    }).join("")
}

const messageToEncode = "эзтыхз фзъзъз"
for (let i = 0; i < 31; i++) {
    const encodedMessage = cesar(messageToEncode, i, "decode")
    console.log(encodedMessage)
}
// хакуна матата
