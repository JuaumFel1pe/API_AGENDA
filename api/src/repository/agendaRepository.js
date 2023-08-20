import config from "./connection.js";

export async function inserirContato (contato){
    const sql = `INSERT INTO TB_AGENDA(NM_CONTATO, DS_TELEFONE, DS_EMAIL, BT_FAVORITO, DT_CADASTRO)
    VALUES (?, ?, ?, ?, ?);`
    const [resp] = await config.query(sql, [contato.contato, contato.telefone, contato.email, contato.favorito, contato.cadastro])
    return resp[0];
}

export async function todosContatos(){
    const sql = `SELECT * FROM TB_AGENDA;`
    const [resp] = await config.query(sql)
    return resp;
}

export async function nomeContatos(nome){
    const sql = `SELECT * FROM TB_AGENDA
    WHERE NM_CONTATO LIKE ?;`
    const [resp] = await config.query(sql, [`%${nome}%`])
    return resp;
}

export async function favoritosContatos(){
    const sql = `SELECT * FROM TB_AGENDA
    WHERE BT_FAVORITO = 1;`
    const [resp] = await config.query(sql)
    return resp;
}

export async function periodoCadastro(inicio, fim){
    const sql = `SELECT * FROM TB_AGENDA
    WHERE DT_CADASTRO BETWEEN ? AND ?;`
    const [resp] = await config.query(sql, [inicio, fim])
    return resp;
}

export async function alterarContato(contato, id){
    const sql = `UPDATE TB_AGENDA
    SET NM_CONTATO = ?,
        DS_TELEFONE = ?,
        DS_EMAIL = ?,
        BT_FAVORITO = ?,
        DT_CADASTRO = ?
    WHERE ID_AGENDA = ?;`
    const [resp] = await config.query(sql, [contato.contato, contato.telefone, contato.email, contato.favorito, contato.cadastro, id])
    return resp.affectedRows;
}

export async function deletarContato(id){
    const sql= `DELETE FROM TB_AGENDA
    WHERE ID_AGENDA = ?;`
    const [resp] = await config.query(sql, [id])
    return resp.affectedRows;
}