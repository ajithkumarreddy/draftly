import express from "express";
import { createDocument, deleteDocument, documents, getDocument, updateDocument, updateDocumentTitle } from "../controllers/documentController";

const router = express.Router();

router.post("/documents", documents);
router.post("/createDocument", createDocument);
router.delete("/deleteDocument", deleteDocument);
router.post("/getDocument", getDocument);
router.put("/updateDocument", updateDocument);
router.put("/updateDocumentTitle", updateDocumentTitle);

export default router;