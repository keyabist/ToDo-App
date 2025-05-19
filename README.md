
# 📝 ToDo-App

A full-stack To-Do List application built using **React**, **Node.js**, **Express**, and **PostgreSQL**.


## 📦 Tech Stack

**Frontend:**
- React (TypeScript)
- Tailwind CSS

**Backend:**
- Node.js
- Express.js

**Database:**
- PostgreSQL
```
---

## 🚀 Features

- ✅ Add new tasks
- ✏️ Edit existing tasks
- 🗑️ Delete tasks
- ✅ Mark tasks as completed
- 🧹 Clear all tasks




## 📂 Project Structure

```

ToDo-App/
│
├── client/         # React frontend
│   ├── public/
│   └── src/
│       └── App.tsx
│
├── server/         # Node.js + Express backend
│   ├── db.js
│   └── index.js
│
├── .gitignore
└── README.md

````

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/keyabist/ToDo-App.git
cd ToDo-App
````

### 2. Setup PostgreSQL

* Create a PostgreSQL database.
* Create a `todos` table:

```sql
CREATE TABLE todos (
  todo_id SERIAL PRIMARY KEY,
  todo_desc VARCHAR(255),
  todo_completed BOOLEAN DEFAULT false
);
```

### 3. Configure Backend

Update `server/db.js` with your PostgreSQL credentials:

```js
const pool = new Pool({
  user: 'your_pg_username',
  password: 'your_pg_password',
  host: 'localhost',
  port: 5432,
  database: 'your_database_name'
});
```

### 4. Install Dependencies

#### Backend:

```bash
cd server
npm install
```

#### Frontend:

```bash
cd ../client
npm install
```

---

## 🧪 Running the App

### Start Backend

```bash
cd server
npm start
```

### Start Frontend

```bash
cd ../client
npm start
```

* Frontend runs at: [http://localhost:3000](http://localhost:3000)
* Backend runs at: [http://localhost:3001](http://localhost:3001)

---

## 🛠️ Available Scripts

In the `client/` folder:

```bash
npm start       # Run React development server
npm run build   # Build production assets
```

In the `server/` folder:

```bash
npm start       # Start Express server
```

---

## 🌐 API Endpoints

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| GET    | `/todos`     | Fetch all todos |
| POST   | `/todos`     | Add a new todo  |
| PUT    | `/todos/:id` | Update a todo   |
| DELETE | `/todos/:id` | Delete a todo   |
| DELETE | `/delete`    | Clear all todos |

---

## 🙌 Acknowledgments

Built as a hands-on project to learn full-stack development using modern web technologies.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

