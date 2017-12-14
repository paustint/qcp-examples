// http://community.steelbrick.com/t5/Plugins/JS-Quote-Calculator-Plugin-Template/ta-p/1862
/*
 * This is a sample plugin for use in the new JavaScript Quote Calculator. It exports all of the methods that
 * the calculator will look for, and documents their parameters and return types.
 *
 * These methods are all optional. One may export any, all, or none of them in order to achieve the desired behavior.
 *
 * Note that the plugin is an ES6 module. It is transpiled via Babel, and thus it is module-scoped by default. One may
 * use any elements of the ES6 language or syntax. However, the plugin must be able to run in both Browser and Node
 * environments. This means that one cannot expect browser global variables such as window to be available.
 */


/*
 * A note on Promises:
 *
 * A Promise is a built-in JavaScript object that allows for asynchronous programming in the browser. Promises allow
 * one to delay a certain action until another one has completed. Promises support a .then(success, failure) method,
 * where success is a function that is called when the promise resolves successfully, and failure is a function called
 * when the promise is rejected. If one wishes to do any asynchronous programming in the plugin (e.g. a server callout),
 * one must return a promise that resolves once that action is completed, to guarantee that calculation steps occur
 * in the proper order.
 *
 * If a method does not require asynchronous behavior, one may return a promise that resolves immediately as follows:
 * return Promise.resolve();
 *
 * Promises can resolve to a value, which is passed as a parameter to the .then() callbacks. You may use this fact in
 * your own code, but should also be aware that the promises that these methods return do not need to resolve to a value.
 * All modification should be done directly to the quote and line models provided in the parameters.
 *
 * For more information on promises, see the documentation here:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 */

/*
 * A note on JSForce:
 *
 * JSForce is a third-party library that provides a unified way to perform queries, execute Apex REST calls, use the
 * Metadata API, or make HTTP requests remotely. It can be imported by adding the following to the plugin:
 * import * as JSForce from "jsforce";
 *
 * From that point, it may be referenced as JSForce.
 *
 * For more information about JSForce, see the following resources:
 * https://jsforce.github.io/document/ (official documentation)
 * http://jsforce.github.io/jsforce/doc/ (API reference)
 */

/*
 * A note on QuoteModel and QuoteLineModel types.
 *
 * The JavaScript calculator represents Quote__c and QuoteLine__c objects as QuoteModel and QuoteLineModel objects
 * respectively. The underlying SObject is accessible through the .record property on both objects, which allows one
 * to reference fields by using their API name. For example, one can reference a custom field SBQQ__MyCustomField__c
 * on a given QuoteLineModel by accessing the attribute, record["SBQQ__MyCustomField__c"]. Additionally, there are many
 * documented utility methods on these models. One may also reference fields on related records. For example, if one
 * wishes to reference the field MyField__c on the Account object associated with a quote, one may do so by
 * accessing record["Account__r"]["MyField__c"].
 *
 */

/*
 * A note about Salesforce field types.
 *
 * The object records that one can manipulate in the plugin are stored in JavaScript Object Notation, or JSONs. They
 * are serialized from your org, and the types of certain fields may be converted. Number, Text, and Boolean fields are all stored without
 * any conversion, but other types may be converted. For example, dates are represented as strings of the format
 * "YYYY-MM-DD". If one references a field that contains a date, this must be taken into account. If one modifies
 * a date field, this format must be preserved.
 */





/**
 * This method is called by the calculator when the plugin is initialized.
 * @param {QuoteLineModel[]} quoteLineModels An array containing JS representations of all lines in a quote
 * @returns {Promise}
 */
export function onInit(quoteLineModels) {
    return Promise.resolve();
};

/**
 * This method is called by the calculator before calculation begins, but after formula fields have been evaluated.
 * @param {QuoteModel} quoteModel JS representation of the quote being evaluated
 * @param {QuoteLineModel[]} quoteLineModels An array containing JS representations of all lines in the quote
 * @returns {Promise}
 */
export function onBeforeCalculate(quoteModel, quoteLineModels) {
    return Promise.resolve();
};

/**
 * This method is called by the calculator before price rules are evaluated.
 * @param {QuoteModel} quoteModel JS representation of the quote being evaluated
 * @param {QuoteLineModel[]} quoteLineModels An array containing JS representations of all lines in the quote
 * @returns {Promise}
 */
export function onBeforePriceRules(quoteModel, quoteLineModels) {
    return Promise.resolve();
};

/**
 * This method is called by the calculator after price rules are evaluated.
 * @param {QuoteModel} quoteModel JS representation of the quote being evaluated
 * @param {QuoteLineModel[]} quoteLineModels An array containing JS representations of all lines in the quote
 * @returns {Promise}
 */
export function onAfterPriceRules(quoteModel, quoteLineModels) {
    return Promise.resolve();
};

/**
 * This method is called by the calculator after calculation has completed, but before formula fields are
 * re-evaluated.
 * @param {QuoteModel} quoteModel JS representation of the quote being evaluated
 * @param {QuoteLineModel[]} quoteLineModels An array containing JS representations of all lines in the quote
 * @returns {Promise}
 */
export function onAfterCalculate(quoteModel, quoteLineModels) {
    return Promise.resolve();
};
