const { Test, User } = require("../models");

class TestController {
  async getAllTest(req, res) {
    try {
      const test = await Test.findAll({ include: User });
      return res.status(200).json({ test });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async getTestById(req, res) {
    try {
      const { id } = req.params;
      const test = await Test.findOne({
        where: { id: id },
        include: User,
      });

      if (test) {
        return res.status(200).json({ test });
      }
      return res.status(404).send("Test with the specified ID does not exist");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async createTest(req, res) {
    try {
      const test = await Test.create(req.body);
      if (ticket) {
        return res.status(201).json({ test });
      }
      throw new Error("Test creation failed");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async updateTest(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Test.update(req.body, { where: { id: id } });
      if (updated) {
        const updatedTest = await Test.findOne({
          where: { id: id },
          include: User,
        });
        return res.status(200).json({ test: updatedTest });
      }
      throw new Error(`Test with id of ${id} is not found`);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  async deleteTest(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Test.destroy({ where: { id: id } });
      if (deleted) {
        return res.status(204).send("Test deleted");
      }
      throw new Error("Test not found");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

module.exports = new TestController();
