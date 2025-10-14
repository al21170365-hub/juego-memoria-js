let body = document.querySelector('body')

//const emojis = ['👍','😂','❤️','😍','😒','👌','☺️','😊']
let emojis = []

let cards = []
let flippedCards = []
let matchPairs = 0
let moves = 0
let matchPairs2 = 0
let moves2 = 0
let canFlip = true
let jugadorRotator = true
let m = null
let s = null


function initGame() {
    let gameContainer = document.createElement('div')
    gameContainer.id = 'game-container'
    body.appendChild(gameContainer)

    createHeader(gameContainer);
    createGameBoard(gameContainer);
    createButtons(gameContainer);
    createModal();

    startNewGame()
}

function createHeader(container) {
    let gameHeader = document.createElement('div')
    gameHeader.classList.add('game-header')
    let h1 = document.createElement('h1')
    h1.textContent = '🧠 Juego de Memoria'
    
    let stats = document.createElement('div')
    stats.classList.add('stats')
    stats.textContent = 'Jugador 1'
    let moves = document.createElement('span')
    moves.id = 'moves'
    moves.textContent = '0'
    let pairs = document.createElement('span')
    pairs.id = 'pairs'
    pairs.textContent = '0/8'

    let stats2 = document.createElement('div')
    stats2.classList.add('stats')
    stats2.textContent = 'Jugador 2'
    let moves2 = document.createElement('span')
    moves2.id = 'moves2'
    moves2.textContent = '0'
    let pairs2 = document.createElement('span')
    pairs2.id = 'pairs2'
    pairs2.textContent = '0/8'

    let tempoDiv = document.createElement('div')
    tempoDiv.classList.add('tiempo')
    tempoDiv.style.display = 'none'
    let tiempoSpan = document.createElement('span')
    tiempoSpan.textContent = 'Tiempo: '
    let tiempo = document.createElement('span')
    tiempo.id = 'temporizador'
    tiempo.textContent = '0.00s'


    stats.appendChild(moves)
    stats.appendChild(pairs)
    stats2.appendChild(moves2)
    stats2.appendChild(pairs2)
    tempoDiv.appendChild(tiempoSpan)
    tempoDiv.appendChild(tiempo)
    gameHeader.appendChild(h1)
    gameHeader.appendChild(stats)
    gameHeader.appendChild(stats2)
    gameHeader.appendChild(tempoDiv)
    container.appendChild(gameHeader)
}

function createGameBoard(container) {
    let gameBoard = document.createElement('div')
    gameBoard.id = 'game-board'

    container.appendChild(gameBoard)
}

function createButtons(container) {
    let buttons = document.createElement('div')
    buttons.classList.add('buttons')

    let button = document.createElement('button')
    button.textContent = '🔄 Reiniciar'
    button.id = 'reiniciar'
    button.onclick = function() {
        const gameBoard = document.getElementById('game-board')
        gameBoard.innerHTML = ''
        const modal = document.getElementById('victory-modal')
        modal.classList.remove('show')
        startNewGame()
    }

    buttons.appendChild(button)
    container.appendChild(buttons)
}

function createModal() {
    let modal = document.createElement('div')
    modal.classList.add('modal')
    modal.id = 'victory-modal'

    let modalContent = document.createElement('div')
    modalContent.classList.add('modal-content')
    let h2 = document.createElement('h2')
    h2.id = 'winer'
    let p = document.createElement('p')
    p.textContent = 'Has completado el juego'
    let p2 = document.createElement('p')
    p2.id = 'final-moves' 
    let cerrar = document.createElement('button')
    cerrar.id = 'cerrar'
    cerrar.textContent = 'Cerrar'
    cerrar.onclick = function() {
        modal.classList.remove('show')
    }
    let jugar = document.createElement('button')
    jugar.id = 'jugar'
    jugar.textContent = 'Jugar'
    jugar.onclick = function() {
        const gameBoard = document.getElementById('game-board')
        gameBoard.innerHTML = ''
        modal.classList.remove('show')
        startNewGame()
    }

    modalContent.appendChild(h2)
    modalContent.appendChild(p)
    modalContent.appendChild(p2)
    modalContent.appendChild(cerrar)
    modalContent.appendChild(jugar)
    modal.appendChild(modalContent)
    body.appendChild(modal)
}

function startNewGame() {
    moves = 0
    matchPairs = 0
    moves2 = 0
    matchPairs2 = 0
    flippedCards = []
    canFlip = true
    jugadorRotator = true

    let button = document.getElementById('reiniciar')
    button.style.display = 'none'
    updateStats(1)

    dificultad()
}

function continueStartNewGame(choice) {
    let button = document.getElementById('reiniciar')
    button.style.display = 'block'
    if (choice === 1) {
        emojis = ['👍','😂']
    } else if (choice === 2) {
        emojis = ['👍','😂','❤️','😍','😒']
    } else {
        emojis = ['👍','😂','❤️','😍','😒','👌','☺️','😊']
    }

    let div = document.querySelectorAll('.dificultad')
    div.forEach(dif => {
        dif.remove()
    })

    let temp = document.getElementById('temporizador')
    let min = 0
    let sec = 0
    m = setInterval(() => {
        temp.textContent = min+"."+sec+"s"
        min++
    }, 1000);
     s = setInterval(() => {
        temp.textContent = min+"."+sec+"s"
        if (sec == 100) {
            sec = 0
        }
        sec++
    }, 10);
    let temporizador = document.querySelector('.tiempo')
    temporizador.style.display = 'flex'
    temporizador.style.justefyContent = 'center'
    temporizador.style.alignItems = 'center'

    cards = createCards()

    shuffleCards(cards)

    renderBoard()
}

function dificultad() {
    let header = document.querySelector('.game-header')
    let difDiv = document.createElement('div')
    difDiv.classList.add('stats')
    difDiv.classList.add('dificultad')
    let p = document.createElement('p')
    p.classList.add('dificultad')
    p.style.fontSize = '20px'
    p.style.marginBottom = '20px'
    p.style.color = '#667eea'
    p.textContent = 'Elija su dificultad'
    let facil = document.createElement('button')
    facil.textContent = 'Facil'
    facil.onclick = function() {
        continueStartNewGame(1)
    }
    let medio = document.createElement('button')
    medio.textContent = 'Medio'
    medio.onclick = function() {
        continueStartNewGame(2)
    }
    let dificil = document.createElement('button')
    dificil.textContent = 'Dificil'
    dificil.onclick = function() {
        continueStartNewGame(3)
    }

    header.appendChild(p)
    difDiv.appendChild(facil)
    difDiv.appendChild(medio)
    difDiv.appendChild(dificil)
    header.appendChild(difDiv)
}

function createCards() {
    let copyEmojis = [...emojis, ...emojis]
    
    let carta = copyEmojis.map((obj, index) => {
        return {id: index+1, emoji: obj, flipped: false, matched: false}
    })

    return carta
}

function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function renderBoard() {
    const gameBoard = document.getElementById('game-board')

    gameBoard.innerHTML = ''

    const flip = document.createElement('audio')
    flip.src = './audio/flipcard.mp3'
    flip.autoplay = true;
    flip.muted = true
    body.appendChild(flip)

    cards.forEach(card => {
        let cardD = document.createElement('div')
        cardD.classList.add('card')
        cardD.setAttribute('data-id', card.id)
        cardD.textContent = '(emoji oculto)'
        cardD.onclick = function() {
            flipCard(card.id);
            flip.muted = false
            flip.play()
        };
        gameBoard.appendChild(cardD)
    })

    const give = document.createElement('audio')
    give.src = './audio/givecards.mp3'
    give.autoplay = true
    body.appendChild(give)
}

function flipCard(cardId) {
    const card = cards.find(c => c.id === cardId)
    if (!canFlip) {
        return
    }else if(flippedCards.length === 2) {
        return
    }else if(card.matched || card.flipped) {
        return
    }


    card.flipped = true
    flippedCards.push(card)
    let c = document.querySelectorAll('.card');
    let ca = Array.from(c).find(s => s.getAttribute('data-id') == cardId);
    ca.classList.add('flipped')
    ca.textContent = card.emoji


    if(flippedCards.length === 2) {
        if(jugadorRotator) {
            moves++
        }else {
            moves2++
        }
        updateStats()
        checkMatch()
    }
}

function checkMatch() {
    canFlip = false
    const [card1, card2] = flippedCards

    if(card1.emoji === card2.emoji) {
        setTimeout(() => {
            card1.matched = true
            card2.matched = true
            if(jugadorRotator) {
                matchPairs++
            } else {
                matchPairs2++
            }
            findById(card1.id,0,'flipped')
            findById(card2.id,0,'flipped')
            findById(card1.id,0,'matched')
            findById(card2.id,0,'matched')
            flippedCards = []
            updateStats()
            canFlip = true
            const correct = document.createElement('audio')
            correct.src = './audio/correct.mp3'
            correct.autoplay = true;
            body.appendChild(correct)
            if (matchPairs+matchPairs2 === emojis.length) {
                showVictory()
            }
        }, 500);
    }else {
        jugadorRotator = !jugadorRotator
        setTimeout(() => {
            card1.flipped = false
            card2.flipped = false
            findById(card1.id,1,'flipped')
            findById(card2.id,1,'flipped')
            flippedCards = []
            canFlip = true
            const wrong = document.createElement('audio')
            wrong.src = './audio/wrong.mp3'
            wrong.autoplay = true;
            body.appendChild(wrong)
        }, 1000);
    }
}

function findById(cardId,type,content) {
    let c = document.querySelectorAll('.card');
    let ca = Array.from(c).find(s => s.getAttribute('data-id') == cardId);

    if(type === 0) {
        ca.classList.add(content);
    }else if (type === 1) {
        ca.classList.remove(content)
        ca.textContent = '(emoji oculto)'
    }
}

function updateStats(confirm) {
    let move = document.getElementById('moves')
    let pairs = document.getElementById('pairs')
    let move2 = document.getElementById('moves2')
    let pairs2 = document.getElementById('pairs2')
    if(confirm === 1) {
        pairs.textContent = `${matchPairs}/8`
        move.textContent = moves
        pairs2.textContent = `${matchPairs2}/8`
        move2.textContent = moves2
    }
    if(jugadorRotator) {
        pairs.textContent = `${matchPairs}/8`
        move.textContent = moves
        return
    }

    pairs2.textContent = `${matchPairs2}/8`
    move2.textContent = moves2
    
}

function showVictory() {
    const victory = document.createElement('audio')
    victory.src = './audio/victory.mp3'
    victory.autoplay = true;
    body.appendChild(victory)

    let h2 = document.getElementById('winer')
    const p = document.getElementById('final-moves' )
    if(matchPairs > matchPairs2) {
        h2.textContent =  '🎉 ¡Felicidades! Jugador 1'
        p.textContent = `Lo completaste en ${moves} movimientos`
    }else if(matchPairs2 > matchPairs) {
        h2.textContent =  '🎉 ¡Felicidades! Jugador 2'
        p.textContent = `Lo completaste en ${moves2} movimientos`
    }else {
        h2.textContent =  '🎉 ¡Felicidades! ¡Fue un empate!'
    }

    const modal = document.getElementById('victory-modal')

    modal.classList.add('show')
}

function closeModal() {
    const modal = document.getElementById('victory-modal')
    modal.classList.remove('show')
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
}else {
    initGame()
}