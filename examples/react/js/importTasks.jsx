var app = app || {};

(function () {
  'use strict'

  app.ImportTasks = React.createClass({
    handleFiles: function (event) {
      console.log(event.target.value[0])
      console.log('handle')
      if (window.FileReader) {
        console.log('here')
        getAsText(files[0])
      }
    },
    render: function () {
      return (
        <div>
          <input
            type='file'
            id='csvFileInput'
            onChange={this.handleFiles}
            accept='.csv'/>
        </div>
      )
    }
  })
})()

function getAsText (fileToRead) {
  console.log('filetoread',fileToRead)
  const reader = new FileReader()
  const blob = new Blob(fileToRead, {type: 'text/csv;charset=utf-8;'})
  reader.readAsText(blob)
  // reader.readAsText(fileToRead)
  reader.onload = loadHandler
  reader.onerror = errorHandler
}

function loadHandler (event) {
  console.log('load')
  const csv = event.target.result
  processData(csv)
}

function processData (csv) {
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
  const completeFile = lines.map(data => {
    return data[0].split(',')
  })
  console.log(completeFile)
  // // remove the column titles from array. This makes it easier to run calculations
  // completeFile.shift()
  // const julyData = getJulyData(completeFile)
  // // display calculated values on the HTML page
  // document.getElementById('rainy-days').innerHTML = rainyDays(julyData)
  // document.getElementById('avg-temp').innerHTML = avgTemp(julyData)
}

function errorHandler (evt) {
  if (evt.target.error.name === 'NotReadableError') {
    alert('Can not read file!')
  }
}
