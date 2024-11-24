import { GetDocumentsResponse, CreateDocumentResponse, DeleteDocumentResponse } from "./types";
import { v4 as uuidv4 } from 'uuid';

export const getDocuments = async ( userId: string | undefined ): Promise<GetDocumentsResponse> => {
  try {
    const response = await fetch(`/api/documents?userId=${userId}`);

    if (!response.ok) {
      throw new Error("Error fetching documents");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching documents:", error);
    throw new Error("Error fetching documents");
  }
};

export const createDocument = async (): Promise<CreateDocumentResponse> => {
  const payload = {
    _id: uuidv4(),
    title: "Untitled",
    content: "",
  };

  try {
    const response = await fetch("/api/createDocument", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error creating document");
    }

    return response?.json();
  } catch (error: any) {
    console.error("Error creating document:", error);
    throw new Error("Error creating document");
  }
};

export const deleteDocument = async ({ _id }: { _id: string }): Promise<DeleteDocumentResponse> => {
  try {
    const response = await fetch("/api/deleteDocument", {
      method: "DELETE",
      body: JSON.stringify({ _id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error deleting document");
    }

    return response?.json();
  } catch (error: any) {
    console.error("Error deleting document:", error);
    throw new Error("Error deleting document");
  }
};
