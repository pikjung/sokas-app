
interface ContentProps {
  children: React.ReactNode;
  header: string;
  action?: React.ReactNode;
  desc: string;
}

const Content: React.FC<ContentProps> = ({
  children,
  header,
  action,
  desc
}) => {
  return (
    <div className="w-11/12 ml-8 mr-2 container flex flex-col">
      <div className="flex flex-row mt-8">
        <div>
          <h2 className="font-semibold text-2xl text-slate-700">{header}</h2>
          <p className="font-light text-sm text-slate-400">{desc}</p>
        </div>
        <div className="flex-grow">
          {action}
        </div>
      </div>
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}

export default Content;