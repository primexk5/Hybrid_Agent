// Tracks which conversation is currently on-screen, so the global notifier can
// skip toasting messages the user is already looking at.
let activeId = null;

export const setActiveChat = (id) => { activeId = id; };
export const clearActiveChat = (id) => { if (activeId === id) activeId = null; };
export const getActiveChat = () => activeId;
