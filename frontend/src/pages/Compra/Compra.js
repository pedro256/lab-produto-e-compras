import react ,{useEffect,useState} from "react";
import TableMod from "../../components/Table/Table";
import FormCompra from '../../components/Foms/FormCompra/FormCompra'
import {Row,Col,Container} from "reactstrap";
import api from "../../services/api"
function Compra() {

  var [dados,setDados] = useState([])

  useEffect(()=>{
    api.get("compra")
    .then((response)=> setDados(response.data))
    .catch((err)=>{
      console.error("erro no server: "+err)
    })

  },[]);

  return (
    <div >
        <Container>
        <Row>
          <Col xs="4">
          <h3 className="text-center">NOVA COMPRA</h3>
            <FormCompra/>
          </Col>
          <Col xs="8">
            <h1 className="text-center">COMPRAS</h1>
            <TableMod tableFor="compra" row={dados}></TableMod>
          </Col>
        </Row>
        <Row>
          
        </Row>
      </Container>
    </div>
  );
}

export default Compra;