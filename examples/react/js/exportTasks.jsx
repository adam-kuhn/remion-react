var app = app || {};

(function () {
  'use strict'

  app.ExportTasks = React.createClass({
    click: function () {
      let rows = [['Task Name', 'Task Complete', 'Task Priority']]
      let csvContent = 'data:text/csv;charset=utf-8,'
      const todos = this.props.todos
      for (let todo of todos) {
        // let priority = todo.priority
        // if (priority === 6) {
        //   priority = 'N/A'
        // }
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
        <button type='button' onClick={this.click}>Export</button>
      )
    }
  })
})()
