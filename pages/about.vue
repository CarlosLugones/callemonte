<template>
  <div id="main"> 
    <div class="container">
      <div class="columns is-centered ">
        <div class="column is-6 content"> 
          <h1 class="title">Nosotros</h1>
          <p class="subtitle">Unclic busca clasificados de productos en sitios web de Cuba: <a href="#">revolico</a>, <a href="#">bachecubano</a>, <a href="#">1cuc</a>, </p>
          <p>Unclic es rápido, sencillo y extremedamente útil si ha pasado el trabajo de buscar algo para comprar.</p>
          <ul>
            <li><strong>Anuncios con precio:</strong> Unclic es un buscador de productos y todo producto a la venta debe tener un precio.</li>
            <li>
              <strong>Limpia el texto:</strong> Elimina los caracteres extraños como <code>* ! _</code> y las palabras y frases que no dicen nada como <i>Vendooo</i> o <i>llame ya</i> que solo molestan.</li>
            <li><strong>Formatea el anuncio:</strong> Unifica el formato de los anunciós y separa cada campo.</li>
            <li><strong>Elimina Duplicados:</strong> Filtra los anuncios que están repetidos.</li>
            <li><strong>Sin publicidad:</strong> No se muestran ni se mostrará ninguna publicidad solo los anuncios de su interés. </li>
            <li><strong>Búsquedas on-line:</strong> Todas las búsquedas se realizan directamente desde cada sitio. Unclic no tiene base de datos para guardar los anuncios.</li>
            <li><strong>Ahorra datos:</strong> Unclic consume un minimo de datos de su conexión porque el acceso a cada uno de los sitios se realiza desde sus propios servidores y devuelve solo los datos necesarios.</li>
          </ul>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    layout: 'default',
  head () {
    return {
      htmlAttrs: {
        class: 'has-navbar-fixed-top',
      }      
    }
  },
}
</script>