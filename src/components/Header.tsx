import Link from 'next/link';
import styles from '@/components/Header.module.css'
import Image from "next/image";

export default function Header() {
    return (
        <header>
            <div className={styles.header}>
                <nav className={styles.headerContent}>
                    <Link className={styles.headerMenu} href="#about">ABOUT</Link>
                    <Link className={styles.headerMenu} href="#project">PROJECT</Link>
                    <div className={styles.headerLogo}>

                        <Image
                            src="/images/logo.png"
                            alt="로고"
                            width={100}
                            height={50}
                        />
                    </div>
                    <Link className={styles.headerMenu} href="#experience">EXPERIENCE</Link>
                    <Link className={styles.headerMenu} href="#contact">CONTACT</Link>
                </nav>
            </div>
        </header>
    );
}