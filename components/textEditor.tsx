"use client";

import React, { useState } from "react";
import {
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  RawDraftContentState,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { updateDocument } from "@/utilities/eventHandlers";
import { Button } from "./ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Undo,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Trash,
  Save,
  Redo,
} from "lucide-react";
import { toast } from "sonner";

const TextEditor = ({ _id, content }: { _id: string; content: string }) => {
  const [editorState, setEditorState] = useState<EditorState>(() =>
    content
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
      : EditorState.createEmpty()
  );
  const [fontSize, setFontSize] = useState("16px");
  const [error, setError] = useState<string | null>(null);

  const handleStyleChange = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const handleBlockStyleChange = (style: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, style));
  };

  const handleEditorChange = (newState: EditorState) => {
    setEditorState(newState);
  };

  const saveContent = async () => {
    try {
      const rawContent: RawDraftContentState = convertToRaw(
        editorState.getCurrentContent()
      );
      const rawContentString = JSON.stringify(rawContent);

      if (rawContentString !== '{"blocks":[],"entityMap":{}}') {
        const response = await updateDocument({
          _id,
          rawTextString: rawContentString,
        });
        if (response?.status === "success") {
          toast.success("Content updated successfully.");
        } else {
          toast.error("Some error in saving content");
        }
      }
    } catch (error) {
      console.error("Error saving content:", error);
      setError("Failed to save content. Please try again.");
    }
  };

  const clearContent = () => {
    setEditorState(EditorState.createEmpty());
  };

  const calculateWordCount = () => {
    const plainText = editorState.getCurrentContent().getPlainText();
    return plainText
      .trim()
      .split(/\s+/)
      .filter((word) => word).length;
  };

  return (
    <div className="w-full max-w-screen-lg">
      <div className="toolbar sticky top-0 z-10 flex justify-between items-center p-3 bg-gray-900 rounded-t-md w-full shadow-lg space-x-2 text-white">
        <div className="space-x-4 flex flex-row items-center">
          <div className="w-auto">
          <Select value={fontSize} onValueChange={setFontSize}>
            <SelectTrigger className="px-3 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 hover:text-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12px">12px</SelectItem>
              <SelectItem value="14px">14px</SelectItem>
              <SelectItem value="16px">16px (Default)</SelectItem>
              <SelectItem value="18px">18px</SelectItem>
              <SelectItem value="20px">20px</SelectItem>
            </SelectContent>
          </Select>
          </div>
        
          <Button
            variant="outline"
            size="icon"
            className="text-white bg-gray-700 hover:bg-gray-600 hover:text-gray-200 border-gray-500"
            onClick={() => setEditorState(EditorState.undo(editorState))}
          >
            <Undo/>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="text-white bg-gray-700 hover:bg-gray-600 hover:text-gray-200 border-gray-500"
            onClick={() => setEditorState(EditorState.redo(editorState))}
          >
            <Redo/>
          </Button>

          <span className="text-white">|</span>

          <Button
            variant="outline"
            size="icon"
            className="text-white bg-gray-700 hover:bg-gray-600 hover:text-gray-200 border-gray-500"
            onClick={() => handleStyleChange("BOLD")}
          >
            <Bold />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="text-white bg-gray-700 hover:bg-gray-600 hover:text-gray-200 border-gray-500"
            onClick={() => handleStyleChange("ITALIC")}
          >
            <Italic />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="text-white bg-gray-700 hover:bg-gray-600 hover:text-gray-200 border-gray-500"
            onClick={() => handleStyleChange("UNDERLINE")}
          >
            <Underline />
          </Button>
          <span className="text-white">|</span>
          <Button
            variant="outline"
            size="icon"
            className="text-white bg-gray-700 hover:bg-gray-600 hover:text-gray-200 border-gray-500"
            onClick={() => handleBlockStyleChange("left")}
          >
            <AlignLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="text-white bg-gray-700 hover:bg-gray-600 hover:text-gray-200 border-gray-500"
            onClick={() => handleBlockStyleChange("center")}
          >
            <AlignCenter />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="text-white bg-gray-700 hover:bg-gray-600 hover:text-gray-200 border-gray-500"
            onClick={() => handleBlockStyleChange("right")}
          >
            <AlignRight />
          </Button>

          <span className="text-white">|</span>

          {/* Actions */}
          <Button
            variant="outline"
            size="icon"
            className="text-white bg-green-600 hover:bg-green-500 border-green-500"
            onClick={saveContent}
          >
            <Save />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="text-white bg-red-600 hover:bg-red-500 border-red-500"
            onClick={clearContent}
          >
            <Trash />
          </Button>
        </div>

        <div className="text-md font-semibold text-white">
          Word Count: {calculateWordCount()}
        </div>
      </div>

      <div
        className="w-full text-white min-h-[460px] p-4 bg-gray-800 rounded-b-lg border border-gray-600"
        style={{ fontSize }}
      >
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          placeholder="Start typing here..."
        />
      </div>

      {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default TextEditor;
