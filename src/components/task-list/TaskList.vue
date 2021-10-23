<template lang="pug">

section.task__list
  .task__list__head
    input.search(type="text" placeholder="Search")
  .task__list__body
    task-card(v-for="task in taskList.tasks" :key="task.id" :task="task")

</template>
<script>

import TaskCard from '../task-card/TaskCard.vue'
import { mapState } from 'vuex';
export default {
  name: 'TaskList',
  components : {
    TaskCard
  },
  computed :{
    ...mapState(['taskList'])
  },
  methods : {


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
