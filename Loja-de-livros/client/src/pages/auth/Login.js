import { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //hock
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/login`,
        {
          email,
          password,
        });

      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem('auth', JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Logado com sucesso");
        navigate(location.state || `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Login falhou, tente novamente");
    }
  };

  return (
    <div>
      <Jumbotron title="PÁGINA DE LOGIN" subTitle="Coloque seus dados de registro para acessar" />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">

            <form onSubmit={handleSubmit}>

              <input
                type="email"
                className="form-control mb-4 p-2"
                placeholder="Coloque seu email aqui..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="Password"
                className="form-control mb-4 p-2"
                placeholder="Coloque sua senha aqui..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="btn btn-primary" type="submit">
                Entrar
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
