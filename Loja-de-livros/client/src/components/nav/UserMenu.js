import { NavLink } from "react-router-dom";

export default function UserMenu() {
    return (
        <>
            <div className="p-3 mt-2 mb-2 h4 bg-light">Páginas do Usuário</div>

            <ul className="list-group list-unstyled">
                <li>
                    <NavLink className="list-group-item bg-warning text-dark" to="/dashboard/user/profile">Perfil</NavLink>
                </li>
            </ul>
        </>
    )
}