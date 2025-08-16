import { useCart } from "../../context/cart"

export default function ProductCardHorizontal({ p }) {
    //context
    const [cart, setCart] = useCart()

    const removeFromCart = (productId) => {
        let myCart = [...cart]
        let index = myCart.findIndex((item) => item._id === productId)
        myCart.splice(index, 1)
        setCart(myCart)
        localStorage.setItem('cart', JSON.stringify(myCart))
    }

    return (
        <div
            className="card mb-3 bg-dark text-light"
        // style={{ maxWidth: 540 }}
        >
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                        alt={p.name}
                        style={{
                            height: '150px',
                            width: '150px',
                            objectFit: 'cover',
                            marginLeft: '-12px',
                            borderTopRightRadius: '0px'
                        }}
                    />
                </div>

                <div className="col-md-8 ">
                    <div className="card-body">
                        <h5 className="card-title">
                            {p.name}{" "}
                            {p?.price?.toLocaleString("pt-BR", {
                                style: 'currency',
                                currency: 'BRL'
                            })}</h5>
                        <p className="card-text">{`${p?.description?.substring(0, 50)}..`}</p>

                        <button
                            className="btn btn-outline-danger"
                            onClick={() => removeFromCart(p._id)}
                        >
                            Remover
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}