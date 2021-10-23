<template>
  <main>
    <t-navbar-menu></t-navbar-menu>
    <router-view/>
    <a href="https://mayder.codes" target="_blank">App Creada por MayderC</a>
  </main>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import TNavbarMenu from './components/t-navbar-menu/TNavbarMenu.vue'
export default {
  components : {
    TNavbarMenu
  },
  methods : {
    ...mapMutations(['setUID']),
    ...mapActions(['getTaskListFromDB']),

    verifyToken(){

      const token = this.uid
      this.getTaskListFromDB(token)

    }
  },
  computed : {
    ...mapState(['uid'])
  },
  created(){
    this.setUID()
    this.verifyToken()
  }
}
</script>

<style lang="sass">

  *, *:before, *:after
    box-sizing: border-box
  
  h1, h2, p 
    margin: 0
    padding: 0

  #app
    min-height: 100vh
    display: grid
    place-items: center

  body
    margin: 0
    background: #FFF
    //background: #9194e7
    font-family: 'Poppins', sans-serif
  
  main
    width: 1250px
    margin-left: auto
    margin-right: auto


  @media (max-width: 1350px)
    main
      width: 95%

  @media (max-width: 530px)
    main
      width: 100%

</style>
