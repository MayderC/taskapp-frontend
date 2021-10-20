<template lang="pug">

section.section__login
  form.form__login
    h2 Iniciar Sesión
    label(for="username")

      input(type="text" 
        id="username" 
        v-model="username" 
        placeholder="Username" 
        autofocus 
        class="input__user input__login"
        @keyup.enter="autoFocusTo('password')")

    label(for="password")

      input(type="text" 
        id="password" 
        v-model="password" 
        placeholder="Password" 
        class="input__pass input__login"
        @keyup.enter="beforeSendData")

    t-buttom(size="large" text="Login" color="rose" @click="beforeSendData" height="48px")
    
</template>

<script>
import TButtom from '../t-buttom/TButtom.vue'
import {login} from '@/api/auth.js'
import {getAllTasks} from '@/api/tasks.js'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name : 'TLoginForm',
  data(){
    return {
      username : "",
      password : ""
    }
  },
  components : {
    TButtom
  },
  methods : {

    ...mapMutations(['setIsLogin', 'setUID']),
    ...mapActions(['getTaskListFromDB']),

    sendDataLogin(){
      const myData = {user : {username: this.username, password : this.password}}
      login(myData).then((res) =>{
        if(res.token){

          //todo: set uid en store vuex
          localStorage.setItem('uid', res.token)
          this.setUID(res.token)

          //todo: set isLogin en store vuex
          localStorage.setItem('isLogin', true);
          this.setIsLogin()

          //todo: obtener todos los items de la base de datos, del usuario logeado
          this.getTaskListFromDB(this.uid)
        
          //todo: redireccionar al home
          this.$router.push('/') 
        }
      }).catch(console.log)
    },

    beforeSendData(){if(this.verifyDataLogin()){this.sendDataLogin()}},

    verifyDataLogin(){

      if(this.password.length === 0 || this.username.length === 0){
        return false
      }
      return true
    },
    getAllItems(){
      const uidToken = this.uid
      getAllTasks(uidToken)
    },

    autoFocusTo(id){
      const next = document.getElementById(id)
      next.focus()
      console.log(next)
    }

  },
  created(){

  },

  computed : {
    ...mapState(['uid'])
  }

}
</script>

<style lang="sass">

  .section__login
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    align-items: center
    padding: 30px 0


  .form__login 
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

  .form__login > label
    width: 100%
  
  
  .input__login
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

  .input__login::placeholder
    font-weight: bold
    color: #B7B7B7
    font-size: 16px
    font-family: 'Poppins', sans-serif

</style>