import styles from "./InfoSection.module.scss";

export default function InfoSection({ experience, skills, education }) {
  return (
    <section className={styles.infoSection}>
      <div className={styles.infoGrid}>
        <div className={styles.infoBlock}>
          <h3 className={styles.blockTitle}>{experience.title}</h3>
          <ul className={styles.blockList}>
            {experience.items.map((item, index) => (
              <li key={index} className={styles.listItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.infoBlock}>
          <h3 className={styles.blockTitle}>{skills.title}</h3>
          <ul className={styles.blockList}>
            {skills.items.map((item, index) => (
              <li key={index} className={styles.listItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.infoBlock}>
          <h3 className={styles.blockTitle}>{education.title}</h3>
          <ul className={styles.blockList}>
            {education.items.map((item, index) => (
              <li key={index} className={styles.listItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
