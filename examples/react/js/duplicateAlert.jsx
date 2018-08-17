var app = app || {};

(function () {
  'use strict'

  app.DuplicateAlert = React.createClass({
    render: function () {
      return (
        <div>
          {swal('Oops!', 'This task has already been entered. Please enter a new task.', 'info')
            .then(() => {
              if (this.props.reset) {
                this.props.reset()
              } else {
                this.props.preSetReset()
              }
            })}
        </div>
      )
    }
  })
})()
