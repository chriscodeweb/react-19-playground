const TabButton = ({ children, isActive, onClick }) => {
  if (isActive) {
    return <div className='text-indigo-600'>{children}</div>;
  }
  return (
    <button
      className="text-white"
      onClick={() => {
        onClick();
      }}
    >
      {children}
    </button>
  );
};
export default TabButton;
