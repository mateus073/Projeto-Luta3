let playEsquerda = new Madruga()
let playDireita = new Chaves()



 const cenario = new Cenario(
    playEsquerda,  // class do lutador 1 seu madrugra
    playDireita, // class do lutador 2 chaves
    document.querySelector('.l1Plc'),  //play 1 plcar com vida nome etc
    document.querySelector('.l2Plc'),  //play 2 plcar com vida nome etc
    document.querySelector('.placarpt'), //plcar com a pontuaçao e botao de reiniciar luta
    document.querySelector('.l1luta'),  // pla 1 gif do lutador e botao de ataque
    document.querySelector('.l2luta'), // pla 2 gif do lutador e botao de ataque
    document.querySelector('.lgdLuta'),  // ul onde ira mostrar os acontecimento da luta 
    document.querySelector('#audios')  // div que contem os audios 
)


cenario.start()