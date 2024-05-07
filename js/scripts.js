"use strict";

/**
 * ##################
 * ##   TAREAS     ##
 * ##################
 * La aplicación debe leer el JSON
 */



const questions = 'quiz.json';

fetch(questions)
    .then(response => {
        if(!response.ok){
        throw new Error('No se puede cargar el json');
        }
    return response.json()
    })
    .then(data => {
        console.log(data);
    });


    /**
 * ##################
 * ##   TAREAS     ##
 * ##################
 * procesar las preguntas
 */

const questionElement = document.getElementById('question');
const answerListElement = document.getElementById('answers');
const correctAnswer = document.getElementById('correct');

  /**
 * ##################
 * ##   TAREAS     ##
 * ##################
 * mostrar en la pantalla la primera pregunta junto a
   la lista de respuestas con un botón para seleccionar una
 */
    


  
    /**
 * ##################
 * ##   TAREAS     ##
 * ##################
 * Si la respuesta es correcta debe aumentar un contador de aciertos y
avanzar a la siguiente pregunta. Si es incorrecta simplemente
avanzar
 */



   /**
 * ##################
 * ##   TAREAS     ##
 * ##################
 * Al finalizar las preguntas debe mostrar la puntuación final.
 */
    