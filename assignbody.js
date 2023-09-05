 const Assignbody = (
        <>
            <Grid container>
                <Dialog
                    open={open}
                    onClose={() => setSearchDialogOpen(false)}
                    maxWidth="lg"
                    fullWidth
                > 
                    <DialogContent style={{ paddingTop: 0, paddingBottom: '30px' }}>
                        <Grid container className={classes.typoHeaderContainer}>
                            <Grid item xs={8}>
                                <Typography className={classes.typoHeader}>
                                    Assign Delegated Contact
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ textAlign: "right" }}>
                                <CloseIcon
                                    className={classes.closeIcon}
                                    onClick={handleClose}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <div style={{ position: 'relative', left: '1px', bottom: '10px' }}>
                                    <label>
                                        Subscriber ID
                                        </label>
                                </div>
                                <form className={classes.root} noValidate autoComplete="off" style={{ position: 'relative', left: '-5px', bottom: '10px' }}>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        InputProps={{
                                            classes: { input: classes.customInput },
                                        }}
                                        InputLabelProps={{
                                            classes: { outlined: classes.customLabel },
                                            shrink: true,
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        style={{
                                            borderRadius: "4px",
                                            textTransform: "capitalize",
                                            backgroundColor: '#217e76',
                                            position: "relative",
                                            left: '15px',
                                            width: '10rem'
                                        }}
                                    >
                                        Search Contact
                                    </Button>
                                </form>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={12}>
                                <Paper elevation={0} className={classes.contentPaper}>
                                    <div className={classes.customToolbar}>
                                        <MuiThemeProvider theme={theme}>
                                            <div className="tableContainer1" style={tableStyle}>
                                                <MaterialTable
                                                    autoHeight={true}
                                                    key={count}
                                                    data={tableData}
                                                    columns={columns}
                                                    options={{
                                                        paging: false,
                                                        search: false,
                                                        toolbar: false,
                                                        sorting: false,
                                                        detailPanelType: "single",
                                                        selection: false,
                                                        maxBodyHeight: "40vh",
                                                        overflowY: "hidden !important",
                                                        padding: "dense",
                                                        filtering: false,
                                                        showTitle: false,
                                                        doubleHorizontalScroll: false,
                                                        headerStyle: {
                                                            whiteSpace: "nowrap",
                                                            position: "sticky",
                                                            fontWeight: 700,
                                                            fontSize: commonFontSizes.bodyTwo + "rem",
                                                            color: "#2C2B2C",
                                                            border: "0px solid lightgrey",
                                                            textAlign: "start"
                                                        },
                                                        cellStyle: () => CellBorderStyle,
                                                        rowStyle: (row) => {
                                                            const id = row.tableData.id;
                                                            return {
                                                                backgroundColor: id % 2 === 0 ? "#F5F5F5" : "#fff",
                                                                borderBottom: "1px solid lightgray",
                                                                borderTop: id === 0 ? "1px solid lightgray" : "none",
                                                            }
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </MuiThemeProvider>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <Grid container>
                        <Grid
                            item
                            xs={12}
                            style={{
                                display: "flex",
                                justifyContent: "end",
                                marginRight: "25px",
                                position: 'relative',
                                bottom: '15px'
                            }}
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{
                                    borderRadius: 0,
                                    height: "30px",
                                    textTransform: "capitalize",
                                    backgroundColor: '#217e76'
                                }}
                                onClick={handleAssign}
                            >
                                Assign
                            </Button>
                        </Grid>
                    </Grid>
                </Dialog>
            </Grid>
        </>
    );
