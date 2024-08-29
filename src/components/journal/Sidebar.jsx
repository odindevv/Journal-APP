import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { JournalEntries } from "./JournalEntries";
import { startLogout } from "../../actions/auth";
import { noteLogout, startNewNote } from "../../actions/notes";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(startLogout());
    dispatch(noteLogout());
  };

  const handleAddNew = () => {
    dispatch(startNewNote());
  };

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar--navbar">
        <h3 className="mt-5">
          <i className="fa-moon far" />
          <span style={{ marginLeft: "5px" }}>{name}</span>
        </h3>
        <button
          className="btn"
          onClick={handleLogout}
          style={{ marginTop: "20px" }}
        >
          Logout
        </button>
      </div>

      <div className="journal__new-entry" onClick={handleAddNew}>
        <i className="fa-5x fa-calendar-plus far"> </i>
        <p className="mt-5">New entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
};
