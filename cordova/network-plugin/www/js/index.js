console.log("Script iniciado");

document.addEventListener('deviceready', onDeviceReady, false);

console.log("Ponto A: Antes da função X");
function onDeviceReady() {
    checkConnection();

    // Verifica a cada 5 segundos
    setInterval(checkConnection, 5000);
}
console.log("Ponto b: Antes da função X");
function checkConnection() {
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (connection) {
        var type = connection.type;

        if (type === 'none') {
            updateConnectionStatus('Sem Conexão à Internet');
        } else {
            updateConnectionStatus('Conectado à Internet');
        }
    } else {
        alert('A API navigator.connection não está disponível.');
    }
}
console.log("Ponto c: Antes da função X");
function updateConnectionStatus(status) {
    // Atualiza o elemento HTML com o status da conexão
    var connectionStatusElement = document.getElementById('connectionStatus');
    if (connectionStatusElement) {
        connectionStatusElement.innerText = status;
    } else {
        alert('Element with ID "connectionStatus" not found.');
    }
}

