const express = require('express')
const socketio = require('socket.io')

const app = express()
app.use(express.static('public'))

const server = app.listen('3000')

const io = socketio(server)

io.on('connect', socket => {
	console.log(socket.id, ' connected')

	socket.emit('welcome', socket.id)
	socket.broadcast.emit('new-user-joined', socket.id)
	socket.on('message', msg => socket.broadcast.emit('message', msg))

	socket.on('disconnect', () => {
		io.emit('user-disconnected', socket.id)
	})
})
