"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createDocument,
  deleteDocument,
  getDocuments,
} from "@/utilities/eventHandlers";
import { useSession } from "next-auth/react";
import { Document } from "@/utilities/types";

const Dashboard = () => {
  const { data: session } = useSession();
  const userId = session?.user?.email || undefined;

  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await getDocuments(userId);
      if (response.status === "success") {
        setDocuments(response?.documents);
      }
    };

    fetchDocuments();
  }, [userId]);

  const handleCreateDocument = async () => {
    const response = await createDocument();
    if (response?.status === "created") {
      setDocuments(response?.documents);
    }
  };

  const handleDeleteDocument = async (_id: string) => {
    const response = await deleteDocument({ _id });
    if (response?.status === "deleted") {
      setDocuments(response?.documents);
    }
  };

  return (
    <div className="p-24 pt-12 pb-12">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">All Documents</h1>
        <Button onClick={handleCreateDocument}>
          <span className="dark:text-black font-semibold">Create Document</span>
        </Button>
      </div>

      {loading ? (
        <h3>loading...</h3>
      ) : (
        <Table>
          <TableCaption>A list of documents created by you.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((document: any) => {
              return (
                <TableRow key={document.id}>
                  <TableCell className="font-medium">
                    {document.title}
                  </TableCell>
                  <TableCell>{document.author}</TableCell>
                  <TableCell>{document.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => handleDeleteDocument(document?._id)}
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Dashboard;
