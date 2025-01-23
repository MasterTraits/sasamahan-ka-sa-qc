import React from 'react'
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import LineGraph from '@/components/features/graphs/linegraph';
export default function DashboardContent() {
  return (

    <main className='grid grid-cols-12 gap-4'>
        <Card className='bg-background relative w-full col-span-3 p-3 flex items-center justify-center shadow-md'>
            <CardContent>
                <LineGraph/>
            </CardContent>
        </Card> 
        <Card className='bg-background relative w-full col-span-3 p-3 flex items-center justify-center shadow-md'>
            <CardContent>
                <LineGraph/>
            </CardContent>
        </Card> 
        <Card className='bg-background relative w-full col-span-3 p-3 flex items-center justify-center shadow-md'>
            <CardContent>
                <LineGraph/>
            </CardContent>
        </Card> 
        <Card className='bg-background relative w-full col-span-3 p-3 flex items-center justify-center shadow-md'>
            <CardContent>
                <LineGraph/>
            </CardContent>
        </Card> 


        <Card className = 'col-span-8 bg-background relative w-full p-3 flex items-center justify-center shadow-md'>
            <CardContent>
                <LineGraph/>
            </CardContent>
        </Card>

        <Card className = 'col-span-4 bg-background relative w-full p-3 flex items-center justify-center shadow-md'>
            <CardContent>
                <LineGraph/>
            </CardContent>
        </Card>
        
        <Card className = 'col-span-4 bg-background relative w-full p-3 flex items-center justify-center shadow-md'>
            <CardContent>
                <LineGraph/>
            </CardContent>
        </Card>
        <Card className = 'col-span-4 bg-background relative w-full p-3 flex items-center justify-center shadow-md'>
            <CardContent>
                <LineGraph/>
            </CardContent>
        </Card>
        <Card className = 'col-span-4 bg-background relative w-full p-3 flex items-center justify-center shadow-md'>
            <CardContent>
                <LineGraph/>
            </CardContent>
        </Card>
    </main>
     )
}
