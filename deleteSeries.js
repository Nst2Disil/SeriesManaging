const ObjectId = require('mongodb').ObjectId;

module.exports = async (req, res) => {
    const collection = req.app.locals.collection;
    const query = { _id: new ObjectId(req.params.id) };
    let result = await collection.deleteOne(query);
    res.send(result).status(200);
}