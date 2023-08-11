 const body = (
    <div className={classes.paperDialog}>
      {dialogContent === "delegated unreachable" && (
        <>
          <Grid container className={classes.typoHeaderContainer}>
            <Grid item xs={8}>
              <Typography className={classes.typoHeader}>
                Unreachable
              </Typography>
            </Grid>
            <Grid item xs={4} style={{ textAlign: "right" }}>
              <CloseIcon className={classes.closeIcon} onClick={handleClose} />
            </Grid>
          </Grid>
          <Grid container>
            {unreachableData.map((data) => (
              <>
                <Grid item xs={6} key={data.id}>
                  <Typography variant="caption" className={classes.leftDialog}>
                    {data.title}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="caption">{data.dess}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="caption" className={classes.rightDialog}>
                    {data.output}
                  </Typography>
                </Grid>
              </>
            ))}
          </Grid>
          <Grid container>
            <Grid item xs={12} className={classes.closeButtonGrid}>
              <Button
                variant="contained"
                onClick={handleClose}
                className={classes.closeButton}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      {dialogContent === "delegated care" && (
        <>
          <Grid container className={classes.typoHeaderContainer}>
            <Grid item xs={8}>
              <Typography className={classes.typoHeader}>
                Care Coordination Refused
              </Typography>
            </Grid>
            <Grid item xs={4} style={{ textAlign: "right" }}>
              <CloseIcon className={classes.closeIcon} onClick={handleClose} />
            </Grid>
          </Grid>
          <Grid container>
            {careData.map((data) => (
              <>
                <Grid item xs={6} key={data.id}>
                  <Typography variant="caption" className={classes.leftDialog}>
                    {data.title}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="caption">{data.dess}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="caption" className={classes.rightDialog}>
                    {data.output}
                  </Typography>
                </Grid>
              </>
            ))}
          </Grid>
          <Grid container>
            <Grid item xs={12} className={classes.closeButtonGrid}>
              <Button
                variant="contained"
                onClick={handleClose}
                className={classes.closeButton}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      {dialogContent === "delegated cna" && (
        <>
          <Grid container className={classes.typoHeaderContainer}>
            <Grid item xs={8}>
              <Typography className={classes.typoHeader}>
                CNA Refused
              </Typography>
            </Grid>
            <Grid item xs={4} style={{ textAlign: "right" }}>
              <CloseIcon className={classes.closeIcon} onClick={handleClose} />
            </Grid>
          </Grid>
          <Grid container>
            {cnaData.map((data) => (
              <>
                <Grid item xs={3} key={data.id}>
                  <Typography variant="caption" className={classes.leftDialog}>
                    {data.title1}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="caption">{data.dess}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="caption" className={classes.rightDialog}>
                    {data.output1}
                  </Typography>
                </Grid>
                <Grid item xs={3} key={data.id}>
                  <Typography variant="caption" className={classes.leftDialog}>
                    {data.title2}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="caption">{data.dess}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="caption" className={classes.rightDialog}>
                    {data.output2}
                  </Typography>
                </Grid>
              </>
            ))}
          </Grid>
          <Grid container>
            <Grid item xs={12} className={classes.closeButtonGrid}>
              <Button
                variant="contained"
                onClick={handleClose}
                className={classes.closeButton}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      
     
    </div>
  );
