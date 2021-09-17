const corpo = window.document.getElementsByTagName('body')[0];
const painel = window.document.getElementById('painel');
const números = window.document.getElementsByTagName('p')[0];

const img_caixa_button = document.getElementById('img-caixa-botao');
const caixa_botão_play = window.document.getElementById('caixa_botão_play');
const sensor_play = window.document.getElementById('sensor_play');

const img_caixa_button_restart = document.getElementById('img-caixa-botao_restart');
const caixa_botão_restart = document.getElementById('caixa_botão_restart');
const sensor_restart = document.getElementById('sensor_restart');

let ConfirmPause = 0;
let NumbersInterval = "";

//SPANS PARA IMPRIMIR OS NÚMEROS
let spans = {
    span_minutes: document.getElementById('span-minutes'),
    span_seconds: document.getElementById('span-seconds'),
    span_milliseconds: document.getElementById('span-milliseconds')
}

//NÚMEROS PARA AUMENTAR
let numbers = {
    minutes: 0,
    seconds: 0,
    milliseconds: -1
};

sensor_play.addEventListener('mouseenter', entrar);
sensor_play.addEventListener('mouseout', saiu);
sensor_restart.addEventListener('mouseenter', entrar);
sensor_restart.addEventListener('mouseout', saiu);

//IMPRIMIR NÚMEROS
function ImprimirNumberMilliseconds() {

    if(numbers.milliseconds < 10) {
        spans.span_milliseconds.innerText = `0${numbers.milliseconds}`;
    }else {
        spans.span_milliseconds.innerText = `${numbers.milliseconds}`;
    }

}
function ImprimirNumberSeconds() {
    if(numbers.seconds < 10) {
        spans.span_seconds.innerText = `0${numbers.seconds}`;
    }else {
        spans.span_seconds.innerText = `${numbers.seconds}`;
    }
}
function ImprimirNumberMinute() {
    if(numbers.minutes < 10) {
        spans.span_minutes.innerText = `0${numbers.minutes}`;
    }else {
        spans.span_minutes.innerText = `${numbers.minutes}`;
    }
}

//restart cronômetro
sensor_restart.addEventListener('click', () => {
    clearInterval(NumbersInterval);
    img_caixa_button_restart.style.animation = "";
    setTimeout(() => img_caixa_button_restart.style.animation = "RotateRestart 0.5s", 0.5);
    numbers.minutes = 0, numbers.seconds = 0, numbers.milliseconds = 0, ConfirmPause = 0;
    img_caixa_button.setAttribute('src', 'imagens/outline_play_arrow_white_48dp.png');
    img_caixa_button.setAttribute('class', 'img-play');
    spans.span_milliseconds.innerText = "00", spans.span_minutes.innerText = '00', spans.span_seconds.innerText = '00';

});

//iniciar e pausar cronômetro
sensor_play.addEventListener('click', () => {
    ConfirmPause++;
    if(ConfirmPause === 1) {
        img_caixa_button.setAttribute('src', 'imagens/outline_pause_white_48dp.png');
        img_caixa_button.setAttribute('class', 'img-pause');
        NumbersInterval = setInterval(() => {
            numbers.milliseconds++;
            if(numbers.seconds === 59 && numbers.milliseconds === 100) {
                numbers.seconds = -1;
                numbers.minutes++;
                ImprimirNumberMinute();
            }
            if(numbers.milliseconds === 100) {
                numbers.milliseconds = 0;
                numbers.seconds++
                ImprimirNumberSeconds();
            }
            ImprimirNumberMilliseconds()

            if(numbers.minutes === 59 && numbers.seconds === 59 && numbers.milliseconds === 99) {
                clearInterval(NumbersInterval);
                ConfirmPause = 3;
            }
        }, 10);
    }else if(ConfirmPause === 2) {
        img_caixa_button.setAttribute('src', 'imagens/outline_play_arrow_white_48dp.png');
        img_caixa_button.setAttribute('class', 'img-play');
        clearInterval(NumbersInterval);
        ConfirmPause = 0;
    }
});

//Functions effects
function entrar() {
    if(ConfirmPause === 0) {
        img_caixa_button.setAttribute('src', 'imagens/outline_play_arrow_white_48dp.png');
        img_caixa_button.setAttribute('class', 'img-play');
    }else {
        img_caixa_button.setAttribute('src', 'imagens/outline_pause_white_48dp.png');
        img_caixa_button.setAttribute('class', 'img-pause');
    }
    img_caixa_button_restart.setAttribute('src', 'imagens/restart-white.png');

    painel.style.animation = 'BordaClara 0.5s';
    painel.style.borderColor = 'white'
    painel.style.boxShadow = '0px 0px 20px white' 

    corpo.style.animation = 'CorEscura 0.5s forwards';

    caixa_botão_play.style.animation = 'BordaClara 0.5s';
    caixa_botão_play.style.borderColor = 'white'
    caixa_botão_play.style.boxShadow = '0px 0px 20px white'

    caixa_botão_restart.style.animation = 'BordaClara 0.5s';
    caixa_botão_restart.style.borderColor = "white";
    caixa_botão_restart.style.boxShadow = "0 0 20px white";

    números.style.animation = 'NúmerosClaros 0.5s';
    números.style.color = 'white'
    números.style.textShadow = '0px 0px 20px white'
}
function saiu() {
    if(ConfirmPause === 0) {
        img_caixa_button.setAttribute('src', 'imagens/outline_play_arrow_black_48dp.png');
        img_caixa_button.setAttribute('class', 'img-play');
    }else {
        img_caixa_button.setAttribute('src', 'imagens/outline_pause_black_48dp.png');
        img_caixa_button.setAttribute('class', 'img-pause');
    }
    img_caixa_button_restart.setAttribute('src', 'imagens/restart.png');

    painel.style.animation = 'BordaEscura 0.5s';
    painel.style.borderColor = 'black';
    painel.style.boxShadow = '' ;

    corpo.style.animation = 'CorClara 0.5s forwards';

    caixa_botão_play.style.animation = 'BordaEscura 0.5s';
    caixa_botão_play.style.borderColor = 'black';
    caixa_botão_play.style.boxShadow = '';

    caixa_botão_restart.style.animation = 'BordaEscura 0.5s';
    caixa_botão_restart.style.borderColor = "black";
    caixa_botão_restart.style.boxShadow = "";

    números.style.animation = 'NúmerosEscuros 0.5s';
    números.style.color = 'black';
    números.style.textShadow = '';
}
