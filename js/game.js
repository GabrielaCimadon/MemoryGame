const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')

const personagem = [
    'bowser',
    'caveira',
    'cogumelo',
    'fantasma',
    'goomba',
    'luigi',
    'mario',
    'wiiblue',
    'princesa',
    'yoshi'
    
];

const createElement =(tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card')

    if (disableCards.length == 20){
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML} ! Seu tempo foi: ${timer.innerHTML}`);
    }
}

const checkCards = () => {
    const firstPersonagem = firstCard.getAttribute('data-personagem')
    const secondPersonagem = secondCard.getAttribute('data-personagem')

    if (firstPersonagem == secondPersonagem){
        firstCard.firstChild.classList.add('disable-card')
        secondCard.firstChild.classList.add('disable-card')

            firstCard = '';
            secondCard = '';

            checkEndGame()

    } else {
        setTimeout(()=>{

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500)

    }
}

const revealCard = ({target}) => {

    if (target.parentNode.className.includes('reveal-card')){
        return
    }

    if ( firstCard == ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard == ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards()
    }
    
}
//criando a carta
const creatCard = (personagem) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../imagens/${personagem}.png')`

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-personagem', personagem)
    
    return card ;
}

const loadgame = () => {
    const duplicatePersonagem = [ ...personagem, ...personagem ]

    const shuffedArray = duplicatePersonagem.sort(() => Math.random() - 0.5  );// função que embaralhou 
   

    duplicatePersonagem.forEach((personagem) => {
    
        const card = creatCard(personagem);
        grid.appendChild(card);

    })
}

const startTimer = ()=> {
    this.loop = setInterval(() => {
      const currentTime = Number(timer.innerHTML);
      timer.innerHTML = currentTime + 1;
    }, 1000);

}
window.onload = () =>{
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadgame()
}
