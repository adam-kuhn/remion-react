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
    },
    render: function () {
      let Priority = []
      for (let i = 0; i < this.props.priority; i++) {
        Priority.push(<button key={`p${i}`} type='button' onClick={this.setPriority} value={i + 1}>{i + 1}</button>)
      }
      return (
        <div>
          <button type='button' onClick={this.openMenu}>Priority</button>
          {this.state.showMenu && Priority}
        </div>
      )

      //     {/* <button type='button' onClick={this.setPriority} value={2}>2</button>
      //     <button type='button' onClick={this.setPriority} value={3}>3</button>
      //     <button type='button' onClick={this.setPriority} value={4}>4</button>
      //     <button type='button' onClick={this.setPriority} value={5}>5</button> */}
      // )
    }
  })
})()
