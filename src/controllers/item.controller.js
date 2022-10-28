// const itemRouter = require('../routes/items.routes');
const itemServiceImport = require('../services/fashion-service');

const itemService = new itemServiceImport();


class FashionController
{
    constructor(){

    }

    // Get all items
    async getAllItems(request, response){
        try {
            const all_fashion_items = await itemService.getAllFashionItems();
            
            return response.status(200).json(all_fashion_items);
        } catch (error) {
            console.log(error);
            return response.status(400).json({
                responseCode : 400,
                message : "no item found",
            });
        }
    }

    // Get All items by name
    async getItemsByName(request, response){
        let itemName = request.query.name;
        
        if(itemName === undefined){
            response.status(400).json({message: `Bad request. 'name' parameter is required! `})
        }

        itemName = String(itemName).trim();
        try{
            const itemsByName = await itemService.getItemsByName(itemName);
            response.status(200).json(itemsByName);
        }catch(error){
            response.status(400).json({
                message : "unable to fetch all items by given name."
            });
        }
    }

    async getAllItemsByPageSize(request, response)
    {
        let pageSize = request.query.pageSize;
        if(!pageSize)
            return response.status(400).json({message: 'Bad Request. Query must be provided'});
        pageSize = Number(pageSize);
        if(pageSize > 5)
            return response.status(400).json({message: 'Bad Request. Maximum page size is 5'});
        const pagedItems = await itemService.getItemsByPageSize(pageSize);
        return response.status(200).json(pagedItems);
    }

    async createFashionItem(request, response){
        const {name, quantity, price, description} = request.body;

        if (name === undefined)
            return response.status(400).json({message : 'name of the item is required'});
        if ( quantity === undefined)
            return response.status(400).json({message : 'quantity of the item is required'});
        if ( price === undefined)
            return response.status(400).json({message : 'price of the item is required'});
        if ( description === undefined)
            return response.status(400).json({message : 'description of the item is required'});
        
        try{
            const isCreated = itemService.createFashionItem(request.body);
            if(isCreated){
                return response.status(200).json({responseCode: 200, message: 'Item created successfully'});
            }
            return response.status(500).json({responseCode : 500, message: 'There is a problem with the server, try again later'});
        }catch(error){
            return response.status(400).json({
                message : "unable to create Item."
            });
        }

    }


    async updateFashionItem(req, res){
        try {
            const {id, name, quantity, price, description} = req.body;
            if( id === undefined ){
                return res.status(400).json({message:'Bad Request. ID field is required'});
            }
            const possibleItembyId = await itemService.getItemById(id);
            if(possibleItembyId === undefined || possibleItembyId === null || Object.keys(possibleItembyId).length === 0)
            {
                return res.status(400).json({message:'Bad Request. No item found that matches this ID.'});
            }
            if (name === undefined && quantity === undefined && price === undefined && description === undefined){
                return res.status(400).json({message:'Bad Request. At least a field must be present to update!'});
            }
            const isUpdated = await itemService.updateItems(req.body);
            if(isUpdated){
                return res.status(200).json({responseCode:200, message : 'Item updated successfully'});
            }else{
                return res.status(500).json({responseCode : 500, message:'Server error. Try again later.'})
            }
        } catch (error) {
            console.log(error)
            return res.status(400).json("Bad request, Unable to update item.");
        }
    }
    async deleteItemById(req, res){
        let itemId = req.query.id;
        if(!itemId){
            response.status(400).json({message: `Bad request. id parameter is required! `})
        }
        const itemFound = await itemService.checkItemById(itemId);
            if (itemFound === false)
                return res.status(400).json({
                    responseCode : 400,
                    message : "item with the id doesn't exist"
                });

        try {
            
            const isDeleted = await itemService.deleteItemById(Number(itemId));
            if (isDeleted === true){
                res.status(200).json({
                    responseCode : 200,
                    message : "Item successfully deleted",
                })
            }else{
                res.status(500).json({
                    responseCode : 500,
                    message : "Id does not exist",
                })
            }
            
        } catch (error) {
            return res.status(400).json({
                responseCode : 400,
                message : "Bad request, unable to delete item",
            })
        }
    }
}

module.exports = FashionController;