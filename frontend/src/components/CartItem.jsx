const CartItem = ({ item, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700/80 transition duration-300 border border-gray-700">
      <div className="flex items-center space-x-4">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-20 h-20 rounded-lg object-cover border border-purple-900/30"
          onError={(e) => (e.target.src = "/placeholder-item.png")}
        />
        <div>
          <h3 className="text-lg font-semibold text-purple-100">{item.name}</h3>
          <p className="text-purple-300">${item.price.toFixed(2)}</p>
        </div>
      </div>
      <button
        onClick={() => onRemove(item._id, item.name)}
        className="text-red-400 hover:text-red-300 transition duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;
