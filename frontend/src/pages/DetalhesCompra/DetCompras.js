import react, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
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

function DetCompras(props) {
  const history = useHistory()
  var [idCompra, setIdCompra] = useState(0);
  var [total, setTotal] = useState(null);
  var [data_criacao, setDataCriac] = useState(null);
  var [tipo_pagamento, setTipoPagamento] = useState("");
  var [status, setStatus] = useState("");
  var [produtoNome, setProdutoNome] = useState("");
  var [isEditing, setIsEditing] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    api
      .get("/compra/" + id)
      .then((response) => {
        setIdCompra(response.data.id);
        setDataCriac(response.data.data_criacao);
        setTotal(response.data.total);
        setTipoPagamento(response.data.tipo_pagamento);
        setStatus(response.data.status);
        setProdutoNome(response.data.produto.name);
      })
      .catch((err) => {
        console.error("erro no server: " + err);
      });
  }, []);

  function editData(e) {
    if(
        total>=0.1
    ){
        api.put("/compra/"+idCompra,{
            total,tipo_pagamento,status
        }).then(response => alert("DADOS SALVOS"))
    }else{
        e.preventDefault();
        alert("PREENCHA OS DADOS CORRETAMENTE")
    }
  }
  
  function excluirDados(){
    if(window.confirm("DESEJA APAGAR ESTE DADO?(ISSO PODE AFETAR OUTRA TABELA)")){
      api.delete("/compra/"+idCompra).then((response)=> {
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
        <Form onSubmit={editData}>
            <Row>
                <Col>
                <Link to = "/compras">
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
            <Label>Total da Compra</Label>
            <Input
              name="total"
              placeholder="0"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              required
              disabled={!isEditing}
            />
          </FormGroup>
          
          <FormGroup row>
                <Label>Tipo de Pagamento</Label>
                <Input type="select" name="selectTipoPagemento" id="selectTipoPagemento" onChange={e => setTipoPagamento(e.target.value)} disabled={!isEditing}>
                <option value={tipo_pagamento}>{tipo_pagamento}</option>
                <option value='BOLETO'>BOLETO</option>
                <option value='CARTÃO'>CARTÃO</option>
                </Input>
                
            </FormGroup>

            <FormGroup row>
                <Label >Status de Compra</Label>
                <Input type="select" name="selectStatus" id="selectStatus" onChange={e => setStatus(e.target.value)} disabled={!isEditing}>
                <option value={status}>{status}</option>
                <option>EM ESPERA</option>
                <option>FINALIZADO</option>
                <option>CANCELADO</option>
                </Input>
                
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
          <h3>Sobre o Produto</h3>
          <h4>Nome: {produtoNome}</h4>
        
        </Form>
        
      </Container>
    </div>
  );
}
export default DetCompras;
