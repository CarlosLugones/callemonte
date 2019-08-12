<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8 "> 
        <h1 class="title mt-5">
          <a :href="prevPath" title="Regresar a la búsqueda">&#8249;</a>
          Nosotros
        </h1>
        <div class="mb-5">
          <p class="lead text-justify">Callemonte <i>(Anteriormente unclic.pro)</i> busca clasificados de productos en sitios web de Cuba: <a href="https://www.revolico.com" rel="nofollow">revolico</a>, <a href="https://www.bachecubano.com"  rel="nofollow">bachecubano</a>, <a href="https://1cuc.com" rel="nofollow">1cuc</a>, <a href="https://www.timbirichi.com" rel="nofollow">timbirichi</a> y <a href="https://porlalivre.com" rel="nofollow">porlalivre</a>,  <a href="https://merolico.app" rel="nofollow">merolico</a>, <a href="https://riquera.com" rel="nofollow">riquera</a> y seguiremos incrementando la lista. Si tienes algún sitio que agregar <a href="">contactenos</a></p>
          
        </div>
        <div class="row">
          <div class="col-sm-6">      
            <h3 class="">Gratis.</h3> 
            <p class="lead text-justify">No tiene que pagar nada por buscar lo quiere comprar.</p>
          </div>          

          <div class="col-sm-6">      
            <h3 class="">Rápido.</h3> 
            <p class="lead text-justify">Callemonte esté pensado para que sea rápido no usa imagenes, solo el texto necesario solo se centra en encontrar lo que quieres comprar.</p>
          </div>

          <div class="col-sm-6">      
            <h3 class="">Limpia el texto.</h3> 
            <p class="lead text-justify">Elimina los caracteres extraños como <code>* ! _</code> y las palabras y frases que no dicen nada como <i>Vendooo</i> o <i>llame ya</i> que solo molestan.</p>
          </div>
          <div class="col-sm-6">      
            <h3>Anuncios con precio.</h3>
            <p class="lead text-justify"> Callemonte es un buscador de productos y todo producto a la venta debe tener un precio.</p>
          </div>
          <div class="col-sm-6">      
            <h3>Elimina Duplicados.</h3> 
            <p class="lead text-justify">Filtra los anuncios que están repetidos incluso si se repiten n avarios sitios.</p>
          </div>

          <div class="col-sm-6">      
            <h3>Sin publicidad.</h3>
            <p class="lead text-justify">No se muestra ninguna publicidad solo los anuncios de su interés. </p>
          </div>

<!--           <div class="col-sm-6">      
            <h3>Búsquedas on-line.</h3>
            <p class="lead text-justify"> Todas las búsquedas se realizan directamente desde cada sitio. Callemonte no tiene base de datos para guardar los anuncios.</p>
          </div> -->
 <!--          <div class="col-sm-6">      
            <h3>Ahorra datos.</h3>
            <p class="lead"> Callemonte consume un mínimo de datos de su conexión porque las búsquedas se realizan desde sus propios servidores y devuelve solo los datos necesarios.</p>
          </div> -->
        </div>
        <p clas="lead">Callemonte está en desarrollo y puede que tenga algún problema no dudes en <a href="/contact">escribirme</a> para hacerlo mejor.</p>


      </div>
    </div>
    
  </div>

</template>

<script>
export default {
  data(){
    return {
      prevPath: '',
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevPath = from.fullPath
    })
  },
}
</script> 