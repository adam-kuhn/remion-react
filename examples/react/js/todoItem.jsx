/* jshint quotmark: false */
/* jshint white: false */
/* jshint trailing: false */
/* jshint newcap: false */
/* global React */

var app = app || {};

(function () {
  'use strict'

  var ESCAPE_KEY = 27
	var ENTER_KEY = 13

  const AreYouSure = React.createClass({
    render: function () {
      return (
        <div>
          {/* {swal({
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
            })} */}
        </div>
      )
    }
  })
  app.TodoItem = React.createClass({
    handleSubmit: function (event) {
      var val = this.state.editText.trim()
      if (val) {
        this.props.onSave(val)
        this.setState({editText: val})
      } else {
        this.props.onDestroy()
      }
    },

    handleEdit: function () {
      this.props.onEdit()
      this.setState({editText: this.props.todo.title})
    },

    handleKeyDown: function (event) {
      if (event.which === ESCAPE_KEY) {
        this.setState({editText: this.props.todo.title})
        this.props.onCancel(event)
      } else if (event.which === ENTER_KEY) {
        this.handleSubmit(event)
      }
    },

    handleChange: function (event) {
      if (this.props.editing) {
        this.setState({editText: event.target.value})
      }
    },

    getInitialState: function () {
      return {editText: this.props.todo.title,
        areYouSure: false}
    },

    /**
		 * This is a completely optional performance enhancement that you can
		 * implement on any React component. If you were to delete this method
		 * the app would still work correctly (and still be very performant!), we
		 * just use it as an example of how little code it takes to get an order
		 * of magnitude performance improvement.
		 */
    shouldComponentUpdate: function (nextProps, nextState) {
      return (
        nextProps.todo !== this.props.todo ||
				nextProps.editing !== this.props.editing ||
				nextState.editText !== this.state.editText ||
				nextState.areYouSure !== this.state.areYouSure
      )
    },

    /**
		 * Safely manipulate the DOM after updating the state when invoking
		 * `this.props.onEdit()` in the `handleEdit` method above.
		 * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
		 * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
		 */
    componentDidUpdate: function (prevProps) {
      if (!prevProps.editing && this.props.editing) {
        var node = React.findDOMNode(this.refs.editField)
        node.focus()
        node.setSelectionRange(node.value.length, node.value.length)
      }
    },
    areYouSure: function () {
      this.setState({
        areYouSure: true
      })
    },
    reset: function () {
      this.setState({
        areYouSure: false
      })
    },

    render: function () {
      return (
        <div className='todo'>
          <li className={classNames({
            completed: this.props.todo.completed,
            editing: this.props.editing
          })}>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                checked={this.props.todo.completed}
                onChange={this.props.onToggle}
              />
              <label onDoubleClick={this.handleEdit}>
                {this.props.todo.title}
              </label>
              {this.props.todo.timeStamp && <p>Time Completed: {this.props.todo.timeStamp}</p>}
              <button className='destroy' onClick={this.areYouSure} />
              {this.state.areYouSure && <AreYouSure destroy={this.props.onDestroy}
                reset={this.reset} />}
            </div>
            <input
              ref="editField"
              className="edit"
              value={this.state.editText}
              onBlur={this.handleSubmit}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
          </li>
        </div>
      )
    }
  })
})()
