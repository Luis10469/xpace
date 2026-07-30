const Button = ({ children, type = 'button', onClick, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded font-semibold transition ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
