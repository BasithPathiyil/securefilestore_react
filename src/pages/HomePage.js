import React, { useState } from "react";
import Header from "../components/Header";
import AddFile from "../components/AddFile";
import ListFiles from "../components/ListFiles";
import Pagination from "../components/Pagination";
import DigitCodeDialogue from "../components/DigitCodeDialogue";

const HomePage = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <Header />

      <AddFile setCounter={setCounter} counter={counter} />
      <ListFiles setCounter={setCounter} counter={counter} />
    </div>
  );
};

export default HomePage;
