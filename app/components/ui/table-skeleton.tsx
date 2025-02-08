"use client";

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const TableSkeleton: React.FC = () => {
    return (
        <div>
            {[...Array(30)].map((_, i) => (
                <div key={i} className="flex items-center space-x-2 p-2">
                    <Skeleton variant="text" width={100} height={45} />
                    <Skeleton variant="text" width="100%" height={45} />
                </div>
            ))}
        </div>
    );
};

export default TableSkeleton;