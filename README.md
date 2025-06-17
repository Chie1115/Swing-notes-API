
# 📝 Swing Notes API

A RESTful API for saving and managing notes, created as an individual assignment for the Backendutveckling course at Chas Academy.

## 📦 Features

- User sign-up and login with hashed passwords
- Authentication via JSON Web Tokens (JWT)
- CRUD operations for notes
- Search notes by title (VG requirement)
- PostgreSQL database support
- Swagger API documentation

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Chie1115/Swing-notes-API.git
cd Swing-notes-API
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file in the root

```env
PORT=3000
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/swingnotes
JWT_SECRET=your_secret_key
```

### 4. Run the server

```bash
npm run dev
```

> Make sure PostgreSQL is running and the database `swingnotes` is created.

---

## 🔐 Authentication

All endpoints except `/api/user/signup` and `/api/user/login` require a valid JWT token.

Include it in your request headers:

```
Authorization: Bearer <your_token>
```

---

## 📁 Endpoints

### 👤 User

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | `/api/user/signup` | Create user account |
| POST   | `/api/user/login`  | Login and get token |

### 📝 Notes (requires login)

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| GET    | `/api/notes`        | Get all notes              |
| POST   | `/api/notes`        | Create a new note          |
| PUT    | `/api/notes`        | Update a note              |
| DELETE | `/api/notes`        | Delete a note              |
| GET    | `/api/notes/search` | Search notes by title (VG) |

---

## 🧾 Note Object Schema

```json
{
  "id": "string",
  "title": "string (max 50 chars)",
  "text": "string (max 300 chars)",
  "created_at": "date",
  "modified_at": "date"
}
```

---

## 📄 Swagger

API documentation is available at:

```
http://localhost:3000/api-docs
```

---

## 🛠️ Tech Stack

* Node.js + Express
* PostgreSQL
* pg (node-postgres)
* bcryptjs
* JSON Web Token (JWT)
* Swagger

---

## 👩‍💻 Author

Chie – Student at Chas Academy
🔗 GitHub: [@Chie1115](https://github.com/Chie1115)

```
