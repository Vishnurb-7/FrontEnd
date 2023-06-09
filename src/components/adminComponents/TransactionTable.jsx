import { Button } from '@chakra-ui/react';
import React, { useMemo,  useState } from 'react'
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import jsPDF from "jspdf";
import "jspdf-autotable";

const TextField = styled.input`
	height: 50px;
	width: 250px;
	margin-top:20px;
	
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 2px solid black;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: text;
	}
`;

const ClearButton = styled.button`
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	height: 50px;
	width: 32px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top:20px;
	
`;


const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <TextField
            id="search"
            type="text"
            placeholder="Filter By Name"
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
        />
        <ClearButton className='font-bold text-xl text-white bg-black hover:scale-105' type="button" onClick={onClear}>
            X
        </ClearButton>
    </>
);

const TransactionTable = ({ data }) => {




    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Transaction Report";
        const headers = [["ManagerId", "UserId", "Estimate Amount", "Advance"]];

        const datas = filteredItems.map((elt) => [
            elt.managerId,
            elt.userId,
            elt.estimate.reduce((sum, amount) => { return (Number(sum) + Number(amount.price)) }, 0),
            Math.floor(elt.estimate.reduce((sum, amount) => { return (Number(sum) + Number(amount.price)) }, 0) / 2)
        ])

        let content = {
            startY: 50,
            head: headers,
            body: datas
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
    }

    function convertArrayOfObjectsToCSV(array) {
        let result;
        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        const keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        array.forEach(item => {
            let ctr = 0;
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter;
                if (key !== "estimate") {
                    result += item[key];

                    ctr++;
                } else {
                    result += item[key].reduce((sum, amount) => { return (Number(sum) + Number(amount.price)) }, 0);

                    ctr++;
                }



            });
            result += lineDelimiter;

        });

        return result;

    }

    // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
    function downloadCSV(array) {
        const link = document.createElement('a');
        let csv = convertArrayOfObjectsToCSV(array);
        if (csv == null) return;

        const filename = 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;

        }

        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();

    }


    const Export = ({ onExport }) => <Button onClick={e => onExport(e.target.value)}>Export to CSV</Button>;





    const columns = [
        {
            name: 'ManagerId',
            selector: row => row.managerId,
        },
        {
            name: 'UsreId',
            selector: row => row.userId,
        },
        {
            name: 'Total Amount',
            selector: row => row.estimate.reduce((sum, amount) => { return (Number(sum) + Number(amount.price)) }, 0),
        },
        {
            name: 'Advance',
            cell: row => Math.floor(row.estimate.reduce((sum, amount) => { return (Number(sum) + Number(amount.price)) }, 0) / 2)
        },
    ];

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = data.filter(
        item => item.managerId && item.managerId.toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);

    const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);




    return (

        < div >

            <Button onClick={() => exportPDF()} className="left-[84%]">Transaction Report</Button>
            < DataTable
                columns={columns}
                data={filteredItems}
                pagination
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                actions={actionsMemo}


            />
        </div >

    )
}

export default TransactionTable;
