export const CONSTANTS = {
    DEBUG: true,
    DS01: 'DS01'
};

export function onInit(quoteLineModels) {
    debug('onInit()', quoteLineModels);
    return Promise.resolve();
}

export function onBeforeCalculate(quoteModel, quoteLineModels) {
    debug('onBeforeCalculate()', quoteModel, quoteLineModels);
    return Promise.resolve();
}

export function onBeforePriceRules(quoteModel, quoteLineModels) {
    debug('onBeforePriceRules()', quoteModel, quoteLineModels);


    return Promise.resolve();
}

export function onAfterPriceRules(quoteModel, quoteLineModels) {
    debug('onAfterPriceRules()', quoteModel, quoteLineModels);
    
    rollUpBrandedContent(quoteLineModels);

    return Promise.resolve();
}

export function onAfterCalculate(quoteModel, quoteLineModels) {
    debug('onAfterCalculate()', quoteModel, quoteLineModels);
    return Promise.resolve();
}

export function printRecords(obj) {
    obj = Array.isArray(obj) ? obj : [obj];
    debug(obj.map(obj => obj.record));
}

function debug(...args) {
  if(CONSTANTS.DEBUG) {
    console.log(...args);
  }
}

/**
 * @description This example method shows rolling up bundle values from child quote lines
 * to a parent quote line.
 * Modify buildBundle to pass in a list of product codes of bundle wrappers that should be rolled up (could modify to check some other criteria)
 * Then call getMinValue() / getMaxValue() / getSummedValue() for the fields that should be aggregated - save each to a variable, as shown below
 * Then set these fields on the parent record
 * 
 * @param {any} quoteLineModels 
 */
function rollUpBundleValue(quoteLineModels) {
    // returns: {parents: [], children: {[key: number]: []}}
    const bundle = buildBundle(quoteLineModels, [CONSTANTS.DS01]);
    debug('bundle', bundle);
    Object.keys(bundle.children).forEach(parentKey => {
        const currBundle = bundle.children[parentKey];
        const Sponsorship_Start__c = getMinValue(currBundle, 'Sponsorship_Start__c');
        const Sponsorship_End__c = getMaxValue(currBundle, 'Sponsorship_End__c');
        const Target_Views_Impressions__c = getSummedValue(currBundle, 'Target_Views_Impressions__c');
        const SBQQ__ListPrice__c = getSummedValue(currBundle, 'SBQQ__ListPrice__c');
        // const netUnitPrice = getSummedValue(currBundle, '');
        const parentRec = quoteLineModels.find(ql => String(ql.key) === String(parentKey));
        parentRec.record.Sponsorship_End__c = Sponsorship_End__c;
        parentRec.record.Sponsorship_Start__c = Sponsorship_Start__c;
        parentRec.record.Target_Views_Impressions__c = Target_Views_Impressions__c;
        parentRec.record.SBQQ__ListPrice__c = SBQQ__ListPrice__c;
        debug('rolled up values', {
            Sponsorship_End__c,
            Sponsorship_Start__c,
            Target_Views_Impressions__c,
            SBQQ__ListPrice__c,
        }, {currBundle, parentRec});
    });
}

/**
 * Builds a map of a bundle using the parent key
 * @param  quoteLineModels
 * @param  {string | string: []} quoteLineModels
 * @return {parents: [], children: {}}
 */
function buildBundle(quoteLineModels, productCodes) {
    productCodes = productCodes || [];
    productCodes = Array.isArray(productCodes) ? productCodes : [productCodes];
    return quoteLineModels.reduce((bundle, line) => {
        if(line.parentItemKey && productCodes.includes(line.parentItem.record.SBQQ__ProductCode__c)) {
            if(!Array.isArray(bundle.children[line.parentItemKey])) {
               bundle.children[line.parentItemKey] = []; 
            }
            bundle.children[line.parentItemKey].push(line);
        } else {
            bundle.parents.push(line);
        }
        return bundle;
    }, {parents: [], children: {}});
}

/**
 * Get minimum value from a list of quote lines
 * If a field is null/undefined, it will be ignored in calculation
 */
function getMinValue(childrenQuoteLineModels, prop) {
    return childrenQuoteLineModels.reduce((min, line) => {
        if(line.record[prop]) {
            if(!min || min > line.record[prop]) {
                min = line.record[prop];
            }
        }
        return min;
    }, null);
}

/**
 * Get the maximum value from a list of values.
 * If a field is null/undefined, it will be ignored in calculation
 */
function getMaxValue(childrenQuoteLineModels, prop) {
    return childrenQuoteLineModels.reduce((min, line) => {
        if(line.record[prop]) {
            if(!min || min < line.record[prop]) {
                min = line.record[prop];
            }
        }
        return min;
    }, null);
}

/**
 * Get the summed value from a list of values.
 * If a field is null/undefined, it will be ignored in calculation
 */
function getSummedValue(childrenQuoteLineModels, prop) {
    return childrenQuoteLineModels.reduce((sum, line) => {
        if(typeof line.record[prop] === 'number') {
            sum += line.record[prop];
        }
        return sum;
    }, 0);
}
