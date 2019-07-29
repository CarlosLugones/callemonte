<template>
    <div v-on:click="$emit('toggle')" class="">
    <!-- <div v-on:click="$emit('toggle')" class="tags has-addons has-text-weight-semibold "> -->
        <span class="has-text-weight-bold " :class="isActive ? 'has-text-success' : 'has-text-grey-light' ">&check;</span> 
        <span class="" :class="isActive ? 'has-text-grey-dark' : 'has-text-grey' ">{{label}}</span>
    </div>
</template>
<script>
  export default {
    props: ['checked', 'label'],
    computed: {
        isActive: function() { 
            return this.checked; 
        }
    }
  }
</script>

