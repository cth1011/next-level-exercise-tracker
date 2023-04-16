interface IX {
  onClick: () => void;
}

const X: React.FC<IX> = ({ onClick }) => (
  <svg
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    aria-hidden="true"
    onClick={onClick}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default X;
