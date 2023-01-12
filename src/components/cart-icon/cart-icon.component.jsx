import { useDispatch } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action";
import {
  selectIsCartOpen,
  selectCartCount,
} from "../../store/cart/cart.selector";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartIconContainer, ItemCount } from "./cart-icon.styles.jsx";
import { useSelector } from "react-redux";

const CartIcon = () => {
  //const { selectIsCartOpen, setIsCartOpen, cartCount } =
  //  useContext(CartContext);

  const isCartOpen = useSelector(selectIsCartOpen);

  const cartCount = useSelector(selectCartCount);

  const dispatch = useDispatch();

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
