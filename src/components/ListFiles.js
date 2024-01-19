// FileList.js
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { toast } from "react-toastify";
import api from "../utils/api";
import DigitCodeDialogue from "./DigitCodeDialogue";
import ListItem from "./Listitem";

const ListFiles = ({ setCounter, counter }) => {
  const [open, setOpen] = useState(false);
  const [fileId, setFileId] = useState("");
  const [fileName, setFileName] = useState("");
  const totalItems = 100;
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setrowsPerPage] = useState(10);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Fetch data for the new page
  };

  const handlerowsPerPageChange = (newrowsPerPage) => {
    setrowsPerPage(newrowsPerPage);
    // Fetch data for the new items per page
  };

  const [files, setFiles] = useState([]);
  const fetchAllFiles = async () => {
    try {
      const { data } = await api.get("/file_upload/get_all_files_by_userid");
      console.log("data", data);
      setFiles(data?.arrResult);
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message
          ? error.response.data.error.message
          : error.message
      );
    }
  };
  useEffect(() => {
    fetchAllFiles();
  }, [counter]);
  const handleDownload = (fileId, fileName) => {
    // Add your download logic here
    console.log("Downloading:", fileId);
    setFileId(fileId);
    setFileName(fileName);
    setOpen(true);
  };

  const handleDelete = async (fileId) => {
    // Add your delete logic here
    try {
      const { data } = await api.delete(`/file_upload/delete?id=${fileId}`);
      setCounter(counter + 1);
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
      <h1 className="text-2xl font-semibold mb-4">File List</h1>
      {files?.map((file) => (
        <ListItem
          key={file._id}
          file={file}
          handleDownload={handleDownload}
          handleDelete={handleDelete}
        />
      ))}
      <DigitCodeDialogue
        setOpen={setOpen}
        open={open}
        fileId={fileId}
        fileName={fileName}
      />
      {/* <Pagination
        totalItems={totalItems}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onrowsPerPageChange={handlerowsPerPageChange}
      /> */}
    </div>
  );
};

export default ListFiles;
