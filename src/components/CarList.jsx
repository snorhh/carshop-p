import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import './CarList.css';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import AddCar from "./AddCar";

export default function CarList() {
    const [cars, setCars] = useState([]);
    const [columnDefs, setColumnDefs] = useState([
        { field: 'brand' },
        { field: 'model' },
        { field: 'color' },
        { field: 'fuel' },
        { field: 'modelYear', headerName: 'Year' },
        { field: 'price' },
        {
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filter: false,

            cellRenderer: params =>
                <Button onClick={() => deleteCar(params.data._links.self.href)}>
                    Delete
                </Button>


        }
    ]);

    const defaultColDef = {
        sortable: true, filter: true
    };


    const autoSizeStrategy = {
        type: 'fitCellContents',
    };


    const fetchCars = async () => {
        try {
            const response = await fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars');
            const data = await response.json();
            setCars(data._embedded.cars);
            console.log(data);

        }

        catch (e) {
            console.error(e);
        }
    }




    const deleteCar = async (url) => {
        const options = {
            method: "DELETE"
        }

        try {
            if (confirm("Do you want to delete car?")) {
                const response = await fetch(url, options);
                fetchCars();
            }
        } catch (e) {
            console.error(e);
        }


    }

    useEffect(() => fetchCars(), []);

    return (

        <div className="CarList">
            <AddCar />
            <div className="ag-theme-material" style={{ width: 700, height: 500 }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    autoSizeStrategy={autoSizeStrategy}
                />
            </div>




        </div>

    );
}