import axios from 'axios';
import _ from 'lodash';

export default {
  state: {
    articles: [],
  },
  mutations: {
    SET_ARTICLES(state, value) {
      state.articles = value
    },

    PUT_ARTICLES(state, value) {
      state.articles = _.concat(state.articles, value)
    }
  },

  actions: {
    getArticle({ state, commit }, options) {
      if (options.type == 'waterfall') {
        let list = [];
        for (var i = 0; i < 10; i++) {
          list.push({
            id: state.articles.length + i,
            height: 300 + Math.random() * 100,
            title: '文章标题',
            abstract: '这是一篇文章'
          })
        }
        commit("PUT_ARTICLES", list)
      }

    }
  }
}