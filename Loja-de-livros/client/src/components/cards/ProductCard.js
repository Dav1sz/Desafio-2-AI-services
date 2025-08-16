import { Badge } from "antd"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../context/cart"

export default function ProductCard({ p }) {
    //context
    const [cart, setCart] = useCart();

    //hooks
    const navigate = useNavigate()

    return (
        <div className="card mb-3 hoverable bg-dark text-light" >
            <Badge.Ribbon text={`${p?.sold} vendidos`} color="red">
                <Badge.Ribbon
                    text={`${p?.quantity >= 1
                        ? `${p?.quantity - p?.sold} Em estoque`
                        : 'Out of stock'
                        }`}
                    placement="start"
                    color="green"
                >
                    <img
                        className="card-img-top"
                        src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                        alt={p.name}
                        style={{ height: '400px', objectFit: 'cover' }}
                    />
                </Badge.Ribbon>
            </Badge.Ribbon>
            <div className="card-body">
                <h5>{p?.name}</h5>

                <h4 className="fw-bold">
                    {p?.price?.toLocaleString("pt-BR", {
                        style: 'currency',
                        currency: 'BRL'
                    })}
                </h4>

                <p className="card-text">{p?.description?.substring(0, 60)}...</p>
            </div>

            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-warning col card-button"
                    style={{ borderBottomLeftRadius: "5px" }}
                    onClick={() => navigate(`/product/${p.slug}`)}
                >
                    Olhar produto
                </button>

                <button
                    className="btn btn-outline-warning text-light col card-button"
                    style={{ borderBottomRightRadius: "5px" }}
                    onClick={() => {
                        setCart([...cart, p])
                        localStorage.setItem('cart', JSON.stringify([...cart, p]))
                        toast.success('Adicionado ao carrinho')
                    }}
                >
                    Adicionar ao carrinho
                </button>
            </div>

            {/* <p>{moment(p.createdAt).fromNow()}</p>
            <p>{p.sold} sold</p> */}
        </div>
    )
}