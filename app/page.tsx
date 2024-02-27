import styles from "./page.module.css";
import MaterialSymbol from "@/app/ui/MaterialSymbol";

export default function Home() {
	return (
		<main className={styles.main}>
            <div className={styles.center}>
				<MaterialSymbol name="favorite" className="fill-hotpink"/>
				<MaterialSymbol name="date_range" style="sharp" fill weight={700} grade={-25} opticalSize={20} />
            </div>
		</main>
	);
}
