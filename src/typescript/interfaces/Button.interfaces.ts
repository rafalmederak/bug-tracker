export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  text: string;
  background?: string;
  color?: string;
}
