// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.scss"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
    import socket from "./socket"
//
import "phoenix_html"


let channel = socket.channel('room:lobby', {}); // connette alla chat 'room'

channel.on('shout', function (payload) { // in ascolto all'evento'shout' 
  let li = document.createElement("li"); // lista oggetti dove teniamo i messaggi
  let name = payload.name || 'guest';    // settiamo il nome dal carico oppure ne mettiamo uno di default
  li.innerHTML = '<b>' + name + '</b>: ' + payload.message + '</br>'; // settiamo il contenuto di li con il nome e il carico del mess
  ul.appendChild(li);                    
});

channel.join(); // entriamo nel canale


let ul = document.getElementById('msg-list');        // lista dei messaggi.
let name = document.getElementById('name');          // nome di chi manda il messaggio
let msg = document.getElementById('msg');            // campo input messaggio

// evento di ascolto per press di invio per mandare il messaggio
msg.addEventListener('keypress', function (event) {
  if (event.keyCode == 13 && msg.value.length > 0) { // non mandare messaggi vuoti
    channel.push('shout', { // pushiamo il messaggio al server
      name: name.value,     // otteniamo il valore del nome di chi manda il messaggio
      message: msg.value    // valore messaggio 
    });
    msg.value = '';         
  }
});