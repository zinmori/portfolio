const Tab = ({ caption, onSelect, isSelected }) => {
  return (
    <button
      className={`rounded-full px-4 py-1 border-2 hover:border-purple-900  ${
        isSelected ? 'border-purple-900' : 'border-white'
      } `}
      onClick={onSelect}
    >
      {caption}
    </button>
  );
};

export default Tab;
