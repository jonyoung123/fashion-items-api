const db = require('../database/datastore');
const repo = require('../database/datastore')

class FashionService
{
    constructor(){
        this.fashionTableName = 'fashion_items';
    }

    // CREATION SERVICES
    async createFashionItem(object)
    {
        let isCreated = false;

        let query = `insert into ${this.fashionTableName} (name, quantity, price, description) 
                        values ('${object.name}', ${object.quantity}, ${object.price}, '${object.description}')`;
        try{
            await repo.none(query);
            isCreated = true;
        }catch(error){
            console.log(error);
        }

        return isCreated;
    }



    // GET/RETRIEVE
    async getAllFashionItems()
    {
        const items = await repo.many('select * from ' + this.fashionTableName);
        return items;
    }

    async getItemsByName(itemName){
        const itemsByName = await repo.many(`select * from  ${this.fashionTableName} where name = '${itemName}' `);
        return itemsByName;
    }

    async getItemById(id){
        id = Number(id)
        let possibleItem = null;
        try{
            const item = await repo.one(`select * from ${this.fashionTableName} where id = ${id}`);
            possibleItem = item;
        }catch(error){
            
        }
        return possibleItem;
    }

    async getItemsByPageSize(pageSize)
    {
        return await (await this.getAllFashionItems()).slice(0, pageSize);
    }

    // UPDATE SERVICE
    async updateItems(object)
    {
        let isUpdated = false;
        const id = object.id;
        const name = object.name;
        const quantity = object.quantity;
        const price = object.price;
        const description = object.description;

        let query = `update ${this.fashionTableName} set `;
        if(name !== undefined)
            query = query + ` name = '${name}', `;
        if(quantity !== undefined)
            query = query + ` quantity = ${quantity}, `
        if(price !== undefined)
            query = query + ` price = ${price}, `
        if (description !== undefined)
            query = query + ` description = '${description}', `
        
        query = query.trim().slice(0, -1) + ` where id = ${id}`;

        console.log(query);

        try{
            await repo.result(query);
            isUpdated = true;
        }catch(error){
            console.log(error);
        }
        return isUpdated;
    }
}

module.exports = FashionService;