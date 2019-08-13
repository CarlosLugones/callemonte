<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8 "> 
        <h1 class="title mt-5">
          <a :href="prevPath" title="Regresar a la búsqueda">&#8249;</a>
          Nosotros
        </h1>
        <div class="mb-5">
          <p class="lead text-justify"><b>Callemonte.com</b> <i>(anteriormente unclic.pro)</i> es un buscador de clasificados de productos en sitios de Cuba: <a href="https://www.revolico.com" rel="nofollow" target="_blank">revolico</a>, <a href="https://www.bachecubano.com"  rel="nofollow" target="_blank">bachecubano</a>, <a href="https://1cuc.com" rel="nofollow" target="_blank">1cuc</a>, <a href="https://www.timbirichi.com" rel="nofollow" target="_blank">timbirichi</a> y <a href="https://porlalivre.com" rel="nofollow" target="_blank">porlalivre</a>,  <a href="https://merolico.app" rel="nofollow" target="_blank">merolico</a>, <a href="https://riquera.com" rel="nofollow" target="_blank">riquera</a> y seguiremos incrementando la lista. Si tienes algún sitio que agregar <a href="/contact">contáctenos</a></p>
          <p class="lead">El objetivo de Callemonte es facilitar la búsqueda de lo que necesites comprar.</p>
          
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
            <p class="lead text-justify">Filtra los anuncios que están repetidos incluso si se repiten en varios sitios.</p>
          </div>

          <div class="col-sm-6">      
            <h3>Sin publicidad.</h3>
            <p class="lead text-justify">No se muestra ninguna publicidad solo los anuncios de su interés. </p>
          </div>

        </div>
        <p class="lead">Callemonte está en desarrollo y puede que tenga algún problema no dudes en <a href="/contact">escribirnos</a> para hacerlo mejor.</p>


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