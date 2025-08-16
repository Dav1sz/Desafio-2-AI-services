import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import { Select } from 'antd';
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

export default function AdminProductUpdate() {
    //context
    const [auth, setAuth] = useAuth();

    //state
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [id, setId] = useState("");

    //hook
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        loadProduct();
    }, [])

    useEffect(() => {
        loadCategories();
    }, [])

    const loadCategories = async () => {
        try {
            const { data } = await axios.get("/categories");
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    }

    const loadProduct = async (e) => {
        try {
            const { data } = await axios.get(`/product/${params.slug}`)
            setName(data.name)
            setDescription(data.description)
            setPrice(data.price)
            setCategory(data.category._id)
            setQuantity(data.quantity)
            setId(data._id)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            photo && productData.append('photo', photo);
            productData.append('name', name);
            productData.append('description', description);
            productData.append('price', price);
            productData.append('category', category);
            productData.append('quantity', quantity);

            const { data } = await axios.put(`/product/${id}`, productData);
            if (data?.error) {
                toast.error(data.error)
            } else {
                toast.success(`"${data.name}" foi atualizado com sucesso`)
                navigate('/dashboard/admin/products')
            }
        } catch (err) {
            console.log(err)
            toast.error('Atualização de produto falhou, tente novamente')
        }
    }

    const handleDelete = async (req, res) => {
        try {
            let answer = window.confirm("Voce tem certeza que quer excluir este produto?");
            if (!answer) return
            const { data } = await axios.delete(`/product/${id}`)
            toast.success(`"${data.name}" foi exluido`)
            navigate('/dashboard/admin/products')
        } catch (err) {
            console.log(err)
            toast.error('Excluir falhou, tente novamente')
        }
    }

    return (
        <>
            <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="Admin Dashboard" />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>


                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">Atualizar produto</div>

                        {photo ? (
                            <div className="text-center">
                                <img src={(URL.createObjectURL(photo))}
                                    alt="product photo"
                                    className="img img-responsive"
                                    height="200px"
                                />
                            </div>
                        ) : <div className="text-center">
                            <img
                                src={`${process.env.REACT_APP_API}/product/photo/${id}?${new Date().getTime()}`}
                                alt="product photo"
                                className="img img-responsive"
                                height="200px"
                            />
                        </div>}

                        <div className="pt-2">
                            <label className="btn btn-outline-secondary p-2 col-12 mb-3">
                                {photo ? photo.name : "Carregar foto"}
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                    hidden
                                />
                            </label>
                        </div>


                        <input
                            type="text"
                            className="form-control p-2 mb-3"
                            placeholder="Atualize o nome..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <textarea
                            type="text"
                            className="form-control p-2 mb-3"
                            placeholder="Atualize a descrição"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <input
                            type="number"
                            className="form-control p-2 mb-3"
                            placeholder="Atualize o preço..."
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <Select
                            // showSearch
                            bordered={false}
                            size="large"
                            className="form-select mb-3"
                            placeholder="Atualize a categoria..."
                            onChange={(value) => setCategory(value)}
                            value={category}
                        >
                            {categories?.map((c) =>
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>)}
                        </Select>

                        <input
                            type="number"
                            min="1"
                            className="form-control p-2 mb-3"
                            placeholder="Atualize a quantidade"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />

                        <div className="d-flex justify-content-between">
                            <button
                                onClick={handleSubmit}
                                className="btn btn-warning mb-5">
                                Atualizar
                            </button>

                            <button
                                onClick={handleDelete}
                                className="btn btn-danger mb-5">
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}