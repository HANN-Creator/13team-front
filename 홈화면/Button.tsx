interface ButtonProps {
    label: string;
    type?: "primary" | "secondary" | "danger";
    onClick?: () => void;
  }
  
  export default function Button({ label, type = "primary", onClick }: ButtonProps) {
    const baseStyle = "px-4 py-2 rounded-md text-white font-semibold w-full";
    const typeStyle =
      type === "primary"
        ? "bg-blue-500 hover:bg-blue-600"
        : type === "secondary"
        ? "bg-yellow-500 hover:bg-yellow-600"
        : "bg-red-500 hover:bg-red-600";
  
    return (
      <button onClick={onClick} className={`${baseStyle} ${typeStyle}`}>
        {label}
      </button>
    );
  }
  