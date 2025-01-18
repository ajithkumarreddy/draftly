"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { updateDocumentTitle } from "@/utilities/eventHandlers";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { DocumentTitleProps } from "@/utilities/types";

const DocumentTitle: React.FC<DocumentTitleProps> = ({
  _id,
  title,
  createdAt,
  author,
}) => {
  const defaultTitle = "Untitled Document";
  const [documentTitle, setDocumentTitle] = useState<string>(title);
  const [editing, setEditing] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentTitle(event.target.value);
    setError(null);
  };

  const saveTitle = async () => {
    if (documentTitle.trim() && documentTitle !== title) {
      try {
        setSaving(true);
        const response = await updateDocumentTitle({
          _id,
          title: documentTitle,
        });
        if (response.status === "success") {
          toast.success("Document title updated successfully!");
        } else {
          setError("Failed to save. Please try again.");
          setDocumentTitle(title);
        }
      } catch (err) {
        console.error("Error saving document title:", err);
        setError("An error occurred while saving. Please try again.");
        setDocumentTitle(title);
      } finally {
        setSaving(false);
        setEditing(false);
      }
    } else {
      setEditing(false);
    }
  };

  const cancelEdit = () => {
    setDocumentTitle(title);
    setEditing(false);
    setError(null);
  };

  useEffect(() => {
    if(editing) {
      inputRef.current?.focus();
    }
  }, [editing])

  return (
    <section className="flex flex-col py-6 px-8 bg-slate-50 dark:bg-gray-800 border-2 rounded-md transition-colors shadow-lg">
      <div className="mb-2 flex w-auto">
        {editing ? (
          <div className="flex items-center space-x-4">
            <Input
              ref={inputRef}
              className="w-auto text-black ring-1 ring-primaryColor dark:ring-white dark:text-white bg-white dark:bg-gray-700 rounded-sm p-2 transition"
              type="text"
              value={documentTitle}
              onChange={handleTitleChange}
              placeholder="Enter title"
              aria-label="Document title"
              aria-describedby="document-title-help"
              disabled={saving}
            />
            <Button
              variant="outline"
              onClick={saveTitle}
              className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:text-white hover:bg-green-500"
              disabled={saving}
            >
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={cancelEdit}
              className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:text-white hover:bg-red-500"
              disabled={saving}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <h2
            className="text-2xl w-auto font-semibold text-black dark:text-white cursor-pointer hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            title="Click to edit title"
            role="button"
            tabIndex={0}
            onClick={() => setEditing(true)}
          >
            {documentTitle || defaultTitle}
          </h2>
        )}
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>
      <div
        id="document-title-help"
        className="text-gray-700 dark:text-gray-400 text-sm"
      >
        <span>{createdAt}</span> • <span>{author}</span>
      </div>
    </section>
  );
};

export default DocumentTitle;