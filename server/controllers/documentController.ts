import { Request, Response } from "express";
import Document from "../models/Document";

// Get Documents API
export const documents = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const documentList = await Document.find({ userId })
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json({ status: "success", documents: documentList });
  } catch (error) {
    console.error("Error fetching documents", error);
    res
      .status(500)
      .json({ status: "error", message: "Error fetching documents", error });
  }
};

// Create Document API
export const createDocument = async (req: Request, res: Response) => {
  const { _id, title, author, createdAt, content, userId } = req.body;

  try {
    const newDocument = await Document.create({
      _id,
      title,
      author,
      createdAt,
      content,
      userId,
    });
    const allDocuments = await Document.find({ userId })
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json({ status: "created", documents: allDocuments });
  } catch (error) {
    console.error("Error creating document", error);
    res
      .status(500)
      .json({ status: "error", message: "Error creating document", error });
  }
};

// Delete Document API
export const deleteDocument = async (req: Request, res: Response) => {
  const { _id, userId } = req.body;

  try {
    await Document.findByIdAndDelete({ _id });
    const allDocuments = await Document.find({ userId })
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json({ status: "deleted", documents: allDocuments });
  } catch (error) {
    console.error("Error deleting document", error);
    res
      .status(500)
      .json({ status: "error", message: "Error deleting document", error });
  }
};

// Get Document API
export const getDocument = async (req: Request, res: Response) => {
  const { _id } = req.body;

  try {
    const document = await Document.findOne({ _id });
    res.status(200).json({ status: "success", document});
  } catch (error) {
    console.error("Error fetching document", error);
    res
      .status(500)
      .json({ status: "error", message: "Error fetching document", error });
  }
};

// Update Document API
export const updateDocument = async (req: Request, res: Response) => {
  const { _id, content } = req.body;

  try {
    const document = await Document.findByIdAndUpdate(
      _id,
      { content },
      { new: true }
    );
    res.status(200).json({ status: "success", documents: [document] });
  } catch (error) {
    console.error("Error updating document", error);
    res
      .status(500)
      .json({ status: "error", message: "Error updating document", error });
  }
};

// Update Document Title API
export const updateDocumentTitle = async (req: Request, res: Response) => {
  const { _id, title } = req.body;
  console.log("SpaceX", _id, title);

  try {
    const document = await Document.findByIdAndUpdate(_id, { title }, { new: true });
    res.status(200).json({ status: "success", document: [document] });
  } catch (error) {
    console.error("Error updating document title", error);
    res.status(500).json({
      status: "error",
      message: "Error updating document title",
      error,
    });
  }
};
