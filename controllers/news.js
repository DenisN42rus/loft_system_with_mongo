const News = require('../db/models/news');
const tokens = require('../libs/tokens');

const getNewsCtrl = async (req, res, next) => {
  try {
    const news = await News.getNews();
    return res.json(news);
  } catch (e) {
    next(e);
  }
};

const addNewsCtrl = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    const user = await tokens.getUserByToken(token);
    await News.createNews(req.body, user);
    const news = await News.getNews();
    res.status(201).json(news);
  } catch (e) {
    next(e);
  }
};

const updateNewsCtrl = async (req, res, next) => {
  try {
    await News.updateNews(req.params.id, req.body);
    const news = await News.getNews();
    res.json(news);
  } catch (e) {
    next(e);
  }
};

const deleteNewsCtrl = async (req, res, next) => {
  try {
    await News.deleteNews(req.params.id);
    const news = await News.getNews();
    res.json(news);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getNewsCtrl,
  addNewsCtrl,
  updateNewsCtrl,
  deleteNewsCtrl
};
