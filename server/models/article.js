const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('slug');

const TagSchema = new Schema({
  tag: {
    type: String,
  }
});

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    // max: 50,
  },
  slug: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
    required: true
  },
  body: {
    type: String,
    required: true
  },
  tags: {
    type: [TagSchema]
  }
});

ArticleSchema.statics.addArticle = function(args) {
  const Article = mongoose.model('article');

  // Creates the slug for each article
  let createSlug = args.title;
  articleSlug = slug(createSlug, {lower: true});

  const article = new Article({ title: args.title, slug: articleSlug, body: args.body, tags: args.tags });

  // console.log(article);
  console.log(Date.now());
  return article;
}

mongoose.model('tag', TagSchema);
mongoose.model('article', ArticleSchema);
