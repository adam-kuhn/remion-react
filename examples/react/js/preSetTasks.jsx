var app = app || {};

(function () {
  'use strict'

  app.PreSetTasks = React.createClass({
    componentDidMount: function () {
      fetch('https://storage.googleapis.com/remion-rekry/tasks.json')
        .then(result => {
          console.log(result.json())
        })
    },
    render: function () {
      return (
        <p>preset</p>
      )
    }
  })
})()
