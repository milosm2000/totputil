# TOTPUtil

TOTPUtil is a Node.js utility class for generating and verifying Time-based One-Time Passwords (TOTP) for two-factor authentication (2FA).

## Features

- Generate secret keys for TOTP
- Generate HOTP (HMAC-based One-Time Password)
- Generate TOTP (Time-based One-Time Password)
- Verify TOTP codes

## Installation

```bash
npm install totputil
```

## Usage

```javascript
import TOTPUtil from 'totputil';

// Create a new TOTPUtil instance
const totpUtil = new TOTPUtil();

// Generate a secret key
const secret = totpUtil.generateSecret();
console.log('Secret:', secret);

// Generate a TOTP
const totp = totpUtil.generateTOTP(secret);
console.log('TOTP:', totp);

// Verify a TOTP
const isValid = totpUtil.verifyTOTP('123456', secret);
console.log('Is valid:', isValid);
```

## API

### `constructor(secretLength = 20, timeStep = 30, codeDigits = 6)`

Creates a new TOTPUtil instance.

- `secretLength`: Length of the generated secret (default: 20)
- `timeStep`: Time step in seconds (default: 30)
- `codeDigits`: Number of digits in the generated TOTP (default: 6)

### `generateSecret()`

Generates a new secret key.

### `generateHOTP(secret, counter)`

Generates an HMAC-based One-Time Password.

- `secret`: The secret key
- `counter`: The counter value

### `generateTOTP(secret, window = 0)`

Generates a Time-based One-Time Password.

- `secret`: The secret key
- `window`: Time window offset (default: 0)

### `verifyTOTP(otp, secret, window = 1)`

Verifies a given TOTP against the secret.

- `otp`: The TOTP to verify
- `secret`: The secret key
- `window`: Time window for verification (default: 1)

## License

This project is licensed under the ISC License.
