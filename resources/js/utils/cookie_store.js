const STORE_TABLE_COLLECTION = 'store_table_collection';

export function setStoreTableCollection(value) {
    document.cookie = STORE_TABLE_COLLECTION + '=' + value
}

export function getStoreTableCollection() {

    let tableCollectionId = document.cookie
    return tableCollectionId.substr(STORE_TABLE_COLLECTION.length + 1)
}