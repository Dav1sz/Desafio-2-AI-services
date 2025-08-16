import { useCart } from "../../context/cart";

export default function UserCartSidebar() {
    // context
    const [cart] = useCart();

    const cartTotal = () => {
        let total = 0;
        cart.map((item) => {
            total += item.price;
        });
        return total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    return (
        <div className="col-md-4 mb-5">
            <h4>Valor total do seu carrinho</h4>
            <hr />
            <h6>Total: {cartTotal()}</h6>
        </div>
    );
}
