import React, { useEffect, useRef } from "react";
import { NotesAppBar } from "./NotesAppBar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useForm } from "../../hooks/useForm";
import { activeNote, startDeleting } from "../../actions/notes";
export const NoteScreen = () => {
  const dispatch = useDispatch();

  const { active: note } = useSelector((state) => state.notes);
  const [formValues, handleInputChange, reset] = useForm(note);
  const { body, title, url, id } = formValues;

  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues]);

  const handleDelete = () => {
    dispatch(startDeleting(id));
  };

  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          name="title"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          name="body"
          placeholder="What happend today?"
          className="notes__textarea"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {url && (
          <div className="notes__image">
            <img src={url} alt="image" />
          </div>
        )}
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
