const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const { Parser } = require('json2csv');
const XLSX = require('xlsx');

let quotesArray = [];

(async () => {
    try {
        console.log(':::: Iniciando Proceso ::::\n');

        let url = 'https://quotes.toscrape.com/';
        let pagina = 1;

        while (url) {
            console.log(`Página ${pagina}: ${url}`);

            let response = await requestPromise(url);
            const $ = cheerio.load(response);

            $('div[class="quote"]').each(function () {
                const texto = $(this).find('span[class="text"]').text().trim();
                const autor = $(this).find('small[class="author"]').text().trim();
                const tags = [];
                $(this).find('.tags a.tag').each(function () {
                    tags.push($(this).text().trim());
                });

                if (texto && autor) {
                    quotesArray.push({ texto, autor, tags });
                }
            });

            const nextLink = $('li.next > a').attr('href');
            if (nextLink) {
                url = `https://quotes.toscrape.com${nextLink}`;
                pagina++;
            } else {
                url = null;
            }
        }

        console.log(`\n Total de citas encontradas: ${quotesArray.length}`);

       
        fs.writeFileSync('./Archivos/quotes.json', JSON.stringify(quotesArray, null, 2));
        console.log(' Archivo JSON creado: quotes.json');

       
        const csvParser = new Parser({
            fields: ['texto', 'autor', 'tags'],
            transforms: [(row) => ({
                ...row,
                tags: Array.isArray(row.tags) ? row.tags.join(', ') : row.tags
            })]
        });
        const csv = csvParser.parse(quotesArray);
        fs.writeFileSync('./Archivos/quotes.csv', csv, 'utf-8');
        console.log(' Archivo CSV creado: quotes.csv');

    
        const quotesForExcel = quotesArray.map(q => ({
            texto: q.texto,
            autor: q.autor,
            tags: q.tags.join(', ')
        }));
        const worksheet = XLSX.utils.json_to_sheet(quotesForExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Citas');
        XLSX.writeFile(workbook, './Archivos/quotes.xlsx');
        console.log(' Archivo Excel creado: quotes.xlsx');

    } catch (error) {
        console.error(' Error:', error.message);
    }
})();
