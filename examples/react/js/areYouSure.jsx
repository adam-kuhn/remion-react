var app = app || {};

(function () {
  'use strict'

  app.AreYouSure = React.createClass({
    render: function () {
      return (
        <div>
          {swal({
              title: 'Are you sure?',
              text: 'This item will be permanently deleted!',
              icon: 'warning',
              buttons: true,
              dangerMode: true
            })
              .then((yesDelete) => {
                if (yesDelete) {
                  this.props.destroy()
                  swal('POOF!', 'The task is gone.', 'success')
                  this.props.reset()
                } else {
                  swal('OK!', 'You will finish this task one day...', 'info')
                  this.props.reset()
                }
              })}
        </div>
      )
    }
  })
})()
