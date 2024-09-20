function OtpGeneratorService(length) {
    const charactersRegex = /[A-Z0-9]/;
    const halfLength = Math.ceil(length / 2);
    let alphabetCount = 0;
    let numberCount = 0;
    let OTP = '';

    for (let i = 0; i < length; i++) {
        const randomCharCode = Math.floor(Math.random() * 36) + 48;
        const char = String.fromCharCode(randomCharCode);
        
        if (char.match(charactersRegex)) {
            if (char.match(/[A-Z]/) && alphabetCount < halfLength) {
                alphabetCount++;
                OTP += char;
            } else if (char.match(/[0-9]/) && numberCount < halfLength) {
                numberCount++;
                OTP += char;
            } else {
                i--; 
            }
        } else {
            i--; 
        }
    }

    return OTP;
}

module.exports = OtpGeneratorService;