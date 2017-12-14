
export function onInit(quoteLineModels, conn) {
    console.log('onInit()', quoteLineModels, conn);
    printRecords(quoteLineModels);
    return Promise.resolve();
}
export function onBeforeCalculate(quoteModel, quoteLineModels, conn) {
    console.log('onBeforeCalculate()', quoteModel, quoteLineModels, conn);
    printRecords(quoteLineModels);
    printRecords(quoteLineModels);
    return Promise.resolve();
}
export function onBeforePriceRules(quoteModel, quoteLineModels, conn) {
    console.log('onBeforePriceRules()', quoteModel, quoteLineModels, conn);
    printRecords(quoteLineModels);
    printRecords(quoteLineModels);
    return Promise.resolve();
}
export function onAfterPriceRules(quoteModel, quoteLineModels, conn) {
    console.log('onAfterPriceRules()', quoteModel, quoteLineModels, conn);
    printRecords(quoteLineModels);
    printRecords(quoteLineModels);
    return Promise.resolve();
}
export function onAfterCalculate(quoteModel, quoteLineModels, conn) {
    console.log('onAfterCalculate()', quoteModel, quoteLineModels, conn);
    printRecords(quoteLineModels);
    printRecords(quoteLineModels);
    return Promise.resolve();
}

export function printRecords(obj) {
    obj = Array.isArray(obj) ? obj : [obj];
    console.log(obj.map(obj => obj.record));
}
