# ⚠️ Important Notes

## Critical Setup Steps

### 1️⃣ Environment Variables (REQUIRED)

**Backend/.env file** - You MUST create this file:

```bash
cd Backend
```

Create `.env` file with:
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=medical_documents_db
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
MAX_FILE_SIZE=10485760
UPLOAD_DIR=uploads
```

⚠️ **IMPORTANT:** Replace `YOUR_MYSQL_PASSWORD_HERE` with your actual MySQL password!

---

### 2️⃣ MySQL Database (REQUIRED)

Before running the application, create the database:

```bash
mysql -u root -p
```

Then run:
```sql
CREATE DATABASE medical_documents_db;
EXIT;
```

---

### 3️⃣ Installation Order

**Follow this exact order:**

1. **Create MySQL Database** (see above)
2. **Setup Backend:**
   ```bash
   cd Backend
   npm install
   # Create .env file (see above)
   npm run migrate
   npm run seed  # Optional: adds sample data
   ```

3. **Setup Frontend:**
   ```bash
   cd Frontend
   npm install
   ```

4. **Start Servers:**
   ```bash
   # Terminal 1 - Backend
   cd Backend
   npm run dev

   # Terminal 2 - Frontend
   cd Frontend
   npm run dev
   ```

---

## 🎯 Quick Start Scripts

### Option 1: Manual (Recommended for first time)
Follow the steps above for better understanding.

### Option 2: Automated Scripts

**Linux/Mac:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

**Windows:**
```bash
start-dev.bat
```

---

## ⚠️ Common Errors & Solutions

### Error: "Cannot connect to database"

**Cause:** MySQL not running or wrong credentials

**Solution:**
1. Start MySQL: `sudo systemctl start mysql` (Linux) or `brew services start mysql` (Mac)
2. Check credentials in `Backend/.env`
3. Verify database exists: `SHOW DATABASES;`

---

### Error: "EADDRINUSE :::5000"

**Cause:** Port 5000 already in use

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Either kill the process or change PORT in .env
```

---

### Error: "Module not found"

**Cause:** Dependencies not installed

**Solution:**
```bash
cd Backend
npm install

cd ../Frontend
npm install
```

---

### Error: "Relation 'documents' does not exist"

**Cause:** Migrations not run

**Solution:**
```bash
cd Backend
npm run migrate
```

---

## 📝 Before You Start Checklist

- [ ] Node.js v16+ installed (`node --version`)
- [ ] npm v8+ installed (`npm --version`)
- [ ] MySQL v5.7+ or v8.0+ installed (`mysql --version`)
- [ ] MySQL server is running
- [ ] Database `medical_documents_db` created
- [ ] Backend `.env` file created and configured
- [ ] Backend dependencies installed (`npm install`)
- [ ] Backend migrations run (`npm run migrate`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Ports 3000 and 5000 are available

**Run the checker:**
```bash
node check-prerequisites.js
```

---

## 🔒 Security Warning

This is a **DEMO APPLICATION** for learning purposes.

**DO NOT use in production without:**
- ✅ User authentication (JWT)
- ✅ Authorization controls
- ✅ HTTPS/TLS encryption
- ✅ Rate limiting
- ✅ Input sanitization
- ✅ File encryption
- ✅ Virus scanning
- ✅ Audit logging
- ✅ CORS restrictions
- ✅ CSRF protection

---

## 📦 File Upload Limits

- **File Type:** PDF only (`.pdf`, `application/pdf`)
- **Max Size:** 10MB (10,485,760 bytes)
- **Storage:** Local `Backend/uploads/` directory

To change limits, edit `Backend/.env`:
```env
MAX_FILE_SIZE=20971520  # 20MB
```

---

## 🌐 Default Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend | 5000 | http://localhost:5000 |
| MySQL | 3306 | localhost:3306 |

---

## 📁 Important Directories

```
Backend/uploads/     ← PDF files stored here (created automatically)
Backend/dist/        ← Compiled TypeScript (created on build)
Frontend/dist/       ← Production build (created on build)
node_modules/        ← Dependencies (git ignored)
```

---

## 🗄️ Database Commands

```bash
# Run migrations
cd Backend
npm run migrate

# Rollback last migration
npm run migrate:undo

# Seed sample data
npm run seed

# Remove seeded data
npm run seed:undo
```

---

## 🛠️ Development Commands

### Backend
```bash
cd Backend
npm run dev          # Start with hot reload
npm run build        # Compile TypeScript
npm start            # Start production server
```

### Frontend
```bash
cd Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 📊 Project Files Overview

| File | Purpose |
|------|---------|
| `README.md` | Complete setup guide |
| `QUICKSTART.md` | 5-minute quick start |
| `design.md` | Technical design document |
| `API_EXAMPLES.md` | API testing examples |
| `PROJECT_SUMMARY.md` | Project overview |
| `IMPORTANT_NOTES.md` | This file - critical info |
| `Medical_Document_Portal.postman_collection.json` | Postman API collection |
| `check-prerequisites.js` | System requirements checker |
| `start-dev.sh` | Linux/Mac server starter |
| `start-dev.bat` | Windows server starter |

---

## 🎓 Learning Path

**For Beginners:**
1. Read `QUICKSTART.md` first
2. Follow step-by-step setup
3. Explore the running application
4. Read `README.md` for details
5. Study `design.md` for architecture

**For Developers:**
1. Read `design.md` for architecture
2. Review `PROJECT_SUMMARY.md`
3. Check code structure
4. Test APIs using `API_EXAMPLES.md`
5. Modify and extend

---

## 🔄 Git Best Practices

### What's Ignored
- `node_modules/`
- `.env` files
- `dist/` folders
- `Backend/uploads/` (except .gitkeep)
- IDE config files

### Before Committing
1. Never commit `.env` files
2. Never commit `node_modules/`
3. Never commit uploaded files
4. Always test before pushing

---

## 💡 Tips & Tricks

### 1. Use Sample Data
```bash
cd Backend
npm run seed
```
This adds 5 sample documents to test with.

### 2. Reset Everything
```bash
# Backend
cd Backend
rm -rf node_modules dist uploads/*
npm install
npm run migrate

# Frontend
cd Frontend
rm -rf node_modules dist
npm install
```

### 3. View Database
```bash
mysql -u root -p medical_documents_db
SELECT * FROM documents;
```

### 4. Test API Health
```bash
curl http://localhost:5000/api/health
```

### 5. Monitor Logs
Both servers output logs to console. Keep terminals visible.

---

## 🆘 Getting Help

1. **Check Prerequisites:** `node check-prerequisites.js`
2. **Read Error Messages:** They usually tell you what's wrong
3. **Check Documentation:**
   - Setup issues → `README.md`
   - API issues → `API_EXAMPLES.md`
   - Design questions → `design.md`
4. **Common Issues:** See "Common Errors" section above
5. **Database Issues:** Verify MySQL is running and database exists

---

## 📱 Testing on Mobile

1. Find your computer's local IP:
   ```bash
   # Mac/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. Access from mobile device on same network:
   ```
   http://YOUR_IP:3000
   ```

---

## ✅ Verification Steps

After setup, verify everything works:

1. **Backend Health Check:**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Should return: `{"success": true, ...}`

2. **Frontend Access:**
   Open `http://localhost:3000` in browser
   Should see: "Medical Document Portal"

3. **Upload Test:**
   - Select a PDF file
   - Click "Upload Document"
   - Should see success message

4. **Database Check:**
   ```bash
   mysql -u root -p -e "USE medical_documents_db; SELECT COUNT(*) FROM documents;"
   ```
   Should show document count

---

## 🎯 Next Steps

After successful setup:

1. ✅ Test all features (upload, list, download, delete)
2. ✅ Read `design.md` for technical details
3. ✅ Review code structure and architecture
4. ✅ Try API examples from `API_EXAMPLES.md`
5. ✅ Import Postman collection for API testing
6. ✅ Understand database schema and migrations
7. ✅ Explore TypeScript types and interfaces

---

## 📞 Support Resources

- **Setup Guide:** `README.md`
- **Quick Start:** `QUICKSTART.md`
- **Design Doc:** `design.md`
- **API Guide:** `API_EXAMPLES.md`
- **Project Info:** `PROJECT_SUMMARY.md`

---

**Remember:** This is a complete, working full-stack application. Take your time to understand each part! 🚀

