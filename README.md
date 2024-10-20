# Proyecto de Visualización de Partidos

Este proyecto es una aplicación web simple para visualizar el estado de los partidos en tiempo real.

## Estructura del Proyecto

### Archivos y Directorios

- **index.html**: El archivo principal HTML que carga la estructura básica de la aplicación.
- **js/script.js**: Contiene la lógica de JavaScript para actualizar y mostrar los datos de los partidos.
- **styles/styles.css**: Contiene los estilos CSS para la aplicación.

## Descripción del Código

### `js/script.js`

Este archivo contiene la lógica principal para manejar la visualización del estado de los partidos. Aquí hay un extracto del código relevante:

```javascript
if (matchData.playing) {
    statusTextElem.textContent = 'En Juego';
    statusTextElem.classList.add('playing');
    statusTextElem.classList.remove('finalized');
    liveIndicatorElem.classList.add('playing');
    liveIndicatorElem.classList.remove('finalized');
} else {
    statusTextElem.textContent = 'Finalizado';
    statusTextElem.classList.add('finalized');
    statusTextElem.classList.remove('playing');
    liveIndicatorElem.classList.add('finalized');
    liveIndicatorElem.classList.remove('playing');
}

async function updateMatchData() {
    const matchData = await fetchMatchData(selectedMatchId);
    displayMatchData(matchData);
}

matchSelect.addEventListener('change', function() {
    // Lógica para manejar el cambio de selección de partido
});
```

### `styles/styles.css`

Este archivo contiene los estilos para la aplicación, asegurando que los elementos visuales se presenten de manera atractiva y coherente.

## Cómo Ejecutar el Proyecto

1. Clona el repositorio en tu máquina local.
2. Abre el archivo `index.html` en tu navegador web preferido.
