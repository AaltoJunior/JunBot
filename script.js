let vaihe;
let skenaario;
const skenaarioFolder = 'skenaario/';

function loadScenario(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            skenaario = transformData(data);
            vaihe = Object.keys(skenaario)[0]; // Aloitetaan ensimmäisestä viestistä
            updateMessage();
        });
}

function transformData(data) {
    const messages = {};
    data.shapes.forEach(shape => {
        if (shape.type === 'geo') {
            messages[shape.id] = {
                message: shape.props.text,
                options: {}
            };
        }
    });

    data.shapes.forEach(shape => {
        if (shape.type === 'arrow') {
            const sourceId = shape.props.start.boundShapeId;
            const targetId = shape.props.end.boundShapeId;
            const optionText = shape.props.text;
            if (sourceId in messages) {
                messages[sourceId].options[optionText] = {
                    text: optionText,
                    target: targetId
                };
            }
        }
    });
    return messages;
}

function loadScenarioOptions() {
    const scenarioButtonsContainer = document.getElementById("scenarioButtons");
    fetch('skenaario/skenaario_list.json')
        .then(response => response.json())
        .then(data => {
            data.skenaariot.forEach(skenaario => {
                const button = document.createElement("button");
                button.classList.add("scenario-button");
                button.textContent = skenaario.name;
                button.addEventListener("click", () => {
                    const scenarioUrl = `${skenaarioFolder}${skenaario.file}`;
                    loadScenario(scenarioUrl);
                });
                scenarioButtonsContainer.appendChild(button);
            });
        });
}

function updateChat(message, isPlayerMessage) {
    const chatElement = document.getElementById("chat");
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");

    const messageBubble = document.createElement("div");
    messageBubble.classList.add("message-bubble", isPlayerMessage ? "player-message" : "game-message");
    messageBubble.textContent = message;
    messageContainer.appendChild(messageBubble);
    chatElement.appendChild(messageContainer);

    //chatElement.scrollTop = chatElement.scrollHeight;
    document.body.scrollTop = document.body.scrollHeight;
}

function updateMessage() {
    const currentMessage = skenaario[vaihe];
    updateChat(`JunBot: ${currentMessage.message}`);

    const optionsElement = document.getElementById("options");
    optionsElement.innerHTML = "";
    Object.keys(currentMessage.options).forEach(optionKey => {
        const option = currentMessage.options[optionKey];
        const button = document.createElement("button");
        button.classList.add("options-button");
        button.textContent = option.text;
        button.addEventListener("click", () => handleAnswer(option.target));
        optionsElement.appendChild(button);
    });
}

function handleAnswer(targetId) {
    // Etsi oikea vaihtoehto viesteistä, jotka liittyvät nykyiseen viestiin
    const optionText = Object.keys(skenaario[vaihe].options).find(key => skenaario[vaihe].options[key].target === targetId);

    if (optionText) {
        updateChat(` ${skenaario[vaihe].options[optionText].text}`, true);  // Näytä käyttäjän valitsema vastausteksti
    }

    vaihe = targetId;

    if (vaihe in skenaario) {
        updateMessage();
    } else {
        updateChat("End of conversation. Start again.", false);
        vaihe = Object.keys(skenaario)[0]; // Reset to the first message
        updateMessage();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const defaultScenarioName = 'Default'; // Oletusskenaarion nimi ilman .json päätettä
    const scenarioUrl = `${skenaarioFolder}${defaultScenarioName}.json`;
    loadScenario(scenarioUrl);
});


loadScenarioOptions();
