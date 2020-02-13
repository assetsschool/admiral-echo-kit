// Created by Iain Moncrief at 2020/02/12 12:58.
// 
// Email - iainmoncrief@gmail.com


const WebSocket = require('ws')

const ws = new WebSocket('ws://www.host.com/path')

ws.on('open', function open() {
    ws.send('something')
})

ws.on('message', function incoming(data) {
    console.log(data)
})