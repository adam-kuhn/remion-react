/* jshint quotmark:false */
/* jshint white:false */
/* jshint trailing:false */
/* jshint newcap:false */
/* global React, Router */
var app = app || {};

(function () {
  'use strict'
  // actions?
  app.ALL_TODOS = 'all'
  app.ACTIVE_TODOS = 'active'
  app.COMPLETED_TODOS = 'completed'
  var TodoFooter = app.TodoFooter
  var TodoItem = app.TodoItem

  var NewComponent = React.createClass({
    logOnClick: function () {
      console.log('button was clicked')
    },
    render: function () {
      return (
        <div>
          <p>this is a new component</p>
          <button type='button' onClick={this.logOnClick}>Test Button </button>
        </div>
      )
    }
  })
  var ENTER_KEY = 13
  // class based component being created
  var TodoApp = React.createClass({
    getInitialState: function () {
      // creating state
      return {
        nowShowing: app.ALL_TODOS,
        editing: null,
        newTodo: ''
      }
    },

    componentDidMount: function () {
      var setState = this.setState
      var router = Router({
        '/': setState.bind(this, {nowShowing: app.ALL_TODOS}),
        '/active': setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
        '/completed': setState.bind(this, {nowShowing: app.COMPLETED_TODOS})
      })
      router.init('/')
    },

    handleChange: function (event) {
      this.setState({newTodo: event.target.value})
    },

    handleNewTodoKeyDown: function (event) {
      if (event.keyCode !== ENTER_KEY) {
        return
      }

      event.preventDefault()

      var val = this.state.newTodo.trim()
      const todos = this.props.model.todos
      const duplicate = todos.filter(todo => {
        return todo.title === val
      })
      if (duplicate.length >= 1) {
        this.setState({duplicate: 'This task has already been added. Please add a new task.'})
      } else if (val) {
        this.props.model.addTodo(val)
        this.setState({newTodo: '',
          duplicate: ''})
      }
    },

    toggleAll: function (event) {
      var checked = event.target.checked
      this.props.model.toggleAll(checked)
    },

    toggle: function (todoToToggle) {
      this.props.model.toggle(todoToToggle)
    },

    destroy: function (todo) {
      this.props.model.destroy(todo)
    },

    edit: function (todo) {
      this.setState({editing: todo.id})
    },

    save: function (todoToSave, text) {
      // const allTodos = this.props.model.todos
      // let duplicate = allTodos.filter(todo => {
      //   return todo.title === text
			// })
			// console.log('dupe', duplicate)
      // if (duplicate.length >= 1) {
      //   console.log('here')
      //   this.setState({
      //     editDupe: 'This task you are editing already exists'
      //   })
      // } else {
      //   this.props.model.save(todoToSave, text)
      //   this.setState({editing: null,
      //     editDupe: ''})
			// }
			this.props.model.save(todoToSave, text)
			this.setState({editing: null,
				editDupe: ''})
    },

    cancel: function () {
      this.setState({editing: null})
    },

    clearCompleted: function () {
      this.props.model.clearCompleted()
    },

    render: function () {
      var footer
      var main
      var todos = this.props.model.todos

      var shownTodos = todos.filter(function (todo) {
        switch (this.state.nowShowing) {
          // show todos that are not completed
          case app.ACTIVE_TODOS:
            return !todo.completed
            // show todos that are completed
          case app.COMPLETED_TODOS:
            return todo.completed
            // show all
          default:
            return true
        }
      }, this)

      var todoItems = shownTodos.map(function (todo) {
        return (
          <div>
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={this.toggle.bind(this, todo)}
              onDestroy={this.destroy.bind(this, todo)}
              onEdit={this.edit.bind(this, todo)}
              editing={this.state.editing === todo.id}
              onSave={this.save.bind(this, todo)}
							onCancel={this.cancel}
							todos={todos}
            />
          </div>
        )
      }, this)

      var activeTodoCount = todos.reduce(function (accum, todo) {
        return todo.completed ? accum : accum + 1
      }, 0)

      var completedCount = todos.length - activeTodoCount

      if (activeTodoCount || completedCount) {
        footer =
					<TodoFooter
					  count={activeTodoCount}
					  completedCount={completedCount}
					  nowShowing={this.state.nowShowing}
					  onClearCompleted={this.clearCompleted}
					/>
      }

      if (todos.length) {
        main = (
          <section className="main">
            <input
              id="toggle-all"
              className="toggle-all"
              type="checkbox"
              onChange={this.toggleAll}
              checked={activeTodoCount === 0}
            />
            <label
              htmlFor="toggle-all"
            />
            <ul className="todo-list">
              {todoItems}
            </ul>
          </section>
        )
      }

      return (
        <div>
          <header className="header">
            <div className="title">
              <img src='./styles/images/logo_remion.png' />
              <h1>My Tasks</h1>
            </div>
            <p>{this.state.duplicate}</p>
            <p>{this.state.editDupe}</p>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={this.state.newTodo}
              onKeyDown={this.handleNewTodoKeyDown}
              onChange={this.handleChange}
              autoFocus={true}
            />
          </header>
          {main}
          {footer}
        </div>
      )
    }
  })

  var model = new app.TodoModel('react-todos')

  function render () {
    React.render(
      <TodoApp model={model}/>,
      document.getElementsByClassName('todoapp')[0]
    )
  }

  model.subscribe(render)
  render()
})()
