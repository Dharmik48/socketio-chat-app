let socket = io()

const idEl = document.getElementById('socket-id')
const form = document.getElementById('form')
const ulEl = document.getElementById('message-box')

const conBtn = document.getElementById('connect-btn')
const disconBtn = document.getElementById('disconnect-btn')

const senderCSS = 'ml-auto py-1 px-3 bg-neutral-400 w-fit rounded-full'
const receiverCSS = 'py-1 px-3 bg-blue-400 w-fit rounded-full'

function sendMessage(message) {
	socket.emit('message', message)
}

function createMessageElement(message, css) {
	const li = document.createElement('li')
	li.textContent = message
	li.classList = css

	return li
}

form.addEventListener('submit', e => {
	e.preventDefault()

	const message = e.target.msg.value
	const li = createMessageElement(message, senderCSS)
	sendMessage(message)
	ulEl.appendChild(li)

	e.target.msg.value = ''
})

conBtn.addEventListener('click', () => {
	conBtn.classList.add('hidden')
	disconBtn.classList.remove('hidden')

	if (socket.connected) return
	socket.connect()
})

disconBtn.addEventListener('click', () => {
	disconBtn.classList.add('hidden')
	conBtn.classList.remove('hidden')

	if (!socket.connected) return
	socket.disconnect()
	idEl.textContent = null
})

socket.on('welcome', data => {
	idEl.textContent = data

	socket.emit('thankyou', 'Thanks for having me!')
})

socket.on('message', message => {
	const li = createMessageElement(message, receiverCSS)
	ulEl.appendChild(li)
})

socket.on('new-user-joined', id => {
	const li = createMessageElement(
		`${id} joined the chat.`,
		'text-xs text-center text-green-500'
	)
	ulEl.appendChild(li)
})

socket.on('user-disconnected', id => {
	const li = createMessageElement(
		`${id} left the chat.`,
		'text-xs text-center text-red-500'
	)
	ulEl.appendChild(li)
})
