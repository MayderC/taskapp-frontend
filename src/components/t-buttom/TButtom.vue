<template lang="pug">

span.buttom( :class="myStyles" :style="styleHeight")
  |{{text}}


</template>

<script>
export default {
  name : 'TButtom',
  props : {
    size : {
      type : String,
      require : true,
      validator(value) {
        return ['small', 'large'].includes(value)
      }
    },
    text : {
      type : String,
      require : true
    },
    color : {
      type : String,
      require : true,
      validator(value) {
        return ['blue', 'rose'].includes(value)
      }
    },
    height :{
      type : String,
      default : "34px"
    }
  },
    methods : {

  },
  computed: {
    myStyles(){
      return [this.color, this.size]
    },
    styleHeight(){
      return {height : this.height}
    }
  }
  
}
</script>

<style lang="sass">

  .buttom
    color: #fff
    border-radius: 30px
    display: block
    font-size: 16px
    font-weight: bold
    text-align: center
    border-radius: 30px
    box-shadow: 0 5px 5px rgba( 0, 0, 0 , 50% )
    text-shadow: 0 5px 5px rgba(0, 0, 0, 50%)
    display: grid
    place-items: center
    transition: .3s


  .buttom:hover
    transform: scale(1.03)
    box-shadow: 10px 10px 20px rgba( 0, 0, 0 , 35% ), -10px 10px 20px rgba( 0, 0, 0 , 35% )
    transition: .3s
  
  .blue
    background: #110f48

  .rose
    background: #E63956
  
  .large
    font-size: 16px
    width: 100%

  .small
    width: 100px

</style>