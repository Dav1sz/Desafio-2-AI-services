import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";

export default function Menu() {
  //context
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  //hooks
  const categories = useCategory();
  const navigate = useNavigate();

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top border-bottom border-secondary">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold text-warning" to="/">
          LOJA DE LIVROS
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDark"
          aria-controls="navbarNavDark"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDark">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link text-white" aria-current="page" to="/">
                INICIO
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/shop">
                SHOP
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                id="navbarDropdownDark"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                CATEGORIAS
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdownDark">
                <li>
                  <NavLink className="dropdown-item" to="/categories">
                    TODAS AS CATEGORIAS
                  </NavLink>
                </li>
                {categories?.map((c) => (
                  <li key={c._id}>
                    <NavLink className="dropdown-item" to={`/category/${c.slug}`}>
                      {c.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item position-relative">
              <NavLink className="nav-link text-white" to="/cart">
                CARRINHO
                {cart?.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.length}
                    <span className="visually-hidden">itens no carrinho</span>
                  </span>
                )}
              </NavLink>
            </li>
          </ul>

          <Search />

          <ul className="navbar-nav ms-auto">
            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link text-white" to="/login">
                    LOGIN
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link btn btn-outline-warning px-3" to="/register">
                    REGISTRAR
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  id="userDropdownDark"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth?.user?.name?.toUpperCase()}
                </a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="userDropdownDark">
                  <li>
                    <NavLink
                      className="dropdown-item bg-warning"
                      to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <a onClick={logout} className="dropdown-item">
                      Sair
                    </a>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
