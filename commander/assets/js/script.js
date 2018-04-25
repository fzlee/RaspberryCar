new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  }
})

let socket = io({
  path: '/commander.io',
  query: {
    role: 'commander'
  }
});

window.onkeypress = function (e) {
  var key = e.keyCode ? e.keyCode : e.which;
  // up right down left
  console.log(e)
  if (key === 38) {
    socket.emit('move', {
      direction: 'up'
    })
  } else if (key === 39 ) {
    socket.emit('move', {
      direction: 'right'
    })
  } else if (key === 40) {
    socket.emit('move', {
      direction: 'down'
    })
  } else if (key === 37) {
    socket.emit('move', {
      direction: 'left'
    })
  } else if (key === 0) {
    socket.emit('move', {
      direction: null
    })
  }
}

window.onkeyup = function (e) {
  // stop
  var key = e.keyCode ? e.keyCode : e.which;
  if ([0, 37, 38, 39, 40].includes(key)) {
    socket.emit('move', {
      direction: null
    })
  } 
}

// mouse event
document.querySelectorAll('.go').forEach(function(item) {
  item.onmousedown = function () {

    document.querySelectorAll('.go').forEach(function(item) {
      item.style.color = '#adb5bd'
    })

    item.style.color = '#ff0000'
    console.log(item)
    console.log(item.getAttribute("dataDirection"))
    socket.emit('move', {
      direction: item.getAttribute('data-direction') || null
    })
  }

  // // 释放
  // item.onmouseup = function () {
  //   item.style.color = '#adb5bd'
  //   socket.emit('move', {
  //     direction: null
  //   })
  // }
})

