import React, { useState } from "react";
import { Table } from "reactstrap";
import HeaderCompras from './Header/HeaderCompras/HeaderCompras'
import HeaderProducts from './Header/HeaderProducts/HeaderProducts'
import BodyProducts from "./Body/BodyProducts/BodyProducts";
import BodyCompras from './Body/BodyCompras/BodyCompras';


class TableMod extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    var tableHeader = <h1>Carregando ...</h1>;
    var tableBody = <h2>Carregando ...</h2>;

    if(this.props.tableFor==="produto")  {
        tableHeader = <HeaderProducts/>
        tableBody = <BodyProducts row = {this.props.row}/>
    }
    if(this.props.tableFor==="compra")  {
        tableHeader = <HeaderCompras/>
        tableBody = <BodyCompras row = {this.props.row}/>
    }
    /*
    
    */
    
    return (
      <Table dark>
        <thead>
          {tableHeader}
        </thead>
        {tableBody}
        
      </Table>
    );
  }
}
export default TableMod;
