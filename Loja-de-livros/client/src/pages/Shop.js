import { useState, useEffect, use } from "react"
import axios from "axios"
import ProductCard from "../components/cards/ProductCard"
import { Checkbox, Radio } from "antd"
import { prices } from "../prices"

export default function Shop() {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [checked, setChecked] = useState([]) //categories
    const [radio, setRadio] = useState([]) //radio

    useEffect(() => {
        if (!checked.length || !radio.length) loadProducts()
    }, [])

    useEffect(() => {
        if (checked.length || radio.length) loadfilteredProducts()
    }, [checked, radio])

    const loadfilteredProducts = async () => {
        try {
            const { data } = await axios.post('/filtered-products', {
                checked,
                radio,
            });

            console.log('filtered products =>', data)
            setProducts(data)
        } catch (err) {
            console.log(err)
        }
    }

    const loadProducts = async () => {
        try {
            const { data } = await axios.get("/products")
            setProducts(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = async () => {
        try {
            const { data } = await axios.get("/categories")
            setCategories(data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleCheck = (value, id) => {
        console.log(value, id)
        let all = [...checked]
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id)
        }
        setChecked(all)
    }


    return (<>

        {/* <pre>{JSON.stringify({ radio, checked }, null, 4)}</pre> */}

        <div className="container-fluid">

            <div className="row">
                <div className="col-md-3">
                    <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
                        Filtrar por categoria
                    </h2>
                    <div className="row p-5">
                        {categories?.map(c => (
                            <Checkbox
                                key={c._id}
                                onChange={e => handleCheck(e.target.checked, c._id)}
                            >
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>

                    <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
                        Filtrar por preço
                    </h2>
                    <div className="row p-5">
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {prices?.map((p) => (
                                <div key={p._id} style={{ marginLeft: "0px" }}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>

                    <div className="p-5 pt-0">
                        <button
                            className="btn btn-outline-secondary col-12"
                            onClick={() => window.location.reload()}
                        >
                            LIMPAR FILTROS
                        </button>
                    </div>
                </div>

                <div className="col-md-9">
                    <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
                        {products?.length} PRODUTOS DISPONIVEIS
                    </h2>

                    <div className="row" style={{ height: '100vh', overflow: 'scroll' }}>
                        {products?.map(p => (
                            <div className="col-md-4">
                                <ProductCard p={p} key={p._id} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}