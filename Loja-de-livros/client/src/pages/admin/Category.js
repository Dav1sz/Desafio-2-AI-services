import { useState, useEffect } from 'react'
import { useAuth } from "../../context/auth"
import AdminMenu from "../../components/nav/AdminMenu";
import axios from 'axios';
import toast from 'react-hot-toast';
import CategoryForm from '../../components/forms/CategoryForm';
import { Modal } from 'antd';


export default function AdminCategory() {
    //context
    const [auth, setAuth] = useAuth();

    //state
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selected, setSelect] = useState(null);
    const [updatingName, setUpadatingName] = useState("");


    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const { data } = await axios.get("/categories");
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/category', { name });
            if (data?.error) {
                toast.error(data.error);
            } else {
                loadCategories();
                setName("");
                toast.success(`"${data.name}" foi criada com sucesso`);
            }
        } catch (err) {
            console.log(err);
            toast.error("Criação de categoria falhou, tente novamente");
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/category/${selected._id}`, {
                name: updatingName,

            })
            if (data?.error) {
                toast.error(data.error);
            } else {
                toast.success(`"${data.name}" foi atualizada com sucesso`);
                setSelect(null);
                setUpadatingName("");
                loadCategories();
                setVisible(false);
            }
        } catch (err) {
            console.log(err)
            toast.error("Categoria já exite, tente novamente");
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.delete(`/category/${selected._id}`);

            if (data?.error) {
                toast.error(data.error);
            } else {
                toast.success(`"${data.name}" foi excluida com sucesso`);
                setSelect(null);
                loadCategories();
                setVisible(false);
            }
        } catch (err) {
            console.log(err)
            toast.error("Categoria já exite, tente novamente")
        }
    }


    return (
        <>


            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>


                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">Gerenciar categorias</div>

                        <CategoryForm
                            value={name}
                            setValue={setName}
                            handleSubmit={handleSubmit}
                        />

                        <hr />

                        <div className='col'>
                            {categories?.map((c) => (
                                <button key={c._id} className='btn btn-warning  m-3'
                                    onClick={() => {
                                        setVisible(true);
                                        setSelect(c);
                                        setUpadatingName(c.name);
                                    }}>
                                    {c.name}
                                </button>
                            ))}
                        </div>

                        <Modal
                            visible={visible}
                            onOk={() => setVisible(false)}
                            onCancel={() => setVisible(false)}
                            footer={null}
                        >
                            <CategoryForm
                                value={updatingName}
                                setValue={setUpadatingName}
                                handleSubmit={handleUpdate}
                                buttonText='Atualizar'
                                handleDelete={handleDelete}
                            />

                        </Modal>

                    </div>
                </div>
            </div>
        </>
    );
}