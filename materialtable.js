 {
                                title: "Delegated Unreachable",
                                field: "Dele_Unreachable",
                                cellStyle: {
                                    color: "#861426",
                                    fontSize: commonFontSizes.bodyTwo + "rem",
                                    textDecoration: "underline",
                                    fontWeight: 600,
                                    // minWidth: 110,
                                    // maxWidth: 110,
                                    whiteSpace: "nowrap",
                                },
                                render: (rowData) => (
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "left", alignItems: "left" }} onClick={handleDelegatedPopup}>
                                        {rowData.Dele_Unreachable}
                                        <ExitToAppIcon style={{ width: "1.2rem", height: "1.2rem", paddingLeft: "0.5rem", color: "#861426" }} />
                                    </div>
                                ),
                            },
                            {
                                title: "Delegated Care Coordination Refuced",
                                field: "Dele_Refuced",
                                cellStyle: {
                                    color: "#861426",
                                    fontSize: commonFontSizes.bodyTwo + "rem",
                                    textDecoration: "underline",
                                    fontWeight: 600,
                                    // minWidth: 110,
                                    // maxWidth: 110,
                                    whiteSpace: "nowrap",
                                },
                                render: (rowData) => (
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "left", alignItems: "left" }} >
                                        {rowData.Dele_Refuced}
                                        <ExitToAppIcon style={{ width: "1.2rem", height: "1.2rem", paddingLeft: "0.5rem", color: "#861426" }} />
                                    </div>
                                ),
                            },
                            {
                                title: "Delegated CNA Refuced",
                                field: "Dele_Cna_Refuced",
                                cellStyle: {
                                    color: "#861426",
                                    fontSize: commonFontSizes.bodyTwo + "rem",
                                    textDecoration: "underline",
                                    fontWeight: 600,
                                    // minWidth: 110,
                                    // maxWidth: 110,
                                    whiteSpace: "nowrap",
                                },
                                render: (rowData) => (
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "left", alignItems: "left" }}>
                                        {rowData.Dele_Cna_Refuced}
                                        <ExitToAppIcon style={{ width: "1.2rem", height: "1.2rem", paddingLeft: "0.5rem", color: "#861426" }} />
                                    </div>
                                ),
                            },
                            {
                                title: "Delegated Touchpoint",
                                field: "Dele_Touchpoint",
                                cellStyle: {
                                    color: "#861426",
                                    fontSize: commonFontSizes.bodyTwo + "rem",
                                    textDecoration: "underline",
                                    fontWeight: 600,
                                    // minWidth: 110,
                                    // maxWidth: 110,
                                    whiteSpace: "nowrap",
                                },
                                render: (rowData) => (
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "left", alignItems: "left" }}>
                                        {rowData.Dele_Touchpoint}
                                        <ExitToAppIcon style={{ width: "1.2rem", height: "1.2rem", paddingLeft: "0.5rem", color: "#861426" }} />
                                    </div>
                                ),
                            },
