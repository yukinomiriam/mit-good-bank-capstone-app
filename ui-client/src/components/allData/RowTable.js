function RowTable({ data }){
    return (
        <>
        <tr>
            <td className="brand-table-td">
                {data.name}
            </td>
            <td className="brand-table-td">{data.email}</td>
            <td className="brand-table-td">{data.password}</td>
        </tr>
        </>
      );
}

export default  RowTable;