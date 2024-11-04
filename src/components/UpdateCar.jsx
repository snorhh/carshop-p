import { useState } from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material"
import CarDialogContent from "./CarDialogContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCar } from "../utils/api";


export default function UpdateCar({ currentCar }) {

    const [car, setCar] = useState(currentCar);

    const [open, setOpen] = useState(false);

    const url = currentCar._links.self.href;

    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: updateCar,
        onSuccess: () => queryClient.invalidateQueries(['cars'])
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = event => {
        setCar({ ...car, [event.target.name]: event.target.value });
    }

    const handleSave = () => {
        console.log(car);
        updateMutation.mutate({ url, car });
        setOpen(false);
    }

    return (
        <>
            <Button onClick={handleClickOpen}>EDIT</Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>New car</DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>

        </>
    )
};