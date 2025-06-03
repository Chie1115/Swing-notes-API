# Swing notes API

## Instruktioner

Du ska i denna individuella inlämningsuppgift göra ett API för att spara anteckningar.

### Endpoints

Alla endpoints förutom skapa konto kräver att man är inloggad.

|  Endpoint |  Metod |  Beskrivning |
|---|---|---|
| `/api/notes` | `GET` | Hämta anteckningar |
| `/api/notes` | `POST` | Spara en anteckning |
| `/api/notes` | `PUT` | Ändra en anteckning |
| `/api/notes` | `DELETE` | Ta bort en anteckning |
| `/api/user/signup` | `POST` | Skapa konto |
| `/api/user/login` | `POST` | Logga in |
| `/api/notes/search` | `GET` | Söka bland anteckningar (VG-krav). Sökning sker på titel. |

**Note - objekt**

Du får lägga till egenskaper men inte ta bort något.

| Nyckel | Värde | Beskrivning |
|---|---|---|
| `id` | `String` | Ett genererat ID för denna anteckning. |
| `title` | `String` |  Titeln på anteckningen. Max 50 tecken. |
| `text` | `String` | Själva anteckningstexten, max 300 tecken. |
| `createdAt` | `Date` | När anteckningen skapades. |
| `modifiedAt` | `Date` | När anteckningen sist modifierades. |

### Felhantering

Alla API-resurser ska returnera JSON eller en HTTP statuskod:

**200 (OK)** - Om servern lyckats med att göra det som resursen motsvarar.

**400 (Bad request)** - Om requestet är felaktigt gjort, så att servern inte kan fortsätta. Exempel: Att frontend skickar med 
felaktig data i body till servern.

**404 (Not found)** - Om resursen eller objektet som efterfrågas inte finns.

**500 (internal server error)** - Om ett fel inträffar på servern. Använd catch för att fånga det.

## Betygskriterier

**För Godkänt:**
* Alla endpoints finns med.
* Allt sparas i en PostgreSQL-databas.
* Det finns API-dokumentation i Swagger.
* JSON Web token används för att skapa en inloggad session.
* Lösenord är hashade med `bcryptjs`.

**För Väl Godkänt:**
* VG-kravet för att söka bland anteckningar är uppfyllt.

## Inlämning

Inlämning sker på Canvas med en länk till ditt Github repo med din kod senast **20/6 23:59**.

## Redovisning

Det sker vecka 25, tisdag, onsdag och torsdag, max 20 min per student.



# 📝 Swing Notes API

A simple and secure RESTful API for user-authenticated note management. Built with Node.js, Express, and PostgreSQL.

## 🚀 Features

- User signup & login with JWT authentication
- CRUD operations for personal notes
- Full-text search by note title
- PostgreSQL as the database
- Secure password hashing using bcrypt
- Protected routes with middleware
- Modular code structure


## 📁 Project Structure
```
Swing-notes-API/
│
├── controllers/ # Business logic for users and notes
│ ├── userController.js
│ └── noteController.js
│
├── models/ # Database access layer
│ ├── userModel.js
│ └── noteModel.js
│
├── routes/ # Route definitions
│ ├── userRoutes.js
│ └── noteRoutes.js
│
├── middlewares/ # Auth middleware
│ └── authMiddleware.js
│
├── .env # Environment variables
├── index.js # Entry point
├── package.json
└── README.md
```

## 🔐 Authentication

All note-related routes are protected and require a valid JWT token.

Send token via the `Authorization` header:

Authorization: Bearer <token>



## 📦 Installation

1. Clone the repository  
   `git clone https://github.com/Chie1115/Swing-notes-API.git`

2. Navigate into the project folder  
   `cd Swing-notes-API`

3. Install dependencies  
   `npm install`

4. Create a `.env` file and set the following:

env
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/swing_notes_db
JWT_SECRET=your_jwt_secret
PORT=3000
Set up the PostgreSQL database manually or via SQL script.

5. Start the server
   `npm run dev`

## 🧪 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/signup	Create a new user
POST	/api/login	Authenticate a user

Note Routes (protected)
Method	Endpoint	Description
GET	/api/notes	Get all notes for user
POST	/api/notes	Create a new note
PUT	/api/notes	Update an existing note
DELETE	/api/notes	Delete a note by ID
GET	/api/search	Search notes by title

## 💻 Tech Stack
Node.js

Express

PostgreSQL

bcryptjs

jsonwebtoken

dotenv