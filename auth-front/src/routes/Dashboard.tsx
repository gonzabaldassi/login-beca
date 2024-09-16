import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider"
import { API_URL } from "../auth/constants";
interface Todo{
    _id: string;
    title: string;
    completed: boolean;
    idUser: string;
}
export default function Dashboard() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [title, setTitle] = useState("");
    const auth = useAuth();

    useEffect(()=>{
        loadTodos();
    },[]);

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        createTodo();
    }
    async function createTodo() {

          try {
            const response = await fetch(`${API_URL}/todos`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.getAccessToken()}`,
              },
              body: JSON.stringify({ title }),
            });
            if (response.ok) {
              const todo = (await response.json()) as Todo;
              setTodos([todo, ...todos]);
            }
          } catch (error) {}
        
      }
    async function loadTodos(){
        try {
            const response = await fetch(`${API_URL}/todos`, {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`,
                }
            });

            if (response.ok) {
                const data = await response.json();
                setTodos(data);

            }else{
                //Mostrar error de conexion
            }

            
            
        } catch (error) {
            
        }
    }

    return(
        <div>
            <h1>Dashboard de {auth.getUser()?.name || ""}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nuevo todo..." onChange={(e)=>setTitle(e.target.value)} value={title} />
            </form>
            {todos.map((todo) => (
                <div key={todo._id}>{todo.title}</div>
            ))}
        </div>
    );
}