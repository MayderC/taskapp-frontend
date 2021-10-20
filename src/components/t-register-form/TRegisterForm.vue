<template lang="pug">
section.section__register
  form.form__register
    h2 Registrarme

    label(for="username_register")

      input(type="text" 
        id="username_register" 
        v-model="username" 
        placeholder="Username" 
        autofocus 
        class="input__user input__register"
        @keyup.enter="autoFocusTo('password_register')")


    label(for="password_register")

      input(type="text" 
        id="password_register" 
        v-model="password" 
        placeholder="Password" 
        class="input__pass input__register"
        @keyup.enter="autoFocusTo('password2_register')")


    label(for="password2_register")

      input(type="text" 
        id="password2_register" 
        v-model="password_two" 
        placeholder="Repeat password" 
        class="input__pass input__register"
        @keyup.enter="beforeSendData")

    t-buttom(size="large" text="Register" color="rose" @click="beforeSendData" height="48px")

</template>

<script>

import TButtom from '../t-buttom/TButtom.vue'
import {register} from '../../api/auth'
import {mapMutations, mapState} from 'vuex'

export default {
  name : 'TRegisterForm',
  data(){
    return {
      username: "",
      password: "",
      password_two : ""
    }
  },
  components: {
    TButtom
  },
  computed : {
    ...mapState(['uid'])
  },
  methods: {
    
    ...mapMutations(['setIsLogin', 'setUID']),

    autoFocusTo(id){
      const next = document.getElementById(id)
      next.focus()
    },

    beforeSendData(){
      if(this.verifyFields() && this.comparePasswords()){this.sendData()}
    },

    comparePasswords(){
      if(this.password === this.password_two){return true}
      return false
    },

    verifyFields(){
      if(this.username.length < 4 || this.password.length < 4 || this.p){return false}
      return true
    },

    sendData(){
      const data = {user : {username : this.username, password : this.password}}

      register(data).then(res =>{
          
          if(res.register === false){
            return
          }

          if(res.token){
              
            //todo: set uid en store vuex
            localStorage.setItem('uid', res.token)
            this.setUID(res.token)

            //todo: set isLogin en store vuex
            localStorage.setItem('isLogin', true);
            this.setIsLogin()

            //todo: obtener todos los items de la base de datos, del usuario logeado
          
            //todo: redireccionar al home
            this.$router.push('/') 
          }

      }).catch(()=>{

      })

    },

    clearInputs(){

    }

  }
}
</script>

<style lang="sass">

  .section__register
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    align-items: center
    padding: 30px 0


  .form__register
    margin-top: 30px
    width: 430px
    display: flex
    flex-direction: column
    gap: 30px
    align-items: center
    background: #EBEBF5
    padding: 40px
    border-radius: 20px
    box-shadow: 4px 4px 5px rgba(0,0,0, 30%)

  .form__register > label
    width: 100%
  
  
  .input__register
    font-size: 16px
    width: 100%
    background: #fff
    height: 48px
    font-family: 'Poppins', sans-serif
    color: #595959
    font-weight: bold
    border: none
    outline: none
    border-radius: 30px
    padding: 0 20px
    box-shadow: 4px 4px 5px rgba(0,0,0, 30%)

  .input__register::placeholder
    font-weight: bold
    color: #B7B7B7
    font-size: 16px
    font-family: 'Poppins', sans-serif

</style>