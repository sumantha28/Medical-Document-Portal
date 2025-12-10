# API Testing Examples

Complete examples for testing the Medical Document Portal API.

## Table of Contents
- [Using cURL](#using-curl)
- [Using Postman](#using-postman)
- [Using JavaScript/Fetch](#using-javascriptfetch)
- [Using Python](#using-python)

---

## Using cURL

### 1. Health Check

```bash
curl -X GET http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-12-09T10:30:00.000Z"
}
```

---

### 2. Upload Document

```bash
curl -X POST http://localhost:5000/api/documents/upload \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/path/to/your/document.pdf"
```

**Windows PowerShell:**
```powershell
curl.exe -X POST http://localhost:5000/api/documents/upload `
  -F "file=@C:\path\to\your\document.pdf"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "id": 1,
    "filename": "document.pdf",
    "filesize": 245678,
    "createdAt": "2024-12-09T10:30:00.000Z"
  }
}
```

---

### 3. Get All Documents

```bash
curl -X GET http://localhost:5000/api/documents
```

**Expected Response:**
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
      "filename": "blood_test.pdf",
      "filesize": 512340,
      "createdAt": "2024-02-20T14:45:00.000Z"
    },
    {
      "id": 1,
      "filename": "prescription.pdf",
      "filesize": 245678,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 4. Download Document

```bash
# Download and save with original filename
curl -O -J http://localhost:5000/api/documents/1

# Download and save with custom name
curl -o my_document.pdf http://localhost:5000/api/documents/1
```

**Expected Response:**
- Binary PDF file download

---

### 5. Delete Document

```bash
curl -X DELETE http://localhost:5000/api/documents/1
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Document deleted successfully"
}
```

---

## Using Postman

### 1. Health Check

- **Method:** GET
- **URL:** `http://localhost:5000/api/health`
- **Headers:** None required
- **Body:** None

---

### 2. Upload Document

- **Method:** POST
- **URL:** `http://localhost:5000/api/documents/upload`
- **Headers:** None (auto-set by Postman)
- **Body:**
  - Select `form-data`
  - Key: `file` (change type to `File`)
  - Value: Select a PDF file from your computer

---

### 3. Get All Documents

- **Method:** GET
- **URL:** `http://localhost:5000/api/documents`
- **Headers:** None required
- **Body:** None

---

### 4. Download Document

- **Method:** GET
- **URL:** `http://localhost:5000/api/documents/1`
- **Headers:** None required
- **Body:** None
- **Note:** Click "Send and Download" button in Postman

---

### 5. Delete Document

- **Method:** DELETE
- **URL:** `http://localhost:5000/api/documents/1`
- **Headers:** None required
- **Body:** None

---

## Using JavaScript/Fetch

### 1. Health Check

```javascript
fetch('http://localhost:5000/api/health')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

---

### 2. Upload Document

```javascript
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

const formData = new FormData();
formData.append('file', file);

fetch('http://localhost:5000/api/documents/upload', {
  method: 'POST',
  body: formData
})
  .then(response => response.json())
  .then(data => console.log('Upload successful:', data))
  .catch(error => console.error('Upload error:', error));
```

---

### 3. Get All Documents

```javascript
fetch('http://localhost:5000/api/documents')
  .then(response => response.json())
  .then(data => {
    console.log('Total documents:', data.count);
    console.log('Documents:', data.data);
  })
  .catch(error => console.error('Error:', error));
```

---

### 4. Download Document

```javascript
const documentId = 1;

fetch(`http://localhost:5000/api/documents/${documentId}`)
  .then(response => response.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  })
  .catch(error => console.error('Download error:', error));
```

---

### 5. Delete Document

```javascript
const documentId = 1;

fetch(`http://localhost:5000/api/documents/${documentId}`, {
  method: 'DELETE'
})
  .then(response => response.json())
  .then(data => console.log('Delete successful:', data))
  .catch(error => console.error('Delete error:', error));
```

---

## Using Python

### 1. Health Check

```python
import requests

response = requests.get('http://localhost:5000/api/health')
print(response.json())
```

---

### 2. Upload Document

```python
import requests

url = 'http://localhost:5000/api/documents/upload'
files = {'file': open('document.pdf', 'rb')}

response = requests.post(url, files=files)
print(response.json())
```

---

### 3. Get All Documents

```python
import requests

response = requests.get('http://localhost:5000/api/documents')
data = response.json()

print(f"Total documents: {data['count']}")
for doc in data['data']:
    print(f"- {doc['filename']} ({doc['filesize']} bytes)")
```

---

### 4. Download Document

```python
import requests

document_id = 1
response = requests.get(f'http://localhost:5000/api/documents/{document_id}')

# Save to file
with open('downloaded_document.pdf', 'wb') as f:
    f.write(response.content)

print("Document downloaded successfully")
```

---

### 5. Delete Document

```python
import requests

document_id = 1
response = requests.delete(f'http://localhost:5000/api/documents/{document_id}')

print(response.json())
```

---

## Error Responses

### 400 Bad Request

**Scenario:** Invalid file type
```json
{
  "success": false,
  "message": "Only PDF files are allowed"
}
```

**Scenario:** File too large
```json
{
  "success": false,
  "message": "File size exceeds the maximum limit of 10MB"
}
```

**Scenario:** No file provided
```json
{
  "success": false,
  "message": "No file uploaded"
}
```

---

### 404 Not Found

**Scenario:** Document doesn't exist
```json
{
  "success": false,
  "message": "Document not found"
}
```

**Scenario:** File not on server
```json
{
  "success": false,
  "message": "File not found on server"
}
```

---

### 500 Internal Server Error

**Scenario:** Server error
```json
{
  "success": false,
  "message": "Error uploading file",
  "error": "Detailed error message"
}
```

---

## Complete Testing Workflow

### Test Sequence

1. **Start servers**
   ```bash
   # Terminal 1 - Backend
   cd Backend && npm run dev
   
   # Terminal 2 - Frontend
   cd Frontend && npm run dev
   ```

2. **Health check**
   ```bash
   curl http://localhost:5000/api/health
   ```

3. **Upload sample document**
   ```bash
   curl -X POST http://localhost:5000/api/documents/upload \
     -F "file=@sample.pdf"
   ```

4. **List all documents**
   ```bash
   curl http://localhost:5000/api/documents
   ```

5. **Download document (ID from previous step)**
   ```bash
   curl -O -J http://localhost:5000/api/documents/1
   ```

6. **Delete document**
   ```bash
   curl -X DELETE http://localhost:5000/api/documents/1
   ```

7. **Verify deletion**
   ```bash
   curl http://localhost:5000/api/documents
   ```

---

## Response Headers

All JSON responses include:
```
Content-Type: application/json; charset=utf-8
Access-Control-Allow-Origin: *
```

File downloads include:
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="document.pdf"
Content-Length: [file size in bytes]
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider:
- Max 100 requests per 15 minutes per IP
- Max 10 uploads per hour per IP
- Max file size: 10MB

---

## Common Issues

### CORS Error
**Solution:** Ensure backend is running and CORS is enabled

### Connection Refused
**Solution:** Verify backend is running on port 5000

### File Upload Fails
**Solution:** 
- Check file is PDF format
- Verify file size < 10MB
- Ensure uploads/ directory has write permissions

### Download Opens in Browser
**Solution:** Use proper Content-Disposition header (already implemented)

---

**Need more help?** Check the [README.md](./README.md) or [design.md](./design.md)

