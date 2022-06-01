
import { alterarImagem, inserirFilme } from '../repository/filmeRepository.js'

import multer from 'multer'
import { Router } from 'express1'

const server = Router();
const upload = multer({ dest: 'strorage/capasfilmes' })


server.post('/filme', async (req,resp) => {
    try{
        const novoFilme = req.body;

        if (!novoFilme.nome)
            throw new Error( 'Nome do filme é obrigatório!');

        if (!novoFilme.sinopse)
            throw new Error('Sinopse do filme é obrigatória!');
        
        if (!novoFilme.avaliacao == undefined || novoFilme.avaliacao < 0)
            throw new Error('Avaliação do filme é obrigatória!');

        if (!novoFilme.lancamento)
            throw new Error('Lançamento do filme é obrigatório!');

        if (!novoFilme.disponivel)
            throw new Error('Campo Disponível é obrigatório!');

        if (!novoFilme.usuario)
            throw new Error('Usuário não logado!');


        const filmeInserido = await inserirFilme(novoFilme);
        resp.send(filmeInserido);

   }catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.put('/filme/:id/imagem', upload.single('capa') , async (req,resp) => {
    try{
        const { id } = req.params;
        const imagem = req.file.path;

        const resposta = await alterarImagem(imagem, id);
        if(resposta != 1)
            throw new Error( 'A imagem não pode ser salva.');

        resp.status(204).send();
    }catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})




export default server;
