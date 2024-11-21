function start() { // inicio start()
  $("#inicio").hide();
  $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
  $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
  $("#fundoGame").append("<div id='amigo' class='anima3'></div>");

  // variáveis do jogo
  var jogo = {};
  var velocidade = 5;
  var posicaoY = parseInt(Math.random() * 334);
  var podeAtirar = true;
  var TECLA = {
    W:87,
    S:83,
    D:68
  };

  // verificar se o usuario pressionou alguma tecla
  jogo.pressionou = [];
  $(document).keydown(function(e){
    jogo.pressionou[e.which] = true;
  });
  $(document).keyup(function(e){
    jogo.pressionou[e.which] = false;
  });

  // game loop
  jogo.timer = setInterval(loop, 30);

  function loop() {
    movefundo();
    movejogador();
    moveinimigo1();
    colisao();
  } // fim loop()

  function movefundo() {
    esquerda = parseInt($('#fundoGame').css("background-position"));
    $('#fundoGame').css("background-position", esquerda - 0.1);
  } // fim movefundo()

  function movejogador() {
    if (jogo.pressionou[TECLA.W]) {
      var topo = parseInt($("#jogador").css("top"));
      $("#jogador").css("top", topo - 10);
      if (topo <= 0) //tamanho do movimento pra cima
      {
        $("#jogador").css("top", topo + 10);
      }
    }
    if (jogo.pressionou[TECLA.S]) {
      var topo = parseInt($("#jogador").css("top"));
      $("#jogador").css("top", topo + 10);
      if (topo >= 450) //tamanho do movimento pra baixo
      {
        $("#jogador").css("top", topo - 10);
      }
    }
    if (jogo.pressionou[TECLA.D]) {
      disparo();
    }
  } // movejogador()

  function moveinimigo1() {
    var posicaoX = parseInt($("#inimigo1").css("left"));
    $("#inimigo1").css("left", posicaoX - velocidade);
    $("#inimigo1").css("top", posicaoY);
    if (posicaoX <= 0) {
      posicaoY = parseInt(Math.random() * 200);
      $("#inimigo1").css("left", 694);
      $("#inimigo1").css("top", posicaoY);
    }
  } // fim moveinimigo1()

  function disparo() {
    if (podeAtirar == true) {
      podeAtirar = false;
      topo = parseInt($("#jogador").css("top"))
      posicaoX = parseInt($("#jogador").css("left"))
      tiroX = posicaoX + 50;
      topoTiro = topo + 10;
      $("#fundoGame").append("<div id='disparo'></div>");
      $("#disparo").css("top", topoTiro);
      $("#disparo").css("left", tiroX);
      var tempoDisparo = window.setInterval(executaDisparo, 30);
    } //fecha podeAtirar
    function executaDisparo() {
      posicaoX = parseInt($("#disparo").css("left"));
      $("#disparo").css("left", posicaoX + 20); //velocidade do disparo
      if (posicaoX > 750) // recarga do disparo
      {
        window.clearInterval(tempoDisparo);
        tempoDisparo = null;
        $("#disparo").remove();
        podeAtirar = true;
      }
    } // fim executaDisparo()
  } // fim disparo()

  function colisao() {
    var colisao1 = ($('#jogador').collision($('#inimigo1')));
    var colisao3 = ($('#disparo').collision($('#inimigo1')));

    // jogador com inimigo 1
    if (colisao1.length > 0) {
      inimigo1X = parseInt($('#inimigo1').css('left'));
      inimigo1Y = parseInt($('#inimigo1').css('top'));
      explosao1(inimigo1X, inimigo1Y);
      posicaoY = parseInt(Math.random() * 334);
      $('#inimigo1').css('left', 694);
      $('#inimigo1').css('top', posicaoY);
    }

    // disparo com inimigo 1
    if (colisao3.length > 0) {
      inimigo1X = parseInt($('#inimigo1').css('left'));
      inimigo1Y = parseInt($('#inimigo1').css('top'));
      explosao1(inimigo1X, inimigo1Y);
      $("#disparo").css("left", 950);
      posicaoY = parseInt(Math.random() * 334);
      $('#inimigo1').css('left', 694);
      $('#inimigo1').css('top', posicaoY);
    }
  } // fim colisao()

  function explosao1(inimigo1X, inimigo1Y) {
    // somExplosao.play();
    console.log(inimigo1X, inimigo1Y);
    $("#fundoGame").append('<div id="explosao1"></div>');
    $("#explosao1").css("background-image", "url(imgs/explosao.png)");
    var div = $("#explosao1");
    div.css("top", inimigo1Y);
    div.css("left", inimigo1X);
    div.animate({width:160, height:160, opacity:0}, "slow");
    var tempoExplosao = window.setInterval(removeExplosao, 1000);
    function removeExplosao() {
      div.remove();
      window.clearInterval(tempoExplosao);
      tempoExplosao = null;
    } // fim removeExplosao()
  } // fim explosao1()

} // fim start()

