var app = app || {};

(function () {
  'use strict'

  app.ExportTasks = React.createClass({
    click: function () {
      console.log('clicked')
    },

    render: function () {
      return (
        <button type='button' onClick={this.click}>Export</button>
      )
    }
  })
})()
