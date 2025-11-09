// Report-related types

export type ReportStatus = 'pending' | 'in-progress' | 'resolved' | 'rejected';

export type ReportCategory = 'infrastruktur' | 'kebersihan' | 'keamanan' | 'kesehatan' | 'lainnya';

export interface Report {
  id: string;
  title: string;
  description: string;
  category: ReportCategory;
  status: ReportStatus;
  province: string;
  city: string;
  address: string;
  location: string; // Short location name for display
  latitude: number;
  longitude: number;
  images: string[];
  upvotes: number;
  userId: string;
  reporterName: string; // User's display name
  reporterAvatar: string; // User's avatar URL
  createdAt: string;
  updatedAt: string;
}

export interface CreateReportInput {
  title: string;
  description: string;
  category: ReportCategory;
  province: string;
  city: string;
  address: string;
  latitude?: number;
  longitude?: number;
  images?: string[];
}

export interface UpdateReportInput {
  title?: string;
  description?: string;
  status?: ReportStatus;
}
