import { NavLink } from "react-router-dom";

export default function AdminMenu() {
    return (
        <>
            <div className="p-3 mt-2 mb-2 h4 bg-light">Páginas de ADMIN</div>

            <ul className="list-group list-unstyled">
                <li>
                    <NavLink className="list-group-item bg-warning text-dark" to="/dashboard/admin/category">Criar categoria</NavLink>
                </li>

                <li>
                    <NavLink className="list-group-item bg-warning text-dark" to="/dashboard/admin/product">Criar produto</NavLink>
                </li>

                <li>
                    <NavLink className="list-group-item bg-warning text-dark" to="/dashboard/admin/products">Produtos</NavLink>
                </li>
            </ul>
        </>
    )
}