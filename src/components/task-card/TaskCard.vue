<template lang="pug">
  
article.card

  .card__body
    h2 {{task.taskname}}

  .card__footer
    t-buttom(size="small", color="blue" text="Edit" height="35px"  @click="setDataToEdit(task)")
    t-buttom(size="small", color="rose" text="Delete" height="35px" @click="deleteItem(task.id)")


</template>

<script>

import TButtom from '../t-buttom/TButtom.vue'
import { mapMutations, mapState } from 'vuex'
import {deleteTask} from '../../api/tasks'

export default {

  name: 'TaskCard',
  components  : {
    TButtom
  },
  props : {
    task : Object
  },

  computed :{
    ...mapState(['taskList', 'uid']),


    

  },
  methods : {
    ...mapMutations(['updateTaskLsit', 'setOneTask']),

    deleteItem(id){

      const newList = this.taskList.tasks.filter( task => task.id != id )

      this.updateTaskLsit(newList)
      deleteTask(id, this.uid)

    },

    setDataToEdit(task){


      this.setOneTask(JSON.parse(JSON.stringify(task)))
    }
  }
}
</script>


<style lang="sass">

  .card
    width: 280px
    height: 118px
    background: #fff
    border-radius: 15px
    box-shadow: 4px 4px 5px rgba(0,0,0, 30%)
    position: relative


  .card__body
    height: 71px
    text-align: center

  .card__footer
    position: absolute
    display: flex
    justify-content: space-evenly
    height: 35px
    bottom: 12px
    width: 100%

  .card__body h2
    font-size: 19px
    padding: 0.5em
    font-weight: bolder
    color: 595959

</style>