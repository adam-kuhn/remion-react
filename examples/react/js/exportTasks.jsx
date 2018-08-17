var app = app || {};

(function () {
  'use strict'

  app.ExportTasks = React.createClass({
    click: function () {
      let rows = [['Task Name', 'Task Complete', 'Task Priority']]
      let csvContent = 'data:text/csv;charset=utf-8,'
      const todos = this.props.todos
      
      function compare (a, b) {
        if (a.priority < b.priority) {
          return -1
        }
        if (a.priority > b.priority) {
          return 1
        }
        return 0
      }
      todos.sort(compare)

      for (let todo of todos) {
        let row = [todo.title, todo.completed, todo.priority === 6 ? 'N/A' : todo.priority]
        rows.push(row)
      }
      rows.forEach(function (rowArray) {
        let row = rowArray.join(',')
        csvContent += row + '\r\n'
      })
      const encodedUri = encodeURI(csvContent)
      window.open(encodedUri)
    },

    render: function () {
      return (
        <button className='main-btn task-btn' type='button' onClick={this.click}>Download Task List</button>
      )
    }
  })
})()
