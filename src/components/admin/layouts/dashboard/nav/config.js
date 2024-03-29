// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'admin',
    path: '/admin/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'book',
    path: '/admin/user',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
    path: '/admin/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'blog',
    path: '/admin/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'Seasonal Offers',
    path: '/admin/user',
    icon: icon('ic_soffer'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
