var app = app || {};

(function () {
  'use strict'

  app.PriorityDropDown = React.createClass({
    getInitialState: function () {
      return {
        showMenu: false
      }
    },

    componentDidMount: function () {
      if (!this.props.todo.priority) {
        this.props.todo.priority = 6
      }
    },

    openMenu: function () {
      const openClose = this.state.showMenu
      this.setState({
        showMenu: !openClose
      })
    },
    setPriority: function (event) {
      this.props.todo.priority = Number(event.target.value)
      this.props.update()
      this.setState({
        showMenu: false
      })
    },
    render: function () {
      let Priority = []
      for (let i = 0; i < this.props.priority; i++) {
        Priority.push(<button key={`p${i}`} type='button' onClick={this.setPriority} value={i + 1}>{i + 1}</button>)
      }
      return (
        <div>
          <button type='button' onClick={this.openMenu}>Priority</button>
          <p>{this.props.todo.priority === 6 ? '' : this.props.todo.priority}</p>
          {this.state.showMenu &&
            <div className='drop-down'>
              {Priority}
            </div>}
        </div>
      )
    }
  })
})()
