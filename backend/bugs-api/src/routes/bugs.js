const express = require("express");
const router = express.Router();
const BugController = require("../controllers/BugApi.controller");

router.route("/").get(BugController.getAllBugs).post(BugController.postBug);

router
  .route("/:id")
  .get(BugController.getBugById)
  .delete(BugController.deleteBug)
  .patch(BugController.updateBug);

module.exports = router;
