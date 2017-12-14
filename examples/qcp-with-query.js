/**
 * Example of making a SOQL query
 * 
 * @export
 * @param {any} quoteModel 
 * @param {any} quoteLineModels 
 * @param {any} conn 
 * @returns 
 */
export function onBeforeCalculate(quoteModel, quoteLineModels, conn) {
    return new Promise((resolve, reject) => {
        console.log('quoteModel', quoteModel);
        console.log('quoteLineModels', quoteLineModels);
        console.log('conn', conn);

        conn.query('SELECT Id FROM Account', (err, results) => {
            console.log('err', err);
            console.log('results', results);
            if(err) return reject(new Error('Error querying data'));
            /** Do logic here */
            resolve();
        });
    });
}

/**
 * Example of HTTP put
 * 
 * @export
 * @param {any} quoteModel 
 * @param {any} quoteLineModels 
 * @param {any} conn 
 * @returns 
 */
export function onAfterCalculate(quoteModel, quoteLineModels, conn) {
    return new Promise((resolve, reject) => {
        console.log('quoteLineModels', quoteLineModels);
        console.log('conn', conn);
        console.log('Performing callout');
        
        conn.apex.put('/rest-test', {text: "foo bar"})
        .then(results => {
            console.log('Results', results);
            resolve();
        })
        .catch(err => {
            console.error('Error', err);
            resolve(); // resolving so entire process does not halt
        })
    });
};


/** Sample Apex Class custom endpoint */
// @RestResource(urlMapping='/rest-test/*')
// global with sharing class RESTTest {
    
//     @HttpPost
//     global static String doPost(String text) {
//         System.debug('string: ' + text);
//         return text;
//     }
    
//     @HttpPut
//     global static String doPut(String text) {
//         System.debug('string: ' + text);
//         return text;
//     }
// }