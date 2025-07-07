import styles from "./TextBlock.module.scss";

export default function TextBlock({ title, content }) {
  return (
    <section className={styles.textSection}>
      <div className={styles.container}>
        <div className={styles.textBlock}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.content}>
            {content.split("\n").map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
