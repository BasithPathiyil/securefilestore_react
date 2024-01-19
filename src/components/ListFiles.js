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
  const [page, setPage] = useState(1);
  const [rowsPerPage, setrowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(10);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlerowsPerPageChange = (newrowsPerPage) => {
    setrowsPerPage(newrowsPerPage);
  };

  const [files, setFiles] = useState([]);
  const fetchAllFiles = async () => {
    try {
      const { data } = await api.get("/file_upload/get_all_files_by_userid", {
        params: { page, rowsPerPage },
      });
      console.log("data", data);
      setFiles(data?.arrResult);
      setTotalItems(data?.arrCount);
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
  }, [counter, page, rowsPerPage]);
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
      <Pagination
        totalItems={totalItems}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onrowsPerPageChange={handlerowsPerPageChange}
      />
    </div>
  );
};

export default ListFiles;
