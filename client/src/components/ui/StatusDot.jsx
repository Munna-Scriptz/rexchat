import React from 'react'

const StatusDot = ({ status, size = 'sm' }) => {
    const sizeClasses = size === 'lg' ? 'w-3.5 h-3.5 border-2' : 'w-2.5 h-2.5 border-[2px]';
    const colorMap = { online: 'bg-online', offline: 'bg-offline' };
    
    return (
        <span className={`${sizeClasses} ${colorMap[status] || 'bg-offline'} rounded-full border-surface block`} />
    )
}

export default StatusDot