import { useState, useEffect } from 'react'
import api from "../../../services/api";
import '../form.style.css'

import {
    Button,
    Form,
    FormGroup,
    Label,
    Input
  } from "reactstrap";

function FormCompra (){

    var [tipoPagamento,setTipoPagamento] = useState("BOLETO")
    var [status,setStatus] = useState("EM ESPERA")
    var [produto,setProduto] = useState(null)
    var [quantidadeP,setQuantidadeP] = useState(0)
    var [produtosSelect,setProdutosSelect] = useState([])
    var [desabledSelectQuantidade,setdesabledSelectQuantidade] = useState(true)
    var [valorContext,setValorContext] = useState(0)

    useEffect(() => {
      api
        .get("produto")
        .then((response) => setProdutosSelect(response.data))
        .catch((err) => {
          console.error("erro no server: " + err);
        });
    }, []);

    function inserirNovaCompra(e){
      
      if(
        produto !== null &&
        quantidadeP !==0  &&
        desabledSelectQuantidade !== true &&
        valorContext !==0
      ){
        const newCompra = {
          total: (valorContext*quantidadeP),
          tipo_pagamento: tipoPagamento,
          status: status,
          produtoId: produto.id
        }
        api.post(
          "compra", newCompra
        ).catch((e)=>{
          console.error("ERROR:"+ e)
        })
        
      }else{
        e.preventDefault();
        alert("INSIRA VALORES CORRETAMENTE")
      }
      

    }
    function findProdutoId(id){
      const produtoContext = produtosSelect.find(elem => elem.id==id)
      setProduto(produtoContext)
      setValorContext(produtoContext.preco)
    }
    
    
    return(
        <Form className='form_ed' onSubmit={inserirNovaCompra}>
               <div row>
                  <div className="col text-center">
                  <h4>VALOR PRODUTO: {valorContext} R$</h4>
                  <h4>VALOR TOTAL: {(valorContext*quantidadeP).toFixed(2)} R$</h4>
                  </div>
                </div>

              <FormGroup row>
                <Label>Selecione um Produto</Label>
                <Input 
                type="select" 
                name="selectProduto" 
                id="selectCompra" 
                onChange = {(e)=>{
                  if(e.target.value!=0) {
                    setdesabledSelectQuantidade(false)
                    findProdutoId(e.target.value)
                  }
                  else {
                    setdesabledSelectQuantidade(true)
                    setValorContext(0)
                    setQuantidadeP(0)
                  }
                }}>
                  <option key= {0} value={0}> SELECIONE UM PRODUTO</option>
                  {
                    produtosSelect.map((item)=>(
                      <option key= {item.id}  id= {item.id} value={item.id} >{item.name}</option>
                    ))
                  }
                </Input>
                
              </FormGroup>
              <FormGroup row>
                <Label>Selecione uma quantidade</Label>
                <Input type="number" name="quantidade" value={quantidadeP} onChange = {e => setQuantidadeP(e.target.value)} disabled={desabledSelectQuantidade}>

                </Input>
              </FormGroup>


              <FormGroup row>
                <Label>Tipo de Pagamento</Label>
                <Input type="select" name="selectTipoPagemento" id="selectTipoPagemento" onChange={e => setTipoPagamento(e.target.value)}>
                <option value='BOLETO'>BOLETO</option>
                <option value='CARTÃO'>CARTÃO</option>
                </Input>
                
              </FormGroup>
              <FormGroup row>
                <Label >Status de Compra</Label>
                <Input type="select" name="selectStatus" id="selectStatus" onChange={e => setStatus(e.target.value)}>
                <option>EM ESPERA</option>
                <option>FINALIZADO</option>
                <option>CANCELADO</option>
                </Input>
                
              </FormGroup>
                
              <div row>
                  <div className="col text-center">
                  <Button type='submit' className='btn_ed' color="primary" size="lg" block>CADASTRAR</Button>
                    </div>
                </div>
              
            </Form>
    )
}
export default FormCompra;