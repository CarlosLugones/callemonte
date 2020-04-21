¸<template>
  <div >
        <div class="d-flex justify-content-center align-items-center mt-5">
          <span>
            <img src="/logo.png" width="40">
          </span>
          <h1 class="ml-2">CALLEMONTE</h1>
        </div>
        <h2 class="title mt-5">
          Nosotros
        </h2>
        <div class="mb-3">
          <a :href="prevPath" title="Regresar a la búsqueda">&larr; Regresar</a>
        </div>

        <div class="mb-5">
          <p class="lead text-justify"><b>Callemonte.com</b> <i>(anteriormente unclic.pro)</i> es un buscador de anuncios de productos en sitios de Cuba: <a href="https://www.revolico.com" rel="nofollow" target="_blank">Revolico</a>, <a href="https://www.bachecubano.com"  rel="nofollow" target="_blank">Bachecubano</a>, <a href="https://1cuc.com" rel="nofollow" target="_blank">1cuc</a>, <a href="https://www.timbirichi.com" rel="nofollow" target="_blank">Timbirichi</a> y <a href="https://porlalivre.com" rel="nofollow" target="_blank">Porlalivre</a>,  <a href="https://merolico.app" rel="nofollow" target="_blank">Merolico</a>, <a href="https://hogarencuba.com" rel="nofollow" target="_blank">Hogarencuba</a> y seguiremos incrementando la lista. Si tienes algún sitio que agregar <a href="/contact">contáctenos</a></p>
          <p class="lead">El objetivo de Callemonte es facilitar la búsqueda de lo que necesites comprar.</p>
          
        </div>

        <div class="card-deck mb-4"> 

          <div class="card border-0 shadow-sm">
            <div class="card-body">
            <h3 class="card-title">Cuida tus Datos.</h3> 
            <p class="lead text-justify">Ahorra tu paquete de datos utilizando solo la información necesaria.</p>
              
            </div>
          </div>    

          <div class="card border-0 shadow-sm">
            <div class="card-body">
              <h3 class="card-title">Rápido.</h3> 
              <p class="lead text-justify">Pensado para que sea rápido solo se centra en encontrar lo que quieres comprar.</p>
            </div>
          </div>

        </div>

        <div class="card-deck mb-4"> 

          <div class="card border-0 shadow-sm">      
            <div class="card-body">
              <h3 class="card-title">Limpia el texto.</h3> 
              <p class="lead text-justify">Elimina los caracteres extraños como <code>* ! _</code> y las palabras y frases que no dicen nada como <i>Vendooo</i> o <i>llame ya</i> que solo molestan.</p>
            </div>
          </div>

          <div class="card border-0 shadow-sm">      
            <div class="card-body">
              <h3 class="card-title">Anuncios con precio.</h3>
              <p class="lead text-justify"> Callemonte es un buscador de productos y todo producto a la venta debe tener un precio.</p>
            </div>
          </div>

        </div>

        <div class="card-deck mb-4"> 

          <div class="card border-0 shadow-sm">      
            <div class="card-body">
              <h3 class="card-title">Sin Duplicados</h3>
              <p class="lead text-justify">Filtra los anuncios que están repetidos incluso si se repiten en varios sitios.</p>
            </div>
          </div>

          <div class="card border-0 shadow-sm">      
            <div class="card-body">
              <h3 class="card-title">Sin publicidad.</h3>
              <p class="lead text-justify">No se muestra ninguna publicidad, solo los anuncios de su interés.</p>
            </div>
          </div>
          </div>

        <div class="card-deck mb-4"> 

          <div class="card border-0 shadow-sm">      
            <div class="card-body">
              <h3 class="card-title"><a href="https://github.com/sotoplatero/callemonte" target="_blank" >Código abierto</a></h3>
              <p class="lead text-justify">Si quieres mejorarlo solo clona, codifica y pull request para el github.</p>
            </div>
          </div>
        </div>
        <p class="lead my-5">
          Callemonte está en desarrollo y puede que tenga algún problema, no dudes en <a href="/contact">escribirnos</a> para hacerlo mejor.
        </p>

  </div>

</template>

<script>
export default {
  layout: 'pages',
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
