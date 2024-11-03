interface TableProps {
  header: string[];
  children: React.ReactNode
  action: boolean;
}

const Table: React.FC<TableProps> = ({
  action,
  header,
  children
}) => {
  return (
    <table className="table text-slate-600">
      <thead>
        <tr>
          {Array.isArray(header) && header.map((item: string, index: number) => (
            <th key={index}>{item}</th>
          ))}
          {action ? <th>Action</th> : ""}
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  );
};

export default Table;
