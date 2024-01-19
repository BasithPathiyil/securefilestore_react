// ListItem.js
import React from "react";
import fileIcon from "../assets/images/fileIcon.png";
import imageIcon from "../assets/images/pngIcon.jpg";
import pdfIcon from "../assets/images/pdfIcon.png";

const ListItem = ({ file, handleDownload, handleDelete }) => {
  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop();
    switch (extension) {
      case "jpeg":
        return imageIcon;
      case "jpg":
        return imageIcon;
      case "png":
        return imageIcon;
      case "pdf":
        return pdfIcon;
      default:
        return fileIcon; // Replace with the default icon URL
    }
  };

  return (
    <div className="flex flex-col items-center border-b border-gray-300 py-2">
      <div className="flex justify-between w-full items-center mb-2">
        <img
          src={getFileIcon(file?.fileName)}
          alt={`${file?.fileName} icon`}
          className="w-6 h-6 mr-2"
        />
        <p className="text-lg">{file?.fileName}</p>
      </div>
      <div className="flex space-x-2 mt-2">
        <button
          onClick={() => handleDownload(file?._id, file?.fileName)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Download
        </button>
        <button
          onClick={() => handleDelete(file?._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListItem;
