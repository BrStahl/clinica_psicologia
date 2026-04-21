import { Timestamp } from "firebase/firestore";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  authorId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  status: 'draft' | 'published';
}

export interface Admin {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin';
}
