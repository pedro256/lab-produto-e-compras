import React from 'react'
import {Button} from 'reactstrap'
import {Link} from 'react-router-dom'

function BodyProducts(props){
    var dados = props.row
    return (
        <tbody>
            {
                dados.map((item)=>(
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.descricao}</td>
                        <td>{item.preco}</td>
                        <td>
                            <Link to={"/detalhes-produto/"+item.id}>
                            <Button color="primary" >DETALHES</Button>
                            </Link>
                            
                        </td>
                    </tr>
                ))
            }
        </tbody>
    )
}

export default BodyProducts;