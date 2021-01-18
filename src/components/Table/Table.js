import React from 'react';
import Table from 'react-bootstrap/Table';
import './Table.css';

export function TableComponent({ data, header, removeItem, changeValue }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {header.map((el) => (
            <td key={el.id}>{el.value}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((el) => (
          <tr key={el.index}>
            {header.map((item) => (
              <td
                key={`${el.index}-${item.id}`}
                className={`column--${item.id}`}
              >
                {item.id === 'remove' ? (
                  <button
                    onClick={() => removeItem(el.index)}
                    className="remove-button"
                  />
                ) : item.editable ? (
                  <input
                    type="text"
                    className="table-input"
                    value={el[item.id]}
                    onChange={(e) =>
                      changeValue(el.index, item.id, e.target.value)
                    }
                  />
                ) : (
                  <div className="table-value">{el[item.id]}</div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
