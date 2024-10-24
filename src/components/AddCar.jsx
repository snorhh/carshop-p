import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button } from "@mui/material"

export default function AddCar() {

    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        modelYear: '',
        price: ''



    })

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = event => {
        setCar({...car, [event.target.name]: event.target.value  });
    }

    const handleSave = () => {
        console.log(car);
    }

    return (
        <>
        <Button onClick={handleClickOpen}>Add car</Button>
            <Dialog
                open={open}
                onClose={handleClose}
             
            >
                <DialogTitle>New car</DialogTitle>
                <DialogContent>
                    
                    <TextField
                        autoFocus
                        required
                        id="brand"
                        name="brand"
                        label="Brand"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                     <TextField
                        autoFocus
                        required
                        id="model"
                        name="model"
                        label="Model"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                      <TextField
                        autoFocus
                        required
                        id="color"
                        name="color"
                        label="Color"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                      <TextField
                        autoFocus
                        required
                        id="fuel"
                        name="fuel"
                        label="Fuel"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                      <TextField
                        autoFocus
                        required
                        id="modelYear"
                        name="modelYear"
                        label="Year"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                      <TextField
                        autoFocus
                        required
                        id="price"
                        name="price"
                        label="Price"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>

        </>




    )

};