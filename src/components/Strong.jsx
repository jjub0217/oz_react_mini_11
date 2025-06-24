const Strong = ({ children }) => {
  return children ? (
    <strong className="text-red-500 text-sm">{children}</strong>
  ) : null;
};

export default Strong;
