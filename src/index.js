const { request, response } = require("express");
const express = require("express");

const {v4: uuidv4} = require("uuid");

const app = express();

app.use(express.json());

// customers = clientes
const customers = [];

//middleware
function verifyIfExistsAccountCPF(request, response, next){
const { cpf } = request.headers;

function getBalance(statemant){
    // essa funçao reduce trasnforma em um valor somente, ou seja o que entrou +  menos - aquilo que saiu
    // acc = acumulador variavel responsavel por armazenar o valor que estamos ou adicionando ou removendo de dentro do nosso objeto
    
}

const customer = customers.find((customer) => customer.cpf === cpf);
// se nao existir um cliente ele vai mostrar a mensagem
if (!customer){
    return response.status(400).json({ error: "cliente nao encontrado"});
}
request.customer = customer;

return next();
}
/**
 * cpf - string
 * name - string
 * id - uuid (identificador unico universal) (para utiliza-lo precisa instalar no terminal so colocar npm i uuid)
 * gera um numero que vai definir nosso id
 * statement - lançametos que nossa conta vai ter
 *  ele é um []
 */



app.post("/account", (request, response) => {
const {cpf, name} = request.body;
// vai fazer uma busca e vai comparar se o cpf ja existe vai dar verdaeiro ou falso
const customersAlredyExist = customers.some((customers) => customers.cpf === cpf);

if(customersAlredyExist){
    return response.status(400).json({ error: "cpf ja existe!"})
}




customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
});
return response.status(201).send();
});
// statement = estrato bancario
app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
 const {customer} = request;


return response.json(customer.statement);
})
// deposito que se conecta com o statement[] (array que estava vazio)
app.post("/deposit",verifyIfExistsAccountCPF, (request, response) => {
    const { description, amount} = request.body;
//aqui ele verifica se a conta é valida
    const {customer} = request;
//array
    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }
    // aqui ele insere dentro do statemant
    customer.statement.push(statementOperation);
    //se tudo da certo retorna isso:
    return response.status(201).send();
});
//saque
app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
    const { amount} = request.body;

    const { customer } = request;
})
app.listen(4444);