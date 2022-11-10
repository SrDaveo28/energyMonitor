const { db } = require('../db/firebase');


exports.getData = async (req, res) => {
    const snapshot = await db.collection('energy').get();

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

