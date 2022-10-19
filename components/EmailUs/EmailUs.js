import Checkbox from "../Checkbox/Checkbox";
import Inputs from "../Inputs/Inputs";
import Buttons from "../Buttons/Buttons";
import styles from "./EmailUs.module.css";
import { connect } from "react-redux";
import selectors from "../../redux/auth/selectors";

const EmailUs = ({ title, padding, isAuthenticated }) => {
  return (
    <form className={styles.form}>
      {title && (
        <h3
          style={padding ? { paddingBottom: padding } : {}}
          className={styles.formTitle}
        >
          {title}
        </h3>
      )}
      <div className={styles.formElement}>
        <Inputs.InputTwo type="email" title="Your email: " />
      </div>
      <div className={styles.formElement}>
        <Inputs.InputTwo title="Subject: " />
      </div>
      <div className={styles.formElement}>
        <Inputs.InputTwo title="Message: " type="multi" />
      </div>
      {!isAuthenticated && (
        <div className={styles.formElement}>
          <Checkbox
            defaultChecked={true}
            text="Would you like to receive marketing communication?"
          />
        </div>
      )}
      <div className={styles.formElement}>
        <Buttons.Blue text="send" />
      </div>
    </form>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: selectors.isAuthenticated(state),
});
export default connect(mapStateToProps)(EmailUs);
