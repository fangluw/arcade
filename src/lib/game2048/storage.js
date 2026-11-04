export function readJSON(key) {
	try {
		const raw = globalThis.localStorage?.getItem(key);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}

export function writeJSON(key, value) {
	try {
		globalThis.localStorage?.setItem(key, JSON.stringify(value));
		return true;
	} catch {
		return false;
	}
}
