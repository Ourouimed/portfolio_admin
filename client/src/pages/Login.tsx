import { Eye } from "lucide-react"
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"
import { useState, type ChangeEvent } from "react"

const Login = ()=>{
    const [loginForm , setLoginForm] = useState<{email : string , password : string}>({
        email : "" ,
        password : ""
    })

    // -------- handlers --------- //
    // handle change
    const handleChange = (e : ChangeEvent<HTMLInputElement>) =>{
        const {id , value} = e.target
        setLoginForm(prev => ({...prev , [id] : value}))
    }
    return <section className="flex justify-center items-center bg-gray-200/30 min-h-screen p-4"> 
        <div className="max-w-sm w-full bg-white shadow-lg rounded-xl py-4 px-6 border border-gray-300 space-y-4">
            <div className="space-y-3">
                <h3 className="text-xl font-bold text-center">Welcome Back</h3>
                <p className="text-gray-600 text-center">
                    login to access admin dashboard
                </p>
            </div>

            <div className="space-y-3">
                <div className="space-y-2">
                    <label htmlFor="email" className="block font-semibold">Email</label>
                    <Input type="email" id="email" placeholder="exemple@ourouimed.dev" onChange={handleChange} value={loginForm.email}/>
                </div>


                <div className="space-y-2">
                    <label htmlFor="password" className="block font-semibold">Password</label>
                    <Input type="password" id="password" placeholder="**********" postIcon={Eye} onChange={handleChange} value={loginForm.password}/>
                </div>

                <Button fullWidth>Login</Button>
            </div>
        </div>
    </section>
}
export default Login