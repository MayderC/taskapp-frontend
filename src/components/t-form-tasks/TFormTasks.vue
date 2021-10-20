<template lang="pug">

section.section
  form.form
    label(for="taskname")
      input#taskname(type="text" placeholder="Task Name" v-model="taskname").form__input.taskname
    label(for="description")
      textarea#description(placeholder="Description..." v-model="description").form__input.description
    t-buttom(size="large" color="rose" :text="textButtom" height="48px" @click="sendTask")

</template>
<script>
import TButtom from '../t-buttom/TButtom.vue'
import { mapMutations, mapState} from 'vuex'
import {saveTask} from '@/api/tasks'

export default {
  name  : 'TFormTasks',
  data(){
    return {
      taskname    : "",
      description : "",
      textButtom  : "Save",
      lastItem: {}
    }
  },
  components : {
    TButtom
  },
  computed : {
    ...mapState(['uid'])
  },
  methods: {

    ...mapMutations(['setNewItemTaskList']),

    sendTask(){
      const uidToken = this.uid
      const data = {task : { taskname : this.taskname, description: this.description, id : ""}}

      if(this.taskname.length < 5 || this.description.length < 3){return}

      saveTask(data, uidToken)
      .then((res)  => {
        data.task.id = res.itemId
        this.addNewItem(data)
        this.clearInputsAfterRequest("Done")
      })
      .catch((err) =>{console.log(err);this.clearInputsAfterRequest("Error")})

    },
    clearInputsAfterRequest(msg){
      this.taskname     = ""
      this.description  = ""
      this.textButtom   = msg
      setTimeout(() => {this.textButtom = "Save" }, 350);
    },

    addNewItem(data){
      this.setNewItemTaskList(data)
    }
  }
}
</script>
<style lang="sass">

  .form
    width: 455px
    display: flex
    flex-direction: column
    height: 400px
    margin-top: 50px

  .taskname
    height: 48px
    border-radius: 30px

  .taskname::placeholder , .description::placeholder
    color: #D0D0D0
    //font-weight: bold
  .form__input
    width: 100%
    border: none
    outline: none
    padding: 0 25px
    color: #fff
    background: #110F48
    font-family: 'Poppins', sans-serif
    font-size: 16px
    font-weight: bold
    box-shadow: 4px 4px 5px rgba(0,0,0, 30%)

  .description
    height: 164px
    padding: 10px 25px
    margin: 25px 0 20px 0
    border-radius: 25px
    resize: none

  
  @media (max-width: 1245px)
    .section
      display: flex
      justify-content: center

  @media (max-width: 530px)
    .form
      width: 355px


</style>