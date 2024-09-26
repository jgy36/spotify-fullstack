import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import ListAlbum from "./pages/ListAlbum";
import AddAlbum from "./pages/AddAlbum";
import AddSong from "./pages/AddSong";
import ListSong from "./pages/ListSong";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./styles/toastify.css";

export const url = "http://localhost:4000";

const App = () => {
  return (
    <div className="flex items-start min-h-screen">
      <ToastContainer />
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
        <Navbar />
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
            <Route path="/list-song" element={<ListSong />} />
            <Route path="/add-album" element={<AddAlbum />} />
            <Route path="/add-song" element={<AddSong />} />
            <Route path="/list-album" element={<ListAlbum />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
