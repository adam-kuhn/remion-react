var app = app || {};

(function () {
  'use strict'

  app.Utils = {
    uuid: function () {
      /* jshint bitwise:false */
      var i, random
      var uuid = ''

      for (i = 0; i < 32; i++) {
        // this the '|' is the same as Math.floor
        // and sets the range so all numbers will be between 0 and 16
        random = Math.random() * 16 | 0
        // after 8, every 4th number have a -
        if (i === 8 || i === 12 || i === 16 || i === 20) {
          uuid += '-'
        }
        // not sure exactly what "random & 3 | 8" does, but it
        // is the same as Math.random() & 16 | 0 & 3 | 8, when run
        // in node I get numbers from 8-15, so not sure what the 3 is doing
        uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
          .toString(16)
      }

      return uuid
    },

    pluralize: function (count, word) {
      return count === 1 ? word : word + 's'
    },

    store: function (namespace, data) {
      if (data) {
        return localStorage.setItem(namespace, JSON.stringify(data))
      }

      var store = localStorage.getItem(namespace)
      return (store && JSON.parse(store)) || []
    },

    extend: function () {
      var newObj = {}
      for (var i = 0; i < arguments.length; i++) {
        var obj = arguments[i]
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key]
          }
        }
      }
      return newObj
    }
  }
})()
