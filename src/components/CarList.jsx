import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import './CarList.css';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import AddCar from "./AddCar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCars, addCar, deleteCar} from "../utils/api";
import UpdateCar from "./UpdateCar";

export default function CarList() {
    
    const { data: cars } = useQuery({
        queryKey: ['cars'],
        queryFn: fetchCars
    })

    const queryClient = useQueryClient();

    const addMutation = useMutation({
        mutationFn: addCar,
        onSuccess: () => queryClient.invalidateQueries(['cars'])

    })

    const deleteMutation = useMutation({
        mutationFn: deleteCar,
        onSuccess: () => queryClient.invalidateQueries(['cars'])

    })





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
                <Button onClick={() => deleteMutation.mutate(params.data._links.self.href)}>
                    Delete
                </Button>
        },
        {
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filter: false,
            cellRenderer: params => <UpdateCar currentCar={params.data} />

        }
    ]);

    const defaultColDef = {
        sortable: true, filter: true
    };


    const autoSizeStrategy = {
        type: 'fitCellContents',
    };






   // useEffect(() => {
    //    fetchCars(); // Call the async function inside useEffect
   // }, []);












    return (

        <div className="CarList">
            <AddCar addCar={car => addMutation.mutate(car)} />
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