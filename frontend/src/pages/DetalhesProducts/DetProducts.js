import react, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./detproducts.styles.css";
import  DataEditor from '../../utils/DataEditor'
import {Link,useHistory} from 'react-router-dom'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Col,
  Row,
} from "reactstrap";

function DetProducts(props) {
  const history = useHistory()
  var [idPro, setIdPro] = useState(0);
  var [data_atualizao, setDataAtuali] = useState(null);
  var [compras, setCompras] = useState([]);
  var [data_criacao, setDataCriac] = useState(null);
  var [descricao, setDescricao] = useState("");
  var [name, setName] = useState("");
  var [preco, setPreco] = useState(0);
  var [isEditing, setIsEditing] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    api
      .get("/produto/" + id)
      .then((response) => {
        setIdPro(response.data.id);
        setDataAtuali(response.data.data_atualizao);
        setCompras(response.data.compras);
        setDataCriac(response.data.data_criacao);
        setDescricao(response.data.descricao);
        setName(response.data.name);
        setPreco(response.data.preco);
      })
      .catch((err) => {
        console.error("erro no server: " + err);
      });
  }, []);

  function editData(e) {
    if(
        name.length>=4 &&
        preco >0.1 &&
        descricao.length>=4
    ){
        api.put("/produto/"+idPro,{
            name,preco,descricao
        }).then(response => alert("DADOS SALVOS"))
    }else{
        e.preventDefault();
        alert("PREENCHA OS DADOS CORRETAMENTE")
    }
  }
  
  function excluirDados(){
    if(window.confirm("DESEJA APAGAR ESTE DADO?(ISSO PODE AFETAR OUTRA TABELA)")){
      api.delete("/produto/"+idPro).then((response)=> {
        alert("ITEM EXCLUIDO !!")
        history.goBack()
      })
    }
  }
  function verificarAcao() {
    if (isEditing == true) {
      editData();
      setIsEditing(false)
    } else {
      setIsEditing(true);
    }
  }
  return (
    <div>
      <Container>
        <Form className="form_ed" onSubmit={editData}>
            <Row>
                <Col>
                <Link to = "/produtos">
                <Button className="btn_ed" color="success">
                  VOLTAR
                </Button>
                </Link>
                
                </Col>
            </Row>
          <Row>
            <Col>
              <div className="col text-center">
                <Button className="btn_ed" color= {isEditing ? "success" : "warning"} onClick={verificarAcao}>
                  {isEditing ? "SALVAR" : "EDITAR"}
                </Button>
              </div>
            </Col>
            <Col>
              <div className="col text-center">
                <Button className="btn_ed" color="danger" onClick={excluirDados}>
                  EXCLUIR
                </Button>
              </div>
            </Col>
          </Row>
          <FormGroup row>
            <Label>Nome Produto</Label>
            <Input
              name="name"
              placeholder="escreva o nome do produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={!isEditing}
            />
          </FormGroup>
          <FormGroup row>
            <Label>Preço Produto</Label>
            <Input
              name="preco"
              placeholder="0.0"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
              disabled={!isEditing}
            />
          </FormGroup>
          <FormGroup row>
            <Label>Descricao do Produto</Label>
            <Input
              type="textarea"
              value={descricao}
              name="descricao"
              onChange={(e) => setDescricao(e.target.value)}
              disabled={!isEditing}
            />
          </FormGroup>
          <FormGroup row>
            <Label>Data de Crição</Label>
            <Input
              name="data_criacao"
              placeholder="00/00/0000"
              value={DataEditor.formatarData(new Date(data_criacao))}
              disabled
            />
          </FormGroup>
          <FormGroup row>
            <Label>Data de Ultima Atualização</Label>
            <Input
              name="data_atualizacao"
              placeholder="00/00/0000"
              value={DataEditor.formatarData(new Date(data_atualizao))}
              disabled
            />
          </FormGroup>
        
        </Form>
        <h3>COMPRAS RELACIONADAS AO PRODUTO: </h3>
        {
          compras.map( item => (
            <div className="card margin-8 padding-8">
              <h4>Valor Total: {item.total} R$</h4>
              <h4>Comprado em {DataEditor.formatarData(new Date(item.data_criacao))}</h4>
              <h4>Pagado em {item.tipo_pagamento}</h4>
            </div>
            
          ))
        }
      </Container>
    </div>
  );
}
export default DetProducts;
