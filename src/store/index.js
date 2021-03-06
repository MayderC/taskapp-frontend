import { createStore } from 'vuex'
import {getAllTasks} from'../api/tasks'
import {deleteLocalStorage} from '../helper/deleteLocalStorage'

export default createStore({
  state: {
    isLogin : false,
    taskList : {tasks : []},
    taskListBack: {tasks : []},
    task: {taskname : "", description: "", id : ""},
    editTask: false,
    uid : "",
    search: "",
    profile: {}
  },
  mutations: {

    setSearch(state, value){
      state.search = value
    },

    updateOneItemInArray(state, value){
      state.taskList.tasks[value.pos] = {taskname : value.taskname, description : value.description, id : value.id}
    },

    setEditTask(state, val){
      state.editTask = val
    },

    setIsLogin(state){
      state.isLogin = JSON.parse(localStorage.getItem('isLogin'))
    },
    setIsNotLogin(state){
      state.isLogin = JSON.parse(localStorage.getItem('isLogin')) || false
    },

    updateTaskname(state, message) {state.task.taskname = message},

    updateTaskID(state, val){state.task.id = val},

    updateDescription(state, message) {state.task.description = message},

    setOneTask(state, taskParam){state.task = taskParam},

    setUID(state){state.uid = localStorage.getItem('uid')},

    removeUID(state){state.uid = ""},

    setTaskList(state, list){
      state.taskList = list},
    
    setTaskListBack(state, list){state.taskListBack = list},

    setNewItemTaskList(state, {task}){
      if(state.taskList.tasks.length > 0){
        state.taskList.tasks.unshift(task)
      }else{
        state.taskList.tasks.push(task)
      }
    },

    updateTaskLsit(state, newList){
      state.taskList.tasks = newList
    },
    removeTaskList(state){
      state.taskList = {tasks : []}
    },



    setProfile(state, info){
      state.profile = info
    }

  },
  actions: {
    getTaskListFromDB( context, token){
      getAllTasks(token)
      .then(res => {
        if(res.token === false){
          deleteLocalStorage()
          context.commit('setIsNotLogin')
          context.commit('removeUID')
          return
        }
        context.commit('setTaskList', res)
      }).catch(()=> console.log(""))
    }
  },
  modules: {
  }
})
