const Textellipsis = ({ children, className }) => {
  return (
    <span
      className={`whitespace-nowrap overflow-hidden text-ellipsis text-start w-full inline-block ${className}`}
    >
      {children}
    </span>
  );
};

export default Textellipsis;
