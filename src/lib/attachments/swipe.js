export function swipe(onswipe, minDistance = 30) {
	return (element) => {
		let start = null;

		function handleDown(event) {
			if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
			if (event.target.closest('button, a, input')) return;
			start = { x: event.clientX, y: event.clientY };
			element.setPointerCapture(event.pointerId);
		}

		function handleUp(event) {
			if (!start || !event.isPrimary) return;
			const dx = event.clientX - start.x;
			const dy = event.clientY - start.y;
			start = null;

			if (Math.max(Math.abs(dx), Math.abs(dy)) < minDistance) return;
			if (Math.abs(dx) > Math.abs(dy)) onswipe(dx > 0 ? 'right' : 'left');
			else onswipe(dy > 0 ? 'down' : 'up');
		}

		function handleCancel() {
			start = null;
		}

		element.addEventListener('pointerdown', handleDown);
		element.addEventListener('pointerup', handleUp);
		element.addEventListener('pointercancel', handleCancel);

		return () => {
			element.removeEventListener('pointerdown', handleDown);
			element.removeEventListener('pointerup', handleUp);
			element.removeEventListener('pointercancel', handleCancel);
		};
	};
}
