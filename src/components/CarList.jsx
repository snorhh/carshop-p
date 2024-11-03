import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import './CarList.css';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import AddCar from "./AddCar";
import UpdateCar from "./UpdateCar";

export default function CarList() {
    const [cars, setCars] = useState([]);
    const [columnDefs, setColumnDefs] = useState([
        { field: 'brand', sort: 'asc' },
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
        },
        {
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filter: false,
            cellRenderer: params => <UpdateCar updateCar={updateCar} currentCar={params.data} />
                
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
        };

        

        useEffect(() => {
            fetchCars(); // Call the async function inside useEffect
    }, []);



    //defines an asynchronous function called deleteCar that takes one argument, url, which is the URL to send the request to
    const deleteCar = async (url) => {

        // an options object is being created with the HTTP method set to DELETE. 
        // This is the method used for the HTTP request, and it specifies that the request will attempt to delete something on the server    
        const options = {
            method: "DELETE"
        }
        //the confirm function prompts the user with a message: "Do you want to delete car?". This is a simple confirmation dialog. 
        // If the user confirms, the code continues to the next steps. If they cancel, the function execution stops.
        try {
            if (confirm("Do you want to delete car?")) {

                //If the user confirms, it sends an HTTP DELETE request to the server using the fetch function with the provided url and options
                // (which specify the DELETE method). The await keyword is used to wait for the server's response before proceeding, 
                //ensuring the code doesn't move ahead until the request completes.
                const response = await fetch(url, options);
                fetchCars();
            }
        } catch (e) {
            console.error(e);
        }


    } //deleteCar ends

    const addCar = async (car) => {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car)
        }

        try {
            const response = await fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars', options);
            const data = await response.json();
            console.log('Created:', data);
            fetchCars();
        }

        catch (e) {
            console.error(e);
        }
    }

    const updateCar = async (url, car) => {
        const options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car)
        }

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log('Updated:', data);
            fetchCars();
        }

        catch (e) {
            console.error(e);
        }
    }



    return (

        <div className="CarList">
            <AddCar addCar={addCar} />
            <div className="ag-theme-material" style={{ width: '95%', height: 600 }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    autoSizeStrategy={autoSizeStrategy}
                    accentedSort={true}
                />
            </div>




        </div>

    );
}