type Props = {
  className?: string; 
  disabled?: boolean;
  children: React.ReactNode;
};

export default function PrimaryButton({
  className = '',
  disabled = false, 
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={
        `inline-flex items-center rounded-md border border-transparent 
        bg-[#3094E8] px-4 py-2 text-xs font-semibold uppercase tracking-widest 
        text-white transition duration-150 ease-in-out 
        hover:bg-[#2674B3] focus:bg-[#2674B3] 
        focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:ring-offset-2 active:bg-[#1F5E91] ${
          disabled ? 'opacity-25 cursor-not-allowed' : ''
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}

