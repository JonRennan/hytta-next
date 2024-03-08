import styles from "./page.module.css";
import Calendar from "@/app/ui/Calendar/Calendar";

export default function Home() {
	return (
		<main className={styles.main}>
            <div className={styles.center}>
				<Calendar />
            </div>
		</main>
	);
}
