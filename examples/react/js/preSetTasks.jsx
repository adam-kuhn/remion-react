var app = app || {};

(function () {
  'use strict'

  app.PreSetTasks = React.createClass({
    getInitialState: function () {
      return {
        showMenu: false,
        preSet: []
      }
    },

    componentDidMount: function () {
      fetch('https://storage.googleapis.com/remion-rekry/tasks.json')
        .then(result => {
          return result.json()
        })
        .then(data => {
          const preSets = data.map((todo, idx) => {
            return (
              <button key={`presets${idx}`} type='button' onClick={this.selectTask}
                value={todo.text}
                data-complete={todo.isComplete}
                data-priority={todo.priority}>{`Task: ${todo.text} Priority: ${todo.priority}`}</button>
            )
          })
          this.setState({
            preSets
          })
        })
    },

    openMenu: function () {
      const openClose = this.state.showMenu
      this.setState({
        showMenu: !openClose
      })
    },
    selectTask: function (event) {
      const todos = this.props.todos
      const newTodo = {
        title: event.target.value,
        id: event.target.key,
        timeStamp: '',
        priority: Number(event.target.getAttribute('data-priority')),
        completed: event.target.getAttribute('data-complete') === 'true'
      }
      todos.push(newTodo)
      this.props.update()
      this.setState({
        showMenu: false
      })
    },
    render: function () {
      return (
        <div className='priority'>
          <button className='main-btn' type='button' onClick={this.openMenu}>Pre Set</button>
          {this.state.showMenu &&
            <div className='drop-down'>
              {this.state.preSets}
            </div>}
        </div>
      )
    }
  })
})()
