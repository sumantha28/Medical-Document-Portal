import axios from 'axios';
import { Document, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class DocumentService {
  private api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async getAllDocuments(): Promise<Document[]> {
    try {
      const response = await this.api.get<ApiResponse<Document[]>>('/documents');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw new Error('Failed to fetch documents');
    }
  }

  async uploadDocument(file: File): Promise<void> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await this.api.post('/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error: any) {
      console.error('Error uploading document:', error);
      const message = error.response?.data?.message || 'Failed to upload document';
      throw new Error(message);
    }
  }

  async downloadDocument(id: number, filename: string): Promise<void> {
    try {
      const response = await this.api.get(`/documents/${id}`, {
        responseType: 'blob',
      });

      // Create a blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading document:', error);
      throw new Error('Failed to download document');
    }
  }

  async deleteDocument(id: number): Promise<void> {
    try {
      await this.api.delete(`/documents/${id}`);
    } catch (error) {
      console.error('Error deleting document:', error);
      throw new Error('Failed to delete document');
    }
  }
}

export const documentService = new DocumentService();

