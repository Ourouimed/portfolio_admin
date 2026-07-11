import { useSelector } from "react-redux"

const Home = ()=>{
    const { isLoading  , user} = useSelector((s : any) => s.auth)
    console.log(user)
    if (isLoading) return <p>Loading...</p>
    return <h1>Hello {user?.name} </h1>
}
export default Home