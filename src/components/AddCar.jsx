import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button } from "@mui/material"

export default function AddCar() {

    const [open, setOpen] = useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
        <Button onClick={handleClickOpen}>Add car</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData).entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
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
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>

        </>




    )

};