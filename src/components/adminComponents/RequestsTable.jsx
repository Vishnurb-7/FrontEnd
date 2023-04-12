import React, { useMemo, useState } from 'react'
import DataTable from 'react-data-table-component';
import styled from 'styled-components';

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

const RequestsTable = ({ more, data, select }) => {



    const columns = [
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Company Name',
            selector: row => row.companyname,
		},
		{
            name: '',
			cell: row => (<button type="" className='bg-blue-500 hover:bg-blue -700 text-white font-bold py-2 px-4 rounded-full' onClick={() => { select(row._id);;more(true); }}>More</button>),
        },
    ];



    const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const filteredItems = data.filter(
		item => item.email && item.email.toLowerCase().includes(filterText.toLowerCase()),
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




  return (
    <div>
       <DataTable
            columns={columns}
              data={filteredItems}
              pagination
              paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
			subHeader
			subHeaderComponent={subHeaderComponentMemo}

        />
    </div>
  )
}

export default RequestsTable