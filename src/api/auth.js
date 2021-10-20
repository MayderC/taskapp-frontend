const login = async(user)=>{
  const URL = "https://taskname.herokuapp.com/api/auth/login"
  try {
    const res = await fetch(URL, 
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
  const URL = "https://taskname.herokuapp.com/api/auth/register"
  try {
    const res = await fetch(URL, 
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