import styles from "./Footer.module.scss";

export default function Footer({ contact }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.contactSection}>
          <h3 className={styles.contactTitle}>{contact.title}</h3>
          <div className={styles.contactGrid}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Email:</span>
              <a
                href={`mailto:${contact.email}`}
                className={styles.contactLink}
              >
                {contact.email}
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>telegram:</span>
              <a
                href={`mailto:${contact.tg}`}
                className={styles.contactLink}
              >
                {contact.tg}
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Phone:</span>
              <a href={`tel:${contact.phone}`} className={styles.contactLink}>
                {contact.phone}
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Location:</span>
              <span className={styles.contactText}>{contact.location}</span>
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>&copy; 2025 All rights reserved;)</p>
        </div>
      </div>
    </footer>
  );
}
