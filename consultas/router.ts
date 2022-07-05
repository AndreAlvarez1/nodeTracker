import { Router, Request, Response } from 'express'
import { conex } from "../classes/server";


var https = require('https');
const router = Router();


///// ============================================= /////
///// ============================================= /////
///// =================== GETS ==================== /////
///// ============================================= /////
///// ============================================= /////

router.get('/generales/:tabla', 
function(req: Request ,res: Response) {
    
    const query = "SELECT * FROM " + req.params.tabla + " WHERE status > 0 ";
    console.log('get from', req.params.tabla, query);
    
        conex.query(query, function(err:any, rows:any, fields:any) {
        if (err) throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});



router.get('/general/:tabla/:id', 
function(req: Request ,res: Response) {
    
    const query = "SELECT * FROM " + req.params.tabla + " WHERE id = " + req.params.id + " ";
    console.log('get from', req.params.tabla, query);
    
    conex.query(query, function(err:any, rows:any, fields:any) {
        if (err) throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});

router.get('/user/:email', 
function(req: Request ,res: Response) {
    
    const query = "SELECT * FROM users WHERE mail = '" + req.params.email + "' ";
    console.log('get from users', query);
    
    conex.query(query, function(err:any, rows:any, fields:any) {
        if (err) throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});


router.get('/transitos/:tipo/:fechaIni/:fechaFin', 
function(req: Request ,res: Response) {
    
    const query = "SELECT * FROM " + req.params.tipo + " WHERE status > 0 AND fecha BETWEEN '" + req.params.fechaIni + "' AND '" + req.params.fechaFin + "' ORDER BY fecha DESC";
    console.log('get transitos, ', query);
    
    conex.query(query, function(err:any, rows:any, fields:any) {
        if (err) throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});

router.get('/transitosXpatente/:tipo/:fechaIni/:fechaFin/:patente', 
function(req: Request ,res: Response) {
    
    const query = "SELECT * FROM " + req.params.tipo + " WHERE status > 0 AND fecha BETWEEN '" + req.params.fechaIni + "' AND '" + req.params.fechaFin + "' AND patente = '" + req.params.patente  +"'  ORDER BY fecha DESC";
    console.log('get transitos, ', query);
    
    conex.query(query, function(err:any, rows:any, fields:any) {
        if (err) throw err;
        res.json({ resultado: 'ok', datos: rows });
    });
});






///// ============================================= /////
///// ============================================= /////
///// =================== POST ==================== /////
///// ============================================= /////
///// ============================================= /////



// router.post('/post/users/:tarea', 

//     function(req: Request ,res: Response,) {
    
//     console.log('tarea', req.params.tarea);
    
//     let query = '';

//     if (req.params.tarea === 'insert') {
//         console.log('body de insert', req.body);
//        query = "INSERT INTO users ( firstname, lastname, email, rut, address, type, empresa_id, password, status)  VALUES ('" + req.body.firstname+ "', '" + req.body.lastname + "', '" + req.body.email + "', '" + req.body.rut + "', '" + req.body.address + "', " + req.body.type + ", " + req.body.empresa_id + ", '" + req.body.password + "', 1 )";
   
     

//     } else if (req.params.tarea === 'update'){
//         query = "UPDATE users SET firstname =  '" + req.body.firstname + "', lastname = '" + req.body.lastname + "', email = '" + req.body.email + "', rut = '" + req.body.rut + "', address = '" + req.body.address + "', type = " + req.body.type + ", empresa_id = " + req.body.empresa_id + ", password = '" + req.body.password + "', status = " + req.body.status + " WHERE id = '" + req.body.id + "'  ";
//     } else if (req.params.tarea === 'borrar') {
//         query = "UPDATE users SET status = 0 WHERE id = " + req.body.id + " ";
//     } else {
//         return;
//     }
//         console.log('query ->', query);
    
//     conex.query(query, function(err:any, rows:any, fields:any) {
//         if (err) throw err
//         res.json({ resultado: 'ok', datos: rows });
//     });
// });

router.post('/post/loteTransitos/:tipo', 

    function(req: Request ,res: Response,) {
    

        console.log('------------------------ PARAMS', req.params.tipo);



        let DATOS = '';
        // console.log('body', req.body);
        for (let x in req.body) {
            DATOS += "(" + req.body[x].companyId + ",'" + req.body[x].patente + "'," + req.body[x].autopistaId + ",'" + req.body[x].portico + "', '" + req.body[x].eje + "', '" + req.body[x].fecha + "', '" + req.body[x].hora + "', " + req.body[x].monto + ", " + req.body[x].status + ", '" + req.body[x].estado + "' ),"
        }
        
        DATOS = DATOS.slice(0, -1);
        
        // console.log('inserto lote usuarios', DATOS)
        
        let query = '';

        if (req.params.tipo == 'facturados'){
            query = "INSERT INTO transitosF (companyId, patente, autopistaId, portico, eje, fecha, hora, monto, status, estado) VALUES " + DATOS;
        } else {
            query = "INSERT INTO transitosNF (companyId, patente, autopistaId, portico, eje, fecha, hora, monto, status, estado) VALUES " + DATOS;
        }
        // ;

        console.log('query ->', query);
    
    conex.query(query, function(err:any, rows:any, fields:any) {
        if (err) throw err
        res.json({ resultado: 'ok', datos: rows });
    });
});




export default router;