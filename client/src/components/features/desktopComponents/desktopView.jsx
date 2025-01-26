import React, { useState } from 'react';
import Header from '@/components/features/desktopComponents/header';
import { Card, CardTitle } from '@/components/ui/card';
import DashboardContent from './dashboardItem';
export default function Desktop() {
  return (
    <main className="h-screen w-full relative">
      <Header name="User"  />
      <div className='h-full flex items-center '>
        <DashboardContent/>
      </div>
    </main>
  );
}
