window.onload = function(){

    var teclasCodigos = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 194,  110, 106, 107, 109,111];
    var teclasChar =    ['0','1','2','3', '4', '5', '6', '7', '8', '9', '.', '.', '*', '+', '-', '/'];
    var htmlResultado = document.querySelector(".resultado");
    var vazio = true;
    var resultadonaTela = false;

    //implementa calculadora com os botoes fisicos do teclado (numpad)
    window.onkeydown = function(pressed_key){
        let index = teclasCodigos.indexOf(pressed_key.keyCode);
        if (index >= 0 && resultadonaTela == false){
            //se a tela estiver vazia, aceita apenas numeros
            if (vazio === true && index < 10){
                htmlResultado.value += teclasChar[index];
                vazio = false;
            } else if (vazio === false){
                htmlResultado.value += teclasChar[index];
            }
        }
        //se houver resultado na tela, aceita apenas operações ou limpa o resultado
        else if (index >= 0 && resultadonaTela === true){
            if (index < 12){
                htmlResultado.value = teclasChar[index];
                resultadonaTela = false
            }
            else{
                htmlResultado.value += teclasChar[index];
                resultadonaTela = false;
            }
        }
        //pressiona ENTER
        if (pressed_key.keyCode === 13){
            checarSePodeCalcular();
        }
        //pressiona SPACE BAR
        if (pressed_key.keyCode === 32){
            limparTela();
        }
        //pressiona BACKSPACE
        if (pressed_key.keyCode === 8){
            htmlResultado.value = htmlResultado.value.slice(0,-1);
        }
    }

    //implementa calculadora com cliques do mouse 
    $("button").click(function(){

        let index = teclasChar.indexOf(this.id);

        if (htmlResultado.value === "Erro!"){
            limparTela();
        }
        if (resultadonaTela === false){
            //se a tela estiver vazia, aceita apenas numeros
            if (vazio === true && index < 10){
                htmlResultado.value += (this.id);
                vazio = false;
            } else if (vazio === false && this.id != "=" && this.id !="C"){
                htmlResultado.value += (this.id);
            }
        //se já houver resultado na tela, aceita apenas operações ou limpa o resultado
        } else if (resultadonaTela === true){
            //se for numero
            if (index < 12){
                htmlResultado.value = (this.id);
                resultadonaTela = false;
            //se for operação
            } else {
                htmlResultado.value += (this.id);
                resultadonaTela = false;
            }
        }

        if (this.id === "="){
            checarSePodeCalcular();
        }
        if (this.id ==="C"){
            limparTela();
        }
    });
    
    //funcoes gerais

    function checarSePodeCalcular(){
        if (isFinite(String(fazerCalculo(htmlResultado.value)))){
            htmlResultado.value = fazerCalculo(htmlResultado.value);
        }
        else{
            htmlResultado.value = "Erro!";
            numerosOperacao = 0;
        }
    }

    function fazerCalculo(string){
        resultadonaTela = true;
        return new Function('return '+string)();
    }

    function limparTela(){
        htmlResultado.value = "";
        vazio = true;
    }

}
