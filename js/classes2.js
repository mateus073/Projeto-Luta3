//class pai, ira servir de padrao pra criaçao das classese filhas (outros personagens)
class PlayPadrao {
    constructor(nome) {
        this.nome = nome
        this._life = 1;
        this.maxLfe = this._life
        this.defens = 0
        this.attack = 0
    }

    get vida() {
        return this._life
    }

    set vida(valor) {
        if (valor < 0) {
            console.log('o valor da vida nao pode ser menor que zero')
        } else {
            this._life = valor
        }
    }
}

//class do personagem do seu madruga que luta com o chaves 
class Madruga extends PlayPadrao {
    constructor() {
        super('SEU MADRUGA')
        this.vida = 70
        this.maxLfe = this.vida
        this.defens = 11
        this.attack = 10
    }
}

//class do personagem do chaves que luta com o seu madruga 

class Chaves extends PlayPadrao {
    constructor() {
        super('CHAVES')
        this.vida = 80
        this.maxLfe = this.vida
        this.defens = 10
        this.attack = 11
    }
}


// pablo massal que lutda com datena, porem ainda nao to usando eles nesse projeto por nao ter achado os gif, mas irei usar no futuro
class Massal extends PlayPadrao {
    constructor() {
        super('MASSAL')
        this.vida = 90
        this.maxLfe = this.vida
        this.defens = 80
        this.attack = 4
    }
}



//datena  que lutda com pablo massal, porem ainda nao to usando eles nesse projeto por nao ter achado os gif, mas irei usar no futuro
class Datena extends PlayPadrao {
    constructor() {
        super('DATENA')
        this.vida = 70
        this.maxLfe = this.vida
        this.defens = 50
        this.attack = 9
    }
}


/**
 * Classe que gerencia o cenário e mecânicas do jogo.
 * desde ataques, cenario, audio etc...
 */
class Cenario {
    /**
  * Inicializa o cenário com personagens e elementos de interface.
  * @param {PlayPadrao} p1class - Primeiro personagem.
  * @param {PlayPadrao} p2class - Segundo personagem.
  * @param {HTMLElement} p1Placar - Elemento do placar do jogador 1.
  * @param {HTMLElement} p2Placar - Elemento do placar do jogador 2.
  * @param {HTMLElement} pontos - Elemento que exibe a pontuação.
  * @param {HTMLElement} p1eBotao - Botão de ação do jogador 1.
  * @param {HTMLElement} p2eBotao - Botão de ação do jogador 2.
  * @param {HTMLElement} ulLegend - Elemento para exibição de mensagens.
  * @param {HTMLElement} audios - Elemento que contém os áudios do jogo.
  */
    constructor(p1class, p2class, p1Placar, p2Placar, pontos, p1eBotao, p2eBotao, ulLegend, audios) {
        this.p1class = p1class
        this.p2class = p2class
        this.p1Placar = p1Placar
        this.p2Placar = p2Placar
        this.pontos = pontos
        this.p1eBotao = p1eBotao
        this.p2eBotao = p2eBotao
        this.ulLegend = ulLegend
        this.audios = audios
        this.fithAudio = false  //passa um valor de false pra variavel responsavel pela logica de saber se o audio de inicializaçao(figth e musica do rock ja foram tocados)
        this.p1Pt = 0           // variavel que conten a pontuaçao referente ao play1,
        this.p2Pt = 0           // msm coisa pro play 2
    }






    /**
    * Inicia o jogo, atualiza o placar e define as ações dos botões de ataque. Também associa o método `restart` ao botão de reinício.

    - Primeiro, chama o método que atualiza a tela com as informações dos personagens, incluindo barra de vida, nome, etc.
    - Em seguida, adiciona eventos de clique nos botões de ataque, que disparam o método de ataque, passando "atacando" e "atacado" como parâmetros.
    - Por último, configura o botão de reset para chamar o método que restaura a vida dos personagens com `maxLife`, atualiza a tela e redefine a variável de áudio para `false`, permitindo que os sons de "fight" e rock toquem novamente.
 */

    start() {
        this.atualizaTela()
        this.p1eBotao.querySelector('.l1botao').addEventListener('click', () => this.mecanicaJogo(this.p1class, this.p2class))
        this.p2eBotao.querySelector('.l2botao').addEventListener('click', () => this.mecanicaJogo(this.p2class, this.p1class))
        this.pontos.querySelector('.reset').addEventListener('click', () => { this.restart() })
    }

/**
 * Reinicia o jogo e atualiza a tela com os valores iniciais.

    - Este método redefine o jogo, atribuindo o valor máximo à vida atual de cada personagem. É chamado dentro do método `start`.
    - Em seguida, chama `atualizarTela()` para preencher novamente a barra de vida.
    - Por fim, redefine a variável de áudio para `false`, permitindo que os sons de rock e "fight" toquem novamente. (Mais detalhes sobre o áudio no método de controle de áudio).
 */
    restart() {
        this.p1class.vida = this.p1class.maxLfe
        this.p2class.vida = this.p2class.maxLfe
        this.atualizaTela()
        this.fithAudio = false // da o false de novo pro audio pra ele poder rodar novamente
    }

/**
 * Atualiza a pontuação ao final de cada rodada.

    - Se a vida de um dos personagens chegar a zero, atribui 1 à variável que representa a pontuação do jogador no placar.
    - Observação: este método é chamado na mecânica do jogo, garantindo que o placar seja atualizado sempre que a vida de um personagem é zerada.
 */
    atualizaPontuaçao() {
        if (this.p2class.vida < 1) {
            this.p1Pt++
            this.pontos.querySelector('.play1pt').innerText = ` ${this.p1Pt}`
        } else if (this.p1class.vida < 1) {
            this.p2Pt++
            this.pontos.querySelector('.play2pt').innerText = `${this.p2Pt}`
        }
    }



/**
 * Atualiza a tela com os dados dos personagens e a barra de vida.

    - Atualiza a largura da barra de vida ajustando seu `width` de acordo com o resultado de um cálculo de porcentagem.
    - Preenche os campos de informações no placar de cada personagem usando `innerText` para exibir os dados atualizados.
 */
    atualizaTela() {
        // atualiza barra de vida 
        let pct1 = (this.p1class.vida / this.p1class.maxLfe) * 100
        this.p1Placar.querySelector('.l1Vida').style.width = `${pct1}%`
        // prenche os campos de informaçoes abaixo da barra de vida
        this.p1Placar.querySelector('.l1nome').innerText = `${this.p1class.nome}`
        this.p1Placar.querySelector('.l1F').innerText = `${this.p1class.attack}`
        this.p1Placar.querySelector('.l1D').innerText = `${this.p1class.defens}`
        this.p1Placar.querySelector('.l1HP').innerText = `${this.p1class.vida.toFixed(0)}`

        // msm coisa so que pro lutador 2
        let pct2 = (this.p2class.vida / this.p2class.maxLfe) * 100
        this.p2Placar.querySelector('.l2Vida').style.width = `${pct2}%`
        // msm coisa so que pro lutador 2 
        this.p2Placar.querySelector('.l2nome').innerText = `${this.p2class.nome}`
        this.p2Placar.querySelector('.l2F').innerText = `${this.p2class.attack}`
        this.p2Placar.querySelector('.l2D').innerText = `${this.p2class.defens}`
        this.p2Placar.querySelector('.l2HP').innerText = `${this.p2class.vida.toFixed(0)}`
    }



    /**
     * Executa a mecânica de combate entre os personagens.
     * @param {PlayPadrao} atacando - Personagem que está atacando.
     * @param {PlayPadrao} atacado - Personagem que está defendendo.
    
    - O primeiro `if` verifica se o personagem está morto. Se estiver, chama o método `adicionarMsg` passando a mensagem correspondente como parâmetro.
    
    - Em seguida, ocorre a lógica do ataque, onde os métodos são chamados com os parâmetros do "atacante" e "atacado".

    - Por fim, a lógica de animação de ataque é acionada, deslocando a imagem do jogador para simular o movimento de ataque.
     */
    mecanicaJogo(atacando, atacado) {
        if (atacando.vida <= 0 || atacado.vida <= 0) {
            let texto = `${atacado.nome} esta morto`
            this.exibeMsgNaUL(texto)
            return
        }

        // definindo o fator de ataque e defesa usando um numero aleatorio multiplicado pelo do personagem
        let fatorAtack = (Math.random() * 2).toFixed(1)
        let fatorDef = (Math.random() * 2).toFixed(1)

        let atualAtack = atacando.attack * fatorAtack
        let atualDef = atacado.attack * fatorDef

        // pra poder zerar a vida dele caso o aataque seja maio que o restante de vida 
        if (atualAtack > atacado.vida) {
            atacado.vida = 0
        }

        // if else que executa ataque
        if (atualAtack > atualDef) {
            atacado.vida -= atualAtack
            let texto = ` ${atacando.nome} atacou ${atacado.nome} e deu ${atualAtack.toFixed(0)} de dano`
            this.exibeMsgNaUL(texto)
        } else {
            let texto = `${atacado.nome} defendeu o ataque de ${atacando.nome}`
            this.exibeMsgNaUL(texto) // faz a rolagem pra definir o ultimo item
        }


        this.atualizaPontuaçao() // chama o metodo que atualiza o pontuaçao sempre que a mecanica do jogo roda (mecanica do jogo que e responsavel por zerar a vida usando o atauque)
        this.atualizaTela() // chamando o metodo que atualiza as informaçoes da tela sempre que a mecanica do jogo roda, garantindo que as inoformaçoes com vida barra de vida e se ta morto seja exibida
        this.playAudios(atualAtack, atacado) // chama o metodo dos audio do ataque e passa o valor do atual ataque em seu parametro, (baseado no valor do ataque solta um audio difetente)


        if (atacando.nome === "CHAVES") {
            let gifEsquerda = this.p2eBotao.querySelector('.l2img')
            gifEsquerda.style.transform = "translate(-500px, 0)"

            setTimeout(() => {
                gifEsquerda.style.transform = "translate(0, 0)";
            }, 500);

        } else if (atacando.nome === "SEU MADRUGA") {
            let gifDireita = this.p1eBotao.querySelector('.l1img')
            gifDireita.style.transform = "translate(500px, 0)"

            setTimeout(() => {
                gifDireita.style.transform = "translate(0, 0)";
            }, 500)
        }
    }



    /**
     * Exibe mensagens na lista de mensagens da tela .
     * @param {string} msg - Mensagem a ser exibida.
    
    Este método é chamado em outros métodos, como "ataque" ou "morreu".
    A mensagem a ser exibida é passada como parâmetro, permitindo mostrar o texto adequado para cada situação.
     */
    exibeMsgNaUL(msg) {
        let texto = msg
        let newLi = document.createElement("li")
        newLi.className = "clasLi"
        newLi.innerText = texto
        this.ulLegend.appendChild(newLi)

        this.ulLegend.scrollTop = this.ulLegend.scrollHeight; // faz a rolagem pra definir o ultimo item
    }



    /**
     * Reproduz sons de ataque e efeitos do jogo como audios de inicio "figth" e "rock" ou de fim "game over", "so nao te dou outra" etc...
     * @param {number} atualAtack - Valor do ataque atual.
     * @param {PlayPadrao} atacado - Personagem que está sendo atacado.
    
    Este método é chamado em diversas mecânicas do jogo, passando "atualAtack" e "atacado" como parâmetros.

    - A primeira condição verifica se a variável booleana, definida no construtor, já foi alterada. 
    - Caso ainda esteja `false`, o áudio de fundo com música de rock e o efeito de "fight" são reproduzidos. 
    - Em seguida, o valor da variável é alterado para `true` para evitar que o áudio seja reproduzido repetidamente sempre que o botão de ataque é pressionado.
    
    - Quando o botão de reset é acionado, o método de reinício redefine a variável de áudio para `false`, permitindo que o áudio seja reproduzido novamente na próxima partida.
    
    - Além disso, dependendo da força do ataque, o método escolhe um áudio de impacto específico: se a força for alta, toca um som mais intenso ("receba"), e se for baixa, um som mais leve ("pancada").
     */
    playAudios(atualAtack, atacado) {
        // esse if e reponsavel pelos audios de fim da rodada 
        if (this.p1class.vida <= 0 || this.p2class.vida <= 0) {
            let audioRock = this.audios.querySelector('#rocky')
            let gHover = this.audios.querySelector('#gameOver')
            audioRock.pause()
            gHover.play()

            // verifica quem foi ataco pr ultimo(quem morreu) solta o audeio de vitorio do outro play
            setTimeout(() => {
                if (atacado.nome === "CHAVES") {
                    let douOutra = this.audios.querySelector('#teDouOutra')
                    douOutra.play()
                } else {
                    let astucia = this.audios.querySelector('#astucia')
                    astucia.play()
                }
            }, 1000)
            return
        }
        // metodo reponsavel por soltar os audios de inicio de rodada 
        if (!this.fithAudio) {
            let figth = this.audios.querySelector('#fight')
            figth.play()
            setTimeout(() => {
                let audioRock = this.audios.querySelector('#rocky')
                audioRock.play()
                this.fithAudio = true // da verdadeiro pra poder rodar de novo
            }, 600)

        }
        // aqui vai ficar a estrutura condicional responsavel pelos audios dos ataques
        if (atualAtack < 15) {
            let pancada = this.audios.querySelector('#pancada')
            pancada.play()
        } else if (atualAtack >= 15) {
            let receba = this.audios.querySelector('#receba')
            receba.play()
        }
    }
}

