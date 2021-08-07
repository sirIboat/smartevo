import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { Container, Button } from "react-bootstrap";
import "firebase/database";
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import './History.css'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const columns = [
    { id: 'HN', label: 'HN', minWidth: 150, align: 'center', },
    { id: 'SN', label: 'SN', minWidth: 150, align: 'center', },
    {
        id: 'HR',
        label: 'HR',
        minWidth: 100,
        align: 'center',
        // format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'DIA',
        label: 'DIA',//\u00a0(km\u00b2)
        minWidth: 100,
        align: 'center',

    },
    {
        id: 'SPO2',
        label: 'SPO2',
        minWidth: 100,
        align: 'center',

    },
    {
        id: 'SYS',
        label: 'SYS',
        minWidth: 100,
        align: 'center',

    },
    {
        id: 'MEAN',
        label: 'MEAN',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'datetime',
        label: 'datetime',
        minWidth: 100,
        align: 'center',
        // format: (value) => value.toGMTString()
    },

];

/* function createData(HN, SN, HR, DIA, SPO2, SYS, MEAN, datatime) {
    const myDate = new Date(datatime * 1000);
    myDate.toGMTString()
    return { HN, SN, HR, DIA, SPO2, SYS, MEAN, myDate };
} */
const rows = [];

const useStyles = makeStyles({
    root: {
        width: '100%',
        borderTopRightRadius: "0px",
        borderTopLeftRadius: "0px",
    },
    container: {
        height: 440,

    },
});
export default function History({ serial }) {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(dateUnix(new Date()));
    const [endDate, setEndDate] = useState(dateUnix(new Date()));

    function dateUnix(dates) {
        var myDate = new Date(dates); // Your timezone!
        var myEpoch = myDate.getTime() / 1000.0;
        // console.log(myEpoch);
        return myEpoch;
    }



    function onSubmit(e) {
        e.preventDefault();

        // console.log(startDate + " " + endDate)
        const dbRef = firebase.database().ref('datas/' + serial);
        dbRef.orderByChild('datetime').limitToLast(100).startAt(startDate).endAt(endDate).get().then((snapshot) => {
            let array = []; rows.length = 0
            snapshot.forEach((snap) => {
                array.push(snap.val());
                rows.push(snap.val());
            });
            setData(array);

        }).catch((error) => {
            console.error(error);
        });
    }
    {
        data.map((data) => {
            const myDate = new Date(data.datetime * 1000);
            // console.log(myDate.toGMTString()); /* + "<br>" + myDate.toLocaleString() */
            // rows.push(data.HN, data.SN, data.HR, data.DIA, data.SPO2, data.SYS, data.MEAN, data.datetime)

        })
    }
    // console.log(data)

    const today = new Date();
    const fileName = 'Data ' + today
    /*  const csvData = [
         { id: 1, name: 'sakumar' },
         { id: 2, name: 'kumar' }
     
     ] */

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (rows, fileName) => {
        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <div className="history" >
            <Container>

                <div className='row '>
                    <div className='datetimepicker-box'>
                        <div className='row '>
                            <div class="col-md-3 ">
                                <div className='datetimepicker-box-start'>
                                    Start Date
                                    <DateTimePickerComponent
                                        onChange={(e) => setStartDate(dateUnix(e.target.value))}
                                        is24Hour={true}
                                    />
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div className='datetimepicker-box-end'>
                                    End Date
                                    <DateTimePickerComponent
                                        onChange={(e) => setEndDate(dateUnix(e.target.value))}
                                        is24Hour={true}
                                    />
                                </div>
                            </div>
                            <div class="col-md-6 ">
                                <button className='buttonHistory' onClick={onSubmit}>Search</button>
                                <button className='buttonHistory-export' onClick={(e) => exportToCSV(rows, fileName)}>Export</button>
                            </div>



                        </div>
                    </div>
                </div>




                <div className='row'>
                    <Paper className={classes.root}>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
            </Container>

        </div >
    );

}

