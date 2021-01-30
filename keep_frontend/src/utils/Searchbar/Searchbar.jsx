import React, { useState } from "react";
import { connect } from "react-redux";
import { addNote } from "../../actions/note";
import Textarea from "react-textarea-autosize";

const Searchbar = ({ addNote, token }) => {
  const [inputClicked, setInputClicked] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const { title, description } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addNote({ title, description }, token);
    setFormData({ title: "", description: "" });
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <div
        className={
          inputClicked ? "w-6/12 shadow-md px-4 pt-2 transition-all" : "w-6/12"
        }
      >
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => onChange(e)}
            placeholder={inputClicked ? "Title" : "Title"}
            className={
              inputClicked
                ? "inline-block w-full appearance-none  rounded-md py-2 px-3 mb-2 text-gray-400 focus:outline-none focus:bg-white focus:text-gray-700 focus:placeholder-gray-700 bg-white font-semibold"
                : "inline-block w-full shadow-md appearance-none border rounded-md py-2 px-3 mb-2 text-gray-400 focus:outline-none focus:bg-white focus:text-gray-700 focus:placeholder-gray-700 bg-white font-semibold"
            }
            onClick={() => setInputClicked(true)}
          />
          {inputClicked ? (
            <>
              <Textarea
                type="text"
                id="description"
                value={description}
                onChange={(e) => onChange(e)}
                placeholder="Take a note..."
                className={
                  inputClicked
                    ? "inline-block w-full appearance-none rounded-md py-2 px-3 mb-2 text-gray-400 focus:outline-none focus:bg-white focus:text-gray-700 focus:placeholder-gray-700 bg-white font-normal"
                    : "inline-block w-full appearance-none border rounded-md py-2 px-3 mb-2 text-gray-400 focus:outline-none focus:bg-white focus:text-gray-700 focus:placeholder-gray-700 bg-white font-semibold"
                }
              />
              <div className="mt-5 flex justify-end space-x-3">
                <button
                  className="text-gray-700 font-sans font-medium text-base uppercase py-2 cursor-pointer hover:text-gray-500 focus:outline-none"
                  type="submit"
                >
                  Save
                </button>
                <p
                  className="text-gray-700 font-sans font-medium text-base uppercase py-2 cursor-pointer hover:text-gray-500"
                  onClick={() => setInputClicked(false)}
                >
                  Close
                </p>
              </div>
            </>
          ) : null}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, { addNote })(Searchbar);
