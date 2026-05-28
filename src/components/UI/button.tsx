import "./button.css";

type ButtonProps = {
  text: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
};

export default function Button({
  text,
  type = "button",
  variant = "primary",
}: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} type={type}>
      {text}
    </button>
  );
}