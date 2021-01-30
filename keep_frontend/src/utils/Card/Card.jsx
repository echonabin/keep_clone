import React, { useState } from "react";
import { connect } from "react-redux";
import { updateNote, deleteNote } from "../../actions/note";
import Textarea from "react-textarea-autosize";
import trash from "../../assets/images/trash.png";

const Card = ({
  noteTitle,
  noteDescription,
  id,
  token,
  updateNote,
  deleteNote,
  error,
}) => {
  const [cardClicked, setCardClicked] = useState(false);
  const [formData, setFormData] = useState({
    title: noteTitle,
    description: noteDescription,
  });
  const { title, description } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    updateNote({ title, description }, id, token);
    console.log("submit clicked");
  };
  const deleteHandler = (e) => {
    deleteNote(id, token);
  };
  return (
    <>
      <div
        className="w-50 bg-white border rounded-md py-5 transition-shadow hover:shadow-md focus:shadow-md relative"
        style={{ height: "fit-content" }}
      >
        <form
          onSubmit={(e) => onSubmit(e)}
          className="flex flex-col"
          onClick={() => setCardClicked(true)}
        >
          {cardClicked || noteTitle !== null ? (
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => onChange(e)}
              className="w-full px-5 mb-3 focus:border-none focus:outline-none font-semibold"
            />
          ) : null}
          <Textarea
            rows={3}
            className="w-full px-5 focus:border-none focus:outline-none resize-none overflow-hidden"
            id="description"
            value={description}
            onChange={(e) => onChange(e)}
          />
          {cardClicked ? (
            <div className="mt-5 px-1 w-full flex justify-end">
              <button
                className="bg-green-400 shadow-md rounded-md w-20 text-black hover:bg-green-300"
                type="submit"
              >
                Save
              </button>
            </div>
          ) : null}
        </form>
        {cardClicked ? (
          <div className="w-full flex justify-between mt-2 px-5 border-t-2 border-gray-300 pt-4">
            <div className="h-1 pb-2 pl-2 cursor-pointer">
              <img
                src={trash}
                alt="delete icon"
                onClick={(e) => deleteHandler(e)}
              />
            </div>
            <p
              onClick={() => setCardClicked(false)}
              className="text-red-400 font-sans uppercase cursor-pointer"
            >
              Close
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  error: state.note.error,
});

export default connect(mapStateToProps, { updateNote, deleteNote })(Card);
