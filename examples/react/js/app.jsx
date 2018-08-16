/* jshint quotmark:false */
/* jshint white:false */
/* jshint trailing:false */
/* jshint newcap:false */
/* global React, Router */
var app = app || {};

(function () {
  'use strict'
  app.ALL_TODOS = 'all'
  app.ACTIVE_TODOS = 'active'
  app.COMPLETED_TODOS = 'completed'
  var TodoFooter = app.TodoFooter
  var TodoItem = app.TodoItem
  var DuplicateAlert = app.DuplicateAlert
  var PriorityDropDown = app.PriorityDropDown
  var ImportTasks = app.ImportTasks
  var ExportTasks = app.ExportTasks

  var ENTER_KEY = 13

  var TodoApp = React.createClass({
    getInitialState: function () {
      return {
        nowShowing: app.ALL_TODOS,
        editing: null,
        newTodo: '',
        update: 1
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
        this.setState({newTodo: '',
          duplicate: true})
      } else if (val) {
        this.props.model.addTodo(val)
        this.setState({newTodo: '',
          duplicate: false})
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
      this.props.model.save(todoToSave, text)
      this.setState({editing: null})
    },

    cancel: function () {
      this.setState({editing: null})
    },

    clearCompleted: function () {
      this.props.model.clearCompleted()
    },

    resetDuplicate: function () {
      this.setState({
        duplicate: false
      })
    },

    update: function () {
      const val = this.state.update * -1
      this.setState({
        update: val
      })
    },

    render: function () {
      var footer
      var main
      var todos = this.props.model.todos

      var shownTodos = todos.filter(function (todo) {
        switch (this.state.nowShowing) {
          case app.ACTIVE_TODOS:
            return !todo.completed
          case app.COMPLETED_TODOS:
            return todo.completed
          default:
            return true
        }
      }, this)
      function compare (a, b) {
        if (a.priority < b.priority) {
          return -1
        }
        if (a.priority > b.priority) {
          return 1
        }
        return 0
      }
      shownTodos.sort(compare)
      var todoItems = shownTodos.map(function (todo) {
        return (
          <div className='todo-item'>
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
              />
            </div>
            <div>
              <PriorityDropDown todo={todo} update={this.update} priority={5}/>
            </div>
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
            <ImportTasks todos={todos} update={this.update}/>
            <ExportTasks todos={todos}/>
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

            {this.state.duplicate && <DuplicateAlert reset={this.resetDuplicate}/>}
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
