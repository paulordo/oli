document.addEventListener("DOMContentLoaded", function () {
    var inputElement = document.getElementById("gatinho_name");

    inputElement.addEventListener("keydown", function (event) {
        // Verifica se a tecla pressionada é a tecla Enter
        if (event.key === "Enter") {
            event.preventDefault();
            addnewcat();
        }
    });
});

function addnewcat() {
    console.log("addnewcat() called");

    var inputElement = document.getElementById("gatinho_name");
    var text = inputElement.value.trim();

    console.log("Input value:", text);

    if (text.length === 0) {
        console.log("Alert: Belo nome de gatinho");
        return;
    }

    var list = document.getElementById("list");
    var listItem = document.createElement("li");
    listItem.className = "list-item";

    listItem.onclick = function () {
        getCatImageAsJson()
            .then(json => {
                if (json && json.length > 0 && json[0].url) {
                    const imageUrl = json[0].url;
                    window.open(imageUrl, "_blank");
                } else {
                    console.error('Não achei a URL da imagem do gatinho :', json);
                    alert('Não achei a URL da imagem do gatinho :');
                }
            })
            .catch(error => {
                console.error('Erro ao obter imagem de gato:', error);
                alert('Erro ao obter imagem de gato.');
            });
    };

    listItem.textContent = text;

    list.appendChild(listItem);

    // Limpa o valor da caixa de entrada
    inputElement.value = "";

    // Foca novamente na caixa de texto
    inputElement.focus();

    // Mostra a linha com a classe "pedido" quando o primeiro gatinho é adicionado
    showPedidoLine();
}

function showPedidoLine() {
    var pedidoContainer = document.getElementById("pedidoContainer");
    var listItems = document.getElementsByClassName("list-item");

    // Oculta o pedidoContainer se não houver gatinhos na lista
    if (listItems.length === 0 && pedidoContainer) {
        pedidoContainer.style.display = "none";
    } else if (listItems.length > 0 && pedidoContainer) {
        pedidoContainer.style.display = "block";
    }
}

function getCatImageAsJson() {
    var apiKey = 'live_wjeibxKeu47nxrM6Nu6zJM4aX7mc9Njy3jaCFyLRDeBYPmteZUz2AP2fR8vhywgR';
    var apiUrl = 'https://api.thecatapi.com/v1/images/search?api_key=' + apiKey;

    return fetch(apiUrl)
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao obter imagem de gato:', error);
            alert('Erro ao obter imagem de gato.');
        });
}
