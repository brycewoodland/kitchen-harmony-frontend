export function Button({ children, onClick, size = "base", variant = "primary" }) {
    const sizeClasses = {
      base: "px-4 py-2",
      icon: "p-2",
    };
  
    const variantClasses = {
      primary: "bg-blue-600 text-white rounded-lg hover:bg-blue-700",
      ghost: "text-gray-600 hover:bg-gray-200 rounded-lg",
    };
  
    return (
      <button className={`${sizeClasses[size]} ${variantClasses[variant]} transition`} onClick={onClick}>
        {children}
      </button>
    );
  }
  