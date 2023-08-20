import { Router } from "express";
import { deletarContato, nomeContatos, inserirContato, todosContatos, favoritosContatos, alterarContato, periodoCadastro,  } from "../repository/agendaRepository.js";

const server = Router();

server.get('/contato', async  (req, resp) =>{
    try {
        const data = await todosContatos();
        resp.send(data)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.post('/contato', async (req, resp) =>{
    try {
        const add = req.body
        const data = await inserirContato(add)
        resp.send(data)
    } catch (err) {
        resp.status(400).send({
            erro: err.message            
        })
    }

})

server.get ('/contato/busca', async(req, resp) =>{
    try {
        const { nome } = req.query
        const data = await nomeContatos(nome)
        resp.send(data)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get ('/contato/favoritos', async (req, resp)=>{
    try {
        const data = await favoritosContatos()
        resp.send(data)
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/contato/cadastro', async (req, resp) =>{
    try {
     const {inicio} = req.query
     const {fim} = req.query
     const data = await periodoCadastro(inicio, fim)   
     resp.send(data)
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.put('/contato/:id', async (req, resp) =>{
    try {
        const addID = req.params.id
        const add = req.body
        const data = await alterarContato(add, addID)
        if(data != 1)
            throw new Error('O contato não pode ser alterado')
        else
        resp.status(204).send
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

server.delete('/contato/:id', async (req, resp)=>{
    try {
        const addID = req.params.id
        const data = await deletarContato(addID)
        if(data != 1)
            throw new Error('Contato não pode ser deletado');
            resp.status(204).send()
    } catch (err) {
        resp.status(400).send({
            erro:err.message
        })
    }
})

export default server;