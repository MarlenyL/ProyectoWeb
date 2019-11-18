var StudentManager = {};

let myJson={
    someone:'rocio'
}
StudentManager.get = (req, res, next) =>{
    return myJson;
};

module.exports = StudentManager;