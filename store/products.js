require("string_score")


export const state = () => ({
  items: []
})

export const mutations = {

  add( state, products ){
    state.items.push( ...products )
  },

  update(state, payload) {
    let product = {
        ...state.items[payload.index], 
        ...payload.product, 
        updated: true 
      }
    state.items.splice(payload.index, 1, product)
  },

  toggleHide( state, product ) { 
    product.hide = !product.hide 
  },

  toggleFavorite( state, product ) {
    product.favorite = !product.favorite 
  },

  clear(state) { 
    state.items = [] 
  },
}

export const actions = {
  search ( { commit }, payload ) {
    const sites = [ 'bachecubano','revolico','porlalivre','timbirichi','1cuc','merolico' ];
    let { q, pmin=1, pmax, p = 1, province='' } = payload
    
    if ( p === 1) commit('clear')

    // if (pmin=='') pmin=1
    sites.forEach( site => {
      // let url = `https://localhost:9000/.netlify/functions/${site}?q=${q}&pmin=${pmin}&pmax=${pmax}&p=${p}&province=${province}`
      let url = `https://callemonte.com/.netlify/functions/${site}?q=${q}&pmin=${pmin}&pmax=${pmax}&p=${p}&province=${province}`

      this.$axios.$get(url)
        .then( response => { 
          let products = response.map( (el,index) => { 
            // htmlTitle: el.title.replace( vm.reQuery, "<b>$&</b>" ),
            el.htmlTitle = el.title
            el.score = el.title.toLowerCase().score( q.toLowerCase() )
            el.price = parseInt(el.price),
            el.hide = false
            el.favorite = false
            el.site = site

            return el

          });
          commit('add', products);
        })

    })

  },

  update( {commit, state}, product ) {
    // let url = `http://localhost:9000/.netlify/functions/photos?url=${product.url}`
    // let url = `https://callemonte.com/.netlify/functions/photos?url=${product.url}`

    // if ( !product.updated ) {
      let indexOfProduct = state.items.map((_, i) => i).find(e => state.items[e].url == product.url)
      // this.$axios.$get(url).then( res => {
        commit('update', {
          index: indexOfProduct,
          product: product
        })
      // })

    // }

  }


}

export const getters = {
  filtered( state ) {
    return state.items
      .filter( el => !el.hide )
      .sort( (a,b) => b.score - a.score || a.price - b.price )
  },

  current: state => url => state.items.find( el => el.url === url ),
  hides: state => state.items.filter( el => el.hide ),
  favorites: state => state.items.filter( el => el.favorite ),

  hidesCount(state) { 
    return [...state.items].filter( el => el.hide).length
  },
  productsCount(state) { 
    return state.items.length 
  }
}