module.exports = async (req, res) => {
    const collection = req.app.locals.collection;
    const sort = { year: 1 };
    let results = await collection.find().sort(sort).toArray();
    res.send(results).status(200);
}