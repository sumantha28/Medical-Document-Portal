import { Router } from 'express';
import documentController from '../controllers/document.controller';
import { upload } from '../middleware/upload.middleware';

const router = Router();

// Upload a document
router.post('/upload', upload.single('file'), documentController.upload);

// Get all documents
router.get('/', documentController.getAllDocuments);

// Download a document
router.get('/:id', documentController.downloadDocument);

// Delete a document
router.delete('/:id', documentController.deleteDocument);

export default router;

