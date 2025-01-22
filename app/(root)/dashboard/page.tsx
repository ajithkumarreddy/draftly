"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash, FileText } from "lucide-react";
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
import Loader from "@/components/loader";
import { formatDate } from "@/utilities/format";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const userId = session?.user?.email || undefined;
  const userName = session?.user?.name || undefined;

  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await getDocuments(userId);
      if (response.status === "success") {
        setDocuments(response?.documents);
        setLoading(false);
      }
    };

    if (userId) {
      setLoading(true);
      fetchDocuments();
    }
  }, [userId]);

  const handleCreateDocument = async () => {
    const response = await createDocument({ userId, userName });
    if (response?.status === "created") {
      setDocuments(response?.documents);
      toast.success("Document created successfully!", {
        description: `New document added to your collection.`,
        duration: 3000,
      });
    }
  };

  const handleDeleteDocument = async (_id: string) => {
    const response = await deleteDocument({ _id, userId });
    if (response?.status === "deleted") {
      setDocuments(response?.documents);
      toast.success("Document deleted successfully!", {
        description: `Document has been removed from your dashboard.`,
        duration: 3000,
      });
    }
  };

  return (
    <div className="px-4 md:px-8 py-6 md:py-10 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Document Dashboard
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage and organize your documents
          </p>
        </div>
        <Button
          className="w-full md:w-auto bg-primaryColor text-white hover:bg-blue-700 shadow-md rounded-lg px-4 py-2.5 transition-all duration-300 flex items-center justify-center gap-2"
          onClick={handleCreateDocument}
        >
          <Plus className="w-5 h-5" />
          <span>Create Document</span>
        </Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <Table>
            <TableCaption className="text-gray-500 dark:text-gray-400 pb-4">
              {documents.length === 0
                ? "No documents found. Create a new document to get started!"
                : `Total ${documents.length} document${
                    documents.length !== 1 ? "s" : ""
                  }`}
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
                <TableHead className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-300 pl-4">
                  Title
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-300 hidden md:table-cell">
                  Author
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-300 hidden md:table-cell">
                  Created At
                </TableHead>
                <TableHead className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-300 text-right pr-4">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((document) => (
                <TableRow
                  key={document?._id}
                  className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all border-b last:border-b-0"
                >
                  <TableCell className="pl-4 py-4">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-500 dark:text-blue-400 shrink-0" />
                      <button
                        className="text-blue-600 dark:text-blue-400 font-medium hover:underline focus:outline-none transition-all text-left truncate max-w-[200px]"
                        onClick={() => router.push(`/document/${document._id}`)}
                      >
                        {document.title || "Untitled Document"}
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400 hidden md:table-cell">
                    {document.author || "Unknown"}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400 hidden md:table-cell">
                    {formatDate(document?.createdAt)}
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <Button
                      onClick={() => handleDeleteDocument(document?._id)}
                      variant="ghost"
                      className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/40 px-2 py-1 rounded-md"
                    >
                      <Trash className="w-5 h-5" />
                      <span className="hidden md:inline text-sm font-medium">
                        Delete
                      </span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
