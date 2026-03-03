🎵 Cheap Spotify Backend API

A Spotify-like backend built with Node.js, Express, MongoDB, JWT, and Role-Based Authentication.

✨ Features

    🔐 JWT Authentication (HTTP-Only Cookies)
    
    👤 User & Artist Roles
    
    🎵 Music Upload (Artist Only)
    
    💿 Album Creation (Artist Only)
    
    📂 Music & Album Retrieval
    
    🔒 Role-Based Route Protection
    
    🔑 Password Hashing (bcrypt)
    
    📦 File Upload (Multer)

🛠 Tech Stack

    Node.js
    
    Express.js
    
    MongoDB
    
    Mongoose
    
    JWT
    
    bcryptjs
    
    cookie-parser
    
    multer

📁 Project Structure
      
      server.js
      src/
       ├── app.js
       ├── db/
       ├── models/
       ├── controllers/
       ├── routes/
       ├── middlewares/
       ├── services/
🚀 Getting Started
      
      1️⃣ Clone Repository
      git clone https://github.com/your-username/cheap-spotify.git
      cd cheap-spotify
      
      2️⃣ Install Dependencies
      npm install
      
      3️⃣ Create .env File
      PORT=3000
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_super_secret_key
      
      4️⃣ Start Server
      npm start
    
      Server runs at:
      
      http://localhost:3000
🔐 Authentication Flow

    Register
    
    Login
    
    JWT token stored in HTTP-only cookie
    
    Protected routes check cookie
    
    Role validation applied

📌 API Documentation

    Base URL:
    
    http://localhost:3000
    🔑 AUTH ROUTES
    
    Base Path:
    
    /api/auth
    🔹 Register User
    
    POST /api/auth/register
    
    Body (JSON)
    {
      "username": "varun",
      "email": "varun@gmail.com",
      "password": "123456",
      "role": "artist"
    }
    Notes
    
    role optional (default = "user")
    
    Roles:
    
    "user"
    
    "artist"
    
    🔹 Login
    
    POST /api/auth/login
    
    Body (JSON)
    {
      "email": "varun@gmail.com",
      "password": "123456"
    }
    
    OR
    
    {
      "username": "varun",
      "password": "123456"
    }
    Response
    
    Sets JWT cookie
    
    Returns user info
    
    🔹 Logout
    
    POST /api/auth/logout
    
    Clears authentication cookie.

🎵 MUSIC ROUTES

    Base Path:
    
    /api/music
    🎼 Upload Music (Artist Only)
    
    POST /api/music/upload
    
    Auth Required
    
    ✅ Yes
    ✅ Role = artist
    
    Body (form-data)
    Key	Type
    title	text
    music	file
💿 Create Album (Artist Only)

    POST /api/music/album
    
    Auth Required
    
    ✅ Yes
    ✅ Role = artist
    
    Body (JSON)
    {
      "title": "My First Album",
      "musicIds": [
        "MUSIC_ID_1",
        "MUSIC_ID_2"
      ]
    }
🎶 Get All Music

    GET /api/music
    
    Auth Required
    
    ✅ Yes
    
    Optional Query Params (Pagination)
    /api/music?page=1&limit=5
    💽 Get All Albums
    
    GET /api/music/getAlbums
    
    Auth Required
    
    ✅ Yes

💿 Get Album By ID

    GET /api/music/album/:albumId
    
    Example:
    
    /api/music/album/65f1c8a8b7a123456789abcd
    🔒 Role Access Table
    Endpoint	User	Artist
    Register	✅	✅
    Login	✅	✅
    Upload Music	❌	✅
    Create Album	❌	✅
    Get Music	✅	❌
    Get Albums	✅	❌
    🧪 Testing Guide (Postman)
    🥇 Step 1 – Register Artist
    POST /api/auth/register
    {
      "username": "artist1",
      "email": "artist@gmail.com",
      "password": "123456",
      "role": "artist"
    }
    🥈 Step 2 – Login Artist
    POST /api/auth/login
    
    Make sure cookies are enabled.
    
    🥉 Step 3 – Upload Music
    
    Body → form-data:
    
    title → Test Song
    
    music → select mp3
    
    🏅 Step 4 – Create Album
    POST /api/music/album
    🎯 Step 5 – Register Normal User
    {
      "username": "user1",
      "email": "user@gmail.com",
      "password": "123456"
    }
    🎯 Step 6 – Login User
    🎯 Step 7 – Fetch Music
GET /api/music
    ⚠️ Common Errors
    🔥 Duplicate Key Error
    E11000 duplicate key error

Fix:

    db.users.getIndexes()
    db.users.dropIndex("userName_1")
    🔒 401 Unauthorized

Cause:

    No token cookie

    Expired token

    ⛔ 403 Forbidden

Cause:

    Wrong role accessing route
    
    🔐 Security Highlights
    
    Passwords hashed with bcrypt
    
    JWT stored in HTTP-only cookies
    
    Role-based authorization
    
    Secure file upload handling
    
    🚀 Future Improvements
    
    Global error handling middleware
    
    Refresh token system
    
    Input validation (Joi / Zod)
    
    Swagger API documentation
    
    Production security configs

👨‍💻 Author

    Varun Narwariya
    Backend Developer | Cybersecurity Enthusiast
