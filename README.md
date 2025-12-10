# Medical Document Portal

A full-stack web application for managing medical documents (PDFs). Patients can upload, view, download, and delete their medical documents through a clean and intuitive interface.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-green.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Testing the API](#testing-the-api)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Functionality
- ✅ **Upload PDF Documents** - Secure file upload with validation
- ✅ **View All Documents** - List view with file details and timestamps
- ✅ **Download Documents** - One-click download functionality
- ✅ **Delete Documents** - Remove unwanted documents with confirmation
- ✅ **Responsive Design** - Mobile-friendly UI with Tailwind CSS
- ✅ **Real-time Notifications** - Success/error toast messages
- ✅ **File Validation** - Client and server-side validation (PDF only, 10MB max)

### Technical Features
- 🔒 Type-safe code with TypeScript
- 🗄️ MySQL database with Sequelize ORM
- 🔄 RESTful API architecture
- 📦 Clean folder structure and best practices
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast development with Vite and Nodemon

## 🛠️ Tech Stack

### Frontend
- **React** 18.2 - UI library
- **TypeScript** 5.2 - Type safety
- **Tailwind CSS** 3.3 - Styling
- **Vite** 5.0 - Build tool
- **Axios** 1.6 - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** 4.18 - Web framework
- **TypeScript** 5.3 - Type safety
- **Sequelize** 6.35 - ORM
- **Multer** 1.4 - File upload middleware
- **MySQL2** - Database driver

### Database
- **MySQL** 5.7+ or 8.0+ - Relational database

## 📁 Project Structure

```
Basic full stack/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.config.ts      # Sequelize connection
│   │   │   └── database.js             # Sequelize CLI config
│   │   ├── controllers/
│   │   │   └── document.controller.ts  # Business logic
│   │   ├── middleware/
│   │   │   ├── upload.middleware.ts    # Multer configuration
│   │   │   └── error.middleware.ts     # Error handling
│   │   ├── migrations/
│   │   │   └── 20240101000000-create-documents-table.js
│   │   ├── models/
│   │   │   └── Document.ts             # Sequelize model
│   │   ├── routes/
│   │   │   └── document.routes.ts      # API routes
│   │   ├── seeders/
│   │   │   └── 20240101000001-sample-documents.js
│   │   └── server.ts                   # Entry point
│   ├── uploads/                        # File storage
│   ├── .env                            # Environment variables
│   ├── .sequelizerc                    # Sequelize config
│   ├── package.json
│   ├── tsconfig.json
│   └── nodemon.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx              # App header
│   │   │   ├── UploadForm.tsx          # File upload form
│   │   │   ├── DocumentList.tsx        # Documents display
│   │   │   └── Toast.tsx               # Notifications
│   │   ├── services/
│   │   │   └── documentService.ts      # API calls
│   │   ├── types/
│   │   │   └── index.ts                # TypeScript types
│   │   ├── App.tsx                     # Main component
│   │   ├── main.tsx                    # Entry point
│   │   └── index.css                   # Global styles
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── design.md                           # Design document
├── document.md                         # Assignment requirements
└── README.md                           # This file
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **MySQL** (v5.7 or v8.0+)
- **Git** (for version control)

### Check Your Versions

```bash
node --version    # Should be >= 16.0.0
npm --version     # Should be >= 8.0.0
mysql --version   # Should be 5.7 or 8.0+
```

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd "Basic full stack"
```

### Step 2: Setup MySQL Database

1. **Start MySQL Server**

```bash
# On Windows
net start mysql

# On macOS (with Homebrew)
brew services start mysql

# On Linux
sudo systemctl start mysql
```

2. **Create Database**

```bash
mysql -u root -p
```

```sql
CREATE DATABASE medical_documents_db;
EXIT;
```

### Step 3: Backend Setup

1. **Navigate to Backend directory**

```bash
cd Backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure Environment Variables**

Create a `.env` file in the `Backend` directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=medical_documents_db
DB_USER=root
DB_PASSWORD=your_mysql_password

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_DIR=uploads
```

4. **Run Database Migrations**

```bash
npm run migrate
```

5. **Seed Sample Data (Optional)**

```bash
npm run seed
```

### Step 4: Frontend Setup

1. **Open a new terminal and navigate to Frontend directory**

```bash
cd Frontend
```

2. **Install dependencies**

```bash
npm install
```

## 🏃 Running the Application

### Start Backend Server

```bash
cd Backend
npm run dev
```

The backend server will start at `http://localhost:5000`

You should see:
```
✓ Database connection established successfully
✓ Server is running on http://localhost:5000
✓ Environment: development
```

### Start Frontend Development Server

In a new terminal:

```bash
cd Frontend
npm run dev
```

The frontend will start at `http://localhost:3000`

You should see:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### Access the Application

Open your browser and navigate to: **http://localhost:3000**

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Upload Document

```http
POST /api/documents/upload
Content-Type: multipart/form-data
```

**Request Body:**
```
FormData {
  file: [PDF File]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "id": 1,
    "filename": "prescription.pdf",
    "filesize": 245678,
    "createdAt": "2024-12-09T10:30:00.000Z"
  }
}
```

#### 2. Get All Documents

```http
GET /api/documents
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "filename": "prescription.pdf",
      "filesize": 245678,
      "createdAt": "2024-12-09T10:30:00.000Z"
    }
  ]
}
```

#### 3. Download Document

```http
GET /api/documents/:id
```

**Response (200 OK):**
- Binary PDF file download

#### 4. Delete Document

```http
DELETE /api/documents/:id
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Document deleted successfully"
}
```

#### 5. Health Check

```http
GET /api/health
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-12-09T10:30:00.000Z"
}
```

## 🧪 Testing the API

### Using cURL

#### Upload a Document
```bash
curl -X POST http://localhost:5000/api/documents/upload \
  -F "file=@/path/to/your/document.pdf"
```

#### Get All Documents
```bash
curl http://localhost:5000/api/documents
```

#### Download a Document
```bash
curl -O -J http://localhost:5000/api/documents/1
```

#### Delete a Document
```bash
curl -X DELETE http://localhost:5000/api/documents/1
```

### Using Postman

1. **Upload Document:**
   - Method: `POST`
   - URL: `http://localhost:5000/api/documents/upload`
   - Body: `form-data`
   - Key: `file` (type: File)
   - Value: Select a PDF file

2. **Get All Documents:**
   - Method: `GET`
   - URL: `http://localhost:5000/api/documents`

3. **Download Document:**
   - Method: `GET`
   - URL: `http://localhost:5000/api/documents/1`
   - Click "Send and Download"

4. **Delete Document:**
   - Method: `DELETE`
   - URL: `http://localhost:5000/api/documents/1`

## 🔧 Environment Variables

### Backend (.env)

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | 5000 | No |
| `NODE_ENV` | Environment | development | No |
| `DB_HOST` | MySQL host | localhost | Yes |
| `DB_PORT` | MySQL port | 3306 | No |
| `DB_NAME` | Database name | medical_documents_db | Yes |
| `DB_USER` | Database user | root | Yes |
| `DB_PASSWORD` | Database password | - | Yes |
| `MAX_FILE_SIZE` | Max upload size (bytes) | 10485760 (10MB) | No |
| `UPLOAD_DIR` | Upload directory | uploads | No |

## 💾 Database Setup

### Database Schema

**Table: `documents`**

| Column | Type | Attributes |
|--------|------|------------|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT |
| filename | VARCHAR(255) | NOT NULL |
| filepath | VARCHAR(500) | NOT NULL |
| filesize | INTEGER | NOT NULL |
| created_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP |
| updated_at | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE |

### Migration Commands

```bash
# Run migrations
npm run migrate

# Rollback last migration
npm run migrate:undo

# Seed database
npm run seed

# Undo seeding
npm run seed:undo
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Database Connection Error

**Error:** `Unable to connect to the database`

**Solution:**
- Verify MySQL is running
- Check credentials in `.env` file
- Ensure database exists: `CREATE DATABASE medical_documents_db;`

#### 2. Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process or change PORT in .env
```

#### 3. Multer Upload Error

**Error:** `ENOENT: no such file or directory`

**Solution:**
- Ensure `uploads/` directory exists
- Check write permissions: `chmod 755 uploads/`

#### 4. CORS Issues

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
- Verify backend is running on port 5000
- Check CORS configuration in `server.ts`

#### 5. MySQL Authentication Error

**Error:** `ER_NOT_SUPPORTED_AUTH_MODE`

**Solution:**
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

### Reset Project

If you need to start fresh:

```bash
# Backend
cd Backend
rm -rf node_modules uploads/* dist
npm install
npm run migrate
npm run seed

# Frontend
cd Frontend
rm -rf node_modules dist
npm install
```

## 📝 Development Scripts

### Backend

```bash
npm run dev         # Start development server with hot reload
npm run build       # Compile TypeScript to JavaScript
npm start           # Start production server
npm run migrate     # Run database migrations
npm run migrate:undo # Rollback migrations
npm run seed        # Seed sample data
npm run seed:undo   # Remove seeded data
```

### Frontend

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

## 🏗️ Building for Production

### Backend

```bash
cd Backend
npm run build
npm start
```

### Frontend

```bash
cd Frontend
npm run build
```

The production build will be in the `dist/` directory. Serve it with any static file server.

## 🔒 Security Notes

This is a **demo application** and includes several simplifications:

- ⚠️ No user authentication
- ⚠️ No authorization checks
- ⚠️ CORS open to all origins
- ⚠️ No file encryption
- ⚠️ No virus scanning
- ⚠️ No rate limiting

**For production use:**
- Implement JWT authentication
- Add role-based access control
- Restrict CORS to specific domains
- Encrypt files at rest
- Add antivirus scanning
- Implement rate limiting
- Use HTTPS
- Add input sanitization
- Implement audit logging

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review the [API Documentation](#api-documentation)
3. Check existing issues on GitHub
4. Create a new issue with detailed information

## 🎯 Future Enhancements

- [ ] User authentication and authorization
- [ ] Document categories and tags
- [ ] Search and filter functionality
- [ ] PDF preview in browser
- [ ] Document sharing capabilities
- [ ] Email notifications
- [ ] Audit logs
- [ ] Batch upload
- [ ] Export functionality
- [ ] Mobile application

---

**Built with ❤️ for healthcare document management**

