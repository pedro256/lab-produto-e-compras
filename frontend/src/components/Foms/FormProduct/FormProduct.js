import { useState, useEffect } from 'react'
import api from "../../../services/api";
import '../form.style.css'

import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
  } from "reactstrap";

function FormProduct (){

    const [name,setName] = useState("")
    const [preco,setPreco] = useState(0)
    const [descricao,setDescricao] = useState("")



    function inserirNovoProduto(e){
      if(
        name.length<=4 ||
        preco <=0.1 ||
        descricao.length <=4
      ){
        e.preventDefault();
        alert("INSIRA VALORES MAIORES")
      }else{
        const response = api.post(
          "produto",
          {
              name,descricao,preco
          }
      )
      }
      
        

    }
    return(
        <Form className='form_ed' onSubmit={inserirNovoProduto}>
              <FormGroup row>
                <Label>Nome Produto</Label>
                <Input
                  name="name"
                  placeholder="escreva o nome do produto"
                  value = {name}
                  onChange = {e => setName(e.target.value)}
                  required
                />
                
              </FormGroup>
              <FormGroup row>
                <Label >Preço Produto</Label>
                <Input
                  name="preco"
                  placeholder="0.0"
                  value = {preco}
                  onChange = {e => setPreco(e.target.value)}
                  required
                />
                
              </FormGroup>
              <FormGroup row>
                <Label>Descricao do Produto</Label>
                <Input type="textarea" value={descricao} name="descricao" onChange = {e => setDescricao(e.target.value)}/>
                
              </FormGroup>
              <div row>
                  <div className="col text-center">
                  <Button className='btn_ed' color="primary">CADASTRAR</Button>
                    </div>
                </div>
              
            </Form>
    )
}
export default FormProduct;