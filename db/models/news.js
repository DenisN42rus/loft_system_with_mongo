const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema(
  {
    text: {
      type: String
    },
    title: {
      type: String
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user'
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const News = mongoose.model('new', newsSchema);

const getNews = async () => {
  const news = await News.find();
  return news.map((news) => serializeNews(news));
};

const createNews = async (data, user) => {
  const { title, text } = data;
  const news = new News({
    title,
    text,
    user
  });
  return await news.save();
};

const updateNews = async (id, data) => {
  return await News.findByIdAndUpdate({ _id: id }, { $set: data });
};

const deleteNews = async (id) => {
  return News.findByIdAndRemove({ _id: id });
};

const serializeNews = (news) => {
  return {
    id: news._id,
    title: news.title,
    text: news.text,
    created_at: news.created_at,
    user: news.user
  };
};

module.exports = {
  getNews,
  createNews,
  updateNews,
  deleteNews
};
