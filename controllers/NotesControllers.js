const Notes = require("../models/Notes");
const User = require("../models/User");

module.exports.post_notes = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const newNote = {
      title,
      description,
      user: req.user.id,
    };
    const Note = new Notes(newNote);
    const note = await Note.save();
    res.json(note);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.get_all_notes = async (req, res, next) => {
  const userID = req.user.id;
  try {
    const notes = await Notes.find({ user: userID }).sort({ date: -1 });
    res.json(notes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.get_single_note = async (req, res, next) => {
  const noteId = req.params.id;
  try {
    const note = await Notes.findById(noteId);
    res.json(note);
  } catch (err) {
    if (err.kind === "objectId") {
      return res.status(400).json({ message: "No Note Found" });
    }
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.update_single_note = async (req, res, next) => {
  const noteId = req.params.id;
  const userID = req.user.id;
  const user = await User.findById(req.user.id).select("-password");
  const { title, description } = req.body;
  try {
    const note = await Notes.findById(noteId);
    if (note.user.toString() === user._id.toString()) {
      (note.title = title), (note.description = description);
    } else {
      res
        .status(400)
        .json({ message: "Can't update this post, permission deined" });
    }
    await note.save();
    res.status(200).json(await Notes.find({ user: userID }).sort({ date: -1 }));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.delete_single_note = async (req, res, next) => {
  const noteId = req.params.id;
  const user = await User.findById(req.user.id).select("-password");
  try {
    const note = await Notes.findById(noteId);
    if (note.user.toString() === user._id.toString()) {
      await Notes.findByIdAndDelete(noteId);
      res.status(201).json(await Notes.find({ user: req.user.id }));
    } else {
      res
        .status(301)
        .json({ message: "Can't delete the post, Permission denied`" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
