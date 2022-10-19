import styles from "./Inputs.module.css";
import { Icon } from "@iconify/react";
import Select from "react-select";
const SelectInput = ({ options, defaultValue, value, onChange }) => {
  return (
    <Select
      id="long-value-select"
      instanceId="long-value-select"
      isClearable={true}
      defaultValue={defaultValue}
      options={options}
      value={value}
      onChange={(e) => onChange(e)}
    />
  );
};
const InputOne = ({ title, onChange, value, errorMessage, name, type }) => {
  return (
    <>
      <input
        value={value}
        onChange={onChange}
        className={styles.inputOne}
        name={name}
        type={type !== "password" ? "text" : "password"}
        placeholder={title}
      />
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </>
  );
};
const SearchInput = ({
  title,
  onChange,
  error,
  touched,
  value,
  name,
  type,
  submit,
}) => {
  return (
    <div className={styles.searchBox}>
      <div onClick={submit} className={styles.searchIcon}>
        <Icon icon="fluent:search-12-regular" />
      </div>
      <input
        value={value}
        onChange={onChange}
        onSubmit={submit}
        className={styles.search}
        name={name}
        type={type !== "password" ? "text" : "password"}
        placeholder={title}
      />
      {touched && error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
const InputTwo = ({ title, onChange, errorMessage, value, name, type }) => {
  return (
    <div style={{ height: "100%" }}>
      {type !== "multi" ? (
        <>
          <input
            value={value}
            onChange={onChange}
            className={styles.inputTwo}
            name={name}
            type={type}
            placeholder={title}
          />
          {errorMessage && <span className={styles.error}>{errorMessage}</span>}
        </>
      ) : (
        <>
          <textarea
            value={value}
            onChange={onChange}
            className={styles.inputTwo}
            name={name}
            type={type !== "password" ? "text" : "password"}
            placeholder={title}
            id={styles.textarea}
          />
          {errorMessage && <span className={styles.error}>{errorMessage}</span>}
        </>
      )}
    </div>
  );
};

module.exports = {
  InputOne: InputOne,
  InputTwo: InputTwo,
  SearchInput: SearchInput,
  SelectInput: SelectInput,
};
