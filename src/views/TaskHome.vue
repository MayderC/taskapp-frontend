<template lang="pug">
section.section__home
  t-form-tasks.home__item
  task-list.home__item
</template>
<script>

import TFormTasks from '../components/t-form-tasks/TFormTasks.vue'
import TaskList from '../components/task-list/TaskList.vue'
import { mapMutations } from 'vuex';


export default {
  
  components : {
    TFormTasks,
    TaskList
  },
  methods : {
    ...mapMutations(['setIsLogin'])
  },
  created(){
    this.setIsLogin()
  }

}
</script>

<style lang="sass">

  .section__home
    height: 100%
    width: 100%
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    align-items: flex-start

  @media (max-width: 1245px)

    .section__home
      justify-content: center
      align-items: center

    .home__item
      width: 100%

  @media (max-width: 530px)
    .task__list
      width: 390px
      justify-content: center
    
    .task__list__head > .search
      width: 75%
  



</style>