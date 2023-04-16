const socketClient = io()
setInterval(function () {
	socketClient.emit("refreshUsage", { placeholder: "" })
}, 1500)
socketClient.on("refreshUsage", (response) => {
	document.getElementById("para").innerHTML = response
})
