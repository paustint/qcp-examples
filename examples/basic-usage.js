
/// DEBUG ///
const DEBUG = true;

/** Log to console if debug is enabled */
function debug(...args) {
    if(DEBUG) {
        console.log(...args);
    }
}

/// LIFECYCLE HOOKS ///

export function onInit(quoteLineModels, conn) {
    debug('onInit()');
    debug('quoteLineModel', quoteLineModels);
    debug('conn (jsforce connection object)', conn);
    debug('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    return Promise.resolve();
}
export function onBeforeCalculate(quoteModel, quoteLineModels, conn) {
    debug('onBeforeCalculate()', quoteModel, quoteLineModels, conn);
    debug('quoteModel', quoteModel);
    debug('quoteLineModel', quoteLineModels);
    debug('conn (jsforce connection object)', conn);
    debug('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    return Promise.resolve();
}
export function onBeforePriceRules(quoteModel, quoteLineModels, conn) {
    debug('onBeforePriceRules()', quoteModel, quoteLineModels, conn);
    debug('quoteModel', quoteModel);
    debug('quoteLineModel', quoteLineModels);
    debug('conn (jsforce connection object)', conn);
    logAdditionalDiscounts(quoteLineModels);
    debug('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    return Promise.resolve();
}
export function onAfterPriceRules(quoteModel, quoteLineModels, conn) {
    debug('onAfterPriceRules()', quoteModel, quoteLineModels, conn);
    debug('quoteModel', quoteModel);
    debug('quoteLineModel', quoteLineModels);
    debug('conn (jsforce connection object)', conn);
    logAdditionalDiscounts(quoteLineModels);
    debug('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    return Promise.resolve();
}
export function onAfterCalculate(quoteModel, quoteLineModels, conn) {
    debug('onAfterCalculate()', quoteModel, quoteLineModels, conn);
    debug('quoteModel', quoteModel);
    debug('quoteLineModel', quoteLineModels);
    debug('conn (jsforce connection object)', conn);
    debug('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    stampCalculationTimestamp(quoteModel);
    return Promise.resolve();
}

/// PRIVATE FUNCTIONS ///

/**
 * This method will stamp the time the calculation was most recently fired
 */
function stampCalculationTimestamp(quoteModel) {
    debug('stampCalculationTimestamp()');
    if(quoteModel.record.hasOwnProperty('Calculation_Timestamp__c')) {
        const timestamp = new Date().toISOString();
        quoteModel.record.Calculation_Timestamp__c = timestamp;
        debug('updating Calculation_Timestamp__c with current time', timestamp);
    } else {
        debug('Calculation_Timestamp__c field does not exist, not setting timestamp');
    }
}


function logAdditionalDiscounts(quoteLineModels) {
    debug('logAdditionalDiscounts()');
    quoteLineModels.forEach(line => {
        debug('line.Name', line.record.Name);
        debug('line.SBQQ__Number__c', line.record.SBQQ__Number__c);
        debug('line.record.SBQQ__Discount__c', line.record.SBQQ__Discount__c);
    });
}
