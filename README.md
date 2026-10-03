# 🛡️ Secure User Authentication Backend API

An enterprise-grade backend architecture system built with Node.js, Express.js, and Mongoose that establishes secure database user registration utilizing automated pre-save `bcryptjs` password hashing encryption hooks.

## ⚙️ Core Libraries Utilized
- **Express.js:** Server engine routing architecture.
- **Mongoose:** Object Data Modeling layer connected to a local MongoDB cluster environment.
- **Bcryptjs:** Secured cryptographic password salting and hashing injection algorithm.

## 📡 API Endpoints Established
- **`POST /api/register`** -> Captures incoming user profiles, runs data verification, encrypts password inputs, and writes records into the active database collection safely.