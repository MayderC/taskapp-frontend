const URL = "https://taskname.herokuapp.com/api/task/"
//const URL = 'http://localhost:3000/api/task/'

const saveTask = async(task, token)=>{
  try {
    const res = await fetch(URL, 
      {
        method : 'POST',
        body : JSON.stringify(task),
        headers : {
          'Content-type' : 'application/json',
          'x-token' : token
        }
      })

    const data = await res.json()
    return data
  } catch (error) {return error}
}


const getAllTasks = async(token) =>{
  try {
    const myInit = { 
    method: 'GET',
    headers: {
      'Content-Type' : 'application/json',
      'x-token' : token
    }
  };
    const res = await fetch(URL, myInit)
    const data = await res.json()
    return data
  } catch (error) {return error}
}

const deleteTask = async(id, token) =>{
  const payload = {
    task : {
      id : id
    }
  }
  try {
    const result = await fetch(URL, {
      method : 'DELETE',
      body : JSON.stringify(payload),
      headers : {
        'Content-Type' : 'application/json',
        'x-token' : token
      }
    })
    const data = await result.json()
    return data
  } catch (error) {
    return error
  }
}

const editOneTask = async(token, body)=>{
  try {
    const res = await fetch(URL, {
      method : 'PUT',
      body: JSON.stringify({task : body}),
      headers : {
        'Content-Type' : 'application/json',
        'x-token': token
      }
    })

    const data = await res.json()
    return data

  } catch (error) {
    return error
  }


}


module.exports = {
  saveTask,
  getAllTasks,
  deleteTask,
  editOneTask
}