import styles from "./Tabel.module.css";
const Tabel = ({ data }) => {
  return (
    <table className={styles.wrapper}>
      <tbody className={styles.tbody}>
        <tr className={styles.tr}>
          <td className={styles.key}>item no.</td>
          <td className={styles.value}>{data.numer}</td>
        </tr>
        <tr className={styles.tr}>
          <td className={styles.key}>material</td>
          <td className={styles.value}>{data.material}</td>
        </tr>
        <tr className={styles.tr}>
          <td className={styles.key}>color</td>
          <td className={styles.value}>{data.color}</td>
        </tr>
        <tr className={styles.tr}>
          <td className={styles.key}>lead time</td>
          <td style={{ textTransform: "none" }} className={styles.value}>
            {data.lead_time}d
          </td>
        </tr>
        <tr className={styles.tr}>
          <td className={styles.key}>quantity</td>
          <td className={styles.value}>{data.quantity}</td>
        </tr>
        <tr className={styles.tr}>
          <td className={styles.key}>product weight</td>
          <td className={styles.value}>{data.weight}KG</td>
        </tr>
        <tr className={styles.tr}>
          <td className={styles.key}>price</td>
          <td className={styles.value}>{data.price}$</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Tabel;
