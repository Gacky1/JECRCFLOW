import { useAuthStore } from '@/store/Auth'
import React from 'react'

function Loginpage() {
    const {login} = useAuthStore()
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        //collect data
        const formData=new FormData(e.currentTarget)
        const email=formData.get("email")
        const password=formData.get("password")
        //validation
        if(!email || !password){
            setError(()=>"Please fill in all fields")
            return
        }

        //handle loading and errors

        setIsLoading(()=>true)
        setError(()=>"")
        //login==>store
        const loginResponse=await login(email.toString(),password.toString())
        if(loginResponse.error){
            setError(()=>"Invalid email or password")
        }
        setIsLoading(()=>false)
    }
  return (
    <div>page</div>
  )
}

export default Loginpage