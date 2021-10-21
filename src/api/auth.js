const URL = "https://taskname.herokuapp.com/api/auth"
//const URL = "http://localhost:3000/api/auth"
const login = async(user)=>{
  try {
    const res = await fetch(`${URL}/login`, 
      {
        method : 'POST',
        body : JSON.stringify(user),
        headers : {'Content-Type' : 'application/json'}
      }
    )
    const data = await res.json()
    return data
  } catch(error) {return error}
}



const register = async(user)=>{
  try {
    const res = await fetch(`${URL}/register`, 
      {
        method : 'POST',
        body : JSON.stringify(user),
        headers : {'Content-Type' : 'application/json'}
      }
    )
    const data = await res.json()
    return data
  } catch (error) {return error}
}



module.exports = { login, register }