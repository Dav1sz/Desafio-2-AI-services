import { useAuth } from "../../context/auth"
import UserMenu from "../../components/nav/UserMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"


export default function UserProfile() {
    //context
    const [auth, setAuth] = useAuth();

    //state
    const [name, setName] = useState('') //admin = admin, user = user
    const [email, setEmail] = useState('') //senha admin = 111111, senha = 222222
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (auth?.user) {
            const { name, email } = auth.user
            setName(name)
            setEmail(email)
        }
    }, [auth?.user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put('/profile', {
                name, password,
            })

            //error
            if (data?.error) {
                toast.error(data.error)
            } else {
                setAuth({ ...auth, user: data })

                //local storage update
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data
                localStorage.setItem("auth", JSON.stringify(ls))
                toast.success("Perfil atualizado")
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>


                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">Informações do perfil</div>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className="form-control m-2 p-2"
                                placeholder="Coloque um nome..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus={true}
                            />

                            <input
                                type="email"
                                className="form-control m-2 p-2"
                                placeholder="Coloque um email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={true}
                            />

                            <input
                                type="password"
                                className="form-control m-2 p-2"
                                placeholder="Coloque sua senha..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />


                            <button className="btn btn-warning m-2 p-2">Atualizar</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}