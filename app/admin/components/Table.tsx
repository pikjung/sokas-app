interface TableProps {
  header: string[];
  children: React.ReactNode
  action: boolean;
  editHandler: () => void;
  deleteHandler: () => void;
}

const Table: React.FC<TableProps> = ({
  action,
  editHandler,
  deleteHandler,
  header,
  children
}) => {
  return (
    <div className="overflow-x-auto">
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
    </div>
  );
};

export default Table;
