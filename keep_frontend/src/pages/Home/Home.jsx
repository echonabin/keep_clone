import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getNotes } from "../../actions/note";
import { RootLayout } from "../../components/Layouts";
import { Searchbar, Card } from "../../utils";

const Home = ({ getNotes, token, notes }) => {
  useEffect(() => {
    getNotes(token);
  }, []);
  // Set user auth to true if token presented
  return (
    <RootLayout>
      <Searchbar />
      <div className="grid grid-cols-4 gap-4 mx-20 mt-10 mb-5">
        {notes.map((note) => {
          return (
            <Card
              noteTitle={note.title}
              noteDescription={note.description}
              key={note._id}
              id={note._id}
            />
          );
        })}
      </div>
    </RootLayout>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  notes: state.note.notes,
});

export default connect(mapStateToProps, { getNotes })(Home);
