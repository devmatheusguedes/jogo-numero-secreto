    /*let titulo = document.querySelector('h1');
let mensagem = document.querySelector('p');
titulo.innerHTML = 'Jogo do numero secreto.';
mensagem.innerHTML = 'selecione um numero de 1 a 100.';*/

let numerosSorteados = [];
let limiteSorteio = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// https://jogo-azure-chi.vercel.app/

function inserirCampoMensagem(tag, mensagem){
    let campo = document.querySelector(tag);
    campo.innerHTML = mensagem;
    responsiveVoice.speak(mensagem, 'Brazilian Portuguese Female', {rate:1.2}); 
}

function mensagemInicial(){
    
    inserirCampoMensagem('h1', 'jogo do numero secreto');
    inserirCampoMensagem('p', 'selecione um numero de 1 a 50');
}

mensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    let palavraTentativas = tentativas > 1? 'tentativas': 'tentativa'; 
    if(chute == numeroSecreto){
        inserirCampoMensagem('h1', 'você acertou!');
        inserirCampoMensagem('p', `você descobriu o numero secreto com ${tentativas} ${palavraTentativas}, parabêns!`);
        habilitarBotaoNovoJogo();
    }else{
        if(chute > numeroSecreto){
            inserirCampoMensagem('p', 'o numero secreto é menor');
        }else{
            inserirCampoMensagem('p', 'o numero secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let numero = parseInt(Math.random() * limiteSorteio + 1);
    let tamanhoDaListaDeSorteio = numerosSorteados.length;
    if(tamanhoDaListaDeSorteio == limiteSorteio){
        numerosSorteados = [];
    }
    if(numerosSorteados.includes(numero)){
        return gerarNumeroAleatorio();
        
    }else {
        numerosSorteados.push(numero);
        console.log(numerosSorteados);
        return numero;
    }
}



function habilitarBotaoNovoJogo(){
    document.getElementById('reiniciar').removeAttribute('disabled');
}

function desabilitarBotaoNovoJogo(){
    document.getElementById('reiniciar').setAttribute('disabled', true)
}

function limparCampo(){
    chute = document.querySelector("input");
    chute.value = " ";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    chute.value = '';
    mensagemInicial();
    desabilitarBotaoNovoJogo();
}