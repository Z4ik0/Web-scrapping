# Quotes Scraper

Este proyecto es un **scraper** que desarrollamos (Irving Cruz, Miguel Ignacio Gomez, Jose de Jesus Zuñiga) para extraer citas, autores y etiquetas del sitio [quotes.toscrape.com](https://quotes.toscrape.com/). Guarde los resultados en tres formatos: **JSON**, **CSV** y **Excel (XLSX)**.

## ¿Qué hace mi scraper?

- Recorro todas las páginas del sitio de citas.
- Extraigo el texto de cada cita, el autor y las etiquetas asociadas.
- Guardo toda la información en tres archivos:
  - `quotes.json`
  - `quotes.csv`
  - `quotes.xlsx`

## Archivos generados

- **quotes.json**: Aquí guardo una lista de objetos con las citas, autores y etiquetas.
- **quotes.csv**: Este archivo está separado por comas y es compatible con Excel y otros programas.
- **quotes.xlsx**: Es un archivo Excel con todas las citas que obtuve.

## Instalación

1. Clona este repositorio o descarga los archivos.

2. Instala las dependencias (debes tener [Node.js](https://nodejs.org/) instalado):

   ```sh
   npm install request-promise cheerio json2csv xlsx
   ```

## Ejecución

Ejecuto el scraper con Node.js así:

```sh
node app.js
```

Al terminar, encontrarás los archivos `quotes.json`, `quotes.csv` y `quotes.xlsx` en la misma carpeta (Archivos).

---