"use client";

import React, { useEffect, useState } from "react";
import TextEditor from "@/components/textEditor";
import DocumentTitle from "@/components/documentTitle";
import { getDocument } from "@/utilities/eventHandlers";
import { formatDate } from "@/utilities/format";

const Document = ({ params }: { params: { id: string } }) => {
  const [documentId, setDocumentId] = useState("");
  const [document, setDocument] = useState([]);

  useEffect(() => {
    const fetchId = async () => {
      const { id } = await params;
      setDocumentId(id);
    };

    fetchId();
  }, [params]);

  useEffect(() => {
    const fetchDocument = async () => {
      const response = await getDocument({ id: documentId });
      if (response?.status === "success") {
        setDocument(response?.document);
      }
    };

    documentId && fetchDocument();
  }, [documentId]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 transition-colors duration-300">
      {/* Document Title Section */}
      {document.title && (
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all">
          <DocumentTitle
            _id={document._id}
            title={document.title}
            createdAt={formatDate(document.createdAt)}
            author={document.author}
          />
        </div>
      )}

      {/* Text Editor Section */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition-all">
        {document.content && (
          <TextEditor _id={document._id} content={document.content} />
        )}
      </div>
    </div>
  );
};

export default Document;
