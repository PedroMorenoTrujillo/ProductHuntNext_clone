import React from 'react';
import Layout from '../components/layouts/Layout';
import DetalleProducto from '../components/layouts/DetallesProducto';
import useProductos from '../hooks/useProductos';

const Populares = () => {
   
  const { productos } = useProductos('votos');
  
   return (
    <Layout>
       <div className="listado-productos">
         <div className="contenedor">
           <ul className="bg-white">
             {productos.map(producto => (
               <DetalleProducto
                 key={producto.id}
                 producto={producto}
               />
             ))}
           </ul>
         </div>
      </div>
    </Layout>
  )
}

export default Populares;