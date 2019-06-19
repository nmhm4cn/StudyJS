'use strict'

let vm = new Vue({
  el: '#app',
  data: {
    newItem: '',
    todos: []
  },
  watch: {
    todos: {
      handler: function() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
      },
      deep: true
    }
  },
  mounted: function() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
  },
  methods: {
    addItem: function() {
      let item = {
        title: this.newItem,
        isDone: false
      };
      this.todos.push(item);
      this.newItem = '';
    },
    deleteItem: function(index) {
      if(confirm('削除しますか？')) {
        this.todos.splice(index, 1);
      }
    },
    parge: function() {
      if(confirm('完了したタスクを全て削除しますか？')) {
        this.todos = this.todos.filter(function (todo) {
          return !todo.isDone;
        });
      }
      return;
    }
  },
  computed: {
    remaining: function() {
      let items = this.todos.filter(function (todo) {
        return !todo.isDone;
      });
      return items;
    }
  }
});