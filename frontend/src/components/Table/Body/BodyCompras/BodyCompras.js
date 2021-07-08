import React from 'react'
import {Button} from 'reactstrap'
import {Link} from 'react-router-dom'

function BodyCompras(props){
  var dados = props.row
  console.log(dados)
  return (
    <tbody>
        {
            dados.map((item)=>(
                <tr>
                    <td>{item.id}</td>
                    <td>{item.total}</td>
                    <td>{item.tipo_pagamento}</td>
                    <td>{item.status}</td>
                    <td>
                        <Link to={"/detalhes-compra/"+item.id}>
                            <Button color="primary">DETALHES</Button>
                        </Link>
                    </td>
                </tr>
            ))
        }
    </tbody>
)
}

export default BodyCompras