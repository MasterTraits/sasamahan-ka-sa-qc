import Header from '@/components/layout/header';
import Footer_Navigator from '@/components/layout/nav'

export default function view() {
  return (
    <div className='h-screen w-full overflow-hidden'>
      <Header text="Views"/>
      <Footer_Navigator page="view" />
    </div>
  );
}
