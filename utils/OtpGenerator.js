function OtpGenerator(digits) {
    const multiplier = Math.pow(10, digits - 1);
    const otp = Math.floor(multiplier + Math.random() * 9 * multiplier);
    return otp.toString();
}

module.exports = OtpGenerator;
