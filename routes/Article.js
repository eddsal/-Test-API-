const { Article } = require("../models");
const router = require("express").Router();

router.get("/", async (req, res) => {
  const articles = await Article.findAll({
    where: req.query,
  });
  res.json(articles);
});

router.get("/:id", async (req, res) => {
  const article = await Article.findByPk(req.params.id);
  if (article) res.json(article);
  else res.sendStatus(404);
});

router.post("/", async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      res.status(400).json(err.errors);
    } else {
      res.sendStatus(500);
      console.error(err);
    }
  }
});

router.put("/:id", async (req, res) => {
  try {
    const [nb, [data]] = await Article.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    if (nb === 1) res.json(data);
    else res.sendStatus(404);
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      res.status(400).json(err.errors);
    } else {
      res.sendStatus(500);
      console.error(err);
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const [nb] = await Article.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (nb) res.sendStatus(204);
    else res.sendStatus(404);
  } catch (err) {
    res.sendStatus(500);
    console.error(err);
  }
});

module.exports = router;
