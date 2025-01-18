export interface DocumentTitleProps {
  _id: string;
  title: string;
  createdAt: string;
  author: string;
}

export type Document = {
  _id: string;
  title: string;
  author: string;
  createdAt: string;
  content: string;
  userId: string;
};

export interface GetDocumentsResponse {
  status: string;
  documents: Document[];
}

export interface CreateDocumentResponse {
  status: string;
  documents: Document[];
}

export interface DeleteDocumentResponse {
  status: string;
  documents: Document[];
}
