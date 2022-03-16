import styles from "../styles/Login.module.css";

function Button({ children, ...props }) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}

export default Button;
