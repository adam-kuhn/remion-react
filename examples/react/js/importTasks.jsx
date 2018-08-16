var app = app || {};

(function () {
  'use strict'

  app.ImportTasks = React.createClass({
    handleFiles: function (files) {
      console.log('handle')
      if (window.FileReader) {
        console.log('here')
        this.getAsText(files)
      }
    },
    getAsText: function (fileToRead) {
      console.log('filetoread', fileToRead)
      const reader = new FileReader()
      reader.readAsText(fileToRead)
      reader.onload = this.loadHandler
      reader.onerror = this.errorHandler
    },
    loadHandler: function (e) {
      console.log('load')
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
      console.log(importedTodos)
      let todos = this.props.todos
      console.log(todos)
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
      console.log(todos)
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

// function getAsText (fileToRead) {
//   console.log('filetoread',fileToRead)
//   const reader = new FileReader()
//   // const blob = new Blob(fileToRead, {type: 'text/csv;charset=utf-8;'})
//   reader.readAsText(fileToRead)
//   // reader.readAsText(fileToRead)
//   reader.onload = loadHandler
//   reader.onerror = errorHandler
// }

// function loadHandler (event) {
//   console.log('load')
//   const csv = event.target.result
//   processData(csv)
// }

// function processData (csv) {
//   const allTextLines = csv.split(/\r\n|\n/)
//   const lines = []
//   for (let i = 0; i < allTextLines.length; i++) {
//     const data = allTextLines[i].split(';')
//     const tarr = []
//     for (let j = 0; j < data.length; j++) {
//       tarr.push(data[j])
//     }
//     lines.push(tarr)
//   }
//   const completeFile = lines.map(data => {
//     return data[0].split(',')
//   })
//   console.log(completeFile)
//   let todos = this.props.todos
//   console.log(todos)
// }

// function errorHandler (evt) {
//   if (evt.target.error.name === 'NotReadableError') {
//     alert('Can not read file!')
//   }
// }
