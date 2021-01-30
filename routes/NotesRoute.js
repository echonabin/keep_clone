const router = require("express").Router();
const NotesControllers = require("../controllers/NotesControllers");
const auth = require("../middleware/auth");
const {
  validateCreateNote,
} = require("../middleware/validators/note-validator");

// @method POST
// path: /api/notes
// desc: post a single note
router.post("/", auth, validateCreateNote, NotesControllers.post_notes);

// @method GET
// path: /api/notes
// desc: get all notes
router.get("/", auth, NotesControllers.get_all_notes);
// @method GET
// path: /api/notes/:id
// desc: get single note
router.get("/:id", NotesControllers.get_single_note);
// @method PUT
// path: /api/notes/:id
// desc: update single note
router.put(
  "/:id",
  auth,
  validateCreateNote,
  NotesControllers.update_single_note
);
// @method delete
// path: /api/notes/:id
// desc: delete single note
router.delete("/:id", auth, NotesControllers.delete_single_note);

module.exports = router;
