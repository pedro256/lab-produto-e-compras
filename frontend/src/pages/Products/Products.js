import react, { useEffect, useState } from "react";
import TableMod from "../../components/Table/Table";
import {Row,Col,Container} from "reactstrap";
import FormProduct from "../../components/Foms/FormProduct/FormProduct";

import api from "../../services/api";
function Products() {
  var [dados, setDados] = useState([]);

  useEffect(() => {
    api
      .get("produto")
      .then((response) => setDados(response.data))
      .catch((err) => {
        console.error("erro no server: " + err);
      });
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col xs="4">
          <h3 className="text-center">NOVO PRODUTO</h3>
            <FormProduct/>
          </Col>
          <Col xs="8">
            <h1 className="text-center">PRODUTOS</h1>
            <TableMod tableFor="produto" row={dados}></TableMod>
          </Col>
        </Row>
        <Row>
          
        </Row>
      </Container>
    </div>
  );
}

export default Products;
