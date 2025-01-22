import { ContentState, convertToRaw, EditorState } from "draft-js";
import {
  GetDocumentsResponse,
  CreateDocumentResponse,
  DeleteDocumentResponse,
} from "./types";
import { v4 as uuidv4 } from "uuid";

// Get Documents
export const getDocuments = async (
  userId: string | undefined
): Promise<GetDocumentsResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/documents`, {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching documents");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error fetching documents:", error);
    throw new Error("Error fetching documents");
  }
};

// Create Document
export const createDocument = async ({
  userId,
  userName,
}: {
  userId: string | undefined;
  userName: string | undefined;
}): Promise<CreateDocumentResponse> => {
  // sample content
  const contentState = ContentState.createFromText("A sample text. Start editing...");
  const editorState = EditorState.createWithContent(contentState);
  const rawContent = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

  const payload = {
    _id: uuidv4(),
    title: "Untitled",
    author: userName,
    createdAt: Date.now(),
    content: rawContent,
    userId: userId,
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/createDocument`, {
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

// Delete Document
export const deleteDocument = async ({
  _id,
  userId,
}: {
  _id: string;
  userId: string | undefined;
}): Promise<DeleteDocumentResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleteDocument`, {
      method: "DELETE",
      body: JSON.stringify({ _id, userId }),
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

// Get Document
export const getDocument = async ({ id }: { id: string }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getDocument`, {
      method: "POST",
      body: JSON.stringify({ _id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching document");
    }

    return response?.json();
  } catch (error: any) {
    console.error("Error fetching document:", error);
    throw new Error("Error fetching document");
  }
};

// Update Document Content
export const updateDocument = async ({
  _id,
  rawTextString,
}: {
  _id: string;
  rawTextString: string;
}) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updateDocument`, {
      method: "PUT",
      body: JSON.stringify({ _id, content: rawTextString }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error updating document");
    }

    return response?.json();
  } catch (error: any) {
    console.error("Error updating document:", error);
    throw new Error("Error updating document");
  }
};

// Update Document Title
export const updateDocumentTitle = async ({
  _id,
  title,
}: {
  _id: string;
  title: string;
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/updateDocumentTitle`,
      {
        method: "PUT",
        body: JSON.stringify({ _id, title }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error updating document title");
    }

    return response?.json();
  } catch (error) {
    console.error("Error updating document title:", error);
    throw new Error("Error updating document title");
  }
};
