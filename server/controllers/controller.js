const { db } = require('../db/firebase');


exports.getDataStatic = async (req, res) => {
    const snapshot = await db.collection('estatico').get();

    const energyData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return res.status(200).json(energyData);

}
exports.getDataStaticVolts = async (req, res) => {
    const snapshot = await db.collection('estatico').get();

    const energyData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    const result = energyData.map((result) => {
        const { data } = result;

        return data
    })
    return res.status(200).json(result);

}
exports.getDataDinamicVolts = async (req, res) => {
    const snapshot = await db.collection('dinamico').get();

    const energyData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    const result = energyData.map((result) => {
        const { data } = result;

        return data
    })
    return res.status(200).json(result);

}
exports.getDataDinamic = async (req, res) => {
    const snapshot = await db.collection('dinamico').get();

    const energyData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return res.status(200).json(energyData);

}

exports.createData = (req, res) => {

    const {
        dia,
        estatico,
        dinamico,
        fecha
    } = req.body;

    db.collection("energy").add({
        dia,
        estatico,
        dinamico,
        fecha
    });
    return res.status(200).json({ message: 'Created Successfully' });
}

