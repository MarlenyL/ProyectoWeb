/*const pug = require('pug');
const compiledFunction = pug.compileFile('../../../views/lateral.pug');

compiledFunction({
    someone:'rocio'
});*/
let locals ={
    someone:"rocio"
}


res.render('../../../views/lateral.pug',locals);