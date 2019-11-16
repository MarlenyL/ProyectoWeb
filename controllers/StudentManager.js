var StudentManager = {};

let myJson={
    name: 'Rocio Marleny Landaverde Solis',
    someone:'rocio',
    saldo: 20
}
StudentManager.get = (req, res, next) =>{
    return myJson;
};

module.exports = StudentManager;