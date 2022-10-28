const itemController = require("../controllers/item.controller");
const itemRouter = require("express").Router()
const controllers = new itemController();
 
// Get all fashion items
itemRouter.get('/items/all', (req, res) => controllers.getAllItems(req, res));

itemRouter.get('/item/', (req, res) => controllers.getItemsByName(req, res));

itemRouter.post('/item/create', (req, res) => controllers.createFashionItem(req, res));

itemRouter.put('/item/update', (req, res) => controllers.updateFashionItem(req, res));

itemRouter.get('/items/mini', (req, res) => controllers.getAllItemsByPageSize(req, res));

module.exports= itemRouter;