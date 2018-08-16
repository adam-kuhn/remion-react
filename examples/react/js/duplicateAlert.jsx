var app = app || {};

(function () {
  'use strict'

  app.DuplicateAlert = React.createClass({
    render: function () {
      return (
        <div>
          <p>wired up</p>
          {/* {swal('Oops!', 'This task has already been entered. Please enter a new task.', 'info')
            .then(() => {
              this.props.reset()
            })} */}
        </div>
      )
    }
  })
})()

