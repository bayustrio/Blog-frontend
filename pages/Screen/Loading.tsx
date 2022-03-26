import React from "react";
import styles from "../../styles/loading.module.css";

const Loading = () => {
  return (
    <div className={styles.ring}>Loading
  <span className="span"></span>
</div>
  );
};

export default Loading;
