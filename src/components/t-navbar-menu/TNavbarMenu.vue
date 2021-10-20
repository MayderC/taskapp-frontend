<template lang="pug">
nav.nav
  ul
    li(v-for="route in routes")

      router-link(
        :to="route.link" 
        :class="['link', route.class]"
        @click="route.click"
        v-if="canIShow(route.name)") 
        |{{route.name}}


</template>
<script>
import {mapMutations, mapState} from 'vuex'
import {deleteLocalStorage} from '../../helper/deleteLocalStorage'

export default {
  name : 'TNavbarMenu',
  data(){
    return {
        routes : [
        {name : "Home",     link : "/",         class: "blue"},
        {name : "Register", link : "/register", class: "rose-red"},
        {name : "Login",    link : "/login",    class: "rose-red"},
        {name : "Salir",    link : "/",         class: "rose-red", click: ()=>{this.logout()}}]
    }
  },
  methods : {

    ...mapMutations(['setIsNotLogin', 'removeUID', 'removeTaskList']),


    logout(){
      deleteLocalStorage()
      this.setIsNotLogin()
      this.removeUID()
      this.removeTaskList()
    },
    canIShow(route){
      if( 
          !this.isLogin && route ===  'Login'     || 
          this.isLogin  && route ===  'Home'      || 
          this.isLogin  && route ===  'Salir'     || 
          !this.isLogin && route ===  'Register'  || 
          !this.isLogin && route ===  'Home'
        ){ return true}  
        else 
        { return false}
    }
  },
  computed : {
      ...mapState(['isLogin'])
  }
}
</script>


<style lang="sass" scoped>

  .nav
    background: #EBEBF5
    height: 75px
    border-radius: 30px
    box-shadow: 4px 4px 5px rgba(0,0,0, 30%)
    ul
      margin: 0
      padding: 0
      display: flex
      height: 100%
      align-items: center
      justify-content: center
      li
        list-style: none
  
        .link
          display: block
          font-weight: bold
          color: #fff
          text-decoration: none
          height: 40px
          width: 123px
          margin: 0 20px
          text-align: center
          border-radius: 30px
          box-shadow: 0 5px 5px rgba( 0, 0, 0 , 50% )
          text-shadow: 0 5px 5px rgba(0, 0, 0, 50%)
          transition: .3s
          display: grid
          place-items: center

        .blue
          background: #110f48

        .rose-red
          background: #E63956

      li:hover .link 
        transform: scale(1.04)
        box-shadow: 10px 10px 20px rgba( 0, 0, 0 , 35% ), -10px 10px 20px rgba( 0, 0, 0 , 35% )
        transition: .3s

  @media (max-width: 530px)
    .nav
      border-radius: 0

      ul
        li
          .link
            margin: 0 5px



</style>