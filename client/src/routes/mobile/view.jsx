import Header from '@/components/layout/header';
import Footer_Navigator from '@/components/layout/nav'
import History from '@/components/features/history';

import { useHistory } from '@/store/useHistory';

export default function view() {
  const menu = useHistory((state)=> state.menu)

  return (
    <div className='h-screen w-full overflow-hidden'>
      <Header text="Views"/>

      {menu && <History/>}
      <Footer_Navigator page="view" />
    </div>
  );
}
