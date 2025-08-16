import { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //hook
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/register`,
        {
          name,
          email,
          password,
        });

      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem('auth', JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Registrado com sucesso");
        navigate("/dashboard")
      }
    } catch (err) {
      console.log(err);
      toast.error("Registro falhou, tente novamente");
    }
  };

  return (
    <div>
      <Jumbotron title="PÁGINA DE REGISTRO" subTitle="Coloque seus dados para se registrar" />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-4 p-2"
                placeholder="Coloque seu nome aqui..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />

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
                Enviar
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
