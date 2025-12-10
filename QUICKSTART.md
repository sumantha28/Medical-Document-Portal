# 🚀 Quick Start Guide

Get the Medical Document Portal running in 5 minutes!

## Prerequisites
- Node.js (v16+)
- MySQL (v5.7 or v8.0+)
- npm

## Step-by-Step Setup

### 1️⃣ Database Setup (2 minutes)

```bash
# Start MySQL
mysql -u root -p

# Create database
CREATE DATABASE medical_documents_db;
EXIT;
```

### 2️⃣ Backend Setup (2 minutes)

```bash
# Navigate to Backend
cd Backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOL
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=medical_documents_db
DB_USER=root
DB_PASSWORD=your_password_here
MAX_FILE_SIZE=10485760
UPLOAD_DIR=uploads
EOL

# Update the DB_PASSWORD in .env with your actual MySQL password

# Run migrations
npm run migrate

# (Optional) Seed sample data
npm run seed

# Start backend server
npm run dev
```

**Expected Output:**
```
✓ Database connection established successfully
✓ Server is running on http://localhost:5000
```

### 3️⃣ Frontend Setup (1 minute)

**Open a NEW terminal window:**

```bash
# Navigate to Frontend
cd Frontend

# Install dependencies
npm install

# Start frontend server
npm run dev
```

**Expected Output:**
```
VITE v5.0.8  ready in 500 ms
➜  Local:   http://localhost:3000/
```

### 4️⃣ Open Your Browser

Navigate to: **http://localhost:3000**

You should see the Medical Document Portal! 🎉

## Quick Test

1. Click **"Choose File"** and select a PDF
2. Click **"Upload Document"**
3. See your document appear in the list
4. Try downloading and deleting documents

## Troubleshooting

### Backend won't start?
- Check MySQL is running: `mysql -u root -p`
- Verify database exists: `SHOW DATABASES;`
- Check credentials in `Backend/.env`

### Frontend won't start?
- Make sure you're in the `Frontend` directory
- Delete `node_modules` and run `npm install` again
- Check if port 3000 is available

### Can't connect to backend?
- Ensure backend is running on port 5000
- Check console for CORS errors
- Verify `http://localhost:5000/api/health` returns success

## Useful Commands

```bash
# Backend
cd Backend
npm run dev          # Start server
npm run migrate      # Run migrations
npm run seed         # Add sample data
npm run migrate:undo # Rollback migration
npm run seed:undo    # Remove sample data

# Frontend
cd Frontend
npm run dev          # Start dev server
npm run build        # Build for production
```

## API Testing

```bash
# Health check
curl http://localhost:5000/api/health

# Get all documents
curl http://localhost:5000/api/documents

# Upload a document
curl -X POST http://localhost:5000/api/documents/upload \
  -F "file=@/path/to/document.pdf"

# Delete a document (replace 1 with actual ID)
curl -X DELETE http://localhost:5000/api/documents/1
```

## Default Port Configuration

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **MySQL:** localhost:3306

---

**Need more help?** Check the full [README.md](./README.md) or [design.md](./design.md)

