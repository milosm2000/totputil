import crypto from "crypto";
import * as base32 from "hi-base32";

export class TOTPUtil {
  constructor(secretLength = 20, timeStep = 30, codeDigits = 6) {
    this.secretLength = secretLength;
    this.timeStep = timeStep;
    this.codeDigits = codeDigits;
  }

  generateSecret() {
    const randomBuffer = crypto.randomBytes(this.secretLength);
    return base32.encode(randomBuffer).replace(/=/g, "");
  }

  generateHOTP(secret, counter) {
    const decodedSecret = base32.decode.asBytes(secret);
    const buffer = Buffer.alloc(8);
    for (let i = 0; i < 8; i++) {
      buffer[7 - i] = counter & 0xff;
      counter = counter >> 8;
    }

    const hmac = crypto.createHmac("sha1", Buffer.from(decodedSecret));
    hmac.update(buffer);
    const hmacResult = hmac.digest();

    const code = this._dynamicTruncationFn(hmacResult);

    return code % 10 ** this.codeDigits;
  }

  generateTOTP(secret, window = 0) {
    const counter = Math.floor(Date.now() / (this.timeStep * 1000));
    return this.generateHOTP(secret, counter + window);
  }

  verifyTOTP(otp, secret, window = 1) {
    if (Math.abs(window) > 10) {
      console.error("Window size is too large");
      return false;
    }

    for (let errorWindow = -window; errorWindow <= window; errorWindow++) {
      const totp = this.generateTOTP(secret, errorWindow);
      if (parseInt(otp) === totp) {
        return true;
      }
    }

    return false;
  }

  _dynamicTruncationFn(hmacValue) {
    const offset = hmacValue[hmacValue.length - 1] & 0xf;

    return (
      ((hmacValue[offset] & 0x7f) << 24) |
      ((hmacValue[offset + 1] & 0xff) << 16) |
      ((hmacValue[offset + 2] & 0xff) << 8) |
      (hmacValue[offset + 3] & 0xff)
    );
  }
}

export default TOTPUtil;
