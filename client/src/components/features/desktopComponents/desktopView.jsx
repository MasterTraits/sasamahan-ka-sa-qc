import React, { useState } from 'react';
import Header from '@/components/features/desktopComponents/header';
import { Card, CardTitle } from '@/components/ui/card';
import DashboardContent from './dashboardItem';
export default function Desktop() {
  return (
    <main className="flex flex-col w-full h-screen p-8 relative items-center">
      <Header name="User" />
        <DashboardContent/>
    </main>
  );
}
