import React from 'react';
import "./Table.css";

function Table({ ths, trs }) {
    return (
        <table className='content-table'>
            <thead>
                <tr>
                    {ths?.map((th, index) => (
                        <th key={index}>{th.toUpperCase()}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {trs?.map((tr, rowIndex) => (
                    <tr key={tr.id || rowIndex}>
                        {ths?.map((th, colIndex) =>
                        (
                            <td key={`${rowIndex}-${colIndex}`}>
                                {tr[th]}
                            </td>
                        )
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;
