export interface Document {
  id: number;
  filename: string;
  filesize: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
}

export interface ToastMessage {
  message: string;
  type: 'success' | 'error';
}

