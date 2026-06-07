const FormatTime = (dateStr) => {
    try {
        const date = new Date(dateStr);
        const now = new Date();

        const diffMs = now - date;

        const minute = 60 * 1000;
        const hour = 60 * minute;
        const day = 24 * hour;
        const week = 7 * day;
        const month = 30 * day;
        const year = 365 * day;

        if (diffMs < minute) return "Just now";

        if (diffMs < hour) {
            return `${Math.floor(diffMs / minute)}m`;
        }

        if (diffMs < day) {
            return `${Math.floor(diffMs / hour)}h`;
        }

        if (diffMs < day * 2) {
            return "Yesterday";
        }

        if (diffMs < week) {
            return `${Math.floor(diffMs / day)}d`;
        }

        if (diffMs < month) {
            return `${Math.floor(diffMs / week)}w`;
        }

        if (diffMs < year) {
            return `${Math.floor(diffMs / month)}mo`;
        }

        return `${Math.floor(diffMs / year)}y`;
    } catch {
        return "";
    }
};

export default FormatTime;