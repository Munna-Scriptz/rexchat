const generateOTP = () => {
    const generate = Math.floor(1000 + Math.random() * 9000)
    return generate
}

module.exports = { generateOTP }