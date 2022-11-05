// An object to store all the edits made to specific voters

export let changeRecord = JSON.parse(localStorage.getItem("change-racord") || "{}");
