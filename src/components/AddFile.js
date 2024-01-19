// FileInput.js
import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../utils/api";
import SuccessfullUploadDialogue from "./SuccesfullUploadDialogue";

const AddFile = ({ setCounter, counter }) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleAddButtonClick = async () => {
    try {
      console.log("File:", selectedFile);
      if (!selectedFile) {
        throw new Error("File is mandatory");
      }
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("filename", fileName);
      const response = await api.post("/file_upload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response", response);
      setSecretKey(response.data.objResult.secretKey);
      setOpen(true);
      setCounter(counter + 1);
      setFileName("");
      setSelectedFile(null);
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message
          ? error.response.data.error.message
          : error.message
      );
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-gray-100 max-w-md rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Add File</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Select File
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          File Name
        </label>
        <input
          type="text"
          value={fileName}
          onChange={handleNameChange}
          className="p-2 border rounded w-full"
        />
      </div>
      <button
        onClick={handleAddButtonClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add
      </button>
      <SuccessfullUploadDialogue
        open={open}
        setOpen={setOpen}
        secretKey={secretKey}
      />
    </div>
  );
};

export default AddFile;
