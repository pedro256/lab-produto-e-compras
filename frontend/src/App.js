import React from "react";

import {BrowserRouter,Switch,Route} from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import Compra from './pages/Compra/Compra'
import Products from "./pages/Products/Products";
import DetCompra from './pages/DetalhesCompra/DetCompras';
import DetProduto from './pages/DetalhesProducts/DetProducts';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <BrowserRouter>
        <Switch>
          <Route path="/compras" exact={true} component={Compra} />
          <Route path="/produtos" exact={true} component={Products} />
          <Route path="/detalhes-compra/:id" component = {DetCompra} />
          <Route path="/detalhes-produto/:id" component = {DetProduto} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
