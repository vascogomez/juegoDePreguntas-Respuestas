'use strict';

// limitamos la cantidad de preguntas para ver como se ejecuta el juego
const LIMITE = 5;

// definimos las variables
let preguntas;
let indiceDePreguntas = 0; //contenedor de preguntas almacenadas
let score = 0;

 

/**
 * ##################
 * ##   TAREAS     ##
 * ##################
 * La aplicación debe leer el JSON
*/


//funcion para llamar las preguntas del Json
const traerPreguntas = async () => { 
  const arrayPreguntas = await fetch(`quiz.json`);
  const datosDelJson = await arrayPreguntas.json();

  if (datosDelJson.length === 0) {
    throw new Error('Question file is empty');
  }
  
  return datosDelJson;
  
};
 

/**
 * ##################
 * ##   TAREAS     ##
 * ##################
 * procesar las preguntas
*/

const cadaPregunta = document.getElementById('question');
const todasLasRespuestas = document.getElementById('answers');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const contendorPreguntas = document.getElementById('question-container');
const btnReiniciar = document.getElementById('reset-btn');

/**
 * ##################
 * ##   TAREAS     ##
 * ##################
 * mostrar en la pantalla la primera pregunta junto a
  la lista de respuestas con un botón para seleccionar una
*/
    

//  se agregofuncioniniciar el Juego (para que pueda funcionar el boton al terminar el juego )
const iniciarJuego = async () => {
  preguntas = await traerPreguntas(); // Traemos preguntas desde el archivo
  preguntas = preguntas.sort(() => 0.5 - Math.random());  //ordena aleatoriamente las preguntas
  indiceDePreguntas = 0; // Reiniciamos el índice
  score = 0; // Reiniciamos la puntuación
  resultContainer.style.display = 'none'; // Ocultamos el contenedor de resultados
  cadaPregunta.style.display = 'block'; // Mostramos la pregunta
  todasLasRespuestas.style.display = 'block'; // Mostramos las respuestas
  contendorPreguntas.style.display = 'block'; // Mostramos el contenedor de preguntas
  funcionPrincipal();
}
  

const funcionPrincipal = async () => {
  const preguntaActual = preguntas[indiceDePreguntas];
  cadaPregunta.textContent = preguntaActual.question;

  todasLasRespuestas.innerHTML = '';

  preguntaActual.answers.forEach((respuesta) => {  //funcion para agregar respuestas a la pregunta actual
    const li = document.createElement('li');

    li.textContent = respuesta;
    li.classList.add(`button`);

    li.addEventListener(`mouseover`, () => {
      li.style.color = `violet`;
      li.style.transform = `scale(1.1)`;
    });

    li.addEventListener(`mouseout`, () => {
      li.style.color = `white`;
      li.style.transform = `scale(1)`;
    });


    /**
     * ##################
     * ##   TAREAS     ##
     * ##################
     * Si la respuesta es correcta debe aumentar un contador de aciertos y
      avanzar a la siguiente pregunta. Si es incorrecta simplemente
      avanzar
    */

    const validarRespuesta = (respuestaSeleccionada, preguntaActual) => {
    return respuestaSeleccionada === preguntaActual.correct;
    };

    
    li.addEventListener('click', () => {
      console.log(validarRespuesta(respuesta, preguntaActual)); //verificamos respuesta por consola

      const correct = validarRespuesta (respuesta, preguntaActual);
      li.style.backgroundColor = correct ? `green` : `red`;
          
      if (validarRespuesta(respuesta, preguntaActual)) {
        score++;
        
      }

      indiceDePreguntas++;

      // El límite no es una característica requerida, puede no implementarse.
      indiceDePreguntas < LIMITE ? funcionPrincipal() : mostrarResultado();
    });

    todasLasRespuestas.appendChild(li);
  });
};


/**
 * ##################
 * ##   TAREAS     ##
 * ##################
 * Al finalizar las preguntas debe mostrar la puntuación final.
*/
    

const mostrarResultado = () => {
  
  cadaPregunta.style.display = 'none';
  todasLasRespuestas.style.display = 'none';
  contendorPreguntas.style.display = 'none';
  resultContainer.style.display = 'block';
  scoreElement.textContent = `${score}/${LIMITE}`; 

};


//se remplazo funcion principal por inicar Juego 
 btnReiniciar.addEventListener('click',iniciarJuego);

iniciarJuego();
