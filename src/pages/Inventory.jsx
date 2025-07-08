import React, {useState, useEffect} from 'react';
import CreateProduct from './CreateProduct';
import InventoryTable from '../components/tables/InventoryTable';
import CRUDformat from '../components/CRUDformat';
import EditProduct from './EditProduct';
import StockModal from '../components/modals/StockModal';

export default function Inventory() {
    const [motorcycles, setMotor] = useState([]);
    const [row, setRow] = useState({});
    const [stock, setStock] = useState({type: '', modal: false});
    const [loading, setLoad] = useState(true);
    
    useEffect(() => {
        fetch('http://localhost:8000/api/motorcycle')
        .then(response => response.json())
        .then(data => {
            setMotor(data);
            setLoad(false);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            setLoad(true);
        })
    }, []);
    
    async function editMotor(id) {
        const response = await fetch("http://localhost:8000/api/motorcycle/" + id);

        if(!response.ok) {
            throw new Error('Motorcycle not found');
        }

        const data = await response.json();
        setRow({motor: data, bool: true});
        // document.getElementById('editProduct').style.display = 'block';
    }

    async function adjustStock(type) {
        const response = await fetch(`http://localhost:8000/api/motorcycle/${stock.id}`);

        if(!response.ok) {
            throw new Error('Motorcycle not found');
        }

        const data = await response.json();
        setStock({
            ...stock,
            modal: false,
            quantity: data.quantity,
            type: type,
            img: data.file_path,
            name: data.name
        });
    }
    
    return (
        <CRUDformat addModal={<CreateProduct />} modalId='createProduct' label="Unit" adjustStock={adjustStock} modal={stock.modal}>
            <InventoryTable motorcycles={motorcycles} loading={loading} editMotor={editMotor} stock={stock} setStock={setStock} />
            {row.bool ? (
                <EditProduct motor={Object.keys(row.motor).length > 0 ? row.motor : {}} />
            ) : ''}
            {stock.type !== '' ? (<StockModal setStock={setStock} stock={stock} />) : ''}
        </CRUDformat>
    );
}