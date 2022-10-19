import styles from "./Checkbox.module.css";
import { Checkbox } from "@mui/material";

const CheckboxComponent = ({
  text,
  black,
  html,
  children,
  onChange,
  value,
  type,
  defaultChecked,
}) => {
  return (
    <div
      className={type === "profile" ? styles.wrapperProfile : styles.wrapper}
    >
      {black ? (
        <Checkbox
          defaultChecked={defaultChecked}
          onChange={onChange}
          value={value}
          color="default"
        />
      ) : (
        <Checkbox
          defaultChecked={defaultChecked}
          onChange={onChange}
          value={value}
        />
      )}

      {!html ? (
        <p
          style={
            black
              ? {
                  color: "#000",
                }
              : {}
          }
          className={styles.label}
        >
          {text}
        </p>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default CheckboxComponent;
