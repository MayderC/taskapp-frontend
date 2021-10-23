<template lang="pug">

section.section
  form.form
    label(for="taskname")
      input#taskname(type="text" placeholder="Task Name" v-model="taskname"    :disabled="!isLogin").form__input.taskname
    label(for="description")
      textarea#description(placeholder="Description..."  v-model="description" :disabled="!isLogin").form__input.description
    .button__save( v-if="!editTask")
      t-buttom(size="large" color="rose" :text="textButtom" height="48px" @click="sendTask")
    .button__edit( v-if="editTask") 
      t-buttom(size="large" color="rose" text="Update" height="48px" @click="sendTask").buttom
      t-buttom(size="small" color="rose" text="Cancel" height="48px" @click="cancelEdit").buttom

</template>
<script>
import TButtom from '../t-buttom/TButtom.vue'
import { mapMutations, mapState} from 'vuex'
import {saveTask, editOneTask} from '@/api/tasks'

export default {
  name  : 'TFormTasks',
  data(){
    return {
      textButtom  : "Save",
    }
  },
  components : {
    TButtom
  },
  computed : {
    ...mapState(['uid', 'task', 'editTask', 'isLogin', 'taskList']),

    taskname :{
      get() {return this.$store.state.task.taskname},
      set(value){this.updateTaskname(value)}
    },
    description: {
      get(){return this.$store.state.task.description},
      set(value){this.updateDescription(value)}
    }

  },
  methods: {
    //this.task es un objeto del sotore de vuex, donde esta el taskname y description, 
    // taskname y description de computed se usan en el v-model de los inputs
    ...mapMutations(['setNewItemTaskList', 'updateTaskname', 'updateDescription', 'setEditTask', 'updateTaskID', 'updateOneItemInArray']),

    async sendTask(){

      const uidToken = this.uid
      const data = {task : { taskname : this.task.taskname, description: this.task.description, id : ""}}

      //is only edit?
      if(this.editTask){
        const res = await editOneTask(uidToken, this.task)
        const pos = this.findPos(this.taskList.tasks)
        this.updateOneItemInArray({...res.taskUpdated, pos : pos})
        this.clearInputsAfterRequest('Updated')
        this.setEditTask(false)

        return
      }


      if(this.task.taskname.length < 5 || this.task.description.length < 3){return}

      saveTask(data, uidToken)
      .then((res)  => {
        data.task.id = res.itemId
        this.addNewItem(data)
        this.clearInputsAfterRequest("Done")
      })
      .catch((err) =>{console.log(err);this.clearInputsAfterRequest("Error")})

    },

    findPos(tasks){
      for(let i in tasks){
        if(tasks[i].id === this.task.id){
          return i
      }

    }
    },

    cancelEdit(){
      this.updateDescription("")

      this.updateTaskname("")

      this.updateTaskID("")

      this.setEditTask(false)
    },

    clearInputsAfterRequest(msg){
      this.updateDescription("")

      this.updateTaskname("")

 

      this.setEditTask(false)
      this.textButtom   = msg
      setTimeout(() => {this.textButtom = "Save" }, 350);
    },

    addNewItem(data){
      this.setNewItemTaskList(data)
    },



  }
}
</script>
<style lang="sass">
  .button__edit
    display: flex
    .buttom
      margin: 0 5px

  .section
    position: relative


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