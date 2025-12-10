import { Request, Response } from 'express';
import Document from '../models/Document';
import fs from 'fs';
import path from 'path';

export class DocumentController {
  // Upload a document
  async upload(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ 
          success: false, 
          message: 'No file uploaded' 
        });
        return;
      }

      // Validate file type
      if (req.file.mimetype !== 'application/pdf') {
        // Delete the uploaded file
        fs.unlinkSync(req.file.path);
        res.status(400).json({ 
          success: false, 
          message: 'Only PDF files are allowed' 
        });
        return;
      }

      // Create document record in database
      const document = await Document.create({
        filename: req.file.originalname,
        filepath: req.file.path,
        filesize: req.file.size
      });

      res.status(201).json({
        success: true,
        message: 'File uploaded successfully',
        data: {
          id: document.id,
          filename: document.filename,
          filesize: document.filesize,
          createdAt: document.createdAt
        }
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error uploading file',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get all documents
  async getAllDocuments(req: Request, res: Response): Promise<void> {
    try {
      const documents = await Document.findAll({
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'filename', 'filesize', 'createdAt']
      });

      res.status(200).json({
        success: true,
        count: documents.length,
        data: documents
      });
    } catch (error) {
      console.error('Get documents error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error retrieving documents',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Download a document
  async downloadDocument(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const document = await Document.findByPk(id);

      if (!document) {
        res.status(404).json({ 
          success: false, 
          message: 'Document not found' 
        });
        return;
      }

      // Check if file exists
      if (!fs.existsSync(document.filepath)) {
        res.status(404).json({ 
          success: false, 
          message: 'File not found on server' 
        });
        return;
      }

      // Send file
      res.download(document.filepath, document.filename, (err) => {
        if (err) {
          console.error('Download error:', err);
          res.status(500).json({ 
            success: false, 
            message: 'Error downloading file' 
          });
        }
      });
    } catch (error) {
      console.error('Download error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error downloading document',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Delete a document
  async deleteDocument(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const document = await Document.findByPk(id);

      if (!document) {
        res.status(404).json({ 
          success: false, 
          message: 'Document not found' 
        });
        return;
      }

      // Delete file from filesystem
      if (fs.existsSync(document.filepath)) {
        fs.unlinkSync(document.filepath);
      }

      // Delete database record
      await document.destroy();

      res.status(200).json({
        success: true,
        message: 'Document deleted successfully'
      });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error deleting document',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

export default new DocumentController();

