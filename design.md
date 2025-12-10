# Medical Document Portal - Design Document

## Part 1: Tech Stack Choices

### Q1. Frontend Framework Choice
**Selected: React with TypeScript**

**Reasoning:**
- **React**: Most popular and widely adopted frontend framework with excellent community support
- **Component-based architecture**: Provides reusable UI components for better code maintainability
- **Virtual DOM**: Ensures optimal performance for dynamic UI updates
- **Rich Ecosystem**: Extensive library support and well-documented best practices
- **TypeScript**: Adds static typing for improved code quality, better IDE support, and fewer runtime errors

**Alternative Considered:**
- Vue.js: Simpler learning curve but smaller ecosystem
- Angular: More opinionated but heavier and steeper learning curve

### Q2. Backend Framework Choice
**Selected: Express.js with Node.js and TypeScript**

**Reasoning:**
- **Express**: Minimal and flexible Node.js web framework, perfect for REST APIs
- **Node.js**: Non-blocking I/O model ideal for handling file uploads/downloads
- **TypeScript**: Brings type safety, better code organization, and improved developer experience
- **Performance**: Excellent for I/O-heavy operations like file management
- **JSON Native**: Seamless JSON handling for API responses
- **Large Community**: Extensive middleware ecosystem and strong documentation

**Alternative Considered:**
- Flask (Python): Good choice but slower for I/O operations
- Django (Python): Too heavyweight for this simple use case
- FastAPI (Python): Great async support but Node.js better suited for file operations

### Q3. Database Choice
**Selected: MySQL with Sequelize ORM**

**Reasoning:**
- **MySQL**: Robust, production-ready RDBMS with excellent reliability
- **ACID Compliance**: Ensures data integrity for medical documents
- **Scalability**: Can handle millions of records efficiently
- **Sequelize ORM**: Provides clean abstraction, migrations, and seeders
- **Type Safety**: Works seamlessly with TypeScript for type-safe queries
- **Industry Standard**: Widely used in production environments

**Alternative Considered:**
- SQLite: Good for prototyping but not suitable for production at scale
- PostgreSQL: Excellent choice, slightly more complex setup
- MongoDB: NoSQL approach not ideal for structured medical records

### Q4. Supporting 1,000 Users - Changes Required

**Infrastructure Changes:**
1. **Database Optimization:**
   - Connection pooling (already implemented with Sequelize pool config)
   - Add database indexing on frequently queried columns
   - Consider read replicas for scaling read operations
   - Implement database backup and recovery strategy

2. **File Storage:**
   - Move from local filesystem to cloud storage (AWS S3, Google Cloud Storage, or Azure Blob)
   - Implement CDN for faster file downloads
   - Add file compression for PDFs to reduce storage costs
   - Implement chunked upload for large files

3. **Authentication & Authorization:**
   - Implement JWT-based authentication
   - Add role-based access control (RBAC)
   - Implement user sessions and token refresh mechanism
   - Add password hashing (bcrypt) and security best practices

4. **Security Enhancements:**
   - HTTPS/TLS encryption for all communications
   - File encryption at rest and in transit
   - Rate limiting to prevent abuse
   - Input validation and sanitization
   - CSRF protection
   - Implement audit logging for compliance

5. **Performance Optimization:**
   - Implement caching (Redis) for frequently accessed data
   - Add pagination for document listings
   - Implement lazy loading and infinite scroll
   - Compress API responses (gzip)
   - Use a reverse proxy (Nginx) for load balancing

6. **Monitoring & Logging:**
   - Application Performance Monitoring (APM) tools
   - Error tracking (Sentry, Rollbar)
   - Centralized logging (ELK Stack, CloudWatch)
   - Health check endpoints
   - Uptime monitoring

7. **Scalability:**
   - Containerization with Docker
   - Orchestration with Kubernetes
   - Horizontal scaling of backend servers
   - Message queues for async processing (RabbitMQ, AWS SQS)
   - Microservices architecture consideration

## Part 2: Architecture Overview

### System Architecture Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         User/Patient                             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend (React + TypeScript)                 │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐   │
│  │ Upload Form  │  │Document List │  │  Toast Messages    │   │
│  └──────────────┘  └──────────────┘  └────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │        Document Service (Axios HTTP Client)              │   │
│  └─────────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────────┘
                             │ REST API (HTTPS/JSON)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              Backend (Express + TypeScript + Node.js)            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                     API Routes                            │  │
│  │  • POST /api/documents/upload                            │  │
│  │  • GET  /api/documents                                   │  │
│  │  • GET  /api/documents/:id                               │  │
│  │  • DELETE /api/documents/:id                             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                             │                                    │
│  ┌──────────────────────────┼────────────────────────────────┐ │
│  │                          ▼                                 │ │
│  │              Document Controller                           │ │
│  │   • upload()    • getAllDocuments()                       │ │
│  │   • downloadDocument()    • deleteDocument()              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                    │                    │                        │
│                    ▼                    ▼                        │
│  ┌─────────────────────────┐  ┌───────────────────────────┐   │
│  │  Multer Middleware       │  │  Sequelize ORM            │   │
│  │  (File Upload Handler)   │  │  (Database Operations)    │   │
│  └─────────────────────────┘  └───────────────────────────┘   │
└──────────────┬──────────────────────────┬──────────────────────┘
               │                           │
               ▼                           ▼
┌──────────────────────────┐   ┌─────────────────────────────┐
│   File System Storage    │   │   MySQL Database            │
│   (uploads/ directory)   │   │   ┌──────────────────────┐  │
│   • PDF files stored     │   │   │  documents table     │  │
│   • Unique filenames     │   │   │  • id                │  │
│                          │   │   │  • filename          │  │
│                          │   │   │  • filepath          │  │
│                          │   │   │  • filesize          │  │
│                          │   │   │  • created_at        │  │
│                          │   │   │  • updated_at        │  │
│                          │   │   └──────────────────────┘  │
└──────────────────────────┘   └─────────────────────────────┘
```

### Component Description

**Frontend Layer:**
- Built with React and TypeScript for type safety
- Tailwind CSS for responsive, modern UI design
- Axios for HTTP requests to backend API
- State management using React hooks (useState, useEffect)

**Backend Layer:**
- Express server handling REST API endpoints
- Multer middleware for multipart form-data processing
- Controllers for business logic separation
- Error handling middleware for consistent error responses

**Data Layer:**
- MySQL database for metadata storage
- Sequelize ORM for database operations
- Local filesystem for physical file storage

## Part 3: API Specification

### 1. Upload Document

**Endpoint:** `POST /api/documents/upload`

**Description:** Uploads a PDF document and stores metadata in the database

**Request:**
```http
POST /api/documents/upload HTTP/1.1
Host: localhost:5000
Content-Type: multipart/form-data

FormData:
  file: [PDF Binary Data]
```

**Sample Response (Success):**
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

**Sample Response (Error):**
```json
{
  "success": false,
  "message": "Only PDF files are allowed"
}
```

**Validation:**
- File type must be `application/pdf`
- Maximum file size: 10MB
- File field name must be `file`

---

### 2. Get All Documents

**Endpoint:** `GET /api/documents`

**Description:** Retrieves a list of all uploaded documents

**Request:**
```http
GET /api/documents HTTP/1.1
Host: localhost:5000
```

**Sample Response (Success):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 3,
      "filename": "xray_report.pdf",
      "filesize": 1024567,
      "createdAt": "2024-03-10T09:15:00.000Z"
    },
    {
      "id": 2,
      "filename": "blood_test_results.pdf",
      "filesize": 512340,
      "createdAt": "2024-02-20T14:45:00.000Z"
    },
    {
      "id": 1,
      "filename": "prescription_sample.pdf",
      "filesize": 245678,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**Notes:**
- Documents are sorted by creation date (newest first)
- Returns empty array if no documents exist

---

### 3. Download Document

**Endpoint:** `GET /api/documents/:id`

**Description:** Downloads a specific document by ID

**Request:**
```http
GET /api/documents/1 HTTP/1.1
Host: localhost:5000
```

**Sample Response (Success):**
```
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="prescription_sample.pdf"
Content-Length: 245678

[PDF Binary Data]
```

**Sample Response (Error - Not Found):**
```json
{
  "success": false,
  "message": "Document not found"
}
```

**Notes:**
- Returns file as downloadable attachment
- Browser triggers download dialog automatically

---

### 4. Delete Document

**Endpoint:** `DELETE /api/documents/:id`

**Description:** Deletes a document from both database and file system

**Request:**
```http
DELETE /api/documents/1 HTTP/1.1
Host: localhost:5000
```

**Sample Response (Success):**
```json
{
  "success": true,
  "message": "Document deleted successfully"
}
```

**Sample Response (Error - Not Found):**
```json
{
  "success": false,
  "message": "Document not found"
}
```

**Notes:**
- Deletes both database record and physical file
- Returns 404 if document doesn't exist
- Operation is irreversible

---

### 5. Health Check

**Endpoint:** `GET /api/health`

**Description:** Checks if the server is running

**Request:**
```http
GET /api/health HTTP/1.1
Host: localhost:5000
```

**Sample Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-12-09T10:30:00.000Z"
}
```

## Part 4: Data Flow Description

### Q5. Step-by-Step Process Flow

#### **File Upload Process:**

1. **Frontend (User Action):**
   - User selects a PDF file using file input
   - Client-side validation checks:
     - File type is PDF (mimetype: application/pdf)
     - File size ≤ 10MB
   - If validation fails, error toast is shown
   - If validation passes, file is wrapped in FormData object

2. **Frontend (HTTP Request):**
   - Axios sends POST request to `/api/documents/upload`
   - Content-Type set to `multipart/form-data`
   - File attached in request body with field name `file`
   - Upload button shows loading state

3. **Backend (Request Receipt):**
   - Express server receives request at upload route
   - Request passes through Multer middleware
   - Multer processes multipart form data

4. **Backend (File Processing):**
   - Multer validates file type (PDF only)
   - Generates unique filename: `originalname-timestamp-random.pdf`
   - Saves file to `uploads/` directory on filesystem
   - Returns file metadata to controller

5. **Backend (Database Storage):**
   - Controller receives file metadata from Multer
   - Creates new record in `documents` table using Sequelize:
     ```sql
     INSERT INTO documents (filename, filepath, filesize, created_at, updated_at)
     VALUES ('prescription.pdf', 'uploads/prescription-1234567890.pdf', 245678, NOW(), NOW())
     ```

6. **Backend (Response):**
   - Controller sends JSON response with:
     - Success status
     - Document ID, filename, filesize, timestamp
   - HTTP status code 201 (Created)

7. **Frontend (Response Handling):**
   - Success toast notification displayed
   - Document list automatically refreshed
   - Upload form is reset
   - File input cleared

#### **File Download Process:**

1. **Frontend (User Action):**
   - User clicks download button on a document
   - Download button shows loading spinner
   - Document ID extracted from clicked item

2. **Frontend (HTTP Request):**
   - Axios sends GET request to `/api/documents/:id`
   - Response type set to `blob` to handle binary data
   - Request includes document ID in URL parameter

3. **Backend (Request Receipt):**
   - Express server receives request at download route
   - Controller extracts document ID from params

4. **Backend (Database Query):**
   - Sequelize queries database:
     ```sql
     SELECT * FROM documents WHERE id = :id
     ```
   - If not found, returns 404 error

5. **Backend (File Retrieval):**
   - Controller retrieves filepath from database record
   - Checks if file exists on filesystem
   - If file doesn't exist, returns 404 error

6. **Backend (File Streaming):**
   - Express `res.download()` method streams file to client
   - Sets headers:
     - `Content-Type: application/pdf`
     - `Content-Disposition: attachment; filename="prescription.pdf"`
   - File sent as binary stream

7. **Frontend (File Handling):**
   - Blob received and converted to object URL
   - Temporary anchor (`<a>`) element created
   - Download attribute set with original filename
   - Programmatic click triggers browser download
   - Temporary URL revoked and anchor removed
   - Loading spinner hidden

## Part 5: Assumptions

### Q6. Assumptions Made During Development

#### **1. User Authentication:**
- **Assumption:** No user authentication required
- **Reasoning:** Assignment specifies "assume one user for simplicity"
- **Impact:** All documents are accessible to anyone accessing the application
- **Production Note:** Would implement JWT authentication and user-specific document isolation

#### **2. File Size Limits:**
- **Assumption:** Maximum file size of 10MB per document
- **Reasoning:** Reasonable limit for medical PDFs (prescriptions, reports)
- **Impact:** Larger files (like full medical scans) would be rejected
- **Production Note:** Could increase limit or implement chunked uploads for larger files

#### **3. File Type Restriction:**
- **Assumption:** Only PDF files are allowed
- **Reasoning:** Assignment specifically mentions PDFs for medical documents
- **Impact:** Other formats (images, Word docs) are rejected
- **Production Note:** Could extend to support JPEG, PNG, DICOM for medical images

#### **4. Concurrent Uploads:**
- **Assumption:** Users upload one file at a time
- **Reasoning:** Simple use case for patient portal
- **Impact:** No batch upload functionality
- **Production Note:** Could implement multiple file selection and parallel uploads

#### **5. File Storage:**
- **Assumption:** Local filesystem storage is sufficient
- **Reasoning:** Development/demo environment
- **Impact:** Not suitable for production scaling
- **Production Note:** Would migrate to cloud storage (S3, GCS) for scalability

#### **6. Data Validation:**
- **Assumption:** Basic validation only (file type, size, required fields)
- **Reasoning:** Prototype/assignment scope
- **Impact:** No virus scanning or content validation
- **Production Note:** Would implement antivirus scanning, content validation, metadata extraction

#### **7. Error Handling:**
- **Assumption:** Basic error messages without detailed logging
- **Reasoning:** Development simplicity
- **Impact:** Limited debugging information in production
- **Production Note:** Would implement comprehensive logging, monitoring, and alerting

#### **8. Database Schema:**
- **Assumption:** Simple flat table structure
- **Reasoning:** Single-user system with basic requirements
- **Impact:** No relationships, no user ownership
- **Production Note:** Would add user relationships, document categories, metadata fields

#### **9. CORS Configuration:**
- **Assumption:** Allow all origins in development
- **Reasoning:** Simplify local development
- **Impact:** Security risk in production
- **Production Note:** Would restrict to specific frontend domain(s)

#### **10. Data Persistence:**
- **Assumption:** No backup or recovery mechanism
- **Reasoning:** Demo application
- **Impact:** Data loss if server fails
- **Production Note:** Would implement automated backups, replication, disaster recovery

#### **11. Network Reliability:**
- **Assumption:** Stable network connection
- **Reasoning:** Local development environment
- **Impact:** No retry mechanism for failed uploads
- **Production Note:** Would implement resumable uploads, retry logic, progress tracking

#### **12. Regulatory Compliance:**
- **Assumption:** No HIPAA/GDPR compliance required
- **Reasoning:** Demo application, not production healthcare system
- **Impact:** Not suitable for real patient data
- **Production Note:** Would implement encryption, access controls, audit trails, data retention policies

#### **13. Performance:**
- **Assumption:** Low concurrent usage (< 10 users)
- **Reasoning:** Single-user demo application
- **Impact:** No performance optimization or load testing
- **Production Note:** Would implement caching, load balancing, performance monitoring

#### **14. Browser Support:**
- **Assumption:** Modern browsers with ES6+ support
- **Reasoning:** Development convenience
- **Impact:** May not work on older browsers
- **Production Note:** Would add polyfills and browser compatibility testing

#### **15. Timezone Handling:**
- **Assumption:** UTC timezone for all timestamps
- **Reasoning:** Simple consistent approach
- **Impact:** No localized time display
- **Production Note:** Would implement user timezone detection and conversion

---

## Technology Stack Summary

### Frontend
- **Framework:** React 18.2
- **Language:** TypeScript 5.2
- **Styling:** Tailwind CSS 3.3
- **Build Tool:** Vite 5.0
- **HTTP Client:** Axios 1.6
- **Dev Server:** Vite Dev Server (Port 3000)

### Backend
- **Runtime:** Node.js (ES2020)
- **Framework:** Express.js 4.18
- **Language:** TypeScript 5.3
- **ORM:** Sequelize 6.35
- **File Upload:** Multer 1.4
- **Dev Tool:** Nodemon + ts-node
- **Server Port:** 5000

### Database
- **DBMS:** MySQL (5.7+ or 8.0+)
- **ORM:** Sequelize
- **Migration Tool:** Sequelize CLI

### Development Tools
- **Package Manager:** npm
- **Version Control:** Git
- **Code Quality:** ESLint, TypeScript strict mode
- **Environment:** dotenv for configuration

---

## Security Considerations

1. **Input Validation:** File type and size validation
2. **Error Handling:** Consistent error responses without exposing internals
3. **SQL Injection:** Protected by Sequelize ORM parameterized queries
4. **XSS Prevention:** React's built-in escaping
5. **CORS:** Configured for frontend-backend communication

## Future Enhancements

1. User authentication and authorization
2. Document categories and tagging
3. Search and filter functionality
4. Document preview (PDF viewer)
5. Sharing documents with healthcare providers
6. Document expiry and archival
7. Audit logs for compliance
8. Email notifications
9. Mobile application
10. Multi-language support

