import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import { useStyles } from "../css/MemberDetails";

const SearchDialog = ({ handleSearchDialog }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        handleSearchDialog()
    };

    const handleTable = () => {
        console.log("Hi Table");
        setOpen(false);
    }

    const searchBody = (
        <div className={classes.paperDialog2}>
            <>
                <Grid container className={classes.typoHeaderContainer}>
                    <Grid item xs={12} style={{ textAlign: "right" }}>
                        <CloseIcon className={classes.closeIcon} onClick={handleClose} />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        className={classes.errorIconGrid}
                    >
                        <ErrorOutlineIcon
                            className={classes.errorIcon}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} style={{ paddingBottom: "5px" }}>
                        <Typography
                            variant="caption"
                            className={classes.typoHeaderSearch}
                        >
                            Member not Eligible in PHP
                       </Typography>
                        <Typography
                            variant="caption"
                            className={classes.typoHeaderSearch}
                        >
                            Do you still want to continue?
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        className={classes.buttonGrid}
                    >
                        <Button
                            variant="contained"
                            onClick={handleTable}
                            className={classes.closeButton3}>
                            Yes
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleClose}
                            className={classes.closeButton2}>
                            No
                        </Button>
                    </Grid>
                </Grid>
            </>
        </div>
    );

    return (
        <React.Fragment>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className={classes.modal}
                >
                    {searchBody}
                </Modal>
            </div>
        </React.Fragment>
    );
};

export default SearchDialog;
