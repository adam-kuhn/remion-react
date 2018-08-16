
//     componentDidMount: function () {
//       // fetch('https://storage.googleapis.com/remion-rekry/tasks.json')
//       //   .then(result => {
//       //     console.log(result.json())
//       //   })
//       // this is what the API call will get...on a plane/no wifi


var app = app || {};

(function () {
  'use strict'

  app.PreSetTasks = React.createClass({
    getInitialState: function () {
      return {
        showMenu: false,
        preSet: []
      }
    },

    componentDidMount: function () {
      this.setState({
        preSet: [
          {
            priority: 1,
            isComplete: false,
            text: 'Go to sleep'
          },
          {
            priority: 5,
            isComplete: false,
            text: 'Clean up room'
          },
          {
            priority: 3,
            isComplete: false,
            text: 'Go to shower'
          },
          {
            priority: 5,
            isComplete: false,
            text: 'Eat something'
          }
        ]
      })
    },

    openMenu: function () {
      const openClose = this.state.showMenu
      this.setState({
        showMenu: !openClose
      })
    },
    selectTask: function (event) {
      console.log(event.target.value)
      const complete = event.target.getAttribute('data-complete')
      const priority = event.target.getAttribute('data-priority')
      console.log(complete, priority)
      this.props.update()
      this.setState({
        showMenu: false
      })
    },
    render: function () {
      const SetTasks = this.state.preSet.map((todo, idx) => {
        return (
          <button key={`presets${idx}`} type='button' onClick={this.selectTask} 
          value={todo.text}
          data-complete={todo.isComplete}
          data-priority={todo.priority}>{`Task: ${todo.text} Priority: ${todo.priority}`}</button>
        )
      } )
      return (
        <div className='priority'>
          <button className='main-btn' type='button' onClick={this.openMenu}>Pre Set</button>
          {this.state.showMenu &&
            <div className='drop-down'>
              {SetTasks}
            </div>}
        </div>
      )
    }
  })
})()
