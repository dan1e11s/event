import { useEffect } from 'react';

import SearchInput from '../../components/SearchInput/SearchInput';
import ProductList from '../../components/products/ProductList/ProductList';
import TableFooter from '../../components/TableFooter/TableFooter';
import CartBar from '../../components/CartBar/CartBar';

import { useAppDispatch } from '../../store';
import {
  setCartBar,
  setIsSearchPage,
} from '../../features/configs/configs-slice';

import styles from './index.module.scss';
import { setProductsCategory } from '../../features/controls/controls-slice';

const SearchPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsSearchPage(true));
    dispatch(setCartBar(false));

    return () => {
      dispatch(setProductsCategory("women's clothing"));
      dispatch(setIsSearchPage(false));
    };
  }, [dispatch]);

  return (
    <div className={styles.searchPage}>
      <SearchInput />
      <div className={styles.container}>
        <ProductList />
        <TableFooter />
      </div>
      <CartBar />
    </div>
  );
};

export default SearchPage;
