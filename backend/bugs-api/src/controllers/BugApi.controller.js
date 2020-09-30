const Controller = require("./controller");
const BugSchema = require("./../models/bugApi.model");

class BugController extends Controller {
  async getAllBugs(req, res) {
    const allBugs = await BugSchema.find();
    res.json(allBugs);
  }
  async postBug(req, res) {
    const { description, resolved, userId } = req.body;
    const newBug = await new BugSchema({ userId, description, resolved });
    newBug.save();
    res.json(newBug);
  }

  async deleteBug(req, res) {
    const { id } = req.params;
    await BugSchema.findByIdAndDelete(id);
    res.json([]);
  }
  async updateBug(req, res) {
    const { id } = req.params;
    await BugSchema.findByIdAndUpdate(id, {
      ...req.body,
    });
    const updatedBug = await BugSchema.findById(id);
    res.json(updatedBug);
  }
  async getBugById(req, res) {
    const { id } = req.params;
    const bugById = await BugSchema.findById(id);
    res.json(bugById);
  }
}

module.exports = new BugController();
