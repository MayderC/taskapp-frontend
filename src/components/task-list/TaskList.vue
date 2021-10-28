<template lang="pug">

section.task__list
  .task__list__head
    input.search(type="text" placeholder="Search" v-model="search")
  .task__list__body
    task-card(v-for="task in  taskList.tasks" :key="task.id" :task="task")

</template>
<script>
import {getAllTasks} from '../../api/tasks'
import TaskCard from '../task-card/TaskCard.vue'
import { mapMutations, mapState } from 'vuex';
export default {
  name: 'TaskList',
  components : {
    TaskCard,
  },
  computed :{
    ...mapState(['taskList', 'taskListBack', 'uid']),


    search: {
      get(){
        return this.$store.state.search
      },
      set(value){
        this.setSearch(value)
      }
    },
  },
  methods : {
    ...mapMutations(['setSearch', 'setTaskListBack', 'setTaskList']),

    filterTasksSearch(task){
      if(task.taskname.toLowerCase().includes(this.search.toLowerCase())){
        return task
      }
    }




  },
  watch: {
    async search(){
      //set visible cancel seacrh botto
      if(this.search.length > 0){

      try {
        const data = await getAllTasks(this.uid)
        const filteredTask = data.tasks.filter(this.filterTasksSearch)
        
        this.setTaskListBack(JSON.parse(JSON.stringify(this.taskList.tasks)))
        this.setTaskList({tasks: filteredTask})
      } catch (error) {
        return error
      }

      }else if(this.search.length < 1){
        //set Invisible cancel seacrh bottom
      try {
        const data = await getAllTasks(this.uid)
        this.setTaskList({tasks: data.tasks})
      } catch (error) {
        return error
      }


      }

    }
  }
}
</script>


<style lang="sass">



  .task__list 
    background: #EBEBF5
    height: 100%
    width: 689px
    border-radius: 30px
    box-shadow: 4px 4px 5px rgba(0,0,0, 30%)
    overflow: hidden

  .task__list__head
    width: 100%
    height: 148px
    display: grid
    place-items: center

  .task__list__head > .search
    height: 48px
    background: #fff
    border: none
    outline: none
    width: 455px
    border-radius: 30px
    box-shadow: 4px 4px 5px rgba(0,0,0, 30%)
    padding: 0 25px
    font-size: 18px
    font-weight: 900
    color: #595959
    font-family: 'Poppins', sans-serif

  .task__list__body
    height: 470px
    padding: 0 30px 10px 30px
    display: flex
    gap: 40px
    flex-wrap: wrap
    justify-content: center
    overflow-y: scroll
    align-content: flex-start

  /*.task__list__body::-webkit-scrollbar
    display: none*/



</style>
