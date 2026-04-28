# 🔐 Secure Login System with Attack Simulation

## 📌 Overview

This project focuses on building a secure login system using Node.js and MySQL. It demonstrates how a basic authentication system can be vulnerable to attacks and how different security techniques can be applied to protect it.

The project starts with a simple login system, then simulates a credential stuffing attack, and finally improves security using multiple protection methods.

---

## ⚙️ Technologies Used

* Node.js (Backend)
* Express.js
* MySQL (XAMPP)
* bcrypt (Password hashing)
* express-rate-limit (Rate limiting)
* Speakeasy (OTP generation)
* QRCode (QR code generation)

---

## 🔐 Features Implemented

### 1. Password Hashing

User passwords are securely stored using bcrypt. Instead of saving plain text passwords, hashed values are stored in the database.

---

### 2. Credential Stuffing Attack

A custom script (`attack.js`) was created to simulate a brute-force attack. It tries multiple passwords for a given username and shows how easily a weak system can be exploited.

---

### 3. Rate Limiting

To prevent repeated login attempts, rate limiting is implemented. Only a limited number of login requests are allowed within a specific time.

---

### 4. Account Locking

If a user enters the wrong password multiple times, the account gets temporarily locked. This prevents attackers from continuously trying passwords.

---

### 5. Two-Factor Authentication (2FA)

An additional layer of security is added using OTP:

* A QR code is generated for the user
* The user scans it using Google Authenticator
* A time-based OTP is required during login

---

## 🚀 How to Run the Project

1. Clone the repository:

```
git clone <your-repo-link>
```

2. Install dependencies:

```
npm install
```

3. Start XAMPP and enable MySQL

4. Create database:

```
authDB
```

5. Run the server:

```
node server.js
```

6. Open in browser:

```
http://localhost:3000
```

---

## 🧪 Attack Simulation

Run the attack script:

```
node attack.js
```

This will try multiple passwords and demonstrate how attacks work before protection is applied.

---

## 📊 Results

* Before protection → Login could be cracked using multiple attempts
* After protection → Requests are blocked (HTTP 429)
* With 2FA → Login requires OTP, making it more secure

---

## 🎯 Conclusion

This project shows the importance of securing authentication systems. By combining techniques like hashing, rate limiting, account locking, and 2FA, the system becomes much more resistant to common attacks.

