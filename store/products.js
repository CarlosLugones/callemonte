require("string_score")
import Vue from 'vue'
import axios from 'axios'

export const state = () => ({
  items: [],
  updating: false,
  searching: false,
})

export const mutations = {

  add( state, product ){
    state.items.push( product )
  },

  update(state, payload) {
    let product = {
        ...state.items[payload.index], 
        ...payload.product, 
        updated: true 
      }
    // state.items.splice(payload.index, 1, product)
    Vue.set(state.items, payload.index, product )
  },

  toggleHide( state, product ) { 
    product.hide = !product.hide 
  },  


  toggleFavorite( state, product ) {
    product.favorite = !product.favorite 
  },
  toggleUpdating( state, value ) { 
    state.updating = value
  },
  setSearching( state, value ) { 
    state.searching = value
  },

  clear(state) { 
    state.items = [] 
  },
}

export const actions = {
  search ( { commit, state }, payload ) {
    const sites = [ 'bachecubano','revolico','porlalivre','timbirichi','1cuc','merolico' ];
    let { q, pmin=1, pmax, p = 1, province='' } = payload
    let counter = 0
    commit('setSearching',true)

    if ( p === 1) commit('clear')

    if (pmin=='') pmin=1

    let promises = []; // array to hold all requests promises with their then

    for (let i = 0; i < sites.length; i++) {
        let site = sites[i];
        let url = `https://callemonte.com/.netlify/functions/${site}?q=${q}&pmin=${pmin}&pmax=${pmax}&p=${p}&province=${province}`;
        promises.push(
          this.$axios.$get(url)
              .then( response => { 
                let products = response.forEach( (el,index) => { 
                  el.htmlTitle = el.title
                  el.score = el.title.toLowerCase().score( q.toLowerCase() )
                  el.hide = false
                  el.favorite = false
                  el.site = site

                  if (!state.items.some( i => (i.price+i.title) === (el.price+el.title) )) {
                    commit('add', el);
                  }

                })
              })
        );
    }

    axios.all(promises).then( () => {
      commit('setSearching',false)
    });

  },

  update( {commit, state}, product ) {
    if (!product.updated) {
      commit('toggleUpdating', true)
      // let url = `http://localhost:9000/.netlify/functions/photos?url=${product.url}`
      let url = `https://callemonte.com/.netlify/functions/details?url=${product.url}`

      let indexOfProduct = state.items.map((_, i) => i).find(e => state.items[e].url == product.url)
      this.$axios.$get(url)
        .then( response => {
          console.log(response)
          commit('update', {
            index: indexOfProduct,
            product: {...product, ...response}
          })
          commit('toggleUpdating',false)
        })
        .catch( e => commit('toggleUpdating',false) )
    }

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