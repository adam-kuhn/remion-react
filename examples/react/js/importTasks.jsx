var app = app || {};

(function () {
  'use strict'

  app.ImportTasks = React.createClass({
    handleFiles: function (files) {
      if (window.FileReader) {
        this.getAsText(files)
      }
    },
    getAsText: function (fileToRead) {
      const reader = new FileReader()
      reader.readAsText(fileToRead)
      reader.onload = this.loadHandler
      reader.onerror = this.errorHandler
    },
    loadHandler: function (e) {
      const csv = e.target.result
      this.processData(csv)
    },
    processData: function (csv) {
      const allTextLines = csv.split(/\r\n|\n/)
      const lines = []
      for (let i = 0; i < allTextLines.length; i++) {
        const data = allTextLines[i].split(';')
        const tarr = []
        for (let j = 0; j < data.length; j++) {
          tarr.push(data[j])
        }
        lines.push(tarr)
      }
      const importedTodos = lines.map(data => {
        return data[0].split(',')
      })
      importedTodos.shift()
      let todos = this.props.todos
      for (let todo of importedTodos) {
        let newTodo = {
          title: todo[0],
          id: todo[0],
          timeStamp: '',
          priority: todo[2],
          completed: todo[1] === 'yes'
        }
        todos.push(newTodo)
      }
      this.props.update()
    },
    errorHandler: function (e) {
      if (e.target.error.name === 'NotReadableError') {
        alert('Can not read file!')
      }
    },
    render: function () {
      return (
        <div>
          <input
            type='file'
            id='csvFileInput'
            onChange={e => this.handleFiles(e.target.files[0])}
            accept='.csv'/>
        </div>
      )
    }
  })
})()
