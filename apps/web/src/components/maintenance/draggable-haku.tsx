"use client";

import Image from "next/image";
import {
	type PointerEvent,
	useEffect,
	useEffectEvent,
	useId,
	useRef,
} from "react";
import styles from "./draggable-haku.module.css";

type Position = { x: number; y: number };
type Drag = Position & {
	pointerId: number;
	startX: number;
	startY: number;
	lastX: number;
};

export default function DraggableHaku() {
	const slotRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const positionRef = useRef<Position>({ x: 0, y: 0 });
	const dragRef = useRef<Drag | null>(null);
	const instructionsId = useId();

	// Keep movement outside React's render cycle so dragging stays responsive.
	function place(x: number, y: number) {
		const slot = slotRef.current;
		const button = buttonRef.current;
		if (!slot || !button) return;

		const bounds = slot.getBoundingClientRect();
		const inset = 12;
		const next = {
			x: Math.max(
				inset - bounds.left,
				Math.min(x, window.innerWidth - bounds.right - inset),
			),
			y: Math.max(
				inset - bounds.top,
				Math.min(y, window.innerHeight - bounds.bottom - inset),
			),
		};
		positionRef.current = next;
		button.style.setProperty("--x", `${next.x}px`);
		button.style.setProperty("--y", `${next.y}px`);
	}

	function startDrag(event: PointerEvent<HTMLButtonElement>) {
		if (!event.isPrimary || event.button !== 0 || dragRef.current) return;
		event.currentTarget.setPointerCapture(event.pointerId);
		event.currentTarget.dataset.dragging = "true";
		event.currentTarget.dataset.moved = "true";
		dragRef.current = {
			...positionRef.current,
			pointerId: event.pointerId,
			startX: event.clientX,
			startY: event.clientY,
			lastX: event.clientX,
		};
	}

	function moveDrag(event: {
		pointerId: number;
		clientX: number;
		clientY: number;
	}) {
		const drag = dragRef.current;
		const button = buttonRef.current;
		if (!drag || !button || drag.pointerId !== event.pointerId) return;
		place(
			drag.x + event.clientX - drag.startX,
			drag.y + event.clientY - drag.startY,
		);
		const tilt = Math.max(-8, Math.min(8, (event.clientX - drag.lastX) * 0.5));
		button.style.setProperty("--tilt", `${tilt}deg`);
		drag.lastX = event.clientX;
	}

	function finishDrag(event: { pointerId: number }) {
		const button = buttonRef.current;
		if (!button || dragRef.current?.pointerId !== event.pointerId) return;
		dragRef.current = null;
		button.dataset.dragging = "false";
		button.style.setProperty("--tilt", "0deg");
		if (button.hasPointerCapture(event.pointerId)) {
			button.releasePointerCapture(event.pointerId);
		}
	}

	const onMove = useEffectEvent(moveDrag);
	const onFinish = useEffectEvent(finishDrag);
	const keepInView = useEffectEvent(() => {
		// Leave the initial image in the document flow until it has been moved.
		if (buttonRef.current?.dataset.moved === "true") {
			place(positionRef.current.x, positionRef.current.y);
		}
	});

	useEffect(() => {
		function cancelDrag() {
			if (dragRef.current) onFinish(dragRef.current);
		}
		window.addEventListener("resize", keepInView);
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onFinish);
		window.addEventListener("pointercancel", onFinish);
		window.addEventListener("blur", cancelDrag);
		return () => {
			window.removeEventListener("resize", keepInView);
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onFinish);
			window.removeEventListener("pointercancel", onFinish);
			window.removeEventListener("blur", cancelDrag);
		};
	}, []);

	function resetHaku() {
		const button = buttonRef.current;
		if (!button) return;
		if (dragRef.current) finishDrag(dragRef.current);
		positionRef.current = { x: 0, y: 0 };
		button.style.setProperty("--x", "0px");
		button.style.setProperty("--y", "0px");
		button.dataset.moved = "false";
	}

	return (
		<>
			<div ref={slotRef} className={styles.slot}>
				<button
					ref={buttonRef}
					type="button"
					className={styles.haku}
					aria-label="Move Haku"
					aria-describedby={instructionsId}
					onPointerDown={startDrag}
					onPointerUp={finishDrag}
					onPointerCancel={finishDrag}
					onLostPointerCapture={finishDrag}
				>
					<Image
						src="/maintenance/haku.png"
						alt="Biewer Terrier in a Hotdog Costume"
						width={512}
						height={367}
						className={styles.image}
						draggable={false}
						unoptimized
						preload
					/>
				</button>
				<span id={instructionsId} className="sr-only">
					Drag to place Haku anywhere on the screen. Use Reset Haku to return
					him to his starting position.
				</span>
			</div>
			<button type="button" className={styles.reset} onClick={resetHaku}>
				Reset Haku
			</button>
		</>
	);
}
