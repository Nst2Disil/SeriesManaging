module.exports = async (req, res) => {
    const collection = req.app.locals.collection;
    let series = req.body;
    let result = await collection.insertOne(series);
    res.send(result).status(204);
}