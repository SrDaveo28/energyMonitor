const { db } = require('../db/firebase');

exports.formatDay = (timestamp) => {
    let date = new Date(timestamp);

    let weekDay = date.getDay();

    let getWeekDay;

    switch (weekDay) {
        case 0:
            return getWeekDay = "Domingo"
        case 1:
            return getWeekDay = "Lunes"
        case 2:
            return getWeekDay = "Martes"
        case 3:
            return getWeekDay = "Miercoles"
        case 4:
            return getWeekDay = "Jueves"
        case 5:
            return getWeekDay = "Viernes"
        case 6:
            return getWeekDay = "Sabado"
    }

    return getWeekDay;
}

exports.execFirebase = async (data, method) => {
    db.collection(`${method}`).add(data);
    return console.log("saved");
}