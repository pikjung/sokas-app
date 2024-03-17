import { FaRegEdit } from "react-icons/fa";
import { GoTrash } from "react-icons/go";

interface TableProps {
  header: [];
  data: [];
  action: boolean;
  editHandler: () => void;
  deleteHandler: () => void;
}

const Table: React.FC<TableProps> = ({
  action,
  editHandler,
  deleteHandler,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table text-slate-600">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
            {action ? <th>Action</th> : ""}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fikri</td>
            <td>Fikri@gmail.com</td>
            <td>fikri123</td>
            <td>Admin</td>
            {action ? (
              <td>
                <div className="flex gap-2">
                  <button className="border-0" onClick={() => editHandler()}>
                    <FaRegEdit size={20} />
                  </button>
                  <button className="border-0" onClick={() => deleteHandler()}>
                    <GoTrash size={20} />
                  </button>
                </div>
              </td>
            ) : (
              ""
            )}
          </tr>
          <tr>
            <td>Fikri</td>
            <td>Fikri@gmail.com</td>
            <td>fikri123</td>
            <td>Admin</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
