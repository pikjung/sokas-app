
interface CardProps {
  header?: string,
  children?: React.ReactNode,
  link?: string,
  link_name?: string
}

const Card: React.FC<CardProps> = ({
  header,
  children,
  link,
  link_name
}) => {
  return (
    <div className="w-full border rounded-lg p-5">
      {header ?
        <div className="flex flex-nowrap">
          <h2 className="flex-1 font-semibold mb-6">{header}</h2>
          {link ? <p className="flex-none"><a href={link} className="text-sm font-bold text-indigo-500">{link_name ? link_name : "Lihat detail"}</a></p> : ''}
        </div>
        : ''}
      {children}
    </div>
  );
}

export default Card;